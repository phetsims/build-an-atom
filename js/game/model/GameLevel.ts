// Copyright 2025, University of Colorado Boulder

/**
 * GameLevel is the base class for a level in the Game screen.
 *
 * @author Agustín Vallejo
 */

import BooleanProperty from '../../../../axon/js/BooleanProperty.js';
import Emitter from '../../../../axon/js/Emitter.js';
import NumberProperty from '../../../../axon/js/NumberProperty.js';
import Property from '../../../../axon/js/Property.js';
import TEmitter from '../../../../axon/js/TEmitter.js';
import Range from '../../../../dot/js/Range.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import PhetioObject, { PhetioObjectOptions } from '../../../../tandem/js/PhetioObject.js';
import IOType from '../../../../tandem/js/types/IOType.js';
import ReferenceIO, { ReferenceIOState } from '../../../../tandem/js/types/ReferenceIO.js';
import buildAnAtom from '../../buildAnAtom.js';
import BAAGameChallenge from './BAAGameChallenge.js';
import ChallengeSetFactory from './ChallengeSetFactory.js';
import GameModel from './GameModel.js';

type SelfOptions = EmptySelfOptions;

type GameLevelOptions = SelfOptions & PickRequired<PhetioObjectOptions, 'tandem'>;

export default class GameLevel extends PhetioObject {

  // The collection of challenges for this level.
  public challenges: BAAGameChallenge[];

  // The current challenge in this.challenges, using 1-based index, as shown in the Game status bar.
  public readonly challengeNumberProperty: Property<number>;

  // Current challenge to be solved
  public readonly challengeProperty: Property<BAAGameChallenge>;

  // Emitter for when the level is updated, used to notify the view and update the challenge
  public readonly levelUpdatedEmitter: TEmitter;

  public readonly bestScoreProperty: Property<number>;
  public readonly bestTimeProperty: Property<number>;

  // Whether the time for this game a new best time.
  public isNewBestTimeProperty: Property<boolean>;

  public active = false; // Whether this level is currently active, used for PhET-iO state restoration.

  public constructor(
    public readonly index: number,
    public readonly model: GameModel,
    providedOptions: GameLevelOptions
  ) {

    const options = optionize<GameLevelOptions, SelfOptions, PhetioObjectOptions>()( {

      // PhetioObjectOptions
      isDisposable: false,
      phetioState: false,
      phetioType: GameLevel.GameLevelIO
    }, providedOptions );

    super( options );

    this.levelUpdatedEmitter = new Emitter();

    const tandem = options.tandem;
    this.challenges = [];
    this.generateChallenges();

    this.challengeNumberProperty = new NumberProperty( 1, {
      numberType: 'Integer',
      range: new Range( 1, this.challenges.length ),
      tandem: tandem.createTandem( 'challengeNumberProperty' ),
      phetioDocumentation: 'The challenge number shown in the status bar. Indicates how far the user has progressed through a level.',
      phetioReadOnly: true
    } );

    // Consider that this derivation may go through intermediate states when PhET-iO state is restored,
    // depending on the order in which the dependencies are set.
    this.challengeProperty = new Property( this.challenges[ 0 ] );

    this.bestScoreProperty = new NumberProperty( 0, {
      numberType: 'Integer',
      tandem: options.tandem.createTandem( 'bestScoreProperty' ),
      phetioFeatured: true,
      phetioReadOnly: true
    } );

    this.bestTimeProperty = new NumberProperty( 0, {
      numberType: 'Integer',
      tandem: options.tandem.createTandem( 'bestTimeProperty' ),
      phetioDocumentation: 'Best time for a game with a perfect score.',
      phetioFeatured: true,
      phetioReadOnly: true,
      units: 's'
    } );

    this.isNewBestTimeProperty = new BooleanProperty( false, {
      tandem: options.tandem.createTandem( 'isNewBestTimeProperty' ),
      phetioDocumentation: 'Whether the time for this game is a new best time.',
      phetioReadOnly: true
    } );

    // When the challenge number changes,update the model's challenge number property to display it in the status bar.
    this.challengeNumberProperty.link( number => {
      this.levelUpdatedEmitter.emit();
      model.challengeNumberProperty.set( number );
      model.gameStateProperty.notifyListenersStatic();
    } );

    this.levelUpdatedEmitter.addListener( () => {
      const challengeNumber = this.challengeNumberProperty.value;
      if ( challengeNumber <= this.challenges.length ) {
        this.challengeProperty.value = this.challenges[ this.challengeNumberProperty.value - 1 ];
      }
    } );
  }

  public reset(): void {
    this.bestScoreProperty.reset();
    this.bestTimeProperty.reset();
  }

  /**
   * When setting PhET-iO state, we can call this function to impose the level's challenge on the model.
   */
  public imposeLevel(): void {
    this.levelUpdatedEmitter.emit();
    this.model.challengeProperty.set( this.challengeProperty.value );
    this.model.gameStateProperty.set( 'presentingChallenge' );
    this.model.gameStateProperty.notifyListenersStatic(); // Notify in case the previous state was also 'presentingChallenge'.
  }

  /**
   * Generates a new set of challenges for this level.
   * This is called when the level is first created, and can be called again for PhET-iO randomness purposes.
   */
  public generateChallenges(): void {
    this.challenges = ChallengeSetFactory.createChallengeSet( this.index, this.model, this.tandem );
    this.levelUpdatedEmitter.emit();
  }

  public startLevel(): void {
    this.challengeNumberProperty.reset();
    this.model.challengeProperty.set( this.challengeProperty.value );
    this.model.gameStateProperty.set( 'presentingChallenge' );
  }

  /**
   * Ends the level, updating the best score and time if the score is a perfect score.
   */
  public endLevel( score: number, time: number ): void {
    this.bestScoreProperty.set( Math.max( this.bestScoreProperty.value, score ) );

    this.isNewBestTimeProperty.value = false;

    // Register best times only if the score is a perfect score.
    if ( this.isPerfectScore( score ) &&
         ( this.bestTimeProperty.value === 0 || time < this.bestTimeProperty.value ) ) {
      this.bestTimeProperty.set( time );
      this.isNewBestTimeProperty.value = true;
    }

  }

  /**
   * Gets the number of points in a perfect score for this level.
   * A perfect score is obtained when the user balances every challenge correctly on the first attempt.
   */
  public getPerfectScore(): number {
    return GameModel.CHALLENGES_PER_LEVEL * GameModel.POINTS_FIRST_ATTEMPT;
  }

  /**
   * Is the specified score a perfect score?
   */
  public isPerfectScore( points: number ): boolean {
    return points === this.getPerfectScore();
  }

  public isLastChallenge(): boolean {
    return this.challengeNumberProperty.value === this.challenges.length;
  }

  /**
   * GameLevelIO handles serialization of a level in the game screen. It implements reference-type serialization, as
   * described in https://github.com/phetsims/phet-io/blob/main/doc/phet-io-instrumentation-technical-guide.md#serialization.
   */
  public static readonly GameLevelIO = new IOType<GameLevel, ReferenceIOState>( 'GameLevelIO', {
    valueType: GameLevel,
    supertype: ReferenceIO( IOType.ObjectIO ),
    documentation: 'A level in the game.'
  } );
}

buildAnAtom.register( 'GameLevel', GameLevel );