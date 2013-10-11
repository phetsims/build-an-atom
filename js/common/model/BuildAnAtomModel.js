// Copyright 2002-2013, University of Colorado Boulder

/**
 * Main model class for the first tab of the Build an Atom simulation.
 */
define( function( require ) {
  'use strict';

  // Imports
  var AtomIdentifier = require( 'BUILD_AN_ATOM/common/AtomIdentifier' );
  var Dimension2 = require( 'DOT/Dimension2' );
  var inherit = require( 'PHET_CORE/inherit' );
  var NumberAtom = require( 'BUILD_AN_ATOM/common/model/NumberAtom' );
  var Particle = require( 'BUILD_AN_ATOM/common/model/Particle' );
  var ParticleAtom = require( 'BUILD_AN_ATOM/common/model/ParticleAtom' );
  var PropertySet = require( 'AXON/PropertySet' );
  var SharedConstants = require( 'BUILD_AN_ATOM/common/SharedConstants' );
  var SphereBucket = require( 'PHETCOMMON/model/SphereBucket' );
  var Vector2 = require( 'DOT/Vector2' );

  // Constants
  var NUM_PROTONS = 10;
  var NUM_NEUTRONS = 13;
  var NUM_ELECTRONS = 10;
  var NUCLEON_CAPTURE_RADIUS = 100;
  var BUCKET_WIDTH = 120;
  var BUCKET_HEIGHT = BUCKET_WIDTH * 0.45;
  var BUCKET_Y_OFFSET = -225;
  var NUCLEUS_JUMP_PERIOD = 0.1; // In seconds
  var MAX_NUCLEUS_JUMP = SharedConstants.NUCLEON_RADIUS * 0.5;
  var JUMP_ANGLES = [ Math.PI * 0.1, Math.PI * 1.6, Math.PI * 0.7, Math.PI * 1.1, Math.PI * 0.3 ];
  var JUMP_DISTANCES = [ MAX_NUCLEUS_JUMP * 0.4, MAX_NUCLEUS_JUMP * 0.8, MAX_NUCLEUS_JUMP * 0.2, MAX_NUCLEUS_JUMP * 0.9 ];

  /**
   * Constructor for main model object.
   *
   * @constructor
   */
  function BuildAnAtomModel() {

    // Call the super constructor.
    PropertySet.call( this,
      {
        // Properties that control label visibility in the view.
        showElementName: true,
        showNeutralOrIon: true,
        showStableOrUnstable: false,

        // Property that controls electron depiction in the view.
        electronShellDepiction: 'orbits'
      } );

    var thisModel = this;

    // Create the atom that the user will build, modify, and generally play with.
    this.particleAtom = new ParticleAtom();

    // Create the buckets that will hold the sub-atomic particles.
    this.buckets = {
      protonBucket: new SphereBucket(
        {
          position: new Vector2( -BUCKET_WIDTH * 1.1, BUCKET_Y_OFFSET ),
          size: new Dimension2( BUCKET_WIDTH, BUCKET_HEIGHT ),
          sphereRadius: SharedConstants.NUCLEON_RADIUS,
          baseColor: 'red',
          caption: 'Protons',
          captionColor: 'white'
        }
      ),
      neutronBucket: new SphereBucket(
        {
          position: new Vector2( 0, BUCKET_Y_OFFSET ),
          size: new Dimension2( BUCKET_WIDTH, BUCKET_HEIGHT ),
          sphereRadius: SharedConstants.NUCLEON_RADIUS,
          baseColor: 'rgb( 100, 100, 100 )',
          caption: 'Neutrons',
          captionColor: 'white'
        }
      ),
      electronBucket: new SphereBucket(
        {
          position: new Vector2( BUCKET_WIDTH * 1.1, BUCKET_Y_OFFSET ),
          size: new Dimension2( BUCKET_WIDTH, BUCKET_HEIGHT ),
          sphereRadius: SharedConstants.ELECTRON_RADIUS,
          usableWidthProportion: 0.8,
          baseColor: 'blue',
          caption: 'Electrons',
          captionColor: 'white'
        }
      )
    };

    // Define a function that will decide where to put nucleons.
    var placeNucleon = function( particle, bucket, atom ) {
      if ( particle.position.distance( atom.position ) < NUCLEON_CAPTURE_RADIUS ) {
        atom.addParticle( particle );
      }
      else {
        bucket.addParticleNearestOpen( particle, true );
      }
    };

    // Define the arrays where the subatomic particles will reside.
    this.nucleons = [];
    this.electrons = [];

    // Add the protons.
    _.times( NUM_PROTONS, function() {
      var proton = new Particle( 'proton' );
      thisModel.nucleons.push( proton );
      thisModel.buckets.protonBucket.addParticleFirstOpen( proton, false );
      proton.userControlledProperty.link( function( userControlled ) {
        if ( !userControlled && !thisModel.buckets.protonBucket.containsParticle( proton ) ) {
          placeNucleon( proton, thisModel.buckets.protonBucket, thisModel.particleAtom );
        }
      } );
    } );

    // Add the neutrons.
    _.times( NUM_NEUTRONS, function() {
      var neutron = new Particle( 'neutron' );
      thisModel.nucleons.push( neutron );
      thisModel.buckets.neutronBucket.addParticleFirstOpen( neutron, false );
      neutron.userControlledProperty.link( function( userControlled ) {
        if ( !userControlled && !thisModel.buckets.neutronBucket.containsParticle( neutron ) ) {
          placeNucleon( neutron, thisModel.buckets.neutronBucket, thisModel.particleAtom );
        }
      } );
    } );

    // Add the electrons.
    _.times( NUM_ELECTRONS, function() {
      var electron = new Particle( 'electron' );
      thisModel.electrons.push( electron );
      thisModel.buckets.electronBucket.addParticleFirstOpen( electron, false );
      electron.userControlledProperty.link( function( userControlled ) {
        if ( !userControlled && !thisModel.buckets.electronBucket.containsParticle( electron ) ) {
          if ( electron.position.distance( Vector2.ZERO ) < thisModel.particleAtom.outerElectronShellRadius * 1.1 ) {
            thisModel.particleAtom.addParticle( electron );
          }
          else {
            thisModel.buckets.electronBucket.addParticleNearestOpen( electron, true );
          }
        }
      } );
    } );

    // Make available a 'number atom' that tracks the state of the particle atom.
    this.numberAtom = new NumberAtom();
    var updateNumberAtom = function() {
      thisModel.numberAtom.protonCount = thisModel.particleAtom.protons.length;
      thisModel.numberAtom.neutronCount = thisModel.particleAtom.neutrons.length;
      thisModel.numberAtom.electronCount = thisModel.particleAtom.electrons.length;
    };

    // Update the number atom when the particle atom changes.
    this.particleAtom.protons.lengthProperty.link( updateNumberAtom );
    this.particleAtom.electrons.lengthProperty.link( updateNumberAtom );
    this.particleAtom.neutrons.lengthProperty.link( updateNumberAtom );

    // Update the stability state and counter on changes.
    this.nucleusStable = true;
    this.nucleusJumpCountdown = NUCLEUS_JUMP_PERIOD;
    this.nucleusOffset = Vector2.ZERO;
    this.numberAtom.massNumberProperty.link( function( massNumber ) {
      var stable = massNumber > 0 ? AtomIdentifier.isStable( thisModel.numberAtom.protonCount, thisModel.numberAtom.neutronCount ) : true;
      if ( thisModel.nucleusStable !== stable ) {
        // Stability has changed.
        thisModel.nucleusStable = stable;
        if ( stable ) {
          thisModel.nucleusJumpCountdown = NUCLEUS_JUMP_PERIOD;
          thisModel.particleAtom.nucleusOffset = Vector2.ZERO;
        }
      }
    } );

    // If stability label visibility is turned off when nucleus animation is
    // in progress, reset the animation.
    this.showStableOrUnstableProperty.link( function( showStableOrUnstable ) {
      if ( !showStableOrUnstable ) {
        thisModel.particleAtom.nucleusOffset = Vector2.ZERO;
      }
    } );
  }

  // Externally visible constants
  BuildAnAtomModel.MAX_CHARGE = Math.max( NUM_PROTONS, NUM_ELECTRONS );
  BuildAnAtomModel.MAX_ELECTRONS = NUM_ELECTRONS;

  return inherit( PropertySet, BuildAnAtomModel,
    {
      _nucleusJumpCount: 0,

      // Main model step function, called by the framework.
      step: function( dt ) {

        // Update particle positions.
        this.nucleons.forEach( function( nucleon ) {
          nucleon.step( dt );
        } );
        this.electrons.forEach( function( electron ) {
          electron.step( dt );
        } );

        // Animate the unstable nucleus by making it jump periodically.
        if ( this.nucleusStable === false && this.showStableOrUnstable ) {
          this.nucleusJumpCountdown -= dt;
          if ( this.nucleusJumpCountdown <= 0 ) {
            this.nucleusJumpCountdown = NUCLEUS_JUMP_PERIOD;
            if ( this.particleAtom.nucleusOffset === Vector2.ZERO ) {
              this._nucleusJumpCount++;
              var angle = JUMP_ANGLES[ this._nucleusJumpCount % JUMP_ANGLES.length ];
              var distance = JUMP_DISTANCES[ this._nucleusJumpCount % JUMP_DISTANCES.length ];
              this.particleAtom.nucleusOffset = new Vector2( Math.cos( angle ) * distance, Math.sin( angle ) * distance );
            }
            else {
              this.particleAtom.nucleusOffset = Vector2.ZERO;
            }
          }
        }
      },

      _moveParticlesFromAtomToBucket: function( particleCollection, bucket ) {
        var particlesToRemove = [];
        // Copy the observable particle collection into a regular array.
        for ( var i = 0; i < particleCollection.length; i++ ) {
          particlesToRemove[i] = particleCollection.get( i );
        }
        var thisModel = this;
        particlesToRemove.forEach( function( particle ) {
            thisModel.particleAtom.removeParticle( particle );
            bucket.addParticleFirstOpen( particle );
          }
        );
      },

      reset: function() {
        PropertySet.prototype.reset.call( this );

        // Move any particles that are in transit back to its bucket.
        this.nucleons.forEach( function( nucleon ) {
          if ( !nucleon.position.equals( nucleon.destination ) ) {
            nucleon.moveImmediatelyToDestination();
          }
        } );
        this.electrons.forEach( function( electron ) {
          if ( !electron.position.equals( electron.destination ) ) {
            electron.moveImmediatelyToDestination();
          }
        } );

        // Remove all particles from the particle atom.
        this.particleAtom.clear();

        // Remove all particles from the buckets.
        this.buckets.protonBucket.reset();
        this.buckets.neutronBucket.reset();
        this.buckets.electronBucket.reset();

        // Add all the particles back to their buckets so that they are
        // stacked in their original configurations.
        var thisModel = this;
        this.nucleons.forEach( function( nucleon ) {
          if ( nucleon.type === 'proton' ) {
            thisModel.buckets.protonBucket.addParticleFirstOpen( nucleon, false );
          }
          else {
            thisModel.buckets.neutronBucket.addParticleFirstOpen( nucleon, false );
          }
        } );
        this.electrons.forEach( function( electron ) {
          thisModel.buckets.electronBucket.addParticleFirstOpen( electron, false );
        } );
      },

      // Set the atom to the specified configuration.
      setAtomConfiguration: function( numberAtom ) {
        // Define a function for transferring particles from buckets to atom.
        var atomCenter = this.particleAtom.position;
        var self = this;
        var moveParticlesToAtom = function( currentCountInAtom, targetCountInAtom, particlesInAtom, bucket ) {
          while ( currentCountInAtom < targetCountInAtom ) {
            var particle = bucket.extractClosestParticle( atomCenter );
            particle.setPositionAndDestination( atomCenter );
            particle.userControlled = false; // Necessary to make it look like user released particle.
            currentCountInAtom++;
          }
          while ( currentCountInAtom > targetCountInAtom ) {
            self._moveParticlesFromAtomToBucket( particlesInAtom, bucket );
            currentCountInAtom--;
          }
        };

        // Move the particles.
        moveParticlesToAtom( this.particleAtom.protons.length, numberAtom.protonCount, this.particleAtom.protons, this.buckets.protonBucket );
        moveParticlesToAtom( this.particleAtom.neutrons.length, numberAtom.neutronCount, this.particleAtom.neutrons, this.buckets.neutronBucket );
        moveParticlesToAtom( this.particleAtom.electrons.length, numberAtom.electronCount, this.particleAtom.electrons, this.buckets.electronBucket );

        // Finalize particle positions.
        this.particleAtom.moveAllParticlesToDestination();
      }
    } );
} );
