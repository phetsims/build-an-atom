// Copyright 2013-2025, University of Colorado Boulder

/**
 * Primary model class for the Build an Atom Game tab.
 *
 * @author John Blanco
 */

import BooleanProperty from '../../../../axon/js/BooleanProperty.js';
import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import Emitter from '../../../../axon/js/Emitter.js';
import NumberProperty from '../../../../axon/js/NumberProperty.js';
import Property from '../../../../axon/js/Property.js';
import ReadOnlyProperty from '../../../../axon/js/ReadOnlyProperty.js';
import Range from '../../../../dot/js/Range.js';
import TModel from '../../../../joist/js/TModel.js';
import merge from '../../../../phet-core/js/merge.js';
import { TNumberAtom } from '../../../../shred/js/model/NumberAtom.js';
import ShredConstants from '../../../../shred/js/ShredConstants.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import NullableIO from '../../../../tandem/js/types/NullableIO.js';
import NumberIO from '../../../../tandem/js/types/NumberIO.js';
import ObjectLiteralIO from '../../../../tandem/js/types/ObjectLiteralIO.js';
import buildAnAtom from '../../buildAnAtom.js';
import { ChallengeType } from '../../common/BAAConstants.js';
import BAAQueryParameters from '../../common/BAAQueryParameters.js';
import { NeutralOrIon } from '../view/ToElementChallengeView.js';
import BAAGameChallenge from './BAAGameChallenge.js';
import BAAGameState from './BAAGameState.js';
import GameLevel from './GameLevel.js';

// constants
const CHALLENGES_PER_LEVEL = BAAQueryParameters.challengesPerLevel;
const POSSIBLE_POINTS_PER_CHALLENGE = 2;
const MAX_POINTS_PER_GAME_LEVEL = CHALLENGES_PER_LEVEL * POSSIBLE_POINTS_PER_CHALLENGE;

type LevelResult = {
  level: number;
  maxPoints: number;
  challenges: number;
  timerEnabled: boolean;
  elapsedTime: number;
  bestTime: number;
  newBestTime: boolean;
};

export type ChallengeResult = {
  isCorrect: boolean; // Whether the answer was correct.
  points: number; // Points awarded for the answer.
  correctProtonCount: number; // The correct proton count.
  correctNeutronCount: number; // The correct neutron count.
  correctElectronCount: number; // The correct electron count.
  submittedProtonCount: number; // The proton count submitted by the user.
  submittedNeutronCount: number; // The neutron count submitted by the user.
  submittedElectronCount: number; // The electron count submitted by the user.
} & IonChallengeResult;

