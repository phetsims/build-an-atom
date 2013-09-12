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
  var SIZE = new Dimension2( 400, 500 ); // In screen coordinates (roughly pixels).
  var DIVIDER_LINE_WIDTH = SIZE.width * 0.8;
  var DIVIDER_LINE_OPTIONS = { stroke: 'black', lineWidth: 2 };

  /**
   * @param {BAAGameModel} gameModel
   * @param {Bounds2} layoutBounds
   * @constructor
   */
  var LevelCompletedNode = function( gameModel ) {

    Node.call( this ); // Call super constructor.

    var rounding = SIZE.width * 0.1;
    var background = new Rectangle( 0, 0, SIZE.width, SIZE.height, rounding, rounding,
      {
        fill: BACKGROUND_COLOR,
        stroke: 'black',
        lineWidth: 2
      } );

    this.addChild( background );

    var title = new Text( 'Level Completed', {font: new PhetFont( { size: 32, weight: 'bold' } )} ); // TODO: i18n
    title.scale( Math.min( 1, (SIZE.width * 0.9 ) / title.width ) );
    background.addChild( title );

    var upperDividerLine = new Line( 0, 0, DIVIDER_LINE_WIDTH, 0, DIVIDER_LINE_OPTIONS );
    background.addChild( upperDividerLine );
    var lowerDividerLine = new Line( 0, 0, DIVIDER_LINE_WIDTH, 0, DIVIDER_LINE_OPTIONS );
    background.addChild( lowerDividerLine );

    var score = new Text( 'Score: ' + gameModel.state.score, { font: new PhetFont( 20 ) } );
    background.addChild( score );

    var time = new Text( 'Time: ' + Utils.formatTime( gameModel.elapsedTime ), { font: new PhetFont( 20 ) } );
    background.addChild( time );

    var doneButton = new TextButton( 'OK',
      function() {
        gameModel.state = 'selectSubGame';
      },
      { font: new PhetFont( 24 ), rectangleFillUp: new Color( 128, 223, 255 ) } );
    background.addChild( doneButton );

    // Layout
    title.centerX = background.width / 2;
    title.top = 20;
    upperDividerLine.centerX = SIZE.width / 2;
    upperDividerLine.top = title.bottom + 20;
    doneButton.centerX = SIZE.width / 2;
    doneButton.bottom = SIZE.height - 20;
    lowerDividerLine.centerX = SIZE.width / 2;
    lowerDividerLine.bottom = doneButton.top - 20;
    time.left = 20;
    score.left = 20;
    if ( gameModel.timerEnabled ) {
      time.centerY = SIZE.height * 0.33;
      score.centerY = SIZE.height * 0.67;
    }
    else {
      time.visible = false;
      score.centerY = SIZE.height * 0.67;
    }
  };

  // Inherit from Node.
  inherit( Node, LevelCompletedNode );

  return LevelCompletedNode;
} );
