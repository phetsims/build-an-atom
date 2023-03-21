// Copyright 2013-2023, University of Colorado Boulder

/**
 * Node that represents an element symbol where each of the numbers on the
 * symbol, i.e. proton count, mass number, and charge, can be interactive.
 *
 * @author John Blanco
 */

import NumberProperty from '../../../../axon/js/NumberProperty.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import merge from '../../../../phet-core/js/merge.js';
import MathSymbols from '../../../../scenery-phet/js/MathSymbols.js';
import PhetColorScheme from '../../../../scenery-phet/js/PhetColorScheme.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import { Node, Rectangle, Text } from '../../../../scenery/js/imports.js';
import AtomIdentifier from '../../../../shred/js/AtomIdentifier.js';
import ShredConstants from '../../../../shred/js/ShredConstants.js';
import buildAnAtom from '../../buildAnAtom.js';
import NumberEntryNode from './NumberEntryNode.js';

// constants
const SYMBOL_BOX_WIDTH = 275; // In screen coords, which are roughly pixels.
const SYMBOL_BOX_HEIGHT = 300; // In screen coords, which are roughly pixels.
const NUMBER_FONT = new PhetFont( 56 );
const NUMBER_INSET = 15; // In screen coords, which are roughly pixels.
const NUMBER_ENTRY_NODE_SIDE_INSET = 10; // In screen coords, which are roughly pixels.

class InteractiveSymbolNode extends Node {

