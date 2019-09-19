// Copyright 2017, University of Colorado Boulder

/**
 * Challenge where the user is presented with a set of counts for protons,
 * neutrons, and electrons, and must find the represented element on a
 * periodic table.
 *
 * @author John Blanco
 */
define( require => {
  'use strict';

  // modules
  const buildAnAtom = require( 'BUILD_AN_ATOM/buildAnAtom' );
  const CountsToElementChallengeView = require( 'BUILD_AN_ATOM/game/view/CountsToElementChallengeView' );
  const inherit = require( 'PHET_CORE/inherit' );
  const ToElementChallenge = require( 'BUILD_AN_ATOM/game/model/ToElementChallenge' );

  /**
   * @param {BAAGameModel} buildAnAtomGameModel
   * @param {NumberAtom} answerAtom
   * @param {string} challengeType
   * @param {Tandem} tandem
   * @constructor
   */
  function CountsToElementChallenge( buildAnAtomGameModel, answerAtom, challengeType, tandem ) {
    ToElementChallenge.call( this, buildAnAtomGameModel, answerAtom, challengeType, tandem );
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
