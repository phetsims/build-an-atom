// Copyright 2013-2016, University of Colorado Boulder

/**
 * Problem where the user is presented with a schematic representation of an
 * atom (which looks much like the atoms constructed on the 1st tab), and must
 * find the represented element on a periodic table.
 *
 * @author John Blanco
 */
define( function( require ) {
  'use strict';

  // modules
  var buildAnAtom = require( 'BUILD_AN_ATOM/buildAnAtom' );
  var ToElementProblem = require( 'BUILD_AN_ATOM/game/model/ToElementProblem' );
  var SchematicToElementProblemView = require( 'BUILD_AN_ATOM/game/view/SchematicToElementProblemView' );
  var inherit = require( 'PHET_CORE/inherit' );

  /**
   * @param {BAAGameModel} buildAnAtomGameModel
   * @param {NumberAtom} answerAtom
   * @constructor
   */
  function SchematicToElementProblem( buildAnAtomGameModel, answerAtom ) {
    ToElementProblem.call( this, buildAnAtomGameModel, answerAtom );
  }

  buildAnAtom.register( 'SchematicToElementProblem',  SchematicToElementProblem );

  // Inherit from base class and define the methods for this object.
  return inherit( ToElementProblem, SchematicToElementProblem, {

    // Create the view needed to visual represent this problem.
    createView: function( layoutBounds, tandem ) {
      return new SchematicToElementProblemView( this, layoutBounds, tandem.createTandem( 'schematicToElementProblemView' ) );
    }
  } );
} );
