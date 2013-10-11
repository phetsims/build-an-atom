// Copyright 2002-2013, University of Colorado Boulder

/**
 * Problem where the user is presented with a schematic representation of an
 * atom (which looks much like the atoms constructed on the 1st tab), and must
 * determine the charge.
 *
 * @author John Blanco
 */
define( function( require ) {
  'use strict';

  // Imports
  var BAAGameProblem = require( 'BUILD_AN_ATOM/game/model/BAAGameProblem' );
  var SchematicToChargeProblemView = require( 'BUILD_AN_ATOM/game/view/SchematicToChargeProblemView' );
  var inherit = require( 'PHET_CORE/inherit' );
  var SharedConstants = require( 'BUILD_AN_ATOM/common/SharedConstants' );

  /**
   * Main constructor function.
   *
   * @constructor
   */
  function SchematicToChargeProblem( buildAnAtomGameModel, answerAtom ) {
    BAAGameProblem.call( this, buildAnAtomGameModel, answerAtom );
  }

  // Inherit from base class and define the methods for this object.
  return inherit( BAAGameProblem, SchematicToChargeProblem, {

    // Create the view needed to visual represent this problem.
    createView: function( layoutBounds ) {
      return new SchematicToChargeProblemView( this, layoutBounds );
    }
  } );
} );
