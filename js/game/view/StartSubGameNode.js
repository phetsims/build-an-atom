// Copyright 2002-2013, University of Colorado Boulder
define( function( require ) {
  'use strict';

  var GameStartButton = require( 'game/view/GameStartButton' );
  var Image = require( 'SCENERY/nodes/Image' );
  var imageLoader = require( 'imageLoader' );
  var inherit = require( 'PHET_CORE/inherit' );
  var LinearGradient = require( 'SCENERY/util/LinearGradient' );
  var Node = require( 'SCENERY/nodes/Node' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var SharedConstants = require( 'common/SharedConstants' );
  var Text = require( 'SCENERY/nodes/Text' );

  var StartSubGameNode = function StartSubGameNode( gameModel, layoutBounds ) {

    Node.call( this ); // Call super constructor.

    // Node creation
    var title = new Text( "Choose Your Challenge", { font: new PhetFont( 30 ) } );
    this.addChild( title );
    var periodicTableGameButton = new GameStartButton( new Image( imageLoader.getImage( 'periodic_table_icon.png' ) ),
      function() {
        gameModel.startSubGame( 'periodic-table-game' );
      },
      gameModel.progressProperties[ SharedConstants.SUB_GAME_TO_LEVEL( 'periodic-table-game' )]
    );
    this.addChild( periodicTableGameButton );
    var massAndChangeGameButton = new GameStartButton( new Image( imageLoader.getImage( 'mass_charge_icon.png' ) ),
      function() {
        gameModel.startSubGame( 'mass-and-charge-game' );
      },
      gameModel.progressProperties[ SharedConstants.SUB_GAME_TO_LEVEL( 'periodic-table-game' )] );
    this.addChild( massAndChangeGameButton );
    var symbolGameButton = new GameStartButton( new Image( imageLoader.getImage( 'symbol_question_icon.png' ) ),
      function() {
        gameModel.startSubGame( 'symbol-game' );
      },
      gameModel.progressProperties[ SharedConstants.SUB_GAME_TO_LEVEL( 'symbol-game' )] );
    this.addChild( symbolGameButton );
    var advancedSymbolGameButton = new GameStartButton( new Image( imageLoader.getImage( 'question_mark_icon.png' ) ),
      function() {
        gameModel.startSubGame( 'advanced-symbol-game' );
      },
      gameModel.progressProperties[ SharedConstants.SUB_GAME_TO_LEVEL( 'advanced-symbol-game' )] );
    this.addChild( advancedSymbolGameButton );

    // Layout
    title.centerX = layoutBounds.width / 2;
    title.top = 20;
    var buttonWidth = periodicTableGameButton.width; // Note: Assumes all buttons are the same size.
    var interButtonXSpace = buttonWidth * 0.2;
    var buttonCenterY = layoutBounds.height * 0.4;
    periodicTableGameButton.right = layoutBounds.centerX - 1.5 * interButtonXSpace - buttonWidth;
    periodicTableGameButton.centerY = buttonCenterY;
    massAndChangeGameButton.left = periodicTableGameButton.right + interButtonXSpace;
    massAndChangeGameButton.centerY = buttonCenterY;
    symbolGameButton.left = massAndChangeGameButton.right + interButtonXSpace;
    symbolGameButton.centerY = buttonCenterY;
    advancedSymbolGameButton.left = symbolGameButton.right + interButtonXSpace;
    advancedSymbolGameButton.centerY = buttonCenterY;
  };

  // Inherit from Node.
  inherit( Node, StartSubGameNode );

  return StartSubGameNode;
} );
