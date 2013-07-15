// Copyright 2002-2013, University of Colorado Boulder

/**
 * Problem where the user is presented with a set of counts for protons,
 * neutrons, and electrons, and must find the represented element on a
 * periodic table.
 *
 * @author John Blanco
 */
define( function( require ) {
  'use strict';

  // Imports
  var assert = require( 'ASSERT/assert' )( 'build-an-atom' );
  var BAAGameProblem = require( 'game/model/BAAGameProblem' );
  var CountsToElementProblemView = require( 'game/view/CountsToElementProblemView' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Property = require( 'AXON/Property' );
  var SharedConstants = require( 'common/SharedConstants' );

  /**
   * Main constructor function.
   *
   * @constructor
   */
  function CountsToElementProblem( buildAnAtomGameModel, answerAtom ) {
    BAAGameProblem.call( this, buildAnAtomGameModel, answerAtom );
  }

  // Inherit from base class and define the methods for this object.
  inherit( BAAGameProblem, CountsToElementProblem, {

    // Create the view needed to visual represent this problem.
    createView: function( layoutBounds ) {
      return new CountsToElementProblemView( this, layoutBounds );
    },

    // Override the method for checking the correct answer, since this problem
    // has the additional step of user deciding whether atom is an ion.
    checkAnswer: function( submittedAtom, submittedNeutralOrIon ) {
      assert && assert( this.problemState === 'presentingProblem', 'Unexpected problem state: ' + this.problemState );
      this.numSubmissions++;
      if ( submittedAtom.protonCount === this.answerAtom.protonCount &&
           submittedAtom.neutronCount === this.answerAtom.neutronCount &&
           ( ( submittedNeutralOrIon === 'neutral' && this.answerAtom.charge === 0 ) ||
             ( submittedNeutralOrIon === 'ion' && this.answerAtom.charge !== 0 ) ) ){
        // Answer is correct.
        // Increment the score.
        this.model.score += this.numSubmissions === 1 ? 2 : 1;

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

  return CountsToElementProblem;
} );
