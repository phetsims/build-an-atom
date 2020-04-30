// Copyright 2017-2020, University of Colorado Boulder

/**
 * Base type for challenges where the user is presented with a set of particle
 * counts for an atom and must determine the mass number.
 *
 * @author John Blanco
 */

import inherit from '../../../../phet-core/js/inherit.js';
import buildAnAtom from '../../buildAnAtom.js';
import CountsToMassNumberChallengeView from '../view/CountsToMassNumberChallengeView.js';
import BAAGameChallenge from './BAAGameChallenge.js';

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

inherit( BAAGameChallenge, CountsToMassNumberChallenge, {

  // Create the view needed to visual represent this challenge.
  createView: function( layoutBounds, tandem ) {
    return new CountsToMassNumberChallengeView( this, layoutBounds, tandem.createTandem( 'countsToMassNumberChallengeView' ) );
  }
} );

export default CountsToMassNumberChallenge;