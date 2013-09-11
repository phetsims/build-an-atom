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
   * @param rounding
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
      } );
    this.addChild( boundingRectangle );

    // Add the un-highlighted progress stars.
    var starDiameter = height * 0.8;
    var distanceBetweenStars = ( width - ( starDiameter * numStars ) ) / ( numStars + 1 );
    var starLeft = distanceBetweenStars;
    var stars = [];
    for ( var i = 0; i < numStars; i++ ) {
      stars.push( new Star( height * 0.8,
        {
          fill: UNFILLED_STAR_COLOR,
          left: starLeft,
          centerY: height / 2
        } ) );
      boundingRectangle.addChild( stars[i] );
      starLeft += distanceBetweenStars + starDiameter;
    }

    proportionFinishedProperty.link( function( proportionFinished ) {
      // This only handles integers, could be generalized if desired.
      var numFilledStars = Math.floor( proportionFinished * numStars );
      for ( var i = 0; i < numStars; i++ ) {
        stars[i].fill = i < numFilledStars ? FILLED_STAR_COLOR : UNFILLED_STAR_COLOR;
      }
    } );
  }

  // Inherit from Node.
  inherit( Node, GameProgressIndicator );

  return GameProgressIndicator;
} );
