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
  var callSuper = require( 'PHET_CORE/callSuper' );
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
  var PROBLEMS_PER_SUB_GAME = 1;
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
        soundEnabled: 'false',
        timerEnabled: 'true',
        level: 0,
        problemSet: [],
        problemIndex: 0,
        score: 0,
        elapsedTime: 0,
        bestTimes: []
      } );

    var thisGameModel = this;

    // Properties that track progress on each game level.
    this.progressProperties = [
      new Property( 0 ),
      new Property( 0 ),
      new Property( 0 ),
      new Property( 0 )
    ];

    // Initialize the array that tracks the best times for each sub-game.
    _.each( SharedConstants.SUB_GAME_TYPES, function( subGameType ) {
      thisGameModel.bestTimes[ subGameType ] = Number.POSITIVE_INFINITY;
    } );
  }

// Inherit from base class and define the methods for this object.
  inherit( PropertySet, BAAGameModel, {

    // Step function necessary to be used as a model in the Joist framework.
    step: function( dt ) {
      this.elapsedTime += dt;
      // Step the current problem if it has any time-driven behavior.
      if ( this.state && ( typeof( this.state.step ) !== 'undefined' ) ) {
        this.state.step( dt );
      }
    },

    // Start a new game.
    startSubGame: function( subGameType ) {
      console.log( 'startGame called, sub game subGameType = ' + subGameType );
      this.level = SharedConstants.SUB_GAME_TO_LEVEL( subGameType );
      this.problemIndex = 0;
      this.problemSet = ProblemSetFactory.generate( this.level, PROBLEMS_PER_SUB_GAME, this );
      this.elapsedTime = 0;
      this.progressProperties[ this.level ].reset();
      if ( this.problemSet.length > 0 ) {
        this.state = this.problemSet[0];
      }
      else {
        this.state = 'subGameOver';
      }
    },

    // Stop the current game and show the totals.
    stopGame: function() {
      console.log( 'stopGame called, not implemented.' );
    },

    // Start a new game.
    newGame: function( level ) {
      this.state = 'selectSubGame';
    },

    // Process a guess from the user.
    processGuess: function( numberAtom ) {
      console.log( 'processGuess called, not implemented.' );
    },

    // Advance to the next problem or to the 'game over' screen if all problems finished.
    next: function() {
      if ( this.problemSet.length > this.problemIndex + 1 ) {
        // Next problem.
        this.problemIndex++;
        this.state = this.problemSet[ this.problemIndex ];
      }
      else {
        // Sub game over.
        this.state = 'subGameOver';
        // Update the property that tracks how much of this level has been completed.
        var totalPointsThisRound = 0;
        this.problemSet.forEach( function( problem ) {
          totalPointsThisRound += problem.score;
        } );
        this.progressProperties[ this.level ].value = totalPointsThisRound / ( this.problemSet.length * POSSIBLE_POINTS_PER_PROBLEM )
      }
    },

    reset: function() {
      callSuper( PropertySet, 'reset', this );
      this.progressProperties.forEach( function( progressProperty ) { progressProperty.reset() } );
    }

  } );

  return BAAGameModel;
} );
