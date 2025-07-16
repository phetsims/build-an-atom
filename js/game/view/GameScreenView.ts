// Copyright 2013-2025, University of Colorado Boulder

/**
 * Main view for the second tab of the Build an Atom simulation.
 *
 * @author John Blanco
 */

import Property from '../../../../axon/js/Property.js';
import Bounds2 from '../../../../dot/js/Bounds2.js';
import ScreenView from '../../../../joist/js/ScreenView.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import FiniteStatusBar from '../../../../vegas/js/FiniteStatusBar.js';
import GameAudioPlayer from '../../../../vegas/js/GameAudioPlayer.js';
import LevelCompletedNode from '../../../../vegas/js/LevelCompletedNode.js';
import buildAnAtom from '../../buildAnAtom.js';
import BAAQueryParameters from '../../common/BAAQueryParameters.js';
import GameModel from '../model/GameModel.js';
import BAARewardNode from './BAARewardNode.js';
import ChallengeView from './ChallengeView.js';
import ChallengeViewSet from './ChallengeViewSet.js';
import StartGameLevelNode from './StartGameLevelNode.js';

class GameScreenView extends ScreenView {

  private readonly levelSelectionNode: StartGameLevelNode;
  private readonly levelNode: Node;

  private levelCompletedNode: LevelCompletedNode | null; // created on demand
  public rewardNode: BAARewardNode | null; // created on demand

  private challengeView: ChallengeView | null = null;

  public constructor( gameModel: GameModel, tandem: Tandem ) {

    super( {

      // A PhET wide decision was made to not update custom layout bounds even if they do not match the
      // default layout bounds in ScreenView. Do not change these bounds as changes could break or disturb
      // any phet-io instrumentation. https://github.com/phetsims/phet-io/issues/1939
      layoutBounds: new Bounds2( 0, 0, 768, 464 ),
      tandem: tandem
    } );

    const challengeViewTandem = tandem.createTandem( 'challengeViews' );
    const challengeViewSet = new ChallengeViewSet( gameModel.getAllChallenges(), this.layoutBounds, challengeViewTandem );

    // Add a root node where all game-related nodes will live.
    this.levelNode = new Node();
    this.addChild( this.levelNode );

    this.levelSelectionNode = new StartGameLevelNode(
      gameModel,
      this.layoutBounds,
      tandem.createTandem( 'levelSelectionNode' )
    );

    const scoreboard = new FiniteStatusBar(
      this.layoutBounds,
      this.visibleBoundsProperty,
      gameModel.scoreProperty,
      {
        challengeNumberProperty: gameModel.challengeNumberProperty,
        numberOfChallengesProperty: new Property( GameModel.CHALLENGES_PER_LEVEL ),
        elapsedTimeProperty: gameModel.timer.elapsedTimeProperty,
        timerEnabledProperty: gameModel.timerEnabledProperty,
        barFill: 'rgb( 49, 117, 202 )',
        textFill: 'white',
        xMargin: 20,
        dynamicAlignment: false,
        levelVisible: false,
        challengeNumberVisible: false,
        startOverButtonOptions: {
          font: new PhetFont( 20 ),
          textFill: 'black',
          baseColor: '#e5f3ff',
          xMargin: 6,
          yMargin: 5,
          listener: () => { gameModel.startOver(); }
        },
        tandem: tandem.createTandem( 'scoreboard' )
      }
    );

    scoreboard.centerX = this.layoutBounds.centerX;
    scoreboard.top = 0;
    const gameAudioPlayer = new GameAudioPlayer();
    this.rewardNode = null;
    this.levelCompletedNode = null;

    // Monitor the game state and update the view accordingly.
    gameModel.stateChangeEmitter.addListener( () => {

      const state = gameModel.gameStateProperty.value;

      if ( state === 'levelSelection' ) {
        this.initLevelSelection();
      }
      else if ( state === 'levelCompleted' ) {
        this.levelNode.removeAllChildren();
        if ( gameModel.scoreProperty.get() === GameModel.MAX_POINTS_PER_GAME_LEVEL || BAAQueryParameters.reward ) {

          // Perfect score, add the reward node.
          this.rewardNode && this.rewardNode.dispose(); // Dispose of the previous reward node if it exists
          this.rewardNode = new BAARewardNode( tandem.createTandem( 'rewardNode' ) );
          this.levelNode.addChild( this.rewardNode );

          // Play the appropriate audio feedback
          gameAudioPlayer.gameOverPerfectScore();
        }
        else if ( gameModel.scoreProperty.get() > 0 ) {
          gameAudioPlayer.gameOverImperfectScore();
        }

        const level = gameModel.levelProperty.value!;

        // Add the dialog node that indicates that the level has been completed.
        this.levelCompletedNode = new LevelCompletedNode(
          gameModel.levelNumberProperty.get() + 1,
          gameModel.scoreProperty.get(),
          GameModel.MAX_POINTS_PER_GAME_LEVEL,
          GameModel.CHALLENGES_PER_LEVEL,
          gameModel.timerEnabledProperty.get(),
          gameModel.timer.elapsedTimeProperty.get(),
          level.bestTimeProperty.value === 0 ? null : level.bestTimeProperty.value,
          level.isNewBestTimeProperty.value,
          () => { gameModel.levelProperty.reset(); }, {
            centerX: this.layoutBounds.width / 2,
            centerY: this.layoutBounds.height / 2,
            levelVisible: false,
            maxWidth: this.layoutBounds.width,
            tandem: Tandem.OPT_OUT // tandem.createTandem( 'levelCompletedNode' ) // TODO: Address this after deciding on the dynamic nature of stuff https://github.com/phetsims/build-an-atom/issues/276
          }
        );
        this.levelNode.addChild( this.levelCompletedNode );
      }
      else {
        this.levelNode.removeAllChildren();
        this.disposeNodes();

        const challenge = gameModel.challengeProperty.value!;

        if ( !challenge ) {
          return;
        }
        else {
          const challengeView = challengeViewSet.get( challenge )!;
          challengeView.handleStateChange( state );
          this.levelNode.addChild( challengeView );
        }
        this.levelNode.addChild( scoreboard );
      }
    } );

    gameModel.stateChangeEmitter.emit(); // Initialize the view based on the current game state
  }

  public initLevelSelection(): void {
    this.levelNode.removeAllChildren();
    this.levelNode.addChild( this.levelSelectionNode );
    this.disposeNodes();
  }

  public override step( elapsedTime: number ): void {
    if ( this.rewardNode ) {
      this.rewardNode.step( elapsedTime );
    }
  }

  public disposeNodes(): void {
    if ( this.rewardNode !== null ) {
      this.rewardNode.dispose();
    }
    if ( this.levelCompletedNode !== null ) {
      this.levelCompletedNode.dispose();
    }
    this.rewardNode = null;
    this.levelCompletedNode = null;
  }
}

buildAnAtom.register( 'GameScreenView', GameScreenView );
export default GameScreenView;