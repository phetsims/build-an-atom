// Copyright 2013-2019, University of Colorado Boulder

/**
 * Scenery node that represents an atomic symbol, meaning that it shows the
 * symbol text, the proton count, atomic number, and charge.
 *
 * @author John Blanco
 */

import Vector2 from '../../../../dot/js/Vector2.js';
import inherit from '../../../../phet-core/js/inherit.js';
import PhetColorScheme from '../../../../scenery-phet/js/PhetColorScheme.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import Image from '../../../../scenery/js/nodes/Image.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import Rectangle from '../../../../scenery/js/nodes/Rectangle.js';
import Text from '../../../../scenery/js/nodes/Text.js';
import AtomIdentifier from '../../../../shred/js/AtomIdentifier.js';
import ShredConstants from '../../../../shred/js/ShredConstants.js';
import scaleIcon from '../../../images/scale_png.js';
import buildAnAtom from '../../buildAnAtom.js';
import ChargeMeter from '../../common/view/ChargeMeter.js';

// constants
const SYMBOL_BOX_WIDTH = 275; // In screen coords, which are roughly pixels.
const SYMBOL_BOX_HEIGHT = 300; // In screen coords, which are roughly pixels.
const NUMBER_FONT = new PhetFont( 56 );
const NUMBER_INSET = 20; // In screen coords, which are roughly pixels.

/**
 * Constructor
 * @param {NumberAtom} numberAtom
 * @param {Tandem} tandem
 * @constructor
 */
function SymbolNode( numberAtom, tandem, options ) {

  Node.call( this, { tandem: tandem, pickable: false } );

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
  numberAtom.protonCountProperty.link( function( protonCount ) {
    const symbol = AtomIdentifier.getSymbol( protonCount );
    symbolText.text = protonCount > 0 ? symbol : '';
    symbolText.center = textCenter;
  } );
  boundingBox.addChild( symbolText );

  // Add the atomic number display.
  const atomicNumberDisplay = new Text( '0', {
    font: NUMBER_FONT,
    fill: PhetColorScheme.RED_COLORBLIND,
    tandem: tandem.createTandem( 'atomicNumberDisplay' )
  } );

  // Add the listener to update the proton count.
  numberAtom.protonCountProperty.link( function( protonCount ) {
    atomicNumberDisplay.text = protonCount;
    atomicNumberDisplay.left = NUMBER_INSET;
    atomicNumberDisplay.bottom = SYMBOL_BOX_HEIGHT - NUMBER_INSET;
  } );
  boundingBox.addChild( atomicNumberDisplay );

  // Add the mass number display.
  const massNumberDisplay = new Text( '0', {
    font: NUMBER_FONT,
    fill: 'black',
    tandem: tandem.createTandem( 'massNumberDisplay' )
  } );
  boundingBox.addChild( massNumberDisplay );

  // Add the listener to update the mass number.
  numberAtom.massNumberProperty.link( function( massNumber ) {
    massNumberDisplay.text = massNumber;
    massNumberDisplay.left = NUMBER_INSET;
    massNumberDisplay.top = NUMBER_INSET;
  } );

  // Add the charge display.
  const chargeDisplay = new Text( '0', {
    font: NUMBER_FONT,
    fill: 'black',
    tandem: tandem.createTandem( 'chargeDisplay' )
  } );
  boundingBox.addChild( chargeDisplay );

  // Add the listener to update the charge.
  numberAtom.chargeProperty.link( function( charge ) {
    chargeDisplay.text = ( charge > 0 ? '+' : '' ) + charge;
    chargeDisplay.fill = ShredConstants.CHARGE_TEXT_COLOR( charge );
    chargeDisplay.right = SYMBOL_BOX_WIDTH - NUMBER_INSET;
    chargeDisplay.top = NUMBER_INSET;
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
  scaleImage.centerY = massNumberDisplay.centerY;
  boundingBox.top = 0;
  boundingBox.left = scaleImage.right + 10;
  chargeMeter.left = boundingBox.right + 10;
  chargeMeter.centerY = chargeDisplay.centerY;

  this.mutate( options );
}

buildAnAtom.register( 'SymbolNode', SymbolNode );

// Inherit from Node.
inherit( Node, SymbolNode );
export default SymbolNode;