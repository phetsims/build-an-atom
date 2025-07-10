// Copyright 2013-2025, University of Colorado Boulder

/**
 * a Scenery Node that allows the user to select which game level to play
 *
 * @author John Blanco
 */

import Bounds2 from '../../../../dot/js/Bounds2.js';
import ResetAllButton from '../../../../scenery-phet/js/buttons/ResetAllButton.js';
import TimerToggleButton from '../../../../scenery-phet/js/buttons/TimerToggleButton.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import HBox from '../../../../scenery/js/layout/nodes/HBox.js';
import Image from '../../../../scenery/js/nodes/Image.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import Text from '../../../../scenery/js/nodes/Text.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import LevelSelectionButton from '../../../../vegas/js/LevelSelectionButton.js';
import ScoreDisplayStars from '../../../../vegas/js/ScoreDisplayStars.js';
import massChargeIcon_png from '../../../images/massChargeIcon_png.js';
import periodicTableIcon_png from '../../../images/periodicTableIcon_png.js';
import questionMarkIcon_png from '../../../images/questionMarkIcon_png.js';
import symbolQuestionIcon_png from '../../../images/symbolQuestionIcon_png.js';
import buildAnAtom from '../../buildAnAtom.js';
import BuildAnAtomStrings from '../../BuildAnAtomStrings.js';
import BAAConstants from '../../common/BAAConstants.js';
import GameLevel from '../model/GameLevel.js';
import GameModel from '../model/GameModel.js';

// constants
const CONTROLS_INSET = 10;
const BASE_COLOR = '#D4AAD4';

class StartGameLevelNode extends Node {

  public constructor( gameModel: GameModel, layoutBounds: Bounds2, tandem: Tandem ) {

    super();

    const title = new Text( BuildAnAtomStrings.chooseYourGameStringProperty, {
      font: new PhetFont( 30 ),
      maxWidth: layoutBounds.width,
      centerX: layoutBounds.centerX
    } );
    this.addChild( title );
    title.boundsProperty.link( () => {
      title.centerX = layoutBounds.centerX;
    } );

    // buttons for starting a game level
    const periodicTableGameButton = this.createLevelSelectionButton(
      gameModel,
      periodicTableIcon_png,
      gameModel.levels[ 0 ],
      'periodicTableGame',
      tandem
    );
    const massAndChargeGameButton = this.createLevelSelectionButton(
      gameModel,
      massChargeIcon_png,
      gameModel.levels[ 1 ],
      'massAndChargeGame',
      tandem
    );
    const symbolGameButton = this.createLevelSelectionButton(
      gameModel,
      symbolQuestionIcon_png,
      gameModel.levels[ 2 ],
      'symbolGame',
      tandem
    );
    const advancedSymbolGameButton = this.createLevelSelectionButton(
      gameModel,
      questionMarkIcon_png,
      gameModel.levels[ 3 ],
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
      radius: BAAConstants.RESET_BUTTON_RADIUS,
      tandem: tandem.createTandem( 'resetAllButton' ),
      right: layoutBounds.width - CONTROLS_INSET,
      bottom: layoutBounds.height - CONTROLS_INSET
    } );
    this.addChild( resetAllButton );

    // additional layout
    title.centerY = ( layoutBounds.minY + buttonHBox.top ) / 2;
  }

// helper function to create level selection buttons, helps to avoid code duplication
  private createLevelSelectionButton(
    gameModel: GameModel,
    icon: HTMLImageElement,
    level: GameLevel,
    gameLevelTandemName: string,
    tandem: Tandem
  ): LevelSelectionButton {
    const levelNumber = level.index;
    return new LevelSelectionButton(
      new Image( icon ),
      gameModel.levels[ levelNumber ].bestScoreProperty,
      {
        listener: () => {
          gameModel.levelProperty.value = level;
        },
        baseColor: BASE_COLOR,
        tandem: tandem.createTandem( `${gameLevelTandemName}Button` ),
        createScoreDisplay: scoreProperty => new ScoreDisplayStars( scoreProperty, {
          numberOfStars: GameModel.CHALLENGES_PER_LEVEL,
          perfectScore: GameModel.MAX_POINTS_PER_GAME_LEVEL
        } ),
        soundPlayerIndex: levelNumber
      }
    );
  }
}

buildAnAtom.register( 'StartGameLevelNode', StartGameLevelNode );

export default StartGameLevelNode;