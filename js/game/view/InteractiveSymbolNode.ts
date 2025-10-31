// Copyright 2013-2025, University of Colorado Boulder

/**
 * InteractiveSymbolNode is a Scenery Node that represents an element symbol where each of the numbers on the symbol,
 * i.e. proton count (aka atomic number), mass number, and charge, can potentially be interactive.
 *
 * @author John Blanco
 */

import BooleanProperty from '../../../../axon/js/BooleanProperty.js';
import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import DerivedStringProperty from '../../../../axon/js/DerivedStringProperty.js';
import DynamicProperty from '../../../../axon/js/DynamicProperty.js';
import NumberProperty from '../../../../axon/js/NumberProperty.js';
import Property from '../../../../axon/js/Property.js';
import { TReadOnlyProperty } from '../../../../axon/js/TReadOnlyProperty.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import optionize, { combineOptions } from '../../../../phet-core/js/optionize.js';
import WithRequired from '../../../../phet-core/js/types/WithRequired.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import AlignBox from '../../../../scenery/js/layout/nodes/AlignBox.js';
import VBox, { VBoxOptions } from '../../../../scenery/js/layout/nodes/VBox.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import Rectangle from '../../../../scenery/js/nodes/Rectangle.js';
import Text from '../../../../scenery/js/nodes/Text.js';
import AtomIdentifier from '../../../../shred/js/AtomIdentifier.js';
import NumberAtom from '../../../../shred/js/model/NumberAtom.js';
import ShredConstants from '../../../../shred/js/ShredConstants.js';
import buildAnAtom from '../../buildAnAtom.js';
import BuildAnAtomStrings from '../../BuildAnAtomStrings.js';
import BAAColors from '../../common/BAAColors.js';
import BAAConstants from '../../common/BAAConstants.js';
import BAANumberSpinner from './BAANumberSpinner.js';
import GameSymbolAccessibleListNode from './description/GameSymbolAccessibleListNode.js';

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

export type InteractiveSymbolNodeOptions = SelfOptions & WithRequired<VBoxOptions, 'tandem'>;

class InteractiveSymbolNode extends VBox {

  public readonly protonCountProperty: NumberProperty;
  public readonly massNumberProperty: NumberProperty;
  public readonly chargeProperty: NumberProperty;

  private options: SelfOptions;

