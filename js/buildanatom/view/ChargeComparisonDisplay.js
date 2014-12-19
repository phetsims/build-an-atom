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
  var BuildAnAtomModel = require( 'BUILD_AN_ATOM/common/model/BuildAnAtomModel' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Shape = require( 'KITE/Shape' );
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
  function ChargeComparisonDisplay( numberAtom ) {

    Node.call( this ); // Call super constructor.

    var MAX_CHARGE = BuildAnAtomModel.MAX_CHARGE;
    var i;

    // Parent node for all symbols.
    var symbolLayer = new Node();

    var minusSymbolShape = new Shape();
    minusSymbolShape.moveTo( -SYMBOL_WIDTH / 2, -SYMBOL_LINE_WIDTH / 2 );
    minusSymbolShape.lineTo( SYMBOL_WIDTH / 2, -SYMBOL_LINE_WIDTH / 2 );
    minusSymbolShape.lineTo( SYMBOL_WIDTH / 2, SYMBOL_LINE_WIDTH / 2 );
    minusSymbolShape.lineTo( -SYMBOL_WIDTH / 2, SYMBOL_LINE_WIDTH / 2 );
    minusSymbolShape.close();

    var minusSymbolPath = new Path( minusSymbolShape, {
      stroke: 'black',
      lineWidth: 1,
      fill: 'rgb( 100, 100, 255 )',
      left: INTER_SYMBOL_DISTANCE / 2,
      centerY: VERTICAL_INSET + SYMBOL_WIDTH * 1.5
    } );

    var minuses = [];
    for ( i = 0; i < MAX_CHARGE; i++ ) {
      var minusSymbol = new Node( {
        children: [minusSymbolPath],
        x: i * ( SYMBOL_WIDTH + INTER_SYMBOL_DISTANCE )
      } );
      minuses.push( minusSymbol );
      symbolLayer.addChild( minusSymbol );
    }

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

    var plusSymbolPath = new Path( plusSymbolShape, {
      stroke: 'black',
      lineWidth: 1,
      fill: 'red',
      left: INTER_SYMBOL_DISTANCE / 2,
      centerY: VERTICAL_INSET + SYMBOL_WIDTH / 2
    } );

    var plusses = [];
    for ( i = 0; i < MAX_CHARGE; i++ ) {
      var plusSymbol = new Node( {
        children: [plusSymbolPath],
        x: i * ( SYMBOL_WIDTH + INTER_SYMBOL_DISTANCE )
      } );
      plusses.push( plusSymbol );
      symbolLayer.addChild( plusSymbol );
    }

    // width will be changed dynamically, all of the others will remain static
    var matchBox = new Rectangle( 0, 0, INTER_SYMBOL_DISTANCE / 2, 2 * SYMBOL_WIDTH + 2 * VERTICAL_INSET, 4, 4, {
      lineWidth: 1,
      stroke: 'black',
      visible: false
    } );
    symbolLayer.addChild( matchBox );

    // Function that updates that displayed charge.
    var update = function( atom ) {
      // toggle plus visibility
      for ( var numProtons = 0; numProtons < MAX_CHARGE; numProtons++ ) {
        plusses[numProtons].visible = numProtons < atom.protonCount;
      }

      // toggle minus visibility
      for ( var numElectrons = 0; numElectrons < MAX_CHARGE; numElectrons++ ) {
        minuses[numElectrons].visible = numElectrons < atom.electronCount;
      }

      // matching box
      var numMatchedSymbols = Math.min( atom.protonCount, atom.electronCount );
      matchBox.visible = numMatchedSymbols > 0;
      matchBox.rectWidth = INTER_SYMBOL_DISTANCE / 2 + ( numMatchedSymbols * SYMBOL_WIDTH ) + ( ( numMatchedSymbols - 0.5 ) * INTER_SYMBOL_DISTANCE );
    };

    // Workaround for issue where location can't be set if no bounds exist.
    this.addChild( new Rectangle( 0, 0, SYMBOL_WIDTH, 2 * SYMBOL_WIDTH + 2 * VERTICAL_INSET, 0, 0, { fill: 'rgba( 0, 0, 0, 0 )'} ) );

    // Hook up the update function.
    numberAtom.particleCountProperty.link( function() {
      update( numberAtom );
    } );

    this.addChild( symbolLayer ); // added at the end so we have faster startup times
  }

  // Inherit from Node.
  return inherit( Node, ChargeComparisonDisplay );
} );
