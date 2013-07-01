// Copyright 2002-2013, University of Colorado Boulder

/**
 * Main view for the second tab of the Build an Atom simulation.
 */
define( function( require ) {
  "use strict";

  // Imports
  var BAAFont = require( 'common/view/BAAFont' );
  var Button = require( 'SUN/Button' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( 'SCENERY/nodes/Node' );
  var TabView = require( "JOIST/TabView" );
  var Text = require( 'SCENERY/nodes/Text' );
  var StartSubGameNode = require( 'game/view/StartSubGameNode' );
  var SubGameOverNode = require( 'game/view/SubGameOverNode' );

  /**
   * Constructor.
   *
   * @param model Build an Atom model object.
   * @constructor
   */
  function BAAGameView( gameModel ) {

    TabView.call( this ); // Call super constructor.
    var thisScene = this;

    var startSubGameNode = new StartSubGameNode( gameModel, this.layoutBounds );
    var subGameOverNode = new SubGameOverNode( gameModel, this.layoutBounds );

    // Monitor the game state and update the view accordingly.
    gameModel.stateProperty.link( function( state ) {
      if ( state === 'selectSubGame' ) {
        thisScene.removeAllChildren();
        thisScene.addChild( startSubGameNode );
      }
      else if ( state === 'subGameOver' ) {
        thisScene.removeAllChildren();
        thisScene.addChild( subGameOverNode );
      }
      else if ( typeof( state.createView ) === 'function' ){
        thisScene.removeAllChildren();
        thisScene.addChild( state.createView( thisScene.layoutBounds ) );
      }
    } );
  }

  // Inherit from TabView.
  inherit( TabView, BAAGameView );

  return BAAGameView;
} );