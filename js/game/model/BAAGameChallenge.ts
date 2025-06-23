// Copyright 2013-2025, University of Colorado Boulder

/**
 * Base class (or base type) for the challenges used in the Build an Atom game.
 * The general approach is that an atom is presented in some way to the user,
 * and the user must submit a correct guess about the atom's configuration.
 *
 * @author John Blanco
 */

import BooleanProperty from '../../../../axon/js/BooleanProperty.js';
import Property from '../../../../axon/js/Property.js';
import StringProperty from '../../../../axon/js/StringProperty.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import buildAnAtom from '../../buildAnAtom.js';
import AnswerAtom from './AnswerAtom.js';
import BAAChallengeState from './BAAChallengeState.js';
import BAAGameState from './BAAGameState.js';
import GameModel from './GameModel.js';

class BAAGameChallenge extends BAAGameState {

  public readonly model: GameModel;

  // Correct answer atom for this challenge, which the user is trying to guess.
  public readonly answerAtom: AnswerAtom;

  // The atom that the user submitted as their answer, or null if they haven't submitted an answer yet.
  public submittedAtom: AnswerAtom | null = null;

  // Derived property that indicates whether the submitted atom is correct.
  public isCorrectAtomProperty: Property<boolean>;

  // Property that tracks the state of the challenge, such as whether it is presenting the challenge,
  public readonly challengeStateProperty: Property<string>;
  public readonly challengeType: string;

  public configurableProtonCount = false;
  public configurableMassNumber = false;
  public configurableCharge = false;

  // The number of points that this challenge is worth, which is used to calculate the score.
  public pointValue = 0;

  public constructor( buildAnAtomGameModel: GameModel, answerAtom: AnswerAtom, challengeType: string, tandem: Tandem ) {

    //TODO https://github.com/phetsims/build-an-atom/issues/240 Consider either having all the subclasses define a name, or just getting rid of the name altogether.
    super( 'challenge', {
      tandem: tandem,
      phetioState: false
      // phetioType: BAAGameChallenge.BAAGameChallengeIO
    } );

    //TODO https://github.com/phetsims/build-an-atom/issues/240 why not an Enum?
    this.challengeStateProperty = new StringProperty( BAAChallengeState.PRESENTING_CHALLENGE, {
      tandem: tandem.createTandem( 'challengeStateProperty' ),
      phetioReadOnly: true,
      phetioState: false,
      validValues: _.values( BAAChallengeState )
    } );

    this.answerAtom = answerAtom;
    this.model = buildAnAtomGameModel;
    this.challengeType = challengeType;

    this.isCorrectAtomProperty = new BooleanProperty( false, {
      tandem: tandem.createTandem( 'isCorrectAtomProperty' ),
      phetioReadOnly: true,
      phetioState: false
    } );
  }

  public override dispose(): void {
    this.challengeStateProperty.dispose();

    super.dispose();
  }

  public override checkAnswer( submittedAtom: AnswerAtom ): void {
    this.isCorrectAtomProperty.value = submittedAtom.equals( this.answerAtom );
    this.model.check();
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

  public reset(): void {
    this.challengeStateProperty.set( BAAChallengeState.PRESENTING_CHALLENGE );
  }
}

buildAnAtom.register( 'BAAGameChallenge', BAAGameChallenge );

export default BAAGameChallenge;