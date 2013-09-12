// Copyright 2002-2013, University of Colorado Boulder

/**
 * Main view for the second tab of the Build an Atom simulation.
 */
define( function( require ) {
  'use strict';

  // Imports
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( 'SCENERY/nodes/Node' );
  var ScreenView = require( 'JOIST/ScreenView' );
  var Text = require( 'SCENERY/nodes/Text' );
  var GameScoreboardNode = require( 'game/view/GameScoreboardNode' );
  var StartSubGameNode = require( 'game/view/StartSubGameNode' );
  var LevelCompletedNode = require( 'game/view/LevelCompletedNode' );

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
    var scoreboard = new GameScoreboardNode( gameModel ).mutate( {centerX: this.layoutBounds.centerX, bottom: this.layoutBounds.maxY - 10 } );

    // Monitor the game state and update the view accordingly.
    gameModel.stateProperty.link( function( state ) {
      if ( state === 'selectSubGame' ) {
        thisScene.removeAllChildren();
        thisScene.addChild( startSubGameNode );
      }
      else if ( state === 'subGameOver' ) {
        thisScene.removeAllChildren();
        thisScene.addChild( new LevelCompletedNode( gameModel, thisScene.layoutBounds ).mutate( {centerX: thisScene.layoutBounds.width / 2, centerY: thisScene.layoutBounds.height / 2 } ) );
      }
      else if ( typeof( state.createView ) === 'function' ) {
        // Since we're not in the start or game-over states, we must be
        // presenting a problem.
        thisScene.removeAllChildren();
        thisScene.addChild( state.createView( thisScene.layoutBounds ) );
        thisScene.addChild( new Text( 'Problem ' + ( gameModel.problemIndex + 1 ) + ' of ' + gameModel.problemSet.length,
          { font: new PhetFont( 16 ), top: 30, left: 10 } ) );
        thisScene.addChild( scoreboard );
      }
    } );
  }

  // Inherit from ScreenView.
  inherit( ScreenView, BAAGameView );

  return BAAGameView;
} );