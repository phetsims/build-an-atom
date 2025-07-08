// Copyright 2017-2025, University of Colorado Boulder

/**
 * constants shared between one or more files
 *
 * @author John Blanco
 */

import BooleanProperty from '../../../axon/js/BooleanProperty.js';
import Random from '../../../dot/js/Random.js';
import buildAnAtom from '../buildAnAtom.js';

const VALID_CHALLENGES = [
  'counts-to-element',
  'counts-to-charge',
  'counts-to-mass',
  'counts-to-symbol-all',
  'counts-to-symbol-charge',
  'counts-to-symbol-mass',
  'counts-to-symbol-proton-count',
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

export const RANDOM = new Random( {
  seed: 1 // Seed will be changed by the GameMode.
} );

export type ChallengeType = typeof VALID_CHALLENGES[number];

const BAAConstants = {
  RESET_BUTTON_RADIUS: 20,
  MAX_CHALLENGE_ATTEMPTS: 2, // Note: Attempt is the same as a submission in BAAGameChallenge.
  VALID_CHALLENGES: VALID_CHALLENGES,
  ALWAYS_TRUE_PROPERTY: new BooleanProperty( true ),
  ALWAYS_FALSE_PROPERTY: new BooleanProperty( false )
};

BAAConstants.ALWAYS_TRUE_PROPERTY.lazyLink( () => assert && assert( false, 'this value should not be changed' ) );
BAAConstants.ALWAYS_FALSE_PROPERTY.lazyLink( () => assert && assert( false, 'this value should not be changed' ) );

buildAnAtom.register( 'BAAConstants', BAAConstants );

export default BAAConstants;