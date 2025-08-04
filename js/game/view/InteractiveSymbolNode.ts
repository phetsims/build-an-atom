// Copyright 2013-2025, University of Colorado Boulder

/**
 * Node that represents an element symbol where each of the numbers on the
 * symbol, i.e. proton count, mass number, and charge, can be interactive.
 *
 * @author John Blanco
 */

import BooleanProperty from '../../../../axon/js/BooleanProperty.js';
import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import DynamicProperty from '../../../../axon/js/DynamicProperty.js';
import NumberProperty from '../../../../axon/js/NumberProperty.js';
import Property from '../../../../axon/js/Property.js';
import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import optionize from '../../../../phet-core/js/optionize.js';
import WithRequired from '../../../../phet-core/js/types/WithRequired.js';
import MathSymbols from '../../../../scenery-phet/js/MathSymbols.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import Node, { NodeOptions } from '../../../../scenery/js/nodes/Node.js';
import Rectangle from '../../../../scenery/js/nodes/Rectangle.js';
import Text from '../../../../scenery/js/nodes/Text.js';
import AtomIdentifier from '../../../../shred/js/AtomIdentifier.js';
import NumberAtom from '../../../../shred/js/model/NumberAtom.js';
import ShredConstants from '../../../../shred/js/ShredConstants.js';
import buildAnAtom from '../../buildAnAtom.js';
import BAAColors from '../../common/BAAColors.js';
import BAANumberSpinner from './BAANumberSpinner.js';

// constants
const SYMBOL_BOX_WIDTH = 275; // In screen coords, which are roughly pixels.
const SYMBOL_BOX_HEIGHT = 300; // In screen coords, which are roughly pixels.
const NUMBER_FONT = new PhetFont( 56 );
const NUMBER_INSET = 15; // In screen coords, which are roughly pixels.
const NUMBER_ENTRY_NODE_SIDE_INSET = 10; // In screen coords, which are roughly pixels.

type SelfOptions = {
  interactiveProtonCount?: boolean; // If true, the proton count is interactive.
  interactiveMassNumber?: boolean; // If true, the mass number is interactive.
  interactiveCharge?: boolean; // If true, the charge is interactive.
  showAtomName?: boolean; // If true, the atom name is shown below the symbol.
  showArrowButtonsProperty?: TReadOnlyProperty<boolean>; // Whether to show the arrow buttons for the number spinners.
};

export type InteractiveSymbolNodeOptions = SelfOptions & WithRequired<NodeOptions, 'tandem'>;

class InteractiveSymbolNode extends Node {

  public readonly protonCountProperty: NumberProperty;
  public readonly massNumberProperty: NumberProperty;
  public readonly netChargeProperty: NumberProperty;

  private options: SelfOptions;

