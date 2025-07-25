// Copyright 2013-2025, University of Colorado Boulder

/**
 * Main view for the second tab of the Build an Atom simulation.
 *
 * @author John Blanco
 */

import Multilink from '../../../../axon/js/Multilink.js';
import Property from '../../../../axon/js/Property.js';
import Bounds2 from '../../../../dot/js/Bounds2.js';
import ScreenView from '../../../../joist/js/ScreenView.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import FiniteStatusBar from '../../../../vegas/js/FiniteStatusBar.js';
import GameAudioPlayer from '../../../../vegas/js/GameAudioPlayer.js';
import LevelCompletedNode from '../../../../vegas/js/LevelCompletedNode.js';
import buildAnAtom from '../../buildAnAtom.js';
import BAAQueryParameters from '../../common/BAAQueryParameters.js';
import GameModel from '../model/GameModel.js';
import BAARewardNode from './BAARewardNode.js';
import ChallengeViewSet from './ChallengeViewSet.js';
import StartGameLevelNode from './StartGameLevelNode.js';

class GameScreenView extends ScreenView {

  private readonly levelSelectionNode: StartGameLevelNode;
  private levelCompletedNode: LevelCompletedNode | null; // created on demand
  public rewardNode: BAARewardNode | null; // created on demand

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

    this.rewardNode = null;
    this.levelCompletedNode = null;

    this.levelSelectionNode = new StartGameLevelNode(
      gameModel,
      this.layoutBounds,
      tandem.createTandem( 'levelSelectionNode' )
    );

    const statusBar = new FiniteStatusBar(
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
        tandem: tandem.createTandem( 'statusBar' )
      }
    );

    // Create the audio player for the game.
    const gameAudioPlayer = new GameAudioPlayer();

    // Monitor the game state and update the view accordingly.
    Multilink.multilink(
      [ gameModel.gameStateProperty, gameModel.levelProperty, gameModel.challengeProperty ],
      ( gameState, level, challenge ) => {

        if ( gameState === 'levelSelection' ) {
          this.removeAllChildren();
          this.addChild( this.levelSelectionNode );
          this.disposeNodes();
        }
        else if ( gameState === 'levelCompleted' ) {
          this.removeAllChildren();
          if ( gameModel.scoreProperty.get() === GameModel.MAX_POINTS_PER_GAME_LEVEL || BAAQueryParameters.reward ) {

            // Perfect score, add the reward node.
            this.rewardNode && this.rewardNode.dispose(); // Dispose of the previous reward node if it exists.
            this.rewardNode = new BAARewardNode( tandem.createTandem( 'rewardNode' ) );
            this.addChild( this.rewardNode );

            // Play the appropriate audio feedback
            gameAudioPlayer.gameOverPerfectScore();
          }
          else if ( gameModel.scoreProperty.get() > 0 ) {
            gameAudioPlayer.gameOverImperfectScore();
          }

          if ( level ) {

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
                tandem: Tandem.OPT_OUT
              }
            );
            this.addChild( this.levelCompletedNode );
          }
        }
        else {
          this.removeAllChildren();
          this.disposeNodes();

          if ( !challenge ) {
            return;
          }
          else {

            // Get the view for the current challenge.
            const challengeView = challengeViewSet.get( challenge )!;

            // If this is the user's first attempt, reset the challenge view.
            if ( gameModel.attemptsProperty.value === 0 ) {
              challengeView.reset();
            }

            // Update the challenge view with the current gameState.
            challengeView.handleStateChange( gameState );

            this.addChild( challengeView );
          }
          this.addChild( statusBar );
        }
      }
    );
  }

  public override step( elapsedTime: number ): void {
    if ( this.rewardNode ) {
      this.rewardNode.step( elapsedTime );
    }
  }

  /**
   * Dispose of dynamically created nodes that are no longer needed.
   */
  private disposeNodes(): void {
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