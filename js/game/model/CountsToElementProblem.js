// Copyright 2002-2013, University of Colorado

/**
 * Problem where the user is presented with a set of counts for protons,
 * neutrons, and electrons, and must find the represented element on a
 * periodic table.
 *
 * @author John Blanco
 */
define( function( require ) {
  "use strict";

  // Imports
  var BAAGameProblem = require( 'game/model/BAAGameProblem' );
  var inherit = require( 'PHET_CORE/inherit' );

  // Constants

  /**
   * Main constructor function.
   *
   * @constructor
   */
  function CountsToElementProblem( buildAnAtomGameModel, answerAtom ) {
    BAAGameProblem.call( this, buildAnAtomGameModel, answerAtom )
  }

  // Inherit from base class and define the methods for this object.
  inherit( BAAGameProblem, CountsToElementProblem, {
    // Create the view needed to visual represent this problem.
    createView: function( gameScene ) {
      return new CountsToElementProblemView( this.model, this.answerAtom, gameScene );
    }
  } );

  return CountsToElementProblem;
} );
