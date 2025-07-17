// Copyright 2017-2025, University of Colorado Boulder

/**
 * Base type for challenges where the user is presented with a set of particle
 * counts for an atom and must determine the mass number.
 *
 * @author John Blanco
 */

import Bounds2 from '../../../../dot/js/Bounds2.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import buildAnAtom from '../../buildAnAtom.js';
import CountsToMassNumberChallengeView from '../view/CountsToMassNumberChallengeView.js';
import BAAGameChallenge from './BAAGameChallenge.js';
import GameModel from './GameModel.js';

class CountsToMassNumberChallenge extends BAAGameChallenge {

  public constructor( buildAnAtomGameModel: GameModel, challengeType: string, tandem: Tandem ) {
    super( buildAnAtomGameModel, challengeType, tandem );
  }

  /**
   * Create the view needed to visually represent this challenge.
   */
  public override createView( layoutBounds: Bounds2, tandem: Tandem ): CountsToMassNumberChallengeView {
    return new CountsToMassNumberChallengeView( this, layoutBounds, tandem.createTandem( 'countsToMassNumberChallengeView' ) );
  }
}

buildAnAtom.register( 'CountsToMassNumberChallenge', CountsToMassNumberChallenge );

export default CountsToMassNumberChallenge;