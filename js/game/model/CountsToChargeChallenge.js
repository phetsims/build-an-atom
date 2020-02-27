// Copyright 2017-2019, University of Colorado Boulder

/**
 * Type for game challenges where the user is presented with a set of particle
 * counts for an atom and must determine the total charge.
 *
 * @author John Blanco
 */

import inherit from '../../../../phet-core/js/inherit.js';
import buildAnAtom from '../../buildAnAtom.js';
import CountsToChargeChallengeView from '../view/CountsToChargeChallengeView.js';
import BAAGameChallenge from './BAAGameChallenge.js';

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
export default inherit( BAAGameChallenge, CountsToChargeChallenge, {

  // Create the view needed to visual represent this challenge.
  createView: function( layoutBounds, tandem ) {
    return new CountsToChargeChallengeView( this, layoutBounds, tandem.createTandem( 'countsToChargeChallengeView' ) );
  }
} );