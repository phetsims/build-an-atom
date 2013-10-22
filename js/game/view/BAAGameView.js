// Copyright 2002-2013, University of Colorado Boulder

/**
 * Main view for the second tab of the Build an Atom simulation.
 *
 * @author John Blanco
 */
define( function( require ) {
  'use strict';

  // Imports
  var GameAudioPlayer = require( 'VEGAS/GameAudioPlayer' );
  var GameScoreboardNode = require( 'BUILD_AN_ATOM/game/view/GameScoreboardNode' );
  var inherit = require( 'PHET_CORE/inherit' );
  var LevelCompletedNode = require( 'BUILD_AN_ATOM/game/view/LevelCompletedNode' );
  var Node = require( 'SCENERY/nodes/Node' );
  var RewardNode = require( 'BUILD_AN_ATOM/game/view/RewardNode' );
  var ScreenView = require( 'JOIST/ScreenView' );
  var StartSubGameNode = require( 'BUILD_AN_ATOM/game/view/StartSubGameNode' );
  var Text = require( 'SCENERY/nodes/Text' );

  /**
   * Constructor.
   *
   * @param gameModel Build an Atom model object.
   * @constructor
   */
  function BAAGameView( gameModel ) {

    ScreenView.call( this ); // Call super constructor.
    var thisScene = this;

    // Add a root node where all of the game-related nodes will live.
    var rootNode = new Node();
    thisScene.addChild( rootNode );

    var startSubGameNode = new StartSubGameNode( gameModel, this.layoutBounds );
    var scoreboard = new GameScoreboardNode( gameModel ).mutate( { centerX: this.layoutBounds.centerX, bottom: this.layoutBounds.maxY - 10 } );
    var gameAudioPlayer = new GameAudioPlayer( gameModel.soundEnabledProperty );
    var rewardNode = new RewardNode( gameModel );

    // Monitor the game state and update the view accordingly.
    gameModel.stateProperty.link( function( state ) {
      if ( state === 'selectSubGame' ) {
        rewardNode.animationEnabled = false;
        rootNode.removeAllChildren();
        rootNode.addChild( startSubGameNode );
      }
      else if ( state === 'subGameOver' ) {
        rootNode.removeAllChildren();
        if ( gameModel.score === gameModel.MAX_POINTS_PER_GAME_LEVEL ) {
          // Perfect score, add the reward node.
          rootNode.addChild( rewardNode );
          rewardNode.mutate( { centerX: thisScene.layoutBounds.width / 2, centerY: thisScene.layoutBounds.height / 2 } );
          rewardNode.animationEnabled = true;
        }
        rootNode.addChild( new LevelCompletedNode( gameModel, thisScene.layoutBounds ).mutate( {centerX: thisScene.layoutBounds.width / 2, centerY: thisScene.layoutBounds.height / 2 } ) );
        if ( gameModel.score === gameModel.MAX_POINTS_PER_GAME_LEVEL ) {
          gameAudioPlayer.gameOverPerfectScore();
        }
        else if ( gameModel.score > 0 ) {
          gameAudioPlayer.gameOverImperfectScore();
        }
        else {
          gameAudioPlayer.gameOverZeroScore();
        }
      }
      else if ( typeof( state.createView ) === 'function' ) {
        // Since we're not in the start or game-over states, we must be
        // presenting a problem.
        rootNode.removeAllChildren();
        rootNode.addChild( state.createView( thisScene.layoutBounds ) );
        rootNode.addChild( scoreboard );
      }
    } );
  }

  // Inherit from ScreenView.
  return inherit( ScreenView, BAAGameView );
} );