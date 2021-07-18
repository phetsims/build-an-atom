// Copyright 2017-2021, University of Colorado Boulder

/**
 * Type that generates a list of challenges for use in a sub-game.
 *
 * @author John Blanco
 * @author Sam Reid (PhET Interactive Simulations)
 */

import dotRandom from '../../../../dot/js/dotRandom.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import buildAnAtom from '../../buildAnAtom.js';
import AtomValuePool from './AtomValuePool.js';
import CountsToChargeChallenge from './CountsToChargeChallenge.js';
import CountsToElementChallenge from './CountsToElementChallenge.js';
import CountsToMassNumberChallenge from './CountsToMassNumberChallenge.js';
import CountsToSymbolChallenge from './CountsToSymbolChallenge.js';
import SchematicToChargeChallenge from './SchematicToChargeChallenge.js';
import SchematicToElementChallenge from './SchematicToElementChallenge.js';
import SchematicToMassNumberChallenge from './SchematicToMassNumberChallenge.js';
import SchematicToSymbolChallenge from './SchematicToSymbolChallenge.js';
import SymbolToCountsChallenge from './SymbolToCountsChallenge.js';
import SymbolToSchematicChallenge from './SymbolToSchematicChallenge.js';

// constants
const MAX_PROTON_NUMBER_FOR_SCHEMATIC_PROBS = 3; // Disallow schematic (Bohr model) probs above this size.

// No constructor, not meant to be instantiated.
const ChallengeSetFactory = {};

/**
 * Generate a challenge set based on the specified criteria.
 *
 * @param {number} level
 * @param {number} numChallenges
 * @param {GameModel} model
 * @param {string[][]} allowedChallengeTypesByLevel
 * @param {Tandem} tandem
 */
ChallengeSetFactory.generate = function( level, numChallenges, model, allowedChallengeTypesByLevel, tandem ) {
  this.challenges = [];
  this._previousChallengeType = null;
  this._availableChallengeTypes = [];

  // Create a pool of all atom values that can be used to create challenges
  // for the challenge set.
  const atomValueList = new AtomValuePool( level );

  // Now add challenges to the challenge set based on the atom values and the
  // challenge types associated with this level.
  for ( let i = 0; i < numChallenges; i++ ) {
    const challenge = this._generateChallenge( level, atomValueList, model, allowedChallengeTypesByLevel, Tandem.OPT_OUT );
    if ( challenge !== null ) {
      this.challenges.push( challenge );
    }
  }

  return this.challenges;
};

/**
 * Generate a single challenge given the level and a pool of atom values that
 * can be used for the challenge.
 *
 * @param {number} level
 * @param {AtomValuePool} availableAtomValues
 * @param {GameModel} model
 * @param {String[][]} allowedChallengeTypesByLevel
 * @param {Tandem} tandem
 * @return
 */
ChallengeSetFactory._generateChallenge = function( level, availableAtomValues, model, allowedChallengeTypesByLevel, tandem ) {

  if ( this._availableChallengeTypes.length === 0 ) {
    // Reload the list of available challenges with all possible challenge
    // types for the current level.
    this._availableChallengeTypes = allowedChallengeTypesByLevel[ level ].slice();
  }

  // Randomly pick a challenge type, but make sure that it isn't the same
  // as the previous challenge type.
  let index = Math.floor( dotRandom.nextDouble() * ( this._availableChallengeTypes.length ) );
  if ( this._previousChallengeType !== null && this._availableChallengeTypes.get( index ) === this._previousChallengeType ) {
    // This is the same as the previous prob type, so choose a different one.
    index = ( index + 1 ) % this._availableChallengeTypes.length;
  }
  const challengeType = this._availableChallengeTypes[ index ];
  this.previousChallengeType = challengeType;

  // Remove the chosen type from the list.  By doing this, we present
  // the user with all different challenge types before starting again.
  this._availableChallengeTypes = _.without( this._availableChallengeTypes, challengeType );

  // Pick an atom value from the list of those remaining.  This is where
  // constraints between challenge types and atom values are handled.
  let minProtonCount = 0;
  let maxProtonCount = Number.POSITIVE_INFINITY;
  let requireCharged = false;
  if ( this._isSchematicProbType( challengeType ) ) {
    maxProtonCount = MAX_PROTON_NUMBER_FOR_SCHEMATIC_PROBS;
  }
  else {
    minProtonCount = MAX_PROTON_NUMBER_FOR_SCHEMATIC_PROBS + 1;
  }
  if ( this._isChargeProbType( challengeType ) ) {

    // If the challenge is asking about the charge, at least 50% of the
    // time we want a charged atom.
    requireCharged = dotRandom.nextBoolean();
  }
  const atomValue = availableAtomValues.getRandomAtomValue( minProtonCount, maxProtonCount, requireCharged );
  availableAtomValues.markAtomAsUsed( atomValue );
  return this.createChallenge( model, challengeType, atomValue, tandem );
};

