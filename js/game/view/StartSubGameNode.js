// Copyright 2002-2013, University of Colorado
define( function( require ) {
  'use strict';

  var BAAFont = require( 'common/view/BAAFont' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Text = require( 'SCENERY/nodes/Text' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var LinearGradient = require( 'SCENERY/util/LinearGradient' );
  var GameStartButton = require( 'game/view/GameStartButton' );

  var StartSubGameNode = function StartSubGameNode( gameModel, layoutBounds ) {

    Node.call( this ); // Call super constructor.

    var periodicTableGameButton = new GameStartButton( "Periodic Table Game", function(){
      gameModel.startSubGame( 'periodicTableGame');
    } );
    this.addChild( periodicTableGameButton );
    var massAndChangeGameButton = new GameStartButton( "Mass And Change Game", function(){
      gameModel.startSubGame( 'massAndChargeGame');
    } );
    this.addChild( massAndChangeGameButton );
    var symbolGameButton = new GameStartButton( "Symbol Game", function(){
      gameModel.startSubGame( 'symbolGame');
    } );
    this.addChild( symbolGameButton );
    var advancedSymbolGameButton = new GameStartButton( "Advanced Symbol Game", function(){
      gameModel.startSubGame( 'advancedSymbolGame');
    } );
    this.addChild( advancedSymbolGameButton );
    var ySpacing = layoutBounds.height / 5;
    periodicTableGameButton.centerX = layoutBounds.centerX;
    periodicTableGameButton.centerY = ySpacing;
    massAndChangeGameButton.centerX = layoutBounds.centerX;
    massAndChangeGameButton.centerY = ySpacing * 2;
    symbolGameButton.centerX = layoutBounds.centerX;
    symbolGameButton.centerY = ySpacing * 3;
    advancedSymbolGameButton.centerX = layoutBounds.centerX;
    advancedSymbolGameButton.centerY = ySpacing * 4;
  };

  // Inherit from Node.
  inherit( Node, StartSubGameNode );

  return StartSubGameNode;
} );
