// Copyright 2025, University of Colorado Boulder

/**
 * Type that generates a list of challenges for use in a sub-game.
 *
 * @author John Blanco
 * @author Sam Reid (PhET Interactive Simulations)
 */

import Tandem from '../../../../tandem/js/Tandem.js';
import buildAnAtom from '../../buildAnAtom.js';
import { ChallengeType } from '../../common/BAAConstants.js';
import AnswerAtom from './AnswerAtom.js';
import AtomValuePool from './AtomValuePool.js';
import BAAGameChallenge from './BAAGameChallenge.js';
import CountsToChargeChallenge from './CountsToChargeChallenge.js';
import CountsToElementChallenge from './CountsToElementChallenge.js';
import CountsToMassNumberChallenge from './CountsToMassNumberChallenge.js';
import CountsToSymbolChallenge from './CountsToSymbolChallenge.js';
import GameModel from './GameModel.js';
import SchematicToChargeChallenge from './SchematicToChargeChallenge.js';
import SchematicToElementChallenge from './SchematicToElementChallenge.js';
import SchematicToMassNumberChallenge from './SchematicToMassNumberChallenge.js';
import SchematicToSymbolChallenge from './SchematicToSymbolChallenge.js';
import SymbolToCountsChallenge from './SymbolToCountsChallenge.js';
import SymbolToSchematicChallenge from './SymbolToSchematicChallenge.js';

const MAX_PROTON_NUMBER_FOR_SCHEMATIC_PROBS = 3;

const LEVEL_CHALLENGE_NAMES: ChallengeType[][] = [
  [ 'schematic-to-element', 'counts-to-element' ],
  [ 'counts-to-charge', 'counts-to-mass', 'schematic-to-charge', 'schematic-to-mass' ],
  [ 'schematic-to-symbol-charge', 'schematic-to-symbol-mass-number', 'schematic-to-symbol-proton-count', 'counts-to-symbol-charge', 'counts-to-symbol-mass' ],
  [ 'schematic-to-symbol-all', 'symbol-to-schematic', 'symbol-to-counts', 'counts-to-symbol-all' ]
];

export default class ChallengeSetFactory {

  /**
   * For a given Game Level, create a set of challenges.
   */
  public static createChallengeSet( level: number, model: GameModel, tandem: Tandem ): BAAGameChallenge[] {

    const validChallengeNames = LEVEL_CHALLENGE_NAMES[ level ];
    const atomValuePool = new AtomValuePool( level );
    const challenges: BAAGameChallenge[] = [];

    for ( let i = 0; i < GameModel.CHALLENGES_PER_LEVEL; i++ ) {
      const challenge = this.chooseRandomAvailableChallenge(
        model,
        validChallengeNames,
        atomValuePool,
        tandem
      );
      if ( challenge ) {
        challenges.push( challenge );
      }
    }

    return challenges;
  }

  private static chooseRandomAvailableChallenge(
    model: GameModel,
    validChallenges: ChallengeType[],
    availableAtomValues: AtomValuePool,
    tandem: Tandem
  ): BAAGameChallenge {

    const random = model.random;

    // TODO: This probably is bad for checking repetition, will come back later https://github.com/phetsims/build-an-atom/issues/257
    const index = Math.floor( random.nextDouble() * validChallenges.length );
    const challengeType = validChallenges[ index ];

    let minProtonCount = 0;
    let maxProtonCount = Number.POSITIVE_INFINITY;
    let requireCharged = false;

    if ( this.isSchematicRelatedChallenge( challengeType ) ) {
      maxProtonCount = MAX_PROTON_NUMBER_FOR_SCHEMATIC_PROBS;
    }
    else {
      minProtonCount = MAX_PROTON_NUMBER_FOR_SCHEMATIC_PROBS + 1;
    }

    if ( this.isChargeRelatedChallenge( challengeType ) ) {
      requireCharged = random.nextBoolean();
    }

    const atomValue = availableAtomValues.getRandomAtomValue( random, minProtonCount, maxProtonCount, requireCharged );
    availableAtomValues.markAtomAsUsed( atomValue );

    return this.createChallenge( model, challengeType, atomValue as AnswerAtom, tandem );
  }

  public static createChallenge(
    model: GameModel,
    type: string,
    atomValue: AnswerAtom,
    tandem: Tandem
  ): BAAGameChallenge {
    // TODO: Tandem? https://github.com/phetsims/build-an-atom/issues/257
    // tandem = tandem.createTandem( CHALLENGE_TANDEMS.get( type )! );
    tandem = Tandem.OPT_OUT;
    switch( type ) {
      case 'counts-to-element':
        return new CountsToElementChallenge( model, atomValue, type, tandem );
      case 'counts-to-charge':
        return new CountsToChargeChallenge( model, atomValue, type, tandem );
      case 'counts-to-mass':
        return new CountsToMassNumberChallenge( model, atomValue, type, tandem );
      case 'counts-to-symbol-all':
        return new CountsToSymbolChallenge( model, atomValue, type, tandem, true, true, true );
      case 'counts-to-symbol-charge':
        return new CountsToSymbolChallenge( model, atomValue, type, tandem, false, false, true );
      case 'counts-to-symbol-mass':
        return new CountsToSymbolChallenge( model, atomValue, type, tandem, false, true, false );
      case 'counts-to-symbol-proton-count':
        return new CountsToSymbolChallenge( model, atomValue, type, tandem, true, false, false );
      case 'schematic-to-element':
        return new SchematicToElementChallenge( model, atomValue, type, tandem );
      case 'schematic-to-charge':
        return new SchematicToChargeChallenge( model, atomValue, type, tandem );
      case 'schematic-to-mass':
        return new SchematicToMassNumberChallenge( model, atomValue, type, tandem );
      case 'schematic-to-symbol-all':
        return new SchematicToSymbolChallenge( model, atomValue, type, tandem, true, true, true );
      case 'schematic-to-symbol-charge':
        return new SchematicToSymbolChallenge( model, atomValue, type, tandem, false, false, true );
      case 'schematic-to-symbol-mass-number':
        return new SchematicToSymbolChallenge( model, atomValue, type, tandem, false, true, false );
      case 'schematic-to-symbol-proton-count':
        return new SchematicToSymbolChallenge( model, atomValue, type, tandem, true, false, false );
      case 'symbol-to-counts':
        return new SymbolToCountsChallenge( model, atomValue, type, tandem );
      case 'symbol-to-schematic':
        return new SymbolToSchematicChallenge( model, atomValue, type, tandem );
      default:
        throw new Error( `Unknown challenge type: ${type}` );
    }
  }

  private static isSchematicRelatedChallenge( type: ChallengeType ): boolean {
    return [
      'schematic-to-element',
      'schematic-to-charge',
      'schematic-to-mass',
      'schematic-to-symbol-all',
      'schematic-to-symbol-proton-count',
      'schematic-to-symbol-charge',
      'schematic-to-symbol-mass-number',
      'symbol-to-schematic'
    ].includes( type );
  }

  private static isChargeRelatedChallenge( type: ChallengeType ): boolean {
    return [
      'schematic-to-charge',
      'counts-to-charge',
      'counts-to-symbol-charge',
      'schematic-to-symbol-charge'
    ].includes( type );
  }
}

buildAnAtom.register( 'ChallengeSetFactory', ChallengeSetFactory );