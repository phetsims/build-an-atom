// Copyright 2025, University of Colorado Boulder

/**
 * Model of an atom that represents the atom as a set of particle counts as well as the charge.
 * This is used in the game to check between a correct answer and a submitted answer by the user,
 * as well to support the neutral or ion selection.
 *
 * @author Agustín Vallejo
 */

import optionize from '../../../../phet-core/js/optionize.js';
import NumberAtom, { NumberAtomOptions } from '../../../../shred/js/model/NumberAtom.js';
import buildAnAtom from '../../buildAnAtom.js';
import { NeutralOrIon } from '../view/ToElementChallengeView.js';

type SelfOptions = {
  neutralOrIon?: NeutralOrIon;
};

type AnswerAtomOptions = SelfOptions & NumberAtomOptions;

class AnswerAtom extends NumberAtom {

  public neutralOrIon: NeutralOrIon;

  public constructor( providedOptions?: AnswerAtomOptions ) {

    const options = optionize<AnswerAtomOptions, SelfOptions, NumberAtomOptions>()( {
      phetioState: false,
      neutralOrIon: 'noSelection'
    }, providedOptions );

    super( options );

    this.neutralOrIon = options.neutralOrIon;
  }

  //REVIEW https://github.com/phetsims/build-an-atom/issues/315 Document, since this is a bit complicated.
  public override equals( other: NumberAtom | AnswerAtom ): boolean {
    const particleCountsAreEqual = super.equals( other );
    let neutralOrIonIsEqual;
    if ( other instanceof AnswerAtom ) {

      // If both are AnswerAtoms, we can compare the neutralOrIon property directly.
      neutralOrIonIsEqual = this.neutralOrIon === other.neutralOrIon;
    }
    else {
      if ( this.neutralOrIon === 'noSelection' ) {

        // If no selection, we can't call it unequal.
        neutralOrIonIsEqual = true;
      }
      else if ( this.neutralOrIon === 'ion' ) {

        // If this is an ion, the charge of the other atom must be non-zero.
        neutralOrIonIsEqual = other.chargeProperty.value !== 0;
      }
      else {
        assert && assert( this.neutralOrIon === 'neutral', `unexpected value for neutralOrIon: ${this.neutralOrIon}` );
        neutralOrIonIsEqual = other.chargeProperty.value === 0;
      }
    }

   return particleCountsAreEqual && neutralOrIonIsEqual;
  }

  public reset(): void {
    this.protonCountProperty.reset();
    this.neutronCountProperty.reset();
    this.electronCountProperty.reset();
    this.neutralOrIon = 'noSelection';
  }
}

buildAnAtom.register( 'AnswerAtom', AnswerAtom );

export default AnswerAtom;