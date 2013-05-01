// Copyright 2002-2012, University of Colorado
define( function( require ) {

  var _ = require( 'lodash' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Text = require( 'SCENERY/nodes/Text' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var Vector2 = require( 'DOT/Vector2' );
  var AtomIdentifier = require( 'common/AtomIdentifier' );
  var UpDownButtonPair = require( 'symbol/view/UpDownButtonPair' );

  var SYMBOL_BOX_WIDTH = 400; // In screen coords, which are roughly pixels.
  var SYMBOL_BOX_HEIGHT = 400; // In screen coords, which are roughly pixels.
  var NUMBER_FONT = "100px Arial";
  var CONTROL_INSET = 20; // In screen coords, which are roughly pixels.

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
    model.link( 'protonCount', function( protonCount ) {
      console.log( "protonCount = " + protonCount );
      var symbol = AtomIdentifier.getSymbol( protonCount );
      thisSymbolNode.symbolText.text = symbol;
      thisSymbolNode.symbolText.center = new Vector2( SYMBOL_BOX_WIDTH / 2, SYMBOL_BOX_HEIGHT / 2 )
    } );
    boundingBox.addChild( this.symbolText );

    // Add the control for the number of protons.
    var protonNumberControl = new UpDownButtonPair(
        function() {
          if ( model.protonCount < 103 ) {
            model.protonCount++;
          }
        },
        function() {
          if ( model.protonCount > 0 ) {
            model.protonCount--;
          }
        } ).mutate( { left: CONTROL_INSET, bottom: SYMBOL_BOX_HEIGHT - CONTROL_INSET } );
    this.addChild( protonNumberControl );

    // Add the proton count display.
    this.protonCount = new Text( "0",
                                 {
                                   font: NUMBER_FONT,
                                   fill: "red"
                                 } );

    // Add the listener to update the proton count.
    model.link( 'protonCount', function( protonCount ) {
      thisSymbolNode.protonCount.text = protonCount;
      thisSymbolNode.protonCount.left = protonNumberControl.bounds.maxX + 10;
      thisSymbolNode.protonCount.y = SYMBOL_BOX_HEIGHT - CONTROL_INSET;
    } );
    boundingBox.addChild( this.protonCount );

    // Add the control for the atomic mass.
    var atomicMassControl = new UpDownButtonPair(
        function() {
          if ( model.getAtomicMass() < 240 ) {
            model.neutronCount++;
          }
        },
        function() {
          if ( model.getAtomicMass() > 0 ) {
            if ( model.neutronCount > 0 ){
              model.neutronCount--;
            }
            else{
              model.protonCount--;
            }
          }
        } ).mutate( { left: CONTROL_INSET, top: CONTROL_INSET }
    );
    this.addChild( atomicMassControl );

    // Add the atomic mass display.
    this.atomicMass = new Text( "0",
                                {
                                  font: NUMBER_FONT,
                                  fill: "black"
                                } );
    boundingBox.addChild( this.atomicMass );

    // Add the listener to update the atomic mass.
    var atomicMassUpdater = function() {
      thisSymbolNode.atomicMass.text = model.getAtomicMass();
      thisSymbolNode.atomicMass.left = atomicMassControl.bounds.maxX + 10;
      thisSymbolNode.atomicMass.top = 0;
    };
    model.link( 'protonCount', atomicMassUpdater );
    model.link( 'neutronCount', atomicMassUpdater );

    // Add the charge control.
    var chargeControl = new UpDownButtonPair(
        function() {
          if ( model.electronCount > 0 ) {
            model.electronCount--;
          }
        },
        function() {
          if ( model.electronCount < 92 ) {
            model.electronCount++;
          }
        } ).mutate( { right: SYMBOL_BOX_WIDTH - CONTROL_INSET, top: CONTROL_INSET } );
    this.addChild( chargeControl );

    // Add the charge display.
    this.charge = new Text( "0",
                            {
                              font: NUMBER_FONT,
                              fill: "black"
                            } );
    boundingBox.addChild( this.charge );

    // Add the listener to update the charge.
    var chargeUpdater = function() {
      var sign;
      var textColor;
      if ( model.getCharge() > 0 ) {
        sign = '+';
        textColor = 'red';
      }
      else if ( model.getCharge() < 0 ) {
        sign = '-';
        textColor = 'blue';
      }
      else {
        sign = '';
        textColor = 'black';
      }
      thisSymbolNode.charge.text = sign + model.getCharge();
      thisSymbolNode.charge.fill = textColor;
      thisSymbolNode.charge.right = chargeControl.bounds.minX - 10;
      thisSymbolNode.charge.top = 10;
    };
    model.link( 'protonCount', chargeUpdater );
    model.link( 'electronCount', chargeUpdater );
  };

  // Inherit from Node.
  inherit( SymbolNode, Node );

  return SymbolNode;
} );
