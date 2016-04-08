// Copyright 2013-2015, University of Colorado Boulder

/**
 * Problem where the user is presented with a schematic representation of an
 * atom (which looks much like the atoms constructed on the 1st tab), and must
 * determine the charge.
 *
 * @author John Blanco
 */
define( function( require ) {
  'use strict';

  // modules
  var buildAnAtom = require( 'BUILD_AN_ATOM/buildAnAtom' );
  var BAAGameProblem = require( 'BUILD_AN_ATOM/game/model/BAAGameProblem' );
  var SchematicToChargeProblemView = require( 'BUILD_AN_ATOM/game/view/SchematicToChargeProblemView' );
  var inherit = require( 'PHET_CORE/inherit' );

  /**
   * @param {BAAGameModel} buildAnAtomGameModel
   * @param {NumberAtom} answerAtom
   * @constructor
   */
  function SchematicToChargeProblem( buildAnAtomGameModel, answerAtom ) {
    BAAGameProblem.call( this, buildAnAtomGameModel, answerAtom );
  }

  buildAnAtom.register( 'SchematicToChargeProblem', SchematicToChargeProblem );

  // Inherit from base class and define the methods for this object.
  return inherit( BAAGameProblem, SchematicToChargeProblem, {

    // Create the view needed to visual represent this problem.
    createView: function( layoutBounds, tandem ) {
      return new SchematicToChargeProblemView( this, layoutBounds, tandem.createTandem( 'schematicToChargeProblemView' ) );
    }
  } );
} );
