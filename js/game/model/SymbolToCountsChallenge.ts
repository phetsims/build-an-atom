// Copyright 2017-2025, University of Colorado Boulder

/**
 * Type for game challenges where the user is presented with a chemical symbol
 * including atomic number, mass number, and charge, and needs to determine
 * the number of protons, neutrons, and electrons that comprise the atom.
 *
 * @author John Blanco
 */

import Bounds2 from '../../../../dot/js/Bounds2.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import buildAnAtom from '../../buildAnAtom.js';
import SymbolToCountsChallengeView from '../view/SymbolToCountsChallengeView.js';
import BAAGameChallenge from './BAAGameChallenge.js';
import GameModel from './GameModel.js';

class SymbolToCountsChallenge extends BAAGameChallenge {

  public constructor( buildAnAtomGameModel: GameModel, tandem: Tandem ) {
    super( buildAnAtomGameModel, tandem );
  }

  /**
   * Create the view needed to visually represent this challenge.
   */
  public override createView( layoutBounds: Bounds2, tandem: Tandem ): SymbolToCountsChallengeView {
    return new SymbolToCountsChallengeView( this, layoutBounds, tandem.createTandem( 'symbolToCountsChallengeView' ) );
  }
}

buildAnAtom.register( 'SymbolToCountsChallenge', SymbolToCountsChallenge );

export default SymbolToCountsChallenge;