// Copyright 2013-2021, University of Colorado Boulder

/**
 * a Scenery Node that allows the user to select which game level to play
 *
 * @author John Blanco
 */

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
import buildAnAtom from '../../buildAnAtom.js';
import buildAnAtomStrings from '../../buildAnAtomStrings.js';
import BAASharedConstants from '../../common/BAASharedConstants.js';
import GameModel from '../model/GameModel.js';

const chooseYourGameString = buildAnAtomStrings.chooseYourGame;

// constants
const CONTROLS_INSET = 10;
const BASE_COLOR = '#D4AAD4';

class StartGameLevelNode extends Node {

  /**
   * @param {GameModel} gameModel
   * @param {Bounds2} layoutBounds
   * @param {Tandem} tandem
   */
  constructor( gameModel, layoutBounds, tandem ) {

    super();

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
      listener: () => {
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
}

// helper function to create level selection buttons, helps to avoid code duplication
function createLevelSelectionButton( gameModel, icon, levelName, gameLevelTandemName, tandem ) {
  const levelNumber = ShredConstants.MAP_LEVEL_NAME_TO_NUMBER( levelName );
  return new LevelSelectionButton(
    new Image( icon ),
    gameModel.scores[ levelNumber ],
    {
      listener: () => {
        gameModel.startGameLevel( levelName, tandem.createTandem( gameLevelTandemName ) );
      },
      baseColor: BASE_COLOR,
      bestTimeProperty: gameModel.bestTimes[ levelNumber ],
      bestTimeVisibleProperty: gameModel.bestTimeVisible[ levelNumber ],
      tandem: tandem.createTandem( `${gameLevelTandemName}Button` ),
      scoreDisplayOptions: {
        numberOfStars: GameModel.CHALLENGES_PER_LEVEL,
        perfectScore: GameModel.MAX_POINTS_PER_GAME_LEVEL
      },
      soundPlayerIndex: levelNumber
    }
  );
}

buildAnAtom.register( 'StartGameLevelNode', StartGameLevelNode );

export default StartGameLevelNode;