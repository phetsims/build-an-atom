// Copyright 2013-2025, University of Colorado Boulder

/**
 * Base type for challenges where the user is presented with some sort of information about an atom and must find the
 * atom on a periodic table, and must also determine whether it is an ion or a neutral atom.
 *
 * @author John Blanco (PhET Interactive Simulations)
 */

import Tandem from '../../../../tandem/js/Tandem.js';
import buildAnAtom from '../../buildAnAtom.js';
import BAAGameChallenge from './BAAGameChallenge.js';
import { ChallengeType } from './ChallengeType.js';
import GameModel from './GameModel.js';

abstract class ToElementChallenge extends BAAGameChallenge {
  protected constructor( buildAnAtomGameModel: GameModel, challengeType: ChallengeType, tandem: Tandem ) {
    super( buildAnAtomGameModel, challengeType, tandem );
  }
}

buildAnAtom.register( 'ToElementChallenge', ToElementChallenge );

export default ToElementChallenge;