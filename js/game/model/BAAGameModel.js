// Copyright 2002-2013, University of Colorado Boulder

/**
 * Primary model class for the Build and Atom Game tab.
 */
define( function( require ) {
  'use strict';

  // Imports
  var Property = require( 'AXON/Property' );
  var PropertySet = require( 'AXON/PropertySet' );
  var inherit = require( 'PHET_CORE/inherit' );
  var CountsToChargeProblem = require( 'game/model/CountsToChargeProblem' );
  var CountsToSymbolProblem = require( 'game/model/CountsToSymbolProblem' );
  var CountsToElementProblem = require( 'game/model/CountsToElementProblem' );
  var CountsToMassNumberProblem = require( 'game/model/CountsToMassNumberProblem' );
  var ProblemSetFactory = require( 'game/model/ProblemSetFactory' );
  var SchematicToChargeProblem = require( 'game/model/SchematicToChargeProblem' );
  var SchematicToElementProblem = require( 'game/model/SchematicToElementProblem' );
  var SchematicToMassNumberProblem = require( 'game/model/SchematicToMassNumberProblem' );
  var SchematicToSymbolProblem = require( 'game/model/SchematicToSymbolProblem' );
  var SharedConstants = require( 'common/SharedConstants' );
  var SymbolToCountsProblem = require( 'game/model/SymbolToCountsProblem' );
  var SymbolToSchematicProblem = require( 'game/model/SymbolToSchematicProblem' );

  // Constants
  var PROBLEMS_PER_SUB_GAME = 5;
  var POSSIBLE_POINTS_PER_PROBLEM = 2;

  /**
   * Main constructor function.
   *
   * @constructor
   */
  function BAAGameModel() {
    PropertySet.call( this,
      {
        state: 'selectSubGame', // Current state of the game.  Each problem is a unique state.
        soundEnabled: true,
        timerEnabled: true,
        level: 0,
        problemSet: [],
        problemIndex: 0,
        score: 0, // Score on current game level.
        elapsedTime: 0
      } );

    var thisGameModel = this;

    this.bestScores = []; // Properties that track progress on each game level.
    thisGameModel.bestTimes = []; // Best times at each level.
    _.times( SharedConstants.SUB_GAME_TYPES.length, function() {
      thisGameModel.bestScores.push( new Property( 0 ) );
      thisGameModel.bestTimes.push( Number.POSITIVE_INFINITY );
    } );
  }

// Inherit from base class and define the methods for this object.
  inherit( PropertySet, BAAGameModel, {

    // Step function necessary to be used as a model in the Joist framework.
    step: function( dt ) {
      // Step the current problem if it has any time-driven behavior.
      if ( this.state && ( typeof( this.state.step ) !== 'undefined' ) ) {
        this.state.step( dt );
      }
      // Step any external functions that need it.
      this._stepListeners.forEach( function( stepListener ){ stepListener( dt ); } );
    },

    // Start a new game.
    startSubGame: function( subGameType ) {
      this.level = SharedConstants.SUB_GAME_TO_LEVEL( subGameType );
      this.problemIndex = 0;
      this.problemSet = ProblemSetFactory.generate( this.level, PROBLEMS_PER_SUB_GAME, this );
      this.score = 0;
      this._restartGameTimer();
      this.state = this.problemSet.length > 0 ? this.state = this.problemSet[0] : this.state = 'subGameOver';
    },

    // State where the user selects a new game.
    newGame: function( level ) {
      this.state = 'selectSubGame';
      this.score = 0;
      this._stopGameTimer();
    },

    // Process a guess from the user.
    processGuess: function( numberAtom ) {
      console.log( 'processGuess called, not implemented.' ); // TODO: This can probably be removed - it is now handled by the problems.
    },

    // Advance to the next problem or to the 'game over' screen if all problems finished.
    next: function() {
      if ( this.problemSet.length > this.problemIndex + 1 ) {
        // Next problem.
        this.problemIndex++;
        this.state = this.problemSet[ this.problemIndex ];
      }
      else {
        // Sub game over - update score and state.
        if ( this.score > this.bestScores[ this.level ].value ) {
          this.bestScores[ this.level ].value = this.score;
        }
        if ( this.timerEnabled && this.score === this.MAX_POINTS_PER_GAME_LEVEL && this.elapsedTime < this.bestTimes[ this.level ] ) {
          this.bestTimes[ this.level ] = this.elapsedTime;
        }
        this.state = 'subGameOver';
        this._stopGameTimer();
      }
    },

    reset: function() {
      PropertySet.prototype.reset.call( this );
      var thisGameModel = this;
      this.bestScores.forEach( function( progressProperty ) { progressProperty.reset(); } );
      _.each( SharedConstants.SUB_GAME_TYPES, function( subGameType ) {
        thisGameModel.bestTimes[ subGameType ] = Number.POSITIVE_INFINITY;
      } );
    },

    // Set of external functions that the model will step.
    _stepListeners: [],

    addStepListener: function( stepListener ){
      this._stepListeners.push( stepListener );
    },

    removeStepListener: function( stepListener ){
      this._stepListeners = _.without( this._stepListeners, stepListener );
    },

    _restartGameTimer: function() {
      if ( this.gameTimerId !== null ) {
        window.clearInterval( this.gameTimerId );
      }
      this.elapsedTime = 0;
      var thisModel = this;
      this.gameTimerId = window.setInterval( function() { thisModel.elapsedTime += 1; }, 1000 );
    },

    _stopGameTimer: function() {
      window.clearInterval( this.gameTimerId );
      this.gameTimerId = null;
    },

    // Public constants.
    MAX_POINTS_PER_GAME_LEVEL: PROBLEMS_PER_SUB_GAME * POSSIBLE_POINTS_PER_PROBLEM,
    PROBLEMS_PER_SUB_GAME: PROBLEMS_PER_SUB_GAME
  } );

  return BAAGameModel;
} );
