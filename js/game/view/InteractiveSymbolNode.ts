// Copyright 2013-2025, University of Colorado Boulder

/**
 * InteractiveSymbolNode is a Scenery Node that represents an element symbol where each of the numbers on the symbol,
 * i.e. proton count (aka atomic number), mass number, and charge, can potentially be interactive.
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
import Rectangle from '../../../../scenery/js/nodes/Rectangle.js';
import Text from '../../../../scenery/js/nodes/Text.js';
import AtomIdentifier from '../../../../shred/js/AtomIdentifier.js';
import NumberAtom from '../../../../shred/js/model/NumberAtom.js';
import ShredConstants from '../../../../shred/js/ShredConstants.js';
import Panel, { PanelOptions } from '../../../../sun/js/Panel.js';
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
  isProtonCountInteractive?: boolean; // If true, the proton count is interactive.
  isMassNumberInteractive?: boolean; // If true, the mass number is interactive.
  isChargeInteractive?: boolean; // If true, the charge is interactive.
  showAtomName?: boolean; // If true, the atom name is shown below the symbol.
  showArrowButtonsProperty?: TReadOnlyProperty<boolean>; // Whether to show the arrow buttons for the number spinners.
};

export type InteractiveSymbolNodeOptions = SelfOptions & WithRequired<PanelOptions, 'tandem'>;

class InteractiveSymbolNode extends Panel {

  public readonly protonCountProperty: NumberProperty;
  public readonly massNumberProperty: NumberProperty;
  public readonly chargeProperty: NumberProperty;

  private options: SelfOptions;

  public constructor( numberAtom: NumberAtom, providedOptions?: InteractiveSymbolNodeOptions ) {

    const options = optionize<InteractiveSymbolNodeOptions, SelfOptions, PanelOptions>()( {
      isProtonCountInteractive: false,
      isMassNumberInteractive: false,
      isChargeInteractive: false,
      showAtomName: true,
      showArrowButtonsProperty: new BooleanProperty( false ),
      fill: null,
      stroke: null
    }, providedOptions );

    const protonCountProperty = new NumberProperty( options.isProtonCountInteractive ? 0 : numberAtom.protonCountProperty.value, {
      tandem: options.tandem.createTandem( 'protonCountProperty' ),
      phetioDocumentation: 'Atomic number entered by the user.',
      numberType: 'Integer',
      phetioReadOnly: true,
      phetioFeatured: true
    } );
    const massNumberProperty = new NumberProperty( options.isMassNumberInteractive ? 0 : numberAtom.massNumberProperty.value, {
      tandem: options.tandem.createTandem( 'massNumberProperty' ),
      phetioDocumentation: 'Mass value entered by the user.',
      numberType: 'Integer',
      phetioReadOnly: true,
      phetioFeatured: true
    } );
    const chargeProperty = new NumberProperty( options.isChargeInteractive ? 0 : numberAtom.chargeProperty.value, {
      tandem: options.tandem.createTandem( 'chargeProperty' ),
      phetioDocumentation: 'Charge value entered by the user.',
      numberType: 'Integer',
      phetioReadOnly: true,
      phetioFeatured: true
    } );

    if ( !options.isProtonCountInteractive ) {
      numberAtom.protonCountProperty.link( protonCount => {
        protonCountProperty.value = protonCount;
      } );
    }
    if ( !options.isMassNumberInteractive ) {
      numberAtom.massNumberProperty.link( massNumber => {
        massNumberProperty.value = massNumber;
      } );
    }
    if ( !options.isChargeInteractive ) {
      numberAtom.chargeProperty.link( charge => {
        chargeProperty.value = charge;
      } );
    }

    // Add the background rectangle, which is also the root node for the other nodes.  This is needed to support the
    // unusual layout of the symbol, numbers, and caption.
    const background = new Rectangle( 0, 0, SYMBOL_BOX_WIDTH, SYMBOL_BOX_HEIGHT, 0, 0, {
      stroke: 'black',
      lineWidth: 2,
      fill: 'white'
    } );

    // Current string properties for the symbol text and element caption
    const currentElementStringProperty = new Property( AtomIdentifier.getName( 0 ), { reentrant: true } );
    const elementDynamicStringProperty = new DynamicProperty( currentElementStringProperty );

    // Add the symbol text.
    const symbolText = new Text( '', {
      font: new PhetFont( 150 ),
      fill: 'black',
      center: new Vector2( SYMBOL_BOX_WIDTH / 2, SYMBOL_BOX_HEIGHT / 2 )
    } );
    background.addChild( symbolText );

    // Add the element caption.
    const elementCaption = new Text( '', {
      font: new PhetFont( 40 ),
      fill: BAAColors.protonColorProperty,
      top: SYMBOL_BOX_HEIGHT + 20,
      centerX: SYMBOL_BOX_WIDTH / 2,
      maxWidth: SYMBOL_BOX_WIDTH,
      visible: options.showAtomName
    } );
    options.showAtomName && background.addChild( elementCaption );

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

    protonCountProperty.link( protonCount => {
      updateElement( protonCount );
    } );

    // So that the interactive and non-interactive numbers are vertically aligned, we need to create a dummy number and
    // look at its height.
    const interactiveNumberCenterYOffset = new Text( '8', { font: NUMBER_FONT } ).height / 2;

    // Add the proton count display, either interactive or not.
    if ( options.isProtonCountInteractive ) {
      background.addChild( new BAANumberSpinner(
        protonCountProperty,
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
      protonCountProperty.link( updateElement );
    }
    else {
      const protonCountDisplay = new Text( new DerivedProperty( [ protonCountProperty ], protons => protons.toString() ), {
        font: NUMBER_FONT,
        fill: BAAColors.protonColorProperty,
        left: NUMBER_INSET,
        bottom: SYMBOL_BOX_HEIGHT - NUMBER_INSET
      } );
      background.addChild( protonCountDisplay );
      updateElement( numberAtom.protonCountProperty.value );
    }

    // Add the mass number display, either interactive or not.
    if ( options.isMassNumberInteractive ) {
      background.addChild( new BAANumberSpinner(
        massNumberProperty,
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
      const massNumberDisplay = new Text( new DerivedProperty( [ massNumberProperty ], massNumber => massNumber.toString() ), {
        font: NUMBER_FONT,
        fill: 'black',
        left: NUMBER_INSET,
        top: NUMBER_INSET
      } );
      background.addChild( massNumberDisplay );
    }

    // Add the charge display, either interactive or not.
    if ( options.isChargeInteractive ) {
      background.addChild( new BAANumberSpinner(
        chargeProperty,
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
        }
      ) );
    }
    else {
      const displayedTextProperty = new Property<string>( '' );
      const chargeDisplay = new Text( displayedTextProperty, {
        font: NUMBER_FONT,
        top: NUMBER_INSET
      } );
      background.addChild( chargeDisplay );

      chargeProperty.link( charge => {
        const chargeSign = charge > 0 ? MathSymbols.PLUS : charge < 0 ? MathSymbols.MINUS : '';
        displayedTextProperty.value = `${Math.abs( charge ).toString()}${chargeSign}`;
        chargeDisplay.fill = ShredConstants.CHARGE_TEXT_COLOR( numberAtom.chargeProperty.value );
        chargeDisplay.right = SYMBOL_BOX_WIDTH - NUMBER_INSET;
      } );
    }


    super( background, options );

    this.options = options;
    this.protonCountProperty = protonCountProperty;
    this.massNumberProperty = massNumberProperty;
    this.chargeProperty = chargeProperty;

    // Updating the element if the element string property changes.
    elementDynamicStringProperty.link( () => {
      updateElement( this.protonCountProperty.value );
    } );
  }

  public reset(): void {
    this.options.isProtonCountInteractive && this.protonCountProperty.reset();
    this.options.isMassNumberInteractive && this.massNumberProperty.reset();
    this.options.isChargeInteractive && this.chargeProperty.reset();
  }
}

buildAnAtom.register( 'InteractiveSymbolNode', InteractiveSymbolNode );

export default InteractiveSymbolNode;