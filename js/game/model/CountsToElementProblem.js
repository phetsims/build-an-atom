// Copyright 2013-2015, University of Colorado Boulder

/**
 * Problem where the user is presented with a set of counts for protons,
 * neutrons, and electrons, and must find the represented element on a
 * periodic table.
 *
 * @author John Blanco
 */
define( function( require ) {
  'use strict';

  // modules
  var buildAnAtom = require( 'BUILD_AN_ATOM/buildAnAtom' );
  var ToElementProblem = require( 'BUILD_AN_ATOM/game/model/ToElementProblem' );
  var CountsToElementProblemView = require( 'BUILD_AN_ATOM/game/view/CountsToElementProblemView' );
  var inherit = require( 'PHET_CORE/inherit' );

  /**
   * @param {BAAGameModel} buildAnAtomGameModel
   * @param {NumberAtom} answerAtom
   * @constructor
   */
  function CountsToElementProblem( buildAnAtomGameModel, answerAtom ) {
    ToElementProblem.call( this, buildAnAtomGameModel, answerAtom );
  }

  buildAnAtom.register( 'CountsToElementProblem', CountsToElementProblem );

  // Inherit from base class and define the methods for this object.
  return inherit( ToElementProblem, CountsToElementProblem, {

    // Create the view needed to visual represent this problem.
    createView: function( layoutBounds, tandem ) {
      return new CountsToElementProblemView( this, layoutBounds, tandem.createTandem( 'countsToElementProblemView' ) );
    }
  } );
} );
