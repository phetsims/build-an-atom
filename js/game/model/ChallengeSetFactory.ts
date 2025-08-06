// Copyright 2025, University of Colorado Boulder

/**
 * ChallengeSetFactory is used to generate a list of challenges for use in a game.
 *
 * @author John Blanco
 * @author Sam Reid (PhET Interactive Simulations)
 */

import NumberAtom from '../../../../shred/js/model/NumberAtom.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import buildAnAtom from '../../buildAnAtom.js';
import AnswerAtom from './AnswerAtom.js';
import AtomValuePool from './AtomValuePool.js';
import { ChallengeType } from './ChallengeType.js';
import GameModel from './GameModel.js';

const MAX_PROTON_NUMBER_FOR_SCHEMATIC_PROBS = 3;

//REVIEW https://github.com/phetsims/build-an-atom/issues/315 Document. Is this indexed using levelNumber-1 to find what challenge types that level includes?
const LEVEL_CHALLENGE_NAMES: ChallengeType[][] = [
  [ 'schematic-to-element', 'counts-to-element' ],
  [ 'schematic-to-charge', 'schematic-to-mass-number', 'counts-to-charge', 'counts-to-mass-number' ],
  [ 'schematic-to-symbol-charge', 'schematic-to-symbol-mass-number', 'schematic-to-symbol-proton-count', 'counts-to-symbol-charge', 'counts-to-symbol-mass-number' ],
  [ 'schematic-to-symbol-all', 'symbol-to-schematic', 'symbol-to-counts', 'counts-to-symbol-all' ]
];

export type ChallengeDescriptor = {
  type: ChallengeType;
  atomValue: NumberAtom;
};

export default class ChallengeSetFactory {

  /**
   * For a given Game Level, create a set of challenge descriptors that can be used to obtain and configure the
   * challenges that will be presented to the user.
   */
  public static createChallengeDescriptorSet( level: number, model: GameModel, tandem: Tandem ): ChallengeDescriptor[] {

    // Get a list of the challenge names that are valid for this level.
    const validChallengeNames = LEVEL_CHALLENGE_NAMES[ level ];

    // Create a pool of atom values that can be used to generate challengeDescriptors.  These will be marked as used as
    // they are incorporated into challenge descriptors so that they are not reused in the same level.
    const atomValuePool = new AtomValuePool( level );

    const challengeDescriptors: ChallengeDescriptor[] = [];

    let previousChallengeType: null | ChallengeType = null;

    _.times( GameModel.CHALLENGES_PER_LEVEL, () => {
      const challengeDescriptor = this.getRandomAvailableChallengeDescriptor(
        model,
        validChallengeNames,
        atomValuePool,
        previousChallengeType,
        tandem
      );
      if ( challengeDescriptor ) {
        challengeDescriptors.push( challengeDescriptor );
        previousChallengeType = challengeDescriptor.type;
      }
    } );

    // The process above should create the correct number of challengeDescriptors, but it's possible in some cases that it won't,
    // like if the number of challengeDescriptors per level is very high.  This assertion checks that, and if it is hit during
    // testing we should investigate and fix it.  If this case were hit in the published version, there would just be
    // fewer challengeDescriptors than expected, which isn't great but not a disaster.
    assert && assert(
      challengeDescriptors.length === GameModel.CHALLENGES_PER_LEVEL,
      `expected ${GameModel.CHALLENGES_PER_LEVEL} challenges, but got ${challengeDescriptors.length}`
    );

    return challengeDescriptors;
  }

  /**
   * Chooses a random challenge from the valid challenges for the level, and returns a descriptor for it.
   */
  private static getRandomAvailableChallengeDescriptor(
    model: GameModel,
    validChallengeTypes: ChallengeType[],
    availableAtomValues: AtomValuePool,
    previousChallengeType: null | ChallengeType,

    //REVIEW https://github.com/phetsims/build-an-atom/issues/315 tandem arg is not used. Should it be?
    tandem: Tandem
  ): ChallengeDescriptor {

    const random = model.random;

    let index = Math.floor( random.nextDouble() * validChallengeTypes.length );
    let challengeType: ChallengeType = validChallengeTypes[ index ];
    if (
      previousChallengeType && challengeType === previousChallengeType
    ) {
      // To avoid repeating the same challenge type, we will skip to the next one.
      index = ( index + 1 ) % validChallengeTypes.length;
      challengeType = validChallengeTypes[ index ];
    }

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

    const atomValue = availableAtomValues.getRandomAtomValue( random, minProtonCount, maxProtonCount, requireCharged ) as AnswerAtom;
    availableAtomValues.markAtomAsUsed( atomValue );

    return { type: challengeType, atomValue: atomValue };
  }

  private static isSchematicRelatedChallenge( type: ChallengeType ): boolean {
    return [
      'schematic-to-element',
      'schematic-to-charge',
      'schematic-to-mass-number',
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