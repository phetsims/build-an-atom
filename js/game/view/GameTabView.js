// Copyright 2002-2013, University of Colorado

/**
 * Main view for the second tab of the Build an Atom simulation.
 */
define( function( require ) {
  "use strict";

  // Imports
  var BAAFont = require('common/view/BAAFont');
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
  function GameTabView( gameModel ) {
    TabView.call( this ); // Call super constructor.

    // Add the buttons used to start the various sub-games.
    var periodicTableGameButton = new GameStartButton( "Periodic Table Game", gameModel );
    this.addChild( periodicTableGameButton );
    var massAndChangeGameButton = new GameStartButton( "Mass & Charge Game", gameModel );
    this.addChild( massAndChangeGameButton );
    var symbolGameButton = new GameStartButton( "Symbol Game", gameModel );
    this.addChild( symbolGameButton );
    var advancedSymbolGameButton = new GameStartButton( "Advanced Symbol Game", gameModel );
    this.addChild( advancedSymbolGameButton );

    // Add the nods that are shown for unfinished sub-games.
    var unfinishedGameText = new Text( "(Unimplemented sub-game)",
                                       {
                                         font: new BAAFont( 30 )
                                       } );
    this.addChild( unfinishedGameText );
    var doneButton = new Button( new Text( "Done", { font: new BAAFont( 24 ) } ),
                                           function() {
                                             gameModel.playing = false;
                                           },
                                           { fill: 'orange'} );
    this.addChild( doneButton );

    // Update visibility based on state.
    gameModel.playingProperty.link( function( playingGame ) {
      periodicTableGameButton.visible = !playingGame;
      massAndChangeGameButton.visible = !playingGame;
      symbolGameButton.visible = !playingGame;
      advancedSymbolGameButton.visible = !playingGame;
      unfinishedGameText.visible = playingGame;
      doneButton.visible = playingGame;
      doneButton.enabled = playingGame;
    } );

    // Layout
    var ySpacing = this.layoutBounds.height / 5;
    periodicTableGameButton.centerX = this.layoutBounds.centerX;
    periodicTableGameButton.centerY = ySpacing;
    massAndChangeGameButton.centerX = this.layoutBounds.centerX;
    massAndChangeGameButton.centerY = ySpacing * 2;
    symbolGameButton.centerX = this.layoutBounds.centerX;
    symbolGameButton.centerY = ySpacing * 3;
    advancedSymbolGameButton.centerX = this.layoutBounds.centerX;
    advancedSymbolGameButton.centerY = ySpacing * 4;
    unfinishedGameText.centerX = this.layoutBounds.width / 2;
    unfinishedGameText.centerY = this.layoutBounds.height / 3;
    doneButton.centerX = this.layoutBounds.width / 2;
    doneButton.top = unfinishedGameText.bottom + 20;
  }

  // Inherit from TabView.
  inherit( TabView, GameTabView );

  return GameTabView;
} );