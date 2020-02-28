// Copyright 2017-2020, University of Colorado Boulder

/**
 * Base type for Build and Atom game states.  These states use the Object Oriented state pattern, please see
 * https://en.wikipedia.org/wiki/State_pattern.  It is also described in the book "Design Patterns: Elements of Reusable
 * Object-Oriented Software" by Gamma et al.  The basic idea here is that the game challenges act as the state of the
 * game model, and stimuli from the user, such as submitting an answer, are submitted to the states via the API
 * defined below.
 *
 * @author John Blanco
 */

import inherit from '../../../../phet-core/js/inherit.js';
import PhetioObject from '../../../../tandem/js/PhetioObject.js';
import buildAnAtom from '../../buildAnAtom.js';

/**
 * @param {String} name
 * @constructor
 */
function BAAGameState( name, options ) {
  this.name = name;
  PhetioObject.call( this, options );
}

buildAnAtom.register( 'BAAGameState', BAAGameState );

inherit( PhetioObject, BAAGameState, {

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
  handleEvaluatedAnswer: function( submittedAtom, isCorrect, emitMessageOptions ) {
    throw new Error( 'handleEvaluatedAnswer should never be called in base class' );
  },

  /**
   * Process the answer submitted by the user.  This is the most basic check, and more elaborate ways of verifying
   * can be implemented in sub-classes.
   * @param {NumberAtom} submittedAtom
   * @public
   */
  checkAnswer: function( submittedAtom ) {
    throw new Error( 'checkAnswer should never be called in base class' );
  },

  /**
   * allow the user to try again to correctly answer the question
   * @public
   */
  tryAgain: function() {
    throw new Error( 'tryAgain should never be called in base class' );
  },

  /**
   * advance to the next question or finish the level
   * @public
   */
  next: function() {
    throw new Error( 'next should never be called in base class' );
  },

  /**
   * display the correct answer to the user
   * @public
   */
  displayCorrectAnswer: function() {
    throw new Error( 'displayCorrectAnswer should never be called in base class' );
  },

  /**
   * step the challenge in time, override in any states/challenges that have time-dependent behavior
   * @param dt
   */
  step: function( dt ) {
    // stubbed in base class
  },

  dispose: function() {
    PhetioObject.prototype.dispose.call( this );
  }
} );

// static instance of game states
BAAGameState.CHOOSING_LEVEL = new BAAGameState( 'choosingLevel' );
BAAGameState.LEVEL_COMPLETED = new BAAGameState( 'levelCompleted' );

export default BAAGameState;