// Copyright 2002-2013, University of Colorado
define( function( require ) {
  'use strict';

  var Node = require( 'SCENERY/nodes/Node' );
  var Text = require( 'SCENERY/nodes/Text' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var LinearGradient = require( 'SCENERY/util/LinearGradient' );

  var WIDTH = 700; // In screen coords, which are roughly pixels.
  var HEIGHT = 75; // In screen coords, which are roughly pixels.
  var TITLE_FONT = "35px Arial";
  var INSET = 20; // In screen coords, which are roughly pixels.

  var GameStartButton = function GameStartButton( text ) {

    Node.call( this ); // Call super constructor.
    var thisSymbolNode = this;

    // Add the bounding box, which is also the root node for everything else
    // that comprises this node.
    var boundingBox = new Rectangle( 0, 0, WIDTH, HEIGHT, 10, 10,
                                     {
                                       stroke: 'black',
                                       fill: new LinearGradient( 0, 0, 0, HEIGHT ).
                                         addColorStop( 0, 'rgb( 229, 243, 255 )' ).
                                         addColorStop( 0.15, 'rgb( 179, 217, 255 )' ).
                                         addColorStop( 0.85, 'rgb( 179, 217, 255 )' ).
                                         addColorStop( 1, 'rgb( 77, 172, 240 )' ),
                                       lineWidth: 2,
                                       cursor: 'pointer'
                                     } );
    this.addChild( boundingBox );

    // Add the text.
    var textNode = new Text( text,
                             {
                               font: TITLE_FONT,
                               fill: "black",
                               left: INSET,
                               centerY: HEIGHT / 2
                             } );
    this.addChild( textNode );

    // Add the listener to update the appearance and handle a click.



  };

  // Inherit from Node.
  inherit( Node, GameStartButton );

  return GameStartButton;
} );
