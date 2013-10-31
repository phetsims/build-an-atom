// Copyright 2002-2013, University of Colorado Boulder
define( function( require ) {
  'use strict';

  // Imports
  var Vector2 = require( 'DOT/Vector2' );
  var Property = require( 'AXON/Property' );

  // Constants
  var ACCELERATION_DUE_TO_GRAVITY = -9.8; // meters per second squared.

  /**
   * @param mass
   * @constructor
   */
  function MassForceVector( mass ) {
    this.mass = mass;
    this.forceVectorProperty = new Property( this.generateVector( mass ) );
  }

  MassForceVector.prototype = {
    update: function() {
      this.forceVectorProperty.set( this.generateVector( this.mass ) );
    },
    isObfuscated: function() {
      return this.mass.isMystery;
    },
    generateVector: function( mass ) {
      return {
        origin: new Vector2( mass.position.x, mass.position.y ),
        vector: new Vector2( 0, mass.mass * ACCELERATION_DUE_TO_GRAVITY )
      }
    }
  };

  return MassForceVector;
} );
