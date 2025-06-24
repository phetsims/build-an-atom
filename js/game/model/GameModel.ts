// Copyright 2013-2025, University of Colorado Boulder

/**
 * Primary model class for the Build an Atom Game tab.
 *
 * In this sim we use the following terminology for games:
 *    Game - the entire game, which consists of multiple levels
 *    Level - a single level in the game, which consists of multiple challenges
 *    Challenge - a single challenge in a level, which consists of a question and an answer
 *
 * TODO: https://github.com/phetsims/build-an-atom/issues/257
 *  - The challenges are the ones keeping track of state!!
 *
 * @author Agustín Vallejo
 * @author John Blanco
 */

import BooleanProperty from '../../../../axon/js/BooleanProperty.js';
import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import NumberProperty from '../../../../axon/js/NumberProperty.js';
import Property from '../../../../axon/js/Property.js';
import ReadOnlyProperty from '../../../../axon/js/ReadOnlyProperty.js';
import Range from '../../../../dot/js/Range.js';
import TModel from '../../../../joist/js/TModel.js';
import isSettingPhetioStateProperty from '../../../../tandem/js/isSettingPhetioStateProperty.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import NullableIO from '../../../../tandem/js/types/NullableIO.js';
import NumberIO from '../../../../tandem/js/types/NumberIO.js';
import GameTimer from '../../../../vegas/js/GameTimer.js';
import buildAnAtom from '../../buildAnAtom.js';
import BAAQueryParameters from '../../common/BAAQueryParameters.js';
import BAAChallengeState from './BAAChallengeState.js';
import BAAGameState from './BAAGameState.js';
import GameLevel from './GameLevel.js';

// constants
const CHALLENGES_PER_LEVEL = BAAQueryParameters.challengesPerLevel;
const POSSIBLE_POINTS_PER_CHALLENGE = 2;
const MAX_POINTS_PER_GAME_LEVEL = CHALLENGES_PER_LEVEL * POSSIBLE_POINTS_PER_CHALLENGE;

class GameModel implements TModel {

  public static readonly CHALLENGES_PER_LEVEL = CHALLENGES_PER_LEVEL;
  public static readonly MAX_POINTS_PER_GAME_LEVEL = MAX_POINTS_PER_GAME_LEVEL;
  public static readonly POINTS_FIRST_ATTEMPT = 2;  // points to award for correct guess on 1st attempt
  public static readonly POINTS_SECOND_ATTEMPT = 1; // points to award for correct guess on 2nd attempt

  // The current state of the game, which is used to determine what the view should display.
  // Usually it ranges between 'choosingLevel', 'levelCompleted' and individual challenges within a level.
  public readonly stateProperty: Property<BAAGameState>;

  // All the levels in the game
  public readonly levels: GameLevel[];

  // The selected game level. null means 'no selection' and causes the view to return to the level-selection UI.
  public readonly levelProperty: Property<GameLevel | null>;

  // The number of the selected level in the game. Zero means that no level is selected.
  public readonly levelNumberProperty: ReadOnlyProperty<number>;

  // The number of attempts the user has made at solving the current challenge.
  private readonly attemptsProperty: Property<number>;

  // The score for the current level that is being played.
  public readonly scoreProperty: Property<number>;

  public readonly timer: GameTimer;
  public readonly timerEnabledProperty: Property<boolean>;

  // Whether the time for this game a new best time.
  public isNewBestTime = false;

  public constructor( tandem: Tandem ) {

    this.stateProperty = new Property<BAAGameState>( BAAGameState.CHOOSING_LEVEL, {
      // tandem: tandem.createTandem( 'stateProperty' )
    } );

    this.levels = [
      new GameLevel( 0, this, { tandem: tandem.createTandem( 'gameLevel0' ) } ),
      new GameLevel( 1, this, { tandem: tandem.createTandem( 'gameLevel1' ) } ),
      new GameLevel( 2, this, { tandem: tandem.createTandem( 'gameLevel2' ) } ),
      new GameLevel( 3, this, { tandem: tandem.createTandem( 'gameLevel3' ) } )
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
      range: new Range( 0, 3 ),
      tandem: tandem.createTandem( 'attemptsProperty' ),
      phetioDocumentation: 'The number of attempts to solve the current challenge.',
      phetioFeatured: true,
      phetioReadOnly: true
    } );

    this.timerEnabledProperty = new BooleanProperty( false, {
      tandem: tandem.createTandem( 'timerEnabledProperty' )
    } );

    this.scoreProperty = new NumberProperty( 0, {
      tandem: tandem.createTandem( 'scoreProperty' ),
      phetioDocumentation: 'Score on current game level.',
      range: new Range( 0, MAX_POINTS_PER_GAME_LEVEL )
    } );

    this.timerEnabledProperty.lazyLink( timerEnabled => {
      for ( let i = 0; i < this.levels.length; i++ ) {
        this.levels[ i ].bestTimeVisibleProperty.value = timerEnabled && this.levels[ i ].achievedPerfectScore();
      }
    } );

    this.levelProperty.lazyLink( level => {
      if ( !isSettingPhetioStateProperty.value ) {
        level ? this.startLevel() : this.startOver();
      }
    } );
  }

  /**
   * Called before the first challenge has been played.
   */
  private startLevel(): void {

    const level = this.levelProperty.value!;
    assert && assert( level );

    level.startLevel();

    this.resetToStart();

    // Start the timer.
    if ( this.timerEnabledProperty.value ) {
      this.timer.start();
    }
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
    this.isNewBestTime = level.endLevel( score, time );
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
    challenge.pointValue = points;
    this.scoreProperty.value += correctAnswer ? points : 0;

    if ( correctAnswer ) {
      challenge.challengeStateProperty.set( BAAChallengeState.CHALLENGE_SOLVED_CORRECTLY );
      if ( level.isLastChallenge() ) {
        this.endLevel();
      }
    }
    else if ( attempts < 2 ) {
      challenge.challengeStateProperty.set( BAAChallengeState.PRESENTING_TRY_AGAIN );
    }
    else {
      challenge.challengeStateProperty.set( BAAChallengeState.ATTEMPTS_EXHAUSTED );
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
    }
    else {
      this.stateProperty.set( BAAGameState.LEVEL_COMPLETED );
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
   * Called when the user presses the "Start Over" button, or when levelProperty is set to null.
   */
  public startOver(): void {
    this.resetToStart();
    this.levelProperty.reset();
    this.stateProperty.set( BAAGameState.CHOOSING_LEVEL );
  }

  /**
   * Does a full reset of the Game model.
   */
  public reset(): void {
    this.resetToStart();
    this.levels.forEach( level => level.reset() );
    this.levelProperty.reset();
    this.timerEnabledProperty.reset();
  }

  /**
   * Resets only the things that should be reset when a game is started, or when in the 'levelSelection' game state.
   */
  private resetToStart(): void {
    this.isNewBestTime = false;
    this.attemptsProperty.reset();
    this.scoreProperty.reset();
    this.timer.reset();
  }

}

buildAnAtom.register( 'GameModel', GameModel );
export default GameModel;