// Copyright 2002-2013, University of Colorado Boulder

/**
 * Node that indicates a user's progress on a game or game level by
 * illuminating stars.
 */
define( function( require ) {
  'use strict';

  // Imports
  var Color = require( 'SCENERY/util/Color' );
  var HalfStar = require( 'game/view/HalfStar' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var Star = require( 'game/view/Star' );

  // Constants
  var BACKGROUND_COLOR = 'white';
  var FILLED_STAR_COLOR = 'yellow';
  var FILLED_STAR_STROKE = 'black';
  var UNFILLED_STAR_COLOR = 'rgb( 220, 220, 220 )';
  var UNFILLED_STAR_STROKE = 'rgb( 190, 190, 190 )';

  /**
   * Constructor.
   *
   * @param width
   * @param height
   * @param rounding
   * @param numStars
   * @param scoreProperty
   * @constructor
   */
  function GameProgressIndicator( width, height, rounding, numStars, scoreProperty, maxPossibleScore ) {

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
    var unfilledStars = [];
    var filledStars = [];
    var filledHalfStars = [];
    for ( var i = 0; i < numStars; i++ ) {
      var starDiameter = height * 0.8;
      unfilledStars.push( new Star( starDiameter,
        {
          fill: UNFILLED_STAR_COLOR,
          stroke: UNFILLED_STAR_STROKE,
          lineWidth: 1,
          left: starLeft,
          centerY: height / 2
        } ) );
      boundingRectangle.addChild( unfilledStars[i] );
      filledStars.push( new Star( starDiameter,
        {
          fill: FILLED_STAR_COLOR,
          stroke: FILLED_STAR_STROKE,
          lineWidth: 1,
          left: starLeft,
          centerY: height / 2
        } ) );
      boundingRectangle.addChild( filledStars[i] );
      filledHalfStars.push( new HalfStar( starDiameter,
        {
          fill: FILLED_STAR_COLOR,
          stroke: FILLED_STAR_STROKE,
          lineWidth: 1,
          left: starLeft,
          centerY: height / 2
        } ) );
      boundingRectangle.addChild( filledHalfStars[i] );
      starLeft += distanceBetweenStars + starDiameter;
    }

    // Update star visibility based on proportion of game successfully completed.
    scoreProperty.link( function( score ) {
      var proportion = score / maxPossibleScore;
      var numFilledStars = Math.round( proportion * numStars );
      for ( var i = 0; i < numStars; i++ ) {
        filledStars[i].visible = i < numFilledStars;
      }
      filledHalfStars.forEach( function( halfStar ) {
        halfStar.visible = false;
      } );
      if ( proportion * numStars - numFilledStars > 0.49 ) {
        filledHalfStars[numFilledStars ].visible = true;
      }
    } );
  }

  // Inherit from Node.
  inherit( Node, GameProgressIndicator );

  return GameProgressIndicator;
} );
