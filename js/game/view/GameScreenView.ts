// Copyright 2013-2025, University of Colorado Boulder

/**
 * Main view for the game screen of the Build an Atom simulation.
 *
 * @author John Blanco (PhET Interactive Simulations)
 */

import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import GatedVisibleProperty from '../../../../axon/js/GatedVisibleProperty.js';
import Bounds2 from '../../../../dot/js/Bounds2.js';
import ScreenView from '../../../../joist/js/ScreenView.js';
import affirm from '../../../../perennial-alias/js/browser-and-node/affirm.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import isSettingPhetioStateProperty from '../../../../tandem/js/isSettingPhetioStateProperty.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import ChallengeScreenNode from '../../../../vegas/js/ChallengeScreenNode.js';
import FiniteStatusBar from '../../../../vegas/js/FiniteStatusBar.js';
import GameAudioPlayer from '../../../../vegas/js/GameAudioPlayer.js';
import LevelCompletedNode from '../../../../vegas/js/LevelCompletedNode.js';
import RewardScreenNode from '../../../../vegas/js/RewardScreenNode.js';
import buildAnAtom from '../../buildAnAtom.js';
import BAAQueryParameters from '../../common/BAAQueryParameters.js';
import BAAGameChallenge from '../model/BAAGameChallenge.js';
import GameModel from '../model/GameModel.js';
import BAARewardNode from './BAARewardNode.js';
import ChallengeView from './ChallengeView.js';
import ChallengeViewSet from './ChallengeViewSet.js';
import LevelSelectionNode from './LevelSelectionNode.js';

class GameScreenView extends ScreenView {

  private readonly levelSelectionNode: LevelSelectionNode;
  private levelCompletedNode: LevelCompletedNode | null = null; // created on demand
  private rewardNode: BAARewardNode | null = null; // created on demand
  private readonly challengeViewSet: ChallengeViewSet;
  private activeChallengeView: ChallengeView | null = null;
  private gameModel: GameModel;

  // For accessibility, challenge components will be put into the accessible sections of this node.
  private readonly challengeScreenNode: ChallengeScreenNode;

  // For accessibility, reward components will be put into the accessible sections of this Node.
  private readonly rewardScreenNode: RewardScreenNode;

