// Copyright 2013-2025, University of Colorado Boulder

/**
 * Node that adds a scale image and a charge meter to the left and right side of the symbol node, respectively.
 *
 * @author John Blanco
 * @author Luisa Vargas
 */

import { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import Image from '../../../../scenery/js/nodes/Image.js';
import { NumberAtomCounts } from '../../../../shred/js/model/NumberAtom.js';
import SymbolNode, { SymbolNodeOptions } from '../../../../shred/js/view/SymbolNode.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import scale_png from '../../../images/scale_png.js';
import buildAnAtom from '../../buildAnAtom.js';
import ChargeMeter from '../../common/view/ChargeMeter.js';

type SelfOptions = EmptySelfOptions;

export type BAASymbolNodeOptions = SelfOptions & SymbolNodeOptions;

class BAASymbolNode extends SymbolNode {

  public constructor( numberAtom: NumberAtomCounts, tandem: Tandem, options?: BAASymbolNodeOptions ) {

    super( numberAtom.protonCountProperty, numberAtom.massNumberProperty, {
      chargeProperty: numberAtom.chargeProperty,
      tandem: tandem
    } );

    // Add the scale image - just an image with no functionality.
    const scaleImage = new Image( scale_png, { tandem: tandem.createTandem( 'scaleImage' ) } );
    scaleImage.scale( 0.33 ); // Scale empirically determined to match design layout.
    this.addChild( scaleImage );

    // Add the charge meter.
    const chargeMeter = new ChargeMeter( numberAtom, tandem.createTandem( 'chargeMeter' ), {
      showNumericalReadout: false
    } );
    chargeMeter.scale( 1.6 );
    this.addChild( chargeMeter );

    // Do the layout.
    scaleImage.left = 0;
    scaleImage.centerY = this.massNumberDisplay.centerY;
    this.boundingBox.left = scaleImage.right + 10;
    chargeMeter.left = this.boundingBox.right + 10;
    if ( this.chargeDisplay ) {
      chargeMeter.centerY = this.chargeDisplay.centerY;
    }

    this.mutate( options );
  }
}

buildAnAtom.register( 'BAASymbolNode', BAASymbolNode );

export default BAASymbolNode;