  public constructor( numberAtom: NumberAtom, providedOptions?: InteractiveSymbolNodeOptions ) {

    const options = optionize<InteractiveSymbolNodeOptions, SelfOptions, VBoxOptions>()( {
      isProtonCountInteractive: false,
      isMassNumberInteractive: false,
      isChargeInteractive: false,
      showAtomName: true,
      showArrowButtonsProperty: new BooleanProperty( false ),
      spacing: 10
    }, providedOptions );

    const contentNodes: Node[] = [];

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

    // Add the symbolBox rectangle, which will contain the symbol, proton count, mass number, and charge.
    const symbolBox = new Rectangle( 0, 0, SYMBOL_BOX_WIDTH, SYMBOL_BOX_HEIGHT, 0, 0, {
      stroke: 'black',
      lineWidth: 2,
      fill: 'white'
    } );
    contentNodes.push( symbolBox );

    // Add the chemical symbol, e.g. "He" or "Na".
    const chemicalSymbolStringProperty = new DerivedStringProperty(
      [ protonCountProperty ],
      protonCount => protonCount > 0 ? AtomIdentifier.getSymbol( protonCount ) : ''
    );

    const symbolText = new Text( chemicalSymbolStringProperty, {
      font: new PhetFont( 150 ),
      fill: 'black',
      center: new Vector2( SYMBOL_BOX_WIDTH / 2, SYMBOL_BOX_HEIGHT / 2 )
    } );

    const symbolTextAlignBox = new AlignBox( symbolText, {
      alignBounds: symbolBox.localBounds,
      align: 'center'
    } );
    symbolBox.addChild( symbolTextAlignBox );

    // Add the element caption if the option is enabled.
    if ( options.showAtomName ) {

      // Create a DynamicProperty for the current element string, which will be updated based on the proton count but
      // may also be updated if the locale changes.
      const currentElementStringProperty = new Property( AtomIdentifier.getName( 0 ), { reentrant: true } );
      const elementDynamicStringProperty = new DynamicProperty<string, number, TReadOnlyProperty<string>>( currentElementStringProperty );

      // Update the element name based on the proton count.
      protonCountProperty.link( protonCount => {
        currentElementStringProperty.value = AtomIdentifier.getName( protonCount );
      } );

      const elementCaption = new Text( elementDynamicStringProperty, {
        font: new PhetFont( 40 ),
        fill: BAAColors.protonColorProperty,
        top: SYMBOL_BOX_HEIGHT + 20,
        centerX: SYMBOL_BOX_WIDTH / 2,
        maxWidth: SYMBOL_BOX_WIDTH,
        visible: options.showAtomName
      } );
      contentNodes.push( elementCaption );
    }

    const interactiveNumberCenterYOffset = new Text( '8', { font: NUMBER_FONT } ).height / 2;

    // Add the proton count display, either interactive or not.
    if ( options.isProtonCountInteractive ) {
      symbolBox.addChild( new BAANumberSpinner(
        protonCountProperty,
        options.tandem.createTandem( 'protonCountNumberSpinner' ), {
          minValue: 0,
          maxValue: 99,
          getTextColor: () => BAAColors.protonColorProperty,
          left: NUMBER_ENTRY_NODE_SIDE_INSET,
          centerY: SYMBOL_BOX_HEIGHT - NUMBER_INSET - interactiveNumberCenterYOffset,
          accessibleName: BuildAnAtomStrings.a11y.gameScreen.components.chemicalSymbol.lowerLeft.accessibleNameStringProperty,
          accessibleHelpText: BuildAnAtomStrings.a11y.gameScreen.components.chemicalSymbol.lowerLeft.accessibleHelpTextStringProperty,
          arrowButtonOptions: {
            visibleProperty: options.showArrowButtonsProperty
          }
        }
      ) );
    }
    else {
      const protonCountDisplay = new Text( new DerivedProperty( [ protonCountProperty ], protons => protons.toString() ), {
        font: NUMBER_FONT,
        fill: BAAColors.protonColorProperty,
        left: NUMBER_INSET,
        bottom: SYMBOL_BOX_HEIGHT - NUMBER_INSET
      } );
      symbolBox.addChild( protonCountDisplay );
    }

    // Add the mass number display, either interactive or not.
    if ( options.isMassNumberInteractive ) {
      symbolBox.addChild( new BAANumberSpinner(
        massNumberProperty,
        options.tandem.createTandem( 'massNumberSpinner' ), {
          minValue: 0,
          maxValue: 99,
          left: NUMBER_ENTRY_NODE_SIDE_INSET,
          centerY: NUMBER_INSET + interactiveNumberCenterYOffset,
          accessibleName: BuildAnAtomStrings.a11y.gameScreen.components.chemicalSymbol.upperLeft.accessibleNameStringProperty,
          accessibleHelpText: BuildAnAtomStrings.a11y.gameScreen.components.chemicalSymbol.upperLeft.accessibleHelpTextStringProperty,
          arrowButtonOptions: {
            visibleProperty: options.showArrowButtonsProperty
          }
        }
      ) );
    }
    else {
      const massNumberDisplay = new Text( new DerivedProperty( [ massNumberProperty ], massNumber => massNumber.toString() ), {
        font: NUMBER_FONT,
        fill: 'black',
        left: NUMBER_INSET,
        top: NUMBER_INSET
      } );
      symbolBox.addChild( massNumberDisplay );
    }

    // Add the charge display, either interactive or not.
    if ( options.isChargeInteractive ) {
      symbolBox.addChild( new BAANumberSpinner(
        chargeProperty,
        options.tandem.createTandem( 'chargeNumberSpinner' ), {
          minValue: -99,
          maxValue: 99,
          showPlusForPositive: true,
          right: SYMBOL_BOX_WIDTH - NUMBER_ENTRY_NODE_SIDE_INSET,
          centerY: NUMBER_INSET + interactiveNumberCenterYOffset,
          getTextColor: ShredConstants.CHARGE_TEXT_COLOR,
          accessibleName: BuildAnAtomStrings.a11y.gameScreen.components.chemicalSymbol.upperRight.accessibleNameStringProperty,
          accessibleHelpText: BuildAnAtomStrings.a11y.gameScreen.components.chemicalSymbol.upperRight.accessibleHelpTextStringProperty,
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
      symbolBox.addChild( chargeDisplay );

      chargeProperty.link( charge => {
        displayedTextProperty.value = BAAConstants.chargeToStringSignAfterValue( charge );
        chargeDisplay.fill = ShredConstants.CHARGE_TEXT_COLOR( numberAtom.chargeProperty.value );
        chargeDisplay.right = SYMBOL_BOX_WIDTH - NUMBER_INSET;
      } );
    }

    super( combineOptions<InteractiveSymbolNodeOptions>( {
      children: contentNodes,
      accessibleHeading: BuildAnAtomStrings.a11y.gameScreen.components.chemicalSymbol.accessibleNameStringProperty,
      accessibleHeadingIncrement: 2
    }, options ) );

    this.addChild( new GameSymbolAccessibleListNode(
      protonCountProperty,
      massNumberProperty,
      chargeProperty
    ) );

    this.options = options;
    this.protonCountProperty = protonCountProperty;
    this.massNumberProperty = massNumberProperty;
    this.chargeProperty = chargeProperty;
  }

  public reset(): void {
    this.options.isProtonCountInteractive && this.protonCountProperty.reset();
    this.options.isMassNumberInteractive && this.massNumberProperty.reset();
    this.options.isChargeInteractive && this.chargeProperty.reset();
  }
}

buildAnAtom.register( 'InteractiveSymbolNode', InteractiveSymbolNode );

export default InteractiveSymbolNode;