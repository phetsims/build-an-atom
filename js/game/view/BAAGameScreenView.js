// Copyright 2013-2017, University of Colorado Boulder

/**
 * Main view for the second tab of the Build an Atom simulation.
 *
 * @author John Blanco
 */
define( function( require ) {
  'use strict';

  // modules
  var BAAGameModel = require( 'BUILD_AN_ATOM/game/model/BAAGameModel' );
  var BAAGameState = require( 'BUILD_AN_ATOM/game/model/BAAGameState' );
  var BAAQueryParameters = require( 'BUILD_AN_ATOM/common/BAAQueryParameters' );
  var BAARewardNode = require( 'BUILD_AN_ATOM/game/view/BAARewardNode' );
  var buildAnAtom = require( 'BUILD_AN_ATOM/buildAnAtom' );
  var GameAudioPlayer = require( 'VEGAS/GameAudioPlayer' );
  var inherit = require( 'PHET_CORE/inherit' );
  var LevelCompletedNode = require( 'VEGAS/LevelCompletedNode' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Property = require( 'AXON/Property' );
  var ScoreboardBar = require( 'VEGAS/ScoreboardBar' );
  var ScreenView = require( 'JOIST/ScreenView' );
  var ShredConstants = require( 'SHRED/ShredConstants' );
  var StartGameLevelNode = require( 'BUILD_AN_ATOM/game/view/StartGameLevelNode' );

  /**
   * Constructor.
   *
   * @param {BAAGameModel} gameModel
   * @param {Tandem} tandem
   * @constructor
   */
  function BAAGameScreenView( gameModel, tandem ) {

    // Call super constructor.
    ScreenView.call( this, {
      layoutBounds: ShredConstants.LAYOUT_BOUNDS,
      tandem: tandem
    } );
    var self = this;

    // Add a root node where all of the game-related nodes will live.
    var rootNode = new Node();
    self.addChild( rootNode );

    var startGameLevelNode = new StartGameLevelNode(
      gameModel,
      this.layoutBounds,
      tandem.createTandem( 'startGameLevelNode' )
    );

    var scoreboard = new ScoreboardBar(
      this.layoutBounds.width,
      gameModel.challengeIndexProperty,
      new Property( BAAGameModel.CHALLENGES_PER_LEVEL ),
      gameModel.levelProperty,
      gameModel.scoreProperty,
      gameModel.elapsedTimeProperty,
      gameModel.timerEnabledProperty,
      function() { gameModel.newGame(); }, {
        levelVisible: false,
        tandem: tandem.createTandem( 'scoreboard' )
      }
    );

    scoreboard.centerX = this.layoutBounds.centerX;
    scoreboard.top = 0;
    var gameAudioPlayer = new GameAudioPlayer( gameModel.soundEnabledProperty );
    this.rewardNode = null;

    // Monitor the game state and update the view accordingly.
    gameModel.stateProperty.link( function( state, previousState ) {

      (previousState && previousState.disposeEmitter) && previousState.disposeEmitter.emit();

      if ( state === BAAGameState.CHOOSING_LEVEL ) {
        rootNode.removeAllChildren();
        rootNode.addChild( startGameLevelNode );
        if ( self.rewardNode !== null ) {
          self.rewardNode.dispose();
        }
        self.rewardNode = null;
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
          rootNode.addChild( new LevelCompletedNode(
            gameModel.levelProperty.get(),
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
          ) );
        }
      }
      else if ( typeof( state.createView ) === 'function' ) {
        // Since we're not in the start or game-over states, we must be
        // presenting a challenge.
        rootNode.removeAllChildren();
        var challengeView = state.createView( self.layoutBounds, tandem.createTandem( state.tandem.tail + 'View' ) );
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

  // Inherit from ScreenView.
  return inherit( ScreenView, BAAGameScreenView, {

    // @public - step function for the view, called by the framework
    step: function( elapsedTime ) {
      if ( this.rewardNode ) {
        this.rewardNode.step( elapsedTime );
      }
    }
  } );
} );