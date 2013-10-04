// Copyright 2002-2013, University of Colorado Boulder

/**
 * Base type for problems where the user is presented with a set of particle
 * counts for an atom and must determine the mass number.
 *
 * @author John Blanco
 */
define( function( require ) {
  'use strict';

  // Imports
  var BAAGameProblem = require( 'game/model/BAAGameProblem' );
  var CountsToMassNumberProblemView = require( 'game/view/CountsToMassNumberProblemView' );
  var inherit = require( 'PHET_CORE/inherit' );
  var SharedConstants = require( 'common/SharedConstants' );

  /**
   * Main constructor function.
   *
   * @constructor
   */
  function CountsToMassNumberProblem( buildAnAtomGameModel, answerAtom ) {
    BAAGameProblem.call( this, buildAnAtomGameModel, answerAtom );
  }

  // Inherit from base class and define the methods for this object.
  inherit( BAAGameProblem, CountsToMassNumberProblem, {

    // Create the view needed to visual represent this problem.
    createView: function( layoutBounds ) {
      return new CountsToMassNumberProblemView( this, layoutBounds );
    }
  } );

  return CountsToMassNumberProblem;
} );
