// Copyright 2017-2020, University of Colorado Boulder

/**
 * Challenge where the user is presented with a set of counts for protons,
 * neutrons, and electrons, and must find the represented element on a
 * periodic table.
 *
 * @author John Blanco
 */

import inherit from '../../../../phet-core/js/inherit.js';
import buildAnAtom from '../../buildAnAtom.js';
import CountsToElementChallengeView from '../view/CountsToElementChallengeView.js';
import ToElementChallenge from './ToElementChallenge.js';

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

inherit( ToElementChallenge, CountsToElementChallenge, {

  // Create the view needed to visual represent this challenge.
  createView: function( layoutBounds, tandem ) {
    return new CountsToElementChallengeView( this, layoutBounds, tandem.createTandem( 'countsToElementChallengeView' ) );
  }
} );

export default CountsToElementChallenge;