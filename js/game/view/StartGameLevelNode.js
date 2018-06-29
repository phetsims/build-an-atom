// Copyright 2013-2017, University of Colorado Boulder

/**
 * a Scenery Node that allows the user to select which game level to play
 *
 * @author John Blanco
 */
define( function( require ) {
  'use strict';

  // modules
  var BAAGameModel = require( 'BUILD_AN_ATOM/game/model/BAAGameModel' );
  var BAASharedConstants = require( 'BUILD_AN_ATOM/common/BAASharedConstants' );
  var buildAnAtom = require( 'BUILD_AN_ATOM/buildAnAtom' );
  var HBox = require( 'SCENERY/nodes/HBox' );
  var Image = require( 'SCENERY/nodes/Image' );
  var inherit = require( 'PHET_CORE/inherit' );
  var LevelSelectionButton = require( 'VEGAS/LevelSelectionButton' );
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

    Node.call( this );

    // title
    var title = new Text( chooseYourGameString, {
      font: new PhetFont( 30 ),
      maxWidth: layoutBounds.width,
      centerX: layoutBounds.centerX
    } );
    this.addChild( title );

    // buttons for starting a game level
    var periodicTableGameButton = createLevelSelectionButton(
      gameModel,
      periodicTableIcon,
      'periodic-table-game',
      'periodicTableGame',
      tandem
    );
    var massAndChargeGameButton = createLevelSelectionButton(
      gameModel,
      massChargeIcon,
      'mass-and-charge-game',
      'massAndChargeGame',
      tandem
    );
    var symbolGameButton = createLevelSelectionButton(
      gameModel,
      symbolQuestionIcon,
      'symbol-game',
      'symbolGame',
      tandem
    );
    var advancedSymbolGameButton = createLevelSelectionButton(
      gameModel,
      questionMarkIcon,
      'advanced-symbol-game',
      'advancedSymbolGame',
      tandem
    );
    var buttonHBox = new HBox( {
      children: [ periodicTableGameButton, massAndChargeGameButton, symbolGameButton, advancedSymbolGameButton ],
      spacing: 30,
      centerY: layoutBounds.centerY,
      centerX: layoutBounds.centerX
    } );
    this.addChild( buttonHBox );

    // sound and timer controls
    var soundToggleButton = new SoundToggleButton( gameModel.soundEnabledProperty, {
      stroke: 'gray',
      tandem: tandem.createTandem( 'soundToggleButton' ),
      left: CONTROLS_INSET,
      bottom: layoutBounds.height - CONTROLS_INSET
    } );
    this.addChild( soundToggleButton );
    var timerToggleButton = new TimerToggleButton( gameModel.timerEnabledProperty, {
      stroke: 'gray',
      tandem: tandem.createTandem( 'timerToggleButton' ),
      left: soundToggleButton.left,
      bottom: soundToggleButton.top - 10
    } );
    this.addChild( timerToggleButton );

    // reset all button
    var resetAllButton = new ResetAllButton( {
      listener: function() {
        gameModel.reset();
      },
      radius: BAASharedConstants.RESET_BUTTON_RADIUS,
      tandem: tandem.createTandem( 'resetAllButton' ),
      touchAreaDilation: 8,
      right: layoutBounds.width - CONTROLS_INSET,
      bottom: layoutBounds.height - CONTROLS_INSET
    } );
    this.addChild( resetAllButton );

    // additional layout
    title.centerY = ( layoutBounds.minY + buttonHBox.top ) / 2;
  }

  // helper function to create level selection buttons, helps to avoid code duplication
  function createLevelSelectionButton( gameModel, icon, levelName, gameLevelTandemName, tandem ) {
    return new LevelSelectionButton(
      new Image( icon ),
      gameModel.scores[ ShredConstants.MAP_LEVEL_NAME_TO_NUMBER( levelName ) ],
      {
        listener: function() {
          gameModel.startGameLevel( levelName, tandem.createTandem( gameLevelTandemName ) );
        },
        baseColor: BASE_COLOR,
        bestTimeProperty: gameModel.bestTimes[ ShredConstants.MAP_LEVEL_NAME_TO_NUMBER( levelName ) ],
        bestTimeVisibleProperty: gameModel.bestTimeVisible[ ShredConstants.MAP_LEVEL_NAME_TO_NUMBER( levelName ) ],
        tandem: tandem.createTandem( gameLevelTandemName + 'Button' ),
        scoreDisplayOptions: {
          numberOfStars: BAAGameModel.CHALLENGES_PER_LEVEL,
          perfectScore: BAAGameModel.MAX_POINTS_PER_GAME_LEVEL
        }
      }
    );
  }

  buildAnAtom.register( 'StartGameLevelNode', StartGameLevelNode );

  return inherit( Node, StartGameLevelNode );
} );
