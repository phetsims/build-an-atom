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
  var assert = require( 'ASSERT/assert' )( 'build-an-atom' );
  var BAAGameProblem = require( 'game/model/BAAGameProblem' );
  var CountsToSymbolChargeProblemView = require( 'game/view/CountsToSymbolChargeProblemView' );
  var inherit = require( 'PHET_CORE/inherit' );
  var SharedConstants = require( 'common/SharedConstants' );

  /**
   * Main constructor function.
   *
   * @constructor
   */
  function CountsToSymbolChargeProblem( buildAnAtomGameModel, answerAtom ) {
    BAAGameProblem.call( this, buildAnAtomGameModel, answerAtom );
  }

  // Inherit from base class and define the methods for this object.
  inherit( BAAGameProblem, CountsToSymbolChargeProblem, {

    // Create the view needed to visual represent this problem.
    createView: function( layoutBounds ) {
      return new CountsToSymbolChargeProblemView( this, layoutBounds );
    }
  } );

  return CountsToSymbolChargeProblem;
} );
