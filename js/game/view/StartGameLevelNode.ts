// Copyright 2013-2025, University of Colorado Boulder

/**
 * A Scenery Node that allows the user to select which game level to play.
 *
 * @author John Blanco
 */

import Bounds2 from '../../../../dot/js/Bounds2.js';
import InfoButton from '../../../../scenery-phet/js/buttons/InfoButton.js';
import ResetAllButton from '../../../../scenery-phet/js/buttons/ResetAllButton.js';
import TimerToggleButton from '../../../../scenery-phet/js/buttons/TimerToggleButton.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import HBox from '../../../../scenery/js/layout/nodes/HBox.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import RichText from '../../../../scenery/js/nodes/RichText.js';
import Text from '../../../../scenery/js/nodes/Text.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import GameInfoDialog from '../../../../vegas/js/GameInfoDialog.js';
import LevelSelectionButton from '../../../../vegas/js/LevelSelectionButton.js';
import ScoreDisplayStars from '../../../../vegas/js/ScoreDisplayStars.js';
import buildAnAtom from '../../buildAnAtom.js';
import BuildAnAtomFluent from '../../BuildAnAtomFluent.js';
import BAAColors from '../../common/BAAColors.js';
import BAAConstants from '../../common/BAAConstants.js';
import BAAQueryParameters from '../../common/BAAQueryParameters.js';
import GameLevel from '../model/GameLevel.js';
import GameModel from '../model/GameModel.js';
import AdvancedSymbolLevelIcon from './AdvancedSymbolLevelIcon.js';
import MassAndChargeLevelIcon from './MassAndChargeLevelIcon.js';
import PeriodicTableLevelIcon from './PeriodicTableLevelIcon.js';
import SymbolLevelIcon from './SymbolLevelIcon.js';

// constants
const CONTROLS_INSET = 10;

class StartGameLevelNode extends Node {

  public constructor( gameModel: GameModel, layoutBounds: Bounds2, tandem: Tandem ) {

    super();

    const title = new Text( BuildAnAtomFluent.chooseYourGameStringProperty, {
      font: new PhetFont( 30 ),
      maxWidth: layoutBounds.width * 0.6,
      centerX: layoutBounds.centerX
    } );
    this.addChild( title );

    // Create and add the decays info dialog and button.
    const gamesInfoDialog = new GameInfoDialog( [
        BuildAnAtomFluent.level1DescriptionStringProperty,
        BuildAnAtomFluent.level2DescriptionStringProperty,
        BuildAnAtomFluent.level3DescriptionStringProperty,
        BuildAnAtomFluent.level4DescriptionStringProperty
      ], {
        gameLevels: BAAQueryParameters.gameLevels,
        title: new RichText( BuildAnAtomFluent.gamesInfoTitleStringProperty, { font: new PhetFont( 35 ) } ),
        tandem: tandem.createTandem( 'gamesInfoDialog' ),
        ySpacing: 20,
        descriptionTextOptions: {
          font: new PhetFont( 30 )
        }
      }
    );
    const gamesInfoButton = new InfoButton( {
      listener: () => gamesInfoDialog.show(),
      iconFill: 'rgb( 50, 145, 184 )',
      scale: 0.4,
      touchAreaDilation: 15,
      tandem: tandem.createTandem( 'gamesInfoButton' )
    } );
    this.addChild( gamesInfoButton );

    title.boundsProperty.link( () => {
      title.centerX = layoutBounds.centerX;
      gamesInfoButton.left = title.right + CONTROLS_INSET;
      gamesInfoButton.centerY = title.centerY;
    } );

    // buttons for starting a game level
    const levelButtonsTandem = tandem.createTandem( 'levelButtons' );
    const periodicTableLevelButton = this.createLevelSelectionButton(
      gameModel,
      new PeriodicTableLevelIcon(),
      gameModel.levels[ 0 ],
      'Periodic table level',
      levelButtonsTandem
    );
    const massAndChargeLevelButton = this.createLevelSelectionButton(
      gameModel,
      new MassAndChargeLevelIcon(),
      gameModel.levels[ 1 ],
      'Mass and charge level',
      levelButtonsTandem
    );
    const symbolLevelButton = this.createLevelSelectionButton(
      gameModel,
      new SymbolLevelIcon(),
      gameModel.levels[ 2 ],
      'Symbol level',
      levelButtonsTandem
    );
    const advancedSymbolLevelButton = this.createLevelSelectionButton(
      gameModel,
      new AdvancedSymbolLevelIcon(),
      gameModel.levels[ 3 ],
      'Advanced symbol level',
      levelButtonsTandem
    );
    const buttonHBox = new HBox( {
      children: [ periodicTableLevelButton, massAndChargeLevelButton, symbolLevelButton, advancedSymbolLevelButton ],
      spacing: 30,
      centerY: layoutBounds.centerY,
      centerX: layoutBounds.centerX
    } );
    this.addChild( buttonHBox );
    buttonHBox.boundsProperty.link( () => {
      buttonHBox.centerX = layoutBounds.centerX;
    } );

    // timer control
    const timerToggleButton = new TimerToggleButton( gameModel.timerEnabledProperty, {
      stroke: 'gray',
      tandem: tandem.createTandem( 'timerToggleButton' ),
      left: CONTROLS_INSET,
      bottom: layoutBounds.height - CONTROLS_INSET,
      offIconOptions: {
        opacity: 0.85
      }
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
    icon: Node,
    level: GameLevel,
    levelPhetioDescription: string,
    tandem: Tandem
  ): LevelSelectionButton {
    const levelNumber = level.index;
    return new LevelSelectionButton(
      icon,
      gameModel.levels[ levelNumber ].bestScoreProperty,
      {
        listener: () => {
          gameModel.levelProperty.value = level;
        },
        baseColor: BAAColors.levelSelectorColorProperty,
        tandem: tandem.createTandem( `level${levelNumber + 1}Button` ),
        phetioDocumentation: levelPhetioDescription,
        createScoreDisplay: scoreProperty => new ScoreDisplayStars( scoreProperty, {
          numberOfStars: GameModel.CHALLENGES_PER_LEVEL,
          perfectScore: GameModel.MAX_POINTS_PER_GAME_LEVEL
        } ),
        soundPlayerIndex: levelNumber,
        visible: BAAQueryParameters.gameLevels.includes( levelNumber + 1 )
      }
    );
  }
}

buildAnAtom.register( 'StartGameLevelNode', StartGameLevelNode );

export default StartGameLevelNode;