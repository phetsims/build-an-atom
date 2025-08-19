// Copyright 2013-2025, University of Colorado Boulder

/**
 * A Scenery Node that allows the user to select which game level to play.
 *
 * @author John Blanco
 */

import Bounds2 from '../../../../dot/js/Bounds2.js';
import { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import WithRequired from '../../../../phet-core/js/types/WithRequired.js';
import InfoButton from '../../../../scenery-phet/js/buttons/InfoButton.js';
import ResetAllButton from '../../../../scenery-phet/js/buttons/ResetAllButton.js';
import TimerToggleButton from '../../../../scenery-phet/js/buttons/TimerToggleButton.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import Node, { NodeOptions } from '../../../../scenery/js/nodes/Node.js';
import RichText from '../../../../scenery/js/nodes/RichText.js';
import Text from '../../../../scenery/js/nodes/Text.js';
import GameInfoDialog from '../../../../vegas/js/GameInfoDialog.js';
import LevelSelectionButtonGroup, { LevelSelectionButtonGroupItem } from '../../../../vegas/js/LevelSelectionButtonGroup.js';
import ScoreDisplayStars from '../../../../vegas/js/ScoreDisplayStars.js';
import buildAnAtom from '../../buildAnAtom.js';
import BuildAnAtomFluent from '../../BuildAnAtomFluent.js';
import BAAColors from '../../common/BAAColors.js';
import BAAConstants from '../../common/BAAConstants.js';
import BAAQueryParameters from '../../common/BAAQueryParameters.js';
import GameModel from '../model/GameModel.js';
import AdvancedSymbolLevelIcon from './AdvancedSymbolLevelIcon.js';
import MassAndChargeLevelIcon from './MassAndChargeLevelIcon.js';
import PeriodicTableLevelIcon from './PeriodicTableLevelIcon.js';
import SymbolLevelIcon from './SymbolLevelIcon.js';

type SelfOptions = EmptySelfOptions;
type LevelSelectionNodeOptions = SelfOptions & WithRequired<NodeOptions, 'tandem'>;

// constants
const CONTROLS_INSET = 10;

class LevelSelectionNode extends Node {

  public constructor( gameModel: GameModel, layoutBounds: Bounds2, options: LevelSelectionNodeOptions ) {

    super( options );

    const title = new Text( BuildAnAtomFluent.chooseYourGameStringProperty, {
      font: new PhetFont( 30 ),
      maxWidth: layoutBounds.width * 0.6,
      centerX: layoutBounds.centerX
    } );
    this.addChild( title );

    // Create and add the game info dialog and button.
    const gamesInfoDialog = new GameInfoDialog(
      gameModel.levels.map( level => level.levelDescriptionStringProperty ),
      {
        gameLevels: BAAQueryParameters.gameLevels,
        title: new RichText( BuildAnAtomFluent.gamesInfoTitleStringProperty, { font: new PhetFont( 35 ) } ),
        tandem: options.tandem.createTandem( 'gamesInfoDialog' ),
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
      tandem: options.tandem.createTandem( 'gamesInfoButton' )
    } );
    this.addChild( gamesInfoButton );

    // icons used for the level selection buttons, indexed by level number
    const gameButtonIcons = [
      new PeriodicTableLevelIcon(),
      new MassAndChargeLevelIcon(),
      new SymbolLevelIcon(),
      new AdvancedSymbolLevelIcon()
    ];

    const gameButtonsPhetIoDocumentation = [
      'Periodic table game',
      'Mass and charge game',
      'Symbol game',
      'Mixed review game'
    ];

    const buttonItems: LevelSelectionButtonGroupItem[] = [];
    gameModel.levels.forEach( ( level, index ) => {
      buttonItems.push( {
        icon: gameButtonIcons[ index ],
        scoreProperty: level.bestScoreProperty,
        options: {
          createScoreDisplay: scoreProperty => new ScoreDisplayStars( scoreProperty, {
            numberOfStars: level.challengeDescriptors.length,
            perfectScore: level.getPerfectScore()
          } ),
          listener: () => {
            gameModel.levelProperty.value = level;
          },
          soundPlayerIndex: index,
          phetioDocumentation: gameButtonsPhetIoDocumentation[ index ]
        }
      } );
    } );

    const buttonGroup = new LevelSelectionButtonGroup( buttonItems, {
      levelSelectionButtonOptions: {
        baseColor: BAAColors.levelSelectorColorProperty
      },
      flowBoxOptions: {
        spacing: 30,
        center: layoutBounds.center
      },
      groupButtonHeight: 150,
      groupButtonWidth: 150,
      gameLevels: BAAQueryParameters.gameLevels,
      tandem: options.tandem.createTandem( 'buttonGroup' ),
      phetioVisiblePropertyInstrumented: false
    } );

    buttonGroup.localBoundsProperty.link( () => {
      buttonGroup.center = layoutBounds.center;
    } );

    this.addChild( buttonGroup );

    // timer control
    const timerToggleButton = new TimerToggleButton( gameModel.timerEnabledProperty, {
      stroke: 'gray',
      tandem: options.tandem.createTandem( 'timerToggleButton' ),
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
      tandem: options.tandem.createTandem( 'resetAllButton' ),
      right: layoutBounds.width - CONTROLS_INSET,
      bottom: layoutBounds.height - CONTROLS_INSET
    } );
    this.addChild( resetAllButton );

    // Update the position of the title and games info button based on the title bounds, which can change.
    title.localBoundsProperty.link( () => {
      title.centerX = layoutBounds.centerX;
      if ( buttonGroup.bounds.isFinite() ) {
        title.centerY = ( layoutBounds.minY + buttonGroup.top ) / 2;
      }
      gamesInfoButton.left = title.right + CONTROLS_INSET;
      gamesInfoButton.centerY = title.centerY;
    } );
  }
}

buildAnAtom.register( 'LevelSelectionNode', LevelSelectionNode );

export default LevelSelectionNode;