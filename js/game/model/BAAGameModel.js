// Copyright 2002-2013, University of Colorado Boulder

/**
 * Primary model class for the Build and Atom Game tab.
 */
define( function( require ) {
  'use strict';

  // Imports
  var PropertySet = require( 'AXON/PropertySet' );
  var inherit = require( 'PHET_CORE/inherit' );
  var CountsToChargeProblem = require( 'game/model/CountsToChargeProblem' );
  var CountsToSymbolProblem = require( 'game/model/CountsToSymbolProblem' );
  var CountsToElementProblem = require( 'game/model/CountsToElementProblem' );
  var CountsToMassNumberProblem = require( 'game/model/CountsToMassNumberProblem' );
  var NumberAtom = require( 'common/model/NumberAtom' );
  var SchematicToChargeProblem = require( 'game/model/SchematicToChargeProblem' );
  var SchematicToElementProblem = require( 'game/model/SchematicToElementProblem' );
  var SchematicToMassNumberProblem = require( 'game/model/SchematicToMassNumberProblem' );
  var SchematicToSymbolProblem = require( 'game/model/SchematicToSymbolProblem' );
  var SymbolToCountsProblem = require( 'game/model/SymbolToCountsProblem' );
  var SymbolToSchematicProblem = require( 'game/model/SymbolToSchematicProblem' );

  // Constants
  var LEVELS = [ 'periodic-table-game', 'mass-and-charge-game', 'symbol-game', 'advanced-symbol-game' ];

  // Problem pools for creating game problems, extracted from the design doc.
  // These define the configuration for each of the problems that can be used
  // in a problem set for a given sub-game.
  var problemPools = [
    [
      new NumberAtom( { protons: 1, neutrons: 0, electrons: 0 } ),
      new NumberAtom( { protons: 1, neutrons: 0, electrons: 1 } ),
      new NumberAtom( { protons: 1, neutrons: 0, electrons: 2 } ),
      new NumberAtom( { protons: 1, neutrons: 1, electrons: 0 } ),
      new NumberAtom( { protons: 1, neutrons: 1, electrons: 1 } ),
      new NumberAtom( { protons: 1, neutrons: 1, electrons: 2 } ),
      new NumberAtom( { protons: 2, neutrons: 1, electrons: 2 } ),
      new NumberAtom( { protons: 2, neutrons: 2, electrons: 2 } ),
      new NumberAtom( { protons: 3, neutrons: 3, electrons: 2 } ),
      new NumberAtom( { protons: 3, neutrons: 3, electrons: 3 } ),
      new NumberAtom( { protons: 3, neutrons: 4, electrons: 2 } ),
      new NumberAtom( { protons: 3, neutrons: 4, electrons: 3 } ),
      new NumberAtom( { protons: 4, neutrons: 5, electrons: 4 } ),
      new NumberAtom( { protons: 5, neutrons: 5, electrons: 5 } ),
      new NumberAtom( { protons: 5, neutrons: 6, electrons: 5 } ),
      new NumberAtom( { protons: 6, neutrons: 6, electrons: 6 } ),
      new NumberAtom( { protons: 6, neutrons: 7, electrons: 6 } ),
      new NumberAtom( { protons: 7, neutrons: 7, electrons: 7 } ),
      new NumberAtom( { protons: 7, neutrons: 7, electrons: 10 } ),
      new NumberAtom( { protons: 7, neutrons: 8, electrons: 7 } ),
      new NumberAtom( { protons: 7, neutrons: 8, electrons: 10 } ),
      new NumberAtom( { protons: 8, neutrons: 8, electrons: 8 } ),
      new NumberAtom( { protons: 8, neutrons: 8, electrons: 10 } ),
      new NumberAtom( { protons: 8, neutrons: 9, electrons: 8 } ),
      new NumberAtom( { protons: 8, neutrons: 9, electrons: 10 } ),
      new NumberAtom( { protons: 8, neutrons: 10, electrons: 8 } ),
      new NumberAtom( { protons: 8, neutrons: 10, electrons: 10 } ),
      new NumberAtom( { protons: 9, neutrons: 10, electrons: 9 } ),
      new NumberAtom( { protons: 9, neutrons: 10, electrons: 10 } ),
      new NumberAtom( { protons: 10, neutrons: 10, electrons: 10 } ),
      new NumberAtom( { protons: 10, neutrons: 11, electrons: 10 } ),
      new NumberAtom( { protons: 10, neutrons: 12, electrons: 10 } )
    ],
    [
      new NumberAtom( { protons: 1, neutrons: 0, electrons: 0 } ),
      new NumberAtom( { protons: 1, neutrons: 0, electrons: 1 } ),
      new NumberAtom( { protons: 1, neutrons: 0, electrons: 2 } ),
      new NumberAtom( { protons: 1, neutrons: 1, electrons: 0 } ),
      new NumberAtom( { protons: 1, neutrons: 1, electrons: 1 } ),
      new NumberAtom( { protons: 1, neutrons: 1, electrons: 2 } ),
      new NumberAtom( { protons: 2, neutrons: 1, electrons: 2 } ),
      new NumberAtom( { protons: 2, neutrons: 2, electrons: 2 } ),
      new NumberAtom( { protons: 3, neutrons: 3, electrons: 2 } ),
      new NumberAtom( { protons: 3, neutrons: 3, electrons: 3 } ),
      new NumberAtom( { protons: 3, neutrons: 4, electrons: 2 } ),
      new NumberAtom( { protons: 3, neutrons: 4, electrons: 3 } ),
      new NumberAtom( { protons: 4, neutrons: 5, electrons: 4 } ),
      new NumberAtom( { protons: 5, neutrons: 5, electrons: 5 } ),
      new NumberAtom( { protons: 5, neutrons: 6, electrons: 5 } ),
      new NumberAtom( { protons: 6, neutrons: 6, electrons: 6 } ),
      new NumberAtom( { protons: 6, neutrons: 7, electrons: 6 } ),
      new NumberAtom( { protons: 7, neutrons: 7, electrons: 7 } ),
      new NumberAtom( { protons: 7, neutrons: 7, electrons: 10 } ),
      new NumberAtom( { protons: 7, neutrons: 8, electrons: 7 } ),
      new NumberAtom( { protons: 7, neutrons: 8, electrons: 10 } ),
      new NumberAtom( { protons: 8, neutrons: 8, electrons: 8 } ),
      new NumberAtom( { protons: 8, neutrons: 8, electrons: 10 } ),
      new NumberAtom( { protons: 8, neutrons: 9, electrons: 8 } ),
      new NumberAtom( { protons: 8, neutrons: 9, electrons: 10 } ),
      new NumberAtom( { protons: 8, neutrons: 10, electrons: 8 } ),
      new NumberAtom( { protons: 8, neutrons: 10, electrons: 10 } ),
      new NumberAtom( { protons: 9, neutrons: 10, electrons: 9 } ),
      new NumberAtom( { protons: 9, neutrons: 10, electrons: 10 } ),
      new NumberAtom( { protons: 10, neutrons: 10, electrons: 10 } ),
      new NumberAtom( { protons: 10, neutrons: 11, electrons: 10 } ),
      new NumberAtom( { protons: 10, neutrons: 12, electrons: 10 } )
    ],
    [
      new NumberAtom( { protons: 1, neutrons: 0, electrons: 0 } ),
      new NumberAtom( { protons: 1, neutrons: 0, electrons: 1 } ),
      new NumberAtom( { protons: 1, neutrons: 0, electrons: 2 } ),
      new NumberAtom( { protons: 1, neutrons: 1, electrons: 0 } ),
      new NumberAtom( { protons: 1, neutrons: 1, electrons: 1 } ),
      new NumberAtom( { protons: 1, neutrons: 1, electrons: 2 } ),
      new NumberAtom( { protons: 2, neutrons: 1, electrons: 2 } ),
      new NumberAtom( { protons: 2, neutrons: 2, electrons: 2 } ),
      new NumberAtom( { protons: 3, neutrons: 3, electrons: 2 } ),
      new NumberAtom( { protons: 3, neutrons: 3, electrons: 3 } ),
      new NumberAtom( { protons: 3, neutrons: 4, electrons: 2 } ),
      new NumberAtom( { protons: 3, neutrons: 4, electrons: 3 } ),
      new NumberAtom( { protons: 4, neutrons: 5, electrons: 4 } ),
      new NumberAtom( { protons: 5, neutrons: 5, electrons: 5 } ),
      new NumberAtom( { protons: 5, neutrons: 6, electrons: 5 } ),
      new NumberAtom( { protons: 6, neutrons: 6, electrons: 6 } ),
      new NumberAtom( { protons: 6, neutrons: 7, electrons: 6 } ),
      new NumberAtom( { protons: 7, neutrons: 7, electrons: 7 } ),
      new NumberAtom( { protons: 7, neutrons: 7, electrons: 10 } ),
      new NumberAtom( { protons: 7, neutrons: 8, electrons: 7 } ),
      new NumberAtom( { protons: 7, neutrons: 8, electrons: 10 } ),
      new NumberAtom( { protons: 8, neutrons: 8, electrons: 8 } ),
      new NumberAtom( { protons: 8, neutrons: 8, electrons: 10 } ),
      new NumberAtom( { protons: 8, neutrons: 9, electrons: 8 } ),
      new NumberAtom( { protons: 8, neutrons: 9, electrons: 10 } ),
      new NumberAtom( { protons: 8, neutrons: 10, electrons: 8 } ),
      new NumberAtom( { protons: 8, neutrons: 10, electrons: 10 } ),
      new NumberAtom( { protons: 9, neutrons: 10, electrons: 9 } ),
      new NumberAtom( { protons: 9, neutrons: 10, electrons: 10 } ),
      new NumberAtom( { protons: 10, neutrons: 10, electrons: 10 } ),
      new NumberAtom( { protons: 10, neutrons: 11, electrons: 10 } ),
      new NumberAtom( { protons: 10, neutrons: 12, electrons: 10 } ),
      new NumberAtom( { protons: 11, neutrons: 12, electrons: 10 } ),
      new NumberAtom( { protons: 11, neutrons: 12, electrons: 11 } ),
      new NumberAtom( { protons: 12, neutrons: 12, electrons: 10 } ),
      new NumberAtom( { protons: 12, neutrons: 12, electrons: 12 } ),
      new NumberAtom( { protons: 12, neutrons: 13, electrons: 10 } ),
      new NumberAtom( { protons: 12, neutrons: 13, electrons: 12 } ),
      new NumberAtom( { protons: 12, neutrons: 14, electrons: 10 } ),
      new NumberAtom( { protons: 12, neutrons: 14, electrons: 12 } ),
      new NumberAtom( { protons: 13, neutrons: 14, electrons: 10 } ),
      new NumberAtom( { protons: 13, neutrons: 14, electrons: 13 } ),
      new NumberAtom( { protons: 14, neutrons: 14, electrons: 14 } ),
      new NumberAtom( { protons: 14, neutrons: 15, electrons: 14 } ),
      new NumberAtom( { protons: 14, neutrons: 16, electrons: 14 } ),
      new NumberAtom( { protons: 15, neutrons: 16, electrons: 15 } ),
      new NumberAtom( { protons: 16, neutrons: 16, electrons: 16 } ),
      new NumberAtom( { protons: 16, neutrons: 16, electrons: 18 } ),
      new NumberAtom( { protons: 16, neutrons: 17, electrons: 16 } ),
      new NumberAtom( { protons: 16, neutrons: 17, electrons: 18 } ),
      new NumberAtom( { protons: 16, neutrons: 18, electrons: 16 } ),
      new NumberAtom( { protons: 16, neutrons: 18, electrons: 18 } ),
      new NumberAtom( { protons: 16, neutrons: 19, electrons: 16 } ),
      new NumberAtom( { protons: 16, neutrons: 19, electrons: 18 } ),
      new NumberAtom( { protons: 17, neutrons: 18, electrons: 17 } ),
      new NumberAtom( { protons: 17, neutrons: 18, electrons: 18 } ),
      new NumberAtom( { protons: 17, neutrons: 20, electrons: 17 } ),
      new NumberAtom( { protons: 17, neutrons: 20, electrons: 18 } ),
      new NumberAtom( { protons: 18, neutrons: 20, electrons: 18 } ),
      new NumberAtom( { protons: 18, neutrons: 22, electrons: 18 } )
    ],
    [
      new NumberAtom( { protons: 1, neutrons: 0, electrons: 0 } ),
      new NumberAtom( { protons: 1, neutrons: 0, electrons: 1 } ),
      new NumberAtom( { protons: 1, neutrons: 0, electrons: 2 } ),
      new NumberAtom( { protons: 1, neutrons: 1, electrons: 0 } ),
      new NumberAtom( { protons: 1, neutrons: 1, electrons: 1 } ),
      new NumberAtom( { protons: 1, neutrons: 1, electrons: 2 } ),
      new NumberAtom( { protons: 2, neutrons: 1, electrons: 2 } ),
      new NumberAtom( { protons: 2, neutrons: 2, electrons: 2 } ),
      new NumberAtom( { protons: 3, neutrons: 3, electrons: 2 } ),
      new NumberAtom( { protons: 3, neutrons: 3, electrons: 3 } ),
      new NumberAtom( { protons: 3, neutrons: 4, electrons: 2 } ),
      new NumberAtom( { protons: 3, neutrons: 4, electrons: 3 } ),
      new NumberAtom( { protons: 4, neutrons: 5, electrons: 4 } ),
      new NumberAtom( { protons: 5, neutrons: 5, electrons: 5 } ),
      new NumberAtom( { protons: 5, neutrons: 6, electrons: 5 } ),
      new NumberAtom( { protons: 6, neutrons: 6, electrons: 6 } ),
      new NumberAtom( { protons: 6, neutrons: 7, electrons: 6 } ),
      new NumberAtom( { protons: 7, neutrons: 7, electrons: 7 } ),
      new NumberAtom( { protons: 7, neutrons: 7, electrons: 10 } ),
      new NumberAtom( { protons: 7, neutrons: 8, electrons: 7 } ),
      new NumberAtom( { protons: 7, neutrons: 8, electrons: 10 } ),
      new NumberAtom( { protons: 8, neutrons: 8, electrons: 8 } ),
      new NumberAtom( { protons: 8, neutrons: 8, electrons: 10 } ),
      new NumberAtom( { protons: 8, neutrons: 9, electrons: 8 } ),
      new NumberAtom( { protons: 8, neutrons: 9, electrons: 10 } ),
      new NumberAtom( { protons: 8, neutrons: 10, electrons: 8 } ),
      new NumberAtom( { protons: 8, neutrons: 10, electrons: 10 } ),
      new NumberAtom( { protons: 9, neutrons: 10, electrons: 9 } ),
      new NumberAtom( { protons: 9, neutrons: 10, electrons: 10 } ),
      new NumberAtom( { protons: 10, neutrons: 10, electrons: 10 } ),
      new NumberAtom( { protons: 10, neutrons: 11, electrons: 10 } ),
      new NumberAtom( { protons: 10, neutrons: 12, electrons: 10 } ),
      new NumberAtom( { protons: 11, neutrons: 12, electrons: 10 } ),
      new NumberAtom( { protons: 11, neutrons: 12, electrons: 11 } ),
      new NumberAtom( { protons: 12, neutrons: 12, electrons: 10 } ),
      new NumberAtom( { protons: 12, neutrons: 12, electrons: 12 } ),
      new NumberAtom( { protons: 12, neutrons: 13, electrons: 10 } ),
      new NumberAtom( { protons: 12, neutrons: 13, electrons: 12 } ),
      new NumberAtom( { protons: 12, neutrons: 14, electrons: 10 } ),
      new NumberAtom( { protons: 12, neutrons: 14, electrons: 12 } ),
      new NumberAtom( { protons: 13, neutrons: 14, electrons: 10 } ),
      new NumberAtom( { protons: 13, neutrons: 14, electrons: 13 } ),
      new NumberAtom( { protons: 14, neutrons: 14, electrons: 14 } ),
      new NumberAtom( { protons: 14, neutrons: 15, electrons: 14 } ),
      new NumberAtom( { protons: 14, neutrons: 16, electrons: 14 } ),
      new NumberAtom( { protons: 15, neutrons: 16, electrons: 15 } ),
      new NumberAtom( { protons: 16, neutrons: 16, electrons: 16 } ),
      new NumberAtom( { protons: 16, neutrons: 16, electrons: 18 } ),
      new NumberAtom( { protons: 16, neutrons: 17, electrons: 16 } ),
      new NumberAtom( { protons: 16, neutrons: 17, electrons: 18 } ),
      new NumberAtom( { protons: 16, neutrons: 18, electrons: 16 } ),
      new NumberAtom( { protons: 16, neutrons: 18, electrons: 18 } ),
      new NumberAtom( { protons: 16, neutrons: 19, electrons: 16 } ),
      new NumberAtom( { protons: 16, neutrons: 19, electrons: 18 } ),
      new NumberAtom( { protons: 17, neutrons: 18, electrons: 17 } ),
      new NumberAtom( { protons: 17, neutrons: 18, electrons: 18 } ),
      new NumberAtom( { protons: 17, neutrons: 20, electrons: 17 } ),
      new NumberAtom( { protons: 17, neutrons: 20, electrons: 18 } ),
      new NumberAtom( { protons: 18, neutrons: 20, electrons: 18 } ),
      new NumberAtom( { protons: 18, neutrons: 22, electrons: 18 } )
    ]
  ];

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
      // Step the current problem if it has any time-driven behavior.
      if ( this.state && ( typeof( this.state.step ) !== 'undefined' ) ) {
        this.state.step( dt );
      }
    },

    // Start a new game.
    startSubGame: function( subGameType ) {
      console.log( 'startGame called, sub game subGameType = ' + subGameType );
      this.problemIndex = 0;
      // TODO: Need to generate real problem set.
      this.problemSet = [
        new SymbolToSchematicProblem( this, new NumberAtom( { protonCount: 2, neutronCount: 2, electronCount: 1 } ) ),
        new SchematicToSymbolProblem( this, new NumberAtom( { protonCount: 1, neutronCount: 1, electronCount: 0 } ), true, false, false ),
        new SchematicToSymbolProblem( this, new NumberAtom( { protonCount: 2, neutronCount: 2, electronCount: 2 } ), false, true, false ),
        new SchematicToSymbolProblem( this, new NumberAtom( { protonCount: 3, neutronCount: 4, electronCount: 2 } ), false, false, true ),
        new SchematicToSymbolProblem( this, new NumberAtom( { protonCount: 4, neutronCount: 4, electronCount: 4 } ), true, true, true ),
        new SymbolToCountsProblem( this, new NumberAtom( { protonCount: 2, neutronCount: 2, electronCount: 2 } ), true, false, false ),
        new CountsToSymbolProblem( this, new NumberAtom( { protonCount: 1, neutronCount: 1, electronCount: 0 } ), true, false, false ),
        new CountsToSymbolProblem( this, new NumberAtom( { protonCount: 1, neutronCount: 1, electronCount: 0 } ), false, true, false ),
        new CountsToSymbolProblem( this, new NumberAtom( { protonCount: 1, neutronCount: 1, electronCount: 0 } ), false, false, true ),
        new CountsToSymbolProblem( this, new NumberAtom( { protonCount: 1, neutronCount: 1, electronCount: 0 } ), true, true, true ),
        new SchematicToMassNumberProblem( this, new NumberAtom( { protonCount: 1, neutronCount: 1, electronCount: 0 } ) ),
        new SchematicToChargeProblem( this, new NumberAtom( { protonCount: 1, neutronCount: 1, electronCount: 0 } ) ),
        new CountsToMassNumberProblem( this, new NumberAtom( { protonCount: 8, neutronCount: 8, electronCount: 10 } ) ),
        new CountsToChargeProblem( this, new NumberAtom( { protonCount: 8, neutronCount: 8, electronCount: 10 } ) ),
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
} )
;
