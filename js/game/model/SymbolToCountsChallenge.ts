// Copyright 2017-2025, University of Colorado Boulder

/**
 * Type for game challenges where the user is presented with a chemical symbol including proton count, mass number, and
 * charge, and needs to determine the number of protons, neutrons, and electrons that comprise the atom.
 *
 * @author John Blanco
 */

import Tandem from '../../../../tandem/js/Tandem.js';
import buildAnAtom from '../../buildAnAtom.js';
import BAAGameChallenge from './BAAGameChallenge.js';
import { ChallengeType } from './ChallengeType.js';
import GameModel from './GameModel.js';

class SymbolToCountsChallenge extends BAAGameChallenge {

  public constructor( buildAnAtomGameModel: GameModel, challengeType: ChallengeType, tandem: Tandem ) {
    super( buildAnAtomGameModel, challengeType, tandem );
  }
}

buildAnAtom.register( 'SymbolToCountsChallenge', SymbolToCountsChallenge );

export default SymbolToCountsChallenge;