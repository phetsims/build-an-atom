// Copyright 2025, University of Colorado Boulder

/**
 * Node that allows a user to enter a numerical value using up/down arrow buttons.
 *
 * @author John Blanco
 */

import Property from '../../../../axon/js/Property.js';
import Range from '../../../../dot/js/Range.js';
import optionize from '../../../../phet-core/js/optionize.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import TColor from '../../../../scenery/js/util/TColor.js';
import NumberSpinner, { NumberSpinnerOptions } from '../../../../sun/js/NumberSpinner.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import buildAnAtom from '../../buildAnAtom.js';
import BAAConstants from '../../common/BAAConstants.js';

type SelfOptions = {
  showPlusForPositive?: boolean; // Whether to show a plus sign for positive numbers.
  signAfterValue?: boolean; // Whether the sign is shown after the value.
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

      // {boolean} - Controls whether the sign (i.e. +/-) is shown before or after the numeric value.  For charge, the
      // sign is generally shown after, which is the most common use case for this, and hence the default.
      signAfterValue: true,

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
      }
    }, providedOptions );

    options.arrowButtonOptions.visibleProperty = options.enabledProperty;

    const signNumberFormatter = ( value: number ) => {
      return options.signAfterValue ?
             BAAConstants.chargeToStringSignAfterValue( value, options.showPlusForPositive ) :
             BAAConstants.chargeToStringSignBeforeValue( value, options.showPlusForPositive );
    };


    // Creating the formatter here in order to use the options
    options.numberDisplayOptions.numberFormatter = signNumberFormatter;
    options.createAriaValueText = signNumberFormatter;

    super( numberProperty, new Property<Range>( new Range( options.minValue, options.maxValue ) ), options );

    // Update the help text based on whether the spinner is enabled
    this.enabledProperty.link( enabled => {
      this.accessibleHelpText = enabled ? options.accessibleHelpText : '';
    } );

    numberProperty.link( number => {
      this.setNumberFill( options.getTextColor( number ) );
    } );
  }
}

buildAnAtom.register( 'BAANumberSpinner', BAANumberSpinner );

export default BAANumberSpinner;