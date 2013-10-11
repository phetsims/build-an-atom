// Copyright 2002-2013, University of Colorado Boulder

/**
 * Problem where the user is presented with a set of counts for protons,
 * neutrons, and electrons, and must find the represented element on a
 * periodic table.
 *
 * @author John Blanco
 */
define( function( require ) {
  'use strict';

  // Imports
  var ToElementProblem = require( 'BUILD_AN_ATOM/game/model/ToElementProblem' );
  var CountsToElementProblemView = require( 'BUILD_AN_ATOM/game/view/CountsToElementProblemView' );
  var inherit = require( 'PHET_CORE/inherit' );
  var SharedConstants = require( 'BUILD_AN_ATOM/common/SharedConstants' );

  /**
   * Main constructor function.
   *
   * @constructor
   */
  function CountsToElementProblem( buildAnAtomGameModel, answerAtom ) {
    ToElementProblem.call( this, buildAnAtomGameModel, answerAtom );
  }

  // Inherit from base class and define the methods for this object.
  return inherit( ToElementProblem, CountsToElementProblem, {

    // Create the view needed to visual represent this problem.
    createView: function( layoutBounds ) {
      return new CountsToElementProblemView( this, layoutBounds );
    }
  } );
} );
