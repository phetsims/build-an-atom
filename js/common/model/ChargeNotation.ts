// Copyright 2025, University of Colorado Boulder

/**
 * ChargeNotation enumerates the preference for displaying the charge, either with the sign on the left or on the right.
 *
 * @author John Blanco (PhET Interactive Simulations)
 */

export const ChargeNotationValues = [
  'signFirst', // e.g. +3
  'signLast'  // e.g. 3+
] as const;
export type ChargeNotation = ( typeof ChargeNotationValues )[number];