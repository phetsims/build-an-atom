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
  var Star = require( 'game/view/Star' );

  // Constants
  var BACKGROUND_COLOR = 'white';
  var UNFILLED_STAR_COLOR = 'rgb( 220, 220, 220 )';
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

    // Add the un-highlighted progress stars.
    var starDiameter = height * 0.8;
    var distanceBetweenStarCenters = starDiameter + ( width - ( starDiameter * numStars ) ) / numStars;
    for ( var i = 0; i < numStars; i++ ) {
      boundingRectangle.addChild( new Star( height * 0.8,
        {
          fill: UNFILLED_STAR_COLOR,
          centerX: distanceBetweenStarCenters * ( i + 0.5 ),
          centerY: height / 2
        } ) );
    }
  };

  // Inherit from Node.
  inherit( Node, GameProgressIndicator );

  return GameProgressIndicator;
} );