export type IonChallengeResult = {
  correctCharge?: NeutralOrIon;
  submittedCharge?: NeutralOrIon;
};

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

  // The selected game level. null means 'no selection' and causes the view to return to the level-selection UI.
  public readonly stateProperty: Property<BAAGameState>;
  public readonly challengeSetProperty: Property<Array<BAAGameChallenge>>;
  public readonly challengeIndexProperty: NumberProperty;

  // Wether the timer is enabled
  public readonly timerEnabledProperty: Property<boolean>;

  // Elapsed time in seconds.
  public readonly elapsedTimeProperty: Property<number>;

  // Whether to provide feedback during the game.
  public readonly provideFeedbackProperty: BooleanProperty;

  // Emitter for check answer events.
  public readonly checkAnswerEmitter: Emitter<[ ChallengeResult ]>;

  // Emitter for level completed events.
  public readonly levelCompletedEmitter: Emitter<[ LevelResult ]>;

  // Tandem for the group of challenges.
  public readonly challengeSetGroupTandem: Tandem;

  // Tandem for the group of NumberAtoms.
  public readonly numberAtomGroupTandem: Tandem;

  // Flag set to indicate new best time, cleared each time a level is started.
  public newBestTime: boolean;

  // Allowed challenge types for each level.
  public allowedChallengeTypesByLevel: Array<Array<ChallengeType>>;

  // Set of external functions that the model will step.
  public stepListeners: Array<( dt: number ) => void>;

  // Challenges that will be used instead of randomly generated ones.
  public predeterminedChallenges: Array<Array<BAAGameChallenge>>;

  public static readonly MAX_POINTS_PER_GAME_LEVEL = MAX_POINTS_PER_GAME_LEVEL;
  public static readonly CHALLENGES_PER_LEVEL = CHALLENGES_PER_LEVEL;

  public constructor( tandem: Tandem ) {

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

    this.allowedChallengeTypesByLevel = [
      [ 'schematic-to-element', 'counts-to-element' ],
      [ 'counts-to-charge', 'counts-to-mass', 'schematic-to-charge', 'schematic-to-mass' ],
      [ 'schematic-to-symbol-charge', 'schematic-to-symbol-mass-number', 'schematic-to-symbol-proton-count', 'counts-to-symbol-charge', 'counts-to-symbol-mass' ],
      [ 'schematic-to-symbol-all', 'symbol-to-schematic', 'symbol-to-counts', 'counts-to-symbol-all' ]
    ];

    this.stateProperty = new Property<BAAGameState>( BAAGameState.CHOOSING_LEVEL, {
      // tandem: tandem.createTandem( 'stateProperty' )
    } );

    this.timerEnabledProperty = new BooleanProperty( false, {
      tandem: tandem.createTandem( 'timerEnabledProperty' )
    } );

    this.challengeSetProperty = new Property<Array<BAAGameChallenge>>( [] as BAAGameChallenge[], {
      // tandem: tandem.createTandem( 'challengeSetProperty' )
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

    this.levelCompletedEmitter = new Emitter( {
      tandem: tandem.createTandem( 'levelCompletedEmitter' ),
      parameters: [ { name: 'results', phetioType: ObjectLiteralIO } ]
    } );

    this.timerEnabledProperty.lazyLink( timerEnabled => {
      for ( let i = 0; i < ShredConstants.LEVEL_NAMES.length; i++ ) {
        this.levels[ i ].bestTimeVisibleProperty.value = timerEnabled && this.levels[ i ].achievedPerfectScore();
      }
    } );

    // Flag set to indicate new best time, cleared each time a level is started.
    this.newBestTime = false;

    this.checkAnswerEmitter = new Emitter( {
      tandem: tandem.createTandem( 'checkAnswerEmitter' ),
      parameters: [ { name: 'result', phetioType: ObjectLiteralIO } ]
    } );

    this.challengeSetGroupTandem = Tandem.OPT_OUT;

    this.numberAtomGroupTandem = Tandem.OPT_OUT;

    // be used instead of randomly generated
    this.predeterminedChallenges = [];
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

    // Use the predetermined challenges (if specified by phet-io) or generate a random challenge for the given level
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

      // When the game is complete, send notification that can be used by phet-io
      this.levelCompletedEmitter.emit( {
        level: level,
        maxPoints: MAX_POINTS_PER_GAME_LEVEL,
        challenges: CHALLENGES_PER_LEVEL,
        timerEnabled: this.timerEnabledProperty.get(),
        elapsedTime: this.elapsedTimeProperty.get(),
        bestTime: this.levels[ level ].bestTimeProperty.value,
        newBestTime: this.newBestTime
      } );

      this.stateProperty.set( BAAGameState.LEVEL_COMPLETED );
    }
  }

  public emitCheckAnswer( isCorrect: boolean, points: number, answerAtom: TNumberAtom, submittedAtom: TNumberAtom, extension?: IonChallengeResult ): void {
    const arg: ChallengeResult = {
      isCorrect: isCorrect,

      correctProtonCount: answerAtom.protonCountProperty.get(),
      correctNeutronCount: answerAtom.neutronCountProperty.get(),
      correctElectronCount: answerAtom.electronCountProperty.get(),

      submittedProtonCount: submittedAtom.protonCountProperty.get(),
      submittedNeutronCount: submittedAtom.neutronCountProperty.get(),
      submittedElectronCount: submittedAtom.electronCountProperty.get(),

      points: points
    };
    this.checkAnswerEmitter.emit( merge( arg, extension ) );
  }

  /**
   * Does a full reset of the Game model.
   */
  public reset(): void {
    this.levels.forEach( level => level.reset() );
    this.levelProperty.reset();
    this.timerEnabledProperty.reset();
    this.stateProperty.reset();
    this.timerEnabledProperty.reset();
    this.levelProperty.reset();
    this.challengeSetProperty.reset();
    this.challengeIndexProperty.reset();
    this.scoreProperty.reset();
    this.elapsedTimeProperty.reset();
  }

}

buildAnAtom.register( 'GameModel', GameModel );
export default GameModel;