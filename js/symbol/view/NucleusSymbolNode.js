// Copyright 2013-2021, University of Colorado Boulder

/**
 * Scenery node that represents an atomic symbol, meaning that it shows the
 * symbol text, the proton count, atomic number, charge, and isotope naming notation.
 *
 * @author Luisa Vargas
 */

import Vector2 from '../../../../dot/js/Vector2.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import Text from '../../../../scenery/js/nodes/Text.js';
import AtomIdentifier from '../../../../shred/js/AtomIdentifier.js';
import buildAnAtom from '../../buildAnAtom.js';
import SymbolNode from './SymbolNode.js';

class NucleusSymbolNode extends SymbolNode {

  /**
   * @param {NumberAtom} numberAtom
   * @param {Tandem} tandem
   */
  constructor( numberAtom, tandem, options ) {

    super( numberAtom, tandem, options );

    // Add the isotope naming notation
    const isotopeText = new Text( '', {
      font: new PhetFont( 57 ),
      fill: 'black',
      center: new Vector2( 220, SymbolNode.SYMBOL_BOX_HEIGHT + 35 ),
      tandem: tandem.createTandem( 'isotopeText' )
    } );
    this.boundingBox.addChild( isotopeText );

    //Add the listener to update the isotope name
    numberAtom.protonCountProperty.link( protonCount => {
      const isotope = AtomIdentifier.getName( protonCount );
      isotopeText.text = protonCount > 0 ? isotope : '';
      isotopeText.right = 210;
      isotopeText.top = SymbolNode.SYMBOL_BOX_HEIGHT + 35;
    } );

    //add the isotope number notation aka mass number
    const isotopeNumText = new Text( '', {
      font: new PhetFont( 57 ),
      fill: 'black',
      center: new Vector2( 270, SymbolNode.SYMBOL_BOX_HEIGHT + 67.5 ),
      tandem: tandem.createTandem( 'isotopeText' )
    } );
    this.addChild( isotopeNumText );

    //add listener to update the isotope text mass number
    numberAtom.massNumberProperty.link( massNumber => {
      isotopeNumText.text = massNumber > 0 ? ' - ' + massNumber : '';
      if ( massNumber < 10 ) {
        isotopeNumText.center = new Vector2( 250, SymbolNode.SYMBOL_BOX_HEIGHT + 67.5 );
      }
      else {
        isotopeNumText.center = new Vector2( 265, SymbolNode.SYMBOL_BOX_HEIGHT + 67.5 );
      }
    } );

    // Do the layout.
    this.boundingBox.top = 0;
    this.boundingBox.left = 20;
    isotopeText.left = 0;
    isotopeText.centerY = this.boundingBox.bottom + 5;

    this.mutate( options );
  }
}

buildAnAtom.register( 'NucleusSymbolNode', NucleusSymbolNode );

export default NucleusSymbolNode;