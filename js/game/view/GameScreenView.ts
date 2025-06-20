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
import BAAGameState from '../model/BAAGameState.js';
import GameModel from '../model/GameModel.js';
import BAARewardNode from './BAARewardNode.js';
import StartGameLevelNode from './StartGameLevelNode.js';

class GameScreenView extends ScreenView {

  private readonly levelSelectionNode: StartGameLevelNode;
  private readonly levelNode: Node;

  private levelCompletedNode: LevelCompletedNode | null; // created on demand
  public rewardNode: BAARewardNode | null; // created on demand

  public constructor( gameModel: GameModel, tandem: Tandem ) {

    super( {

      // A PhET wide decision was made to not update custom layout bounds even if they do not match the
      // default layout bounds in ScreenView. Do not change these bounds as changes could break or disturb
      // any phet-io instrumention. https://github.com/phetsims/phet-io/issues/1939
      layoutBounds: new Bounds2( 0, 0, 768, 464 ),
      tandem: tandem
    } );

    tandem = Tandem.OPT_OUT;

    // Add a root node where all of the game-related nodes will live.
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
    gameModel.stateProperty.link( ( state: BAAGameState ) => {

      if ( state === BAAGameState.CHOOSING_LEVEL ) {
        this.levelNode.removeAllChildren();
        this.levelNode.addChild( this.levelSelectionNode );
        if ( this.rewardNode !== null ) {
          this.rewardNode.dispose();
        }
        if ( this.levelCompletedNode !== null ) {
          this.levelCompletedNode.dispose();
        }
        this.rewardNode = null;
        this.levelCompletedNode = null;
      }
      else if ( state === BAAGameState.LEVEL_COMPLETED ) {
        this.levelNode.removeAllChildren();
        if ( gameModel.scoreProperty.get() === GameModel.MAX_POINTS_PER_GAME_LEVEL || BAAQueryParameters.reward ) {

          // Perfect score, add the reward node.
          this.rewardNode = new BAARewardNode( tandem.createTandem( 'rewardNode' ) );
          this.levelNode.addChild( this.rewardNode );

          // Play the appropriate audio feedback
          gameAudioPlayer.gameOverPerfectScore();
        }
        else if ( gameModel.scoreProperty.get() > 0 ) {
          gameAudioPlayer.gameOverImperfectScore();
        }

        if ( gameModel.provideFeedbackProperty.get() ) {

          // Add the dialog node that indicates that the level has been completed.
          this.levelCompletedNode = new LevelCompletedNode(
            gameModel.levelNumberProperty.get() + 1,
            gameModel.scoreProperty.get(),
            GameModel.MAX_POINTS_PER_GAME_LEVEL,
            GameModel.CHALLENGES_PER_LEVEL,
            gameModel.timerEnabledProperty.get(),
            gameModel.timer.elapsedTimeProperty.get(),
            gameModel.levels[ gameModel.levelNumberProperty.get() ].bestTimeProperty.value,
            gameModel.isNewBestTime,
            () => { gameModel.levelProperty.reset(); }, {
              centerX: this.layoutBounds.width / 2,
              centerY: this.layoutBounds.height / 2,
              levelVisible: false,
              maxWidth: this.layoutBounds.width,
              tandem: tandem.createTandem( 'levelCompletedNode' )
            }
          );
          this.levelNode.addChild( this.levelCompletedNode );
        }
      }
      else if ( state.createView ) {
        // Since we're not in the start or game-over states, we must be
        // presenting a challenge.
        this.levelNode.removeAllChildren();
        const challengeView = state.createView( this.layoutBounds, tandem.createTandem( `${state.tandem.name}View` ) );
        state.disposeEmitter.addListener( function disposeListener() {
          challengeView.dispose();
          state.disposeEmitter.removeListener( disposeListener );
        } );
        this.levelNode.addChild( challengeView );
        this.levelNode.addChild( scoreboard );
      }
    } );
  }

  public override step( elapsedTime: number ): void {
    if ( this.rewardNode ) {
      this.rewardNode.step( elapsedTime );
    }
  }
}

buildAnAtom.register( 'GameScreenView', GameScreenView );
export default GameScreenView;