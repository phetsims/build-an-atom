// Copyright 2017-2025, University of Colorado Boulder

/**
 * Challenge where the user is presented with a set of counts for protons,
 * neutrons, and electrons, and must find the represented element on a
 * periodic table.
 *
 * @author John Blanco
 */

import Bounds2 from '../../../../dot/js/Bounds2.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import buildAnAtom from '../../buildAnAtom.js';
import CountsToElementChallengeView from '../view/CountsToElementChallengeView.js';
import GameModel from './GameModel.js';
import ToElementChallenge from './ToElementChallenge.js';

class CountsToElementChallenge extends ToElementChallenge {

  public constructor( buildAnAtomGameModel: GameModel, tandem: Tandem ) {
    super( buildAnAtomGameModel, 'counts-to-element', tandem );
  }

  /**
   * Create the view needed to visually represent this challenge.
   */
  public override createView( layoutBounds: Bounds2, tandem: Tandem ): CountsToElementChallengeView {
    return new CountsToElementChallengeView( this, layoutBounds, tandem.createTandem( 'countsToElementChallengeView' ) );
  }
}

buildAnAtom.register( 'CountsToElementChallenge', CountsToElementChallenge );

export default CountsToElementChallenge;