// Copyright 2002-2013, University of Colorado Boulder
define( function( require ) {
  'use strict';

  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var RectangleButton = require( 'SUN/RectangleButton' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Text = require( 'SCENERY/nodes/Text' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var LinearGradient = require( 'SCENERY/util/LinearGradient' );
  var GameStartButton = require( 'game/view/GameStartButton' );

  var StartSubGameNode = function StartSubGameNode( gameModel, layoutBounds ) {

    Node.call( this ); // Call super constructor.

    var gameOverText = new Text( 'Game Completed', {font: new PhetFont( 20 )} );
    this.addChild( gameOverText );

    var doneButton = new RectangleButton( new Text( 'OK', { font: new PhetFont( 24 ) } ),
      function() {
        gameModel.state = 'selectSubGame';
      },
      { fill: 'orange'} );
    this.addChild( doneButton );

    // Layout
    gameOverText.centerX = layoutBounds.width / 2;
    gameOverText.centerY = layoutBounds.height * 0.3;
    doneButton.centerX = gameOverText.centerX;
    doneButton.top = gameOverText.bottom + 10;
  };

  // Inherit from Node.
  inherit( Node, StartSubGameNode );

  return StartSubGameNode;
} );
