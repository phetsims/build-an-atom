// Copyright 2025, University of Colorado Boulder

/**
 * Node that allows a user to enter a numerical value using up/down arrow buttons.
 *
 * @author John Blanco (PhET Interactive Simulations)
 */

import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import Property from '../../../../axon/js/Property.js';
import { TReadOnlyProperty } from '../../../../axon/js/TReadOnlyProperty.js';
import Range from '../../../../dot/js/Range.js';
import optionize from '../../../../phet-core/js/optionize.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import TColor from '../../../../scenery/js/util/TColor.js';
import NumberSpinner, { NumberSpinnerOptions } from '../../../../sun/js/NumberSpinner.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import buildAnAtom from '../../buildAnAtom.js';
import BAAConstants from '../../common/BAAConstants.js';
import BAAPreferences from '../../common/model/BAAPreferences.js';

type SelfOptions = {
  showPlusForPositive?: boolean; // Whether to show a plus sign for positive numbers.
  signAfterValueProperty?: TReadOnlyProperty<boolean> | null; // Whether the sign is shown after the value (or before).
  getTextColor?: ( value: number ) => TColor; // Function to determine text color based on value.
  minValue?: number; // Minimum value supported.
  maxValue?: number; // Maximum value supported.
};

export type BAANumberSpinnerOptions = SelfOptions & NumberSpinnerOptions;

class BAANumberSpinner extends NumberSpinner {

  public constructor( numberProperty: Property<number>, tandem: Tandem, providedOptions?: BAANumberSpinnerOptions ) {

    const options = optionize<BAANumberSpinnerOptions, SelfOptions, NumberSpinnerOptions>()( {

      // {boolean} - A flag that controls whether the plus sign is shown for positive numbers.  This is generally `true`
      // when depicting charge, `false` for other things like mass number or atomic number.  Off (false) means that no
      // sign is depicted.
      showPlusForPositive: false,

      // {boolean} - Controls whether the sign (i.e. +/-) is shown before or after the numeric value.  If not provided,
      // one will be created below.
      signAfterValueProperty: null,

      // {function} - A function that can be used to change the color used to depict the value based on the value.
      getTextColor: () => 'black',

      // {number} - min and max supported values
      minValue: Number.NEGATIVE_INFINITY,
      maxValue: Number.POSITIVE_INFINITY,

      tandem: tandem,

      deltaValue: 1,
      touchAreaXDilation: 10,
      touchAreaYDilation: 8,
      mouseAreaXDilation: 10,
      mouseAreaYDilation: 5,
      arrowsPosition: 'bothRight',

      disabledOpacity: 1,

      phetioVisiblePropertyInstrumented: false,
      phetioEnabledPropertyInstrumented: false,
      phetioFeatured: false,
      linkedElementOptions: {
        phetioFeatured: false
      },

      numberDisplayOptions: {
        tandem: Tandem.OPT_OUT,
        decimalPlaces: 0,
        align: 'center',
        xMargin: 10,
        yMargin: 3,
        textOptions: {
          font: new PhetFont( 28 )
        }
      },

      arrowButtonOptions: {
        phetioVisiblePropertyInstrumented: false
      },
      isDisposable: false
    }, providedOptions );

    options.arrowButtonOptions.visibleProperty = options.enabledProperty;

    // If a signAfterValueProperty was not provided, use the global preference.
    const signAfterValueProperty = options.signAfterValueProperty ||
                                   DerivedProperty.valueEqualsConstant(
                                     BAAPreferences.instance.chargeNotationProperty,
                                     'signLast'
                                   );

    const signNumberFormatter = ( value: number ) => {
      return signAfterValueProperty.value ?
             BAAConstants.chargeToStringSignAfterValue( value, options.showPlusForPositive ) :
             BAAConstants.chargeToStringSignBeforeValue( value, options.showPlusForPositive );
    };

    // Set up the options to use the formatter.
    options.numberDisplayOptions.numberFormatter = signNumberFormatter;
    options.numberDisplayOptions.numberFormatterDependencies = [ signAfterValueProperty ];
    options.createAriaValueText = signNumberFormatter;

    super( numberProperty, new Property<Range>( new Range( options.minValue, options.maxValue ) ), options );

    // Update the help text based on whether the spinner is enabled.
    this.enabledProperty.link( enabled => {
      this.accessibleHelpText = enabled ? options.accessibleHelpText : null;
    } );

    numberProperty.link( number => {
      this.setNumberFill( options.getTextColor( number ) );
    } );
  }
}

buildAnAtom.register( 'BAANumberSpinner', BAANumberSpinner );

export default BAANumberSpinner;