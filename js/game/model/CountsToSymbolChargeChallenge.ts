// Copyright 2025, University of Colorado Boulder

/**
 * Class for the Counts to Symbol challenge where the user
 * has to fill in the Net Charge number for an atom symbol.
 *
 * @author Agustín Vallejo
 */

import Bounds2 from '../../../../dot/js/Bounds2.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import buildAnAtom from '../../buildAnAtom.js';
import CountsToSymbolChallengeView from '../view/CountsToSymbolChallengeView.js';
import CountsToSymbolChallenge from './CountsToSymbolChallenge.js';
import GameModel from './GameModel.js';

class CountsToSymbolChargeChallenge extends CountsToSymbolChallenge {

  public constructor(
    buildAnAtomGameModel: GameModel,
    tandem: Tandem
  ) {
    super( buildAnAtomGameModel, tandem, false, false, true );
  }

  /**
   * Create the view needed to visually represent this challenge.
   */
  public override createView( layoutBounds: Bounds2, tandem: Tandem ): CountsToSymbolChallengeView {
    return new CountsToSymbolChallengeView( this, layoutBounds, tandem.createTandem( 'countsToSymbolChargeChallengeView' ) );
  }
}

buildAnAtom.register( 'CountsToSymbolChargeChallenge', CountsToSymbolChargeChallenge );

export default CountsToSymbolChargeChallenge;