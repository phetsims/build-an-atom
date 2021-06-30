// Copyright 2013-2021, University of Colorado Boulder

/**
 * Abstract class for AtomSymbolNode and NucleusSymbolNode
 *
 * @author John Blanco
 */

import Vector2 from '../../../../dot/js/Vector2.js';
import PhetColorScheme from '../../../../scenery-phet/js/PhetColorScheme.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import Rectangle from '../../../../scenery/js/nodes/Rectangle.js';
import Text from '../../../../scenery/js/nodes/Text.js';
import AtomIdentifier from '../../../../shred/js/AtomIdentifier.js';
import buildAnAtom from '../../buildAnAtom.js';

class SymbolNode extends Node {

  /**
   * Constructor
   * @param {NumberAtom} numberAtom
   * @param {Tandem} tandem
   */
  constructor( numberAtom, tandem, options ) {

    super( { tandem: tandem, pickable: false } );

    // @public (read-only) - add the bounding box, which is also the root node for everything else
    // that comprises this node.
    this.boundingBox = new Rectangle( 0, 0, SymbolNode.SYMBOL_BOX_WIDTH, SymbolNode.SYMBOL_BOX_HEIGHT, 0, 0, {
      stroke: 'black',
      lineWidth: 2,
      fill: 'white',
      tandem: tandem.createTandem( 'boundingBox' )
    } );
    this.addChild( this.boundingBox );

    // Add the symbol text.
    const symbolText = new Text( '', {
      font: new PhetFont( 150 ),
      fill: 'black',
      center: new Vector2( SymbolNode.SYMBOL_BOX_WIDTH / 2, SymbolNode.SYMBOL_BOX_HEIGHT / 2 ),
      tandem: tandem.createTandem( 'symbolText' )
    } );

    // Add the listener to update the symbol text.
    const textCenter = new Vector2( SymbolNode.SYMBOL_BOX_WIDTH / 2, SymbolNode.SYMBOL_BOX_HEIGHT / 2 );
    numberAtom.protonCountProperty.link( protonCount => {
      const symbol = AtomIdentifier.getSymbol( protonCount );
      symbolText.text = protonCount > 0 ? symbol : '';
      symbolText.center = textCenter;
    } );
    this.boundingBox.addChild( symbolText );

    // Add the atomic number display.
    const atomicNumberDisplay = new Text( '0', {
      font: SymbolNode.NUMBER_FONT,
      fill: PhetColorScheme.RED_COLORBLIND,
      tandem: tandem.createTandem( 'atomicNumberDisplay' )
    } );

    // Add the listener to update the proton count.
    numberAtom.protonCountProperty.link( protonCount => {
      atomicNumberDisplay.text = protonCount;
      atomicNumberDisplay.left = SymbolNode.NUMBER_INSET;
      atomicNumberDisplay.bottom = SymbolNode.SYMBOL_BOX_HEIGHT - SymbolNode.NUMBER_INSET;
    } );
    this.boundingBox.addChild( atomicNumberDisplay );

    // @public (read-only) - add the mass number display.
    this.massNumberDisplay = new Text( '0', {
      font: SymbolNode.NUMBER_FONT,
      fill: 'black',
      tandem: tandem.createTandem( 'massNumberDisplay' )
    } );
    this.boundingBox.addChild( this.massNumberDisplay );

    // Add the listener to update the mass number.
    numberAtom.massNumberProperty.link( massNumber => {
      this.massNumberDisplay.text = massNumber;
      this.massNumberDisplay.left = SymbolNode.NUMBER_INSET;
      this.massNumberDisplay.top = SymbolNode.NUMBER_INSET;
    } );
  }
}

SymbolNode.NUMBER_FONT = new PhetFont( 56 );
SymbolNode.SYMBOL_BOX_HEIGHT = 300; // In screen coords, which are roughly pixels.
SymbolNode.SYMBOL_BOX_WIDTH = 275; // In screen coords, which are roughly pixels.
SymbolNode.NUMBER_INSET = 20; // In screen coords, which are roughly pixels.

buildAnAtom.register( 'SymbolNode', SymbolNode );

export default SymbolNode;