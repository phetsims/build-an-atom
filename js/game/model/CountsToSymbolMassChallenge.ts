// Copyright 2013-2025, University of Colorado Boulder

/**
 * Class for the Counts to Symbol challenge where the user
 * has to fill in the Atomic Mass number for an atom symbol.
 *
 * @author Agustín Vallejo
 */

import Bounds2 from '../../../../dot/js/Bounds2.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import buildAnAtom from '../../buildAnAtom.js';
import CountsToSymbolChallengeView from '../view/CountsToSymbolChallengeView.js';
import CountsToSymbolChallenge from './CountsToSymbolChallenge.js';
import GameModel from './GameModel.js';

class CountsToSymbolMassChallenge extends CountsToSymbolChallenge {

  public constructor(
    buildAnAtomGameModel: GameModel,
    challengeType: string,
    tandem: Tandem
  ) {
    super( buildAnAtomGameModel, challengeType, tandem, false, true, true );
  }

  /**
   * Create the view needed to visually represent this challenge.
   */
  public override createView( layoutBounds: Bounds2, tandem: Tandem ): CountsToSymbolChallengeView {
    return new CountsToSymbolChallengeView( this, layoutBounds, tandem.createTandem( 'countsToSymbolMassChallengeView' ) );
  }
}

buildAnAtom.register( 'CountsToSymbolMassChallenge', CountsToSymbolMassChallenge );

export default CountsToSymbolMassChallenge;