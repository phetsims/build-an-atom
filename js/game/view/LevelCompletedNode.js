// Copyright 2002-2013, University of Colorado Boulder
define( function( require ) {
  'use strict';

  // Imports
  var Color = require( 'SCENERY/util/Color' );
  var Dimension2 = require( 'DOT/Dimension2' );
  var GameStartButton = require( 'game/view/GameStartButton' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Line = require( 'SCENERY/nodes/Line' );
  var Node = require( 'SCENERY/nodes/Node' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var TextButton = require( 'SUN/TextButton' );
  var Text = require( 'SCENERY/nodes/Text' );
  var Utils = require( 'common/Utils' );

  // Constants
  var BACKGROUND_COLOR = new Color( 128, 223, 255 );
  var DIVIDER_LINE_OPTIONS = { stroke: 'black', lineWidth: 2 };
  var INFO_TEXT_FONT = new PhetFont( 20 );

  /**
   * @param {BAAGameModel} gameModel
   * @param {Bounds2} layoutBounds
   * @constructor
   */
  var LevelCompletedNode = function( gameModel, layoutBounds ) {

    Node.call( this ); // Call super constructor.

    var size = new Dimension2( layoutBounds.width * 0.33, layoutBounds.height * 0.6 );

    var rounding = size.width * 0.1;
    var background = new Rectangle( 0, 0, size.width, size.height, rounding, rounding,
      {
        fill: BACKGROUND_COLOR,
        stroke: 'black',
        lineWidth: 2
      } );

    this.addChild( background );

    var title = new Text( 'Level Completed', {font: new PhetFont( { size: 28, weight: 'bold' } )} ); // TODO: i18n
    title.scale( Math.min( 1, (size.width * 0.9 ) / title.width ) );
    background.addChild( title );

    var dividerLineWidth = size.width * 0.8;
    var upperDividerLine = new Line( 0, 0, dividerLineWidth, 0, DIVIDER_LINE_OPTIONS );
    background.addChild( upperDividerLine );
    var lowerDividerLine = new Line( 0, 0, dividerLineWidth, 0, DIVIDER_LINE_OPTIONS );
    background.addChild( lowerDividerLine );

    // TODO: i18n of everything below
    var level = new Text( 'Level: ' + ( gameModel.level + 1), { font: INFO_TEXT_FONT } );
    background.addChild( level );
    var scoreText = gameModel.scoreProperties[ gameModel.level ].value + ' of ' + gameModel.MAX_POINTS_PER_GAME_LEVEL;
    if ( gameModel.scoreProperties[ gameModel.level ].value === gameModel.MAX_POINTS_PER_GAME_LEVEL ) {
      scoreText += "(Perfect!)";
    }
    var score = new Text( 'Score: ' + gameModel.scoreProperties[ gameModel.level ].value + ' of ' + gameModel.MAX_POINTS_PER_GAME_LEVEL, { font: INFO_TEXT_FONT } );
    background.addChild( score );
    var time = new Text( 'Time: ' + Utils.formatTime( gameModel.elapsedTime ), { font: INFO_TEXT_FONT } );
    background.addChild( time );

    var doneButton = new TextButton( 'OK',
      function() {
        gameModel.state = 'selectSubGame';
      },
      { font: new PhetFont( 24 ), rectangleFillUp: new Color( 128, 223, 255 ) } );
    background.addChild( doneButton );

    // Layout
    var inset = size.width * 0.05;
    title.centerX = background.width / 2;
    title.top = inset;
    upperDividerLine.centerX = size.width / 2;
    upperDividerLine.top = title.bottom + inset;
    doneButton.centerX = size.width / 2;
    doneButton.bottom = size.height - inset;
    lowerDividerLine.centerX = size.width / 2;
    lowerDividerLine.bottom = doneButton.top - inset;
    level.left = upperDividerLine.left;
    score.left = upperDividerLine.left;
    time.left = upperDividerLine.left;
    if ( gameModel.timerEnabled ) {
      level.centerY = size.height * 0.33;
      score.centerY = size.height * 0.5;
      time.centerY = size.height * 0.67;
    }
    else {
      time.visible = false;
      level.centerY = size.height * 0.4;
      score.centerY = size.height * 0.6;
    }
  };

  // Inherit from Node.
  inherit( Node, LevelCompletedNode );

  return LevelCompletedNode;
} );
