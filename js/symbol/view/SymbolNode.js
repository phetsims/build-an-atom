// Copyright 2002-2012, University of Colorado
define( function( require ) {

  var Node = require( 'SCENERY/nodes/Node' );
  var Text = require( 'SCENERY/nodes/Text' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var Vector2 = require( 'DOT/Vector2' );
  var AtomIdentifier = require( 'common/AtomIdentifier' );
  var UpDownButtonPair = require( 'symbol/view/UpDownButtonPair' );

  var SYMBOL_BOX_WIDTH = 250; // In screen coords, which are roughly pixels.
  var SYMBOL_BOX_HEIGHT = 250; // In screen coords, which are roughly pixels.
  var NUMBER_FONT = "45px Arial";
  var CONTROL_INSET = 10; // In screen coords, which are roughly pixels.

  var SymbolNode = function( atom ) {

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
                                  font: "150px Arial",
                                  fill: "black",
                                  center: new Vector2( SYMBOL_BOX_WIDTH / 2, SYMBOL_BOX_HEIGHT / 2 )
                                } );

    // Add the listener to update the symbol text.
    atom.link( 'protonCount', function( protonCount ) {
      var symbol = AtomIdentifier.getSymbol( protonCount );
      thisSymbolNode.symbolText.text = protonCount > 0 ? symbol : "";
      thisSymbolNode.symbolText.center = new Vector2( SYMBOL_BOX_WIDTH / 2, SYMBOL_BOX_HEIGHT / 2 )
    } );
    boundingBox.addChild( this.symbolText );

    // Add the control for the number of protons.
    var protonNumberControl = new UpDownButtonPair(
        function() {
          if ( atom.protonCount < 10 ) {
            atom.protonCount++;
          }
        },
        function() {
          if ( atom.protonCount > 0 ) {
            atom.protonCount--;
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
    atom.link( 'protonCount', function( protonCount ) {
      thisSymbolNode.protonCount.text = protonCount;
      thisSymbolNode.protonCount.left = protonNumberControl.bounds.maxX + 10;
      thisSymbolNode.protonCount.centerY = protonNumberControl.centerY;
    } );
    boundingBox.addChild( this.protonCount );

    // Add the control for the atomic mass.
    var atomicMassControl = new UpDownButtonPair(
        function() {
          if ( atom.neutronCount < 12 ) {
            atom.neutronCount++;
          }
        },
        function() {
          if ( atom.neutronCount > 0 ) {
              atom.neutronCount--;
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
      thisSymbolNode.atomicMass.text = atom.getAtomicMass();
      thisSymbolNode.atomicMass.left = atomicMassControl.bounds.maxX + 10;
      thisSymbolNode.atomicMass.centerY = atomicMassControl.centerY;
    };
    atom.link( 'protonCount', atomicMassUpdater );
    atom.link( 'neutronCount', atomicMassUpdater );

    // Add the charge control.
    var chargeControl = new UpDownButtonPair(
        function() {
          if ( atom.electronCount > 0 ) {
            atom.electronCount--;
          }
        },
        function() {
          if ( atom.electronCount < 11 ) {
            atom.electronCount++;
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
      var sign = '';
      var textColor;
      if ( atom.getCharge() > 0 ) {
        sign = '+';
        textColor = 'red';
      }
      else if ( atom.getCharge() < 0 ) {
        textColor = 'blue';
      }
      else {
        textColor = 'black';
      }
      thisSymbolNode.charge.text = sign + atom.getCharge();
      thisSymbolNode.charge.fill = textColor;
      thisSymbolNode.charge.right = chargeControl.bounds.minX - 10;
      thisSymbolNode.charge.centerY = chargeControl.centerY;
    };
    atom.link( 'protonCount', chargeUpdater );
    atom.link( 'electronCount', chargeUpdater );
  };

  // Inherit from Node.
  inherit( SymbolNode, Node );

  return SymbolNode;
} );
