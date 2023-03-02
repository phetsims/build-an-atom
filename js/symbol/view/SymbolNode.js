// Copyright 2013-2023, University of Colorado Boulder

/**
 * Scenery node that represents an atomic symbol, meaning that it shows the
 * symbol text, the proton count, atomic number, and charge.
 *
 * @author John Blanco
 */

import Vector2 from '../../../../dot/js/Vector2.js';
import MathSymbols from '../../../../scenery-phet/js/MathSymbols.js';
import PhetColorScheme from '../../../../scenery-phet/js/PhetColorScheme.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import { Image, Node, Rectangle, Text } from '../../../../scenery/js/imports.js';
import AtomIdentifier from '../../../../shred/js/AtomIdentifier.js';
import ShredConstants from '../../../../shred/js/ShredConstants.js';
import scale_png from '../../../images/scale_png.js';
import buildAnAtom from '../../buildAnAtom.js';
import ChargeMeter from '../../common/view/ChargeMeter.js';

// constants
const SYMBOL_BOX_WIDTH = 275; // In screen coords, which are roughly pixels.
const SYMBOL_BOX_HEIGHT = 300; // In screen coords, which are roughly pixels.
const NUMBER_FONT = new PhetFont( 56 );
const NUMBER_INSET = 20; // In screen coords, which are roughly pixels.

class SymbolNode extends Node {

  /**
   * Constructor
   * @param {NumberAtom} numberAtom
   * @param {Tandem} tandem
   * @param {Object} [options]
   */
  constructor( numberAtom, tandem, options ) {

    super( { tandem: tandem, pickable: false } );

    // Add the bounding box, which is also the root node for everything else
    // that comprises this node.
    const boundingBox = new Rectangle( 0, 0, SYMBOL_BOX_WIDTH, SYMBOL_BOX_HEIGHT, 0, 0, {
      stroke: 'black',
      lineWidth: 2,
      fill: 'white',
      tandem: tandem.createTandem( 'boundingBox' )
    } );
    this.addChild( boundingBox );

    // Add the symbol text.
    const symbolText = new Text( '', {
      font: new PhetFont( 150 ),
      fill: 'black',
      center: new Vector2( SYMBOL_BOX_WIDTH / 2, SYMBOL_BOX_HEIGHT / 2 ),
      tandem: tandem.createTandem( 'symbolText' )
    } );

    // Add the listener to update the symbol text.
    const textCenter = new Vector2( SYMBOL_BOX_WIDTH / 2, SYMBOL_BOX_HEIGHT / 2 );
    numberAtom.protonCountProperty.link( protonCount => {
      const symbol = AtomIdentifier.getSymbol( protonCount );
      symbolText.string = protonCount > 0 ? symbol : '';
      symbolText.center = textCenter;
    } );
    boundingBox.addChild( symbolText );

    // Add the atomic number display.
    const atomicNumberDisplayText = new Text( '0', {
      font: NUMBER_FONT,
      fill: PhetColorScheme.RED_COLORBLIND,
      tandem: tandem.createTandem( 'atomicNumberDisplayText' )
    } );

    // Add the listener to update the proton count.
    numberAtom.protonCountProperty.link( protonCount => {
      atomicNumberDisplayText.string = protonCount;
      atomicNumberDisplayText.left = NUMBER_INSET;
      atomicNumberDisplayText.bottom = SYMBOL_BOX_HEIGHT - NUMBER_INSET;
    } );
    boundingBox.addChild( atomicNumberDisplayText );

    // Add the mass number display.
    const massNumberDisplayText = new Text( '0', {
      font: NUMBER_FONT,
      fill: 'black',
      tandem: tandem.createTandem( 'massNumberDisplayText' )
    } );
    boundingBox.addChild( massNumberDisplayText );

    // Add the listener to update the mass number.
    numberAtom.massNumberProperty.link( massNumber => {
      massNumberDisplayText.string = massNumber.toString();
      massNumberDisplayText.left = NUMBER_INSET;
      massNumberDisplayText.top = NUMBER_INSET;
    } );

    // Add the charge display.
    const chargeDisplayText = new Text( '0', {
      font: NUMBER_FONT,
      fill: 'black',
      tandem: tandem.createTandem( 'chargeDisplayText' )
    } );
    boundingBox.addChild( chargeDisplayText );

    // Add the listener to update the charge.
    numberAtom.chargeProperty.link( charge => {
      const chargeChar = charge > 0 ? MathSymbols.PLUS : charge < 0 ? MathSymbols.MINUS : '';
      chargeDisplayText.string = `${Math.abs( charge ).toString( 10 )}${chargeChar}`;
      chargeDisplayText.fill = ShredConstants.CHARGE_TEXT_COLOR( charge );
      chargeDisplayText.right = SYMBOL_BOX_WIDTH - NUMBER_INSET;
      chargeDisplayText.top = NUMBER_INSET;
    } );

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
    scaleImage.centerY = massNumberDisplayText.centerY;
    boundingBox.top = 0;
    boundingBox.left = scaleImage.right + 10;
    chargeMeter.left = boundingBox.right + 10;
    chargeMeter.centerY = chargeDisplayText.centerY;

    this.mutate( options );
  }
}

buildAnAtom.register( 'SymbolNode', SymbolNode );

export default SymbolNode;