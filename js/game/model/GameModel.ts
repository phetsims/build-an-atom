// Copyright 2013-2025, University of Colorado Boulder

/**
 * Primary model class for the Build an Atom Game tab.
 *
 * @author John Blanco
 */

import BooleanProperty from '../../../../axon/js/BooleanProperty.js';
import Emitter from '../../../../axon/js/Emitter.js';
import NumberProperty from '../../../../axon/js/NumberProperty.js';
import Property from '../../../../axon/js/Property.js';
import { TEmitterListener } from '../../../../axon/js/TEmitter.js';
import merge from '../../../../phet-core/js/merge.js';
import NumberAtom, { TNumberAtom } from '../../../../shred/js/model/NumberAtom.js';
import ShredConstants, { Level } from '../../../../shred/js/ShredConstants.js';
import PhetioObject from '../../../../tandem/js/PhetioObject.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import ArrayIO from '../../../../tandem/js/types/ArrayIO.js';
import ObjectLiteralIO from '../../../../tandem/js/types/ObjectLiteralIO.js';
import buildAnAtom from '../../buildAnAtom.js';
import BAAQueryParameters from '../../common/BAAQueryParameters.js';
import { NeutralOrIon } from '../view/ToElementChallengeView.js';
import BAAGameChallenge from './BAAGameChallenge.js';
import BAAGameState from './BAAGameState.js';
import ChallengeSetFactory from './ChallengeSetFactory.js';

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

