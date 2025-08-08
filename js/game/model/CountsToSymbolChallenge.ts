// Copyright 2013-2025, University of Colorado Boulder

/**
 * Type for game challenges where the user is presented with a set of particle counts for an atom and must determine the
 * total charge and enter it in an interactive element symbol.
 *
 * @author John Blanco
 */

import Bounds2 from '../../../../dot/js/Bounds2.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import buildAnAtom from '../../buildAnAtom.js';
import CountsToSymbolChallengeView from '../view/CountsToSymbolChallengeView.js';
import { ChallengeType } from './ChallengeType.js';
import GameModel from './GameModel.js';
import ToSymbolChallenge, { ToSymbolChallengeOptions } from './ToSymbolChallenge.js';

class CountsToSymbolChallenge extends ToSymbolChallenge {

  public constructor( buildAnAtomGameModel: GameModel, challengeType: ChallengeType, options: ToSymbolChallengeOptions ) {
    super( buildAnAtomGameModel, challengeType, options );
  }

  /**
   * Create the view needed to visually represent this challenge.
   */
  public override createView( layoutBounds: Bounds2, tandem: Tandem ): CountsToSymbolChallengeView {
    return new CountsToSymbolChallengeView( this, layoutBounds, tandem.createTandem( 'countsToSymbolChallengeView' ) );
  }
}

buildAnAtom.register( 'CountsToSymbolChallenge', CountsToSymbolChallenge );

export default CountsToSymbolChallenge;