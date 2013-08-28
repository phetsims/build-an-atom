// Copyright 2002-2013, University of Colorado Boulder

/**
 * Node that indicates a user's progress on a game or game level by
 * illuminating stars.
 */
define( function( require ) {
  'use strict';

  // Imports
  var Color = require( 'SCENERY/util/Color' );
  var Node = require( 'SCENERY/nodes/Node' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );

  // Constants
  var BACKGROUND_COLOR = 'white';
  var UNFILLED_STAR_COLOR = 'rgb( 245, 245, 245 )';
  var FILLED_STAR_COLOR = 'yellow';

  /**
   * Constructor.
   *
   * @param width
   * @param height
   * @param numStars
   * @param proportionFinishedProperty
   * @constructor
   */
  function GameProgressIndicator( width, height, rounding, numStars, proportionFinishedProperty ) {

    Node.call( this ); // Call super constructor.

    // Add the bounding rectangle, also the parent node for everything else.
    var boundingRectangle = new Rectangle( 0, 0, width, height, rounding, rounding,
      {
        fill: BACKGROUND_COLOR,
        stroke: 'black',
        lineWidth: 1
      } )
    this.addChild( boundingRectangle );
  };

  // Inherit from Node.
  inherit( Node, GameProgressIndicator );

  return GameProgressIndicator;
} );
