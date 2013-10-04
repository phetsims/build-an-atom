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
  var BAAGameProblem = require( 'game/model/BAAGameProblem' );
  var BuildAnAtomModel = require( 'common/model/BuildAnAtomModel' );
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

    // This problem is a bit unique in that it has a model of an atom with
    // which the user can interact.
    this.buildAnAtomModel = new BuildAnAtomModel();
    this.buildAnAtomModel.showElementName = false;
    this.buildAnAtomModel.showNeutralOrIon = false;
    this.buildAnAtomModel.showStableOrUnstable = false;
  }

  // Inherit from base class and define the methods for this object.
  inherit( BAAGameProblem, SymbolToSchematicProblem, {

    // Create the view needed to visual represent this problem.
    createView: function( layoutBounds ) {
      return new SymbolToSchematicProblemView( this, layoutBounds );
    },

    // Step the atom model when the problem is stepped.
    step: function( dt ) {
      this.buildAnAtomModel.step( dt );
    }
  } );

  return SymbolToSchematicProblem;
} );
