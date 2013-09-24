// Copyright 2002-2013, University of Colorado Boulder

/**
 * Node that is shown when the user completes a level of the game.
 */
define( function( require ) {
  'use strict';

  // Imports
  var Color = require( 'SCENERY/util/Color' );
  var Dimension2 = require( 'DOT/Dimension2' );
  var GameProgressIndicator = require( 'game/view/GameProgressIndicator' );
  var GameStartButton = require( 'game/view/GameStartButton' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Line = require( 'SCENERY/nodes/Line' );
  var Node = require( 'SCENERY/nodes/Node' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var Property = require( 'AXON/Property' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var TextButton = require( 'SUN/TextButton' );
  var Text = require( 'SCENERY/nodes/Text' );
  var Utils = require( 'common/Utils' );

  // Constants
  var BACKGROUND_COLOR = new Color( 180, 205, 255 );
  var INFO_TEXT_FONT = new PhetFont( { size: 22, weight: 'bold' } );

  /**
   * @param {BAAGameModel} gameModel
   * @param {Bounds2} layoutBounds
   * @constructor
   */
  var LevelCompletedNode = function( gameModel, layoutBounds ) {

    Node.call( this ); // Call super constructor.

    var size = new Dimension2( layoutBounds.width * 0.5, layoutBounds.height * 0.6 );

    var rounding = size.width * 0.1;
    var background = new Rectangle( 0, 0, size.width, size.height, rounding, rounding,
      {
        fill: BACKGROUND_COLOR,
        stroke: 'black',
        lineWidth: 2
      } );

    this.addChild( background );

    var proportionCorrect = gameModel.score / gameModel.MAX_POINTS_PER_GAME_LEVEL;
    //TODO: i18n
    var titleText = 'Level Completed';
    if ( proportionCorrect > 0.95 ){
      titleText = 'Excellent!'
    }
    else if ( proportionCorrect > 0.75 ){
      titleText = 'Great!'
    }
    else if ( proportionCorrect >= 0.5 ){
      titleText = 'Good!'
    }
    var title = new Text( titleText, {font: new PhetFont( { size: 28, weight: 'bold' } )} ); // TODO: i18n
    title.scale( Math.min( 1, (size.width * 0.9 ) / title.width ) );
    background.addChild( title );

    var gameProgressIndicator = new GameProgressIndicator( size.width * 0.8, size.width * 0.2, size.width * 0.05, gameModel.PROBLEMS_PER_SUB_GAME,
      new Property( gameModel.score ), gameModel.MAX_POINTS_PER_GAME_LEVEL );
    background.addChild( gameProgressIndicator );

    // TODO: i18n of everything below
    var score = new Text( 'Score: ' + gameModel.scoreProperties[ gameModel.level ].value + ' out of ' + gameModel.MAX_POINTS_PER_GAME_LEVEL, { font: INFO_TEXT_FONT } );
    background.addChild( score );
    var time = new Text( 'Time: ' + Utils.formatTime( gameModel.elapsedTime ), { font: INFO_TEXT_FONT } );
    background.addChild( time );

    var continueButton = new TextButton( 'Continue',
      function() {
        gameModel.state = 'selectSubGame';
      },
      { font: new PhetFont( 28 ), rectangleFillUp: new Color( 255, 255, 0 ) } );
    background.addChild( continueButton );

    // Layout
    var inset = size.width * 0.05;
    var centerX = size.width / 2;
    title.centerX = centerX;
    title.top = inset;
    gameProgressIndicator.centerX = centerX;
    gameProgressIndicator.top = title.bottom + inset / 2;
    continueButton.centerX = centerX;
    continueButton.bottom = size.height - inset;
    var verticalSpaceForInfoText = continueButton.top - gameProgressIndicator.bottom;
    score.centerX = centerX;
    time.centerX = centerX;
    if ( gameModel.timerEnabled ) {
      score.centerY = gameProgressIndicator.bottom + verticalSpaceForInfoText * 0.3;
      time.centerY = gameProgressIndicator.bottom + verticalSpaceForInfoText * 0.7;
    }
    else {
      time.visible = false;
      score.centerY = gameProgressIndicator.bottom + verticalSpaceForInfoText * 0.5;
    }
  };

  // Inherit from Node.
  inherit( Node, LevelCompletedNode );

  return LevelCompletedNode;
} );