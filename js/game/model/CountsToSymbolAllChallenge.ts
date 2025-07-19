// Copyright 2025, University of Colorado Boulder

/**
 * Class for the Counts to Symbol challenge where the user
 * has to fill in all the particle counts for an atom symbol:
 * Proton Count, Atomic Mass and Net Charge.
 *
 * @author Agustín Vallejo
 */

import Bounds2 from '../../../../dot/js/Bounds2.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import buildAnAtom from '../../buildAnAtom.js';
import CountsToSymbolChallengeView from '../view/CountsToSymbolChallengeView.js';
import CountsToSymbolChallenge from './CountsToSymbolChallenge.js';
import GameModel from './GameModel.js';

class CountsToSymbolAllChallenge extends CountsToSymbolChallenge {

  public constructor( buildAnAtomGameModel: GameModel, tandem: Tandem ) {
    super( buildAnAtomGameModel, 'counts-to-symbol-all', tandem, true, true, true );
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