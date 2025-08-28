// Copyright 2013-2025, University of Colorado Boulder

/**
 * Combination of a periodic table and an enlarged, dynamic, element symbol sitting above the table.
 *
 * @author John Blanco (PhET Interactive Simulations)
 */

import { TReadOnlyProperty } from '../../../../axon/js/TReadOnlyProperty.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import Node, { NodeOptions } from '../../../../scenery/js/nodes/Node.js';
import Rectangle from '../../../../scenery/js/nodes/Rectangle.js';
import Text from '../../../../scenery/js/nodes/Text.js';
import AtomIdentifier from '../../../../shred/js/AtomIdentifier.js';
import PeriodicTableNode from '../../../../shred/js/view/PeriodicTableNode.js';
import buildAnAtom from '../../buildAnAtom.js';

// constants
const SYMBOL_WIDTH_PROPORTION = 0.2;
const SYMBOL_ASPECT_RATIO = 1.0; // Width/height.

type SelfOptions = EmptySelfOptions;

export type PeriodicTableAndSymbolOptions = SelfOptions & NodeOptions;

class PeriodicTableAndSymbol extends Node {

  public constructor( protonCountProperty: TReadOnlyProperty<number>,
                      providedOptions: PeriodicTableAndSymbolOptions ) {

    const options = optionize<PeriodicTableAndSymbolOptions, SelfOptions, NodeOptions>()( {}, providedOptions );

    super( options );

    // Create and add the periodic table.
    const periodicTable = new PeriodicTableNode( protonCountProperty, {
      interactiveMax: 0,
      disabledCellColor: 'white'
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
        lineWidth: 2
      }
    );
    this.addChild( symbolRectangle );

    // Add the text that represents the chosen element.
    protonCountProperty.link( protonCount => {
      symbolRectangle.removeAllChildren();
      const symbolText = new Text( AtomIdentifier.getSymbol( protonCount ), {
        font: new PhetFont( { size: 48, weight: 'bold' } )
      } );
      symbolText.scale( Math.min( Math.min( symbolRectangle.width * 0.8 / symbolText.width, symbolRectangle.height * 0.8 / symbolText.height ), 1 ) );
      symbolText.center = new Vector2( symbolRectangle.width / 2, symbolRectangle.height / 2 );
      symbolRectangle.addChild( symbolText );
    } );

    // Do the layout.  This positions the symbol to fit into the top portion of the table.  The periodic table is 18
    // cells wide, and this needs to be centered over the 8th column to be in the right place.
    symbolRectangle.centerX = ( 7.5 / 18 ) * periodicTable.width;
    symbolRectangle.top = 0;
    periodicTable.top = symbolRectangle.bottom - ( periodicTable.height / 7 * 2.5 );
    periodicTable.left = 0;
  }
}

buildAnAtom.register( 'PeriodicTableAndSymbol', PeriodicTableAndSymbol );

export default PeriodicTableAndSymbol;