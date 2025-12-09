// Copyright 2025, University of Colorado Boulder

/**
 * chargeToString is a function that converts a numeric charge to a string representation, always including the sign and
 * putting the sign either before or after the number based on the global preference for charge notation.
 *
 * @author John Blanco (PhET Interactive Simulations)
 */

import MathSymbols from '../../../../scenery-phet/js/MathSymbols.js';
import buildAnAtom from '../../buildAnAtom.js';
import BAAPreferences from '../model/BAAPreferences.js';

const chargeToString = ( charge: number ): string => {
  const sign = charge > 0 ? MathSymbols.PLUS : charge < 0 ? MathSymbols.MINUS : '';
  const absCharge = Math.abs( charge );
  const chargeNotation = BAAPreferences.instance.chargeNotationProperty.value;

  return chargeNotation === 'signFirst' ?
         `${sign}${absCharge}` :
         `${absCharge}${sign}`;
};

export default chargeToString;
buildAnAtom.register( 'chargeToString', chargeToString );