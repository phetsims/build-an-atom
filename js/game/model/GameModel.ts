// Copyright 2013-2025, University of Colorado Boulder

/**
 * Primary model class for the Build an Atom Game tab.
 *
 * In this sim we use the following terminology for games:
 *    Game - the entire game, which consists of multiple levels
 *    Level - a single level in the game, which consists of multiple challenges
 *    Challenge - a single challenge in a level, which consists of a question and an answer
 *
 * @author Agustín Vallejo
 * @author John Blanco
 */

import BooleanProperty from '../../../../axon/js/BooleanProperty.js';
import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import Emitter from '../../../../axon/js/Emitter.js';
import NumberProperty from '../../../../axon/js/NumberProperty.js';
import Property from '../../../../axon/js/Property.js';
import ReadOnlyProperty from '../../../../axon/js/ReadOnlyProperty.js';
import TEmitter from '../../../../axon/js/TEmitter.js';
import dotRandom from '../../../../dot/js/dotRandom.js';
import Random from '../../../../dot/js/Random.js';
import Range from '../../../../dot/js/Range.js';
import TModel from '../../../../joist/js/TModel.js';
import isSettingPhetioStateProperty from '../../../../tandem/js/isSettingPhetioStateProperty.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import NullableIO from '../../../../tandem/js/types/NullableIO.js';
import NumberIO from '../../../../tandem/js/types/NumberIO.js';
import StringUnionIO from '../../../../tandem/js/types/StringUnionIO.js';
import GameTimer from '../../../../vegas/js/GameTimer.js';
import buildAnAtom from '../../buildAnAtom.js';
import BAAQueryParameters from '../../common/BAAQueryParameters.js';
import BAAGameChallenge from './BAAGameChallenge.js';
import GameLevel from './GameLevel.js';
import SelectedChallenge from './SelectedChallenge.js';

// constants
const CHALLENGES_PER_LEVEL = BAAQueryParameters.challengesPerLevel;
const POSSIBLE_POINTS_PER_CHALLENGE = 2;
const MAX_POINTS_PER_GAME_LEVEL = CHALLENGES_PER_LEVEL * POSSIBLE_POINTS_PER_CHALLENGE;

export const GameStateValues = [
  'levelSelection',
  'presentingChallenge',
  'solvedCorrectly',
  'tryAgain',
  'attemptsExhausted',
  'showingAnswer',
  'levelCompleted'
] as const;
export type GameState = ( typeof GameStateValues )[number];

class GameModel implements TModel {

  public static readonly CHALLENGES_PER_LEVEL = CHALLENGES_PER_LEVEL;
  public static readonly MAX_POINTS_PER_GAME_LEVEL = MAX_POINTS_PER_GAME_LEVEL;
  public static readonly POINTS_FIRST_ATTEMPT = 2;  // points to award for correct guess on 1st attempt
  public static readonly POINTS_SECOND_ATTEMPT = 1; // points to award for correct guess on 2nd attempt

  // The current state of the game, which is used to determine what the view should display.
  // Usually it ranges between 'choosingLevel', 'levelCompleted' and individual challenges within a level.
  public readonly gameStateProperty: Property<GameState>;
  public readonly stateChangeEmitter: TEmitter;

  // All the levels in the game
  public readonly levels: GameLevel[];

  // The selected game level. null means 'no selection' and causes the view to return to the level-selection UI.
  public readonly levelProperty: Property<GameLevel | null>;

  // The number of the selected level in the game. Zero means that no level is selected.
  public readonly levelNumberProperty: ReadOnlyProperty<number>;

  // Current challenge number in the level, starting from 1. Used only for the finite status bar.
  public readonly challengeNumberProperty: Property<number>;

  // The current challenge that is being played.
  public readonly challengeProperty: Property<BAAGameChallenge | null>;

  // The current challenge that is being played.
  public readonly selectedChallengeProperty: SelectedChallenge;

  // The number of attempts the user has made at solving the current challenge.
  private readonly attemptsProperty: Property<number>;

  // The score for the current level that is being played.
  public readonly scoreProperty: Property<number>;

  public readonly timer: GameTimer;
  public readonly timerEnabledProperty: Property<boolean>;

  public readonly randomSeedProperty: Property<number>;
  public readonly random: Random;

