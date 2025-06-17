// Copyright 2025, University of Colorado Boulder

/**
 * Type that generates a list of challenges for use in a sub-game.
 *
 * @author John Blanco
 * @author Sam Reid (PhET Interactive Simulations)
 */

import dotRandom from '../../../../dot/js/dotRandom.js';
import NumberAtom from '../../../../shred/js/model/NumberAtom.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import buildAnAtom from '../../buildAnAtom.js';
import AtomValuePool from './AtomValuePool.js';
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
import ToElementChallenge from './ToElementChallenge.js';

const MAX_PROTON_NUMBER_FOR_SCHEMATIC_PROBS = 3;

// TODO: Could this improve the challenge creation code? https://github.com/phetsims/build-an-atom/issues/257
// const CHALLENGE_TO_CLASS_MAP = new Map<string, IntentionalAny>( [
//   [ 'counts-to-element', CountsToElementChallenge ],
//   [ 'counts-to-charge', CountsToChargeChallenge ],
//   [ 'counts-to-mass', CountsToMassNumberChallenge ],
//   [ 'counts-to-symbol-all', CountsToSymbolChallenge ],
//   [ 'counts-to-symbol-charge', CountsToSymbolChallenge ],
//   [ 'counts-to-symbol-mass', CountsToSymbolChallenge ],
//   [ 'counts-to-symbol-proton-count', CountsToSymbolChallenge ],
//   [ 'schematic-to-element', SchematicToElementChallenge ],
//   [ 'schematic-to-charge', SchematicToChargeChallenge ],
//   [ 'schematic-to-mass', SchematicToMassNumberChallenge ],
//   [ 'schematic-to-symbol-all', SchematicToSymbolChallenge ],
//   [ 'schematic-to-symbol-charge', SchematicToSymbolChallenge ],
//   [ 'schematic-to-symbol-mass-number', SchematicToSymbolChallenge ],
//   [ 'schematic-to-symbol-proton-count', SchematicToSymbolChallenge ],
//   [ 'symbol-to-counts', SymbolToCountsChallenge ],
//   [ 'symbol-to-schematic', SymbolToSchematicChallenge ]
// ] );

export default class ChallengeSetFactory {
  private static previousChallengeType: string | null = null;
  private static availableChallengeTypes: string[] = [];

  public static generate(
    level: number,
    numChallenges: number,
    model: GameModel,
    allowedChallengeTypesByLevel: string[][],
    tandem: Tandem
  ): ToElementChallenge[] {
    const challenges: ToElementChallenge[] = [];
    const atomValuePool = new AtomValuePool( level );

    for ( let i = 0; i < numChallenges; i++ ) {
      const challenge = this.generateChallenge( level, atomValuePool, model, allowedChallengeTypesByLevel, tandem );
      if ( challenge ) {
        challenges.push( challenge );
      }
    }

    return challenges;
  }

  private static generateChallenge(
    level: number,
    availableAtomValues: AtomValuePool,
    model: GameModel,
    allowedChallengeTypesByLevel: string[][],
    tandem: Tandem
  ): ToElementChallenge {
    if ( this.availableChallengeTypes.length === 0 ) {
      this.availableChallengeTypes = [ ...allowedChallengeTypesByLevel[ level ] ];
    }

    let index = Math.floor( dotRandom.nextDouble() * this.availableChallengeTypes.length );
    if (
      this.previousChallengeType !== null &&
      this.availableChallengeTypes[ index ] === this.previousChallengeType
    ) {
      index = ( index + 1 ) % this.availableChallengeTypes.length;
    }

    const challengeType = this.availableChallengeTypes[ index ];
    this.previousChallengeType = challengeType;
    this.availableChallengeTypes.splice( index, 1 );

    let minProtonCount = 0;
    let maxProtonCount = Number.POSITIVE_INFINITY;
    let requireCharged = false;

    if ( this.isSchematicProbType( challengeType ) ) {
      maxProtonCount = MAX_PROTON_NUMBER_FOR_SCHEMATIC_PROBS;
    }
    else {
      minProtonCount = MAX_PROTON_NUMBER_FOR_SCHEMATIC_PROBS + 1;
    }

    if ( this.isChargeProbType( challengeType ) ) {
      requireCharged = dotRandom.nextBoolean();
    }

    const atomValue = availableAtomValues.getRandomAtomValue( minProtonCount, maxProtonCount, requireCharged );
    availableAtomValues.markAtomAsUsed( atomValue );

    return this.createChallenge( model, challengeType, atomValue, tandem );
  }

  public static createChallenge( model: GameModel, type: string, atomValue: NumberAtom, tandem: Tandem ): ToElementChallenge {
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

  private static isSchematicProbType( type: string ): boolean {
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

  private static isChargeProbType( type: string ): boolean {
    return [
      'schematic-to-charge',
      'counts-to-charge',
      'counts-to-symbol-charge',
      'schematic-to-symbol-charge'
    ].includes( type );
  }
}

buildAnAtom.register( 'ChallengeSetFactory', ChallengeSetFactory );