  public constructor( gameModel: GameModel, tandem: Tandem ) {

    super( {

      // A PhET wide decision was made to not update custom layout bounds even if they do not match the
      // default layout bounds in ScreenView. Do not change these bounds as changes could break or disturb
      // any phet-io instrumentation. https://github.com/phetsims/phet-io/issues/1939
      layoutBounds: new Bounds2( 0, 0, 768, 464 ),

      // For game screens, the default play area and control area sections are not used.
      includeAccessibleSectionNodes: false,

      tandem: tandem
    } );

    this.gameModel = gameModel;

    this.levelSelectionNode = new LevelSelectionNode(
      gameModel,
      this.layoutBounds,
      {
        tandem: tandem.createTandem( 'levelSelectionNode' ),
        accessibleIncludeOptionsDescription: true,
        visiblePropertyOptions: {
          phetioReadOnly: true
        }
      }
    );
    this.addChild( this.levelSelectionNode );

    const challengeViewTandem = tandem.createTandem( 'challengeViews' );

    // Set up the set of all challenge views based on the challenges available in the game model.
    this.challengeViewSet = new ChallengeViewSet( gameModel.getAllChallenges(), this.layoutBounds, challengeViewTandem );

    const statusBarTandem = tandem.createTandem( 'statusBar' );

    // Create a property that will be used to control the visibility of the status bar.  This is a gated property so
    // that it can be also controlled via PhET-iO.
    const statusBarVisibleProperty = new GatedVisibleProperty(
      new DerivedProperty(
        [ gameModel.gameStateProperty ],
        gameState => !( gameState === 'levelSelection' || gameState === 'levelCompleted' )
      ),
      statusBarTandem
    );

    // Create and add the status bar to the game screen.
    const statusBar = new FiniteStatusBar(
      this.layoutBounds,
      this.visibleBoundsProperty,
      gameModel.scoreProperty,
      {
        challengeNumberProperty: gameModel.challengeNumberProperty,
        numberOfChallengesProperty: gameModel.numberOfChallengesProperty,
        elapsedTimeProperty: gameModel.timer.elapsedTimeProperty,
        timerEnabledProperty: gameModel.timerEnabledProperty,
        barFill: 'rgb( 49, 117, 202 )',
        textFill: 'white',
        xMargin: 20,
        dynamicAlignment: false,
        levelVisible: true,
        levelNumberProperty: gameModel.levelNumberProperty,
        challengeNumberVisible: false,
        visibleProperty: statusBarVisibleProperty,
        startOverButtonOptions: {
          font: new PhetFont( 20 ),
          textFill: 'black',
          baseColor: '#e5f3ff',
          xMargin: 6,
          yMargin: 5,
          listener: () => { gameModel.startOver(); }
        },
        tandem: statusBarTandem
      }
    );
    this.addChild( statusBar );

    // Create the audio player for the game.
    const gameAudioPlayer = new GameAudioPlayer();

    // A parent Node for the challenge views, with sections for accessible content.
    this.challengeScreenNode = new ChallengeScreenNode( {
      challengeNumberProperty: gameModel.challengeNumberProperty,
      challengeCountProperty: gameModel.numberOfChallengesProperty,
      levelNumberProperty: gameModel.levelNumberProperty
    } );
    this.addChild( this.challengeScreenNode );

    // initially hidden and will be shown when a challenge is presented
    this.challengeScreenNode.visible = false;

    this.rewardScreenNode = new RewardScreenNode( gameModel.levelNumberProperty );
    this.addChild( this.rewardScreenNode );

    // initially hidden and will be shown when the level is completed
    this.rewardScreenNode.visible = false;

    // Show the challenge view associated with the current challenge, or remove it if there is no challenge.
    gameModel.challengeProperty.link( challenge => {
      this.showChallengeView( challenge );
    } );

    // Monitor the game state and update the view accordingly.
    gameModel.gameStateProperty.link( gameState => {

      // Clear any level completed nodes that may be on the screen.
      this.removeLevelCompletedNodes();

      if ( gameState === 'levelSelection' ) {
        this.levelSelectionNode.visible = false;
        this.removeLevelCompletedNodes();

        this.levelSelectionNode.visible = true;
      }
      else if ( gameState === 'levelCompleted' ) {
        this.levelSelectionNode.visible = false;
        this.levelSelectionNode.visible = false;

        this.rewardScreenNode.visible = true;

        if ( gameModel.scoreProperty.value === GameModel.MAX_POINTS_PER_GAME_LEVEL || BAAQueryParameters.reward ) {

          // Perfect score, add the reward node.
          this.rewardNode && this.rewardNode.dispose(); // Dispose of the previous reward node if it exists.
          this.rewardNode = new BAARewardNode();
          this.addChild( this.rewardNode );

          // Play the appropriate audio feedback.
          gameAudioPlayer.gameOverPerfectScore();
        }
        else if ( gameModel.scoreProperty.value > 0 ) {
          gameAudioPlayer.gameOverImperfectScore();
        }

        const level = gameModel.levelProperty.value;
        affirm( level, 'Level should be defined when gameState is levelCompleted' );

        // Add the dialog node that indicates that the level has been completed.
        this.levelCompletedNode && this.levelCompletedNode.dispose(); // Dispose of the previous level completed node if it exists.
        this.levelCompletedNode = new LevelCompletedNode(
          gameModel.levelNumberProperty.value,
          gameModel.scoreProperty.value,
          GameModel.MAX_POINTS_PER_GAME_LEVEL,
          GameModel.CHALLENGES_PER_LEVEL,
          gameModel.timerEnabledProperty.value,
          gameModel.timer.elapsedTimeProperty.value,
          level.bestTimeProperty.value === 0 ? null : level.bestTimeProperty.value,
          level.isNewBestTimeProperty.value,
          () => { gameModel.startOver(); }, {
            centerX: this.layoutBounds.width / 2,
            centerY: this.layoutBounds.height / 2,
            levelVisible: false,
            maxWidth: this.layoutBounds.width,
            tandem: Tandem.OPT_OUT
          }
        );
        this.addChild( this.levelCompletedNode );
        this.rewardScreenNode.accessibleRewardSectionNode.pdomOrder = [ this.levelCompletedNode ];

        this.levelCompletedNode.visible = true;
        this.levelCompletedNode.handleShow();
      }
      else {
        this.levelSelectionNode.visible = false;
        this.rewardScreenNode.visible = false;

        // The game is in the middle of presenting a challenge to the user, so pass the state change to the challenge
        // view.  This will perform updates like showing the feedback nodes, updating button states, etc.
        affirm( this.activeChallengeView || isSettingPhetioStateProperty.value,
          `activeChallengeView should be defined in this game state: ${gameState}` );
        if ( this.activeChallengeView ) {
          this.activeChallengeView.handleStateChange( gameState );
        }
      }
    } );

    // pdom - assign components to the correct ChallengeScreenNode sections. All components from every challenge can be added
    // at once since only one challenge is visible at a time.
    this.updatePDOMOrder();
    this.challengeScreenNode.accessibleStatusSectionNode.pdomOrder = [
      statusBar
    ];
  }

