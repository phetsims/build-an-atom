// Copyright 2025-2026, University of Colorado Boulder

/**
 * Class for the Counts to Symbol challenge where the user has to fill in the Atomic Mass number for an atom symbol.
 *
 * @author Agustín Vallejo (PhET Interactive Simulations)
 */

import Tandem from '../../../../tandem/js/Tandem.js';
import { ChallengeType } from './ChallengeType.js';
import CountsToSymbolChallenge from './CountsToSymbolChallenge.js';
import GameModel from './GameModel.js';

class CountsToSymbolMassNumberChallenge extends CountsToSymbolChallenge {

  public constructor( buildAnAtomGameModel: GameModel, challengeType: ChallengeType, tandem: Tandem ) {
    super( buildAnAtomGameModel, challengeType, {
      isProtonCountConfigurable: false,
      isMassNumberConfigurable: true,
      isChargeConfigurable: false,
      tandem: tandem
    } );
  }
}

export default CountsToSymbolMassNumberChallenge;
