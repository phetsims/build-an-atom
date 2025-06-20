// Copyright 2025, University of Colorado Boulder

/**
 * GameLevel is the base class for a level in the Game screen.
 *
 * TODO: This is copied from BCE, and could be generalized and moved to a more general location. https://github.com/phetsims/build-an-atom/issues/257
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import BooleanProperty from '../../../../axon/js/BooleanProperty.js';
import NumberProperty from '../../../../axon/js/NumberProperty.js';
import Property from '../../../../axon/js/Property.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import ShredConstants from '../../../../shred/js/ShredConstants.js';
import PhetioObject, { PhetioObjectOptions } from '../../../../tandem/js/PhetioObject.js';
import IOType from '../../../../tandem/js/types/IOType.js';
import ReferenceIO, { ReferenceIOState } from '../../../../tandem/js/types/ReferenceIO.js';
import buildAnAtom from '../../buildAnAtom.js';
import { ChallengeType } from '../../common/BAAConstants.js';
import AtomValuePool from './AtomValuePool.js';
import BAAGameChallenge from './BAAGameChallenge.js';
import ChallengeSetFactory from './ChallengeSetFactory.js';
import GameModel from './GameModel.js';

type SelfOptions = EmptySelfOptions;

const CHALLENGES_PER_LEVEL: ChallengeType[][] = [
  [ 'schematic-to-element', 'counts-to-element' ],
  [ 'counts-to-charge', 'counts-to-mass', 'schematic-to-charge', 'schematic-to-mass' ],
  [ 'schematic-to-symbol-charge', 'schematic-to-symbol-mass-number', 'schematic-to-symbol-proton-count', 'counts-to-symbol-charge', 'counts-to-symbol-mass' ],
  [ 'schematic-to-symbol-all', 'symbol-to-schematic', 'symbol-to-counts', 'counts-to-symbol-all' ]
];

type GameLevelOptions = SelfOptions & PickRequired<PhetioObjectOptions, 'tandem'>;

export default class GameLevel extends PhetioObject {

  public static readonly CHALLENGES_PER_GAME = 5;

  public static readonly POINTS_FIRST_ATTEMPT = 2;  // points to award for correct guess on 1st attempt
  public static readonly POINTS_SECOND_ATTEMPT = 1; // points to award for correct guess on 2nd attempt

  protected static readonly CHALLENGE_POOL_TANDEM_NAME = 'challengePool';

  public readonly index: number;
  public readonly levelName: string;
  public readonly atomValuePool: AtomValuePool;
  public readonly challenges: ChallengeType[];
  private readonly challengePool: BAAGameChallenge[];

  public readonly bestScoreProperty: Property<number>;
  public readonly bestTimeProperty: Property<number>;
  public readonly bestTimeVisibleProperty: Property<boolean>;

  public constructor( model: GameModel, index: number, providedOptions: GameLevelOptions ) {

    const options = optionize<GameLevelOptions, SelfOptions, PhetioObjectOptions>()( {

      // PhetioObjectOptions
      isDisposable: false,
      phetioState: false,
      phetioType: GameLevel.GameLevelIO
    }, providedOptions );

    super( options );

    const tandem = options.tandem;

    this.index = index;
    this.levelName = ShredConstants.LEVEL_NAMES[ this.index ];
    this.atomValuePool = new AtomValuePool( this.index );
    this.challenges = CHALLENGES_PER_LEVEL[ this.index ];
    this.challengePool = ChallengeSetFactory.createChallengeSet( model, this.challenges, this.atomValuePool, tandem );

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
  }

  /**
   * Gets a challenge from the pool.
   */
  public getChallenge( index: number ): BAAGameChallenge {
    return this.challengePool[ index ];
  }

  /**
   * Gets all pool challenges
   */
  public getChallenges(): BAAGameChallenge[] {
    return this.challengePool;
  }

  /**
   * Gets the number of points in a perfect score for this level.
   * A perfect score is obtained when the user balances every challenge correctly on the first attempt.
   */
  public getPerfectScore(): number {
    return GameLevel.CHALLENGES_PER_GAME * GameLevel.POINTS_FIRST_ATTEMPT;
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