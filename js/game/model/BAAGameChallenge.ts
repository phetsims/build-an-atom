// Copyright 2013-2025, University of Colorado Boulder

/**
 * Base class for the challenges used in the Build an Atom game. The general approach is that an atom is presented in
 * some way to the user, and the user must submit a correct guess about the atom's configuration.
 *
 * @author John Blanco
 */

import BooleanProperty from '../../../../axon/js/BooleanProperty.js';
import Property from '../../../../axon/js/Property.js';
import Bounds2 from '../../../../dot/js/Bounds2.js';
import NumberAtom from '../../../../shred/js/model/NumberAtom.js';
import PhetioObject from '../../../../tandem/js/PhetioObject.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import IOType from '../../../../tandem/js/types/IOType.js';
import ReferenceIO, { ReferenceIOState } from '../../../../tandem/js/types/ReferenceIO.js';
import buildAnAtom from '../../buildAnAtom.js';
import ChallengeView from '../view/ChallengeView.js';
import AnswerAtom from './AnswerAtom.js';
import GameModel from './GameModel.js';

abstract class BAAGameChallenge extends PhetioObject {

  public readonly model: GameModel;

  // Correct answer atom for this challenge, which the user is trying to deduce.
  public readonly answerAtom: NumberAtom;

  public configurableProtonCount = false;
  public configurableMassNumber = false;
  public configurableCharge = false;

  // This flag is used to hide the arrow buttons on Spinners whenever we're checking or showing the correct answer.
  public interactiveAnswerProperty: Property<boolean>;

  protected constructor( model: GameModel, tandem: Tandem ) {

    super( {
      tandem: tandem,
      isDisposable: false,
      phetioState: false,
      phetioType: BAAGameChallenge.BAAGameChallengeIO
    } );

    this.answerAtom = new NumberAtom( {
      protonCount: 1,
      tandem: tandem.createTandem( 'answerAtom' )
    } );
    this.model = model;

    this.interactiveAnswerProperty = new BooleanProperty( true, {
      tandem: tandem.createTandem( 'interactiveAnswerProperty' ),
      phetioDocumentation: 'For internal use only.',
      phetioReadOnly: true
    } );
  }

  public checkAnswer( submittedAtom: AnswerAtom ): void {
    this.model.check( submittedAtom );
  }

  public tryAgain(): void {
    this.model.gameStateProperty.set( 'presentingChallenge' );
  }

  public setCorrectAnswer( answerAtom: NumberAtom ): void {
    this.answerAtom.set( answerAtom );
  }

  public next(): void {
    // This event is basically handled by the model, which will remove this challenge and do whatever should happen
    // next.
    this.model.next();
  }

  public displayCorrectAnswer(): void {
    this.model.gameStateProperty.set( 'showingAnswer' );
  }

  public abstract createView( layoutBounds: Bounds2, tandem: Tandem ): ChallengeView;

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