/**
 * Create a single challenge given a challenge type (e.g. Schematic to Element) and an atom value that defines that
 * atom configuration.
 *
 * @param {GameModel} model
 * @param {string} challengeType // TODO: change to enum
 * @param {NumberAtom} atomValue
 * @param {Tandem} tandem
 * @returns {BAAGameChallenge}
 * @public
 */
ChallengeSetFactory.createChallenge = ( model, challengeType, atomValue, tandem ) => {
  let challenge = null;
  switch( challengeType ) {
    case 'counts-to-element':
      challenge = new CountsToElementChallenge( model, atomValue, challengeType, tandem );
      break;
    case 'counts-to-charge':
      challenge = new CountsToChargeChallenge( model, atomValue, challengeType, tandem );
      break;
    case 'counts-to-mass':
      challenge = new CountsToMassNumberChallenge( model, atomValue, challengeType, tandem );
      break;
    case 'counts-to-symbol-all':
      challenge = new CountsToSymbolChallenge( model, atomValue, challengeType, tandem, true, true, true );
      break;
    case 'counts-to-symbol-charge':
      challenge = new CountsToSymbolChallenge( model, atomValue, challengeType, tandem, false, false, true );
      break;
    case 'counts-to-symbol-mass':
      challenge = new CountsToSymbolChallenge( model, atomValue, challengeType, tandem, false, true, false );
      break;
    case 'counts-to-symbol-proton-count':
      challenge = new CountsToSymbolChallenge( model, atomValue, challengeType, tandem, true, false, false );
      break;
    case 'schematic-to-element':
      challenge = new SchematicToElementChallenge( model, atomValue, challengeType, tandem );
      break;
    case 'schematic-to-charge':
      challenge = new SchematicToChargeChallenge( model, atomValue, challengeType, tandem );
      break;
    case 'schematic-to-mass':
      challenge = new SchematicToMassNumberChallenge( model, atomValue, challengeType, tandem );
      break;
    case 'schematic-to-symbol-all':
      challenge = new SchematicToSymbolChallenge( model, atomValue, challengeType, tandem, true, true, true );
      break;
    case 'schematic-to-symbol-charge':
      challenge = new SchematicToSymbolChallenge( model, atomValue, challengeType, tandem, false, false, true );
      break;
    case 'schematic-to-symbol-mass-number':
      challenge = new SchematicToSymbolChallenge( model, atomValue, challengeType, tandem, false, true, false );
      break;
    case 'schematic-to-symbol-proton-count':
      challenge = new SchematicToSymbolChallenge( model, atomValue, challengeType, tandem, true, false, false );
      break;
    case 'symbol-to-counts':
      challenge = new SymbolToCountsChallenge( model, atomValue, challengeType, tandem );
      break;
    case 'symbol-to-schematic':
      challenge = new SymbolToSchematicChallenge( model, atomValue, challengeType, tandem );
      break;
    default:
      throw new Error( `Error: Request to create unknown challenge type, type = ${challengeType}` );
  }
  return challenge;
};

/**
 * Helper function to determine whether a given challenge type has a
 * schematic atom representation on either either side of the challenge.
 *
 * @param challengeType
 * @return
 */
ChallengeSetFactory._isSchematicProbType = challengeType => challengeType === 'schematic-to-element' ||
                                                            challengeType === 'schematic-to-charge' ||
                                                            challengeType === 'schematic-to-mass' ||
                                                            challengeType === 'schematic-to-symbol-all' ||
                                                            challengeType === 'schematic-to-symbol-proton-count' ||
                                                            challengeType === 'schematic-to-symbol-charge' ||
                                                            challengeType === 'schematic-to-symbol-mass-number' ||
                                                            challengeType === 'symbol-to-schematic';

/**
 * Helper function to determine whether a given challenge is requesting an
 * answer about an atom's charge on the right side of the challenge.
 *
 * @param challengeType
 * @return
 */
ChallengeSetFactory._isChargeProbType = challengeType => challengeType === 'schematic-to-charge' ||
                                                         challengeType === 'counts-to-charge' ||
                                                         challengeType === 'counts-to-symbol-charge' ||
                                                         challengeType === 'schematic-to-symbol-charge';

buildAnAtom.register( 'ChallengeSetFactory', ChallengeSetFactory );
export default ChallengeSetFactory;