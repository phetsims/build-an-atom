// Copyright 2013-2021, University of Colorado Boulder

/**
 * Scenery node that represents an atomic symbol, meaning that it shows the
 * symbol text, the proton count, atomic number, and charge.
 *
 * @author John Blanco
 */

import { Image } from '../../../../scenery/js/imports.js';
import { Node } from '../../../../scenery/js/imports.js';
import SymbolNode from '../../../../shred/js/view/SymbolNode.js';
import scale_png from '../../../images/scale_png.js';
import buildAnAtom from '../../buildAnAtom.js';
import ChargeMeter from '../../common/view/ChargeMeter.js';

class BAASymbolNode extends Node {

  /**
   * Constructor
   * @param {NumberAtom} numberAtom
   * @param {Tandem} tandem
   */
  constructor( numberAtom, tandem, options ) {

    super( { tandem: tandem, pickable: false } );

    // Add the symbol node box (contains the element symbol and a display for the proton number, mass number, and charge number)
    const symbolNode = new SymbolNode( numberAtom.protonCountProperty, numberAtom.massNumberProperty, {
      chargeProperty: numberAtom.chargeProperty,
      tandem: tandem.createTandem( 'symbolNode' ),
      scale: 0.95
    } );
    this.addChild( symbolNode );

    // Add the scale image - just an image with no functionality.
    const scaleImage = new Image( scale_png, { tandem: tandem.createTandem( 'scaleImage' ) } );
    scaleImage.scale( 0.32 ); // Scale empirically determined to match design layout.
    this.addChild( scaleImage );

    // Add the charge meter.
    const chargeMeter = new ChargeMeter( numberAtom, tandem.createTandem( 'chargeMeter' ), {
      showNumericalReadout: false
    } );
    chargeMeter.scale( 1.5 );
    this.addChild( chargeMeter );

    // Do the layout.
    scaleImage.left = 0;
    scaleImage.centerY = symbolNode.massNumberDisplay.centerY;
    symbolNode.top = 0;
    symbolNode.left = scaleImage.right + 10;
    chargeMeter.left = symbolNode.right + 10;
    chargeMeter.centerY = symbolNode.chargeDisplay.centerY;

    this.mutate( options );
  }
}

buildAnAtom.register( 'BAASymbolNode', BAASymbolNode );

export default BAASymbolNode;