  /**
   * Assign components to the correct sections of the challenge screen node for accessibility. Note we must do this
   * every time the challenge changes because the challenge view is removed from the scene graph, and we cannot have
   * components in a pdomOrder that are not in the scene graph.
   */
  private updatePDOMOrder(): void {
    const challengeView = this.activeChallengeView;
    this.challengeScreenNode.accessibleChallengeSectionNode.pdomOrder = challengeView ?
                                                                        challengeView.getChallengeNodesPDOMOrder() : [];

    this.challengeScreenNode.accessibleAnswerSectionNode.pdomOrder = challengeView ?
                                                                     challengeView.getAnswerNodesPDOMOrder() : [];
  }


  public override step( elapsedTime: number ): void {
    if ( this.rewardNode ) {
      this.rewardNode.step( elapsedTime );
    }
  }

  /**
   * Show the challenge view for the given challenge, or make sure that it is already showing.  If the challenge is
   * null, any existing challenge view will be removed from the screen.
   */
  private showChallengeView( challenge: BAAGameChallenge | null ): void {
    const challengeView = challenge ? this.challengeViewSet.get( challenge ) : null;

    if ( !challengeView ) {
      if ( this.activeChallengeView ) {
        this.removeChild( this.activeChallengeView );
      }

      // Hide the accessible game content.
      this.challengeScreenNode.visible = false;
    }
    else if ( challengeView !== this.activeChallengeView ) {

      // Remove the old challenge view if it exists.
      this.activeChallengeView && this.removeChild( this.activeChallengeView );

      // Clear this challenge view of anything that the user may have submitted in the previous challenges.
      challengeView.reset();

      // Show the new challenge view.
      this.addChild( challengeView );

      // Show the accessible game content and move focus to the beginning.
      this.challengeScreenNode.visible = true;
      this.challengeScreenNode.handleShow();
    }

    if ( isSettingPhetioStateProperty.value && challengeView ) {
      challengeView.handleStateChange( this.gameModel.gameStateProperty.value );
    }

    this.activeChallengeView = challengeView;

    this.updatePDOMOrder();
  }

  /**
   * Remove dynamically created nodes that are no longer needed.
   */
  private removeLevelCompletedNodes(): void {
    if ( this.rewardNode ) {
      this.removeChild( this.rewardNode );
      this.rewardNode.dispose();
      this.rewardNode = null;
    }
    if ( this.levelCompletedNode ) {
      this.removeChild( this.levelCompletedNode );
      this.levelCompletedNode.dispose();
      this.levelCompletedNode = null;
    }
  }
}

buildAnAtom.register( 'GameScreenView', GameScreenView );
export default GameScreenView;