// Copyright 2002-2013, University of Colorado Boulder

/**
 * Problem where the user is presented with a schematic representation of an
 * atom (which looks much like the atoms constructed on the 1st tab), and must
 * determine the mass number.
 *
 * @author John Blanco
 */
define( function( require ) {
  'use strict';

  // Imports
  var BAAGameProblem = require( 'game/model/BAAGameProblem' );
  var SchematicToMassNumberProblemView = require( 'game/view/SchematicToMassNumberProblemView' );
  var inherit = require( 'PHET_CORE/inherit' );
  var SharedConstants = require( 'common/SharedConstants' );

  /**
   * Main constructor function.
   *
   * @constructor
   */
  function SchematicToMassNumberProblem( buildAnAtomGameModel, answerAtom ) {
    BAAGameProblem.call( this, buildAnAtomGameModel, answerAtom );
  }

  // Inherit from base class and define the methods for this object.
  return inherit( BAAGameProblem, SchematicToMassNumberProblem, {

    // Create the view needed to visual represent this problem.
    createView: function( layoutBounds ) {
      return new SchematicToMassNumberProblemView( this, layoutBounds );
    }
  } );
} );
