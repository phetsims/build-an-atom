// Copyright 2013-2021, University of Colorado Boulder

/**
 * Scenery node that represents an atomic symbol, meaning that it shows the
 * symbol text, the proton count, atomic number, and charge.
 *
 * @author John Blanco
 * @author Chris Klusendorf (PhET Interactive Simulations)
 * @author Luisa Vargas
 */

import Image from '../../../../scenery/js/nodes/Image.js';
import Text from '../../../../scenery/js/nodes/Text.js';
import ShredConstants from '../../../../shred/js/ShredConstants.js';
import scaleIcon from '../../../images/scale_png.js';
import buildAnAtom from '../../buildAnAtom.js';
import ChargeMeter from '../../common/view/ChargeMeter.js';
import SymbolNode from './SymbolNode.js';

class AtomSymbolNode extends SymbolNode {

  /**
   * Constructor
   * @param {NumberAtom} numberAtom
   * @param {Tandem} tandem
   */
  constructor( numberAtom, tandem, options ) {

    super( numberAtom, tandem, options );

    // Add the charge display.
    const chargeDisplay = new Text( '0', {
      font: SymbolNode.NUMBER_FONT,
      fill: 'black',
      tandem: tandem.createTandem( 'chargeDisplay' )
    } );
    this.boundingBox.addChild( chargeDisplay );

    // Add the listener to update the charge.
    numberAtom.chargeProperty.link( charge => {
      chargeDisplay.text = ( charge > 0 ? '+' : '' ) + charge;
      chargeDisplay.fill = ShredConstants.CHARGE_TEXT_COLOR( charge );
      chargeDisplay.right = SymbolNode.SYMBOL_BOX_WIDTH - SymbolNode.NUMBER_INSET;
      chargeDisplay.top = SymbolNode.NUMBER_INSET;
    } );

    // Add the scale image - just an image with no functionality.
    const scaleImage = new Image( scaleIcon, { tandem: tandem.createTandem( 'scaleImage' ) } );
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
    scaleImage.centerY = this.massNumberDisplay.centerY;
    this.boundingBox.top = 0;
    this.boundingBox.left = scaleImage.right + 10;
    chargeMeter.left = this.boundingBox.right + 10;
    chargeMeter.centerY = chargeDisplay.centerY;

    this.mutate( options );
  }
}

buildAnAtom.register( 'AtomSymbolNode', AtomSymbolNode );

export default AtomSymbolNode;
