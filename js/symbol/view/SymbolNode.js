// Copyright 2002-2012, University of Colorado
define( function( require ) {

  var _ = require( 'lodash' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Text = require( 'SCENERY/nodes/Text' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var Vector2 = require( 'DOT/Vector2' );
  var AtomIdentifier = require( 'common/AtomIdentifier' );

  var SYMBOL_BOX_WIDTH = 400; // In screen coords, which are roughly pixels.
  var SYMBOL_BOX_HEIGHT = 400; // In screen coords, which are roughly pixels.
  var NUMBER_FONT = "100px Arial";

  var SymbolNode = function( model ) {

    Node.call( this ); // Call super constructor.
    var thisSymbolNode = this;

    // Add the bounding box, which is also the root node for everything else
    // that comprises this node.
    var boundingBox = new Rectangle( 0, 0, SYMBOL_BOX_WIDTH, SYMBOL_BOX_HEIGHT, 0, 0,
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
                                 center: new Vector2( SYMBOL_BOX_WIDTH / 2, SYMBOL_BOX_HEIGHT / 2 )
                               } );

    // Add the listener to update the symbol text.
    model.link( 'protonCount', function( protonCount ){
      console.log("protonCount = " + protonCount );
      var symbol = AtomIdentifier.getSymbol( protonCount );
      thisSymbolNode.symbolText.text = symbol;
      thisSymbolNode.symbolText.center = new Vector2( SYMBOL_BOX_WIDTH / 2, SYMBOL_BOX_HEIGHT / 2 )
    });
    boundingBox.addChild( this.symbolText );

    // Add the proton count.
    this.protonCount = new Text( "0",
                                {
                                  font: NUMBER_FONT,
                                  fill: "red"
                                } );

    // Add the listener to update the proton count.
    model.link( 'protonCount', function( protonCount ){
      thisSymbolNode.protonCount.text = protonCount;
      thisSymbolNode.protonCount.left = 10;
      thisSymbolNode.protonCount.y = SYMBOL_BOX_HEIGHT - 20;
    });
    boundingBox.addChild( this.protonCount );

    // Add the atomic mass.
    this.atomicMass = new Text( "0",
                                 {
                                   font: NUMBER_FONT,
                                   fill: "black"
                                 } );

    // Add the listener to update the atomic mass.
    model.link( 'protonCount neutronCount', function(){
      thisSymbolNode.atomicMass.text = model.getAtomicMass();
      thisSymbolNode.atomicMass.left = 10;
      thisSymbolNode.atomicMass.top = 10;
    });
    boundingBox.addChild( this.atomicMass );

    // Add the charge indicator.
    this.charge = new Text( "0",
                                {
                                  font: NUMBER_FONT,
                                  fill: "black"
                                } );

    // Add the listener to update the charge.
    model.link( 'protonCount electronCount', function(){
      var sign;
      var textColor;
      if ( model.getCharge() > 0 ){
        sign = '+';
        textColor = 'red';
      }
      else if ( model.getCharge() < 0 ){
        sign = '-';
        textColor = 'blue';
      }
      else{
        sign = '';
        textColor = 'black';
      }
      thisSymbolNode.charge.text = sign + model.getAtomicMass();
      thisSymbolNode.charge.fill = textColor;
      thisSymbolNode.charge.right = SYMBOL_BOX_WIDTH;
      thisSymbolNode.charge.top = 10;
    });
    boundingBox.addChild( this.charge );
  };

  // Inherit from Node.
  inherit( SymbolNode, Node );

  return SymbolNode;
} );
