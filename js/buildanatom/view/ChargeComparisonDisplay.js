// Copyright 2002-2013, University of Colorado Boulder

/**
 * A node that presents a comparison of the protons and electrons in an atom
 * in order to make the net charge apparent.
 *
 * @author John Blanco
 */
define( function( require ) {
  'use strict';

  // Imports
  var Node = require( 'SCENERY/nodes/Node' );
  var Shape = require( 'KITE/shape' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var Path = require( 'SCENERY/nodes/Path' );
  var inherit = require( 'PHET_CORE/inherit' );

  // Constants
  var SYMBOL_WIDTH = 12;
  var VERTICAL_INSET = 5;
  var INTER_SYMBOL_DISTANCE = SYMBOL_WIDTH * 0.4;
  var SYMBOL_LINE_WIDTH = SYMBOL_WIDTH * 0.3;

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
    plusSymbolShape.moveTo( -SYMBOL_LINE_WIDTH / 2, -SYMBOL_LINE_WIDTH / 2 );
    plusSymbolShape.lineTo( -SYMBOL_LINE_WIDTH / 2, -SYMBOL_WIDTH / 2 );
    plusSymbolShape.lineTo( SYMBOL_LINE_WIDTH / 2, -SYMBOL_WIDTH / 2 );
    plusSymbolShape.lineTo( SYMBOL_LINE_WIDTH / 2, -SYMBOL_LINE_WIDTH / 2 );
    plusSymbolShape.lineTo( SYMBOL_WIDTH / 2, -SYMBOL_LINE_WIDTH / 2 );
    plusSymbolShape.lineTo( SYMBOL_WIDTH / 2, SYMBOL_LINE_WIDTH / 2 );
    plusSymbolShape.lineTo( SYMBOL_LINE_WIDTH / 2, SYMBOL_LINE_WIDTH / 2 );
    plusSymbolShape.lineTo( SYMBOL_LINE_WIDTH / 2, SYMBOL_WIDTH / 2 );
    plusSymbolShape.lineTo( -SYMBOL_LINE_WIDTH / 2, SYMBOL_WIDTH / 2 );
    plusSymbolShape.lineTo( -SYMBOL_LINE_WIDTH / 2, SYMBOL_LINE_WIDTH / 2 );
    plusSymbolShape.lineTo( -SYMBOL_WIDTH / 2, SYMBOL_LINE_WIDTH / 2 );
    plusSymbolShape.lineTo( -SYMBOL_WIDTH / 2, -SYMBOL_LINE_WIDTH / 2 );
    plusSymbolShape.close();

    // Parent node for all symbols.
    var symbolLayer = new Node();
    this.addChild( symbolLayer );

    // Function that updates that displayed charge.
    var update = function( atom ) {
      symbolLayer.removeAllChildren();

      // Add plus symbols
      for ( var numProtons = 0; numProtons < atom.protonCount; numProtons++ ) {
        symbolLayer.addChild( new Path( {
          shape: plusSymbolShape,
          stroke: 'black',
          lineWidth: 1,
          fill: 'red',
          left: INTER_SYMBOL_DISTANCE / 2 + numProtons * ( SYMBOL_WIDTH + INTER_SYMBOL_DISTANCE ),
          centerY: VERTICAL_INSET + SYMBOL_WIDTH / 2
        } ) );
      }

      // Add minus symbols
      for ( var numElectrons = 0; numElectrons < atom.electronCount; numElectrons++ ) {
        symbolLayer.addChild( new Path( {
          shape: minusSymbolShape,
          stroke: 'black',
          lineWidth: 1,
          fill: 'rgb( 100, 100, 255 )',
          left: INTER_SYMBOL_DISTANCE / 2 + numElectrons * ( SYMBOL_WIDTH + INTER_SYMBOL_DISTANCE ),
          centerY: VERTICAL_INSET + SYMBOL_WIDTH * 1.5
        } ) );
      }

      // Add bounding box
      var numMatchedSymbols = Math.min( numProtons, numElectrons );
      if ( numMatchedSymbols > 0 ) {
        symbolLayer.addChild( new Rectangle( 0, 0, INTER_SYMBOL_DISTANCE / 2 + ( numMatchedSymbols * SYMBOL_WIDTH ) + ( ( numMatchedSymbols - 0.5 ) * INTER_SYMBOL_DISTANCE ), 2 * SYMBOL_WIDTH + 2 * VERTICAL_INSET, 4, 4,
          {
            lineWidth: 1,
            stroke: 'black'
          } ) );
      }
    };

    // Workaround for issue where location can't be set if no bounds exist.
    this.addChild( new Rectangle( 0, 0, SYMBOL_WIDTH, 2 * SYMBOL_WIDTH + 2 * VERTICAL_INSET, 0, 0, { fill: 'rgba( 0, 0, 0, 0 )'} ) );

    // Hook up the update function.
    numberAtom.particleCountProperty.link( function() {
      update( numberAtom );
    } );
  };

  // Inherit from Node.
  inherit( Node, ChargeComparisonDisplay );

  return ChargeComparisonDisplay;
} );