// Copyright 2002-2013, University of Colorado Boulder

/**
 * Base class (or base type) for the problems used in the Build an Atom game.
 * The general approach is that an atom is presented in some way to the user,
 * and the user must submit a correct guess about the atom's configuration.
 *
 * @author John Blanco
 */
define( function( require ) {
  'use strict';

  // Imports
  var PropertySet = require( 'AXON/PropertySet' );
  var inherit = require( 'PHET_CORE/inherit' );
  var SharedConstants = require( 'common/SharedConstants' );

  /**
   * Main constructor function.
   *
   * @constructor
   */
  function BAAGameProblem( buildAnAtomGameModel, answerAtom ) {
    PropertySet.call( this,
      {
        problemState: 'presentingProblem',
        answerAtom: answerAtom,
        numSubmissions: 0,
        score: 0
      } );
    this.answerAtom = answerAtom;
    this.model = buildAnAtomGameModel;
  }

  // Inherit from base class and define the methods for this object.
  inherit( PropertySet, BAAGameProblem, {

    //------------------------------------------------------------------------
    // The following functions comprise the API used by the problem view to
    // send user events to the problem.
    //------------------------------------------------------------------------

    // Process answer submitted by the user.  This is the most basic check,
    // and more elaborate ways of verifying can be implemented in sub-classes.
    checkAnswer: function( submittedAtom ) {

      // Verify that the current state is as expected.
      assert && assert( this.problemState === 'presentingProblem', 'Unexpected problem state: ' + this.problemState );

      this.numSubmissions++;
      if ( this.answerAtom.equals( submittedAtom ) ) {

        // Correct answer.  Update the score.
        this.score = this.numSubmissions === 1 ? 2 : 1;
        this.model.score += this.score;

        // Move to the next state.
        this.problemState = 'problemSolvedCorrectly';
      }
      else {

        // Handle incorrect answer.
        if ( this.numSubmissions < SharedConstants.MAX_PROBLEM_ATTEMPTS ) {

          // Give the user another chance.
          this.problemState = 'presentingTryAgain';
        }
        else {

          // User has exhausted their attempts.
          this.problemState = 'attemptsExhausted';
        }
      }
    },

    // The user has pressed the "Try Again" button.
    tryAgain: function() {
      this.problemState = 'presentingProblem';
    },

    // The user has pressed the 'Next' button.
    next: function() {
      // This event is basically handled by the model, which will remove this
      // problem and do whatever should happen next.
      this.model.next();
    },

    // The user has exhausted attempts and has pressed the "Display Correct
    // Answer" button.
    displayCorrectAnswer: function() {
      this.problemState = 'displayingCorrectAnswer';
    }
  } );

  return BAAGameProblem;
} );
