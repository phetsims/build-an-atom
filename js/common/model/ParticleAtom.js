// Copyright 2002-2013, University of Colorado Boulder

/**
 * A model element that represents an atom that is comprised of a set of
 * modeled subatomic particles.  This model element manages the positions and
 * motion of all particles that are a part of the atom.
 */
define( function( require ) {
  'use strict';

  // Imports
  var PropertySet = require( 'AXON/PropertySet' );
  var SharedConstants = require( 'BUILD_AN_ATOM/common/SharedConstants' );
  var Vector2 = require( 'DOT/Vector2' );
  var Particle = require( 'BUILD_AN_ATOM/common/model/Particle' );
  var ObservableArray = require( 'AXON/ObservableArray' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Utils = require( 'BUILD_AN_ATOM/common/Utils' );

  function ParticleAtom( options ) {
    PropertySet.call( this, { position: Vector2.ZERO, nucleusOffset: Vector2.ZERO } );

    var thisAtom = this;

    options = _.extend( {
      innerElectronShellRadius: 90,
      outerElectronShellRadius: 150
    }, options );

    // Create the particle collections.
    this.protons = new ObservableArray();
    this.neutrons = new ObservableArray();
    this.electrons = new ObservableArray();

    // Make shell radii publicly accessible.
    this.innerElectronShellRadius = options.innerElectronShellRadius;
    this.outerElectronShellRadius = options.outerElectronShellRadius;

    // Set the default electron add/remove mode.  Valid values are 'proximal' and 'random'.
    this.electronAddMode = 'proximal';

    // Initialize the positions where an electron can be placed.
    this.validElectronPositions = new Array( 10 );
    var angle = 0;
    this.validElectronPositions[ 0 ] = { electron: null, position: new Vector2( thisAtom.innerElectronShellRadius, 0 ) };
    angle += Math.PI;
    this.validElectronPositions[ 1 ] = { electron: null, position: new Vector2( -thisAtom.innerElectronShellRadius, 0 ) };
    var numSlotsInOuterShell = 8;
    angle = Math.PI / numSlotsInOuterShell * 1.2; // Stagger inner and outer electron shell positions, tweaked a bit for better interaction with labels.
    for ( var i = 0; i < numSlotsInOuterShell; i++ ) {
      this.validElectronPositions[ i + 2 ] = {
        electron: null,
        position: new Vector2( Math.cos( angle ) * thisAtom.outerElectronShellRadius, Math.sin( angle ) * thisAtom.outerElectronShellRadius )
      };
      angle += 2 * Math.PI / numSlotsInOuterShell;
    }

    // When an electron is removed, clear the corresponding shell position.
    this.electrons.addItemRemovedListener( function( electron ) {
      thisAtom.validElectronPositions.forEach( function( validElectronPosition ) {
        if ( validElectronPosition.electron === electron ) {
          validElectronPosition.electron = null;
          if ( Math.abs( validElectronPosition.position.magnitude() - thisAtom.innerElectronShellRadius ) < 1E-5 ) {
            // An inner-shell electron was removed.  If there are electrons
            // in the outer shell, move one of them in.
            var occupiedOuterShellPositions = _.filter( thisAtom.validElectronPositions, function( validElectronPosition ) {
              return ( validElectronPosition.electron !== null && Utils.roughlyEqual( validElectronPosition.position.magnitude(),
                thisAtom.outerElectronShellRadius,
                1E-5 ));
            } );
            occupiedOuterShellPositions = _.sortBy( occupiedOuterShellPositions, function( occupiedShellPosition ) {
              return occupiedShellPosition.position.distance( validElectronPosition.position );
            } );
            if ( occupiedOuterShellPositions.length > 0 ) {
              // Move outer electron to inner spot.
              validElectronPosition.electron = occupiedOuterShellPositions[0].electron;
              occupiedOuterShellPositions[0].electron = null;
              validElectronPosition.electron.destination = validElectronPosition.position;
            }
          }
        }
      } );
    } );

    // Utility function to translate all particles.
    var translateParticle = function( particle, translation ) {
      if ( particle.position.equals( particle.destination ) ) {
        particle.setPositionAndDestination( particle.position.plus( translation ) );
      }
      else {
        // Particle is moving, only change the destination.
        particle.destination = particle.destination.plus( translation );
      }
    };

    // When the nucleus offset changes, update all nucleon positions.
    this.nucleusOffsetProperty.link( function( newOffset, oldOffset ) {
      var translation = oldOffset === null ? Vector2.ZERO : newOffset.minus( oldOffset );
      thisAtom.protons.forEach( function( particle ) {
        translateParticle( particle, translation );
      } );
      thisAtom.neutrons.forEach( function( particle ) {
        translateParticle( particle, translation );
      } );
    } );
  }

  return inherit( PropertySet, ParticleAtom, {
    // Add a particle to the atom.
    addParticle: function( particle ) {
      var thisAtom = this;

      if ( particle.type === 'proton' || particle.type === 'neutron' ) {
        var particleArray = particle.type === 'proton' ? this.protons : this.neutrons;
        particleArray.add( particle );
        this.reconfigureNucleus();
        var nucleonRemovedListener = function( userControlled ) {
          if ( userControlled && particleArray.contains( particle ) ) {
            particleArray.remove( particle );
            thisAtom.reconfigureNucleus();
            particle.zLayer = 0;
          }
          particle.userControlledProperty.unlink( nucleonRemovedListener );
          delete particle.particleAtomRemovalListener;
        };
        particle.userControlledProperty.lazyLink( nucleonRemovedListener );
        particle.particleAtomRemovalListener = nucleonRemovedListener; // Attach to the particle to aid unlinking in some cases.
      }
      else if ( particle.type === 'electron' ) {
        this.electrons.add( particle );
        // Find an open position in the electron shell.
        var openPositions = this.validElectronPositions.filter( function( electronPosition ) {
          return ( electronPosition.electron === null );
        } );
        var sortedOpenPositions;
        if ( this.electronAddMode === 'proximal' ) {
          sortedOpenPositions = openPositions.sort( function( p1, p2 ) {
            // Sort first by distance to particle.
            return( Utils.distanceBetweenPoints( particle.position.x, particle.position.y, p1.position.x, p1.position.y ) -
                    Utils.distanceBetweenPoints( particle.position.x, particle.position.y, p2.position.x, p2.position.y ));
          } );
        }
        else {
          sortedOpenPositions = _.shuffle( openPositions );
        }

        // Put the inner shell positions in front.
        sortedOpenPositions = sortedOpenPositions.sort( function( p1, p2 ) {
          return( Math.round( Utils.distanceBetweenPoints( thisAtom.position.x, thisAtom.position.y, p1.position.x, p1.position.y ) -
                              Utils.distanceBetweenPoints( thisAtom.position.x, thisAtom.position.y, p2.position.x, p2.position.y ) ) );
        } );

        assert && assert( sortedOpenPositions.length > 0, "No open positions found for electrons" );
        sortedOpenPositions[0].electron = particle;
        particle.destination = sortedOpenPositions[ 0 ].position;

        // Listen for removal of the electron and handle it.
        var electronRemovedListener = function( userControlled ) {
          if ( userControlled && thisAtom.electrons.contains( particle ) ) {
            thisAtom.electrons.remove( particle );
            particle.zLayer = 0;
          }
          particle.userControlledProperty.unlink( electronRemovedListener );
          delete particle.particleAtomRemovalListener;
        };
        particle.userControlledProperty.lazyLink( electronRemovedListener );
        particle.particleAtomRemovalListener = electronRemovedListener; // Attach to the particle to aid unlinking in some cases.

      }
      else {
        //REVIEW Why are you using an assert here? Why not throw Error, as you've done below?
        assert && assert( false, "Unexpected particle type." );
      }
    },

    // Remove the specified particle from this particle atom.
    removeParticle: function( particle ) {
      if ( this.protons.contains( particle ) ) {
        this.protons.remove( particle );
      }
      else if ( this.neutrons.contains( particle ) ) {
        this.neutrons.remove( particle );
      }
      else if ( this.electrons.contains( particle ) ) {
        this.electrons.remove( particle );
      }
      //REVIEW has your code been formatted using the PhET formatter?
      else {
        //REVIEW Why are you using an assert here?  Why not throw Error, as you've done below?
        assert && assert( false, "Attempt to remove particle that is not in this particle atom." );
      }
      assert && assert( typeof( particle.particleAtomRemovalListener ) === 'function', "No particle removal listener attached to particle." );
      particle.userControlledProperty.unlink( particle.particleAtomRemovalListener );
      delete particle.particleAtomRemovalListener;
    },

    // Extract an arbitrary instance of the specified particle, assuming one exists.
    extractParticle: function( particleType ) {
      var particle = null;
      switch( particleType ) {
        case 'proton':
          if ( this.protons.length > 0 ) {
            particle = this.protons.get( this.protons.length - 1 );
          }
          break;

        case 'neutron':
          if ( this.neutrons.length > 0 ) {
            particle = this.neutrons.get( this.neutrons.length - 1 );
          }
          break;

        case 'electron':
          if ( this.electrons.length > 0 ) {
            particle = this.electrons.get( this.electrons.length - 1 );
          }
          break;

        default:
          throw new Error( "Attempt to remove unknown particle type." );
      }

      if ( particle !== null ) {
        this.removeParticle( particle );
      }

      return particle;
    },

    // Remove all the particles but don't reconfigure the nucleus as they go.
    // This makes it a quicker operation.
    clear: function() {
      var self = this; //REVIEW 'self' convention differs from what you've done elsewhere
      this.protons.forEach( function( particle ) { self.removeParticle( particle ); } );
      this.neutrons.forEach( function( particle ) { self.removeParticle( particle ); } );
      this.electrons.forEach( function( particle ) { self.removeParticle( particle ); } );
    },

    // Move all the particles to their destinations.  This is generally used
    // when animation is not desired.
    moveAllParticlesToDestination: function() {
      this.protons.forEach( function( p ) { p.moveImmediatelyToDestination(); } );
      this.neutrons.forEach( function( p ) { p.moveImmediatelyToDestination(); } );
      this.electrons.forEach( function( p ) { p.moveImmediatelyToDestination(); } );
    },

    getWeight: function() {
      return this.protons.length + this.neutrons.length;
    },

    getCharge: function() {
      return this.protons.length - this.electrons.length;
    },

    reconfigureNucleus: function() {

      // Convenience variables.
      var centerX = this.position.x + this.nucleusOffset.x;
      var centerY = this.position.y + this.nucleusOffset.y;
      var nucleonRadius = SharedConstants.NUCLEON_RADIUS;
      var angle, distFromCenter;

      // Create an array of interspersed protons and neutrons for configuring.
      var nucleons = [];
      var protonIndex = 0, neutronIndex = 0;
      var neutronsPerProton = this.neutrons.length / this.protons.length;
      var neutronsToAdd = 0;
      while ( nucleons.length < this.neutrons.length + this.protons.length ) {
        neutronsToAdd += neutronsPerProton;
        while ( neutronsToAdd >= 1 && neutronIndex < this.neutrons.length ) {
          nucleons.push( this.neutrons.get( neutronIndex++ ) );
          neutronsToAdd -= 1;
        }
        if ( protonIndex < this.protons.length ) {
          nucleons.push( this.protons.get( protonIndex++ ) );
        }
      }

      if ( nucleons.length === 1 ) {
        //REVIEW why the 2-line comment here? I see this in other places, wondering if you're using something 'automatic' that results in odd breaks.
        // There is only one nucleon present, so place it in the center
        // of the atom.
        nucleons[0].destination = new Vector2( centerX, centerY );
        nucleons[0].zLayer = 0;
      }
      else if ( nucleons.length === 2 ) {
        // Two nucleons - place them side by side with their meeting point in the center.
        angle = 0.2 * 2 * Math.PI; // Angle arbitrarily chosen.
        nucleons[0].destination = new Vector2( centerX + nucleonRadius * Math.cos( angle ), centerY + nucleonRadius * Math.sin( angle ) );
        nucleons[0].zLayer = 0;
        nucleons[1].destination = new Vector2( centerX - nucleonRadius * Math.cos( angle ), centerY - nucleonRadius * Math.sin( angle ) );
        nucleons[1].zLayer = 0;
      }
      else if ( nucleons.length === 3 ) {
        // Three nucleons - form a triangle where they all touch.
        angle = 0.7 * 2 * Math.PI; // Angle arbitrarily chosen.
        distFromCenter = nucleonRadius * 1.155;
        nucleons[0].destination = new Vector2( centerX + distFromCenter * Math.cos( angle ), centerY + distFromCenter * Math.sin( angle ) );
        nucleons[0].zLayer = 0;
        nucleons[1].destination = new Vector2( centerX + distFromCenter * Math.cos( angle + 2 * Math.PI / 3 ),
          centerY + distFromCenter * Math.sin( angle + 2 * Math.PI / 3 ) );
        nucleons[1].zLayer = 0;
        nucleons[2].destination = new Vector2( centerX + distFromCenter * Math.cos( angle + 4 * Math.PI / 3 ),
          centerY + distFromCenter * Math.sin( angle + 4 * Math.PI / 3 ) );
        nucleons[2].zLayer = 0;
      }
      else if ( nucleons.length === 4 ) {
        // Four nucleons - make a sort of diamond shape with some overlap.
        angle = 1.4 * 2 * Math.PI; // Angle arbitrarily chosen.
        nucleons[0].destination = new Vector2( centerX + nucleonRadius * Math.cos( angle ), centerY + nucleonRadius * Math.sin( angle ) );
        nucleons[0].zLayer = 0;
        nucleons[2].destination = new Vector2( centerX - nucleonRadius * Math.cos( angle ), centerY - nucleonRadius * Math.sin( angle ) );
        nucleons[2].zLayer = 0;
        distFromCenter = nucleonRadius * 2 * Math.cos( Math.PI / 3 );
        nucleons[1].destination = new Vector2( centerX + distFromCenter * Math.cos( angle + Math.PI / 2 ),
          centerY + distFromCenter * Math.sin( angle + Math.PI / 2 ) );
        nucleons[1].zLayer = 1;
        nucleons[3].destination = new Vector2( centerX - distFromCenter * Math.cos( angle + Math.PI / 2 ),
          centerY - distFromCenter * Math.sin( angle + Math.PI / 2 ) );
        nucleons[3].zLayer = 1;
      }
      else if ( nucleons.length >= 5 ) {
        //REVIEW another odd comment break
        // This is a generalized algorithm that should work for five or
        // more nucleons.
        var placementRadius = 0;
        var numAtThisRadius = 1;
        var level = 0;
        var placementAngle = 0;
        var placementAngleDelta = 0;
        for ( var i = 0; i < nucleons.length; i++ ) {
          nucleons[i].destination = new Vector2( centerX + placementRadius * Math.cos( placementAngle ),
            centerY + placementRadius * Math.sin( placementAngle ) );
          nucleons[i].zLayer = level;
          numAtThisRadius--;
          if ( numAtThisRadius > 0 ) {
            // Stay at the same radius and update the placement angle.
            placementAngle += placementAngleDelta;
          }
          else {
            // Move out to the next radius.
            level++;
            placementRadius += nucleonRadius * 1.35 / level;
            placementAngle += 2 * Math.PI * 0.2 + level * Math.PI; // Arbitrary value chosen based on looks.
            numAtThisRadius = Math.floor( placementRadius * Math.PI / nucleonRadius );
            placementAngleDelta = 2 * Math.PI / numAtThisRadius;
          }
        }
      }
    }
  } );
} );
