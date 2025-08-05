// Copyright 2025, University of Colorado Boulder

/**
 * Possible types for the challenges in the game.
 *
 * @author John Blanco (PhET Interactive Simulations)
 */

export const ChallengeTypeValues = [
  'counts-to-element',
  'counts-to-charge',
  'counts-to-mass',
  'counts-to-symbol-all',
  'counts-to-symbol-charge',
  'counts-to-symbol-mass-number',
  'schematic-to-element',
  'schematic-to-charge',
  'schematic-to-mass',
  'schematic-to-symbol-all',
  'schematic-to-symbol-charge',
  'schematic-to-symbol-mass-number',
  'schematic-to-symbol-proton-count',
  'symbol-to-counts',
  'symbol-to-schematic'
] as const;
export type ChallengeType = typeof ChallengeTypeValues[number];