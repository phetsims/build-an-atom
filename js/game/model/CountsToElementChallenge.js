// Copyright 2017-2021, University of Colorado Boulder

/**
 * Challenge where the user is presented with a set of counts for protons,
 * neutrons, and electrons, and must find the represented element on a
 * periodic table.
 *
 * @author John Blanco
 */

import buildAnAtom from '../../buildAnAtom.js';
import CountsToElementChallengeView from '../view/CountsToElementChallengeView.js';
import ToElementChallenge from './ToElementChallenge.js';

class CountsToElementChallenge extends ToElementChallenge {

  /**
   * @param {GameModel} buildAnAtomGameModel
   * @param {NumberAtom} answerAtom
   * @param {string} challengeType
   * @param {Tandem} tandem
   */
  constructor( buildAnAtomGameModel, answerAtom, challengeType, tandem ) {
    super( buildAnAtomGameModel, answerAtom, challengeType, tandem );
  }

  /**
   * Create the view needed to visual represent this challenge.
   * @param {Bounds2} layoutBounds
   * @param {Tandem} tandem
   * @returns {CountsToChargeChallengeView}
   * @public
   */
  createView( layoutBounds, tandem ) {
    return new CountsToElementChallengeView( this, layoutBounds, tandem.createTandem( 'countsToElementChallengeView' ) );
  }
}

buildAnAtom.register( 'CountsToElementChallenge', CountsToElementChallenge );

export default CountsToElementChallenge;