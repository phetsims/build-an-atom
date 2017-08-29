// Copyright 2013-2015, University of Colorado Boulder

/**
 * Base class (or base type) for the challenges used in the Build an Atom game.
 * The general approach is that an atom is presented in some way to the user,
 * and the user must submit a correct guess about the atom's configuration.
 *
 * @author John Blanco
 */
define( function( require ) {
  'use strict';

  // modules
  var BAAChallengeState = require( 'BUILD_AN_ATOM/game/model/BAAChallengeState' );
  var BAASharedConstants = require( 'BUILD_AN_ATOM/common/BAASharedConstants' );
  var buildAnAtom = require( 'BUILD_AN_ATOM/buildAnAtom' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Property = require( 'AXON/Property' );

  /**
   * @param {BAAGameModel} buildAnAtomGameModel
   * @param {NumberAtom} answerAtom
   * @constructor
   */
  function BAAGameChallenge( buildAnAtomGameModel, answerAtom ) {
    this.challengeStateProperty  = new Property( BAAChallengeState.PRESENTING_CHALLENGE );
    //this.answerAtomProperty = new Property( answerAtom ); TODO Regression testing on this
    this.numSubmissionsProperty =new Property( 0 );
    this.scoreProperty =  new Property( 0 );

    this.answerAtom = answerAtom;
    this.model = buildAnAtomGameModel;
  }

  buildAnAtom.register( 'BAAGameChallenge', BAAGameChallenge );
  // Inherit from base class and define the methods for this object.
  return inherit( Object, BAAGameChallenge, {

    //------------------------------------------------------------------------
    // The following functions comprise the API used by the challenge view to
    // send user events to the challenge.
    //------------------------------------------------------------------------

    /**
     * Process the answer submitted by the user.  This is the most basic check, and more elaborate ways of verifying
     * can be implemented in sub-classes.
     * @param submittedAtom
     * @public
     */
    checkAnswer: function( submittedAtom ) {
      // Verify that the current state is as expected.
      assert && assert(
        this.challengeStateProperty.get() === BAAChallengeState.PRESENTING_CHALLENGE,
        'Unexpected challenge state: ' + this.challengeStateProperty.get()
      );

      this.numSubmissionsProperty.set( this.numSubmissionsProperty.get() + 1 );
      var pointsIfCorrect = this.numSubmissionsProperty.get() === 1 ? 2 : 1;
      var isCorrect = this.answerAtom.equals( submittedAtom );

      this.model.emitCheckAnswer( isCorrect, pointsIfCorrect, this.answerAtom, submittedAtom, {
        correctElectronCount: this.answerAtom.electronCountProperty.get(),
        submittedElectronCount: submittedAtom.electronCountProperty.get()
      } );

      if ( isCorrect ) {

        // Correct answer.  Update the score.
        this.scoreProperty.set( pointsIfCorrect );
        this.model.scoreProperty.set(  this.model.scoreProperty.get() + this.scoreProperty.get() );

        // Move to the next state.
        this.challengeStateProperty.set( BAAChallengeState.CHALLENGE_SOLVED_CORRECTLY );
      }
      else {

        // Handle incorrect answer.
        if ( this.numSubmissionsProperty.get() < BAASharedConstants.MAX_CHALLENGE_ATTEMPTS ) {

          // Give the user another chance.
          this.challengeStateProperty.set( BAAChallengeState.PRESENTING_TRY_AGAIN );
        }
        else {

          // User has exhausted their attempts.
          this.challengeStateProperty.set( BAAChallengeState.ATTEMPTS_EXHAUSTED );
        }
      }
    },

    // public - allow the user to try again to correctly answer the question
    tryAgain: function() {
      this.challengeStateProperty.set( BAAChallengeState.PRESENTING_CHALLENGE );
    },

    // @public - advance to the next question or finish the level
    next: function() {
      // This event is basically handled by the model, which will remove this
      // challenge and do whatever should happen next.
      this.model.next();
    },

    // @public - display the correct answer to the user
    displayCorrectAnswer: function() {
      this.challengeStateProperty.set( BAAChallengeState.DISPLAYING_CORRECT_ANSWER );
    }
  } );
} );
