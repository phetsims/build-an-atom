// Copyright 2013-2025, University of Colorado Boulder

/**
 * Helper type for managing the list of atom values that can be used for
 * creating game challenges.  The two main pieces of functionality added by
 * this class is that it removes items from the enclosed list automatically,
 * and it keeps track of what we removed in case it ends up being needed
 * again.
 *
 * @author John Blanco
 */

import Random from '../../../../dot/js/Random.js';
import NumberAtom from '../../../../shred/js/model/NumberAtom.js';
import buildAnAtom from '../../buildAnAtom.js';

// Challenge pools for creating game challenges, extracted from the design doc.
// These define the configuration for each of the challenges that can be used
// in a challenge set for a given sub-game.
const CHALLENGE_POOLS: NumberAtom[][] = [
  [
    new NumberAtom( { protonCount: 1, neutronCount: 0, electronCount: 0 } ),
    new NumberAtom( { protonCount: 1, neutronCount: 0, electronCount: 1 } ),
    new NumberAtom( { protonCount: 1, neutronCount: 0, electronCount: 2 } ),
    new NumberAtom( { protonCount: 1, neutronCount: 1, electronCount: 0 } ),
    new NumberAtom( { protonCount: 1, neutronCount: 1, electronCount: 1 } ),
    new NumberAtom( { protonCount: 1, neutronCount: 1, electronCount: 2 } ),
    new NumberAtom( { protonCount: 2, neutronCount: 1, electronCount: 2 } ),
    new NumberAtom( { protonCount: 2, neutronCount: 2, electronCount: 2 } ),
    new NumberAtom( { protonCount: 3, neutronCount: 3, electronCount: 2 } ),
    new NumberAtom( { protonCount: 3, neutronCount: 3, electronCount: 3 } ),
    new NumberAtom( { protonCount: 3, neutronCount: 4, electronCount: 2 } ),
    new NumberAtom( { protonCount: 3, neutronCount: 4, electronCount: 3 } ),
    new NumberAtom( { protonCount: 4, neutronCount: 5, electronCount: 4 } ),
    new NumberAtom( { protonCount: 5, neutronCount: 5, electronCount: 5 } ),
    new NumberAtom( { protonCount: 5, neutronCount: 6, electronCount: 5 } ),
    new NumberAtom( { protonCount: 6, neutronCount: 6, electronCount: 6 } ),
    new NumberAtom( { protonCount: 6, neutronCount: 7, electronCount: 6 } ),
    new NumberAtom( { protonCount: 7, neutronCount: 7, electronCount: 7 } ),
    new NumberAtom( { protonCount: 7, neutronCount: 7, electronCount: 10 } ),
    new NumberAtom( { protonCount: 7, neutronCount: 8, electronCount: 7 } ),
    new NumberAtom( { protonCount: 7, neutronCount: 8, electronCount: 10 } ),
    new NumberAtom( { protonCount: 8, neutronCount: 8, electronCount: 8 } ),
    new NumberAtom( { protonCount: 8, neutronCount: 8, electronCount: 10 } ),
    new NumberAtom( { protonCount: 8, neutronCount: 9, electronCount: 8 } ),
    new NumberAtom( { protonCount: 8, neutronCount: 9, electronCount: 10 } ),
    new NumberAtom( { protonCount: 8, neutronCount: 10, electronCount: 8 } ),
    new NumberAtom( { protonCount: 8, neutronCount: 10, electronCount: 10 } ),
    new NumberAtom( { protonCount: 9, neutronCount: 10, electronCount: 9 } ),
    new NumberAtom( { protonCount: 9, neutronCount: 10, electronCount: 10 } ),
    new NumberAtom( { protonCount: 10, neutronCount: 10, electronCount: 10 } ),
    new NumberAtom( { protonCount: 10, neutronCount: 11, electronCount: 10 } ),
    new NumberAtom( { protonCount: 10, neutronCount: 12, electronCount: 10 } )
  ],
  [
    new NumberAtom( { protonCount: 1, neutronCount: 0, electronCount: 0 } ),
    new NumberAtom( { protonCount: 1, neutronCount: 0, electronCount: 1 } ),
    new NumberAtom( { protonCount: 1, neutronCount: 0, electronCount: 2 } ),
    new NumberAtom( { protonCount: 1, neutronCount: 1, electronCount: 0 } ),
    new NumberAtom( { protonCount: 1, neutronCount: 1, electronCount: 1 } ),
    new NumberAtom( { protonCount: 1, neutronCount: 1, electronCount: 2 } ),
    new NumberAtom( { protonCount: 2, neutronCount: 1, electronCount: 2 } ),
    new NumberAtom( { protonCount: 2, neutronCount: 2, electronCount: 2 } ),
    new NumberAtom( { protonCount: 3, neutronCount: 3, electronCount: 2 } ),
    new NumberAtom( { protonCount: 3, neutronCount: 3, electronCount: 3 } ),
    new NumberAtom( { protonCount: 3, neutronCount: 4, electronCount: 2 } ),
    new NumberAtom( { protonCount: 3, neutronCount: 4, electronCount: 3 } ),
    new NumberAtom( { protonCount: 4, neutronCount: 5, electronCount: 4 } ),
    new NumberAtom( { protonCount: 5, neutronCount: 5, electronCount: 5 } ),
    new NumberAtom( { protonCount: 5, neutronCount: 6, electronCount: 5 } ),
    new NumberAtom( { protonCount: 6, neutronCount: 6, electronCount: 6 } ),
    new NumberAtom( { protonCount: 6, neutronCount: 7, electronCount: 6 } ),
    new NumberAtom( { protonCount: 7, neutronCount: 7, electronCount: 7 } ),
    new NumberAtom( { protonCount: 7, neutronCount: 7, electronCount: 10 } ),
    new NumberAtom( { protonCount: 7, neutronCount: 8, electronCount: 7 } ),
    new NumberAtom( { protonCount: 7, neutronCount: 8, electronCount: 10 } ),
    new NumberAtom( { protonCount: 8, neutronCount: 8, electronCount: 8 } ),
    new NumberAtom( { protonCount: 8, neutronCount: 8, electronCount: 10 } ),
    new NumberAtom( { protonCount: 8, neutronCount: 9, electronCount: 8 } ),
    new NumberAtom( { protonCount: 8, neutronCount: 9, electronCount: 10 } ),
    new NumberAtom( { protonCount: 8, neutronCount: 10, electronCount: 8 } ),
    new NumberAtom( { protonCount: 8, neutronCount: 10, electronCount: 10 } ),
    new NumberAtom( { protonCount: 9, neutronCount: 10, electronCount: 9 } ),
    new NumberAtom( { protonCount: 9, neutronCount: 10, electronCount: 10 } ),
    new NumberAtom( { protonCount: 10, neutronCount: 10, electronCount: 10 } ),
    new NumberAtom( { protonCount: 10, neutronCount: 11, electronCount: 10 } ),
    new NumberAtom( { protonCount: 10, neutronCount: 12, electronCount: 10 } )
  ],
  [
    new NumberAtom( { protonCount: 1, neutronCount: 0, electronCount: 0 } ),
    new NumberAtom( { protonCount: 1, neutronCount: 0, electronCount: 1 } ),
    new NumberAtom( { protonCount: 1, neutronCount: 0, electronCount: 2 } ),
    new NumberAtom( { protonCount: 1, neutronCount: 1, electronCount: 0 } ),
    new NumberAtom( { protonCount: 1, neutronCount: 1, electronCount: 1 } ),
    new NumberAtom( { protonCount: 1, neutronCount: 1, electronCount: 2 } ),
    new NumberAtom( { protonCount: 2, neutronCount: 1, electronCount: 2 } ),
    new NumberAtom( { protonCount: 2, neutronCount: 2, electronCount: 2 } ),
    new NumberAtom( { protonCount: 3, neutronCount: 3, electronCount: 2 } ),
    new NumberAtom( { protonCount: 3, neutronCount: 3, electronCount: 3 } ),
    new NumberAtom( { protonCount: 3, neutronCount: 4, electronCount: 2 } ),
    new NumberAtom( { protonCount: 3, neutronCount: 4, electronCount: 3 } ),
    new NumberAtom( { protonCount: 4, neutronCount: 5, electronCount: 4 } ),
    new NumberAtom( { protonCount: 5, neutronCount: 5, electronCount: 5 } ),
    new NumberAtom( { protonCount: 5, neutronCount: 6, electronCount: 5 } ),
    new NumberAtom( { protonCount: 6, neutronCount: 6, electronCount: 6 } ),
    new NumberAtom( { protonCount: 6, neutronCount: 7, electronCount: 6 } ),
    new NumberAtom( { protonCount: 7, neutronCount: 7, electronCount: 7 } ),
    new NumberAtom( { protonCount: 7, neutronCount: 7, electronCount: 10 } ),
    new NumberAtom( { protonCount: 7, neutronCount: 8, electronCount: 7 } ),
    new NumberAtom( { protonCount: 7, neutronCount: 8, electronCount: 10 } ),
    new NumberAtom( { protonCount: 8, neutronCount: 8, electronCount: 8 } ),
    new NumberAtom( { protonCount: 8, neutronCount: 8, electronCount: 10 } ),
    new NumberAtom( { protonCount: 8, neutronCount: 9, electronCount: 8 } ),
    new NumberAtom( { protonCount: 8, neutronCount: 9, electronCount: 10 } ),
    new NumberAtom( { protonCount: 8, neutronCount: 10, electronCount: 8 } ),
    new NumberAtom( { protonCount: 8, neutronCount: 10, electronCount: 10 } ),
    new NumberAtom( { protonCount: 9, neutronCount: 10, electronCount: 9 } ),
    new NumberAtom( { protonCount: 9, neutronCount: 10, electronCount: 10 } ),
    new NumberAtom( { protonCount: 10, neutronCount: 10, electronCount: 10 } ),
    new NumberAtom( { protonCount: 10, neutronCount: 11, electronCount: 10 } ),
    new NumberAtom( { protonCount: 10, neutronCount: 12, electronCount: 10 } ),
    new NumberAtom( { protonCount: 11, neutronCount: 12, electronCount: 10 } ),
    new NumberAtom( { protonCount: 11, neutronCount: 12, electronCount: 11 } ),
    new NumberAtom( { protonCount: 12, neutronCount: 12, electronCount: 10 } ),
    new NumberAtom( { protonCount: 12, neutronCount: 12, electronCount: 12 } ),
    new NumberAtom( { protonCount: 12, neutronCount: 13, electronCount: 10 } ),
    new NumberAtom( { protonCount: 12, neutronCount: 13, electronCount: 12 } ),
    new NumberAtom( { protonCount: 12, neutronCount: 14, electronCount: 10 } ),
    new NumberAtom( { protonCount: 12, neutronCount: 14, electronCount: 12 } ),
    new NumberAtom( { protonCount: 13, neutronCount: 14, electronCount: 10 } ),
    new NumberAtom( { protonCount: 13, neutronCount: 14, electronCount: 13 } ),
    new NumberAtom( { protonCount: 14, neutronCount: 14, electronCount: 14 } ),
    new NumberAtom( { protonCount: 14, neutronCount: 15, electronCount: 14 } ),
    new NumberAtom( { protonCount: 14, neutronCount: 16, electronCount: 14 } ),
    new NumberAtom( { protonCount: 15, neutronCount: 16, electronCount: 15 } ),
    new NumberAtom( { protonCount: 16, neutronCount: 16, electronCount: 16 } ),
    new NumberAtom( { protonCount: 16, neutronCount: 16, electronCount: 18 } ),
    new NumberAtom( { protonCount: 16, neutronCount: 17, electronCount: 16 } ),
    new NumberAtom( { protonCount: 16, neutronCount: 17, electronCount: 18 } ),
    new NumberAtom( { protonCount: 16, neutronCount: 18, electronCount: 16 } ),
    new NumberAtom( { protonCount: 16, neutronCount: 18, electronCount: 18 } ),
    new NumberAtom( { protonCount: 16, neutronCount: 19, electronCount: 16 } ),
    new NumberAtom( { protonCount: 16, neutronCount: 19, electronCount: 18 } ),
    new NumberAtom( { protonCount: 17, neutronCount: 18, electronCount: 17 } ),
    new NumberAtom( { protonCount: 17, neutronCount: 18, electronCount: 18 } ),
    new NumberAtom( { protonCount: 17, neutronCount: 20, electronCount: 17 } ),
    new NumberAtom( { protonCount: 17, neutronCount: 20, electronCount: 18 } ),
    new NumberAtom( { protonCount: 18, neutronCount: 20, electronCount: 18 } ),
    new NumberAtom( { protonCount: 18, neutronCount: 22, electronCount: 18 } )
  ],
  [
    new NumberAtom( { protonCount: 1, neutronCount: 0, electronCount: 0 } ),
    new NumberAtom( { protonCount: 1, neutronCount: 0, electronCount: 1 } ),
    new NumberAtom( { protonCount: 1, neutronCount: 0, electronCount: 2 } ),
    new NumberAtom( { protonCount: 1, neutronCount: 1, electronCount: 0 } ),
    new NumberAtom( { protonCount: 1, neutronCount: 1, electronCount: 1 } ),
    new NumberAtom( { protonCount: 1, neutronCount: 1, electronCount: 2 } ),
    new NumberAtom( { protonCount: 2, neutronCount: 1, electronCount: 2 } ),
    new NumberAtom( { protonCount: 2, neutronCount: 2, electronCount: 2 } ),
    new NumberAtom( { protonCount: 3, neutronCount: 3, electronCount: 2 } ),
    new NumberAtom( { protonCount: 3, neutronCount: 3, electronCount: 3 } ),
    new NumberAtom( { protonCount: 3, neutronCount: 4, electronCount: 2 } ),
    new NumberAtom( { protonCount: 3, neutronCount: 4, electronCount: 3 } ),
    new NumberAtom( { protonCount: 4, neutronCount: 5, electronCount: 4 } ),
    new NumberAtom( { protonCount: 5, neutronCount: 5, electronCount: 5 } ),
    new NumberAtom( { protonCount: 5, neutronCount: 6, electronCount: 5 } ),
    new NumberAtom( { protonCount: 6, neutronCount: 6, electronCount: 6 } ),
    new NumberAtom( { protonCount: 6, neutronCount: 7, electronCount: 6 } ),
    new NumberAtom( { protonCount: 7, neutronCount: 7, electronCount: 7 } ),
    new NumberAtom( { protonCount: 7, neutronCount: 7, electronCount: 10 } ),
    new NumberAtom( { protonCount: 7, neutronCount: 8, electronCount: 7 } ),
    new NumberAtom( { protonCount: 7, neutronCount: 8, electronCount: 10 } ),
    new NumberAtom( { protonCount: 8, neutronCount: 8, electronCount: 8 } ),
    new NumberAtom( { protonCount: 8, neutronCount: 8, electronCount: 10 } ),
    new NumberAtom( { protonCount: 8, neutronCount: 9, electronCount: 8 } ),
    new NumberAtom( { protonCount: 8, neutronCount: 9, electronCount: 10 } ),
    new NumberAtom( { protonCount: 8, neutronCount: 10, electronCount: 8 } ),
    new NumberAtom( { protonCount: 8, neutronCount: 10, electronCount: 10 } ),
    new NumberAtom( { protonCount: 9, neutronCount: 10, electronCount: 9 } ),
    new NumberAtom( { protonCount: 9, neutronCount: 10, electronCount: 10 } ),
    new NumberAtom( { protonCount: 10, neutronCount: 10, electronCount: 10 } ),
    new NumberAtom( { protonCount: 10, neutronCount: 11, electronCount: 10 } ),
    new NumberAtom( { protonCount: 10, neutronCount: 12, electronCount: 10 } ),
    new NumberAtom( { protonCount: 11, neutronCount: 12, electronCount: 10 } ),
    new NumberAtom( { protonCount: 11, neutronCount: 12, electronCount: 11 } ),
    new NumberAtom( { protonCount: 12, neutronCount: 12, electronCount: 10 } ),
    new NumberAtom( { protonCount: 12, neutronCount: 12, electronCount: 12 } ),
    new NumberAtom( { protonCount: 12, neutronCount: 13, electronCount: 10 } ),
    new NumberAtom( { protonCount: 12, neutronCount: 13, electronCount: 12 } ),
    new NumberAtom( { protonCount: 12, neutronCount: 14, electronCount: 10 } ),
    new NumberAtom( { protonCount: 12, neutronCount: 14, electronCount: 12 } ),
    new NumberAtom( { protonCount: 13, neutronCount: 14, electronCount: 10 } ),
    new NumberAtom( { protonCount: 13, neutronCount: 14, electronCount: 13 } ),
    new NumberAtom( { protonCount: 14, neutronCount: 14, electronCount: 14 } ),
    new NumberAtom( { protonCount: 14, neutronCount: 15, electronCount: 14 } ),
    new NumberAtom( { protonCount: 14, neutronCount: 16, electronCount: 14 } ),
    new NumberAtom( { protonCount: 15, neutronCount: 16, electronCount: 15 } ),
    new NumberAtom( { protonCount: 16, neutronCount: 16, electronCount: 16 } ),
    new NumberAtom( { protonCount: 16, neutronCount: 16, electronCount: 18 } ),
    new NumberAtom( { protonCount: 16, neutronCount: 17, electronCount: 16 } ),
    new NumberAtom( { protonCount: 16, neutronCount: 17, electronCount: 18 } ),
    new NumberAtom( { protonCount: 16, neutronCount: 18, electronCount: 16 } ),
    new NumberAtom( { protonCount: 16, neutronCount: 18, electronCount: 18 } ),
    new NumberAtom( { protonCount: 16, neutronCount: 19, electronCount: 16 } ),
    new NumberAtom( { protonCount: 16, neutronCount: 19, electronCount: 18 } ),
    new NumberAtom( { protonCount: 17, neutronCount: 18, electronCount: 17 } ),
    new NumberAtom( { protonCount: 17, neutronCount: 18, electronCount: 18 } ),
    new NumberAtom( { protonCount: 17, neutronCount: 20, electronCount: 17 } ),
    new NumberAtom( { protonCount: 17, neutronCount: 20, electronCount: 18 } ),
    new NumberAtom( { protonCount: 18, neutronCount: 20, electronCount: 18 } ),
    new NumberAtom( { protonCount: 18, neutronCount: 22, electronCount: 18 } )
  ]
];

