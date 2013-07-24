// Copyright 2002-2013, University of Colorado Boulder
define( function( require ) {
  'use strict';

  // Imports
  var Color = require( 'SCENERY/util/Color' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var TextButton = require( 'SUN/TextButton' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Text = require( 'SCENERY/nodes/Text' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var LinearGradient = require( 'SCENERY/util/LinearGradient' );
  var GameStartButton = require( 'game/view/GameStartButton' );

  /**
   * Constructor.
   *
   * @param gameModel
   * @param layoutBounds
   * @constructor
   */
  var StartSubGameNode = function StartSubGameNode( gameModel, layoutBounds ) {

    Node.call( this ); // Call super constructor.

    var gameOverText = new Text( 'Game Completed', {font: new PhetFont( 20 )} );
    this.addChild( gameOverText );

    var doneButton = new TextButton( 'OK',
      function() {
        gameModel.state = 'selectSubGame';
      },
      { font: new PhetFont( 24 ), rectangleFillUp: new Color( 128, 223, 255 ) } );
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
