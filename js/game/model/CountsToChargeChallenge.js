// Copyright 2017-2019, University of Colorado Boulder

/**
 * Type for game challenges where the user is presented with a set of particle
 * counts for an atom and must determine the total charge.
 *
 * @author John Blanco
 */
define( require => {
  'use strict';

  // modules
  const BAAGameChallenge = require( 'BUILD_AN_ATOM/game/model/BAAGameChallenge' );
  const buildAnAtom = require( 'BUILD_AN_ATOM/buildAnAtom' );
  const CountsToChargeChallengeView = require( 'BUILD_AN_ATOM/game/view/CountsToChargeChallengeView' );
  const inherit = require( 'PHET_CORE/inherit' );

  /**
   * @param {BAAGameModel} buildAnAtomGameModel
   * @param {NumberAtom} answerAtom
   * @param {string} challengeType
   * @param {Tandem} tandem
   * @constructor
   */
  function CountsToChargeChallenge( buildAnAtomGameModel, answerAtom, challengeType, tandem ) {
    BAAGameChallenge.call( this, buildAnAtomGameModel, answerAtom, challengeType, tandem );
  }

  buildAnAtom.register( 'CountsToChargeChallenge', CountsToChargeChallenge );

  // Inherit from base class and define the methods for this object.
  return inherit( BAAGameChallenge, CountsToChargeChallenge, {

    // Create the view needed to visual represent this challenge.
    createView: function( layoutBounds, tandem ) {
      return new CountsToChargeChallengeView( this, layoutBounds, tandem.createTandem( 'countsToChargeChallengeView' ) );
    }
  } );
} );
