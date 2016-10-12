// Copyright 2013-2015, University of Colorado Boulder

/**
 * Main model class for the first tab of the Build an Atom simulation.
 *
 * @author John Blanco
 */
define( function( require ) {
  'use strict';

  // modules
  var AtomIdentifier = require( 'SHRED/AtomIdentifier' );
  var buildAnAtom = require( 'BUILD_AN_ATOM/buildAnAtom' );
  var Dimension2 = require( 'DOT/Dimension2' );
  var inherit = require( 'PHET_CORE/inherit' );
  var NumberAtom = require( 'SHRED/model/NumberAtom' );
  var Particle = require( 'SHRED/model/Particle' );
  var ParticleAtom = require( 'SHRED/model/ParticleAtom' );
  var PhetColorScheme = require( 'SCENERY_PHET/PhetColorScheme' );
  var Property = require( 'AXON/Property' );
  var ShredConstants = require( 'SHRED/ShredConstants' );
  var SphereBucket = require( 'PHETCOMMON/model/SphereBucket' );
  var Vector2 = require( 'DOT/Vector2' );

  // strings
  var protonsString = require( 'string!BUILD_AN_ATOM/protons' );
  var neutronsString = require( 'string!BUILD_AN_ATOM/neutrons' );
  var electronsString = require( 'string!BUILD_AN_ATOM/electrons' );

  // constants
  var NUM_PROTONS = 10;
  var NUM_NEUTRONS = 13;
  var NUM_ELECTRONS = 10;
  var NUCLEON_CAPTURE_RADIUS = 100;
  var BUCKET_WIDTH = 120;
  var BUCKET_HEIGHT = BUCKET_WIDTH * 0.45;
  var BUCKET_Y_OFFSET = -205;
  var NUCLEUS_JUMP_PERIOD = 0.1; // In seconds
  var MAX_NUCLEUS_JUMP = ShredConstants.NUCLEON_RADIUS * 0.5;
  var JUMP_ANGLES = [ Math.PI * 0.1, Math.PI * 1.6, Math.PI * 0.7, Math.PI * 1.1, Math.PI * 0.3 ];
  var JUMP_DISTANCES = [ MAX_NUCLEUS_JUMP * 0.4, MAX_NUCLEUS_JUMP * 0.8, MAX_NUCLEUS_JUMP * 0.2, MAX_NUCLEUS_JUMP * 0.9 ];

  /**
   * Constructor for main model object.
   * @param {Tandem} tandem
   * @constructor
   */
  function BuildAnAtomModel( tandem ) {

    var self = this;

    // Properties that control label visibility in the view.
    this.showElementNameProperty = new Property( true );
    this.showNeutralOrIonProperty = new Property( true );
    this.showStableOrUnstableProperty = new Property( false );

    // Property that controls electron depiction in the view.
    this.electronShellDepictionProperty = new Property( 'orbits' );

    // Create the atom that the user will build, modify, and generally play with.
    self.particleAtom = new ParticleAtom();

    // Create the buckets that will hold the sub-atomic particles.
    self.buckets = {
      protonBucket: new SphereBucket( {
          position: new Vector2( -BUCKET_WIDTH * 1.1, BUCKET_Y_OFFSET ),
          size: new Dimension2( BUCKET_WIDTH, BUCKET_HEIGHT ),
          sphereRadius: ShredConstants.NUCLEON_RADIUS,
          baseColor: PhetColorScheme.RED_COLORBLIND,
          caption: protonsString,
        captionColor: 'white',
        tandemName: 'protonBucket'
        }
      ),
      neutronBucket: new SphereBucket( {
          position: new Vector2( 0, BUCKET_Y_OFFSET ),
          size: new Dimension2( BUCKET_WIDTH, BUCKET_HEIGHT ),
          sphereRadius: ShredConstants.NUCLEON_RADIUS,
          baseColor: 'rgb( 100, 100, 100 )',
          caption: neutronsString,
        captionColor: 'white',
        tandemName: 'neutronBucket'
        }
      ),
      electronBucket: new SphereBucket( {
          position: new Vector2( BUCKET_WIDTH * 1.1, BUCKET_Y_OFFSET ),
          size: new Dimension2( BUCKET_WIDTH, BUCKET_HEIGHT ),
          sphereRadius: ShredConstants.ELECTRON_RADIUS,
          usableWidthProportion: 0.8,
          baseColor: 'blue',
          caption: electronsString,
        captionColor: 'white',
        tandemName: 'electronBucket'
        }
      )
    };

    // Define a function that will decide where to put nucleons.
    var placeNucleon = function( particle, bucket, atom ) {
      if ( particle.positionProperty.get().distance( atom.positionProperty.get() ) < NUCLEON_CAPTURE_RADIUS ) {
        atom.addParticle( particle );
      }
      else {
        bucket.addParticleNearestOpen( particle, true );
      }
    };

    // Define the arrays where the subatomic particles will reside.
    self.nucleons = [];
    self.electrons = [];

    // Add the protons.
    var protonGroupTandem = tandem.createGroupTandem( 'protons' );
    var neutronGroupTandem = tandem.createGroupTandem( 'neutrons' );
    var electronGroupTandem = tandem.createGroupTandem( 'electrons' );
    _.times( NUM_PROTONS, function() {
      var proton = new Particle( 'proton', { tandem: protonGroupTandem.createNextTandem() } );
      self.nucleons.push( proton );
      self.buckets.protonBucket.addParticleFirstOpen( proton, false );
      proton.userControlledProperty.link( function( userControlled ) {
        if ( !userControlled && !self.buckets.protonBucket.containsParticle( proton ) ) {
          placeNucleon( proton, self.buckets.protonBucket, self.particleAtom );
        }
      } );
    } );

    // Add the neutrons.
    _.times( NUM_NEUTRONS, function() {
      var neutron = new Particle( 'neutron', { tandem: neutronGroupTandem.createNextTandem() } );
      self.nucleons.push( neutron );
      self.buckets.neutronBucket.addParticleFirstOpen( neutron, false );
      neutron.userControlledProperty.link( function( userControlled ) {
        if ( !userControlled && !self.buckets.neutronBucket.containsParticle( neutron ) ) {
          placeNucleon( neutron, self.buckets.neutronBucket, self.particleAtom );
        }
      } );
    } );

    // Add the electrons.
    _.times( NUM_ELECTRONS, function() {
      var electron = new Particle( 'electron', { tandem: electronGroupTandem.createNextTandem() } );
      self.electrons.push( electron );
      self.buckets.electronBucket.addParticleFirstOpen( electron, false );
      electron.userControlledProperty.link( function( userControlled ) {
        if ( !userControlled && !self.buckets.electronBucket.containsParticle( electron ) ) {
          if ( electron.positionProperty.get().distance( Vector2.ZERO ) < self.particleAtom.outerElectronShellRadius * 1.1 ) {
            self.particleAtom.addParticle( electron );
          }
          else {
            self.buckets.electronBucket.addParticleNearestOpen( electron, true );
          }
        }
      } );
    } );

    // Make available a 'number atom' that tracks the state of the particle atom.
    self.numberAtom = new NumberAtom();
    var updateNumberAtom = function() {
      self.numberAtom.protonCountProperty.set( self.particleAtom.protons.length );
      self.numberAtom.neutronCountProperty.set( self.particleAtom.neutrons.length );
      self.numberAtom.electronCountProperty.set( self.particleAtom.electrons.length );
    };

    // Update the number atom when the particle atom changes.
    self.particleAtom.protons.lengthProperty.link( updateNumberAtom );
    self.particleAtom.electrons.lengthProperty.link( updateNumberAtom );
    self.particleAtom.neutrons.lengthProperty.link( updateNumberAtom );

    // Update the stability state and counter on changes.
    self.nucleusStable = true;
    self.nucleusJumpCountdown = NUCLEUS_JUMP_PERIOD;
    self.nucleusOffset = Vector2.ZERO;
    self.numberAtom.massNumberProperty.link( function( massNumber ) {
      var stable = massNumber > 0 ? AtomIdentifier.isStable(
        self.numberAtom.protonCountProperty.get(),
        self.numberAtom.neutronCountProperty.get() ) : true;
      if ( self.nucleusStable !== stable ) {
        // Stability has changed.
        self.nucleusStable = stable;
        if ( stable ) {
          self.nucleusJumpCountdown = NUCLEUS_JUMP_PERIOD;
          self.particleAtom.nucleusOffset = Vector2.ZERO;
        }
      }
    } );

    // If stability label visibility is turned off when nucleus animation is
    // in progress, reset the animation.
    self.showStableOrUnstableProperty.link( function( showStableOrUnstable ) {
      if ( !showStableOrUnstable ) {
        self.particleAtom.nucleusOffset = Vector2.ZERO;
      }
    } );

    // add a variable used when making the nucleus jump in order to indicate instability
    this.nucleusJumpCount = 0;
  }

  // Externally visible constants
  BuildAnAtomModel.MAX_CHARGE = Math.max( NUM_PROTONS, NUM_ELECTRONS );
  BuildAnAtomModel.MAX_ELECTRONS = NUM_ELECTRONS;

  buildAnAtom.register( 'BuildAnAtomModel', BuildAnAtomModel );

  return inherit( Object, BuildAnAtomModel, {

    // @public - main model step function, called by the framework
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
            this.nucleusJumpCount++;
            var angle = JUMP_ANGLES[ this.nucleusJumpCount % JUMP_ANGLES.length ];
            var distance = JUMP_DISTANCES[ this.nucleusJumpCount % JUMP_DISTANCES.length ];
            this.particleAtom.nucleusOffset = new Vector2( Math.cos( angle ) * distance, Math.sin( angle ) * distance );
          }
          else {
            this.particleAtom.nucleusOffset = Vector2.ZERO;
          }
        }
      }
    },

    // @private
    _moveParticlesFromAtomToBucket: function( particleCollection, bucket ) {
      var particlesToRemove = [];
      // Copy the observable particle collection into a regular array.
      for ( var i = 0; i < particleCollection.length; i++ ) {
        particlesToRemove[ i ] = particleCollection.get( i );
      }
      var self = this;
      particlesToRemove.forEach( function( particle ) {
        self.particleAtom.removeParticle( particle );
          bucket.addParticleFirstOpen( particle );
        }
      );
    },

    // @public
    reset: function() {
      this.showElementNameProperty.reset();
      this.showNeutralOrIonProperty.reset();
      this.showStableOrUnstableProperty.reset();
      this.electronShellDepictionProperty.reset();

      // Move any particles that are in transit back to its bucket.
      this.nucleons.forEach( function( nucleon ) {
        if ( !nucleon.positionProperty.get().equals( nucleon.destinationProperty.get() ) ) {
          nucleon.moveImmediatelyToDestination();
        }
      } );
      this.electrons.forEach( function( electron ) {
        if ( !electron.positionProperty.get().equals( electron.destinationProperty.get() ) ) {
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
      var self = this;
      this.nucleons.forEach( function( nucleon ) {
        if ( nucleon.typeProperty.get() === 'proton' ) {
          self.buckets.protonBucket.addParticleFirstOpen( nucleon, false );
        }
        else {
          self.buckets.neutronBucket.addParticleFirstOpen( nucleon, false );
        }
      } );
      this.electrons.forEach( function( electron ) {
        self.buckets.electronBucket.addParticleFirstOpen( electron, false );
      } );
    },

    // @public - set the atom to the specified configuration
    setAtomConfiguration: function( numberAtom ) {
      // Define a function for transferring particles from buckets to atom.
      var atomCenter = this.particleAtom.position;
      var self = this;
      var moveParticlesToAtom = function( currentCountInAtom, targetCountInAtom, particlesInAtom, bucket ) {
        while ( currentCountInAtom < targetCountInAtom ) {
          var particle = bucket.extractClosestParticle( atomCenter );
          particle.setPositionAndDestination( atomCenter );
          particle.userControlledProperty.set( false ); // Necessary to make it look like user released particle.
          currentCountInAtom++;
        }
        while ( currentCountInAtom > targetCountInAtom ) {
          self._moveParticlesFromAtomToBucket( particlesInAtom, bucket );
          currentCountInAtom--;
        }
      };

      // Move the particles.
      moveParticlesToAtom( this.particleAtom.protons.length,
        numberAtom.protonCountProperty.get(),
        this.particleAtom.protons,
        this.buckets.protonBucket
      );
      moveParticlesToAtom(
        this.particleAtom.neutrons.length,
        numberAtom.neutronCountProperty.get(),
        this.particleAtom.neutrons,
        this.buckets.neutronBucket
      );
      moveParticlesToAtom(
        this.particleAtom.electrons.length,
        numberAtom.electronCountProperty.get(),
        this.particleAtom.electrons,
        this.buckets.electronBucket
      );

      // Finalize particle positions.
      this.particleAtom.moveAllParticlesToDestination();
    }
  } );
} );
