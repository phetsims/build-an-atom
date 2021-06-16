// Copyright 2017-2021, University of Colorado Boulder

/**
 * Base type for challenges where the user is presented with a set of particle
 * counts for an atom and must determine the mass number.
 *
 * @author John Blanco
 */

import buildAnAtom from '../../buildAnAtom.js';
import CountsToMassNumberChallengeView from '../view/CountsToMassNumberChallengeView.js';
import BAAGameChallenge from './BAAGameChallenge.js';

class CountsToMassNumberChallenge extends BAAGameChallenge {

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
    return new CountsToMassNumberChallengeView( this, layoutBounds, tandem.createTandem( 'countsToMassNumberChallengeView' ) );
  }
}

buildAnAtom.register( 'CountsToMassNumberChallenge', CountsToMassNumberChallenge );

export default CountsToMassNumberChallenge;