  // The number of points that this challenge is worth, which is used to calculate the score.
  public pointValueProperty: Property<number>;

  public constructor( tandem: Tandem ) {

    this.randomSeedProperty = new NumberProperty( dotRandom.nextDouble(), {
      tandem: tandem.createTandem( 'randomSeedProperty' ),
      phetioDocumentation: 'For internal use only, the seed used to generate random challenges.',
      phetioReadOnly: true
    } );

    this.random = new Random( { seed: this.randomSeedProperty.value } );

    // TODO: Until we have proper IOTypes, this shouldn't be instrumented! https://github.com/phetsims/build-an-atom/issues/257
    this.gameStateProperty = new Property<GameState>( 'levelSelection', {
      validValues: GameStateValues,
      tandem: tandem.createTandem( 'gameStateProperty' ),
      phetioDocumentation: 'The current game state, which is used to determine what the view should display.',
      phetioValueType: StringUnionIO( GameStateValues ),
      phetioReadOnly: true
    } );

    this.stateChangeEmitter = new Emitter();

    this.pointValueProperty = new NumberProperty( 0, {
      tandem: tandem.createTandem( 'pointValueProperty' ),
      phetioReadOnly: true
    } );

    this.challengeNumberProperty = new NumberProperty( 1, {
      numberType: 'Integer',
      range: new Range( 1, GameModel.CHALLENGES_PER_LEVEL ),
      phetioDocumentation: 'The challenge number shown in the status bar. Indicates how far the user has progressed through a level.',
      phetioReadOnly: true
    } );

    this.challengeProperty = new Property<BAAGameChallenge | null>( null );

    this.selectedChallengeProperty = new SelectedChallenge( tandem.createTandem( 'selectedChallengeProperty' ) );

    this.challengeProperty.link( challenge => {
      if ( challenge ) {
        this.selectedChallengeProperty.challengeTypeProperty.value = challenge.challengeType;
        this.selectedChallengeProperty.correctAnswerAtom.set( challenge.answerAtom );
      }
    } );

    this.levels = [
      new GameLevel( 0, this, { tandem: tandem.createTandem( 'level1' ) } ),
      new GameLevel( 1, this, { tandem: tandem.createTandem( 'level2' ) } ),
      new GameLevel( 2, this, { tandem: tandem.createTandem( 'level3' ) } ),
      new GameLevel( 3, this, { tandem: tandem.createTandem( 'level4' ) } )
    ];

    this.levelProperty = new Property<GameLevel | null>( null, {
      validValues: [ ...this.levels, null ],
      tandem: tandem.createTandem( 'levelProperty' ),
      phetioDocumentation: 'The selected level in the game. null means that no level is selected.',
      phetioFeatured: true,
      phetioValueType: NullableIO( GameLevel.GameLevelIO )
    } );

    this.levelNumberProperty = new DerivedProperty( [ this.levelProperty ], level => level ? level.index : 0, {
      tandem: tandem.createTandem( 'levelNumberProperty' ),
      phetioDocumentation: 'Number of the selected level in the game. Zero means that no level is selected.',
      phetioFeatured: true,
      phetioValueType: NumberIO
    } );

    const timerTandem = tandem.createTandem( 'timer' );
    this.timer = new GameTimer( timerTandem );

    this.timerEnabledProperty = new BooleanProperty( false, {
      tandem: timerTandem.createTandem( 'enabledProperty' ),
      phetioDocumentation: 'Whether the timer will run while playing a level.',
      phetioFeatured: true
    } );

    this.attemptsProperty = new NumberProperty( 0, {
      numberType: 'Integer',
      range: new Range( 0, 2 ),
      tandem: tandem.createTandem( 'attemptsProperty' ),
      phetioDocumentation: 'The number of attempts to solve the current challenge.',
      phetioFeatured: true,
      phetioReadOnly: true
    } );

    this.scoreProperty = new NumberProperty( 0, {
      tandem: tandem.createTandem( 'scoreProperty' ),
      phetioDocumentation: 'Score on current game level.',
      range: new Range( 0, MAX_POINTS_PER_GAME_LEVEL ),
      phetioReadOnly: true
    } );

    this.levelProperty.lazyLink( level => {
      if ( !isSettingPhetioStateProperty.value ) {
        level ? this.startLevel() : this.startOver();
      }
      else {
        // TODO: This is a workaround due to not having IOTypes for Challenges yet! https://github.com/phetsims/build-an-atom/issues/257
        level && level.imposeLevel();
      }
      this.stateChangeEmitter.emit();
    } );

    isSettingPhetioStateProperty.link( isSettingPhetioState => {
      if ( isSettingPhetioState ) {
        this.levelProperty.notifyListenersStatic();
      }
    } );

    this.randomSeedProperty.lazyLink( seed => {
      this.random.setSeed( seed );
      this.levels.forEach( level => {
        level.generateChallenges();
      } );
    } );

    this.gameStateProperty.link( () => {
      this.stateChangeEmitter.emit();
    } );
  }

