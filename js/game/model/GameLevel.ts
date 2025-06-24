// Copyright 2025, University of Colorado Boulder

/**
 * GameLevel is the base class for a level in the Game screen.
 *
 * @author Agustín Vallejo
 */

import BooleanProperty from '../../../../axon/js/BooleanProperty.js';
import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import NumberProperty from '../../../../axon/js/NumberProperty.js';
import Property from '../../../../axon/js/Property.js';
import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import Range from '../../../../dot/js/Range.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import isSettingPhetioStateProperty from '../../../../tandem/js/isSettingPhetioStateProperty.js';
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
  private readonly challenges: BAAGameChallenge[];

  // The current challenge in this.challenges, using 1-based index, as shown in the Game status bar.
  public readonly challengeNumberProperty: Property<number>;

  // Current challenge to be solved
  public readonly challengeProperty: TReadOnlyProperty<BAAGameChallenge>;

  public readonly bestScoreProperty: Property<number>;
  public readonly bestTimeProperty: Property<number>;
  public readonly bestTimeVisibleProperty: Property<boolean>;

  public constructor( public readonly index: number, public readonly model: GameModel, providedOptions: GameLevelOptions ) {

    const options = optionize<GameLevelOptions, SelfOptions, PhetioObjectOptions>()( {

      // PhetioObjectOptions
      isDisposable: false,
      phetioState: false,
      phetioType: GameLevel.GameLevelIO
    }, providedOptions );

    super( options );
    const tandem = options.tandem;
    this.challenges = ChallengeSetFactory.createChallengeSet( index, model, tandem );

    this.challengeNumberProperty = new NumberProperty( 1, {
      numberType: 'Integer',
      range: new Range( 1, this.challenges.length ),
      tandem: tandem.createTandem( 'challengeNumberProperty' ),
      phetioDocumentation: 'The challenge number shown in the status bar. Indicates how far the user has progressed through a level.',
      phetioReadOnly: true
    } );

    // Consider that this derivation may go through intermediate states when PhET-iO state is restored,
    // depending on the order in which the dependencies are set.
    this.challengeProperty = new DerivedProperty(
      [ this.challengeNumberProperty ],
      challengeNumber => {
        return ( challengeNumber <= this.challenges.length ) ?
               this.challenges[ challengeNumber - 1 ] : this.challenges[ 0 ];
      }, {} );

    // When the challenge changes, reset it to ensure that coefficients are zero. It may have been previously
    // selected from the pool, and have coefficients from previous game play.
    this.challengeProperty.lazyLink( challenge => {
      if ( !isSettingPhetioStateProperty.value ) {
        challenge && challenge.reset();
      }
      // Update the model state to the new challenge.
      model.stateProperty.set( challenge );
    } );

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
      phetioReadOnly: true
    } );

    this.bestTimeVisibleProperty = new BooleanProperty( false, {
      tandem: options.tandem.createTandem( 'bestTimeVisibleProperty' ),
      phetioDocumentation: 'Whether the best time should be visible in the UI.',
      phetioFeatured: true
    } );
  }

  public reset(): void {
    this.bestScoreProperty.reset();
    this.bestTimeProperty.reset();
    this.bestTimeVisibleProperty.reset();
    this.challengeNumberProperty.reset();
    this.startOver();
  }

  public startOver(): void {
    this.challenges.forEach( challenge => challenge.reset() );
  }

  public startLevel(): void {
    this.model.stateProperty.set( this.challengeProperty.value );
  }

  /**
   * Ends the level, updating the best score and time if the score is a perfect score.
   * Returns true if there is a new best time, false otherwise.
   * @param score
   * @param time
   */
  public endLevel( score: number, time: number ): boolean {
    this.bestScoreProperty.set( Math.max( this.bestScoreProperty.value, score ) );

    let isNewBestTime = false;

    // Register best times only if the score is a perfect score.
    if ( this.isPerfectScore( score ) &&
         ( this.bestTimeProperty.value === 0 || time < this.bestTimeProperty.value ) ) {
      this.bestTimeProperty.set( time );
      isNewBestTime = true;
    }

    return isNewBestTime;
  }

  /**
   * Gets the number of points in a perfect score for this level.
   * A perfect score is obtained when the user balances every challenge correctly on the first attempt.
   */
  public getPerfectScore(): number {
    return GameModel.CHALLENGES_PER_LEVEL * GameModel.POINTS_FIRST_ATTEMPT;
  }

  /**
   * Is the best score a perfect score?
   */
  public achievedPerfectScore(): boolean {
    return this.isPerfectScore( this.bestScoreProperty.value );
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