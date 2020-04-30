// Copyright 2017-2020, University of Colorado Boulder

/**
 * Type for game challenges where the user is presented with a chemical symbol
 * including atomic number, mass number, and charge, and needs to determine
 * the number of protons, neutrons, and electrons that comprise the atom.
 *
 * @author John Blanco
 */

import inherit from '../../../../phet-core/js/inherit.js';
import buildAnAtom from '../../buildAnAtom.js';
import SymbolToCountsChallengeView from '../view/SymbolToCountsChallengeView.js';
import BAAGameChallenge from './BAAGameChallenge.js';

/**
 * @param {BAAGameModel} buildAnAtomGameModel
 * @param {NumberAtom} answerAtom
 * @param {string} challengeType
 * @param {Tandem} tandem
 * @constructor
 */
function SymbolToCountsChallenge( buildAnAtomGameModel, answerAtom, challengeType, tandem ) {
  BAAGameChallenge.call( this, buildAnAtomGameModel, answerAtom, challengeType, tandem );
}

buildAnAtom.register( 'SymbolToCountsChallenge', SymbolToCountsChallenge );

// Inherit from base class and define the methods for this object.

inherit( BAAGameChallenge, SymbolToCountsChallenge, {

  // Create the view needed to visual represent this challenge.
  createView: function( layoutBounds, tandem ) {
    return new SymbolToCountsChallengeView( this, layoutBounds, tandem.createTandem( 'symbolToCountsChallengeView' ) );
  }
} );

export default SymbolToCountsChallenge;