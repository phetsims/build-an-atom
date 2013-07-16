// Copyright 2002-2013, University of Colorado Boulder

/**
 * Primary model class for the Build and Atom Game tab.
 */
define( function( require ) {
  'use strict';

  // Imports
  var PropertySet = require( 'AXON/PropertySet' );
  var inherit = require( 'PHET_CORE/inherit' );
  var CountsToElementProblem = require( 'game/model/CountsToElementProblem' );
  var NumberAtom = require( 'common/model/NumberAtom' );
  var SchematicToElementProblem = require( 'game/model/SchematicToElementProblem' );

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
                        state: 'selectSubGame', // Current state of the game.  Each problem is a unique state.
                        soundEnabled: 'false',
                        timerEnabled: 'true',
                        level: 0,
                        problemSet: [],
                        score: 0,
                        elapsedTime: 0,
                        bestTimes: [],
                        playing: false, // TODO - This was added for prototyping and can probably be removed once game is working.
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

    // Step function necessary to be used as a model in the Joist framework.
    step: function( dt ) {
      this.elapsedTime += dt;
    },

    // Start a new game.
    startSubGame: function( subGameType ) {
      console.log( 'startGame called, sub game subGameType = ' + subGameType );
      this.problemIndex = 0;
      // TODO: Need to generate real problem set.
      this.problemSet = [
        new SchematicToElementProblem( this, new NumberAtom( { protonCount: 3, neutronCount: 4, electronCount: 2 } ) ),
        new CountsToElementProblem( this, new NumberAtom( { protonCount: 1, neutronCount: 0, electronCount: 1 } ) ) ];
      this.elapsedTime = 0;
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
      }
    }

  } );

  return BAAGameModel;
} );
