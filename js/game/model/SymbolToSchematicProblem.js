// Copyright 2002-2013, University of Colorado Boulder

/**
 * Type for game problems where the user is presented with a chemical symbol
 * including atomic number, mass number, and charge, and needs to construct
 * the equivalent atom from buckets of protons, neutrons, and electrons.
 *
 * @author John Blanco
 */
define( function( require ) {
  'use strict';

  // Imports
  var assert = require( 'ASSERT/assert' )( 'build-an-atom' );
  var BAAGameProblem = require( 'game/model/BAAGameProblem' );
  var SymbolToSchematicProblemView = require( 'game/view/SymbolToSchematicProblemView' );
  var inherit = require( 'PHET_CORE/inherit' );
  var SharedConstants = require( 'common/SharedConstants' );

  /**
   * Main constructor function.
   *
   * @constructor
   */
  function SymbolToSchematicProblem( buildAnAtomGameModel, answerAtom ) {
    BAAGameProblem.call( this, buildAnAtomGameModel, answerAtom );
  }

  // Inherit from base class and define the methods for this object.
  inherit( BAAGameProblem, SymbolToSchematicProblem, {
    // Create the view needed to visual represent this problem.
    createView: function( layoutBounds ) {
      return new SymbolToSchematicProblemView( this, layoutBounds );
    }
  } );

  return SymbolToSchematicProblem;
} );
