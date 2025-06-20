// Copyright 2013-2025, University of Colorado Boulder

/**
 * Primary model class for the Build an Atom Game tab.
 *
 * TODO: https://github.com/phetsims/build-an-atom/issues/257
 *  - Timer is not working correctly
 *  - check() is not being called.
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
import StringUnionProperty from '../../../../axon/js/StringUnionProperty.js';
import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import Range from '../../../../dot/js/Range.js';
import TModel from '../../../../joist/js/TModel.js';
import ShredConstants from '../../../../shred/js/ShredConstants.js';
import isSettingPhetioStateProperty from '../../../../tandem/js/isSettingPhetioStateProperty.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import NullableIO from '../../../../tandem/js/types/NullableIO.js';
import NumberIO from '../../../../tandem/js/types/NumberIO.js';
import GameTimer from '../../../../vegas/js/GameTimer.js';
import buildAnAtom from '../../buildAnAtom.js';
import BAAQueryParameters from '../../common/BAAQueryParameters.js';
import BAAGameChallenge from './BAAGameChallenge.js';
import BAAGameState, { GameState, GameStateValues } from './BAAGameState.js';
import GameLevel from './GameLevel.js';

// constants
const CHALLENGES_PER_LEVEL = BAAQueryParameters.challengesPerLevel;
const POSSIBLE_POINTS_PER_CHALLENGE = 2;
const MAX_POINTS_PER_GAME_LEVEL = CHALLENGES_PER_LEVEL * POSSIBLE_POINTS_PER_CHALLENGE;

class GameModel implements TModel {

  public static readonly MAX_POINTS_PER_GAME_LEVEL = MAX_POINTS_PER_GAME_LEVEL;
  public static readonly CHALLENGES_PER_LEVEL = CHALLENGES_PER_LEVEL;

  // The selected game level. null means 'no selection' and causes the view to return to the level-selection UI.
  public readonly stateProperty: Property<BAAGameState>;

  // All the levels in the game
  public readonly levels: GameLevel[];

  // The selected game level. null means 'no selection' and causes the view to return to the level-selection UI.
  public readonly levelProperty: Property<GameLevel | null>;

  // The number of the selected level in the game. Zero means that no level is selected.
  public readonly levelNumberProperty: ReadOnlyProperty<number>;

  // The set of challenges for the current level.
  public readonly challengeSetProperty: Property<Array<BAAGameChallenge>>;

  // TODO: This might go, it's very BCE centric and we use more stateProperty https://github.com/phetsims/build-an-atom/issues/257
  // State of the game. See GameState.ts for documentation of possible state transitions.
  private readonly _gameStateProperty: StringUnionProperty<GameState>;
  public readonly gameStateProperty: TReadOnlyProperty<GameState>;

  // The current challenge in this.challenges, using 1-based index, as shown in the Game status bar.
  public readonly challengeNumberProperty: ReadOnlyProperty<number>;
  private readonly _challengeNumberProperty: Property<number>;

  // Current challenge to be solved
  public readonly challengeProperty: TReadOnlyProperty<BAAGameChallenge>;

  // The score for the current game that is being played.
  public readonly scoreProperty: Property<number>;

  public readonly timer: GameTimer;
  public readonly timerEnabledProperty: Property<boolean>;

  // Whether to provide feedback during the game.
  public readonly provideFeedbackProperty: BooleanProperty;

  // The number of attempts the user has made at solving the current challenge.
  private readonly attemptsProperty: Property<number>;

  // The number of points that were earned for the current challenge.
  public readonly pointsProperty: Property<number>;

  // Whether the time for this game a new best time.
  public isNewBestTime = false;

  public constructor( tandem: Tandem ) {

    // TODO: Potentially legacy code, see https://github.com/phetsims/build-an-atom/issues/257
    this.stateProperty = new Property<BAAGameState>( BAAGameState.CHOOSING_LEVEL, {
      // tandem: tandem.createTandem( 'stateProperty' )
    } );

    this._gameStateProperty = new StringUnionProperty( 'levelSelection', {
      validValues: GameStateValues,
      tandem: tandem.createTandem( 'gameStateProperty' ),
      phetioDocumentation: 'For internal use only.',
      phetioReadOnly: true
    } );
    this.gameStateProperty = this._gameStateProperty;

    this.levels = [
      new GameLevel( this, 0, { tandem: tandem.createTandem( 'gameLevel0' ) } ),
      new GameLevel( this, 1, { tandem: tandem.createTandem( 'gameLevel1' ) } ),
      new GameLevel( this, 2, { tandem: tandem.createTandem( 'gameLevel2' ) } ),
      new GameLevel( this, 3, { tandem: tandem.createTandem( 'gameLevel3' ) } )
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

    this.challengeSetProperty = new Property<Array<BAAGameChallenge>>( [], {
      // tandem: tandem.createTandem( 'challengeSetProperty' )
    } );

    this._challengeNumberProperty = new NumberProperty( 1, {
      numberType: 'Integer',
      range: new Range( 1, Infinity ), // Infinity because ?playAll plays all possible challenges.
      tandem: tandem.createTandem( 'challengeNumberProperty' ),
      phetioDocumentation: 'The challenge number shown in the status bar. Indicates how far the user has progressed through a level.',
      phetioReadOnly: true
    } );
    this.challengeNumberProperty = this._challengeNumberProperty;

    // Consider that this derivation may go through intermediate states when PhET-iO state is restored,
    // depending on the order in which the dependencies are set.
    this.challengeProperty = new DerivedProperty(
      [ this.challengeSetProperty, this.challengeNumberProperty ],
      ( challenges, challengeNumber ) => {
        return ( challenges.length >= challengeNumber ) ? challenges[ challengeNumber - 1 ] : challenges[ 0 ];
      }, {
        // tandem: tandem.createTandem( 'challengeProperty' ),
        // phetioDocumentation: 'The challenge being played.',
        // phetioFeatured: true,
        // phetioValueType:
      } );

    // When the challenge changes, reset it to ensure that coefficients are zero. It may have been previously
    // selected from the pool, and have coefficients from previous game play.
    this.challengeProperty.link( challenge => {
      if ( !isSettingPhetioStateProperty.value ) {
        challenge && challenge.reset();
      }
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

    this.pointsProperty = new NumberProperty( 0, {
      numberType: 'Integer',
      range: new Range( 0, GameLevel.POINTS_FIRST_ATTEMPT ),
      tandem: tandem.createTandem( 'pointsProperty' ),
      phetioDocumentation: 'Points that have been earned for the current challenge.',
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

    this.provideFeedbackProperty = new BooleanProperty( true, {
      tandem: tandem.createTandem( 'provideFeedbackProperty' )
    } );

    this.timerEnabledProperty.lazyLink( timerEnabled => {
      for ( let i = 0; i < ShredConstants.LEVEL_NAMES.length; i++ ) {
        this.levels[ i ].bestTimeVisibleProperty.value = timerEnabled && this.levels[ i ].achievedPerfectScore();
      }
    } );

    this.levelProperty.lazyLink( level => {
      if ( !isSettingPhetioStateProperty.value ) {
        level ? this.startGame() : this.startOver();
      }
    } );

    this.challengeSetProperty.lazyLink( () => {
      if ( !isSettingPhetioStateProperty.value ) {
        // This is to trigger the change below in stateProperty but should be temporary
        this._challengeNumberProperty.value = 1;
        this._challengeNumberProperty.notifyListenersStatic();
      }
    } );

    this._challengeNumberProperty.lazyLink( challengeNumber => {
      const challenge = this.challengeSetProperty.value[ challengeNumber - 1 ];
      if ( challenge ) {
        this.stateProperty.value = challenge;
      }
    } );

  }

  /**
   * Convenience method for setting the game state.
   */
  private setGameState( value: GameState ): void {
    this._gameStateProperty.value = value;
  }

  /**
   * Called before the first challenge has been played.
   */
  private startGame(): void {

    const level = this.levelProperty.value!;
    assert && assert( level );

    this.resetToStart();

    // Create a set of challenges.
    this.challengeSetProperty.value = level.getChallenges();

    // Start the timer.
    if ( this.timerEnabledProperty.value ) {
      this.timer.start();
    }

    this.setGameState( 'check' );
  }

  /**
   * Called after the last challenge has been played.
   */
  private endGame(): void {

    this.timer.stop();

    const level = this.levelProperty.value!;
    assert && assert( level );

    const points = this.scoreProperty.value;

    // Check for new best score.
    if ( points > level.bestScoreProperty.value ) {
      level.bestScoreProperty.value = points;
    }

    // Check for new best time.
    const previousBestTime = level.bestTimeProperty.value;
    if ( level.isPerfectScore( points ) && ( previousBestTime === 0 || this.timer.elapsedTimeProperty.value < previousBestTime ) ) {
      this.isNewBestTime = true;
      level.bestTimeProperty.value = this.timer.elapsedTimeProperty.value;
    }
  }


  /**
   * Called when the user presses the "Check" button.
   */
  public check(): void {
    this.attemptsProperty.value++;

    if ( this.attemptsProperty.value < 2 ) {
      // award points
      if ( this.attemptsProperty.value === 1 ) {
        this.pointsProperty.value = GameLevel.POINTS_FIRST_ATTEMPT;
      }
      else if ( this.attemptsProperty.value === 2 ) {
        this.pointsProperty.value = GameLevel.POINTS_SECOND_ATTEMPT;
      }
      else {
        this.pointsProperty.value = 0;
      }
      this.scoreProperty.value += this.pointsProperty.value;
      this.setGameState( 'next' );

      if ( this.isLastChallenge() ) {
        this.endGame();
      }
    }
    else {
      if ( this.isLastChallenge() ) {
        this.endGame();
      }
      this.setGameState( 'showAnswer' );
    }
  }

  public isLastChallenge(): boolean {
    return this.challengeNumberProperty.value === this.challengeSetProperty.value.length;
  }

  /**
   * Called when the user presses the "Try Again" button.
   */
  public tryAgain(): void {
    this.setGameState( 'check' );
  }

  /**
   * Called when the user presses the "Show Answer" button.
   */
  public showAnswer(): void {
    this.setGameState( 'next' );
  }

  /**
   * Called when the user presses the "Next" button.
   */
  public next(): void {
    if ( !this.isLastChallenge() ) {
      this.attemptsProperty.value = 0;
      this.pointsProperty.value = 0;
      this._challengeNumberProperty.value++;
      this.setGameState( 'check' );
    }
    else {
      this.setGameState( 'levelCompleted' );
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
    this.setGameState( 'levelSelection' );
    this.stateProperty.set( BAAGameState.CHOOSING_LEVEL );
    this.challengeSetProperty.value = [];
  }

  /**
   * Does a full reset of the Game model.
   */
  public reset(): void {
    this.resetToStart();
    this.levels.forEach( level => level.reset() );
    this.levelProperty.reset();
    this._gameStateProperty.reset();
    this._challengeNumberProperty.reset();
    this.timerEnabledProperty.reset();
  }

  /**
   * Resets only the things that should be reset when a game is started, or when in the 'levelSelection' game state.
   */
  private resetToStart(): void {
    this.isNewBestTime = false;
    this.attemptsProperty.reset();
    this.pointsProperty.reset();
    this.scoreProperty.reset();
    this.timer.reset();
  }

}

buildAnAtom.register( 'GameModel', GameModel );
export default GameModel;