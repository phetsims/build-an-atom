// Copyright 2017, University of Colorado Boulder

/**
 * Base type for challenges where the user is presented with a set of particle
 * counts for an atom and must determine the mass number.
 *
 * @author John Blanco
 */
define( function( require ) {
  'use strict';

  // modules
  var BAAGameChallenge = require( 'BUILD_AN_ATOM/game/model/BAAGameChallenge' );
  var buildAnAtom = require( 'BUILD_AN_ATOM/buildAnAtom' );
  var CountsToMassNumberChallengeView = require( 'BUILD_AN_ATOM/game/view/CountsToMassNumberChallengeView' );
  var inherit = require( 'PHET_CORE/inherit' );

  /**
   * @param {BAAGameModel} buildAnAtomGameModel
   * @param {NumberAtom} answerAtom
   * @param {string} challengeType
   * @param {Tandem} tandem
   * @constructor
   */
  function CountsToMassNumberChallenge( buildAnAtomGameModel, answerAtom, challengeType, tandem ) {
    BAAGameChallenge.call( this, buildAnAtomGameModel, answerAtom, challengeType, tandem );
  }

  buildAnAtom.register( 'CountsToMassNumberChallenge', CountsToMassNumberChallenge );

  // Inherit from base class and define the methods for this object.
  return inherit( BAAGameChallenge, CountsToMassNumberChallenge, {

    // Create the view needed to visual represent this challenge.
    createView: function( layoutBounds, tandem ) {
      return new CountsToMassNumberChallengeView( this, layoutBounds, tandem.createTandem( 'countsToMassNumberChallengeView' ) );
    }
  } );
} );
