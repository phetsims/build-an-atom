// Copyright 2013-2016, University of Colorado Boulder

/**
 * Type for game problems where the user is presented with a chemical symbol
 * including atomic number, mass number, and charge, and needs to determine
 * the number of protons, neutrons, and electrons that comprise the atom.
 *
 * @author John Blanco
 */
define( function( require ) {
  'use strict';

  // modules
  var buildAnAtom = require( 'BUILD_AN_ATOM/buildAnAtom' );
  var BAAGameProblem = require( 'BUILD_AN_ATOM/game/model/BAAGameProblem' );
  var SymbolToCountsProblemView = require( 'BUILD_AN_ATOM/game/view/SymbolToCountsProblemView' );
  var inherit = require( 'PHET_CORE/inherit' );

  /**
   * @param {BAAGameModel} buildAnAtomGameModel
   * @param {NumberAtom} answerAtom
   * @constructor
   */
  function SymbolToCountsProblem( buildAnAtomGameModel, answerAtom ) {
    BAAGameProblem.call( this, buildAnAtomGameModel, answerAtom );
  }

  buildAnAtom.register( 'SymbolToCountsProblem', SymbolToCountsProblem );

  // Inherit from base class and define the methods for this object.
  return inherit( BAAGameProblem, SymbolToCountsProblem, {

    // Create the view needed to visual represent this problem.
    createView: function( layoutBounds, tandem ) {
      return new SymbolToCountsProblemView( this, layoutBounds, tandem.createTandem( 'symbolToCountsProblemView' ) );
    }
  } );
} );
