// Copyright 2013-2020, University of Colorado Boulder

/**
 * Main view for the second tab of the Build an Atom simulation.
 *
 * @author John Blanco
 */

import Property from '../../../../axon/js/Property.js';
import ScreenView from '../../../../joist/js/ScreenView.js';
import inherit from '../../../../phet-core/js/inherit.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import ShredConstants from '../../../../shred/js/ShredConstants.js';
import FiniteStatusBar from '../../../../vegas/js/FiniteStatusBar.js';
import GameAudioPlayer from '../../../../vegas/js/GameAudioPlayer.js';
import LevelCompletedNode from '../../../../vegas/js/LevelCompletedNode.js';
import buildAnAtom from '../../buildAnAtom.js';
import BAAQueryParameters from '../../common/BAAQueryParameters.js';
import BAAGameModel from '../model/BAAGameModel.js';
import BAAGameState from '../model/BAAGameState.js';
import BAARewardNode from './BAARewardNode.js';
import StartGameLevelNode from './StartGameLevelNode.js';

/**
 * Constructor.
 *
 * @param {BAAGameModel} gameModel
 * @param {Tandem} tandem
 * @constructor
 */
function BAAGameScreenView( gameModel, tandem ) {


  ScreenView.call( this, {
    layoutBounds: ShredConstants.LAYOUT_BOUNDS,
    tandem: tandem
  } );
  const self = this;

  // Add a root node where all of the game-related nodes will live.
  const rootNode = new Node();
  self.addChild( rootNode );

  const startGameLevelNode = new StartGameLevelNode(
    gameModel,
    this.layoutBounds,
    tandem.createTandem( 'startGameLevelNode' )
  );

  const scoreboard = new FiniteStatusBar(
    this.layoutBounds,
    this.visibleBoundsProperty,
    gameModel.scoreProperty,
    {
      challengeIndexProperty: gameModel.challengeIndexProperty,
      numberOfChallengesProperty: new Property( BAAGameModel.CHALLENGES_PER_LEVEL ),
      elapsedTimeProperty: gameModel.elapsedTimeProperty,
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
        listener: function() { gameModel.newGame(); }
      },
      tandem: tandem.createTandem( 'scoreboard' )
    }
  );

  scoreboard.centerX = this.layoutBounds.centerX;
  scoreboard.top = 0;
  const gameAudioPlayer = new GameAudioPlayer( gameModel.soundEnabledProperty );
  this.rewardNode = null;
  this.levelCompletedNode = null; // @private

  // Monitor the game state and update the view accordingly.
  gameModel.stateProperty.link( function( state, previousState ) {

    ( previousState && previousState.disposeEmitter ) && previousState.disposeEmitter.emit();

    if ( state === BAAGameState.CHOOSING_LEVEL ) {
      rootNode.removeAllChildren();
      rootNode.addChild( startGameLevelNode );
      if ( self.rewardNode !== null ) {
        self.rewardNode.dispose();
      }
      if ( self.levelCompletedNode !== null ) {
        self.levelCompletedNode.dispose();
      }
      self.rewardNode = null;
      self.levelCompletedNode = null;
    }
    else if ( state === BAAGameState.LEVEL_COMPLETED ) {
      rootNode.removeAllChildren();
      if ( gameModel.scoreProperty.get() === BAAGameModel.MAX_POINTS_PER_GAME_LEVEL || BAAQueryParameters.reward ) {

        // Perfect score, add the reward node.
        self.rewardNode = new BAARewardNode( tandem.createTandem( 'rewardNode' ) );
        rootNode.addChild( self.rewardNode );

        // Play the appropriate audio feedback
        gameAudioPlayer.gameOverPerfectScore();
      }
      else if ( gameModel.scoreProperty.get() > 0 ) {
        gameAudioPlayer.gameOverImperfectScore();
      }

      if ( gameModel.provideFeedbackProperty.get() ) {

        // Add the dialog node that indicates that the level has been completed.
        self.levelCompletedNode = new LevelCompletedNode(
          gameModel.levelProperty.get() + 1,
          gameModel.scoreProperty.get(),
          BAAGameModel.MAX_POINTS_PER_GAME_LEVEL,
          BAAGameModel.CHALLENGES_PER_LEVEL,
          gameModel.timerEnabledProperty.get(),
          gameModel.elapsedTimeProperty.get(),
          gameModel.bestTimes[ gameModel.levelProperty.get() ].value,
          gameModel.newBestTime,
          function() { gameModel.stateProperty.set( BAAGameState.CHOOSING_LEVEL ); }, {
            centerX: self.layoutBounds.width / 2,
            centerY: self.layoutBounds.height / 2,
            levelVisible: false,
            maxWidth: self.layoutBounds.width,
            tandem: tandem.createTandem( 'levelCompletedNode' )
          }
        );
        rootNode.addChild( self.levelCompletedNode );
      }
    }
    else if ( typeof ( state.createView ) === 'function' ) {
      // Since we're not in the start or game-over states, we must be
      // presenting a challenge.
      rootNode.removeAllChildren();
      const challengeView = state.createView( self.layoutBounds, tandem.createTandem( state.tandem.name + 'View' ) );
      state.disposeEmitter.addListener( function disposeListener() {
        challengeView.dispose();
        state.disposeEmitter.removeListener( disposeListener );
      } );
      rootNode.addChild( challengeView );
      rootNode.addChild( scoreboard );
    }
  } );
}

buildAnAtom.register( 'BAAGameScreenView', BAAGameScreenView );

inherit( ScreenView, BAAGameScreenView, {

  // @public - step function for the view, called by the framework
  step: function( elapsedTime ) {
    if ( this.rewardNode ) {
      this.rewardNode.step( elapsedTime );
    }
  }
} );

export default BAAGameScreenView;