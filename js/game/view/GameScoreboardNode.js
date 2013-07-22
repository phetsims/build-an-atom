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
  var imageLoader = require( 'imageLoader' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Text = require( 'SCENERY/nodes/Text' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var TextButton = require( 'SUN/TextButton' );

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

    // Level
    var levelNode = new Text( '', { font: FONT } );
    thisNode.addChild( levelNode );
    gameModel.levelProperty.link( function( level ) {
      levelNode.text = "Level: " + level;
    } );

    // Score
    var scoreNode = new Text( '', { font: FONT } );
    thisNode.addChild( scoreNode );
    gameModel.scoreProperty.link( function( score ) {
      scoreNode.text = "Score: " + score;
    } );

    // Timer
    var timerIcon = new Image( imageLoader.getImage( 'blue-stopwatch.png' ) );
    thisNode.addChild( timerIcon );
    var timerValue = new Text( '0', { font: FONT } );
    thisNode.addChild( timerValue );
    gameModel.elapsedTimeProperty.link( function( elapsedTime ) {
      timerValue.text = thisNode._formatTime( elapsedTime );
      if ( gameModel.bestTimes[gameModel.level] ) {
        timerValue.text += ( ' (Your best: ' + thisNode._formatTime( gameModel.bestTimes[gameModel.level] ) + ')' );
      }
    } );

    // New Game button
    var newGameButton = new TextButton( 'New Game', // TODO: i18n
      function() { gameModel.newGame(); },
      { font: new PhetFont( 20 ), rectangleFillUp: new Color( 235, 235, 235 ) } );
    thisNode.addChild( newGameButton );

    // Layout - everything in a row, vertically centered, offsets were set by eyeballing them.
    var maxChildHeight = 0;
    thisNode.children.forEach( function( childNode ) {
      maxChildHeight = childNode.height > maxChildHeight ? childNode.height : maxChildHeight;
    } );
    var backgroundHeight = maxChildHeight + 2 * Y_MARGIN;
    levelNode.left = X_MARGIN;
    levelNode.centerY = backgroundHeight / 2;
    scoreNode.centerX = options.width * 0.28;
    scoreNode.centerY = backgroundHeight / 2;
    timerIcon.right = options.width / 2;
    timerIcon.centerY = backgroundHeight / 2;
    timerValue.left = timerIcon.right + 5;
    timerValue.centerY = backgroundHeight / 2;
    newGameButton.right = options.width - X_MARGIN;
    newGameButton.centerY = backgroundHeight / 2;

    // Add background.  This is added last since it's sized to fit the child nodes above.
    var background = new Rectangle( 0, 0, options.width, backgroundHeight, 0, 0,
      {
        fill: options.backgroundFillColor,
        stroke: options.backgroundStroke,
        lineWidth: options.backgroundLineWidth } );
    thisNode.addChild( background );
    background.moveToBack();
  }

  // Inherit from Node.
  inherit( Node, GameScoreboardNode, {
    _formatTime: function( secs ) {
      var hours = Math.floor( secs / 3600 );
      var minutes = Math.floor( (secs - (hours * 3600)) / 60 );
      var seconds = Math.floor( secs - (hours * 3600) - (minutes * 60) );
      return ( hours > 0 ? hours + ':' : '' ) + minutes + ':' + ( seconds > 9 ? seconds : '0' + seconds );
    }
  } );

  return GameScoreboardNode;
} );
