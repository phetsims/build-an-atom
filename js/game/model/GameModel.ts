// Copyright 2013-2025, University of Colorado Boulder

/**
 * Primary model class for the Build an Atom Game tab.
 *
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

  public readonly levels: GameLevel[];

  // The selected game level. null means 'no selection' and causes the view to return to the level-selection UI.
  public readonly levelProperty: Property<GameLevel | null>;

  // Number of the game level that the user is playing. Uses 1-based numbering. Zero means no level is currently being played.
  public readonly levelNumberProperty: ReadOnlyProperty<number>;

  // State of the game. See GameState.ts for documentation of possible state transitions.
  // private readonly _gameStateProperty: StringUnionProperty<GameState>;
  // public readonly gameStateProperty: TReadOnlyProperty<GameState>;

  // The score for the current game that is being played.
  public readonly scoreProperty: Property<number>;

  // State of the game. See GameState.ts for documentation of possible state transitions.
  private readonly _gameStateProperty: StringUnionProperty<GameState>;
  public readonly gameStateProperty: TReadOnlyProperty<GameState>;

  // The current challenge in this.challenges, using 1-based index, as shown in the Game status bar.
  public readonly challengeNumberProperty: ReadOnlyProperty<number>;
  private readonly _challengeNumberProperty: Property<number>;

  // Current challenge to be solved
  public readonly challengeProperty: TReadOnlyProperty<BAAGameChallenge>;

  // The selected game level. null means 'no selection' and causes the view to return to the level-selection UI.
  public readonly stateProperty: Property<BAAGameState>;
  public readonly challengeSetProperty: Property<Array<BAAGameChallenge>>;
  public readonly challengeIndexProperty: NumberProperty;

  // Elapsed time in seconds.
  public readonly elapsedTimeProperty: Property<number>;

  // Whether to provide feedback during the game.
  public readonly provideFeedbackProperty: BooleanProperty;

  // Tandem for the group of challenges.
  public readonly challengeSetGroupTandem: Tandem;

  // Tandem for the group of NumberAtoms.
  public readonly numberAtomGroupTandem: Tandem;

  // Flag set to indicate new best time, cleared each time a level is started.
  public newBestTime: boolean;

  // Set of external functions that the model will step.
  public stepListeners: Array<( dt: number ) => void>;

  public readonly timer: GameTimer;
  public readonly timerEnabledProperty: Property<boolean>;

  // The number of attempts the user has made at solving the current challenge.
  private readonly attemptsProperty: Property<number>;

  // The number of points that were earned for the current challenge.
  public readonly pointsProperty: Property<number>;

  public static readonly MAX_POINTS_PER_GAME_LEVEL = MAX_POINTS_PER_GAME_LEVEL;
  public static readonly CHALLENGES_PER_LEVEL = CHALLENGES_PER_LEVEL;

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

    this.challengeSetProperty = new Property<Array<BAAGameChallenge>>( this.levels[ 0 ].getChallenges(), {
      // tandem: tandem.createTandem( 'challengeSetProperty' )
    } );

    this.challengeSetProperty.lazyLink( () => {
      if ( !isSettingPhetioStateProperty.value ) {
        this._challengeNumberProperty.value = 1;
      }
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
    this.challengeProperty = new DerivedProperty( [ this.challengeSetProperty, this.challengeNumberProperty ],
      ( challenges, challengeNumber ) => ( challengeNumber >= 1 && challenges.length >= challengeNumber ) ? challenges[ challengeNumber - 1 ] : challenges[ 0 ], {
        // tandem: tandem.createTandem( 'challengeProperty' ),
        // phetioDocumentation: 'The challenge being played.',
        // phetioFeatured: true,
        // phetioValueType:
      } );
    phet.log && this.challengeProperty.lazyLink( challenge => phet.log( `Playing ${challenge.tandem.name}, ${challenge.name}` ) );

    // When the challenge changes, reset it to ensure that coefficients are zero. It may have been previously
    // selected from the pool, and have coefficients from previous game play.
    this.challengeProperty.link( challenge => {
      if ( !isSettingPhetioStateProperty.value ) {
        challenge.reset();
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

    this.challengeIndexProperty = new NumberProperty( 0, {
      tandem: tandem.createTandem( 'challengeIndexProperty' ),
      range: new Range( 0, CHALLENGES_PER_LEVEL - 1 ),
      phetioDocumentation: 'The index of the current challenge within the level.',
      phetioReadOnly: true
    } );

    this.scoreProperty = new NumberProperty( 0, {
      tandem: tandem.createTandem( 'scoreProperty' ),
      phetioDocumentation: 'Score on current game level.',
      range: new Range( 0, MAX_POINTS_PER_GAME_LEVEL )
    } );

    this.elapsedTimeProperty = new NumberProperty( 0, {
      tandem: tandem.createTandem( 'elapsedTimeProperty' ),
      range: new Range( 0, Number.POSITIVE_INFINITY )
    } );

    this.provideFeedbackProperty = new BooleanProperty( true, {
      tandem: tandem.createTandem( 'provideFeedbackProperty' )
    } );

    this.stepListeners = [];

    this.timerEnabledProperty.lazyLink( timerEnabled => {
      for ( let i = 0; i < ShredConstants.LEVEL_NAMES.length; i++ ) {
        this.levels[ i ].bestTimeVisibleProperty.value = timerEnabled && this.levels[ i ].achievedPerfectScore();
      }
    } );

    // Flag set to indicate new best time, cleared each time a level is started.
    this.newBestTime = false;

    this.challengeSetGroupTandem = Tandem.OPT_OUT;

    this.numberAtomGroupTandem = Tandem.OPT_OUT;
  }

  public step( dt: number ): void {

    // Increment the game timer if running.  Note that this assumes that dt is not clamped, because we want it to
    // essentially continue running if the user switches tabs or hides the browser.
    if ( this.timerEnabledProperty.get() &&
         this.stateProperty.get() !== BAAGameState.CHOOSING_LEVEL &&
         this.stateProperty.get() !== BAAGameState.LEVEL_COMPLETED ) {

      this.elapsedTimeProperty.set( this.elapsedTimeProperty.get() + dt );
    }

    // Step the current challenge if it has any time-driven behavior.
    this.stateProperty.get().step( dt );

    // Step any external functions that need it.
    this.stepListeners.forEach( stepListener => { stepListener( dt ); } );
  }

  public startGameLevel( levelNumber: number, tandem?: Tandem ): void {
    this.levelProperty.set( this.levels[ levelNumber ] );
    this.challengeIndexProperty.set( 0 );

    // TODO: Commented out due to problems related to phet-io, see https://github.com/phetsims/build-an-atom/issues/185
    // assert && assert( this.challengeSetProperty.get().length === 0, 'challenges should be cleared before starting a new game' );

    const challengeSet = this.levels[ levelNumber ].getChallenges();
    this.challengeSetProperty.set( challengeSet );
    this.scoreProperty.set( 0 );
    this.newBestTime = false;
    this.levels[ this.levelNumberProperty.get() ].bestTimeVisibleProperty.value = false;
    this.elapsedTimeProperty.reset();
    if ( this.challengeSetProperty.get().length > 0 ) {
      this.stateProperty.set( this.challengeSetProperty.get()[ 0 ] );
    }
    else {
      this.stateProperty.set( BAAGameState.LEVEL_COMPLETED );
    }
  }

  public newGame(): void {
    this.stateProperty.set( BAAGameState.CHOOSING_LEVEL );
    this.scoreProperty.set( 0 );

    // (phet-io) Dispose old challenges before setting the property again.
    this.challengeSetProperty.get().forEach( challenge => {
      ( !challenge.isDisposed ) && challenge.dispose();
    } );
    this.challengeSetProperty.get().length = 0;
  }

  public next(): void {
    const level = this.levelNumberProperty.get();
    if ( this.challengeSetProperty.get().length > this.challengeIndexProperty.get() + 1 ) {
      // Next challenge.
      this.challengeIndexProperty.set( this.challengeIndexProperty.get() + 1 );
      this.stateProperty.set( this.challengeSetProperty.get()[ this.challengeIndexProperty.get() ] );
    }
    else {
      // Game level completed - update score and state.
      if ( this.scoreProperty.get() > this.levels[ level ].bestScoreProperty.value ) {
        this.levels[ level ].bestScoreProperty.value = this.scoreProperty.get();
      }
      if ( this.timerEnabledProperty.get() && this.scoreProperty.get() === MAX_POINTS_PER_GAME_LEVEL &&
           ( this.levels[ level ].bestTimeProperty.value === null || this.elapsedTimeProperty.get() < this.levels[ level ].bestTimeProperty.value ) ) {
        this.newBestTime = this.levels[ level ].bestTimeProperty.value !== null; // Don't set this flag for the first 'best time', only when the time improves.
        this.levels[ level ].bestTimeProperty.value = this.elapsedTimeProperty.get();
      }

      if ( this.scoreProperty.get() === MAX_POINTS_PER_GAME_LEVEL && this.timerEnabledProperty.get() ) {
        this.levels[ level ].bestTimeVisibleProperty.value = true;
      }

      this.stateProperty.set( BAAGameState.LEVEL_COMPLETED );
    }
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
  /**
   * Convenience method for setting the game state.
   */
  private setGameState( value: GameState ): void {
    this._gameStateProperty.value = value;
  }

}

buildAnAtom.register( 'GameModel', GameModel );
export default GameModel;