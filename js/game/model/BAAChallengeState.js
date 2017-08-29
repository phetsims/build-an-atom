// Copyright 2017, University of Colorado Boulder

/**
 * Possible challenge states.
 *
 * @author John Blanco
 */
define( function( require ) {
  'use strict';

  // modules
  var buildAnAtom = require( 'BUILD_AN_ATOM/buildAnAtom' );

  var BAAChallengeState = {
    PRESENTING_CHALLENGE: 'presentingChallenge',
    CHALLENGE_SOLVED_CORRECTLY: 'challengeSolvedCorrectly',
    PRESENTING_TRY_AGAIN: 'presentingTryAgain',
    ATTEMPTS_EXHAUSTED: 'attemptsExhausted',
    DISPLAYING_CORRECT_ANSWER: 'displayingCorrectAnswer'
  };

  // verify that enum is immutable, without the runtime penalty in production code
  if ( assert ) { Object.freeze( BAAChallengeState ); }

  buildAnAtom.register( 'BAAChallengeState', BAAChallengeState );

  return BAAChallengeState;
} );