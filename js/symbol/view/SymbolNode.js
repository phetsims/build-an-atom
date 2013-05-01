// Copyright 2002-2012, University of Colorado
define( function( require ) {

  var _ = require( 'lodash' );
  var Node = require( 'SCENERY/nodes/Node' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );

  var SYMBOL_WIDTH = 400; // In screen coords, which are roughly pixels.
  var SYMBOL_HEIGHT = 400; // In screen coords, which are roughly pixels.

  var SymbolNode = function( model ) {
    Node.call( this ); // Call super constructor.

    var boundingBox = new Rectangle( 0, 0, SYMBOL_WIDTH, SYMBOL_HEIGHT, 0, 0,
                                     {
                                       stroke: 'black',
                                       lineWidth: 2,
                                       fill: 'white'
                                     }
    );
    this.addChild( boundingBox );
  };

  // Inherit from Node.
  inherit( SymbolNode, Node );

  return SymbolNode;
} );
