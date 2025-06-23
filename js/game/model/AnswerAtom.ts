// Copyright 2025, University of Colorado Boulder

/**
 * Model of an atom that represents the atom as a set of particle counts as well as the charge.
 * This is used in the game to represent the answer atom that the user is trying to build.
 *
 * @author Agustín Vallejo
 */

import NumberAtom, { NumberAtomOptions } from '../../../../shred/js/model/NumberAtom.js';
import buildAnAtom from '../../buildAnAtom.js';
import { NeutralOrIon } from '../view/ToElementChallengeView.js';

type SelfOptions = {
  neutralOrIon?: NeutralOrIon;
};

type AnswerAtomOptions = SelfOptions & NumberAtomOptions;

export default class AnswerAtom extends NumberAtom {

  public neutralOrIon: NeutralOrIon;

  public constructor( providedOptions: AnswerAtomOptions ) {
    super( providedOptions );

    this.neutralOrIon = providedOptions.neutralOrIon ? providedOptions.neutralOrIon : 'noSelection';
  }

  public override equals( other: AnswerAtom ): boolean {
    if ( this.neutralOrIon !== 'noSelection' ) {
      return super.equals( other ) && this.neutralOrIon === other.neutralOrIon;
    }
    else {
      return super.equals( other );
    }
  }
}

buildAnAtom.register( 'AnswerAtom', AnswerAtom );