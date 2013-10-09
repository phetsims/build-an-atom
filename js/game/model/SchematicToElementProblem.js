// Copyright 2002-2013, University of Colorado Boulder

/**
 * Problem where the user is presented with a schematic representation of an
 * atom (which looks much like the atoms constructed on the 1st tab), and must
 * find the represented element on a periodic table.
 *
 * @author John Blanco
 */
define( function( require ) {
  'use strict';

  // Imports
  var ToElementProblem = require( 'game/model/ToElementProblem' );
  var SchematicToElementProblemView = require( 'game/view/SchematicToElementProblemView' );
  var inherit = require( 'PHET_CORE/inherit' );
  var SharedConstants = require( 'common/SharedConstants' );

  /**
   * Main constructor function.
   *
   * @constructor
   */
  function SchematicToElementProblem( buildAnAtomGameModel, answerAtom ) {
    ToElementProblem.call( this, buildAnAtomGameModel, answerAtom );
  }

  // Inherit from base class and define the methods for this object.
  return inherit( ToElementProblem, SchematicToElementProblem, {

    // Create the view needed to visual represent this problem.
    createView: function( layoutBounds ) {
      return new SchematicToElementProblemView( this, layoutBounds );
    }
  } );
} );
