// Copyright 2017-2021, University of Colorado Boulder

/**
 * Possible challenge states.
 *
 * @author John Blanco
 */

import buildAnAtom from '../../buildAnAtom.js';

const BAAChallengeState = {
  PRESENTING_CHALLENGE: 'presentingChallenge',
  CHALLENGE_SOLVED_CORRECTLY: 'challengeSolvedCorrectly',
  PRESENTING_TRY_AGAIN: 'presentingTryAgain',
  ATTEMPTS_EXHAUSTED: 'attemptsExhausted',
  DISPLAYING_CORRECT_ANSWER: 'displayingCorrectAnswer'
};

// verify that enum is immutable, without the runtime penalty in production code
if ( assert ) { Object.freeze( BAAChallengeState ); }

buildAnAtom.register( 'BAAChallengeState', BAAChallengeState );

export default BAAChallengeState;