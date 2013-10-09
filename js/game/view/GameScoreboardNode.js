// Copyright 2002-2013, University of Colorado Boulder

/**
 * Standard game scoreboard.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 * @author John Blanco
 */
define( function( require ) {
  'use strict';

  // Imports
  var Color = require( 'SCENERY/util/Color' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var Image = require( 'SCENERY/nodes/Image' );
  var SimpleClockIcon = require( 'game/view/SimpleClockIcon' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Text = require( 'SCENERY/nodes/Text' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var TextButton = require( 'SUN/TextButton' );
  var Utils = require( 'common/Utils' );

  // Constants
  var FONT = new PhetFont( 20 );
  var X_MARGIN = 20;
  var Y_MARGIN = 5;

  /**
   * @param gameModel
   * @param options
   * @constructor
   */
  function GameScoreboardNode( gameModel, options ) {

    Node.call( this ); // Call super constructor.
    var thisNode = this;

    options = _.extend(
      {
        // Defaults
        backgroundFillColor: 'rgb( 180, 205, 255 )',
        backgroundStroke: 'black',
        backgroundLineWidth: 1,
        width: 700
      }, options );

    // Progress indicator
    var progressNode = new Text( '', { font: FONT } );
    thisNode.addChild( progressNode );
    gameModel.problemIndexProperty.link( function( problemIndex ) {
      progressNode.text = 'Challenge ' + ( problemIndex + 1 ) + ' of ' + gameModel.PROBLEMS_PER_SUB_GAME;
    } );

    // Score
    var scoreNode = new Text( '', { font: FONT } );
    thisNode.addChild( scoreNode );
    gameModel.scoreProperty.link( function( score ) {
      scoreNode.text = "Score: " + score;
    } );

    // Timer
    var timerIcon = new SimpleClockIcon( 15 );
    thisNode.addChild( timerIcon );
    var timerValue = new Text( '0', { font: FONT } );
    thisNode.addChild( timerValue );
    gameModel.elapsedTimeProperty.link( function( elapsedTime ) {
      timerValue.text = Utils.formatTime( elapsedTime );
    } );
    gameModel.timerEnabledProperty.link( function( timerEnabled ) {
      timerIcon.visible = timerEnabled;
      timerValue.visible = timerEnabled;
    } );

    // New Game button
    var newGameButton = new TextButton( 'New Game', // TODO: i18n
      function() { gameModel.newGame(); },
      { font: new PhetFont( 20 ), rectangleFillUp: new Color( 235, 235, 235 ) } );
    thisNode.addChild( newGameButton );

    // Layout - everything in a row, vertically centered, evenly spaced.
    var maxChildHeight = 0;
    thisNode.children.forEach( function( childNode ) {
      maxChildHeight = childNode.height > maxChildHeight ? childNode.height : maxChildHeight;
    } );
    var backgroundHeight = maxChildHeight + 2 * Y_MARGIN;
    progressNode.left = X_MARGIN;
    progressNode.centerY = backgroundHeight / 2;
    newGameButton.right = options.width - X_MARGIN;
    newGameButton.centerY = backgroundHeight / 2;
    var spaceForMiddleIndicators = newGameButton.left - progressNode.right;
    scoreNode.centerX = progressNode.right + spaceForMiddleIndicators * 0.3;
    scoreNode.centerY = backgroundHeight / 2;
    timerIcon.right = progressNode.right + spaceForMiddleIndicators * 0.7;
    timerIcon.centerY = backgroundHeight / 2;
    timerValue.left = timerIcon.right + 5;
    timerValue.centerY = backgroundHeight / 2;

    // Add background.  This is added last since it's sized to fit the child nodes above.
    var background = new Rectangle( 0, 0, options.width, backgroundHeight, 6, 6,
      {
        fill: options.backgroundFillColor,
        stroke: options.backgroundStroke,
        lineWidth: options.backgroundLineWidth } );
    thisNode.addChild( background );
    background.moveToBack();
  }

  // Inherit from Node.
  return inherit( Node, GameScoreboardNode );
} );
