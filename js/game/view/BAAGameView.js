// Copyright 2002-2013, University of Colorado

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

    // Monitor the game state and update the view accordingly.
    gameModel.stateProperty.link( function( state ){
      if ( state === 'selectSubGame' ){
        thisScene.removeAllChildren();
        thisScene.addChild( startSubGameNode );
      }
      else{
        console.log( "Unrecognized state, state = " + state );
        thisScene.removeAllChildren();
        var unfinishedGameText = new Text( "(Unimplemented sub-game)",
                                           {
                                             font: new BAAFont( 30 )
                                           } );
        thisScene.addChild( unfinishedGameText );
        var doneButton = new Button( new Text( "Done", { font: new BAAFont( 24 ) } ),
                                     function() {
                                       gameModel.state = 'selectSubGame';
                                     },
                                     { fill: 'orange'} );
        thisScene.addChild( doneButton );
        unfinishedGameText.centerX = thisScene.layoutBounds.width / 2;
        unfinishedGameText.centerY = thisScene.layoutBounds.height / 3;
        doneButton.centerX = thisScene.layoutBounds.width / 2;
        doneButton.top = unfinishedGameText.bottom + 20;
      }
    } );
  }

  // Inherit from TabView.
  inherit( TabView, BAAGameView );

  return BAAGameView;
} );