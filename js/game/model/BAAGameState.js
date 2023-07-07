// Copyright 2017-2022, University of Colorado Boulder

/**
 * Base type for Build and Atom game states.  These states use the Object Oriented state pattern, please see
 * https://en.wikipedia.org/wiki/State_pattern.  It is also described in the book "Design Patterns: Elements of Reusable
 * Object-Oriented Software" by Gamma et al.  The basic idea here is that the game challenges act as the state of the
 * game model, and stimuli from the user, such as submitting an answer, are submitted to the states via the API
 * defined below.
 *
 * If your game state needs to be disposed, then implement the disposeState() function, otherwise there will be no cleanup
 * on state change.
 *
 * @author John Blanco
 */

import PhetioObject from '../../../../tandem/js/PhetioObject.js';
import IOType from '../../../../tandem/js/types/IOType.js';
import buildAnAtom from '../../buildAnAtom.js';
import BAAGameChallenge from './BAAGameChallenge.js';

class BAAGameState extends PhetioObject {

  /**
   * @param {String} name
   */
  constructor( name, options ) {
    super( options );
    this.name = name;
  }

  //-----------------------------------------------------------------------------------------------------------------
  // The following functions comprise the API used by the challenge view to send user events to the challenge.
  //-----------------------------------------------------------------------------------------------------------------

  /**
   * update score and state based on whether the user submitted a correct or incorrect answer
   * @param {NumberAtom} submittedAtom
   * @param {boolean} isCorrect
   * @param {Object} emitMessageOptions
   * @public
   */
  handleEvaluatedAnswer( submittedAtom, isCorrect, emitMessageOptions ) {
    throw new Error( 'handleEvaluatedAnswer should never be called in base class' );
  }

  /**
   * Process the answer submitted by the user.  This is the most basic check, and more elaborate ways of verifying
   * can be implemented in sub-classes.
   * @param {NumberAtom} submittedAtom
   * @public
   */
  checkAnswer( submittedAtom ) {
    throw new Error( 'checkAnswer should never be called in base class' );
  }

  /**
   * allow the user to try again to correctly answer the question
   * @public
   */
  tryAgain() {
    throw new Error( 'tryAgain should never be called in base class' );
  }

  /**
   * advance to the next question or finish the level
   * @public
   */
  next() {
    throw new Error( 'next should never be called in base class' );
  }

  /**
   * display the correct answer to the user
   * @public
   */
  displayCorrectAnswer() {
    throw new Error( 'displayCorrectAnswer should never be called in base class' );
  }

  /**
   * step the challenge in time, override in any states/challenges that have time-dependent behavior
   * @param dt
   * @public
   */
  step( dt ) {
    // stubbed in base class
  }
}

buildAnAtom.register( 'BAAGameState', BAAGameState );

// static instance of game states
BAAGameState.CHOOSING_LEVEL = new BAAGameState( 'choosingLevel' );
BAAGameState.LEVEL_COMPLETED = new BAAGameState( 'levelCompleted' );

BAAGameState.BAAGameStateIO = new IOType( 'BAAGameStateIO', {
  valueType: BAAGameState,
  documentation: 'A state for the game',
  toStateObject: baaGameState => {
    if ( baaGameState instanceof phet.buildAnAtom.BAAGameChallenge ) {
      return BAAGameChallenge.BAAGameChallengeIO.toStateObject( baaGameState );
    }
    else {
      return { name: baaGameState.name };
    }
  },
  fromStateObject: stateObject => {
    if ( stateObject.name === 'choosingLevel' ) {
      return BAAGameState.CHOOSING_LEVEL;
    }
    else if ( stateObject.name === 'levelCompleted' ) {
      return BAAGameState.LEVEL_COMPLETED;
    }
    else if ( stateObject.name === 'challenge' ) {
      return BAAGameChallenge.BAAGameChallengeIO.fromStateObject( stateObject );
    }
    else {
      throw new Error( `unknown game state: ${stateObject}` );
    }
  }
} );


export default BAAGameState;