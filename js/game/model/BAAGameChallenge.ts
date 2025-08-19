// Copyright 2013-2025, University of Colorado Boulder

/**
 * Base class for the challenges used in the Build an Atom game. The general approach is that an atom is presented in
 * some way to the user, and the user must submit a correct guess about the atom's configuration.
 *
 * @author John Blanco
 */

import BooleanProperty from '../../../../axon/js/BooleanProperty.js';
import Property from '../../../../axon/js/Property.js';
import NumberAtom from '../../../../shred/js/model/NumberAtom.js';
import PhetioObject from '../../../../tandem/js/PhetioObject.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import IOType from '../../../../tandem/js/types/IOType.js';
import ReferenceIO, { ReferenceIOState } from '../../../../tandem/js/types/ReferenceIO.js';
import buildAnAtom from '../../buildAnAtom.js';
import AnswerAtom from './AnswerAtom.js';
import { ChallengeType } from './ChallengeType.js';
import GameModel from './GameModel.js';

abstract class BAAGameChallenge extends PhetioObject {

  public readonly model: GameModel;

  // Correct answer atom for this challenge, which the user is trying to deduce.
  public readonly correctAnswerAtom: NumberAtom;

  // This flag is used to hide the arrow buttons on Spinners whenever we're checking or showing the correct answer.
  public isAnswerInteractiveProperty: Property<boolean>;

  protected constructor( model: GameModel, public readonly challengeType: ChallengeType, tandem: Tandem ) {

    super( {
      tandem: tandem,
      isDisposable: false,
      phetioState: false,
      phetioType: BAAGameChallenge.BAAGameChallengeIO,
      phetioFeatured: true
    } );

    this.correctAnswerAtom = new NumberAtom( {
      protonCount: 1,
      tandem: tandem.createTandem( 'correctAnswerAtom' )
    } );
    this.model = model;

    this.isAnswerInteractiveProperty = new BooleanProperty( true, {
      tandem: tandem.createTandem( 'isAnswerInteractiveProperty' ),
      phetioDocumentation: 'For internal use only.',
      phetioReadOnly: true
    } );
  }

  public checkAnswer( submittedAtom: AnswerAtom ): void {
    this.model.check( submittedAtom );
  }

  public tryAgain(): void {
    this.model.gameStateProperty.value = 'presentingChallenge';
  }

  public setCorrectAnswer( correctAnswerAtom: NumberAtom ): void {
    this.correctAnswerAtom.set( correctAnswerAtom );
  }

  public next(): void {
    // This event is basically handled by the model, which will remove this challenge and do whatever should happen
    // next.
    this.model.next();
  }

  public displayCorrectAnswer(): void {
    this.model.gameStateProperty.value = 'showingAnswer';
  }

  public step( dt: number ): void {
    // no-op, implemented by subclasses if needed
  }

  /**
   * BAAGameChallengeIO handles serialization of a game challenge. It implements reference-type serialization, as
   * described in https://github.com/phetsims/phet-io/blob/main/doc/phet-io-instrumentation-technical-guide.md#serialization.
   */
  public static readonly BAAGameChallengeIO = new IOType<BAAGameChallenge, ReferenceIOState>( 'BAAGameChallengeIO', {
    valueType: BAAGameChallenge,
    supertype: ReferenceIO( IOType.ObjectIO ),
    documentation: 'A challenge used in the game.'
  } );
}

buildAnAtom.register( 'BAAGameChallenge', BAAGameChallenge );

export default BAAGameChallenge;