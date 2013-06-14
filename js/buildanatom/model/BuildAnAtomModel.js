// Copyright 2002-2013, University of Colorado

/**
 * Main model class for the first tab of the Build an Atom simulation.
 */
define( function( require ) {
  "use strict";

  // Imports
  var SharedConstants = require( 'common/SharedConstants' );
  var Utils = require( 'common/Utils' );
  var ParticleAtom = require( 'common/model/ParticleAtom' );
  var NumberAtom = require( 'common/model/NumberAtom' );
  var Particle = require( 'common/model/Particle' );
  var SphereBucket = require( 'PHETCOMMON/model/SphereBucket' );
  var Dimension2 = require( 'DOT/Dimension2' );
  var Vector2 = require( 'DOT/Vector2' );

  // Constants
  var NUM_PROTONS = 10;
  var NUM_NEUTRONS = 13;
  var NUM_ELECTRONS = 10;
  var NUCLEON_CAPTURE_RADIUS = 100;
  var BUCKET_WIDTH = 120;
  var BUCKET_HEIGHT = BUCKET_WIDTH * 0.5;
  var BUCKET_Y_OFFSET = -240;

  var placeNucleon = function( particle, bucket, atom ) {
    if ( particle.position.distance( atom.position ) < NUCLEON_CAPTURE_RADIUS ) {
      atom.addParticle( particle );
    }
    else {
      bucket.addParticleNearestOpen( particle, true );
    }
  };

  /**
   * Constructor for main model object.
   *
   * @constructor
   */
  function BuildAnAtomModel() {

    var thisModel = this;
    this.particleAtom = new ParticleAtom( 80, 150 );

    // Create the buckets that will hold the sub-atomic particles.
    this.buckets = {
      protonBucket: new SphereBucket(
        {
          position: new Vector2( -BUCKET_WIDTH * 1.1, BUCKET_Y_OFFSET ),
          size: new Dimension2( BUCKET_WIDTH, BUCKET_HEIGHT ),
          particleRadius: SharedConstants.NUCLEON_RADIUS,
          baseColor: 'red',
          caption: 'Protons',
          captionColor: 'white'
        }
      ),
      neutronBucket: new SphereBucket(
        {
          position: new Vector2( 0, BUCKET_Y_OFFSET ),
          size: new Dimension2( BUCKET_WIDTH, BUCKET_HEIGHT ),
          particleRadius: SharedConstants.NUCLEON_RADIUS,
          baseColor: '#e0e0e0',
          caption: 'Neutrons',
          captionColor: 'white'
        }
      ),
      electronBucket: new SphereBucket(
        {
          position: new Vector2( BUCKET_WIDTH * 1.1, BUCKET_Y_OFFSET ),
          size: new Dimension2( BUCKET_WIDTH, BUCKET_HEIGHT ),
          particleRadius: SharedConstants.ELECTRON_RADIUS,
          baseColor: 'blue',
          caption: 'Electrons',
          captionColor: 'white'
        }
      )
    };

    // Add the subatomic particles to the model.
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

    // Have a 'number atom' that tracks the state of the particle atom.
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
  }

  BuildAnAtomModel.prototype.step = function( dt ) {
    this.nucleons.forEach( function( nucleon ) {
      nucleon.step( dt );
    } );
    this.electrons.forEach( function( electron ) {
      electron.step( dt );
    } );
  };

  BuildAnAtomModel.prototype.reset = function() {

    // Define a function for moving particles from atom to bucket.
    var moveParticlesFromAtomToBucket = function( particleCollection, bucket ) {
      var particlesToRemove = [];
      for ( var i = 0; i < particleCollection.length; i++ ) {
        particlesToRemove[i] = particleCollection.at( i );
      }
      particleCollection.clear();
      _.each( particlesToRemove, function( particle ) {
        bucket.addParticleFirstOpen( particle );
      }, this );
    };

    // Move all particles that are in the atom back into their respective buckets.
    moveParticlesFromAtomToBucket( this.particleAtom.protons, this.buckets.protonBucket );
    moveParticlesFromAtomToBucket( this.particleAtom.neutrons, this.buckets.neutronBucket );
    moveParticlesFromAtomToBucket( this.particleAtom.electrons, this.buckets.electronBucket );
  };

  return BuildAnAtomModel;
} );
