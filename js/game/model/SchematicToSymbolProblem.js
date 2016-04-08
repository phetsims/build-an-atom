// Copyright 2013-2015, University of Colorado Boulder

/**
 * Type for game problems where the user is presented with a set of particle
 * counts for an atom and must determine the total charge and enter it in an
 * interactive element symbol.
 *
 * @author John Blanco
 */
define( function( require ) {
  'use strict';

  // modules
  var buildAnAtom = require( 'BUILD_AN_ATOM/buildAnAtom' );
  var BAAGameProblem = require( 'BUILD_AN_ATOM/game/model/BAAGameProblem' );
  var SchematicToSymbolProblemView = require( 'BUILD_AN_ATOM/game/view/SchematicToSymbolProblemView' );
  var inherit = require( 'PHET_CORE/inherit' );

  /**
   * @param {BAAGameModel} buildAnAtomGameModel
   * @param {NumberAtom} answerAtom
   * @constructor
   */
  /**
   * @param {BAAGameModel} buildAnAtomGameModel
   * @param {NumberAtom} answerAtom
   * @param {boolean} configurableProtonCount
   * @param {boolean} configurableMassNumber
   * @param {boolean} configurableCharge
   * @constructor
   */
  function SchematicToSymbolProblem( buildAnAtomGameModel, answerAtom, configurableProtonCount, configurableMassNumber, configurableCharge ) {
    BAAGameProblem.call( this, buildAnAtomGameModel, answerAtom );
    this.configurableProtonCount = configurableProtonCount;
    this.configurableMassNumber = configurableMassNumber;
    this.configurableCharge = configurableCharge;
  }

  buildAnAtom.register( 'SchematicToSymbolProblem', SchematicToSymbolProblem );

  // Inherit from base class and define the methods for this object.
  return inherit( BAAGameProblem, SchematicToSymbolProblem, {

    // Create the view needed to visual represent this problem.
    createView: function( layoutBounds, tandem ) {
      return new SchematicToSymbolProblemView( this, layoutBounds, tandem.createTandem( 'schematicToSymbolProblemView' ) );
    }
  } );
} );
