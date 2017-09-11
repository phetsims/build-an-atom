// Copyright 2013-2015, University of Colorado Boulder

/**
 * Challenge where the user is presented with a set of counts for protons,
 * neutrons, and electrons, and must find the represented element on a
 * periodic table.
 *
 * @author John Blanco
 */
define( function( require ) {
  'use strict';

  // modules
  var buildAnAtom = require( 'BUILD_AN_ATOM/buildAnAtom' );
  var CountsToElementChallengeView = require( 'BUILD_AN_ATOM/game/view/CountsToElementChallengeView' );
  var inherit = require( 'PHET_CORE/inherit' );
  var ToElementChallenge = require( 'BUILD_AN_ATOM/game/model/ToElementChallenge' );

  /**
   * @param {BAAGameModel} buildAnAtomGameModel
   * @param {NumberAtom} answerAtom
   * @constructor
   */
  function CountsToElementChallenge( buildAnAtomGameModel, answerAtom ) {
    ToElementChallenge.call( this, buildAnAtomGameModel, answerAtom );
  }

  buildAnAtom.register( 'CountsToElementChallenge', CountsToElementChallenge );

  // Inherit from base class and define the methods for this object.
  return inherit( ToElementChallenge, CountsToElementChallenge, {

    // Create the view needed to visual represent this challenge.
    createView: function( layoutBounds, tandem ) {
      return new CountsToElementChallengeView( this, layoutBounds, tandem.createTandem( 'countsToElementChallengeView' ) );
    }
  } );
} );
