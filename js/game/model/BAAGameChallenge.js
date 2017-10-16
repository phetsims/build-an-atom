// Copyright 2013-2017, University of Colorado Boulder

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
  var BAAGameState = require( 'BUILD_AN_ATOM/game/model/BAAGameState' );
  var BAASharedConstants = require( 'BUILD_AN_ATOM/common/BAASharedConstants' );
  var buildAnAtom = require( 'BUILD_AN_ATOM/buildAnAtom' );
  var inherit = require( 'PHET_CORE/inherit' );
  var NumberProperty = require( 'AXON/NumberProperty' );
  var Property = require( 'AXON/Property' );
  var Range = require( 'DOT/Range' );
  var TBAAGameChallenge = require( 'BUILD_AN_ATOM/game/model/TBAAGameChallenge' );

  // phet-io modules
  var TNumber = require( 'ifphetio!PHET_IO/types/TNumber' );
  var TString = require( 'ifphetio!PHET_IO/types/TString' );

  /**
   * @param {BAAGameModel} buildAnAtomGameModel
   * @param {NumberAtom} answerAtom
   * @param {string} challengeType
   * @param {Tandem} tandem
   * @constructor
   */
  function BAAGameChallenge( buildAnAtomGameModel, answerAtom, challengeType, tandem ) {
    BAAGameState.call( this, 'challenge' ); // TODO: Consider either having all the subclasses define a name, or just getting rid of the name altogether.
    this.challengeStateProperty = new Property( BAAChallengeState.PRESENTING_CHALLENGE, {
      tandem: tandem.createTandem( 'challengeStateProperty' ),
      phetioValueType: TString, // TODO why not an Enum?
      phetioInstanceDocumentation: 'this Property is read-only, do not attempt to set its value',
      validValues: _.values( BAAChallengeState )
    } );
    this.numSubmissionsProperty = new NumberProperty( 0, {
      tandem: tandem.createTandem( 'numSubmissionsProperty' ),
      phetioValueType: TNumber,
      range: new Range( 0, BAASharedConstants.MAX_CHALLENGE_ATTEMPTS ),
      phetioInstanceDocumentation: 'this Property is read-only, do not attempt to set its value'
    } );
    this.answerAtom = answerAtom; // @public (phet-io)
    this.pointValue = 0; // @public (phet-io)
    this.model = buildAnAtomGameModel; // @public (phet-io)
    this.challengeType = challengeType; // @public (phet-io)

    this.tandem = tandem; // @public (phet-io)
    tandem.addInstance( this, TBAAGameChallenge );
  }

  buildAnAtom.register( 'BAAGameChallenge', BAAGameChallenge );

  return inherit( BAAGameState, BAAGameChallenge, {

    dispose: function() {
      this.challengeStateProperty.dispose();
      this.numSubmissionsProperty.dispose();
      this.tandem.removeInstance( this );
    },

    /**
     * @override
     */
    handleEvaluatedAnswer: function( submittedAtom, isCorrect, emitMessageOptions ) {

      this.numSubmissionsProperty.set( this.numSubmissionsProperty.get() + 1 );
      var pointsIfCorrect = this.numSubmissionsProperty.get() === 1 ? 2 : 1;
      this.pointValue = isCorrect ? pointsIfCorrect : 0;
      this.model.scoreProperty.set( this.model.scoreProperty.get() + this.pointValue );
      this.model.emitCheckAnswer( isCorrect, this.pointValue, this.answerAtom, submittedAtom, emitMessageOptions );

      if ( this.model.provideFeedbackProperty.get() ) {
        if ( isCorrect ) {

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
      else {

        // don't provide any feedback - just go to the next challenge
        this.next();
      }
    },

    /**
     * @override
     */
    checkAnswer: function( submittedAtom ) {

      // Verify that the current state is as expected.
      assert && assert(
        this.challengeStateProperty.get() === BAAChallengeState.PRESENTING_CHALLENGE,
        'Unexpected challenge state: ' + this.challengeStateProperty.get()
      );

      var isCorrect = this.answerAtom.equals( submittedAtom );
      this.handleEvaluatedAnswer( submittedAtom, isCorrect );
    },

    /**
     * @override
     */
    tryAgain: function() {
      this.challengeStateProperty.set( BAAChallengeState.PRESENTING_CHALLENGE );
    },

    /**
     * @override
     */
    next: function() {
      // This event is basically handled by the model, which will remove this challenge and do whatever should happen
      // next.
      this.model.next();
    },

    /**
     * @override
     */
    displayCorrectAnswer: function() {
      this.challengeStateProperty.set( BAAChallengeState.DISPLAYING_CORRECT_ANSWER );
    }
  } );
} );
