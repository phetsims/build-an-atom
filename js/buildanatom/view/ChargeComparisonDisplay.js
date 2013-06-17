// Copyright 2002-2013, University of Colorado

/**
 * A node that presents a comparison of the protons and electrons in an atom
 * in order to make the net charge apparent.
 *
 * @author John Blanco
 */
define( function( require ) {
  'use strict';

  // Imports
  var BAAFont = require( 'common/view/BAAFont' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Shape = require( 'KITE/shape' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var Path = require( 'SCENERY/nodes/Path' );
  var inherit = require( 'PHET_CORE/inherit' );

  // Constants
  var SYMBOL_WIDTH = 15;
  var SYMBOL_LINE_WIDTH = SYMBOL_WIDTH / 4;

  /**
   * @param numberAtom Model representation of the atom
   * @constructor
   */
  var ChargeComparisonDisplay = function ChargeComparisonDisplay( numberAtom ) {

    Node.call( this ); // Call super constructor.

    var minusSymbolShape = new Shape();
    minusSymbolShape.moveTo( -SYMBOL_WIDTH / 2, -SYMBOL_LINE_WIDTH / 2 );
    minusSymbolShape.lineTo( SYMBOL_WIDTH / 2, -SYMBOL_LINE_WIDTH / 2 );
    minusSymbolShape.lineTo( SYMBOL_WIDTH / 2, SYMBOL_LINE_WIDTH / 2 );
    minusSymbolShape.lineTo( -SYMBOL_WIDTH / 2, SYMBOL_LINE_WIDTH / 2 );
    minusSymbolShape.close();

    var plusSymbolShape = new Shape();
    plusSymbolShape.moveTo( -SYMBOL_WIDTH / 2, -SYMBOL_LINE_WIDTH / 2 );
    plusSymbolShape.lineTo( SYMBOL_WIDTH / 2, -SYMBOL_LINE_WIDTH / 2 );
    plusSymbolShape.lineTo( SYMBOL_WIDTH / 2, SYMBOL_LINE_WIDTH / 2 );
    plusSymbolShape.lineTo( -SYMBOL_WIDTH / 2, SYMBOL_LINE_WIDTH / 2 );
    plusSymbolShape.close();

    // Parent node for all symbols.
    var symbolLayer = new Node();
    this.addChild( symbolLayer );

    // Function that updates that displayed charge.
    var update = function( atom ) {
      symbolLayer.removeAllChildren();
      for ( var numProtons = 0; numProtons < atom.protonCount; numProtons++ ) {
        symbolLayer.addChild( new Path( {
                                          shape: plusSymbolShape,
                                          stroke: 'black',
                                          lineWidth: 1,
                                          fill: 'red',
                                          left: numProtons * (SYMBOL_WIDTH * 1.1 )
                                        } ) );
      }
      for ( var numElectrons = 0; numElectrons < atom.electronCount; numElectrons++ ) {
        symbolLayer.addChild( new Path( {
                                          shape: minusSymbolShape,
                                          stroke: 'black',
                                          lineWidth: 1,
                                          fill: 'blue',
                                          top: SYMBOL_WIDTH * 1.1,
                                          left: numElectrons * (SYMBOL_WIDTH * 1.1 )
                                        } ) );
      }
    };

    // Hook up the update function.
    numberAtom.particleCountProperty.link( function() {
      update( numberAtom );
    } );
  };

  // Inherit from Node.
  inherit( Node, ChargeComparisonDisplay );

  return ChargeComparisonDisplay;
} );