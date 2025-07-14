// Copyright 2017-2025, University of Colorado Boulder

/**
 * Type for game challenges where the user is presented with a set of particle
 * counts for an atom and must determine the total charge.
 *
 * @author John Blanco
 */

import Bounds2 from '../../../../dot/js/Bounds2.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import buildAnAtom from '../../buildAnAtom.js';
import CountsToChargeChallengeView from '../view/CountsToChargeChallengeView.js';
import AnswerAtom from './AnswerAtom.js';
import BAAGameChallenge from './BAAGameChallenge.js';
import GameModel from './GameModel.js';

class CountsToChargeChallenge extends BAAGameChallenge {

  public constructor( buildAnAtomGameModel: GameModel, answerAtom: AnswerAtom, challengeType: string, tandem: Tandem ) {
    super( buildAnAtomGameModel, answerAtom, challengeType, tandem );
  }

  /**
   * Create the view needed to visually represent this challenge.
   */
  public createView( layoutBounds: Bounds2, tandem: Tandem ): CountsToChargeChallengeView {
    return new CountsToChargeChallengeView( this, layoutBounds, tandem.createTandem( 'countsToChargeChallengeView' ) );
  }
}

buildAnAtom.register( 'CountsToChargeChallenge', CountsToChargeChallenge );

export default CountsToChargeChallenge;