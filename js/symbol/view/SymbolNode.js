// Copyright 2002-2012, University of Colorado
define( function( require ) {

  var _ = require( 'lodash' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Text = require( 'SCENERY/nodes/Text' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var Vector2 = require( 'DOT/Vector2' );
  var AtomIdentifier = require( 'common/AtomIdentifier' );

  var SYMBOL_WIDTH = 400; // In screen coords, which are roughly pixels.
  var SYMBOL_HEIGHT = 400; // In screen coords, which are roughly pixels.

  var SymbolNode = function( model ) {

    Node.call( this ); // Call super constructor.
    var thisSymbolNode = this;

    // Add the bounding box, which is also the root node for everything else
    // that comprises this node.
    var boundingBox = new Rectangle( 0, 0, SYMBOL_WIDTH, SYMBOL_HEIGHT, 0, 0,
                                     {
                                       stroke: 'black',
                                       lineWidth: 2,
                                       fill: 'white'
                                     } );
    this.addChild( boundingBox );

    // Add the symbol text.
    this.symbolText = new Text( "",
                               {
                                 font: "210px Arial",
                                 fill: "black",
                                 center: new Vector2( SYMBOL_WIDTH / 2, SYMBOL_HEIGHT / 2 )
                               } );

    // Add the listener to update the symbol.
    model.link( 'protonCount', function( protonCount ){
      console.log("protonCount = " + protonCount );
      var symbol = AtomIdentifier.getSymbol( protonCount );
      thisSymbolNode.symbolText.text = symbol;
      thisSymbolNode.symbolText.center = new Vector2( SYMBOL_WIDTH / 2, SYMBOL_HEIGHT / 2 )
    });
    boundingBox.addChild( this.symbolText );
  };

  // Inherit from Node.
  inherit( SymbolNode, Node );

  return SymbolNode;
} );
