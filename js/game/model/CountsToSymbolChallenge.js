// Copyright 2013-2019, University of Colorado Boulder

/**
 * Type for game challenges where the user is presented with a set of particle
 * counts for an atom and must determine the total charge and enter it in an
 * interactive element symbol.
 *
 * @author John Blanco
 */
define( require => {
  'use strict';

  // modules
  const BAAGameChallenge = require( 'BUILD_AN_ATOM/game/model/BAAGameChallenge' );
  const buildAnAtom = require( 'BUILD_AN_ATOM/buildAnAtom' );
  const CountsToSymbolChallengeView = require( 'BUILD_AN_ATOM/game/view/CountsToSymbolChallengeView' );
  const inherit = require( 'PHET_CORE/inherit' );

  /**
   * @param {BAAGameModel} buildAnAtomGameModel
   * @param {NumberAtom} answerAtom
   * @param {string} challengeType
   * @param {Tandem} tandem
   * @param {boolean} configurableProtonCount
   * @param {boolean} configurableMassNumber
   * @param {boolean} configurableCharge
   * @constructor
   */
  function CountsToSymbolChallenge( buildAnAtomGameModel, answerAtom, challengeType, tandem, configurableProtonCount, configurableMassNumber, configurableCharge ) {
    BAAGameChallenge.call( this, buildAnAtomGameModel, answerAtom, challengeType, tandem );
    this.configurableProtonCount = configurableProtonCount;
    this.configurableMassNumber = configurableMassNumber;
    this.configurableCharge = configurableCharge;
  }

  buildAnAtom.register( 'CountsToSymbolChallenge', CountsToSymbolChallenge );

  // Inherit from base class and define the methods for this object.
  return inherit( BAAGameChallenge, CountsToSymbolChallenge, {

    // Create the view needed to visual represent this challenge.
    createView: function( layoutBounds, tandem ) {
      return new CountsToSymbolChallengeView( this, layoutBounds, tandem.createTandem( 'countsToSymbolChallengeView' ) );
    }
  } );
} );
