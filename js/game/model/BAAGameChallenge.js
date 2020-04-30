// Copyright 2013-2020, University of Colorado Boulder

/**
 * Base class (or base type) for the challenges used in the Build an Atom game.
 * The general approach is that an atom is presented in some way to the user,
 * and the user must submit a correct guess about the atom's configuration.
 *
 * @author John Blanco
 */

import Emitter from '../../../../axon/js/Emitter.js';
import NumberProperty from '../../../../axon/js/NumberProperty.js';
import Property from '../../../../axon/js/Property.js';
import PropertyIO from '../../../../axon/js/PropertyIO.js';
import Range from '../../../../dot/js/Range.js';
import inherit from '../../../../phet-core/js/inherit.js';
import StringIO from '../../../../tandem/js/types/StringIO.js';
import buildAnAtom from '../../buildAnAtom.js';
import BAASharedConstants from '../../common/BAASharedConstants.js';
import BAAChallengeState from './BAAChallengeState.js';
import BAAGameChallengeIO from './BAAGameChallengeIO.js';
import BAAGameState from './BAAGameState.js';

/**
 * @param {BAAGameModel} buildAnAtomGameModel
 * @param {NumberAtom} answerAtom
 * @param {string} challengeType
 * @param {Tandem} tandem
 * @constructor
 */
function BAAGameChallenge( buildAnAtomGameModel, answerAtom, challengeType, tandem ) {

  // TODO: Consider either having all the subclasses define a name, or just getting rid of the name altogether.
  BAAGameState.call( this, 'challenge', {
    tandem: tandem,
    phetioState: false,
    phetioType: BAAGameChallengeIO
  } );
  this.challengeStateProperty = new Property( BAAChallengeState.PRESENTING_CHALLENGE, {
    tandem: tandem.createTandem( 'challengeStateProperty' ),
    phetioType: PropertyIO( StringIO ), // TODO why not an Enum?
    phetioReadOnly: true,
    phetioState: false,
    validValues: _.values( BAAChallengeState )
  } );
  this.numSubmissionsProperty = new NumberProperty( 0, {
    tandem: tandem.createTandem( 'numSubmissionsProperty' ),
    range: new Range( 0, BAASharedConstants.MAX_CHALLENGE_ATTEMPTS ),
    phetioReadOnly: true,
    phetioState: false
  } );
  this.answerAtom = answerAtom; // @public (phet-io)
  this.pointValue = 0; // @public (phet-io)
  this.model = buildAnAtomGameModel; // @public (phet-io)
  this.challengeType = challengeType; // @public (phet-io)

  // @public
  this.disposeEmitter = new Emitter();
}

buildAnAtom.register( 'BAAGameChallenge', BAAGameChallenge );

inherit( BAAGameState, BAAGameChallenge, {

  /**
   * @public - release resources when no longer used
   */
  dispose: function() {
    assert && assert( !this.isDisposed, 'only dispose once' );
    this.disposeEmitter.emit();
    this.challengeStateProperty.dispose();
    this.numSubmissionsProperty.dispose();

    BAAGameState.prototype.dispose.call( this );

    // Remove all listeners from the dispose emitter to avoid memory leaks.
    this.disposeEmitter.dispose();

    // make sure disposed flag is set (though it should have been set by the superclass's dispose function)
    this.isDisposed = true;
  },

  /**
   * @override
   */
  handleEvaluatedAnswer: function( submittedAtom, isCorrect, emitMessageOptions ) {

    this.numSubmissionsProperty.set( this.numSubmissionsProperty.get() + 1 );
    const pointsIfCorrect = this.numSubmissionsProperty.get() === 1 ? 2 : 1;
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

    const isCorrect = this.answerAtom.equals( submittedAtom );
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

export default BAAGameChallenge;