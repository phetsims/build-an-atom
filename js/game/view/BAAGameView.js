// Copyright 2016, University of Colorado Boulder

/**
 * Main view for the second tab of the Build an Atom simulation.
 *
 * @author John Blanco
 */
define( function( require ) {
  'use strict';

  // modules
  var BAAGameModel = require( 'BUILD_AN_ATOM/game/model/BAAGameModel' );
  var BAAQueryParameters = require( 'BUILD_AN_ATOM/common/BAAQueryParameters' );
  var buildAnAtom = require( 'BUILD_AN_ATOM/buildAnAtom' );
  var GameAudioPlayer = require( 'VEGAS/GameAudioPlayer' );
  var inherit = require( 'PHET_CORE/inherit' );
  var LevelCompletedNode = require( 'VEGAS/LevelCompletedNode' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Property = require( 'AXON/Property' );
  var BAARewardNode = require( 'BUILD_AN_ATOM/game/view/BAARewardNode' );
  var ScoreboardBar = require( 'VEGAS/ScoreboardBar' );
  var ScreenView = require( 'JOIST/ScreenView' );
  var StartGameLevelNode = require( 'BUILD_AN_ATOM/game/view/StartGameLevelNode' );
  var SharedConstants = require( 'SHRED/SharedConstants' );

  /**
   * Constructor.
   *
   * @param {BAAGameModel} gameModel
   * @param {Tandem} tandem
   * @constructor
   */
  function BAAGameView( gameModel, tandem ) {

    ScreenView.call( this, { layoutBounds: SharedConstants.LAYOUT_BOUNDS } ); // Call super constructor.
    var thisScene = this;

    // Add a root node where all of the game-related nodes will live.
    var rootNode = new Node();
    thisScene.addChild( rootNode );

    var startGameLevelNode = new StartGameLevelNode(
      gameModel,
      this.layoutBounds,
      tandem.createTandem( 'startGameLevelNode' )
    );

    var scoreboard = new ScoreboardBar(
      this.layoutBounds.width,
      gameModel.problemIndexProperty,
      new Property( BAAGameModel.PROBLEMS_PER_LEVEL ),
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
    var problemViewGroupTandem = tandem.createGroupTandem( 'problemView' );

    var previousView = startGameLevelNode;

    // Monitor the game state and update the view accordingly.
    gameModel.stateProperty.link( function( state ) {
      if ( state === 'selectGameLevel' ) {
        rootNode.removeAllChildren();
        previousView.dispose();
        rootNode.addChild( startGameLevelNode );
        if ( thisScene.rewardNode !== null ){
          thisScene.rewardNode.dispose();
        }
        thisScene.rewardNode = null;
      }
      else if ( state === 'levelCompleted' ) {
        rootNode.removeAllChildren();
        previousView.dispose();
        if ( gameModel.score === BAAGameModel.MAX_POINTS_PER_GAME_LEVEL || BAAQueryParameters.REWARD ) {
          // Perfect score, add the reward node.
          thisScene.rewardNode = new BAARewardNode( tandem.createTandem( 'rewardNode' ) );
          rootNode.addChild( thisScene.rewardNode );
          // Play the appropriate audio feedback
          gameAudioPlayer.gameOverPerfectScore();
        }
        else if ( gameModel.score > 0 ) {
          gameAudioPlayer.gameOverImperfectScore();
        }

        // Add the dialog node that indicates that the level has been completed.
        rootNode.addChild( new LevelCompletedNode( gameModel.level, gameModel.score, BAAGameModel.MAX_POINTS_PER_GAME_LEVEL,
          BAAGameModel.PROBLEMS_PER_LEVEL, gameModel.timerEnabled, gameModel.elapsedTime,
          gameModel.bestTimes[ gameModel.level ], gameModel.newBestTime,
          function() { gameModel.state = 'selectGameLevel'; }, {
            centerX: thisScene.layoutBounds.width / 2,
            centerY: thisScene.layoutBounds.height / 2,
            levelVisible: false,
            maxWidth: thisScene.layoutBounds.width,
            tandem: tandem.createTandem( 'levelCompletedNode' )
          } ) );
      }
      else if ( typeof( state.createView ) === 'function' ) {
        // Since we're not in the start or game-over states, we must be
        // presenting a problem.
        rootNode.removeAllChildren();
        previousView.dispose();
        var problemView = state.createView( thisScene.layoutBounds, problemViewGroupTandem.createNextTandem() );
        rootNode.addChild( problemView );
        rootNode.addChild( scoreboard );
        previousView = problemView;
      }
    } );
  }

  buildAnAtom.register( 'BAAGameView', BAAGameView );

  // Inherit from ScreenView.
  return inherit( ScreenView, BAAGameView, {

    // @public - step function for the view, called by the framework
    step: function( elapsedTime ) {
      if ( this.rewardNode ) {
        this.rewardNode.step( elapsedTime );
      }
    }
  } );
} );