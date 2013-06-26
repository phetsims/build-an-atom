// Copyright 2002-2013, University of Colorado

/**
 * Main view for the second tab of the Build an Atom simulation.
 */
define( function( require ) {
  "use strict";

  // Imports
  var BAAFont = require( 'common/view/BAAFont' );
  var Button = require( 'SUN/Button' );
  var GameStartButton = require( 'game/view/GameStartButton' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( 'SCENERY/nodes/Node' );
  var TabView = require( "JOIST/TabView" );
  var Text = require( 'SCENERY/nodes/Text' );

  /**
   * Constructor.
   *
   * @param model Build an Atom model object.
   * @constructor
   */
  function BAAGameView( gameModel ) {

    TabView.call( this ); // Call super constructor.
    var thisScene = this;

    // Game settings screen - to do - pull this out into a separate view class.
    var gameSettingsRoot = new Node();
    var periodicTableGameButton = new GameStartButton( "Periodic Table Game", function(){
      gameModel.startSubGame( 'periodicTableGame');
    } );
    gameSettingsRoot.addChild( periodicTableGameButton );
    var massAndChangeGameButton = new GameStartButton( "Mass And Change Game", function(){
      gameModel.startSubGame( 'massAndChargeGame');
    } );
    gameSettingsRoot.addChild( massAndChangeGameButton );
    var symbolGameButton = new GameStartButton( "Symbol Game", function(){
      gameModel.startSubGame( 'symbolGame');
    } );
    gameSettingsRoot.addChild( symbolGameButton );
    var advancedSymbolGameButton = new GameStartButton( "Advanced Symbol Game", function(){
      gameModel.startSubGame( 'advancedSymbolGame');
    } );
    gameSettingsRoot.addChild( advancedSymbolGameButton );
    var ySpacing = this.layoutBounds.height / 5;
    periodicTableGameButton.centerX = this.layoutBounds.centerX;
    periodicTableGameButton.centerY = ySpacing;
    massAndChangeGameButton.centerX = this.layoutBounds.centerX;
    massAndChangeGameButton.centerY = ySpacing * 2;
    symbolGameButton.centerX = this.layoutBounds.centerX;
    symbolGameButton.centerY = ySpacing * 3;
    advancedSymbolGameButton.centerX = this.layoutBounds.centerX;
    advancedSymbolGameButton.centerY = ySpacing * 4;

    // Monitor the game state and update the view accordingly.
    gameModel.stateProperty.link( function( state ){
      if ( state === 'selectSubGame' ){
        thisScene.removeAllChildren();
        thisScene.addChild( gameSettingsRoot );
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