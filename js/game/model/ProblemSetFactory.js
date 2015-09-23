// Copyright 2002-2013, University of Colorado Boulder

/**
 * Type that generates a list of problems for use in a sub-game.
 *
 * @author John Blanco
 * @author Sam Reid
 */
define( function( require ) {
  'use strict';

  // modules
  var AtomValuePool = require( 'BUILD_AN_ATOM/game/model/AtomValuePool' );
  var CountsToChargeProblem = require( 'BUILD_AN_ATOM/game/model/CountsToChargeProblem' );
  var CountsToSymbolProblem = require( 'BUILD_AN_ATOM/game/model/CountsToSymbolProblem' );
  var CountsToElementProblem = require( 'BUILD_AN_ATOM/game/model/CountsToElementProblem' );
  var CountsToMassNumberProblem = require( 'BUILD_AN_ATOM/game/model/CountsToMassNumberProblem' );
  var SchematicToChargeProblem = require( 'BUILD_AN_ATOM/game/model/SchematicToChargeProblem' );
  var SchematicToElementProblem = require( 'BUILD_AN_ATOM/game/model/SchematicToElementProblem' );
  var SchematicToMassNumberProblem = require( 'BUILD_AN_ATOM/game/model/SchematicToMassNumberProblem' );
  var SchematicToSymbolProblem = require( 'BUILD_AN_ATOM/game/model/SchematicToSymbolProblem' );
  var SymbolToCountsProblem = require( 'BUILD_AN_ATOM/game/model/SymbolToCountsProblem' );
  var SymbolToSchematicProblem = require( 'BUILD_AN_ATOM/game/model/SymbolToSchematicProblem' );

  // Constants
  var MAX_PROTON_NUMBER_FOR_SCHEMATIC_PROBS = 3; // Disallow schematic (Bohr model) probs above this size.
  var ALLOWED_PROBLEM_TYPES_BY_LEVEL = [
    [ 'schematic-to-element', 'counts-to-element' ],
    [ 'counts-to-charge', 'counts-to-mass', 'schematic-to-charge', 'schematic-to-mass' ],
    [ 'schematic-to-symbol-charge', 'schematic-to-symbol-mass-number', 'schematic-to-symbol-proton-count', 'counts-to-symbol-charge', 'counts-to-symbol-mass' ],
    [ 'schematic-to-symbol-all', 'symbol-to-schematic', 'symbol-to-counts', 'counts-to-symbol-all' ]
  ];

  // No constructor, not meant to be instantiated.
  var ProblemSetFactory = {};

  /**
   * Generate a problem set based on the specified criteria.
   *
   * @param level
   * @param numProblems
   * @param model
   */
  ProblemSetFactory.generate = function( level, numProblems, model ) {
    this.problems = [];
    this._previousProblemType = null;
    this._availableProblemTypes = [];

    // Create a pool of all atom values that can be used to create problems
    // for the problem set.
    var atomValueList = new AtomValuePool( level );

    // Now add problems to the problem set based on the atom values and the
    // problem types associated with this level.
    for ( var i = 0; i < numProblems; i++ ) {
      var problem = this._generateProblem( level, atomValueList, model );
      if ( problem !== null ) {
        this.problems.push( problem );
      }
    }

    return this.problems;
  };

  /**
   * Generate a single problem given the level and a pool of atom values that
   * can be used for the problem.
   *
   * @param level
   * @param availableAtomValues
   * @param model
   * @return
   */
  ProblemSetFactory._generateProblem = function( level, availableAtomValues, model ) {

    if ( this._availableProblemTypes.length === 0 ) {
      // Reload the list of available problems with all possible problem
      // types for the current level.
      this._availableProblemTypes = ALLOWED_PROBLEM_TYPES_BY_LEVEL[ level ].slice();
    }

    // Randomly pick a problem type, but make sure that it isn't the same
    // as the previous problem type.
    var index = Math.floor( Math.random() * ( this._availableProblemTypes.length ) );
    if ( this._previousProblemType !== null && this._availableProblemTypes.get( index ) === this._previousProblemType ) {
      // This is the same as the previous prob type, so choose a different one.
      index = ( index + 1 ) % this._availableProblemTypes.length;
    }
    var problemType = this._availableProblemTypes[ index ];
    this.previousProblemType = problemType;

    // Remove the chosen type from the list.  By doing this, we present
    // the user with all different problem types before starting again.
    this._availableProblemTypes = _.without( this._availableProblemTypes, problemType );

    // Pick an atom value from the list of those remaining.  This is where
    // constraints between problem types and atom values are handled.
    var minProtonCount = 0;
    var maxProtonCount = Number.POSITIVE_INFINITY;
    var requireCharged = false;
    if ( this._isSchematicProbType( problemType ) ) {
      maxProtonCount = MAX_PROTON_NUMBER_FOR_SCHEMATIC_PROBS;
    }
    else {
      minProtonCount = MAX_PROTON_NUMBER_FOR_SCHEMATIC_PROBS + 1;
    }
    if ( this._isChargeProbType( problemType ) ) {
      // If the problem is asking about the charge, at least 50% of the
      // time we want a charged atom.
      requireCharged = Math.random() > 0.5;
    }
    var atomValue = availableAtomValues.getRandomAtomValue( minProtonCount, maxProtonCount, requireCharged );
    availableAtomValues.markAtomAsUsed( atomValue );
    return this._createProblem( model, problemType, atomValue );
  };

  /**
   * Create a single problem given a problem type (e.g. Schematic to
   * Element) and an atom value that defines that atom configuration.
   */
  ProblemSetFactory._createProblem = function( model, problemType, atomValue ) {
    var problem = null;
    switch( problemType ) {
      case 'counts-to-element':
        problem = new CountsToElementProblem( model, atomValue );
        break;
      case 'counts-to-charge':
        problem = new CountsToChargeProblem( model, atomValue );
        break;
      case 'counts-to-mass':
        problem = new CountsToMassNumberProblem( model, atomValue );
        break;
      case 'counts-to-symbol-all':
        problem = new CountsToSymbolProblem( model, atomValue, true, true, true );
        break;
      case 'counts-to-symbol-charge':
        problem = new CountsToSymbolProblem( model, atomValue, false, false, true );
        break;
      case 'counts-to-symbol-mass':
        problem = new CountsToSymbolProblem( model, atomValue, false, true, false );
        break;
      case 'counts-to-symbol-proton-count':
        problem = new CountsToSymbolProblem( model, atomValue, true, false, false );
        break;
      case 'schematic-to-element':
        problem = new SchematicToElementProblem( model, atomValue );
        break;
      case 'schematic-to-charge':
        problem = new SchematicToChargeProblem( model, atomValue );
        break;
      case 'schematic-to-mass':
        problem = new SchematicToMassNumberProblem( model, atomValue );
        break;
      case 'schematic-to-symbol-all':
        problem = new SchematicToSymbolProblem( model, atomValue, true, true, true );
        break;
      case 'schematic-to-symbol-charge':
        problem = new SchematicToSymbolProblem( model, atomValue, false, false, true );
        break;
      case 'schematic-to-symbol-mass-number':
        problem = new SchematicToSymbolProblem( model, atomValue, false, true, false );
        break;
      case 'schematic-to-symbol-proton-count':
        problem = new SchematicToSymbolProblem( model, atomValue, true, false, false );
        break;
      case 'symbol-to-counts':
        problem = new SymbolToCountsProblem( model, atomValue );
        break;
      case 'symbol-to-schematic':
        problem = new SymbolToSchematicProblem( model, atomValue );
        break;
      default:
        throw new Error( "Error: Request to create unknown problem type, type = " + problemType );
    }
    return problem;
  };

  /**
   * Helper function to determine whether a given problem type has a
   * schematic atom representation on either either side of the problem.
   *
   * @param problemType
   * @return
   */
  ProblemSetFactory._isSchematicProbType = function( problemType ) {
    return ( problemType === 'schematic-to-element' ||
             problemType === 'schematic-to-charge' ||
             problemType === 'schematic-to-mass' ||
             problemType === 'schematic-to-symbol-all' ||
             problemType === 'schematic-to-symbol-proton-count' ||
             problemType === 'schematic-to-symbol-charge' ||
             problemType === 'schematic-to-symbol-mass-number' ||
             problemType === 'symbol-to-schematic' );
  };

  /**
   * Helper function to determine whether a given problem is requesting an
   * answer about an atom's charge on the right side of the problem.
   *
   * @param problemType
   * @return
   */
  ProblemSetFactory._isChargeProbType = function( problemType ) {
    return ( problemType === 'schematic-to-charge' ||
             problemType === 'counts-to-charge' ||
             problemType === 'counts-to-symbol-charge' ||
             problemType === 'schematic-to-symbol-charge'
    );
  };

  return ProblemSetFactory;
} );
