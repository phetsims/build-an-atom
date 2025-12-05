// Copyright 2025, University of Colorado Boulder

/**
 * BAAPreferences is the model for sim-specific preferences, accessed via the Preferences dialog. Preferences are
 * implemented as a singleton. They are global to the sim and potentially affect all screens.
 *
 * @author John Blanco (PhET Interactive Simulations)
 */

import StringUnionProperty from '../../../../axon/js/StringUnionProperty.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import buildAnAtom from '../../buildAnAtom.js';
import BAAQueryParameters from '../BAAQueryParameters.js';
import { ChargeNotation, ChargeNotationValues } from './ChargeNotation.js';

export default class BAAPreferences {

  // Convention used for displaying charge, either with the sign on the left or right, see
  // https://github.com/phetsims/build-an-atom/issues/434.
  public readonly chargeNotationProperty: StringUnionProperty<ChargeNotation>;

  // singleton instance
  public static readonly instance = new BAAPreferences();

  // Private because this is a singleton, accessed via BAAPreferences.instance.
  private constructor() {

    this.chargeNotationProperty = new StringUnionProperty<ChargeNotation>(
      BAAQueryParameters.chargeNotation as ChargeNotation,
      {
        validValues: ChargeNotationValues,
        tandem: Tandem.PREFERENCES.createTandem( 'chargeNotation' ),
        phetioDocumentation: 'Whether to display charge of atoms with sign on left or right.',
        phetioFeatured: true
      }
    );
  }
}

buildAnAtom.register( 'BAAPreferences', BAAPreferences );