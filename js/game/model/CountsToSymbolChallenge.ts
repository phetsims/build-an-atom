// Copyright 2013-2025, University of Colorado Boulder

/**
 * Type for game challenges where the user is presented with a set of particle
 * counts for an atom and must determine the total charge and enter it in an
 * interactive element symbol.
 *
 * @author John Blanco
 */

import Bounds2 from '../../../../dot/js/Bounds2.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import buildAnAtom from '../../buildAnAtom.js';
import CountsToSymbolChallengeView from '../view/CountsToSymbolChallengeView.js';
import BAAGameChallenge from './BAAGameChallenge.js';
import GameModel from './GameModel.js';

class CountsToSymbolChallenge extends BAAGameChallenge {

  public constructor(
    buildAnAtomGameModel: GameModel,
    challengeType: string,
    tandem: Tandem,
    configurableProtonCount: boolean,
    configurableMassNumber: boolean,
    configurableCharge: boolean
  ) {
    super( buildAnAtomGameModel, challengeType, tandem );
    this.configurableProtonCount = configurableProtonCount;
    this.configurableMassNumber = configurableMassNumber;
    this.configurableCharge = configurableCharge;
  }

  /**
   * Create the view needed to visually represent this challenge.
   */
  public override createView( layoutBounds: Bounds2, tandem: Tandem ): CountsToSymbolChallengeView {
    // TODO: Create individual tandem for this class once is split into 4 different challenges https://github.com/phetsims/build-an-atom/issues/280
    return new CountsToSymbolChallengeView( this, layoutBounds, tandem.createTandem( 'countsToSymbolChallengeView' ) );
  }
}

buildAnAtom.register( 'CountsToSymbolChallenge', CountsToSymbolChallenge );

export default CountsToSymbolChallenge;