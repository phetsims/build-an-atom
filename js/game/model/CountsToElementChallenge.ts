// Copyright 2017-2025, University of Colorado Boulder

/**
 * Challenge where the user is presented with a set of counts for protons, neutrons, and electrons, and must find the
 * represented element on a periodic table.
 *
 * @author John Blanco
 */

import Tandem from '../../../../tandem/js/Tandem.js';
import buildAnAtom from '../../buildAnAtom.js';
import { ChallengeType } from './ChallengeType.js';
import GameModel from './GameModel.js';
import ToElementChallenge from './ToElementChallenge.js';

class CountsToElementChallenge extends ToElementChallenge {

  public constructor( buildAnAtomGameModel: GameModel, challengeType: ChallengeType, tandem: Tandem ) {
    super( buildAnAtomGameModel, challengeType, tandem );
  }
}

buildAnAtom.register( 'CountsToElementChallenge', CountsToElementChallenge );

export default CountsToElementChallenge;