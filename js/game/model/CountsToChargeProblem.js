// Copyright 2013-2015, University of Colorado Boulder

/**
 * Type for game problems where the user is presented with a set of particle
 * counts for an atom and must determine the total charge.
 *
 * @author John Blanco
 */
define( function( require ) {
  'use strict';

  // modules
  var BAAGameProblem = require( 'BUILD_AN_ATOM/game/model/BAAGameProblem' );
  var CountsToChargeProblemView = require( 'BUILD_AN_ATOM/game/view/CountsToChargeProblemView' );
  var inherit = require( 'PHET_CORE/inherit' );

  /**
   * Main constructor function.
   *
   * @constructor
   */
  function CountsToChargeProblem( buildAnAtomGameModel, answerAtom ) {
    BAAGameProblem.call( this, buildAnAtomGameModel, answerAtom );
  }

  // Inherit from base class and define the methods for this object.
  return inherit( BAAGameProblem, CountsToChargeProblem, {

    // Create the view needed to visual represent this problem.
    createView: function( layoutBounds, tandem ) {
      return new CountsToChargeProblemView( this, layoutBounds, tandem.createTandem( 'countsToChargeProblemView' ) );
    }
  } );
} );
