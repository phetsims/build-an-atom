// Copyright 2017-2025, University of Colorado Boulder

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

import Bounds2 from '../../../../dot/js/Bounds2.js';
import { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import NumberAtom from '../../../../shred/js/model/NumberAtom.js';
import PhetioObject, { PhetioObjectOptions } from '../../../../tandem/js/PhetioObject.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import buildAnAtom from '../../buildAnAtom.js';
import ChallengeView from '../view/ChallengeView.js';
import { ChallengeResult } from './GameModel.js';

type SelfOptions = EmptySelfOptions;

type BAAGameStateOptions = SelfOptions & PhetioObjectOptions;

class BAAGameState extends PhetioObject {

  public name: string;

  // static instance of game states
  public static readonly CHOOSING_LEVEL = new BAAGameState( 'choosingLevel' );
  public static readonly LEVEL_COMPLETED = new BAAGameState( 'levelCompleted' );

  // public static readonly BAAGameStateIO = new IOType( 'BAAGameStateIO', {
  //   valueType: BAAGameState,
  //   documentation: 'A state for the game',
  //   toStateObject: ( baaGameState: BAAGameState ) => {
  //     if ( baaGameState instanceof BAAGameChallenge ) {
  //       // TODO: Are these 'as never' castings correct?  https://github.com/phetsims/build-an-atom/issues/241
  //       return BAAGameChallenge.BAAGameChallengeIO.toStateObject( baaGameState as never );
  //     }
  //     else {
  //       return { name: baaGameState.name };
  //     }
  //   },
  //   fromStateObject: stateObject => {
  //     if ( stateObject.name === 'choosingLevel' ) {
  //       return BAAGameState.CHOOSING_LEVEL;
  //     }
  //     else if ( stateObject.name === 'levelCompleted' ) {
  //       return BAAGameState.LEVEL_COMPLETED;
  //     }
  //     else if ( stateObject.name === 'challenge' ) {
  //       return BAAGameChallenge.BAAGameChallengeIO.fromStateObject( stateObject as never );
  //     }
  //     else {
  //       throw new Error( `unknown game state: ${stateObject.name}` );
  //     }
  //   }
  // } );

  public constructor( name: string, options?: BAAGameStateOptions ) {
    super( options );
    this.name = name;
  }

  //-----------------------------------------------------------------------------------------------------------------
  // The following functions comprise the API used by the challenge view to send user events to the challenge.
  //-----------------------------------------------------------------------------------------------------------------

  /**
   * update score and state based on whether the user submitted a correct or incorrect answer
   */
  public handleEvaluatedAnswer( submittedAtom: NumberAtom, isCorrect: boolean, emitMessageOptions?: ChallengeResult ): void {
    throw new Error( 'handleEvaluatedAnswer should never be called in base class' );
  }

  /**
   * Process the answer submitted by the user.  This is the most basic check, and more elaborate ways of verifying
   * can be implemented in sub-classes.
   */
  public checkAnswer( submittedAtom: NumberAtom ): void {
    throw new Error( 'checkAnswer should never be called in base class' );
  }

  /**
   * allow the user to try again to correctly answer the question
   */
  public tryAgain(): void {
    throw new Error( 'tryAgain should never be called in base class' );
  }

  /**
   * advance to the next question or finish the level
   */
  public next(): void {
    throw new Error( 'next should never be called in base class' );
  }

  /**
   * display the correct answer to the user
   */
  public displayCorrectAnswer(): void {
    throw new Error( 'displayCorrectAnswer should never be called in base class' );
  }

  /**
   * step the challenge in time, override in any states/challenges that have time-dependent behavior
   */
  public step( dt: number ): void {
    // stubbed in base class
  }

  public createView( layoutBounds: Bounds2, tandem: Tandem ): ChallengeView {
    throw new Error( 'createView should never be called in base class' );
  }

  public disposeState(): void {
    this.dispose();
  }
}

buildAnAtom.register( 'BAAGameState', BAAGameState );

export default BAAGameState;