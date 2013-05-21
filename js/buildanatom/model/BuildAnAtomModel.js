// Copyright 2002-2013, University of Colorado

/**
 * Main model class for the first tab of the Build an Atom simulation.
 */
define( function ( require ) {

  var SharedConstants = require( 'common/SharedConstants' );
  var Utils = require( 'common/Utils' );
  var ParticleAtom = require( 'common/model/ParticleAtom' );
  var Particle = require( 'buildanatom/model/Particle' );
  var SphereBucket = require( 'PHETCOMMON/model/SphereBucket' );
  var Dimension2 = require( 'DOT/Dimension2' );
  var Vector2 = require( 'DOT/Vector2' );

  var NUM_PROTONS = 10;
  var NUM_NEUTRONS = 13;
  var NUM_ELECTRONS = 10;
  var NUCLEON_CAPTURE_RADIUS = 100;
  var ELECTRON_CAPTURE_RADIUS = ParticleAtom.OUTER_ELECTRON_SHELL_RADIUS * 1.1;
  var BUCKET_WIDTH = 150;
  var BUCKET_HEIGHT = BUCKET_WIDTH * 0.6;
  var BUCKET_Y_OFFSET = -300;

  var placeNucleon = function ( particle, bucket, atom ) {
    if ( particle.position.distance( atom.position ) < NUCLEON_CAPTURE_RADIUS ) {
      atom.addParticle( particle );
    }
    else {
      bucket.addParticleNearestOpen( particle );
    }
  }

  /**
   * Constructor for main model object.
   *
   * @constructor
   */
  function BuildAnAtomModel() {

    var thisModel = this;
    this.atom = new ParticleAtom( 0, 0 );

    // Create the buckets that will hold the sub-atomic particles.
    this.buckets = {
      protonBucket: new SphereBucket(
          {
            position: new Vector2( -BUCKET_WIDTH * 1.5, BUCKET_Y_OFFSET ),
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
            position: new Vector2( BUCKET_WIDTH * 1.5, BUCKET_Y_OFFSET ),
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
    _.times( NUM_PROTONS, function () {
      var proton = Particle.createProton();
      thisModel.nucleons.push( proton );
      thisModel.buckets.protonBucket.addParticleFirstOpen( proton );
      proton.link( 'userControlled', function ( userControlled ) {
        if ( !userControlled && !thisModel.buckets.protonBucket.containsParticle( proton ) ) {
          placeNucleon( proton, thisModel.buckets.protonBucket, thisModel.atom );
        }
      } );
    } );

    // Add the neutrons.
    _.times( NUM_NEUTRONS, function () {
      var neutron = Particle.createNeutron();
      thisModel.nucleons.push( neutron );
      thisModel.buckets.neutronBucket.addParticleFirstOpen( neutron );
      neutron.link( 'userControlled', function ( userControlled ) {
        if ( !userControlled && !thisModel.buckets.neutronBucket.containsParticle( neutron ) ) {
          placeNucleon( neutron, thisModel.buckets.neutronBucket, thisModel.atom );
        }
      } );
    } );

    // Add the electrons.
    _.times( NUM_ELECTRONS, function () {
      var electron = Particle.createElectron();
      thisModel.electrons.push( electron );
      thisModel.buckets.electronBucket.addParticleFirstOpen( electron );
      electron.link( 'userControlled', function ( userControlled ) {
        if ( !userControlled && !thisModel.buckets.electronBucket.containsParticle( electron ) ) {
          if ( electron.position.distance( Vector2.ZERO ) < ELECTRON_CAPTURE_RADIUS ) {
            thisModel.atom.addParticle( electron );
          }
          else {
            thisModel.buckets.electronBucket.addParticleNearestOpen( electron );
          }
        }
      } );
    } );
  }

  BuildAnAtomModel.prototype.step = function ( dt ) {
  };

  BuildAnAtomModel.prototype.reset = function () {

    // Define a function for moving particles from atom to bucket.
    var moveParticlesFromAtomToBucket = function( particleCollection, bucket ){
      var particlesToRemove = [];
      for ( var i = 0; i < particleCollection.length; i++ ) {
        particlesToRemove[i] = particleCollection.at( i );
      }
      particleCollection.reset();
      _.each( particlesToRemove, function( particle ){ bucket.addParticleFirstOpen( particle ); }, this );
    }

    // Move all particles that are in the atom back into their respective buckets.
    moveParticlesFromAtomToBucket( this.atom.protons, this.buckets.protonBucket );
    moveParticlesFromAtomToBucket( this.atom.neutrons, this.buckets.neutronBucket );
    moveParticlesFromAtomToBucket( this.atom.electrons, this.buckets.electronBucket );
  };

  return BuildAnAtomModel;
} );
