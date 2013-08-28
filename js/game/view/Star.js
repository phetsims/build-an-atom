// Copyright 2002-2013, University of Colorado Boulder

/**
 * Node that represents a star shape.
 */
define( function( require ) {
  'use strict';

  // Imports
  var inherit = require( 'PHET_CORE/inherit' );
  var Path = require( 'SCENERY/nodes/Path' );
  var Shape = require( 'KITE/Shape' );
  var Vector2 = require( 'DOT/Vector2' );

  var Star = function Star( diameter, options ) {
    var starShape = new Shape();
    var angle = -Math.PI / 2;
    for ( var i = 0; i < 10; i++ ) {
      var vector = Vector2.createPolar( i % 2 === 0 ? diameter / 2 : diameter / 4, angle );
      starShape.lineTo( vector.x, vector.y );
      angle += ( 2 * Math.PI ) / 10;
    }
    starShape.close();
    options.shape = starShape;

    Path.call( this, options ); // Call super constructor.
  };

  // Inherit from Path.
  inherit( Path, Star );

  return Star;
} );
