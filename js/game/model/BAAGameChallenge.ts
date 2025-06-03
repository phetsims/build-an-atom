// Copyright 2013-2025, University of Colorado Boulder

/**
 * Base class (or base type) for the challenges used in the Build an Atom game.
 * The general approach is that an atom is presented in some way to the user,
 * and the user must submit a correct guess about the atom's configuration.
 *
 * @author John Blanco
 */

import NumberProperty from '../../../../axon/js/NumberProperty.js';
import StringProperty from '../../../../axon/js/StringProperty.js';
import Range from '../../../../dot/js/Range.js';
import IntentionalAny from '../../../../phet-core/js/types/IntentionalAny.js';
import NumberAtom from '../../../../shred/js/model/NumberAtom.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import IOType from '../../../../tandem/js/types/IOType.js';
import buildAnAtom from '../../buildAnAtom.js';
import BAASharedConstants from '../../common/BAASharedConstants.js';
import BAAChallengeState from './BAAChallengeState.js';
import BAAGameState from './BAAGameState.js';
import GameModel from './GameModel.js';

class BAAGameChallenge extends BAAGameState {

  public readonly challengeStateProperty: StringProperty;
  public readonly numSubmissionsProperty: NumberProperty;
  public readonly answerAtom: NumberAtom;
  public pointValue: number;
  public readonly model: GameModel;
  public readonly challengeType: string;

  public static readonly BAAGameChallengeIO = new IOType( 'BAAGameChallengeIO', {
    valueType: BAAGameChallenge,
    documentation: 'A challenge for the Game',
    toStateObject: ( baaGameChallenge: BAAGameChallenge ) => ( {
      pointValue: baaGameChallenge.pointValue,
      answerAtom: NumberAtom.NumberAtomIO.toStateObject( baaGameChallenge.answerAtom ),
      modelPhetioID: baaGameChallenge.model.tandem.phetioID,
      challengeType: baaGameChallenge.challengeType,
      phetioID: baaGameChallenge.tandem.phetioID,
      name: baaGameChallenge.name
    } ),
    fromStateObject: stateObject => {
      const phetioEngine = phet.phetio.phetioEngine;

      // This may have been deserialized from the instance itself or from the array it was contained in (which
      // is instrumented as ArrayIO), so check to see if it is already deserialized before deserializing.
      //TODO https://github.com/phetsims/build-an-atom/issues/240 Is there a better way to do this, or at least factor it out?
      const instance = phetioEngine.hasPhetioObject( stateObject.phetioID );
      if ( instance ) {
        return phetioEngine.getPhetioElement( stateObject.phetioID );
      }

      const model = phetioEngine.getPhetioElement( stateObject.modelPhetioID );

      const answerAtom = new phet.shred.NumberAtom( {
        protonCount: stateObject.answerAtom.protonCount,
        neutronCount: stateObject.answerAtom.neutronCount,
        electronCount: stateObject.answerAtom.electronCount
      } );
      const tandem = new phet.tandem.Tandem( stateObject.phetioID );

      return phet.buildAnAtom.ChallengeSetFactory.createChallenge( model, stateObject.challengeType, answerAtom, tandem );
    }
  } );


  public constructor( buildAnAtomGameModel: GameModel, answerAtom: NumberAtom, challengeType: string, tandem: Tandem ) {

    //TODO https://github.com/phetsims/build-an-atom/issues/240 Consider either having all the subclasses define a name, or just getting rid of the name altogether.
    super( 'challenge', {
      tandem: tandem,
      phetioState: false,
      phetioType: BAAGameChallenge.BAAGameChallengeIO
    } );

    //TODO https://github.com/phetsims/build-an-atom/issues/240 why not an Enum?
    this.challengeStateProperty = new StringProperty( BAAChallengeState.PRESENTING_CHALLENGE, {
      tandem: tandem.createTandem( 'challengeStateProperty' ),
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
    this.answerAtom = answerAtom;
    this.pointValue = 0;
    this.model = buildAnAtomGameModel;
    this.challengeType = challengeType;
  }

  public override dispose(): void {
    this.challengeStateProperty.dispose();
    this.numSubmissionsProperty.dispose();

    super.dispose();
  }

  public disposeState(): void {
    this.dispose();
  }

  /**
   * // TODO: What's the actual type of emitMessageOptions?  https://github.com/phetsims/build-an-atom/issues/241
   */
  public override handleEvaluatedAnswer( submittedAtom: NumberAtom, isCorrect: boolean, emitMessageOptions?: IntentionalAny ): void {

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
  }

  public override checkAnswer( submittedAtom: NumberAtom, submittedNeutralOrIon = '' ): void {

    // Verify that the current state is as expected.
    assert && assert(
      this.challengeStateProperty.get() === BAAChallengeState.PRESENTING_CHALLENGE,
      `Unexpected challenge state: ${this.challengeStateProperty.get()}`
    );

    const isCorrect = this.answerAtom.equals( submittedAtom );
    this.handleEvaluatedAnswer( submittedAtom, isCorrect );
  }

  public override tryAgain(): void {
    this.challengeStateProperty.set( BAAChallengeState.PRESENTING_CHALLENGE );
  }

  public override next(): void {
    // This event is basically handled by the model, which will remove this challenge and do whatever should happen
    // next.
    this.model.next();
  }

  public override displayCorrectAnswer(): void {
    this.challengeStateProperty.set( BAAChallengeState.DISPLAYING_CORRECT_ANSWER );
  }
}

buildAnAtom.register( 'BAAGameChallenge', BAAGameChallenge );

export default BAAGameChallenge;