// Copyright 2025, University of Colorado Boulder

/**
 * Class for the Counts to Symbol challenge where the user has to fill in the attributes of an atom symbol in the style
 * that often appears in the periodic table, including: proton count (aka the atomic number), mass number, and net
 * charge.
 *
 * @author Agustín Vallejo (PhET Interactive Simulations)
 * @author John Blanco (PhET Interactive Simulations)
 */

import Tandem from '../../../../tandem/js/Tandem.js';
import buildAnAtom from '../../buildAnAtom.js';
import { ChallengeType } from './ChallengeType.js';
import CountsToSymbolChallenge from './CountsToSymbolChallenge.js';
import GameModel from './GameModel.js';

class CountsToSymbolAllChallenge extends CountsToSymbolChallenge {

  public constructor( buildAnAtomGameModel: GameModel, challengeType: ChallengeType, tandem: Tandem ) {
    super( buildAnAtomGameModel, challengeType, {
      isProtonCountConfigurable: true,
      isMassNumberConfigurable: true,
      isChargeConfigurable: true,
      tandem: tandem
    } );
  }
}

buildAnAtom.register( 'CountsToSymbolAllChallenge', CountsToSymbolAllChallenge );

export default CountsToSymbolAllChallenge;