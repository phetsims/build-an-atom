// Copyright 2002-2013, University of Colorado Boulder

/**
 * Main model class for the first tab of the Build an Atom simulation.
 */
define( function( require ) {
  'use strict';

  // Imports
  var AtomIdentifier = require( 'common/AtomIdentifier' );
  var callSuper = require( 'PHET_CORE/callSuper' );
  var Dimension2 = require( 'DOT/Dimension2' );
  var inherit = require( 'PHET_CORE/inherit' );
  var NumberAtom = require( 'common/model/NumberAtom' );
  var Particle = require( 'common/model/Particle' );
  var ParticleAtom = require( 'common/model/ParticleAtom' );
  var PropertySet = require( 'AXON/PropertySet' );
  var SharedConstants = require( 'common/SharedConstants' );
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
                        showStableOrUnstable: true,

                        // Property that controls electron depiction in the view.
                        electronShellDepiction: 'orbits'
                      } );

    var thisModel = this;

    // Create the atom that the user will build, modify, and generally play with.
    this.particleAtom = new ParticleAtom( 80, 150 );

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
    this.particleAtom.protons.addListener( updateNumberAtom );
    this.particleAtom.electrons.addListener( updateNumberAtom );
    this.particleAtom.neutrons.addListener( updateNumberAtom );

    // Update the stability state and counter on changes.
    this.nucleusStable = true;
    this.nucleusJumpCountdown = NUCLEUS_JUMP_PERIOD;
    this.nucleusOffset = Vector2.ZERO;
    this.numberAtom.atomicMassProperty.link( function( atomicMass ) {
      var stable = atomicMass > 0 ? AtomIdentifier.isStable( thisModel.numberAtom.protonCount, thisModel.numberAtom.neutronCount ) : true;
      if ( thisModel.nucleusStable !== stable ) {
        // Stability has changed.
        thisModel.nucleusStable = stable;
        if ( stable ) {
          thisModel.nucleusJumpCountdown = NUCLEUS_JUMP_PERIOD;
          thisModel.particleAtom.nucleusOffset = Vector2.ZERO;
        }
      }
    } );
  }

  inherit( PropertySet,
           BuildAnAtomModel,
           {
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
               if ( this.nucleusStable === false ) {
                 this.nucleusJumpCountdown -= dt;
                 if ( this.nucleusJumpCountdown <= 0 ) {
                   this.nucleusJumpCountdown = NUCLEUS_JUMP_PERIOD;
                   if ( this.particleAtom.nucleusOffset === Vector2.ZERO ) {
                     var angle = Math.random() * 2 * Math.PI;
                     var distance = Math.random() * MAX_NUCLEUS_JUMP;
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
               for ( var i = 0; i < particleCollection.length; i++ ) {
                 particlesToRemove[i] = particleCollection.at( i );
               }
               particleCollection.clear();
               _.each( particlesToRemove, function( particle ) {
                 bucket.addParticleFirstOpen( particle );
               }, this );
             },

             reset: function() {
               callSuper( PropertySet, 'reset', this);

               // Move all particles that are in the atom back into their respective buckets.
               this._moveParticlesFromAtomToBucket( this.particleAtom.protons, this.buckets.protonBucket );
               this._moveParticlesFromAtomToBucket( this.particleAtom.neutrons, this.buckets.neutronBucket );
               this._moveParticlesFromAtomToBucket( this.particleAtom.electrons, this.buckets.electronBucket );
             }
           } );

  return BuildAnAtomModel;
} );
