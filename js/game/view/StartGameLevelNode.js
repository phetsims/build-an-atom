// Copyright 2013-2015, University of Colorado Boulder

/**
 * Screen that is presented to the user that allows them to select from a set
 * of game levels to play.
 *
 * @author John Blanco
 */
define( function( require ) {
  'use strict';

  // modules
  var Image = require( 'SCENERY/nodes/Image' );
  var inherit = require( 'PHET_CORE/inherit' );
  var LevelSelectionButton = require( 'VEGAS/LevelSelectionButton' );
  var massChargeIcon = require( 'image!BUILD_AN_ATOM/mass_charge_icon.png' );
  var Node = require( 'SCENERY/nodes/Node' );
  var periodicTableIcon = require( 'image!BUILD_AN_ATOM/periodic_table_icon.png' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var questionMarkIcon = require( 'image!BUILD_AN_ATOM/question_mark_icon.png' );
  var ResetAllButton = require( 'SCENERY_PHET/buttons/ResetAllButton' );
  var SharedConstants = require( 'BUILD_AN_ATOM/common/SharedConstants' );
  var SoundToggleButton = require( 'SCENERY_PHET/buttons/SoundToggleButton' );
  var symbolQuestionIcon = require( 'image!BUILD_AN_ATOM/symbol_question_icon.png' );
  var Text = require( 'SCENERY/nodes/Text' );
  var TimerToggleButton = require( 'SCENERY_PHET/buttons/TimerToggleButton' );

  // strings
  var chooseYourGameString = require( 'string!BUILD_AN_ATOM/chooseYourGame' );

  // constants
  var CONTROL_INSET = 20;
  var NUM_STARS_ON_BUTTON = 5;
  var START_BUTTON_OPTIONS = {
    backgroundColor: 'rgb( 242, 255, 204 )',
    highlightedBackgroundColor: 'rgb( 224, 255, 122 )'
  };

  /**
   * @param {BAAGameModel} gameModel
   * @param {Bounds2} layoutBounds
   * @param {Tandem} tandem
   * @constructor
   */
  function StartGameLevelNode( gameModel, layoutBounds, tandem ) {

    Node.call( this ); // Call super constructor.

    // Title
    var title = new Text( chooseYourGameString, { font: new PhetFont( 30 ) } );
    this.addChild( title );

    // Buttons for starting a game level.
    var periodicTableGameButton = new LevelSelectionButton(
      new Image( periodicTableIcon ),
      NUM_STARS_ON_BUTTON,
      function() {
        gameModel.startGameLevel( 'periodic-table-game' );
      },
      gameModel.bestScores[ SharedConstants.MAP_LEVEL_NAME_TO_NUMBER( 'periodic-table-game' ) ],
      gameModel.MAX_POINTS_PER_GAME_LEVEL,
      _.extend( {
          tandem: tandem.createTandem( 'periodicTableGameButton' )
        },
        START_BUTTON_OPTIONS
      )
    );
    this.addChild( periodicTableGameButton );
    var massAndChangeGameButton = new LevelSelectionButton(
      new Image( massChargeIcon ),
      NUM_STARS_ON_BUTTON,
      function() {
        gameModel.startGameLevel( 'mass-and-charge-game' );
      },
      gameModel.bestScores[ SharedConstants.MAP_LEVEL_NAME_TO_NUMBER( 'mass-and-charge-game' ) ],
      gameModel.MAX_POINTS_PER_GAME_LEVEL,
      START_BUTTON_OPTIONS );
    this.addChild( massAndChangeGameButton );
    var symbolGameButton = new LevelSelectionButton(
      new Image( symbolQuestionIcon ),
      NUM_STARS_ON_BUTTON,
      function() {
        gameModel.startGameLevel( 'symbol-game' );
      },
      gameModel.bestScores[ SharedConstants.MAP_LEVEL_NAME_TO_NUMBER( 'symbol-game' ) ],
      gameModel.MAX_POINTS_PER_GAME_LEVEL,
      START_BUTTON_OPTIONS );
    this.addChild( symbolGameButton );
    var advancedSymbolGameButton = new LevelSelectionButton(
      new Image( questionMarkIcon ),
      NUM_STARS_ON_BUTTON,
      function() {
        gameModel.startGameLevel( 'advanced-symbol-game' );
      },
      gameModel.bestScores[ SharedConstants.MAP_LEVEL_NAME_TO_NUMBER( 'advanced-symbol-game' ) ],
      gameModel.MAX_POINTS_PER_GAME_LEVEL,
      START_BUTTON_OPTIONS );
    this.addChild( advancedSymbolGameButton );

    // Sound and timer controls.
    var timerToggleButton = new TimerToggleButton( gameModel.timerEnabledProperty, { stroke: 'gray' } );
    this.addChild( timerToggleButton );
    var soundToggleButton = new SoundToggleButton( gameModel.soundEnabledProperty, { stroke: 'gray' } );
    this.addChild( soundToggleButton );

    // Reset button.
    var resetButton = new ResetAllButton(
      {
        listener: function() {
          gameModel.reset();
        },
        scale: 0.85
      } );
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