  /**
   * Called before the first challenge has been played.
   */
  private startLevel(): void {

    const level = this.levelProperty.value!;
    assert && assert( level );

    level.startLevel();
    this.challengeNumberProperty.value = level.challengeNumberProperty.value;

    this.resetToStart();

    // Start the timer.
    if ( this.timerEnabledProperty.value ) {
      this.timer.start();
    }
  }

  /**
   * Called when the user presses the "Check" button.
   */
  public check(): void {

    const level = this.levelProperty.value!;
    assert && assert( level );

    this.attemptsProperty.value++;
    const attempts = this.attemptsProperty.value;
    const challenge = level.challengeProperty.value;
    const correctAnswer = challenge.isCorrectAtomProperty.value;

    const points = attempts === 1 ?
                   GameModel.POINTS_FIRST_ATTEMPT :
                   GameModel.POINTS_SECOND_ATTEMPT;
    this.pointValueProperty.value = points;
    this.scoreProperty.value += correctAnswer ? points : 0;

    if ( correctAnswer ) {
      this.gameStateProperty.set( 'solvedCorrectly' );
      if ( level.isLastChallenge() ) {
        this.endLevel();
      }
    }
    else if ( attempts < 2 ) {
      this.gameStateProperty.set( 'tryAgain' );
    }
    else {
      this.gameStateProperty.set( 'attemptsExhausted' );
      if ( level.isLastChallenge() ) {
        this.endLevel();
      }
    }
  }

  /**
   * Called when the user presses the "Next" button.
   */
  public next(): void {

    const level = this.levelProperty.value!;
    assert && assert( level );

    if ( !level.isLastChallenge() ) {
      this.attemptsProperty.value = 0;
      level.challengeNumberProperty.value++;
      this.challengeProperty.set( level.challengeProperty.value );
      this.gameStateProperty.set( 'presentingChallenge' );
    }
    else {
      this.gameStateProperty.set( 'levelCompleted' );
    }
  }

  /**
   * Called when the user presses the "Skip" button, which is visible when running with ?showAnswers.
   * This is equivalent to pressing the "Next" button.
   */
  public skip(): void {
    this.next();
  }

  /**
   * Called after the last challenge has been played.
   */
  private endLevel(): void {

    const level = this.levelProperty.value!;
    assert && assert( level );

    this.timer.stop();

    const score = this.scoreProperty.value;
    const time = this.timer.elapsedTimeProperty.value;
    level.endLevel( score, time );

    this.randomSeedProperty.value++; // Increment the random seed to ensure that the next level has different challenges.
  }

  /**
   * Called when the user presses the "Start Over" button, or when levelProperty is set to null.
   */
  public startOver(): void {
    this.resetToStart();
    this.levelProperty.reset();
    this.gameStateProperty.set( 'levelSelection' );
    this.randomSeedProperty.value++; // Increment the random seed to ensure that the next level has different challenges.
  }

  public step( dt: number ): void {
    if ( this.challengeProperty.value ) {
      this.challengeProperty.value.step( dt );
    }
  }

  /**
   * Does a full reset of the Game model.
   */
  public reset(): void {
    this.resetToStart();
    this.levels.forEach( level => level.reset() );
    this.levelProperty.reset();
    this.timerEnabledProperty.reset();
    this.gameStateProperty.reset();
  }

  /**
   * Resets only the things that should be reset when a game is started, or when in the 'levelSelection' game state.
   */
  private resetToStart(): void {
    this.attemptsProperty.reset();
    this.scoreProperty.reset();
    this.timer.reset();
  }

}

buildAnAtom.register( 'GameModel', GameModel );
export default GameModel;