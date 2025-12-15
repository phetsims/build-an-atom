// Copyright 2013-2025, University of Colorado Boulder

/**
 * InteractiveSymbolNode is a Scenery Node that represents an atomic element symbol where each of the numbers on the
 * symbol, i.e. proton count (aka atomic number), mass number, and charge, can potentially be interactive.
 *
 * @author John Blanco (PhET Interactive Simulations)
 */

import BooleanProperty from '../../../../axon/js/BooleanProperty.js';
import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import DerivedStringProperty from '../../../../axon/js/DerivedStringProperty.js';
import Multilink, { UnknownMultilink } from '../../../../axon/js/Multilink.js';
import NumberProperty from '../../../../axon/js/NumberProperty.js';
import Property from '../../../../axon/js/Property.js';
import { TReadOnlyProperty } from '../../../../axon/js/TReadOnlyProperty.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import optionize, { combineOptions } from '../../../../phet-core/js/optionize.js';
import WithRequired from '../../../../phet-core/js/types/WithRequired.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import ParallelDOM from '../../../../scenery/js/accessibility/pdom/ParallelDOM.js';
import AlignBox from '../../../../scenery/js/layout/nodes/AlignBox.js';
import VBox, { VBoxOptions } from '../../../../scenery/js/layout/nodes/VBox.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import Rectangle from '../../../../scenery/js/nodes/Rectangle.js';
import Text from '../../../../scenery/js/nodes/Text.js';
import AtomIdentifier from '../../../../shred/js/AtomIdentifier.js';
import NumberAtom from '../../../../shred/js/model/NumberAtom.js';
import ShredConstants from '../../../../shred/js/ShredConstants.js';
import buildAnAtom from '../../buildAnAtom.js';
import BuildAnAtomFluent from '../../BuildAnAtomFluent.js';
import BAAColors from '../../common/BAAColors.js';
import BAAPreferences from '../../common/model/BAAPreferences.js';
import chargeToString from '../../common/view/chargeToString.js';
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
  private readonly disposeInteractiveSymbolNode: () => void;

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

    const isFullyInteractive = options.isProtonCountInteractive &&
                               options.isMassNumberInteractive &&
                               options.isChargeInteractive;

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

    let updateLocalProtonCountProperty: ( ( value: number ) => void ) | null = null;
    if ( !options.isProtonCountInteractive ) {
      updateLocalProtonCountProperty = protonCount => { protonCountProperty.value = protonCount; };
      numberAtom.protonCountProperty.link( updateLocalProtonCountProperty );
    }
    let updateLocalMassNumberProperty: ( ( value: number ) => void ) | null = null;
    if ( !options.isMassNumberInteractive ) {
      updateLocalMassNumberProperty = massNumber => { massNumberProperty.value = massNumber; };
      numberAtom.massNumberProperty.link( updateLocalMassNumberProperty );
    }
    let updateLocalChargeProperty: ( ( value: number ) => void ) | null = null;
    if ( !options.isChargeInteractive ) {
      updateLocalChargeProperty = charge => { chargeProperty.value = charge; };
      numberAtom.chargeProperty.link( updateLocalChargeProperty );
    }

    const createDynamicHelpText = ( accessibleHelpText: TReadOnlyProperty<string> ) => {
      return new DerivedStringProperty(
        [
          accessibleHelpText,
          options.showArrowButtonsProperty
        ],
        ( helpText: string, showArrows: boolean ) => {

          // Only show help text when the symbol is not fully interactive and arrows are shown.
          return !isFullyInteractive && showArrows ? helpText : '';
        }
      );
    };

    // Add the symbolBox rectangle, which will contain the symbol, proton count, mass number, and charge.
    const symbolBox = new Rectangle( 0, 0, SYMBOL_BOX_WIDTH, SYMBOL_BOX_HEIGHT, 0, 0, {
      stroke: 'black',
      lineWidth: 2,
      fill: 'white',
      tagName: 'div',
      accessibleVisible: true,
      accessibleHelpText: new DerivedStringProperty(
        [
          BuildAnAtomFluent.a11y.gameScreen.components.chemicalSymbol.accessibleHelpTextStringProperty,
          options.showArrowButtonsProperty
        ],
        ( helpText: string, showArrows: boolean ) => {

          // Only show help text when the symbol is fully interactive and arrows are shown.
          return isFullyInteractive && showArrows ? helpText : '';
        }
      ),
      accessibleHelpTextBehavior: ParallelDOM.HELP_TEXT_BEFORE_CONTENT
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

      const elementDynamicStringProperty = AtomIdentifier.createDynamicNameProperty( protonCountProperty );

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
          accessibleName: BuildAnAtomFluent.a11y.gameScreen.components.chemicalSymbol.lowerLeft.accessibleNameStringProperty,
          accessibleHelpText: createDynamicHelpText(
            BuildAnAtomFluent.a11y.gameScreen.components.chemicalSymbol.lowerLeft.accessibleHelpTextStringProperty
          ),
          enabledProperty: options.showArrowButtonsProperty
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
          accessibleName: BuildAnAtomFluent.a11y.gameScreen.components.chemicalSymbol.upperLeft.accessibleNameStringProperty,
          accessibleHelpText: createDynamicHelpText(
            BuildAnAtomFluent.a11y.gameScreen.components.chemicalSymbol.upperLeft.accessibleHelpTextStringProperty
          ),
          enabledProperty: options.showArrowButtonsProperty
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
    let chargeDisplayMultilink: UnknownMultilink | null = null;
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
          accessibleName: BuildAnAtomFluent.a11y.gameScreen.components.chemicalSymbol.upperRight.accessibleNameStringProperty,
          accessibleHelpText: createDynamicHelpText(
            BuildAnAtomFluent.a11y.gameScreen.components.chemicalSymbol.upperRight.accessibleHelpTextStringProperty
          ),
          enabledProperty: options.showArrowButtonsProperty
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

      chargeDisplayMultilink = Multilink.multilink(
        [ chargeProperty, BAAPreferences.instance.chargeNotationProperty ],
        charge => {
          displayedTextProperty.value = chargeToString( charge );
          chargeDisplay.fill = ShredConstants.CHARGE_TEXT_COLOR( numberAtom.chargeProperty.value );
          chargeDisplay.right = SYMBOL_BOX_WIDTH - NUMBER_INSET;
        }
      );
    }

    const descriptionListNode = new GameSymbolAccessibleListNode(
      protonCountProperty,
      massNumberProperty,
      chargeProperty
    );

    super( combineOptions<InteractiveSymbolNodeOptions>( {
      children: [
        descriptionListNode,
        ...contentNodes
      ],
      accessibleHeading: BuildAnAtomFluent.a11y.gameScreen.components.chemicalSymbol.accessibleNameStringProperty,
      accessibleHeadingIncrement: 2
    }, options ) );

    this.options = options;
    this.protonCountProperty = protonCountProperty;
    this.massNumberProperty = massNumberProperty;
    this.chargeProperty = chargeProperty;

    this.disposeInteractiveSymbolNode = () => {
      if ( updateLocalProtonCountProperty ) {
        numberAtom.protonCountProperty.unlink( updateLocalProtonCountProperty );
        updateLocalProtonCountProperty = null;
      }
      if ( updateLocalMassNumberProperty ) {
        numberAtom.massNumberProperty.unlink( updateLocalMassNumberProperty );
        updateLocalMassNumberProperty = null;
      }
      if ( updateLocalChargeProperty ) {
        numberAtom.chargeProperty.unlink( updateLocalChargeProperty );
        updateLocalChargeProperty = null;
      }
      chargeDisplayMultilink?.dispose();
    };
  }

  public reset(): void {
    this.options.isProtonCountInteractive && this.protonCountProperty.reset();
    this.options.isMassNumberInteractive && this.massNumberProperty.reset();
    this.options.isChargeInteractive && this.chargeProperty.reset();
  }

  public override dispose(): void {
    super.dispose();
  }
}

buildAnAtom.register( 'InteractiveSymbolNode', InteractiveSymbolNode );

export default InteractiveSymbolNode;