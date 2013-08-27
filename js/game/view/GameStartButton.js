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
  var BACKGROUND_COLOR = 'rgb( 242, 255, 204 )';
  var HIGHLIGHTED_BACKGROUND_COLOR = 'rgb( 250, 255, 230 )';
  var DROP_SHADOW_OFFSET = WIDTH * 0.02;
  var CORNER_ROUNDING = 10;

  var GameStartButton = function GameStartButton( icon, onFireFunction ) {

    Node.call( this ); // Call super constructor.
    var thisNode = this;

    // Add the drop shadow.
    this.addChild( new Rectangle( 0, 0, WIDTH, HEIGHT, CORNER_ROUNDING, CORNER_ROUNDING,
      {
        stroke: 'black',
        lineWidth: 1,
        fill: 'black',
        top: DROP_SHADOW_OFFSET,
        left: DROP_SHADOW_OFFSET
      }
    ) );

    // Add the button outline, which is also the root node for everything else
    // that is on the button.
    var buttonOutline = new Rectangle( 0, 0, WIDTH, HEIGHT, CORNER_ROUNDING, CORNER_ROUNDING,
      {
        stroke: 'black',
        lineWidth: 1,
        fill: BACKGROUND_COLOR,
        cursor: 'pointer'
      } );
    thisNode.addChild( buttonOutline );

    // Add the icon.
    var iconScaleFactor = HEIGHT * 0.65 / icon.width;
    icon.scale( iconScaleFactor );
    icon.centerX = WIDTH / 2;
    icon.centerY = HEIGHT * 0.4;

    //TODO - The icon should be scaled to fit if too big.
    buttonOutline.addChild( icon );

    thisNode._armed = false;

    // Add the listener to update the appearance and handle a click.
    buttonOutline.addInputListener(
      {
        down: function() {
          buttonOutline.fill = HIGHLIGHTED_BACKGROUND_COLOR;
          buttonOutline.top = DROP_SHADOW_OFFSET;
          buttonOutline.left = DROP_SHADOW_OFFSET;
          thisNode._armed = true;
        },
        over: function() {
          buttonOutline.fill = HIGHLIGHTED_BACKGROUND_COLOR;
        },
        out: function() {
          buttonOutline.fill = BACKGROUND_COLOR;
        },
        up: function() {
          buttonOutline.fill = BACKGROUND_COLOR;
          buttonOutline.top = 0;
          buttonOutline.left = 0;
          if ( thisNode._armed ) {
            onFireFunction();
          }
        }
      } );
  };

  // Inherit from Node.
  inherit( Node, GameStartButton );

  return GameStartButton;
} );
