// Copyright 2013-2015, University of Colorado Boulder

/**
 * Base class (or base type) for the problems used in the Build an Atom game.
 * The general approach is that an atom is presented in some way to the user,
 * and the user must submit a correct guess about the atom's configuration.
 *
 * @author John Blanco
 */
define( function( require ) {
  'use strict';

  // modules
  var buildAnAtom = require( 'BUILD_AN_ATOM/buildAnAtom' );
  var PropertySet = require( 'AXON/PropertySet' );
  var inherit = require( 'PHET_CORE/inherit' );
  var ShredConstants = require( 'SHRED/ShredConstants' );

  /**
   * @param {BAAGameModel} buildAnAtomGameModel
   * @param {NumberAtom} answerAtom
   * @constructor
   */
  function BAAGameProblem( buildAnAtomGameModel, answerAtom ) {
    PropertySet.call( this, {
      problemState: 'presentingProblem',
      answerAtom: answerAtom,
      numSubmissions: 0,
      score: 0
    } );
    this.answerAtom = answerAtom;
    this.model = buildAnAtomGameModel;
  }

  buildAnAtom.register( 'BAAGameProblem', BAAGameProblem );
  // Inherit from base class and define the methods for this object.
  return inherit( PropertySet, BAAGameProblem, {

    //------------------------------------------------------------------------
    // The following functions comprise the API used by the problem view to
    // send user events to the problem.
    //------------------------------------------------------------------------

    /**
     * Process the answer submitted by the user.  This is the most basic check, and more elaborate ways of verifying
     * can be implemented in sub-classes.
     * @param submittedAtom
     * @public
     */
    checkAnswer: function( submittedAtom ) {

      // Verify that the current state is as expected.
      assert && assert( this.problemState === 'presentingProblem', 'Unexpected problem state: ' + this.problemState );

      this.numSubmissions++;
      var pointsIfCorrect = this.numSubmissions === 1 ? 2 : 1;
      var isCorrect = this.answerAtom.equals( submittedAtom );

      this.model.emitCheckAnswer( isCorrect, pointsIfCorrect, this.answerAtom, submittedAtom, {
        correctElectronCount: this.answerAtom.electronCount,
        submittedElectronCount: submittedAtom.electronCount
      } );

      if ( isCorrect ) {

        // Correct answer.  Update the score.
        this.score = pointsIfCorrect;
        this.model.score += this.score;

        // Move to the next state.
        this.problemState = 'problemSolvedCorrectly';
      }
      else {

        // Handle incorrect answer.
        if ( this.numSubmissions < ShredConstants.MAX_PROBLEM_ATTEMPTS ) {

          // Give the user another chance.
          this.problemState = 'presentingTryAgain';
        }
        else {

          // User has exhausted their attempts.
          this.problemState = 'attemptsExhausted';
        }
      }
    },

    // public - allow the user to try again to correctly answer the question
    tryAgain: function() {
      this.problemState = 'presentingProblem';
    },

    // @public - advance to the next question or finish the level
    next: function() {
      // This event is basically handled by the model, which will remove this
      // problem and do whatever should happen next.
      this.model.next();
    },

    // @public - display the correct answer to the user
    displayCorrectAnswer: function() {
      this.problemState = 'displayingCorrectAnswer';
    }
  } );
} );
