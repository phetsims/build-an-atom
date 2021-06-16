// Copyright 2017-2021, University of Colorado Boulder

/**
 * Type for game challenges where the user is presented with a set of particle
 * counts for an atom and must determine the total charge.
 *
 * @author John Blanco
 */

import buildAnAtom from '../../buildAnAtom.js';
import CountsToChargeChallengeView from '../view/CountsToChargeChallengeView.js';
import BAAGameChallenge from './BAAGameChallenge.js';

class CountsToChargeChallenge extends BAAGameChallenge {

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
    return new CountsToChargeChallengeView( this, layoutBounds, tandem.createTandem( 'countsToChargeChallengeView' ) );
  }
}

buildAnAtom.register( 'CountsToChargeChallenge', CountsToChargeChallenge );

export default CountsToChargeChallenge;