type ChallengeSpec = {
  challengeType: string; // The type of challenge, e.g. 'schematic-to-element', 'counts-to-mass', etc.
  numberAtom: {
    protonCount: number;
    neutronCount: number;
    electronCount: number;
  };
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

class GameModel extends PhetioObject {

  public readonly stateProperty: Property<BAAGameState>;
  public readonly timerEnabledProperty: BooleanProperty;
  public readonly levelProperty: NumberProperty;
  public readonly challengeSetProperty: Property<Array<BAAGameChallenge>>;
  public readonly challengeIndexProperty: NumberProperty;
  public readonly scoreProperty: NumberProperty; // Score on current game level.
  public readonly elapsedTimeProperty: Property<number>; // Elapsed time in seconds.
  public readonly provideFeedbackProperty: BooleanProperty; // Whether to provide feedback during the game.
  public readonly bestScores: Array<Property<number>>; // Properties that track progress on each game level.
  public readonly scores: Array<Property<number>>; // Properties that track score at each game level
  public readonly bestTimes: Array<Property<number | null>>; // Best times at each level.
  public readonly bestTimeVisible: Array<Property<boolean>>; // Properties that track whether to show best time at each game level.
  public readonly checkAnswerEmitter: Emitter<[ChallengeResult]>; // Emitter for check answer events.
  public readonly levelCompletedEmitter: Emitter<[ LevelResult ]>; // Emitter for level completed events.
  public readonly challengeSetGroupTandem: Tandem; // Tandem for the group of challenges.
  public readonly numberAtomGroupTandem: Tandem; // Tandem for the group of NumberAtoms.
  public newBestTime: boolean; // Flag set to indicate new best time, cleared each time a level is started.
  public allowedChallengeTypesByLevel: Array<Array<string>>; // Allowed challenge types for each level.
  public stepListeners: Array<( dt: number ) => void>; // Set of external functions that the model will step.
  public predeterminedChallenges: Array<Array<BAAGameChallenge>>; // Challenges that will be used instead of randomly generated ones.

  public static readonly MAX_POINTS_PER_GAME_LEVEL = MAX_POINTS_PER_GAME_LEVEL;
  public static readonly CHALLENGES_PER_LEVEL = CHALLENGES_PER_LEVEL;

  // TODO: CHeck this for PhETIO, implement real PhET-iO - https://github.com/phetsims/build-an-atom/issues/241
  // public static readonly GameModelIO = new IOType( 'GameModelIO', {
  //   valueType: GameModel,
  //   documentation: 'The model for the Game',
  //   methods: {
  //
  //     startGameLevel: {
  //       returnType: VoidIO,
  //       parameterTypes: [ StringIO ],
  //       implementation: function( levelType ) {
  //         this.startGameLevel( levelType );
  //       },
  //       documentation: 'Start one of the following games: periodic-table-game, mass-and-charge-game, symbol-game, advanced-symbol-game',
  //       invocableForReadOnlyElements: false
  //     },
  //
  //     setChallenges: {
  //       returnType: VoidIO,
  //       parameterTypes: [ ArrayIO( ArrayIO( ObjectLiteralIO ) ) ],
  //       implementation: function( challenges ) {
  //         this.setChallenges( challenges );
  //       },
  //       documentation: 'Specify exact challenges',
  //       invocableForReadOnlyElements: false
  //     },
  //
  //     setAllowedChallengeTypesByLevel: {
  //       returnType: VoidIO,
  //       parameterTypes: [ ArrayIO( ArrayIO( StringIO ) ) ],
  //
  //       //TODO https://github.com/phetsims/build-an-atom/issues/240 change this to take index as 1st argument (for level index)
  //       implementation: function( allowedChallengeTypesByLevel ) {
  //         this.setAllowedChallengeTypesByLevel( allowedChallengeTypesByLevel );
  //       },
  //
  //       documentation: 'Specify which challenge types may be presented to the user for each level.',
  //       invocableForReadOnlyElements: false
  //       // The default value is [
  //       //    [ 'schematic-to-element', 'counts-to-element' ],
  //       //    [ 'counts-to-charge', 'counts-to-mass', 'schematic-to-charge', 'schematic-to-mass' ],
  //       //    [ 'schematic-to-symbol-charge', 'schematic-to-symbol-mass-number', 'schematic-to-symbol-proton-count', 'counts-to-symbol-charge', 'counts-to-symbol-mass' ],
  //       //    [ 'schematic-to-symbol-all', 'symbol-to-schematic', 'symbol-to-counts', 'counts-to-symbol-all' ]
  //       //  ]
  //     }
  //   }
  // } );

  public constructor( tandem: Tandem ) {

    super( {
      // phetioType: GameModel.GameModelIO,
      tandem: tandem,
      phetioState: false
    } );

    this.allowedChallengeTypesByLevel = [
      [ 'schematic-to-element', 'counts-to-element' ],
      [ 'counts-to-charge', 'counts-to-mass', 'schematic-to-charge', 'schematic-to-mass' ],
      [ 'schematic-to-symbol-charge', 'schematic-to-symbol-mass-number', 'schematic-to-symbol-proton-count', 'counts-to-symbol-charge', 'counts-to-symbol-mass' ],
      [ 'schematic-to-symbol-all', 'symbol-to-schematic', 'symbol-to-counts', 'counts-to-symbol-all' ]
    ];

    this.stateProperty = new Property( BAAGameState.CHOOSING_LEVEL, {
      phetioValueType: BAAGameState.BAAGameStateIO,
      tandem: tandem.createTandem( 'stateProperty' )
    } );

    this.timerEnabledProperty = new BooleanProperty( false, {
      tandem: tandem.createTandem( 'timerEnabledProperty' )
    } );

    this.levelProperty = new NumberProperty( 0, {
      tandem: tandem.createTandem( 'levelProperty' ),
      numberType: 'Integer',
      phetioReadOnly: true
    } );

    this.challengeSetProperty = new Property( [] as BAAGameChallenge[], {
      tandem: tandem.createTandem( 'challengeSetProperty' ),
      phetioValueType: ArrayIO( BAAGameChallenge.BAAGameChallengeIO )
    } );

    this.challengeIndexProperty = new NumberProperty( 0, {
      tandem: tandem.createTandem( 'challengeIndexProperty' )
    } );

    this.scoreProperty = new NumberProperty( 0, {
      tandem: tandem.createTandem( 'scoreProperty' )
    } ); // Score on current game level.

    this.elapsedTimeProperty = new Property( 0 );

    this.provideFeedbackProperty = new BooleanProperty( true, {
      tandem: tandem.createTandem( 'provideFeedbackProperty' )
    } );

    this.stepListeners = [];

    this.levelCompletedEmitter = new Emitter( {
      tandem: tandem.createTandem( 'levelCompletedEmitter' ),
      parameters: [ { name: 'results', phetioType: ObjectLiteralIO } ]
    } );

    this.bestScores = []; // Properties that track progress on each game level.
    this.scores = []; // Properties that track score at each game level
    this.bestTimeVisible = []; // Properties that track whether to show best time at each game level
    this.bestTimes = []; // Best times at each level.
    _.times( ShredConstants.LEVEL_NAMES.length, () => {
      this.bestScores.push( new Property( 0 ) );
      this.scores.push( new Property( 0 ) );
      this.bestTimes.push( new Property<number | null>( null ) );
      this.bestTimeVisible.push( new Property( false ) );
    } );

    this.timerEnabledProperty.lazyLink( timerEnabled => {
      for ( let i = 0; i < ShredConstants.LEVEL_NAMES.length; i++ ) {
        this.bestTimeVisible[ i ].value = timerEnabled && this.scores[ i ].value === MAX_POINTS_PER_GAME_LEVEL;
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

  // TODO: Implement Tandem for the challenges, see https://github.com/phetsims/build-an-atom/issues/185
  public startGameLevel( levelName: Level, tandem?: Tandem ): void {
    this.levelProperty.set( ShredConstants.MAP_LEVEL_NAME_TO_NUMBER( levelName ) );
    this.challengeIndexProperty.set( 0 );

    // TODO: Commented out due to problems related to phet-io, see https://github.com/phetsims/build-an-atom/issues/185
    // assert && assert( this.challengeSetProperty.get().length === 0, 'challenges should be cleared before starting a new game' );

    // Use the predetermined challenges (if specified by phet-io) or generate a random challenge for the given level
    const challengeSet = this.predeterminedChallenges[ this.levelProperty.get() ] || ChallengeSetFactory.generate(
      this.levelProperty.get(),
      CHALLENGES_PER_LEVEL,
      this,
      this.allowedChallengeTypesByLevel,
      Tandem.OPT_OUT
    );
    this.challengeSetProperty.set( challengeSet );
    this.scoreProperty.set( 0 );
    this.newBestTime = false;
    this.bestTimeVisible[ this.levelProperty.get() ].value = false;
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
    const level = this.levelProperty.get();
    if ( this.challengeSetProperty.get().length > this.challengeIndexProperty.get() + 1 ) {
      // Next challenge.
      this.challengeIndexProperty.set( this.challengeIndexProperty.get() + 1 );
      this.stateProperty.set( this.challengeSetProperty.get()[ this.challengeIndexProperty.get() ] );
    }
    else {
      // Game level completed - update score and state.
      if ( this.scoreProperty.get() > this.bestScores[ level ].value ) {
        this.bestScores[ level ].value = this.scoreProperty.get();
      }
      if ( this.timerEnabledProperty.get() && this.scoreProperty.get() === MAX_POINTS_PER_GAME_LEVEL &&
           ( this.bestTimes[ level ].value === null || this.elapsedTimeProperty.get() < this.bestTimes[ level ].value ) ) {
        this.newBestTime = this.bestTimes[ level ].value !== null; // Don't set this flag for the first 'best time', only when the time improves.
        this.bestTimes[ level ].value = this.elapsedTimeProperty.get();
      }

      if ( this.scoreProperty.get() === MAX_POINTS_PER_GAME_LEVEL && this.timerEnabledProperty.get() ) {
        this.bestTimeVisible[ level ].value = true;
      }

      this.scores[ level ].value = this.scoreProperty.get();

      // When the game is complete, send notification that can be used by phet-io
      this.levelCompletedEmitter.emit( {
        level: level,
        maxPoints: MAX_POINTS_PER_GAME_LEVEL,
        challenges: CHALLENGES_PER_LEVEL,
        timerEnabled: this.timerEnabledProperty.get(),
        elapsedTime: this.elapsedTimeProperty.get(),
        bestTime: this.bestTimes[ level ].value!,
        newBestTime: this.newBestTime
      } );

      this.stateProperty.set( BAAGameState.LEVEL_COMPLETED );
    }
  }

  public reset(): void {
    this.stateProperty.reset();
    this.timerEnabledProperty.reset();
    this.levelProperty.reset();
    this.challengeSetProperty.reset();
    this.challengeIndexProperty.reset();
    this.scoreProperty.reset();
    this.elapsedTimeProperty.reset();
    this.bestScores.forEach( bestScoreProperty => { bestScoreProperty.reset(); } );
    this.scores.forEach( scoreProperty => { scoreProperty.reset(); } );
    this.bestTimes.forEach( bestTimeProperty => { bestTimeProperty.reset(); } );
    this.bestTimeVisible.forEach( bestTimeVisibleProperty => { bestTimeVisibleProperty.reset(); } );
  }

  public addStepListener( stepListener: TEmitterListener<[ number ]> ): void {
    this.stepListeners.push( stepListener );
  }

  public removeStepListener( stepListener: TEmitterListener<[ number ]> ): void {
    this.stepListeners = _.without( this.stepListeners, stepListener );
  }

  // Set the allowed challenge types to customize for phet-io
  public setAllowedChallengeTypesByLevel( allowedChallengeTypesByLevel: Array<Array<string>> ): void {
    this.allowedChallengeTypesByLevel = allowedChallengeTypesByLevel;
  }

  public setChallenges( challengeSpecsForLevels: Array<Array<ChallengeSpec>> ): void {
    this.predeterminedChallenges = challengeSpecsForLevels.map( levelSpec => levelSpec.map( challengeSpec => ChallengeSetFactory.createChallenge( this, challengeSpec.challengeType, new NumberAtom( {
      protonCount: challengeSpec.numberAtom.protonCount,
      neutronCount: challengeSpec.numberAtom.neutronCount,
      electronCount: challengeSpec.numberAtom.electronCount,
      tandem: Tandem.OPT_OUT
    } ), Tandem.OPT_OUT ) ) );
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

}

buildAnAtom.register( 'GameModel', GameModel );
export default GameModel;