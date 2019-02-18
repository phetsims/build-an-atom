// Copyright 2013-2019, University of Colorado Boulder

/**
 * Main model class for the first tab of the Build an Atom simulation.
 *
 * @author John Blanco
 */
define( function( require ) {
  'use strict';

  // modules
  var AtomIdentifier = require( 'SHRED/AtomIdentifier' );
  var AtomView = require( 'BUILD_AN_ATOM/common/view/AtomView' );
  var BooleanIO = require( 'TANDEM/types/BooleanIO' );
  var BooleanProperty = require( 'AXON/BooleanProperty' );
  var buildAnAtom = require( 'BUILD_AN_ATOM/buildAnAtom' );
  var DerivedProperty = require( 'AXON/DerivedProperty' );
  var DerivedPropertyIO = require( 'AXON/DerivedPropertyIO' );
  var Dimension2 = require( 'DOT/Dimension2' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Particle = require( 'SHRED/model/Particle' );
  var ParticleAtom = require( 'SHRED/model/ParticleAtom' );
  var PhetColorScheme = require( 'SCENERY_PHET/PhetColorScheme' );
  var Property = require( 'AXON/Property' );
  var PropertyIO = require( 'AXON/PropertyIO' );
  var ShredConstants = require( 'SHRED/ShredConstants' );
  var SphereBucket = require( 'PHETCOMMON/model/SphereBucket' );
  var StringIO = require( 'TANDEM/types/StringIO' );
  var Vector2 = require( 'DOT/Vector2' );

  // strings
  var electronsString = require( 'string!BUILD_AN_ATOM/electrons' );
  var neutronsString = require( 'string!BUILD_AN_ATOM/neutrons' );
  var protonsString = require( 'string!BUILD_AN_ATOM/protons' );

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
   * @param {Object} [options]
   * @constructor
   */
  function BuildAnAtomModel( tandem, options ) {

    var self = this;

    options = _.extend( {
      phetioState: true
    }, options );

    // Properties that control label visibility in the view.
    this.showElementNameProperty = new BooleanProperty( true, {
      tandem: tandem.createTandem( 'showElementNameProperty' ),
      phetioState: options.phetioState
    } );
    this.showNeutralOrIonProperty = new BooleanProperty( true, {
      tandem: tandem.createTandem( 'showNeutralOrIonProperty' ),
      phetioState: options.phetioState
    } );
    this.showStableOrUnstableProperty = new BooleanProperty( false, {
      tandem: tandem.createTandem( 'showStableOrUnstableProperty' ),
      phetioState: options.phetioState
    } );

    // Property that controls electron depiction in the view.
    this.electronShellDepictionProperty = new Property( 'orbits', {
      tandem: tandem.createTandem( 'electronShellDepictionProperty' ),
      phetioState: options.phetioState,
      phetioType: PropertyIO( StringIO ),
      validValues: [ 'orbits', 'cloud' ]
    } );

    // Create the atom that the user will build, modify, and generally play with.
    this.particleAtom = new ParticleAtom( {
      tandem: tandem.createTandem( 'particleAtom' ),
      phetioState: options.phetioState
    } );

    // Create the buckets that will hold the sub-atomic particles.
    this.buckets = {
      protonBucket: new SphereBucket( {
        position: new Vector2( -BUCKET_WIDTH * 1.1, BUCKET_Y_OFFSET ),
        size: new Dimension2( BUCKET_WIDTH, BUCKET_HEIGHT ),
        sphereRadius: ShredConstants.NUCLEON_RADIUS,
        baseColor: PhetColorScheme.RED_COLORBLIND,
        captionText: protonsString,
        captionColor: 'white',
        tandem: tandem.createTandem( 'protonBucket' ),
        phetioState: options.phetioState
      } ),
      neutronBucket: new SphereBucket( {
        position: new Vector2( 0, BUCKET_Y_OFFSET ),
        size: new Dimension2( BUCKET_WIDTH, BUCKET_HEIGHT ),
        sphereRadius: ShredConstants.NUCLEON_RADIUS,
        baseColor: 'rgb( 100, 100, 100 )',
        captionText: neutronsString,
        captionColor: 'white',
        tandem: tandem.createTandem( 'neutronBucket' ),
        phetioState: options.phetioState
      } ),
      electronBucket: new SphereBucket( {
        position: new Vector2( BUCKET_WIDTH * 1.1, BUCKET_Y_OFFSET ),
        size: new Dimension2( BUCKET_WIDTH, BUCKET_HEIGHT ),
        sphereRadius: ShredConstants.ELECTRON_RADIUS,
        usableWidthProportion: 0.8,
        baseColor: 'blue',
        captionText: electronsString,
        captionColor: 'white',
        tandem: tandem.createTandem( 'electronBucket' ),
        phetioState: options.phetioState
      } )
    };

    // Define a function that will decide where to put nucleons.
    function placeNucleon( particle, bucket, atom ) {
      if ( particle.positionProperty.get().distance( atom.positionProperty.get() ) < NUCLEON_CAPTURE_RADIUS ) {
        atom.addParticle( particle );
      }
      else {
        bucket.addParticleNearestOpen( particle, true );
      }
    }

    // Define the arrays where the subatomic particles will reside.
    this.nucleons = [];
    this.electrons = [];

    // Add the protons.
    var protonGroupTandem = tandem.createGroupTandem( 'protons' );
    var neutronGroupTandem = tandem.createGroupTandem( 'neutrons' );
    var electronGroupTandem = tandem.createGroupTandem( 'electrons' );
    _.times( NUM_PROTONS, function() {
      var proton = new Particle( 'proton', {
        tandem: protonGroupTandem.createNextTandem(),
        maxZLayer: AtomView.NUM_NUCLEON_LAYERS - 1
      } );
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
      var neutron = new Particle( 'neutron', {
        tandem: neutronGroupTandem.createNextTandem(),
        maxZLayer: AtomView.NUM_NUCLEON_LAYERS - 1
      } );
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
      var electron = new Particle( 'electron', {
        tandem: electronGroupTandem.createNextTandem(),
        maxZLayer: AtomView.NUM_NUCLEON_LAYERS - 1
      } );
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

    // Update the stability state and counter on changes.
    this.nucleusStableProperty = new DerivedProperty(
      [ this.particleAtom.protonCountProperty, this.particleAtom.neutronCountProperty ],
      function( protonCount, neutronCount ) {
        return protonCount + neutronCount > 0 ? AtomIdentifier.isStable( protonCount, neutronCount ) : true;
      },
      {
        tandem: tandem.createTandem( 'nucleusStableProperty' ),
        phetioState: options.phetioState,
        phetioType: DerivedPropertyIO( BooleanIO )
      }
    );

    // @private - variables used to animate the nucleus when it is unstable
    this.nucleusJumpCountdown = NUCLEUS_JUMP_PERIOD;
    this.nucleusOffset = Vector2.ZERO;
    //this.nucleusStableProperty.link( function( nucleusIsStable ) {
    //  if ( nucleusIsStable ) {
    //    self.nucleusJumpCountdown = NUCLEUS_JUMP_PERIOD;
    //    self.particleAtom.nucleusOffsetProperty.set( Vector2.ZERO );
    //  }
    //} );

    // If stability label visibility is turned off when nucleus animation is in progress, move nucleus to center.
    //this.showStableOrUnstableProperty.link( function( showStableOrUnstable ) {
    //  if ( !showStableOrUnstable ) {
    //    self.particleAtom.nucleusOffsetProperty.set( Vector2.ZERO );
    //  }
    //} );

    // add a variable used when making the nucleus jump in order to indicate instability
    this.nucleusJumpCount = 0;
  }

  // Externally visible constants
  BuildAnAtomModel.MAX_CHARGE = Math.max( NUM_PROTONS, NUM_ELECTRONS );
  BuildAnAtomModel.MAX_ELECTRONS = NUM_ELECTRONS;

  buildAnAtom.register( 'BuildAnAtomModel', BuildAnAtomModel );

  return inherit( Object, BuildAnAtomModel, {

    dispose: function() {

      // DerivedProperties should be disposed first, see https://github.com/phetsims/axon/issues/167
      this.nucleusStableProperty.dispose();

      // next dispose the root (non-derived) properties
      this.showElementNameProperty.dispose();
      this.showNeutralOrIonProperty.dispose();
      this.showStableOrUnstableProperty.dispose();
      this.electronShellDepictionProperty.dispose();

      // etc...
      this.particleAtom.dispose();
      this.buckets.protonBucket.dispose();
      this.buckets.electronBucket.dispose();
      this.buckets.neutronBucket.dispose();
      this.electrons.forEach( function( electron ) { electron.dispose();} );
      this.nucleons.forEach( function( nucleon ) { nucleon.dispose();} );
    },

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
      if ( !this.nucleusStableProperty.get() && this.showStableOrUnstableProperty.get() ) {
        this.nucleusJumpCountdown -= dt;
        if ( this.nucleusJumpCountdown <= 0 ) {
          this.nucleusJumpCountdown = NUCLEUS_JUMP_PERIOD;
          if ( this.particleAtom.nucleusOffsetProperty.set( Vector2.ZERO ) ) {
            this.nucleusJumpCount++;
            var angle = JUMP_ANGLES[ this.nucleusJumpCount % JUMP_ANGLES.length ];
            var distance = JUMP_DISTANCES[ this.nucleusJumpCount % JUMP_DISTANCES.length ];
            this.particleAtom.nucleusOffsetProperty.set(
              new Vector2( Math.cos( angle ) * distance, Math.sin( angle ) * distance )
            );
          }
          else {
            this.particleAtom.nucleusOffsetProperty.set( Vector2.ZERO );
          }
        }
      }
      else if ( this.particleAtom.nucleusOffsetProperty.get() !== Vector2.ZERO ) {

        // animation is not running, make sure nucleus is in center of atom
        this.particleAtom.nucleusOffsetProperty.set( Vector2.ZERO );
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
        if ( nucleon.type === 'proton' ) {
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
      var atomCenter = this.particleAtom.positionProperty.get();
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
