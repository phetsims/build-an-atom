// Copyright 2017, University of Colorado Boulder

/**
 * Possible problem states.
 *
 * @author John Blanco
 */
define( function( require ) {
  'use strict';

  // modules
  var buildAnAtom = require( 'BUILD_AN_ATOM/buildAnAtom' );

  var BAAProblemState = {
    PRESENTING_PROBLEM: 'presentingProblem',
    PROBLEM_SOLVED_CORRECTLY: 'problemSolvedCorrectly',
    PRESENTING_TRY_AGAIN: 'presentingTryAgain',
    ATTEMPTS_EXHAUSTED: 'attemptsExhausted',
    DISPLAYING_CORRECT_ANSWER: 'displayingCorrectAnswer'
  };

  // verify that enum is immutable, without the runtime penalty in production code
  if ( assert ) { Object.freeze( BAAProblemState ); }

  buildAnAtom.register( 'BAAProblemState', BAAProblemState );

  return BAAProblemState;
} );