  public constructor( numberAtom: NumberAtom, providedOptions?: InteractiveSymbolNodeOptions ) {

    const options = optionize<InteractiveSymbolNodeOptions, SelfOptions, NodeOptions>()( {
      interactiveProtonCount: false,
      interactiveMassNumber: false,
      interactiveCharge: false,
      showAtomName: true,
      showArrowButtonsProperty: new BooleanProperty( false )
    }, providedOptions );

    super( options );

    this.options = options;

    this.protonCountProperty = new NumberProperty( options.interactiveProtonCount ? 0 : numberAtom.protonCountProperty.get(), {
      tandem: options.tandem.createTandem( 'protonCountProperty' ),
      numberType: 'Integer',
      phetioReadOnly: true
    } );
    this.massNumberProperty = new NumberProperty( options.interactiveMassNumber ? 0 : numberAtom.massNumberProperty.get(), {
      tandem: options.tandem.createTandem( 'massNumberProperty' ),
      numberType: 'Integer',
      phetioReadOnly: true
    } );
    this.netChargeProperty = new NumberProperty( options.interactiveCharge ? 0 : numberAtom.netChargeProperty.get(), {
      tandem: options.tandem.createTandem( 'netChargeProperty' ),
      numberType: 'Integer',
      phetioReadOnly: true
    } );

    if ( !options.interactiveProtonCount ) {
      numberAtom.protonCountProperty.link( protonCount => {
        this.protonCountProperty.value = protonCount;
      } );
    }
    if ( !options.interactiveMassNumber ) {
      numberAtom.massNumberProperty.link( massNumber => {
        this.massNumberProperty.value = massNumber;
      } );
    }
    if ( !options.interactiveCharge ) {
      numberAtom.netChargeProperty.link( charge => {
        this.netChargeProperty.value = charge;
      } );
    }

    // Add the bounding box, which is also the root node for everything else
    // that comprises this node.
    const boundingBox = new Rectangle( 0, 0, SYMBOL_BOX_WIDTH, SYMBOL_BOX_HEIGHT, 0, 0, {
      stroke: 'black',
      lineWidth: 2,
      fill: 'white'
    } );
    this.addChild( boundingBox );

    // Current string properties for the symbol text and element caption
    // const symbolStringProperty = new Property<string>( AtomIdentifier.getSymbol( 0 ) );
    const currentElementStringProperty = new Property( AtomIdentifier.getName( 0 ), { reentrant: true } );
    const elementDynamicStringProperty = new DynamicProperty( currentElementStringProperty );

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
      fill: BAAColors.protonColorProperty,
      top: SYMBOL_BOX_HEIGHT + 20,
      centerX: SYMBOL_BOX_WIDTH / 2,
      maxWidth: SYMBOL_BOX_WIDTH,
      visible: options.showAtomName
    } );
    options.showAtomName && boundingBox.addChild( elementCaption );

    // Define a function to update the symbol text and element caption.
    const updateElement = ( protonCount: number ) => {
      symbolText.string = protonCount > 0 ? AtomIdentifier.getSymbol( protonCount ) : '';
      symbolText.center = new Vector2( SYMBOL_BOX_WIDTH / 2, SYMBOL_BOX_HEIGHT / 2 );

      if ( protonCount > 0 ) {
        // Update the string property for the element caption.
        const elementNameProperty = AtomIdentifier.getName( protonCount );
        currentElementStringProperty.value = elementNameProperty;
        elementCaption.string = elementNameProperty.value;
      }
      else {
        elementCaption.string = '';
      }
      elementCaption.centerX = SYMBOL_BOX_WIDTH / 2;
    };

    this.protonCountProperty.link( protonCount => {
      updateElement( protonCount );
    } );

    // Updating the element if the element string property changes.
    elementDynamicStringProperty.link( () => {
      updateElement( this.protonCountProperty.value );
    } );

    // So that the interactive and non-interactive numbers are vertically
    // aligned, we need to create a dummy number and look at its height.
    const interactiveNumberCenterYOffset = new Text( '8', { font: NUMBER_FONT } ).height / 2;

    // Add the proton count display, either interactive or not.
    if ( options.interactiveProtonCount ) {
      boundingBox.addChild( new BAANumberSpinner(
        this.protonCountProperty,
        options.tandem.createTandem( 'protonCountNumberSpinner' ), {
          minValue: 0,
          maxValue: 99,
          getTextColor: () => BAAColors.protonColorProperty,
          left: NUMBER_ENTRY_NODE_SIDE_INSET,
          centerY: SYMBOL_BOX_HEIGHT - NUMBER_INSET - interactiveNumberCenterYOffset,
          arrowButtonOptions: {
            visibleProperty: options.showArrowButtonsProperty
          }
        } ) );
      this.protonCountProperty.link( updateElement );
    }
    else {
      const protonCountDisplay = new Text( new DerivedProperty( [ this.protonCountProperty ], protons => protons.toString() ), {
        font: NUMBER_FONT,
        fill: BAAColors.protonColorProperty,
        left: NUMBER_INSET,
        bottom: SYMBOL_BOX_HEIGHT - NUMBER_INSET
      } );
      boundingBox.addChild( protonCountDisplay );
      updateElement( numberAtom.protonCountProperty.get() );
    }

    // Add the mass number display, either interactive or not.
    if ( options.interactiveMassNumber ) {
      boundingBox.addChild( new BAANumberSpinner(
        this.massNumberProperty,
        options.tandem.createTandem( 'massNumberSpinner' ), {
          minValue: 0,
          maxValue: 99,
          left: NUMBER_ENTRY_NODE_SIDE_INSET,
          centerY: NUMBER_INSET + interactiveNumberCenterYOffset,
          arrowButtonOptions: {
            visibleProperty: options.showArrowButtonsProperty
          }
        } ) );
    }
    else {
      const massNumberDisplay = new Text( new DerivedProperty( [ this.massNumberProperty ], massNumber => massNumber.toString() ), {
        font: NUMBER_FONT,
        fill: 'black',
        left: NUMBER_INSET,
        top: NUMBER_INSET
      } );
      boundingBox.addChild( massNumberDisplay );
    }

    // Add the charge display, either interactive or not.
    if ( options.interactiveCharge ) {
      boundingBox.addChild( new BAANumberSpinner(
        this.netChargeProperty,
        options.tandem.createTandem( 'chargeNumberSpinner' ), {
          minValue: -99,
          maxValue: 99,
          showPlusForPositive: true,
          right: SYMBOL_BOX_WIDTH - NUMBER_ENTRY_NODE_SIDE_INSET,
          centerY: NUMBER_INSET + interactiveNumberCenterYOffset,
          getTextColor: ShredConstants.CHARGE_TEXT_COLOR,
          arrowButtonOptions: {
            visibleProperty: options.showArrowButtonsProperty
          }
        } ) );
    }
    else {
      const displayedTextProperty = new Property<string>( '' );
      const chargeDisplay = new Text( displayedTextProperty, {
        font: NUMBER_FONT,
        top: NUMBER_INSET
      } );
      boundingBox.addChild( chargeDisplay );

      this.netChargeProperty.link( charge => {
        const chargeSign = charge > 0 ? MathSymbols.PLUS : charge < 0 ? MathSymbols.MINUS : '';
        displayedTextProperty.value = `${Math.abs( charge ).toString()}${chargeSign}`;
        chargeDisplay.fill = ShredConstants.CHARGE_TEXT_COLOR( numberAtom.netChargeProperty.get() );
        chargeDisplay.right = SYMBOL_BOX_WIDTH - NUMBER_INSET;
      } );
    }
  }

  public reset(): void {
    this.options.interactiveProtonCount && this.protonCountProperty.reset();
    this.options.interactiveMassNumber && this.massNumberProperty.reset();
    this.options.interactiveCharge && this.netChargeProperty.reset();
  }
}

buildAnAtom.register( 'InteractiveSymbolNode', InteractiveSymbolNode );

export default InteractiveSymbolNode;