// Copyright 2002-2013, University of Colorado Boulder

/**
 * Type for game problems where the user is presented with a set of particle
 * counts for an atom and must determine the total charge and enter it in an
 * interactive element symbol.
 *
 * @author John Blanco
 */
define( function( require ) {
  'use strict';

  // Imports
  var BAAGameProblem = require( 'game/model/BAAGameProblem' );
  var SchematicToSymbolProblemView = require( 'game/view/SchematicToSymbolProblemView' );
  var inherit = require( 'PHET_CORE/inherit' );
  var SharedConstants = require( 'common/SharedConstants' );

  /**
   * Main constructor function.
   *
   * @constructor
   */
  function SchematicToSymbolProblem( buildAnAtomGameModel, answerAtom, configurableProtonCount, configurableMassNumber, configurableCharge ) {
    BAAGameProblem.call( this, buildAnAtomGameModel, answerAtom );
    this.configurableProtonCount = configurableProtonCount;
    this.configurableMassNumber = configurableMassNumber;
    this.configurableCharge = configurableCharge;
  }

  // Inherit from base class and define the methods for this object.
  return inherit( BAAGameProblem, SchematicToSymbolProblem, {

    // Create the view needed to visual represent this problem.
    createView: function( layoutBounds ) {
      return new SchematicToSymbolProblemView( this, layoutBounds );
    }
  } );
} );
