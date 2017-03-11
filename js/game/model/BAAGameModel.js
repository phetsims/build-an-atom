// Copyright 2016, University of Colorado Boulder

/**
 * Primary model class for the Build an Atom Game tab.
 *
 * @author John Blanco
 */
define( function( require ) {
  'use strict';

  // modules
  var Property = require( 'AXON/Property' );
  var inherit = require( 'PHET_CORE/inherit' );
  var ProblemSetFactory = require( 'BUILD_AN_ATOM/game/model/ProblemSetFactory' );
  var ShredConstants = require( 'SHRED/ShredConstants' );
  var buildAnAtom = require( 'BUILD_AN_ATOM/buildAnAtom' );
  var TandemEmitter = require( 'TANDEM/axon/TandemEmitter' );

  // phet-io modules
  var TBoolean = require( 'ifphetio!PHET_IO/types/TBoolean' );
  var TNumber = require( 'ifphetio!PHET_IO/types/TNumber' );
  var TObject = require( 'ifphetio!PHET_IO/types/TObject' );
  var TBAAGameModel = require( 'ifphetio!PHET_IO/simulations/build-an-atom/TBAAGameModel' );

  // constants
  var PROBLEMS_PER_LEVEL = 5;
  var POSSIBLE_POINTS_PER_PROBLEM = 2;
  var MAX_POINTS_PER_GAME_LEVEL = PROBLEMS_PER_LEVEL * POSSIBLE_POINTS_PER_PROBLEM;

  /**
   * main constructor function for the game model
   * {Tandem} tandem
   * @constructor
   */
  function BAAGameModel( tandem ) {

    var self = this;

    // @private (phet-io), phet-io can set this value to customize which levels are presented
    this.allowedProblemTypesByLevel = [
      [ 'schematic-to-element', 'counts-to-element' ],
      [ 'counts-to-charge', 'counts-to-mass', 'schematic-to-charge', 'schematic-to-mass' ],
      [ 'schematic-to-symbol-charge', 'schematic-to-symbol-mass-number', 'schematic-to-symbol-proton-count', 'counts-to-symbol-charge', 'counts-to-symbol-mass' ],
      [ 'schematic-to-symbol-all', 'symbol-to-schematic', 'symbol-to-counts', 'counts-to-symbol-all' ]
    ];

    this.stateProperty = new Property( 'selectGameLevel' ); // Current state of the game.  Each problem is a unique state.
    this.soundEnabledProperty = new Property( true, {
      tandem: tandem.createTandem( 'soundEnabledProperty' ),
      phetioValueType: TBoolean
    } );
    this.timerEnabledProperty = new Property( false, {
      tandem: tandem.createTandem( 'timerEnabledProperty' ),
      phetioValueType: TBoolean
    } );
    this.levelProperty = new Property( 0, {
      tandem: tandem.createTandem( 'levelProperty' ),
      phetioValueType: TNumber()
    } );
    this.problemSetProperty = new Property( [] );
    this.problemIndexProperty = new Property( 0, {
      tandem: tandem.createTandem( 'problemIndexProperty' ),
      phetioValueType: TNumber()
    } );
    this.scoreProperty = new Property( 0, {
      tandem: tandem.createTandem( 'scoreProperty' ),
      phetioValueType: TNumber()
    } ); // Score on current game level.
    this.elapsedTimeProperty = new Property( 0 );

    // @private, set of external functions that the model will step
    this.stepListeners = [];

    // @private
    this.levelCompletedEmitter = new TandemEmitter( {
      tandem: tandem.createTandem( 'levelCompletedEmitter' ),
      phetioArgumentTypes: [ TObject ]
    } );

    this.bestScores = []; // Properties that track progress on each game level.
    this.scores = []; // Properties that track score at each game level
    this.bestTimeVisible = []; // Properties that track whether to show best time at each game level
    self.bestTimes = []; // Best times at each level.
    _.times( ShredConstants.LEVEL_NAMES.length, function() {
      self.bestScores.push( new Property( 0 ) );
      self.scores.push( new Property( 0 ) );
      self.bestTimes.push( new Property( null ) );
      self.bestTimeVisible.push( new Property( false ) );
    } );

    this.timerEnabledProperty.lazyLink( function( timerEnabled ) {
      var i = 0;
      for ( i = 0; i < ShredConstants.LEVEL_NAMES.length; i++ ) {
        self.bestTimeVisible[ i ].value = timerEnabled && self.scores[ i ].value === MAX_POINTS_PER_GAME_LEVEL;
      }
    } );

    // Flag set to indicate new best time, cleared each time a level is started.
    this.newBestTime = false;

    this.checkAnswerEmitter = new TandemEmitter( {
      tandem: tandem.createTandem( 'checkAnswerEmitter' ),
      phetioArgumentTypes: [ TObject ]
    } );

    this.problemSetGroupTandem = tandem.createGroupTandem( 'problemSets' );
    tandem.addInstance( this, TBAAGameModel );
  }

  buildAnAtom.register( 'BAAGameModel', BAAGameModel );

  // Inherit from base class and define the methods for this object.
  return inherit( Object, BAAGameModel, {

    // @public - time stepping function, called by the framework
    step: function( dt ) {
      // Step the current problem if it has any time-driven behavior.
      if ( this.stateProperty.get() && ( typeof( this.stateProperty.get().step ) !== 'undefined' ) ) {
        this.stateProperty.get().step( dt );
      }
      // Step any external functions that need it.
      this.stepListeners.forEach( function( stepListener ) { stepListener( dt ); } );
    },

    // Start a new game.
    // @private (StartGameLevelNode.js, phet-io)
    startGameLevel: function( levelName ) {
      this.levelProperty.set( ShredConstants.MAP_LEVEL_NAME_TO_NUMBER( levelName ) );
      this.problemIndexProperty.set( 0 );
      this.problemSetProperty.set( ProblemSetFactory.generate( this.levelProperty.get(), PROBLEMS_PER_LEVEL, this,
        this.allowedProblemTypesByLevel, this.problemSetGroupTandem.createNextTandem() ) );
      this.scoreProperty.set( 0 );
      this.newBestTime = false;
      this.bestTimeVisible[ this.levelProperty.get() ].value = false;
      this._restartGameTimer();
      if ( this.problemSetProperty.get().length > 0 ) {
        this.stateProperty.set( this.problemSetProperty.get()[ 0 ] );
      }
      else {
        this.stateProperty.set( 'levelCompleted' );
      }
    },

    // @public - go to the level selection dialog and allow the user to start a new game
    newGame: function() {
      this.stateProperty.set( 'selectGameLevel' );
      this.scoreProperty.set( 0 );
      this._stopGameTimer();
    },

    // @public - advance to the next problem or to the 'game over' screen if all problems finished
    next: function() {
      var level = this.levelProperty.get();
      if ( this.problemSetProperty.get().length > this.problemIndexProperty.get() + 1 ) {
        // Next problem.
        this.problemIndexProperty.set( this.problemIndexProperty.get() + 1 );
        this.stateProperty.set( this.problemSetProperty.get()[ this.problemIndexProperty.get() ] );
      }
      else {
        // Game level completed - update score and state.
        if ( this.scoreProperty.get() > this.bestScores[ level ].value ) {
          this.bestScores[ level ].value = this.scoreProperty.get();
        }
        if ( this.timerEnabledProperty.get() && this.scoreProperty.get() === MAX_POINTS_PER_GAME_LEVEL &&
             ( this.bestTimes[ level ].value === null || this.elapsedTimeProperty.get() < this.bestTimes[ level ].value ) ) {
          this.newBestTime = this.bestTimes[ level ].value === null ? false : true; // Don't set this flag for the first 'best time', only when the time improves.
          this.bestTimes[ level ].value = this.elapsedTimeProperty.get();
        }

        if ( this.scoreProperty.get() === MAX_POINTS_PER_GAME_LEVEL && this.timerEnabledProperty.get() ) {
          this.bestTimeVisible[ level ].value = true;
        }

        this.scores[ level ].value = this.scoreProperty.get();

        // When the game is complete, send notification that can be used by phet-io
        this.levelCompletedEmitter.emit1( {
          level: level,
          maxPoints: MAX_POINTS_PER_GAME_LEVEL,
          problems: PROBLEMS_PER_LEVEL,
          timerEnabled: this.timerEnabledProperty.get(),
          elapsedTime: this.elapsedTimeProperty.get(),
          bestTimes: this.bestTimes[ level ],
          newBestTime: this.newBestTime
        } );

        this.stateProperty.set( 'levelCompleted' );
        this._stopGameTimer();
      }
    },

    // @public
    reset: function() {
      this.stateProperty.reset();
      this.soundEnabledProperty.reset();
      this.timerEnabledProperty.reset();
      this.levelProperty.reset();
      this.problemSetProperty.reset();
      this.problemIndexProperty.reset();
      this.scoreProperty.reset();
      this.elapsedTimeProperty.reset();
      this.bestScores.forEach( function( bestScoreProperty ) { bestScoreProperty.reset(); } );
      this.scores.forEach( function( scoreProperty ) { scoreProperty.reset(); } );
      this.bestTimes.forEach( function( bestTimeProperty ) { bestTimeProperty.reset(); } );
      this.bestTimeVisible.push( function( bestTimeVisibleProperty ) { bestTimeVisibleProperty.reset(); } );
    },

    // @public
    addStepListener: function( stepListener ) {
      this.stepListeners.push( stepListener );
    },

    // @public
    removeStepListener: function( stepListener ) {
      this.stepListeners = _.without( this.stepListeners, stepListener );
    },

    // @private
    _restartGameTimer: function() {
      if ( this.gameTimerId !== null ) {
        window.clearInterval( this.gameTimerId );
      }
      this.elapsedTimeProperty.set( 0 );
      var self = this;
      this.gameTimerId = window.setInterval( function() {
        self.elapsedTimeProperty.set( self.elapsedTimeProperty.get() + 1 );
      }, 1000 );
    },

    // @private
    _stopGameTimer: function() {
      window.clearInterval( this.gameTimerId );
      this.gameTimerId = null;
    },

    // Set the allowed problem types to customize for phet-io
    // @private (phet-io)
    setAllowedProblemTypesByLevel: function( allowedProblemTypesByLevel ) {
      this.allowedProblemTypesByLevel = allowedProblemTypesByLevel;
    },

    // @public
    emitCheckAnswer: function( isCorrect, pointsIfCorrect, answerAtom, submittedAtom, extension ) {
      var arg = {
        isCorrect: isCorrect,

        correctProtonCount: answerAtom.protonCountProperty.get(),
        correctNeutronCount: answerAtom.neutronCountProperty.get(),
        correctElectronCount: answerAtom.electronCountProperty.get(),

        submittedProtonCount: submittedAtom.protonCountProperty.get(),
        submittedNeutronCount: submittedAtom.neutronCountProperty.get(),
        submittedElectronCount: submittedAtom.electronCountProperty.get(),

        points: isCorrect ? pointsIfCorrect : 0
      };
      this.checkAnswerEmitter.emit1( _.extend( extension, arg ) );
    }
  }, {

    // statics
    MAX_POINTS_PER_GAME_LEVEL: MAX_POINTS_PER_GAME_LEVEL,
    PROBLEMS_PER_LEVEL: PROBLEMS_PER_LEVEL
  } );
} );
