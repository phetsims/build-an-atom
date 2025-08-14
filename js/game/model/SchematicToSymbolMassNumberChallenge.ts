// Copyright 2025, University of Colorado Boulder

/**
 * Class for game challenge where the user sees a Schematic Atom and has to fill in the Atomic Mass value in the Atom
 * Symbol.
 *
 * @author Agustín Vallejo
 */

import Tandem from '../../../../tandem/js/Tandem.js';
import buildAnAtom from '../../buildAnAtom.js';
import { ChallengeType } from './ChallengeType.js';
import GameModel from './GameModel.js';
import SchematicToSymbolChallenge from './SchematicToSymbolChallenge.js';

class SchematicToSymbolMassNumberChallenge extends SchematicToSymbolChallenge {

  public constructor( buildAnAtomGameModel: GameModel, challengeType: ChallengeType, tandem: Tandem ) {
    super( buildAnAtomGameModel, challengeType, {
      isProtonCountConfigurable: false,
      isMassNumberConfigurable: true,
      isChargeConfigurable: false,
      tandem: tandem
    } );
  }
}

buildAnAtom.register( 'SchematicToSymbolMassNumberChallenge', SchematicToSymbolMassNumberChallenge );

export default SchematicToSymbolMassNumberChallenge;