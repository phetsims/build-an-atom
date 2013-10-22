// Copyright 2002-2013, University of Colorado Boulder

/**
 * Node that represents a half-star shape.
 *
 * @author John Blanco
 */
define( function( require ) {
  'use strict';

  // Imports
  var inherit = require( 'PHET_CORE/inherit' );
  var Path = require( 'SCENERY/nodes/Path' );
  var Shape = require( 'KITE/Shape' );
  var Vector2 = require( 'DOT/Vector2' );

  function HalfStar( diameter, options ) {
    var starShape = new Shape();
    var angle = -Math.PI / 2;
    for ( var i = 0; i < 6; i++ ) {
      var vector = Vector2.createPolar( i % 2 === 0 ? diameter / 2 : diameter * 0.27, angle );
      starShape.lineTo( vector.x, vector.y );
      angle -= ( 2 * Math.PI ) / 10;
    }
    Path.call( this, starShape, options ); // Call super constructor.
  }

  // Inherit from Path.
  return inherit( Path, HalfStar );
} );
