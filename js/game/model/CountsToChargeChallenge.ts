// Copyright 2017-2025, University of Colorado Boulder

/**
 * Type for game challenges where the user is presented with a set of particle counts for an atom and must determine the
 * total charge.
 *
 * @author John Blanco
 */

import Tandem from '../../../../tandem/js/Tandem.js';
import buildAnAtom from '../../buildAnAtom.js';
import BAAGameChallenge from './BAAGameChallenge.js';
import { ChallengeType } from './ChallengeType.js';
import GameModel from './GameModel.js';

class CountsToChargeChallenge extends BAAGameChallenge {

  public constructor( buildAnAtomGameModel: GameModel, challengeType: ChallengeType, tandem: Tandem ) {
    super( buildAnAtomGameModel, challengeType, tandem );
  }

}

buildAnAtom.register( 'CountsToChargeChallenge', CountsToChargeChallenge );

export default CountsToChargeChallenge;