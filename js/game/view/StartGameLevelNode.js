// Copyright 2013-2017, University of Colorado Boulder

/**
 * Screen that is presented to the user that allows them to select from a set
 * of game levels to play.
 *
 * @author John Blanco
 */
define( function( require ) {
  'use strict';

  // modules
  var BAAGameModel = require( 'BUILD_AN_ATOM/game/model/BAAGameModel' );
  var BAASharedConstants = require( 'BUILD_AN_ATOM/common/BAASharedConstants' );
  var buildAnAtom = require( 'BUILD_AN_ATOM/buildAnAtom' );
  var Image = require( 'SCENERY/nodes/Image' );
  var inherit = require( 'PHET_CORE/inherit' );
  var LevelSelectionItemNode = require( 'VEGAS/LevelSelectionItemNode' );
  var massChargeIcon = require( 'image!BUILD_AN_ATOM/mass_charge_icon.png' );
  var Node = require( 'SCENERY/nodes/Node' );
  var periodicTableIcon = require( 'image!BUILD_AN_ATOM/periodic_table_icon.png' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var questionMarkIcon = require( 'image!BUILD_AN_ATOM/question_mark_icon.png' );
  var ResetAllButton = require( 'SCENERY_PHET/buttons/ResetAllButton' );
  var ShredConstants = require( 'SHRED/ShredConstants' );
  var SoundToggleButton = require( 'SCENERY_PHET/buttons/SoundToggleButton' );
  var symbolQuestionIcon = require( 'image!BUILD_AN_ATOM/symbol_question_icon.png' );
  var Text = require( 'SCENERY/nodes/Text' );
  var TimerToggleButton = require( 'SCENERY_PHET/buttons/TimerToggleButton' );

  // strings
  var chooseYourGameString = require( 'string!BUILD_AN_ATOM/chooseYourGame' );

  // constants
  var CONTROLS_INSET = 10;
  var BASE_COLOR = '#D4AAD4';

  /**
   * @param {BAAGameModel} gameModel
   * @param {Bounds2} layoutBounds
   * @param {Tandem} tandem
   * @constructor
   */
  function StartGameLevelNode( gameModel, layoutBounds, tandem ) {

    Node.call( this ); // Call super constructor.

    // Title
    var title = new Text( chooseYourGameString, {
      font: new PhetFont( 30 ),
      maxWidth: layoutBounds.width
    } );
    this.addChild( title );

    // Buttons for starting a game level.
    var periodicTableGameButton = new LevelSelectionItemNode(
      new Image( periodicTableIcon ),
      BAAGameModel.CHALLENGES_PER_LEVEL,
      function() {
        gameModel.startGameLevel( 'periodic-table-game', tandem.createTandem( 'periodicTableGame' ) );
      },
      gameModel.scores[ ShredConstants.MAP_LEVEL_NAME_TO_NUMBER( 'periodic-table-game' ) ],
      BAAGameModel.MAX_POINTS_PER_GAME_LEVEL,
      _.extend( {
          tandem: tandem.createTandem( 'periodicTableGameButton' )
        },
        {
          baseColor: BASE_COLOR,
          bestTimeProperty: gameModel.bestTimes[ ShredConstants.MAP_LEVEL_NAME_TO_NUMBER( 'periodic-table-game' ) ],
          bestTimeVisibleProperty: gameModel.bestTimeVisible[ ShredConstants.MAP_LEVEL_NAME_TO_NUMBER( 'periodic-table-game' ) ]
        }
      )
    );
    this.addChild( periodicTableGameButton );
    var massAndChargeGameButton = new LevelSelectionItemNode(
      new Image( massChargeIcon ),
      BAAGameModel.CHALLENGES_PER_LEVEL,
      function() {
        gameModel.startGameLevel( 'mass-and-charge-game', tandem.createTandem( 'massAndChargeGame' ) );
      },
      gameModel.scores[ ShredConstants.MAP_LEVEL_NAME_TO_NUMBER( 'mass-and-charge-game' ) ],
      BAAGameModel.MAX_POINTS_PER_GAME_LEVEL, {
        tandem: tandem.createTandem( 'massAndChargeGameButton' ),
        baseColor: BASE_COLOR,
        bestTimeProperty: gameModel.bestTimes[ ShredConstants.MAP_LEVEL_NAME_TO_NUMBER( 'mass-and-charge-game' ) ],
        bestTimeVisibleProperty: gameModel.bestTimeVisible[ ShredConstants.MAP_LEVEL_NAME_TO_NUMBER( 'mass-and-charge-game' ) ]
      }
    );
    this.addChild( massAndChargeGameButton );
    var symbolGameButton = new LevelSelectionItemNode(
      new Image( symbolQuestionIcon ),
      BAAGameModel.CHALLENGES_PER_LEVEL,
      function() {
        gameModel.startGameLevel( 'symbol-game', tandem.createTandem( 'symbolGame' ) );
      },
      gameModel.scores[ ShredConstants.MAP_LEVEL_NAME_TO_NUMBER( 'symbol-game' ) ],
      BAAGameModel.MAX_POINTS_PER_GAME_LEVEL, {
        tandem: tandem.createTandem( 'symbolGameButton' ),
        baseColor: BASE_COLOR,
        bestTimeProperty: gameModel.bestTimes[ ShredConstants.MAP_LEVEL_NAME_TO_NUMBER( 'symbol-game' ) ],
        bestTimeVisibleProperty: gameModel.bestTimeVisible[ ShredConstants.MAP_LEVEL_NAME_TO_NUMBER( 'symbol-game' ) ]
      }
    );
    this.addChild( symbolGameButton );
    var advancedSymbolGameButton = new LevelSelectionItemNode(
      new Image( questionMarkIcon ),
      BAAGameModel.CHALLENGES_PER_LEVEL,
      function() {
        gameModel.startGameLevel( 'advanced-symbol-game', tandem.createTandem( 'advancedSymbolGame' ) );
      },
      gameModel.scores[ ShredConstants.MAP_LEVEL_NAME_TO_NUMBER( 'advanced-symbol-game' ) ],
      BAAGameModel.MAX_POINTS_PER_GAME_LEVEL, {
        tandem: tandem.createTandem( 'advancedSymbolGameButton' ),
        baseColor: BASE_COLOR,
        bestTimeProperty: gameModel.bestTimes[ ShredConstants.MAP_LEVEL_NAME_TO_NUMBER( 'advanced-symbol-game' ) ],
        bestTimeVisibleProperty: gameModel.bestTimeVisible[ ShredConstants.MAP_LEVEL_NAME_TO_NUMBER( 'advanced-symbol-game' ) ]
      }
    );
    this.addChild( advancedSymbolGameButton );

    // Sound and timer controls.
    var timerToggleButton = new TimerToggleButton( gameModel.timerEnabledProperty, {
      stroke: 'gray',
      tandem: tandem.createTandem( 'timerToggleButton' )
    } );
    this.addChild( timerToggleButton );
    var soundToggleButton = new SoundToggleButton( gameModel.soundEnabledProperty, {
      stroke: 'gray',
      tandem: tandem.createTandem( 'soundToggleButton' )
    } );
    this.addChild( soundToggleButton );

    // Reset all button.
    var resetAllButton = new ResetAllButton( {
      listener: function() {
        gameModel.reset();
      },
      radius: BAASharedConstants.RESET_BUTTON_RADIUS,
      tandem: tandem.createTandem( 'resetAllButton' ),
      touchAreaDilation: 8
    } );
    this.addChild( resetAllButton );

    // Layout
    var buttonWidth = periodicTableGameButton.width; // Note: Assumes all buttons are the same size.
    var interButtonXSpace = buttonWidth * 0.2;
    var buttonCenterY = layoutBounds.height * 0.5;
    periodicTableGameButton.right = layoutBounds.centerX - 1.5 * interButtonXSpace - buttonWidth;
    periodicTableGameButton.centerY = buttonCenterY;
    massAndChargeGameButton.left = periodicTableGameButton.right + interButtonXSpace;
    massAndChargeGameButton.centerY = buttonCenterY;
    symbolGameButton.left = massAndChargeGameButton.right + interButtonXSpace;
    symbolGameButton.centerY = buttonCenterY;
    advancedSymbolGameButton.left = symbolGameButton.right + interButtonXSpace;
    advancedSymbolGameButton.centerY = buttonCenterY;
    resetAllButton.right = layoutBounds.width - CONTROLS_INSET;
    resetAllButton.bottom = layoutBounds.height - CONTROLS_INSET;
    title.centerX = layoutBounds.width / 2;
    title.centerY = periodicTableGameButton.top / 2;
    soundToggleButton.left = CONTROLS_INSET;
    soundToggleButton.bottom = layoutBounds.height - CONTROLS_INSET;
    timerToggleButton.left = CONTROLS_INSET;
    timerToggleButton.bottom = soundToggleButton.top - 10;
  }

  buildAnAtom.register( 'StartGameLevelNode', StartGameLevelNode );

  // Inherit from Node.
  return inherit( Node, StartGameLevelNode );
} );