  /**
   * Constructor
   * @param {NumberAtom} numberAtom
   * @param {Tandem} tandem
   * @param {Object} [options]
   */
  constructor( numberAtom, tandem, options ) {

    super( options );

    options = merge( { // defaults
      interactiveProtonCount: false,
      interactiveMassNumber: false,
      interactiveCharge: false
    }, options );

    this.protonCountProperty = new NumberProperty( options.interactiveProtonCount ? 0 : numberAtom.protonCountProperty.get(), {
      tandem: tandem.createTandem( 'protonCountProperty' ),
      numberType: 'Integer'
    } );
    this.massNumberProperty = new NumberProperty( options.interactiveMassNumber ? 0 : numberAtom.massNumberProperty.get(), {
      tandem: tandem.createTandem( 'massNumberProperty' ),
      numberType: 'Integer'
    } );
    this.chargeProperty = new NumberProperty( options.interactiveCharge ? 0 : numberAtom.chargeProperty.get(), {
      tandem: tandem.createTandem( 'chargeProperty' ),
      numberType: 'Integer'
    } );

    // Add the bounding box, which is also the root node for everything else
    // that comprises this node.
    const boundingBox = new Rectangle( 0, 0, SYMBOL_BOX_WIDTH, SYMBOL_BOX_HEIGHT, 0, 0, {
      stroke: 'black',
      lineWidth: 2,
      fill: 'white'
    } );
    this.addChild( boundingBox );

    // Add the symbol text.
    const symbolText = new Text( '', {
      font: new PhetFont( 150 ),
      fill: 'black',
      center: new Vector2( SYMBOL_BOX_WIDTH / 2, SYMBOL_BOX_HEIGHT / 2 )
    } );
    boundingBox.addChild( symbolText );

    // Add the element caption.
    const elementCaption = new Text( '', {
      font: new PhetFont( 40 ),
      fill: PhetColorScheme.RED_COLORBLIND,
      top: SYMBOL_BOX_HEIGHT + 20,
      centerX: SYMBOL_BOX_WIDTH / 2,
      maxWidth: SYMBOL_BOX_WIDTH
    } );
    boundingBox.addChild( elementCaption );

    // Define a function to update the symbol text and element caption.
    const updateElement = protonCount => {
      symbolText.string = protonCount > 0 ? AtomIdentifier.getSymbol( protonCount ) : '';
      symbolText.center = new Vector2( SYMBOL_BOX_WIDTH / 2, SYMBOL_BOX_HEIGHT / 2 );
      elementCaption.string = protonCount > 0 ? AtomIdentifier.getName( protonCount ) : '';
      elementCaption.centerX = SYMBOL_BOX_WIDTH / 2;
    };

    // So that the interactive and non-interactive numbers are vertically
    // aligned, we need to create a dummy number and look at its height.
    const interactiveNumberCenterYOffset = new Text( '8', { font: NUMBER_FONT } ).height / 2;

    // Add the proton count display, either interactive or not.
    if ( options.interactiveProtonCount ) {
      boundingBox.addChild( new NumberEntryNode(
        this.protonCountProperty,
        tandem.createTandem( 'protonCountEntryNode' ), {
          minValue: 0,
          maxValue: 99,
          getTextColor: () => PhetColorScheme.RED_COLORBLIND,
          left: NUMBER_ENTRY_NODE_SIDE_INSET,
          centerY: SYMBOL_BOX_HEIGHT - NUMBER_INSET - interactiveNumberCenterYOffset
        } ) );
      this.protonCountProperty.link( updateElement );
    }
    else {
      const protonCountDisplay = new Text( numberAtom.protonCountProperty.get(), {
        font: NUMBER_FONT,
        fill: PhetColorScheme.RED_COLORBLIND,
        left: NUMBER_INSET,
        bottom: SYMBOL_BOX_HEIGHT - NUMBER_INSET
      } );
      boundingBox.addChild( protonCountDisplay );
      updateElement( numberAtom.protonCountProperty.get() );
    }

    // Add the mass number display, either interactive or not.
    if ( options.interactiveMassNumber ) {
      boundingBox.addChild( new NumberEntryNode(
        this.massNumberProperty,
        tandem.createTandem( 'massNumberEntryNode' ), {
          minValue: 0,
          maxValue: 99,
          left: NUMBER_ENTRY_NODE_SIDE_INSET,
          centerY: NUMBER_INSET + interactiveNumberCenterYOffset
        } ) );
    }
    else {
      const massNumberDisplay = new Text( numberAtom.massNumberProperty.get(), {
        font: NUMBER_FONT,
        fill: 'black',
        left: NUMBER_INSET,
        top: NUMBER_INSET
      } );
      boundingBox.addChild( massNumberDisplay );
    }

    // Add the charge display, either interactive or not.
    if ( options.interactiveCharge ) {
      boundingBox.addChild( new NumberEntryNode(
        this.chargeProperty,
        tandem.createTandem( 'chargeEntryNode' ), {
          minValue: -99,
          maxValue: 99,
          showPlusForPositive: true,
          getTextColor: ShredConstants.CHARGE_TEXT_COLOR,
          right: SYMBOL_BOX_WIDTH - NUMBER_ENTRY_NODE_SIDE_INSET,
          centerY: NUMBER_INSET + interactiveNumberCenterYOffset
        } ) );
    }
    else {
      const charge = numberAtom.chargeProperty.value;
      const chargeSign = charge > 0 ? MathSymbols.PLUS : charge < 0 ? MathSymbols.MINUS : '';
      const chargeDisplay = new Text( `${Math.abs( charge ).toString()}${chargeSign}`, {
        font: NUMBER_FONT,
        fill: ShredConstants.CHARGE_TEXT_COLOR( numberAtom.chargeProperty.get() ),
        right: SYMBOL_BOX_WIDTH - NUMBER_INSET,
        top: NUMBER_INSET
      } );
      boundingBox.addChild( chargeDisplay );
    }

    // @private called by dispose
    this.disposeInteractiveSymbolNode = () => {
      if ( this.protonCountProperty.hasListener( updateElement ) ) {
        this.protonCountProperty.unlink( updateElement );
      }
      boundingBox.children.forEach( child => { child.dispose(); } );
      this.protonCountProperty.dispose();
      this.massNumberProperty.dispose();
      this.chargeProperty.dispose();
    };
  }

  // @public
  reset() {
    this.protonCountProperty.reset();
    this.massNumberProperty.reset();
    this.chargeProperty.reset();
  }

  /**
   * release references
   * @public
   */
  dispose() {
    this.disposeInteractiveSymbolNode();

    super.dispose();
  }
}

buildAnAtom.register( 'InteractiveSymbolNode', InteractiveSymbolNode );

export default InteractiveSymbolNode;