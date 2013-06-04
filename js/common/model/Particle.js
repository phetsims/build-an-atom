// Copyright 2002-2013, University of Colorado

define( function( require ) {
  'use strict';

  // Imports
  var Fort = require( 'FORT/Fort' );
  var Vector2 = require( 'DOT/Vector2' );
  var SharedConstants = require( 'common/SharedConstants' );

  // Constants
  var DEFAULT_PARTICLE_VELOCITY = 200; // Basically in pixels/sec.

  var Particle = Fort.Model.extend( {
      defaults: {
        type: 'proton',
        position: Vector2.ZERO,
        destination: Vector2.ZERO,
        radius: SharedConstants.NUCLEON_RADIUS,
        velocity: DEFAULT_PARTICLE_VELOCITY,
        userControlled: false
      }
    }
  );

  // Step function, moves towards destination if not currently there.
  Particle.prototype.step = function( dt ) {
    if ( !this.userControlled ) {
      var distanceToDestination = this.position.distance( this.destination );
      if ( distanceToDestination > dt * this.velocity ) {
        // Move a step toward the destination.
        this.position = this.position.plus( this.destination.minus( this.position ).normalized().timesScalar( this.velocity * dt ) );
      }
      else if ( distanceToDestination > 0 ) {
        // Less than one time step away, so just go to the destination.
        this.position = this.destination;
      }
    }
  };

  Particle.prototype.moveImmediatelyToDestination = function() {
    this.position = this.destination;
  };

  Particle.prototype.setPositionAndDestination = function( newPosition ) {
    this.destination = newPosition;
    this.moveImmediatelyToDestination();
  };

  //------- Factory methods for creating particle instances ------------------
  Particle.createProton = function() {
    return new Particle( { type: 'proton', radius: SharedConstants.NUCLEON_RADIUS } );
  };

  Particle.createNeutron = function() {
    return new Particle( { type: 'neutron', radius: SharedConstants.NUCLEON_RADIUS } );
  };

  Particle.createElectron = function() {
    return new Particle( { type: 'electron', radius: SharedConstants.ELECTRON_RADIUS } );
  };

  return Particle;
} );
