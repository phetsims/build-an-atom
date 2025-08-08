// Copyright 2025, University of Colorado Boulder

/**
 * Class for the Counts to Symbol challenge where the user has to fill in the attributes of an atom symbol in the style
 * that often appears in the periodic table, including: atomic number (proton count), mass number, and net charge.
 *
 * @author Agustín Vallejo
 * @author John Blanco (PhET Interactive Simulations)
 */

import Bounds2 from '../../../../dot/js/Bounds2.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import buildAnAtom from '../../buildAnAtom.js';
import CountsToSymbolChallengeView from '../view/CountsToSymbolChallengeView.js';
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

  /**
   * Create the view needed to visually represent this challenge.
   */
  public override createView( layoutBounds: Bounds2, tandem: Tandem ): CountsToSymbolChallengeView {
    return new CountsToSymbolChallengeView( this, layoutBounds, tandem.createTandem( 'countsToSymbolAllChallengeView' ) );
  }
}

buildAnAtom.register( 'CountsToSymbolAllChallenge', CountsToSymbolAllChallenge );

export default CountsToSymbolAllChallenge;