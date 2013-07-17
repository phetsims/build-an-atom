// Copyright 2002-2013, University of Colorado Boulder

define( function( require ) {
  'use strict';

  // Imports
  var PropertySet = require( 'AXON/PropertySet' );
  var Vector2 = require( 'DOT/Vector2' );
  var SharedConstants = require( 'common/SharedConstants' );
  var inherit = require( 'PHET_CORE/inherit' );

  // Constants
  var DEFAULT_PARTICLE_VELOCITY = 200; // Basically in pixels/sec.

  function Particle( type ) {
    PropertySet.call( this,
      { type: type,
        position: Vector2.ZERO,
        destination: Vector2.ZERO,
        radius: type === 'electron' ? SharedConstants.ELECTRON_RADIUS : SharedConstants.NUCLEON_RADIUS,
        velocity: DEFAULT_PARTICLE_VELOCITY,
        userControlled: false
      } );
  }

  inherit( PropertySet, Particle, {
    step: function( dt ) {
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
    },

    moveImmediatelyToDestination: function() {
      this.position = this.destination;
    },

    setPositionAndDestination: function( newPosition ) {
      this.destination = newPosition;
      this.moveImmediatelyToDestination();
    }
  } );

  return Particle;
} );