export default class AtomValuePool {
  private remainingAtomValues: NumberAtom[];
  private usedAtomValues: NumberAtom[];

  public constructor( level: number ) {
    this.remainingAtomValues = CHALLENGE_POOLS[ level ];
    this.usedAtomValues = [];
  }

  public markAtomAsUsed( atomValueToRemove: NumberAtom ): void {
    const index = this.remainingAtomValues.indexOf( atomValueToRemove );
    if ( index !== -1 ) {
      this.remainingAtomValues = _.without( this.remainingAtomValues, atomValueToRemove );
      this.usedAtomValues.push( atomValueToRemove );
    }
  }

  public getRandomAtomValue( random: Random, minProtonCount: number, maxProtonCount: number, requireCharged: boolean ): NumberAtom {
    const meetsCriteria = ( numberAtom: NumberAtom ): boolean => {
      return numberAtom.protonCountProperty.get() >= minProtonCount &&
             numberAtom.protonCountProperty.get() < maxProtonCount &&
             ( !requireCharged || numberAtom.chargeProperty.get() !== 0 );

    };

    // Make a list of the atoms that meet the criteria.
    const allowableAtomValues: NumberAtom[] = [];
    this.remainingAtomValues.forEach( numberAtom => {
      if ( meetsCriteria( numberAtom ) ) {
        allowableAtomValues.push( numberAtom );
      }
    } );

    if ( allowableAtomValues.length === 0 ) {
      // There were none available on the list of unused atoms, so
      // add them from the list of used atoms instead.
      this.usedAtomValues.forEach( numberAtom => {
        if ( meetsCriteria( numberAtom ) ) {
          allowableAtomValues.push( numberAtom );
        }
      } );
    }


    // Choose a random value from the list.
    let atomValue: NumberAtom;
    if ( allowableAtomValues.length > 0 ) {
      atomValue = allowableAtomValues[ Math.floor( random.nextDouble() * allowableAtomValues.length ) ];
    }
    else {
      throw new Error( 'Error: No atoms found that match the specified criteria' );
    }
    return atomValue;
  }
}

buildAnAtom.register( 'AtomValuePool', AtomValuePool );