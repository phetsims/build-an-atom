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
  var PropertySet = require( 'AXON/PropertySet' );
  var inherit = require( 'PHET_CORE/inherit' );
  var ProblemSetFactory = require( 'BUILD_AN_ATOM/game/model/ProblemSetFactory' );
  var SharedConstants = require( 'SHRED/SharedConstants' );
  var buildAnAtom = require( 'BUILD_AN_ATOM/buildAnAtom' );
  var TandemEmitter = require( 'TANDEM/axon/TandemEmitter' );

  // phet-io modules
  var TObject = require( 'ifphetio!PHET_IO/types/TObject' );

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

    // @private (phet-io), phet-io can set this value to customize which levels are presented
    this.allowedProblemTypesByLevel = [
      [ 'schematic-to-element', 'counts-to-element' ],
      [ 'counts-to-charge', 'counts-to-mass', 'schematic-to-charge', 'schematic-to-mass' ],
      [ 'schematic-to-symbol-charge', 'schematic-to-symbol-mass-number', 'schematic-to-symbol-proton-count', 'counts-to-symbol-charge', 'counts-to-symbol-mass' ],
      [ 'schematic-to-symbol-all', 'symbol-to-schematic', 'symbol-to-counts', 'counts-to-symbol-all' ]
    ];

    PropertySet.call( this, {
      state: 'selectGameLevel', // Current state of the game.  Each problem is a unique state.
      soundEnabled: true,
      timerEnabled: false,
      level: 0,
      problemSet: [],
      problemIndex: 0,
      score: 0, // Score on current game level.
      elapsedTime: 0
    }, {
      tandemSet: {
        soundEnabled: tandem.createTandem( 'soundEnabledProperty' ),
        timerEnabled: tandem.createTandem( 'timerEnabledProperty' ),
        level: tandem.createTandem( 'levelProperty' ),
        problemIndex: tandem.createTandem( 'problemIndexProperty' ),
        score: tandem.createTandem( 'scoreProperty' )
      }
    } );

    var self = this;

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
    _.times( SharedConstants.LEVEL_NAMES.length, function() {
      self.bestScores.push( new Property( 0 ) );
      self.scores.push( new Property( 0 ) );
      self.bestTimes.push( new Property( null ) );
      self.bestTimeVisible.push( new Property( false ) );
    } );

    this.timerEnabledProperty.lazyLink( function( timerEnabled ) {
      var i = 0;
      for ( i = 0; i < SharedConstants.LEVEL_NAMES.length; i++ ) {
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
    tandem.addInstance( this );
  }

  buildAnAtom.register( 'BAAGameModel', BAAGameModel );

  // Inherit from base class and define the methods for this object.
  return inherit( PropertySet, BAAGameModel, {

    // @public - time stepping function, called by the framework
    step: function( dt ) {
      // Step the current problem if it has any time-driven behavior.
      if ( this.state && ( typeof( this.state.step ) !== 'undefined' ) ) {
        this.state.step( dt );
      }
      // Step any external functions that need it.
      this.stepListeners.forEach( function( stepListener ) { stepListener( dt ); } );
    },

    // Start a new game.
    // @private (StartGameLevelNode.js, phet-io)
    startGameLevel: function( levelName ) {
      this.level = SharedConstants.MAP_LEVEL_NAME_TO_NUMBER( levelName );
      this.problemIndex = 0;
      this.problemSet = ProblemSetFactory.generate( this.level, PROBLEMS_PER_LEVEL, this, this.allowedProblemTypesByLevel, this.problemSetGroupTandem.createNextTandem() );
      this.score = 0;
      this.newBestTime = false;
      this.bestTimeVisible[ this.level ].value = false;
      this._restartGameTimer();
      this.state = this.problemSet.length > 0 ? this.state = this.problemSet[ 0 ] : this.state = 'levelCompleted';
    },

    // @public - go to the level selection dialog and allow the user to start a new game
    newGame: function() {
      this.state = 'selectGameLevel';
      this.score = 0;
      this._stopGameTimer();
    },

    // @public - advance to the next problem or to the 'game over' screen if all problems finished
    next: function() {
      if ( this.problemSet.length > this.problemIndex + 1 ) {
        // Next problem.
        this.problemIndex++;
        this.state = this.problemSet[ this.problemIndex ];
      }
      else {
        // Game level completed - update score and state.
        if ( this.score > this.bestScores[ this.level ].value ) {
          this.bestScores[ this.level ].value = this.score;
        }
        if ( this.timerEnabled && this.score === MAX_POINTS_PER_GAME_LEVEL && ( this.bestTimes[ this.level ].value === null || this.elapsedTime < this.bestTimes[ this.level ].value ) ) {
          this.newBestTime = this.bestTimes[ this.level ].value === null ? false : true; // Don't set this flag for the first 'best time', only when the time improves.
          this.bestTimes[ this.level ].value = this.elapsedTime;
        }

        if ( this.score === MAX_POINTS_PER_GAME_LEVEL && this.timerEnabled ) {
          this.bestTimeVisible[ this.level ].value = true;
        }

        this.scores[ this.level ].value = this.score;

        // When the game is complete, send notification that can be used by phet-io
        this.levelCompletedEmitter.emit1( {
          level: this.level,
          maxPoints: MAX_POINTS_PER_GAME_LEVEL,
          problems: PROBLEMS_PER_LEVEL,
          timerEnabled: this.timerEnabled,
          elapsedTime: this.elapsedTime,
          bestTimes: this.bestTimes[ this.level ],
          newBestTime: this.newBestTime
        } );

        this.state = 'levelCompleted';
        this._stopGameTimer();
      }
    },

    // @public
    reset: function() {
      PropertySet.prototype.reset.call( this );
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
      this.elapsedTime = 0;
      var self = this;
      this.gameTimerId = window.setInterval( function() { self.elapsedTime += 1; }, 1000 );
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

        correctProtonCount: answerAtom.protonCount,
        correctNeutronCount: answerAtom.neutronCount,
        correctElectronCount: answerAtom.electronCount,

        submittedProtonCount: submittedAtom.protonCount,
        submittedNeutronCount: submittedAtom.neutronCount,
        submittedElectronCount: submittedAtom.electronCount,

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
