// Copyright 2017-2025, University of Colorado Boulder

/**
 * Challenge where the user is presented with a schematic representation of an atom (which looks much like the atoms
 * constructed on the 1st tab), and must determine the mass number.
 *
 * @author John Blanco (PhET Interactive Simulations)
 */

import Tandem from '../../../../tandem/js/Tandem.js';
import buildAnAtom from '../../buildAnAtom.js';
import BAAGameChallenge from './BAAGameChallenge.js';
import { ChallengeType } from './ChallengeType.js';
import GameModel from './GameModel.js';

class SchematicToMassNumberChallenge extends BAAGameChallenge {

  public constructor( buildAnAtomGameModel: GameModel, challengeType: ChallengeType, tandem: Tandem ) {
    super( buildAnAtomGameModel, challengeType, tandem );
  }
}

buildAnAtom.register( 'SchematicToMassNumberChallenge', SchematicToMassNumberChallenge );

export default SchematicToMassNumberChallenge;