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
        userControlled: false,
        zLayer: 0 // Used in view, integer value, higher means further back.
      } );
  }

  return inherit( PropertySet, Particle, {
    step: function( dt ) {
      if ( !this.userControlled ) {
        var distanceToDestination = this.position.distance( this.destination );
        if ( distanceToDestination > dt * this.velocity ) {
          // This was broken up into individual steps in an attempt to solve
          // an issue where complex vector operations sometimes didn't work.
          var stepMagnitude = this.velocity * dt;
          var stepAngle = Math.atan2( this.destination.y - this.position.y, this.destination.x - this.position.x );
          var stepVector = Vector2.createPolar( stepMagnitude, stepAngle );

          // Move a step toward the destination.
          this.position = this.position.plus( stepVector );
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
      assert && assert( newPosition instanceof Vector2, "Attempt to set non-vector position." );
      if ( newPosition instanceof Vector2 ) {
        this.destination = newPosition;
        this.moveImmediatelyToDestination();
      }
      else {
        // TODO: Remove this log before publication.
        console.log( "Error: Attempt to set position that is not a vector" );
      }
    }
  } );
} );
