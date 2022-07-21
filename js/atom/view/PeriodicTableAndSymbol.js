// Copyright 2013-2022, University of Colorado Boulder

/**
 * Combination of a periodic table and an enlarged, dynamic, element symbol
 * sitting above the table.
 */

import Vector2 from '../../../../dot/js/Vector2.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import { Node, Rectangle, Text } from '../../../../scenery/js/imports.js';
import AtomIdentifier from '../../../../shred/js/AtomIdentifier.js';
import PeriodicTableNode from '../../../../shred/js/view/PeriodicTableNode.js';
import buildAnAtom from '../../buildAnAtom.js';

// constants
const SYMBOL_WIDTH_PROPORTION = 0.2;
const SYMBOL_ASPECT_RATIO = 1.0; // Width/height.

class PeriodicTableAndSymbol extends Node {

  /**
   * @param {NumberAtom} numberAtom
   * @param {Tandem} tandem
   * @param {Object} [options]
   */
  constructor( numberAtom, tandem, options ) {

    options.tandem = tandem;
    super();

    // Create and add the periodic table.
    const periodicTable = new PeriodicTableNode( numberAtom, {
      interactiveMax: 0,
      disabledCellColor: 'white',
      tandem: tandem.createTandem( 'periodicTable' )
    } );
    this.addChild( periodicTable );

    // Create and add the symbol, which only shows a bigger version of the selected element symbol.
    const symbolRectangle = new Rectangle(
      0,
      0,
      periodicTable.width * SYMBOL_WIDTH_PROPORTION,
      periodicTable.width * SYMBOL_WIDTH_PROPORTION / SYMBOL_ASPECT_RATIO,
      {
        fill: 'white',
        stroke: 'black',
        lineWidth: 2,
        tandem: tandem.createTandem( 'symbolRectangle' )
      }
    );
    this.addChild( symbolRectangle );

    // Add the text that represents the chosen element.
    numberAtom.protonCountProperty.link( protonCount => {
      symbolRectangle.removeAllChildren();
      const symbolText = new Text( AtomIdentifier.getSymbol( protonCount ), {
        font: new PhetFont( { size: 48, weight: 'bold' } )
      } );
      symbolText.scale( Math.min( Math.min( symbolRectangle.width * 0.8 / symbolText.width, symbolRectangle.height * 0.8 / symbolText.height ), 1 ) );
      symbolText.center = new Vector2( symbolRectangle.width / 2, symbolRectangle.height / 2 );
      symbolRectangle.addChild( symbolText );
    } );

    // Do the layout.  This positions the symbol to fit into the top portion
    // of the table.  The periodic table is 18 cells wide, and this needs
    // to be centered over the 8th column to be in the right place.
    symbolRectangle.centerX = ( 7.5 / 18 ) * periodicTable.width;
    symbolRectangle.top = 0;
    periodicTable.top = symbolRectangle.bottom - ( periodicTable.height / 7 * 2.5 );
    periodicTable.left = 0;

    this.mutate( options );
  }
}

buildAnAtom.register( 'PeriodicTableAndSymbol', PeriodicTableAndSymbol );

export default PeriodicTableAndSymbol;