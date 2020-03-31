// Copyright 2013-2020, University of Colorado Boulder

/**
 * a Scenery Node that allows the user to select which game level to play
 *
 * @author John Blanco
 */

import inherit from '../../../../phet-core/js/inherit.js';
import ResetAllButton from '../../../../scenery-phet/js/buttons/ResetAllButton.js';
import TimerToggleButton from '../../../../scenery-phet/js/buttons/TimerToggleButton.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import HBox from '../../../../scenery/js/nodes/HBox.js';
import Image from '../../../../scenery/js/nodes/Image.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import Text from '../../../../scenery/js/nodes/Text.js';
import ShredConstants from '../../../../shred/js/ShredConstants.js';
import LevelSelectionButton from '../../../../vegas/js/LevelSelectionButton.js';
import massChargeIcon from '../../../images/mass_charge_icon_png.js';
import periodicTableIcon from '../../../images/periodic_table_icon_png.js';
import questionMarkIcon from '../../../images/question_mark_icon_png.js';
import symbolQuestionIcon from '../../../images/symbol_question_icon_png.js';
import buildAnAtomStrings from '../../buildAnAtomStrings.js';
import buildAnAtom from '../../buildAnAtom.js';
import BAASharedConstants from '../../common/BAASharedConstants.js';
import BAAGameModel from '../model/BAAGameModel.js';

const chooseYourGameString = buildAnAtomStrings.chooseYourGame;

// constants
const CONTROLS_INSET = 10;
const BASE_COLOR = '#D4AAD4';

/**
 * @param {BAAGameModel} gameModel
 * @param {Bounds2} layoutBounds
 * @param {Tandem} tandem
 * @constructor
 */
function StartGameLevelNode( gameModel, layoutBounds, tandem ) {

  Node.call( this );

  // title
  const title = new Text( chooseYourGameString, {
    font: new PhetFont( 30 ),
    maxWidth: layoutBounds.width,
    centerX: layoutBounds.centerX
  } );
  this.addChild( title );

  // buttons for starting a game level
  const periodicTableGameButton = createLevelSelectionButton(
    gameModel,
    periodicTableIcon,
    'periodic-table-game',
    'periodicTableGame',
    tandem
  );
  const massAndChargeGameButton = createLevelSelectionButton(
    gameModel,
    massChargeIcon,
    'mass-and-charge-game',
    'massAndChargeGame',
    tandem
  );
  const symbolGameButton = createLevelSelectionButton(
    gameModel,
    symbolQuestionIcon,
    'symbol-game',
    'symbolGame',
    tandem
  );
  const advancedSymbolGameButton = createLevelSelectionButton(
    gameModel,
    questionMarkIcon,
    'advanced-symbol-game',
    'advancedSymbolGame',
    tandem
  );
  const buttonHBox = new HBox( {
    children: [ periodicTableGameButton, massAndChargeGameButton, symbolGameButton, advancedSymbolGameButton ],
    spacing: 30,
    centerY: layoutBounds.centerY,
    centerX: layoutBounds.centerX
  } );
  this.addChild( buttonHBox );

  // timer control
  const timerToggleButton = new TimerToggleButton( gameModel.timerEnabledProperty, {
    stroke: 'gray',
    tandem: tandem.createTandem( 'timerToggleButton' ),
    left: CONTROLS_INSET,
    bottom: layoutBounds.height - CONTROLS_INSET
  } );
  this.addChild( timerToggleButton );

  // reset all button
  const resetAllButton = new ResetAllButton( {
    listener: function() {
      gameModel.reset();
    },
    radius: BAASharedConstants.RESET_BUTTON_RADIUS,
    tandem: tandem.createTandem( 'resetAllButton' ),
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

inherit( Node, StartGameLevelNode );
export default StartGameLevelNode;