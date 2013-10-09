// Copyright 2002-2013, University of Colorado Boulder

/**
 * Type for game problems where the user is presented with a chemical symbol
 * including atomic number, mass number, and charge, and needs to determine
 * the number of protons, neutrons, and electrons that comprise the atom.
 *
 * @author John Blanco
 */
define( function( require ) {
  'use strict';

  // Imports
  var BAAGameProblem = require( 'game/model/BAAGameProblem' );
  var SymbolToCountsProblemView = require( 'game/view/SymbolToCountsProblemView' );
  var inherit = require( 'PHET_CORE/inherit' );
  var SharedConstants = require( 'common/SharedConstants' );

  /**
   * Main constructor function.
   *
   * @constructor
   */
  function SymbolToCountsProblem( buildAnAtomGameModel, answerAtom ) {
    BAAGameProblem.call( this, buildAnAtomGameModel, answerAtom );
  }

  // Inherit from base class and define the methods for this object.
  return inherit( BAAGameProblem, SymbolToCountsProblem, {
    // Create the view needed to visual represent this problem.
    createView: function( layoutBounds ) {
      return new SymbolToCountsProblemView( this, layoutBounds );
    }
  } );
} );
