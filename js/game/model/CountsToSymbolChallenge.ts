// Copyright 2013-2025, University of Colorado Boulder

/**
 * Type for game challenges where the user is presented with a set of particle counts for an atom and must determine the
 * total charge and enter it in an interactive element symbol.
 *
 * @author John Blanco (PhET Interactive Simulations)
 */

import buildAnAtom from '../../buildAnAtom.js';
import { ChallengeType } from './ChallengeType.js';
import GameModel from './GameModel.js';
import ToSymbolChallenge, { ToSymbolChallengeOptions } from './ToSymbolChallenge.js';

class CountsToSymbolChallenge extends ToSymbolChallenge {

  public constructor( buildAnAtomGameModel: GameModel, challengeType: ChallengeType, options: ToSymbolChallengeOptions ) {
    super( buildAnAtomGameModel, challengeType, options );
  }
}

buildAnAtom.register( 'CountsToSymbolChallenge', CountsToSymbolChallenge );

export default CountsToSymbolChallenge;