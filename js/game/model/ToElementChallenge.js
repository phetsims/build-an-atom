// Copyright 2013-2015, University of Colorado Boulder

/**
 * Base type for challenges where the user is presented with some sort of
 * information about an atom and must find the atom on a periodic table,
 * and must also determine whether it is an ion or a neutral atom.
 *
 * @author John Blanco
 */
define( function( require ) {
  'use strict';

  // modules
  var BAAChallengeState = require( 'BUILD_AN_ATOM/game/model/BAAChallengeState' );
  var BAASharedConstants = require( 'BUILD_AN_ATOM/common/BAASharedConstants' );
  var buildAnAtom = require( 'BUILD_AN_ATOM/buildAnAtom' );
  var BAAGameChallenge = require( 'BUILD_AN_ATOM/game/model/BAAGameChallenge' );
  var inherit = require( 'PHET_CORE/inherit' );

  /**
   * @param {BAAGameModel} buildAnAtomGameModel
   * @param {NumberAtom} answerAtom
   * @constructor
   */
  function ToElementChallenge( buildAnAtomGameModel, answerAtom ) {
    BAAGameChallenge.call( this, buildAnAtomGameModel, answerAtom );
  }

  buildAnAtom.register( 'ToElementChallenge', ToElementChallenge );

  // Inherit from base class and define the methods for this object.
  return inherit( BAAGameChallenge, ToElementChallenge, {

    /**
     * Override the method for checking the correct answer, since this challenge class has the additional step of user
     * deciding whether atom is an ion.
     * @param {NumberAtom} submittedAtom
     * @param {string} submittedNeutralOrIon
     * @public
     */
    checkAnswer: function( submittedAtom, submittedNeutralOrIon ) {
      assert && assert(
        this.challengeStateProperty.get() === BAAChallengeState.PRESENTING_CHALLENGE,
        'Unexpected challenge state: ' + this.challengeStateProperty.get()
      );
      this.numSubmissionsProperty.set( this.numSubmissionsProperty.get() + 1 ) ;
      var isCorrect = submittedAtom.protonCountProperty.get() === this.answerAtom.protonCountProperty.get() &&
                      submittedAtom.neutronCountProperty.get() === this.answerAtom.neutronCountProperty.get() &&
                      ( ( submittedNeutralOrIon === 'neutral' && this.answerAtom.chargeProperty.get() === 0 ) ||
                        ( submittedNeutralOrIon === 'ion' && this.answerAtom.chargeProperty.get() !== 0 ) );

      var pointsIfCorrect = this.numSubmissionsProperty.get() === 1 ? 2 : 1;
      this.model.emitCheckAnswer( isCorrect, pointsIfCorrect, this.answerAtom, submittedAtom, {
        correctCharge: this.answerAtom.chargeProperty.get() === 0 ? 'neutral' : 'ion',
        submittedCharge: submittedNeutralOrIon
      } );

      if ( isCorrect ) {
        // Answer is correct. Record the score.
        this.scoreProperty.set( pointsIfCorrect );
        this.model.scoreProperty.set( this.model.scoreProperty.get() + this.scoreProperty.get() );

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
    }
  } );
} );
