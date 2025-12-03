// Copyright 2017-2025, University of Colorado Boulder

/**
 * Base type for challenges where the user is presented with a set of particle counts for an atom and must determine the
 * mass number.
 *
 * @author John Blanco (PhET Interactive Simulations)
 */

import Tandem from '../../../../tandem/js/Tandem.js';
import buildAnAtom from '../../buildAnAtom.js';
import BAAGameChallenge from './BAAGameChallenge.js';
import { ChallengeType } from './ChallengeType.js';
import GameModel from './GameModel.js';

class CountsToMassNumberChallenge extends BAAGameChallenge {

  public constructor( buildAnAtomGameModel: GameModel, challengeType: ChallengeType, tandem: Tandem ) {
    super( buildAnAtomGameModel, challengeType, tandem );
  }
}

buildAnAtom.register( 'CountsToMassNumberChallenge', CountsToMassNumberChallenge );

export default CountsToMassNumberChallenge;