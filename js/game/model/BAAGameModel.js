// Copyright 2002-2013, University of Colorado Boulder

/**
 * Primary model class for the Build and Atom Game tab.
 */
define( function( require ) {
  "use strict";

  // Imports
  var PropertySet = require( 'AXON/PropertySet' );
  var inherit = require( 'PHET_CORE/inherit' );
  var CountsToElementProblem = require( 'game/model/CountsToElementProblem' );
  var NumberAtom = require( 'common/model/NumberAtom' );

  // Constants
  var LEVELS = [ 'periodic-table-game', 'mass-and-charge-game', 'symbol-game', 'advanced-symbol-game' ];

  /**
   * Main constructor function.
   *
   * @constructor
   */
  function BAAGameModel() {
    PropertySet.call( this,
                      {
                        state: 'selectSubGame',
                        soundEnabled: 'false',
                        timerEnabled: 'true',
                        problemIndex: 0,
                        score: 0,
                        elapsedTime: 0,
                        bestTimes: [],
                        currentProblem: null,
                        playing: false, // TODO - This was added for prototyping and can probably be removed one game is working.
                        periodicTableGameCompleted: false,
                        massAndChargeGameCompleted: false,
                        symbolGameCompleted: false,
                        advancedSymbolGameCompleted: false
                      } );

    var thisGameModel = this;

    _.each( LEVELS, function( level ) {
      thisGameModel.bestTimes[level] = Number.POSITIVE_INFINITY;
    } );
  }

  // Inherit from base class and define the methods for this object.
  inherit( PropertySet, BAAGameModel, {
    // Start a new game.
    startSubGame: function( subGameType ) {
      console.log( "startGame called, not implemented, sub game subGameType = " + subGameType );
      this.state = 'presentingProblems';
      this.currentProblem = new CountsToElementProblem( )
    },
    // Stop the current game and show the totals.
    stopGame: function() {
      console.log( "stopGame called, not implemented." );
    },
    // Start a new game.
    newGame: function( level ) {
      console.log( "newGame called, not implemented." );
    },
    // Process a guess from the user.
    processGuess: function( numberAtom ) {
      console.log( "processGuess called, not implemented." );
    },
    // Advance to the next problem or to the 'game over' screen if all problems finished.
    next: function() {
      console.log( "processGuess called, not implemented." );
    }

  } );

  BAAGameModel.prototype.step = function( dt ) {
  };

  return BAAGameModel;
} );
