// Copyright 2025, University of Colorado Boulder

/**
 * GameLevel is the base class for a level in the Game screen.
 *
 * @author Agustín Vallejo
 */

import BooleanProperty from '../../../../axon/js/BooleanProperty.js';
import NumberProperty from '../../../../axon/js/NumberProperty.js';
import PatternStringProperty from '../../../../axon/js/PatternStringProperty.js';
import Property from '../../../../axon/js/Property.js';
import { TReadOnlyProperty } from '../../../../axon/js/TReadOnlyProperty.js';
import optionize from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import PhetioObject, { PhetioObjectOptions } from '../../../../tandem/js/PhetioObject.js';
import IOType from '../../../../tandem/js/types/IOType.js';
import ReferenceIO, { ReferenceIOState } from '../../../../tandem/js/types/ReferenceIO.js';
import buildAnAtom from '../../buildAnAtom.js';
import ChallengeSetFactory, { ChallengeDescriptor } from './ChallengeSetFactory.js';
import GameModel from './GameModel.js';

type SelfOptions = {
  levelDescriptionPatternProperty: TReadOnlyProperty<string>; // Description of the level, used in the info dialog.
};

type GameLevelOptions = SelfOptions & PickRequired<PhetioObjectOptions, 'tandem'>;

class GameLevel extends PhetioObject {

  // The descriptors for the challenges in this level, used to obtain and configure the challenges.
  public challengeDescriptors: ChallengeDescriptor[] = [];

  public readonly bestScoreProperty: Property<number>;
  public readonly bestTimeProperty: Property<number>;

  // Whether the time for this game a new best time.
  public isNewBestTimeProperty: Property<boolean>;

  public active = false; // Whether this level is currently active, used for PhET-iO state restoration.

  // 0-based index used for this level when accessing various data structures.
  public readonly levelIndex: number;

  // The level description string, used in the info dialog.
  public readonly levelDescriptionStringProperty: TReadOnlyProperty<string>;

  public constructor(
    public readonly levelNumber: number, // level numbering is 1-based
    public readonly model: GameModel,
    providedOptions: GameLevelOptions
  ) {

    assert && assert( levelNumber > 0, 'The levelNumber parameter should be greater than zero.' );

    const options = optionize<GameLevelOptions, SelfOptions, PhetioObjectOptions>()( {

      // PhetioObjectOptions
      isDisposable: false,
      phetioState: false,
      phetioType: GameLevel.GameLevelIO
    }, providedOptions );

    super( options );

    this.levelIndex = levelNumber - 1;

    const levelDescriptionTandem = options.tandem.createTandem( 'levelDescriptionStringProperty' );
    this.levelDescriptionStringProperty = new PatternStringProperty( options.levelDescriptionPatternProperty, {
      levelNumber: levelNumber
    }, {
      tandem: levelDescriptionTandem
    } );

    this.generateChallengeDescriptors();

    this.bestScoreProperty = new NumberProperty( 0, {
      numberType: 'Integer',
      tandem: options.tandem.createTandem( 'bestScoreProperty' ),
      phetioFeatured: true,
      phetioReadOnly: true
    } );

    this.bestTimeProperty = new NumberProperty( 0, {
      numberType: 'Integer',
      tandem: options.tandem.createTandem( 'bestTimeProperty' ),
      phetioDocumentation: 'Best time for a level with a perfect score.',
      phetioFeatured: true,
      phetioReadOnly: true,
      units: 's'
    } );

    this.isNewBestTimeProperty = new BooleanProperty( false, {
      tandem: options.tandem.createTandem( 'isNewBestTimeProperty' ),
      phetioDocumentation: 'Whether the time for this level is a new best time.',
      phetioReadOnly: true
    } );
  }

  public reset(): void {
    this.bestScoreProperty.reset();
    this.bestTimeProperty.reset();
  }

  /**
   * Generates a new set of challenge descriptors for this level. This is called whenever the level is restarted.
   */
  public generateChallengeDescriptors(): void {
    this.challengeDescriptors = ChallengeSetFactory.createChallengeDescriptorSet( this.levelIndex, this.model );
  }

  /**
   * Ends the level, updating the best score and time if the score is a perfect score.
   */
  public endLevel( score: number, time: number ): void {
    this.bestScoreProperty.value = Math.max( this.bestScoreProperty.value, score );

    this.isNewBestTimeProperty.value = false;

    // Register best times only if the score is a perfect score.
    if ( this.isPerfectScore( score ) &&
         ( this.bestTimeProperty.value === 0 || time < this.bestTimeProperty.value ) ) {
      this.bestTimeProperty.value = time;
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
    return this.model.challengeNumberProperty.value === this.challengeDescriptors.length;
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
export default GameLevel;