// Copyright 2002-2013, University of Colorado Boulder
define( function( require ) {
  'use strict';

  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Text = require( 'SCENERY/nodes/Text' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var LinearGradient = require( 'SCENERY/util/LinearGradient' );

  var WIDTH = 150; // In screen coords, which are roughly pixels.
  var HEIGHT = 150; // In screen coords, which are roughly pixels.
  var BACKGROUND_COLOR = 'red';

  var GameStartButton = function GameStartButton( text, onFireFunction ) {

    Node.call( this ); // Call super constructor.

    // Add the bounding box, which is also the root node for everything else
    // that comprises this node.
    var buttonOutline = new Rectangle( 0, 0, WIDTH, HEIGHT, 10, 10,
      {
        stroke: 'black',
        lineWidth: 1,
        fill: BACKGROUND_COLOR,
        cursor: 'pointer'
      } );
    this.addChild( buttonOutline );

    // Add the icon.
    //TODO

    // Add the listener to update the appearance and handle a click.
    buttonOutline.addInputListener(
      {
        down: function() {
          onFireFunction();
          buttonOutline.stroke = 'black';
        },
        over: function() {
          buttonOutline.stroke = 'yellow';
        },
        out: function() {
          buttonOutline.stroke = 'black';
        },
        up: function() {
          onFireFunction();
        }
      } );
  };

  // Inherit from Node.
  inherit( Node, GameStartButton );

  return GameStartButton;
} );
