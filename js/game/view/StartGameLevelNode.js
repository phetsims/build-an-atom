// Copyright 2002-2013, University of Colorado Boulder

/**
 * Screen that is presented to the user that allows them to select from a set
 * of different game levels to play.
 *
 * @author John Blanco
 */
define( function( require ) {
  'use strict';

  // Imports
  var CheckBox = require( 'SUN/CheckBox' );
  var Image = require( 'SCENERY/nodes/Image' );
  var inherit = require( 'PHET_CORE/inherit' );
  var LevelStartButton = require( 'VEGAS/LevelStartButton' );
  var massChargeIcon = require( 'image!BUILD_AN_ATOM/mass_charge_icon.png' );
  var LinearGradient = require( 'SCENERY/util/LinearGradient' );
  var Node = require( 'SCENERY/nodes/Node' );
  var periodicTableIcon = require( 'image!BUILD_AN_ATOM/periodic_table_icon.png' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var questionMarkIcon = require( 'image!BUILD_AN_ATOM/question_mark_icon.png' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var ResetAllButton = require( 'SCENERY_PHET/ResetAllButton' );
  var SharedConstants = require( 'BUILD_AN_ATOM/common/SharedConstants' );
  var SoundToggleButton = require( 'SCENERY_PHET/SoundToggleButton' );
  var symbolQuestionIcon = require( 'image!BUILD_AN_ATOM/symbol_question_icon.png' );
  var Text = require( 'SCENERY/nodes/Text' );
  var TimerToggleButton = require( 'SCENERY_PHET/TimerToggleButton' );

  // Strings
  var chooseYourGameString = require( 'string!BUILD_AN_ATOM/game.chooseYourGame' );

  // Constants
  var CONTROL_INSET = 20;
  var NUM_STARS_ON_BUTTON = 5;
  var START_BUTTON_OPTIONS = { backgroundColor: 'rgb( 242, 255, 204 )', highlightedBackgroundColor: 'rgb( 224, 255, 122 )' };

  /**
   * @param {BAAGameModel} gameModel
   * @param {Bounds2} layoutBounds
   * @constructor
   */
  function StartGameLevelNode( gameModel, layoutBounds ) {

    Node.call( this ); // Call super constructor.

    // Title
    var title = new Text( chooseYourGameString, { font: new PhetFont( 30 ) } );
    this.addChild( title );

    // Buttons for starting a game level.
    var periodicTableGameButton = new LevelStartButton(
      new Image( periodicTableIcon ),
      NUM_STARS_ON_BUTTON,
      function() {
        gameModel.startGameLevel( 'periodic-table-game' );
      },
      gameModel.bestScores[ SharedConstants.MAP_LEVEL_NAME_TO_NUMBER( 'periodic-table-game' )],
      gameModel.MAX_POINTS_PER_GAME_LEVEL,
      START_BUTTON_OPTIONS );
    this.addChild( periodicTableGameButton );
    var massAndChangeGameButton = new LevelStartButton(
      new Image( massChargeIcon ),
      NUM_STARS_ON_BUTTON,
      function() {
        gameModel.startGameLevel( 'mass-and-charge-game' );
      },
      gameModel.bestScores[ SharedConstants.MAP_LEVEL_NAME_TO_NUMBER( 'mass-and-charge-game' )],
      gameModel.MAX_POINTS_PER_GAME_LEVEL,
      START_BUTTON_OPTIONS );
    this.addChild( massAndChangeGameButton );
    var symbolGameButton = new LevelStartButton(
      new Image( symbolQuestionIcon ),
      NUM_STARS_ON_BUTTON,
      function() {
        gameModel.startGameLevel( 'symbol-game' );
      },
      gameModel.bestScores[ SharedConstants.MAP_LEVEL_NAME_TO_NUMBER( 'symbol-game' )],
      gameModel.MAX_POINTS_PER_GAME_LEVEL,
      START_BUTTON_OPTIONS );
    this.addChild( symbolGameButton );
    var advancedSymbolGameButton = new LevelStartButton(
      new Image( questionMarkIcon ),
      NUM_STARS_ON_BUTTON,
      function() {
        gameModel.startGameLevel( 'advanced-symbol-game' );
      },
      gameModel.bestScores[ SharedConstants.MAP_LEVEL_NAME_TO_NUMBER( 'advanced-symbol-game' )],
      gameModel.MAX_POINTS_PER_GAME_LEVEL,
      START_BUTTON_OPTIONS );
    this.addChild( advancedSymbolGameButton );

    // Sound and timer controls.
    var timerToggleButton = new TimerToggleButton( gameModel.timerEnabledProperty );
    this.addChild( timerToggleButton );
    var soundToggleButton = new SoundToggleButton( gameModel.soundEnabledProperty );
    this.addChild( soundToggleButton );

    // Reset button.
    var resetButton = new ResetAllButton( function() {
      gameModel.reset();
    } );
    resetButton.scale( 0.8 ); // Empirically determined scale factor.
    this.addChild( resetButton );

    // Layout
    var buttonWidth = periodicTableGameButton.width; // Note: Assumes all buttons are the same size.
    var interButtonXSpace = buttonWidth * 0.2;
    var buttonCenterY = layoutBounds.height * 0.45;
    periodicTableGameButton.right = layoutBounds.centerX - 1.5 * interButtonXSpace - buttonWidth;
    periodicTableGameButton.centerY = buttonCenterY;
    massAndChangeGameButton.left = periodicTableGameButton.right + interButtonXSpace;
    massAndChangeGameButton.centerY = buttonCenterY;
    symbolGameButton.left = massAndChangeGameButton.right + interButtonXSpace;
    symbolGameButton.centerY = buttonCenterY;
    advancedSymbolGameButton.left = symbolGameButton.right + interButtonXSpace;
    advancedSymbolGameButton.centerY = buttonCenterY;
    resetButton.right = layoutBounds.width - CONTROL_INSET;
    resetButton.bottom = layoutBounds.height - CONTROL_INSET;
    title.centerX = layoutBounds.width / 2;
    title.centerY = periodicTableGameButton.top / 2;
    soundToggleButton.left = CONTROL_INSET;
    soundToggleButton.bottom = layoutBounds.height - CONTROL_INSET;
    timerToggleButton.left = CONTROL_INSET;
    timerToggleButton.bottom = soundToggleButton.top - 10;
  }

  // Inherit from Node.
  return inherit( Node, StartGameLevelNode );
} );
