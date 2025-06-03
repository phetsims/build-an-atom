// Copyright 2013-2025, University of Colorado Boulder

/**
 * Base type for challenges where the user is presented with some sort of
 * information about an atom and must find the atom on a periodic table,
 * and must also determine whether it is an ion or a neutral atom.
 *
 * @author John Blanco
 */

import NumberAtom from '../../../../shred/js/model/NumberAtom.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import buildAnAtom from '../../buildAnAtom.js';
import BAAChallengeState from './BAAChallengeState.js';
import BAAGameChallenge from './BAAGameChallenge.js';
import GameModel from './GameModel.js';

class ToElementChallenge extends BAAGameChallenge {

  public constructor( buildAnAtomGameModel: GameModel, answerAtom: NumberAtom, challengeType: string, tandem: Tandem ) {
    super( buildAnAtomGameModel, answerAtom, challengeType, tandem );
  }

  /**
   * Override the method for checking the correct answer, since this challenge class has the additional step of user
   * deciding whether atom is an ion.
   */
  public override checkAnswer( submittedAtom: NumberAtom, submittedNeutralOrIon: string ): void {
    assert && assert(
      this.challengeStateProperty.get() === BAAChallengeState.PRESENTING_CHALLENGE,
      `Unexpected challenge state: ${this.challengeStateProperty.get()}`
    );
    const isCorrect = submittedAtom.protonCountProperty.get() === this.answerAtom.protonCountProperty.get() &&
                      submittedAtom.neutronCountProperty.get() === this.answerAtom.neutronCountProperty.get() &&
                      ( ( submittedNeutralOrIon === 'neutral' && this.answerAtom.chargeProperty.get() === 0 ) ||
                        ( submittedNeutralOrIon === 'ion' && this.answerAtom.chargeProperty.get() !== 0 ) );
    this.handleEvaluatedAnswer( submittedAtom, isCorrect, {
      correctCharge: this.answerAtom.chargeProperty.get() === 0 ? 'neutral' : 'ion',
      submittedCharge: submittedNeutralOrIon
    } );
  }
}

buildAnAtom.register( 'ToElementChallenge', ToElementChallenge );

export default ToElementChallenge;