// Copyright 2013-2021, University of Colorado Boulder

/**
 * Base type for challenges where the user is presented with some sort of
 * information about an atom and must find the atom on a periodic table,
 * and must also determine whether it is an ion or a neutral atom.
 *
 * @author John Blanco
 */

import buildAnAtom from '../../buildAnAtom.js';
import BAAChallengeState from './BAAChallengeState.js';
import BAAGameChallenge from './BAAGameChallenge.js';

class ToElementChallenge extends BAAGameChallenge {

  /**
   * @param {GameModel} buildAnAtomGameModel
   * @param {NumberAtom} answerAtom
   * @param {string} challengeType
   * @param {Tandem} tandem
   */
  constructor( buildAnAtomGameModel, answerAtom, challengeType, tandem ) {
    super( buildAnAtomGameModel, answerAtom, challengeType, tandem );
  }

  /**
   * Override the method for checking the correct answer, since this challenge class has the additional step of user
   * deciding whether atom is an ion.
   * @param {NumberAtom} submittedAtom
   * @param {string} submittedNeutralOrIon
   * @public
   */
  checkAnswer( submittedAtom, submittedNeutralOrIon ) {
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