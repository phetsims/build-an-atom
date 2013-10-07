// Copyright 2002-2013, University of Colorado Boulder

/**
 * Main view for the second tab of the Build an Atom simulation.
 */
define( function( require ) {
  'use strict';

  // Imports
  var GameAudioPlayer = require( 'game/GameAudioPlayer' );
  var GameScoreboardNode = require( 'game/view/GameScoreboardNode' );
  var inherit = require( 'PHET_CORE/inherit' );
  var LevelCompletedNode = require( 'game/view/LevelCompletedNode' );
  var Node = require( 'SCENERY/nodes/Node' );
  var RewardNode = require( 'game/view/RewardNode' );
  var ScreenView = require( 'JOIST/ScreenView' );
  var StartSubGameNode = require( 'game/view/StartSubGameNode' );
  var Text = require( 'SCENERY/nodes/Text' );

  /**
   * Constructor.
   *
   * @param model Build an Atom model object.
   * @constructor
   */
  function BAAGameView( gameModel ) {

    ScreenView.call( this ); // Call super constructor.
    var thisScene = this;

    var startSubGameNode = new StartSubGameNode( gameModel, this.layoutBounds );
    var scoreboard = new GameScoreboardNode( gameModel ).mutate( { centerX: this.layoutBounds.centerX, bottom: this.layoutBounds.maxY - 10 } );
    var gameAudioPlayer = new GameAudioPlayer( gameModel.soundEnabledProperty );

    // Monitor the game state and update the view accordingly.
    gameModel.stateProperty.link( function( state ) {
      if ( state === 'selectSubGame' ) {
        thisScene.removeAllChildren();
        thisScene.addChild( startSubGameNode );
      }
      else if ( state === 'subGameOver' ) {
        thisScene.removeAllChildren();
        if ( gameModel.score === gameModel.MAX_POINTS_PER_GAME_LEVEL ){
          // Perfect score, add the reward node.
          thisScene.addChild( new RewardNode().mutate( { centerX: thisScene.layoutBounds.width / 2, centerY: thisScene.layoutBounds.height / 2 } ) );
        }
        thisScene.addChild( new LevelCompletedNode( gameModel, thisScene.layoutBounds ).mutate( {centerX: thisScene.layoutBounds.width / 2, centerY: thisScene.layoutBounds.height / 2 } ) );
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
        thisScene.removeAllChildren();
        thisScene.addChild( state.createView( thisScene.layoutBounds ) );
        thisScene.addChild( scoreboard );
      }
    } );
  }

  // Inherit from ScreenView.
  inherit( ScreenView, BAAGameView );

  return BAAGameView;
} );