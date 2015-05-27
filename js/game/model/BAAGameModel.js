// Copyright 2002-2013, University of Colorado Boulder

/**
 * Primary model class for the Build an Atom Game tab.
 *
 * @author John Blanco
 */
define( function( require ) {
  'use strict';

  // Imports
  var Property = require( 'AXON/Property' );
  var PropertySet = require( 'AXON/PropertySet' );
  var inherit = require( 'PHET_CORE/inherit' );
  var ProblemSetFactory = require( 'BUILD_AN_ATOM/game/model/ProblemSetFactory' );
  var SharedConstants = require( 'BUILD_AN_ATOM/common/SharedConstants' );

  // Constants
  var PROBLEMS_PER_LEVEL = 5;
  var POSSIBLE_POINTS_PER_PROBLEM = 2;

  /**
   * Main constructor function.
   *
   * @constructor
   */
  function BAAGameModel() {
    PropertySet.call( this,
      {
        state: 'selectGameLevel', // Current state of the game.  Each problem is a unique state.
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
    _.times( SharedConstants.LEVEL_NAMES.length, function() {
      thisGameModel.bestScores.push( new Property( 0 ) );
      thisGameModel.bestTimes.push( null );
    } );

    // Flag set to indicate new best time, cleared each time a level is started.
    this.newBestTime = false;
  }

  // Inherit from base class and define the methods for this object.
  return inherit( PropertySet, BAAGameModel, {

    // Step function necessary to be used as a model in the Joist framework.
    step: function( dt ) {
      // Step the current problem if it has any time-driven behavior.
      if ( this.state && ( typeof( this.state.step ) !== 'undefined' ) ) {
        this.state.step( dt );
      }
      // Step any external functions that need it.
      this._stepListeners.forEach( function( stepListener ) { stepListener( dt ); } );
    },

    // Start a new game.
    startGameLevel: function( levelName ) {
      this.level = SharedConstants.MAP_LEVEL_NAME_TO_NUMBER( levelName );
      this.problemIndex = 0;
      this.problemSet = ProblemSetFactory.generate( this.level, PROBLEMS_PER_LEVEL, this );
      this.score = 0;
      this.newBestTime = false;
      this._restartGameTimer();
      this.state = this.problemSet.length > 0 ? this.state = this.problemSet[ 0 ] : this.state = 'levelCompleted';
    },

    // State where the user selects a new game.
    newGame: function() {
      this.state = 'selectGameLevel';
      this.score = 0;
      this._stopGameTimer();
    },

    // Advance to the next problem or to the 'game over' screen if all problems finished.
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
        if ( this.timerEnabled && this.score === this.MAX_POINTS_PER_GAME_LEVEL && ( this.bestTimes[ this.level ] === null || this.elapsedTime < this.bestTimes[ this.level ] ) ) {
          this.newBestTime = this.bestTimes[ this.level ] === null ? false : true; // Don't set this flag for the first 'best time', only when the time improves.
          this.bestTimes[ this.level ] = this.elapsedTime;
        }
        this.state = 'levelCompleted';
        this._stopGameTimer();
      }
    },

    reset: function() {
      PropertySet.prototype.reset.call( this );
      var thisGameModel = this;
      this.bestScores.forEach( function( progressProperty ) { progressProperty.reset(); } );
      for ( var i = 0; i < SharedConstants.LEVEL_NAMES.length; i++ ) {
        thisGameModel.bestTimes[ i ] = null;
      }
    },

    // Set of external functions that the model will step.
    _stepListeners: [],

    addStepListener: function( stepListener ) {
      this._stepListeners.push( stepListener );
    },

    removeStepListener: function( stepListener ) {
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
    MAX_POINTS_PER_GAME_LEVEL: PROBLEMS_PER_LEVEL * POSSIBLE_POINTS_PER_PROBLEM,
    PROBLEMS_PER_LEVEL: PROBLEMS_PER_LEVEL
  } );
} );
