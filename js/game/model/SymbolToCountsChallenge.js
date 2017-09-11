// Copyright 2013-2015, University of Colorado Boulder

/**
 * Type for game challenges where the user is presented with a chemical symbol
 * including atomic number, mass number, and charge, and needs to determine
 * the number of protons, neutrons, and electrons that comprise the atom.
 *
 * @author John Blanco
 */
define( function( require ) {
  'use strict';

  // modules
  var BAAGameChallenge = require( 'BUILD_AN_ATOM/game/model/BAAGameChallenge' );
  var buildAnAtom = require( 'BUILD_AN_ATOM/buildAnAtom' );
  var inherit = require( 'PHET_CORE/inherit' );
  var SymbolToCountsChallengeView = require( 'BUILD_AN_ATOM/game/view/SymbolToCountsChallengeView' );

  /**
   * @param {BAAGameModel} buildAnAtomGameModel
   * @param {NumberAtom} answerAtom
   * @constructor
   */
  function SymbolToCountsChallenge( buildAnAtomGameModel, answerAtom ) {
    BAAGameChallenge.call( this, buildAnAtomGameModel, answerAtom );
  }

  buildAnAtom.register( 'SymbolToCountsChallenge', SymbolToCountsChallenge );

  // Inherit from base class and define the methods for this object.
  return inherit( BAAGameChallenge, SymbolToCountsChallenge, {

    // Create the view needed to visual represent this challenge.
    createView: function( layoutBounds, tandem ) {
      return new SymbolToCountsChallengeView( this, layoutBounds, tandem.createTandem( 'symbolToCountsChallengeView' ) );
    }
  } );
} );
