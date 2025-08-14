// Copyright 2025, University of Colorado Boulder

/**
 * Class for the Counts to Symbol challenge where the user has to fill in the Net Charge number for an atom symbol.
 *
 * @author Agustín Vallejo
 */

import Tandem from '../../../../tandem/js/Tandem.js';
import buildAnAtom from '../../buildAnAtom.js';
import { ChallengeType } from './ChallengeType.js';
import CountsToSymbolChallenge from './CountsToSymbolChallenge.js';
import GameModel from './GameModel.js';

class CountsToSymbolChargeChallenge extends CountsToSymbolChallenge {

  public constructor( buildAnAtomGameModel: GameModel, challengeType: ChallengeType, tandem: Tandem ) {
    super( buildAnAtomGameModel, challengeType, {
      isProtonCountConfigurable: false,
      isMassNumberConfigurable: false,
      isChargeConfigurable: true,
      tandem: tandem
    } );
  }
}

buildAnAtom.register( 'CountsToSymbolChargeChallenge', CountsToSymbolChargeChallenge );

export default CountsToSymbolChargeChallenge;