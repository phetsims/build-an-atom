// Copyright 2013-2015, University of Colorado Boulder

/**
 * Base type for problems where the user is presented with some sort of
 * information about an atom and must find the atom on a periodic table,
 * and must also determine whether it is an ion or a neutral atom.
 *
 * @author John Blanco
 */
define( function( require ) {
  'use strict';

  // modules
  var BAAGameProblem = require( 'BUILD_AN_ATOM/game/model/BAAGameProblem' );
  var inherit = require( 'PHET_CORE/inherit' );
  var SharedConstants = require( 'SHRED/SharedConstants' );

  /**
   * Main constructor function.
   *
   * @constructor
   */
  function ToElementProblem( buildAnAtomGameModel, answerAtom ) {
    BAAGameProblem.call( this, buildAnAtomGameModel, answerAtom );
  }

  // Inherit from base class and define the methods for this object.
  return inherit( BAAGameProblem, ToElementProblem, {

    // Override the method for checking the correct answer, since this problem
    // class has the additional step of user deciding whether atom is an ion.
    checkAnswer: function( submittedAtom, submittedNeutralOrIon ) {
      assert && assert( this.problemState === 'presentingProblem', 'Unexpected problem state: ' + this.problemState );
      this.numSubmissions++;
      if ( submittedAtom.protonCount === this.answerAtom.protonCount &&
           submittedAtom.neutronCount === this.answerAtom.neutronCount &&
           ( ( submittedNeutralOrIon === 'neutral' && this.answerAtom.charge === 0 ) ||
             ( submittedNeutralOrIon === 'ion' && this.answerAtom.charge !== 0 ) ) ) {
        // Answer is correct. Record the score.
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
    }
  } );
} );
