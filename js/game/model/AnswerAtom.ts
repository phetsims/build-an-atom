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

export default class AnswerAtom extends NumberAtom {

  public neutralOrIon: NeutralOrIon;

  public constructor( providedOptions?: AnswerAtomOptions ) {

    const options = optionize<AnswerAtomOptions, SelfOptions, NumberAtomOptions>()( {
      phetioState: false,
      neutralOrIon: 'noSelection'
    }, providedOptions );

    super( options );

    this.neutralOrIon = options.neutralOrIon;
  }

  public override equals( other: AnswerAtom ): boolean {
    if ( this.neutralOrIon !== 'noSelection' ) {
      return super.equals( other ) && this.neutralOrIon === other.neutralOrIon;
    }
    else {
      return super.equals( other );
    }
  }

  /**
   * Sets the properties of this AnswerAtom to match the provided AnswerAtom.
   */
  public set( atom: AnswerAtom ): void {
    this.protonCountProperty.set( atom.protonCountProperty.value );
    this.neutronCountProperty.set( atom.neutronCountProperty.value );
    this.electronCountProperty.set( atom.electronCountProperty.value );
  }

  public reset(): void {
    this.protonCountProperty.reset();
    this.neutronCountProperty.reset();
    this.electronCountProperty.reset();
    this.neutralOrIon = 'noSelection';
  }
}

buildAnAtom.register( 'AnswerAtom', AnswerAtom );