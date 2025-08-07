// Copyright 2025, University of Colorado Boulder

/**
 * ToSymbolChallenge is a base class for challenges in the Build an Atom game where the user must answer the challenge
 * by entering correct values in an interactive chemical symbol.
 *
 * @author John Blanco (PhET Interactive Simulations)
 */

import Tandem from '../../../../tandem/js/Tandem.js';
import buildAnAtom from '../../buildAnAtom.js';
import BAAGameChallenge from './BAAGameChallenge.js';
import GameModel from './GameModel.js';

abstract class ToSymbolChallenge extends BAAGameChallenge {

  public configurableProtonCount = false;
  public configurableMassNumber = false;
  public configurableCharge = false;

  protected constructor( buildAnAtomGameModel: GameModel, tandem: Tandem ) {
    super( buildAnAtomGameModel, tandem );
  }
}

buildAnAtom.register( 'ToSymbolChallenge', ToSymbolChallenge );

export default ToSymbolChallenge;