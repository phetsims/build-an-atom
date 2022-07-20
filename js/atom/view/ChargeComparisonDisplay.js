// Copyright 2013-2022, University of Colorado Boulder

/**
 * A node that presents a comparison of the protons and electrons in an atom in order to make the net charge apparent.
 *
 * @author John Blanco
 */

import { Shape } from '../../../../kite/js/imports.js';
import PhetColorScheme from '../../../../scenery-phet/js/PhetColorScheme.js';
import { Node, Path, Rectangle } from '../../../../scenery/js/imports.js';
import buildAnAtom from '../../buildAnAtom.js';
import BuildAnAtomModel from '../../common/model/BuildAnAtomModel.js';

// constants
const SYMBOL_WIDTH = 12;
const VERTICAL_INSET = 5;
const INTER_SYMBOL_DISTANCE = SYMBOL_WIDTH * 0.4;
const SYMBOL_LINE_WIDTH = SYMBOL_WIDTH * 0.3;

class ChargeComparisonDisplay extends Node {

  /**
   * @param {ParticleAtom} particleAtom - model representation of the atom
   * @param {Tandem} tandem
   * @param {Object} [options]
   */
  constructor( particleAtom, tandem, options ) {

    super( { tandem: tandem } );

    const MAX_CHARGE = BuildAnAtomModel.MAX_CHARGE;
    let i;

    // Parent node for all symbols.
    const symbolLayer = new Node( { tandem: tandem.createTandem( 'symbolLayer' ) } );

    const minusSymbolShape = new Shape();
    minusSymbolShape.moveTo( -SYMBOL_WIDTH / 2, -SYMBOL_LINE_WIDTH / 2 );
    minusSymbolShape.lineTo( SYMBOL_WIDTH / 2, -SYMBOL_LINE_WIDTH / 2 );
    minusSymbolShape.lineTo( SYMBOL_WIDTH / 2, SYMBOL_LINE_WIDTH / 2 );
    minusSymbolShape.lineTo( -SYMBOL_WIDTH / 2, SYMBOL_LINE_WIDTH / 2 );
    minusSymbolShape.close();

    const minusSymbolPath = new Path( minusSymbolShape, {
      stroke: 'black',
      lineWidth: 1,
      fill: 'rgb( 100, 100, 255 )',
      left: INTER_SYMBOL_DISTANCE / 2,
      centerY: VERTICAL_INSET + SYMBOL_WIDTH * 1.5
    } );

    const minuses = [];
    for ( i = 0; i < MAX_CHARGE; i++ ) {
      const minusSymbol = new Node( {
        children: [ minusSymbolPath ],
        x: i * ( SYMBOL_WIDTH + INTER_SYMBOL_DISTANCE )
      } );
      minuses.push( minusSymbol );
      symbolLayer.addChild( minusSymbol );
    }

    const plusSymbolShape = new Shape();
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

    const plusSymbolPath = new Path( plusSymbolShape, {
      stroke: 'black',
      lineWidth: 1,
      fill: PhetColorScheme.RED_COLORBLIND,
      left: INTER_SYMBOL_DISTANCE / 2,
      centerY: VERTICAL_INSET + SYMBOL_WIDTH / 2
    } );

    const plusses = [];
    for ( i = 0; i < MAX_CHARGE; i++ ) {
      const plusSymbol = new Node( {
        children: [ plusSymbolPath ],
        x: i * ( SYMBOL_WIDTH + INTER_SYMBOL_DISTANCE )
      } );
      plusses.push( plusSymbol );
      symbolLayer.addChild( plusSymbol );
    }

    // width will be changed dynamically, all of the others will remain static
    const matchBox = new Rectangle( 0, 0, INTER_SYMBOL_DISTANCE / 2, 2 * SYMBOL_WIDTH + 2 * VERTICAL_INSET, 4, 4, {
      lineWidth: 1,
      stroke: 'black',
      visible: false,
      tandem: tandem.createTandem( 'matchBox' )
    } );
    symbolLayer.addChild( matchBox );

    // Function that updates that displayed charge.
    const update = atom => {

      // toggle plus visibility
      for ( let numProtons = 0; numProtons < MAX_CHARGE; numProtons++ ) {
        plusses[ numProtons ].visible = numProtons < atom.protonCountProperty.get();
      }

      // toggle minus visibility
      for ( let numElectrons = 0; numElectrons < MAX_CHARGE; numElectrons++ ) {
        minuses[ numElectrons ].visible = numElectrons < atom.electronCountProperty.get();
      }

      // matching box
      const numMatchedSymbols = Math.min( atom.protonCountProperty.get(), atom.electronCountProperty.get() );
      matchBox.visible = numMatchedSymbols > 0;
      matchBox.rectWidth = INTER_SYMBOL_DISTANCE / 2 + ( numMatchedSymbols * SYMBOL_WIDTH ) + ( ( numMatchedSymbols - 0.5 ) * INTER_SYMBOL_DISTANCE );
    };

    // Workaround for issue where position can't be set if no bounds exist.
    this.addChild( new Rectangle( 0, 0, SYMBOL_WIDTH, 2 * SYMBOL_WIDTH + 2 * VERTICAL_INSET, 0, 0, {
      fill: 'rgba( 0, 0, 0, 0 )'
    } ) );

    // Hook up the update function.
    particleAtom.particleCountProperty.link( () => {
      update( particleAtom );
    } );

    this.addChild( symbolLayer ); // added at the end so we have faster startup times

    this.mutate( options );
  }
}

buildAnAtom.register( 'ChargeComparisonDisplay', ChargeComparisonDisplay );
export default ChargeComparisonDisplay;