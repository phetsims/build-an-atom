// Copyright 2002-2013, University of Colorado Boulder

/**
 * Screen that is presented to the user that allows them to select from a set
 * of sub-games (a.k.a. levels) to play.
 */
define( function( require ) {
  'use strict';

  // Imports
  var CheckBox = require( 'SUN/CheckBox' );
  var GameStartButton = require( 'game/view/GameStartButton' );
  var Image = require( 'SCENERY/nodes/Image' );
  var periodicTableIcon = require( 'image!BUILD_AN_ATOM/periodic_table_icon.png' );
  var massChargeIcon = require( 'image!BUILD_AN_ATOM/mass_charge_icon.png' );
  var symbolQuestionIcon = require( 'image!BUILD_AN_ATOM/symbol_question_icon.png' );
  var questionMarkIcon = require( 'image!BUILD_AN_ATOM/question_mark_icon.png' );
  var inherit = require( 'PHET_CORE/inherit' );
  var LinearGradient = require( 'SCENERY/util/LinearGradient' );
  var Node = require( 'SCENERY/nodes/Node' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var ResetAllButton = require( 'SCENERY_PHET/ResetAllButton' );
  var SharedConstants = require( 'common/SharedConstants' );
  var SoundToggleButton = require( 'SCENERY_PHET/SoundToggleButton' );
  var Text = require( 'SCENERY/nodes/Text' );
  var TimerToggleButton = require( 'game/view/TimerToggleButton' );

  // Constants
  var CONTROL_INSET = 20;

  /**
   * @param {BAAGameModel} gameModel
   * @param {Bounds2} layoutBounds
   * @constructor
   */
  var StartSubGameNode = function( gameModel, layoutBounds ) {

    Node.call( this ); // Call super constructor.

    // Title
    var title = new Text( "Choose Your Game!", { font: new PhetFont( 30 ) } );
    this.addChild( title );

    // Buttons for starting a sub-game (a.k.a. a level).
    var periodicTableGameButton = new GameStartButton(
      new Image( periodicTableIcon ),
      function() {
        gameModel.startSubGame( 'periodic-table-game' );
      },
      gameModel.bestScores[ SharedConstants.SUB_GAME_TO_LEVEL( 'periodic-table-game' )],
      gameModel.MAX_POINTS_PER_GAME_LEVEL );
    this.addChild( periodicTableGameButton );
    var massAndChangeGameButton = new GameStartButton(
      new Image( massChargeIcon ),
      function() {
        gameModel.startSubGame( 'mass-and-charge-game' );
      },
      gameModel.bestScores[ SharedConstants.SUB_GAME_TO_LEVEL( 'mass-and-charge-game' )],
      gameModel.MAX_POINTS_PER_GAME_LEVEL );
    this.addChild( massAndChangeGameButton );
    var symbolGameButton = new GameStartButton(
      new Image( symbolQuestionIcon ),
      function() {
        gameModel.startSubGame( 'symbol-game' );
      },
      gameModel.bestScores[ SharedConstants.SUB_GAME_TO_LEVEL( 'symbol-game' )],
      gameModel.MAX_POINTS_PER_GAME_LEVEL );
    this.addChild( symbolGameButton );
    var advancedSymbolGameButton = new GameStartButton(
      new Image( questionMarkIcon ),
      function() {
        gameModel.startSubGame( 'advanced-symbol-game' );
      },
      gameModel.bestScores[ SharedConstants.SUB_GAME_TO_LEVEL( 'advanced-symbol-game' )],
      gameModel.MAX_POINTS_PER_GAME_LEVEL );
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
  };

  // Inherit from Node.
  return inherit( Node, StartSubGameNode );
} );
