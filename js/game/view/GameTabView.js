// Copyright 2002-2013, University of Colorado

/**
 * Main view for the second tab of the Build an Atom simulation.
 */
define( function( require ) {
  "use strict";

  // Imports
  var Node = require( 'SCENERY/nodes/Node' );
  var TabView = require( "JOIST/TabView" );
  var inherit = require( 'PHET_CORE/inherit' );
  var GameStartButton = require( 'game/view/GameStartButton' );

  /**
   * Constructor.
   *
   * @param model Build an Atom model object.
   * @constructor
   */
  function GameTabView( gameModel ) {
    TabView.call( this ); // Call super constructor.

    // Add the buttons used to start the various sub-games.
    var periodicTableGameButton = new GameStartButton( "Periodic Table Game" );
    this.addChild( periodicTableGameButton );
    var massAndChangeGameButton = new GameStartButton( "Mass & Charge Game" );
    this.addChild( massAndChangeGameButton );
    var symbolGameButton = new GameStartButton( "Symbol Game" );
    this.addChild( symbolGameButton );
    var advancedSymbolGameButton = new GameStartButton( "Advanced Symbol Game" );
    this.addChild( advancedSymbolGameButton );

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
  }

  // Inherit from TabView.
  inherit( TabView, GameTabView );

  return GameTabView;
} );