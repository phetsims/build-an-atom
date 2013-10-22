// Copyright 2002-2013, University of Colorado Boulder

/**
 * Node that indicates a user's progress on a game or game level by
 * illuminating stars.
 *
 * @author John Blanco
 */
define( function( require ) {
  'use strict';

  // Imports
  var Color = require( 'SCENERY/util/Color' );
  var HalfStar = require( 'BUILD_AN_ATOM/game/view/HalfStar' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Star = require( 'BUILD_AN_ATOM/game/view/Star' );

  // Constants
  var FILLED_STAR_COLOR = 'yellow';
  var FILLED_STAR_STROKE = 'black';
  var UNFILLED_STAR_COLOR = 'rgb( 220, 220, 220 )';
  var UNFILLED_STAR_STROKE = 'rgb( 190, 190, 190 )';

  /**
   * Constructor.
   *
   * @param numStars
   * @param starDiameter
   * @param scoreProperty
   * @param maxPossibleScore
   * @constructor
   */
  function GameProgressIndicator( numStars, starDiameter, scoreProperty, maxPossibleScore ) {

    Node.call( this ); // Call super constructor.

    // Add the un-highlighted progress stars.
    var distanceBetweenStars = starDiameter * 0.15;
    var starLeft = 0;
    var unfilledStars = [];
    var filledStars = [];
    var filledHalfStars = [];
    var starHeight = new Star( starDiameter ).height;
    for ( var i = 0; i < numStars; i++ ) {
      unfilledStars.push( new Star( starDiameter,
        {
          fill: UNFILLED_STAR_COLOR,
          stroke: UNFILLED_STAR_STROKE,
          lineWidth: 1,
          left: starLeft,
          centerY: starHeight / 2,
          lineCap: 'round'
        } ) );
      this.addChild( unfilledStars[i] );
      filledStars.push( new Star( starDiameter,
        {
          fill: FILLED_STAR_COLOR,
          stroke: FILLED_STAR_STROKE,
          lineWidth: 1,
          left: starLeft,
          centerY: starHeight / 2,
          lineCap: 'round'
        } ) );
      this.addChild( filledStars[i] );
      filledHalfStars.push( new HalfStar( starDiameter,
        {
          fill: FILLED_STAR_COLOR,
          stroke: FILLED_STAR_STROKE,
          lineWidth: 1,
          left: starLeft,
          centerY: starHeight / 2,
          lineCap: 'round'
        } ) );
      this.addChild( filledHalfStars[i] );
      starLeft += distanceBetweenStars + starDiameter;
    }

    // Update star visibility based on proportion of game successfully completed.
    scoreProperty.link( function( score ) {
      var proportion = score / maxPossibleScore;
      var numFilledStars = Math.floor( proportion * numStars );
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
  return inherit( Node, GameProgressIndicator );
} );
