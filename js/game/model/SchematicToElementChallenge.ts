// Copyright 2017-2025, University of Colorado Boulder

/**
 * Challenge where the user is presented with a schematic representation of an atom (which looks much like the atoms
 * constructed on the 1st tab), and must find the represented element on a periodic table.
 *
 * @author John Blanco (PhET Interactive Simulations)
 */

import Tandem from '../../../../tandem/js/Tandem.js';
import buildAnAtom from '../../buildAnAtom.js';
import { ChallengeType } from './ChallengeType.js';
import GameModel from './GameModel.js';
import ToElementChallenge from './ToElementChallenge.js';

class SchematicToElementChallenge extends ToElementChallenge {

  public constructor( buildAnAtomGameModel: GameModel, challengeType: ChallengeType, tandem: Tandem ) {
    super( buildAnAtomGameModel, challengeType, tandem );
  }
}

buildAnAtom.register( 'SchematicToElementChallenge', SchematicToElementChallenge );

export default SchematicToElementChallenge;