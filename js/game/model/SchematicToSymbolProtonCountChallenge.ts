// Copyright 2025-2026, University of Colorado Boulder

/**
 * Class for game challenge where the user sees a Schematic Atom and has to fill in the Proton Count value in the Atom
 * Symbol.
 *
 * @author Agustín Vallejo (PhET Interactive Simulations)
 */

import Tandem from '../../../../tandem/js/Tandem.js';
import { ChallengeType } from './ChallengeType.js';
import GameModel from './GameModel.js';
import SchematicToSymbolChallenge from './SchematicToSymbolChallenge.js';

class SchematicToSymbolProtonCountChallenge extends SchematicToSymbolChallenge {

  public constructor( buildAnAtomGameModel: GameModel, challengeType: ChallengeType, tandem: Tandem ) {
    super( buildAnAtomGameModel, challengeType, {
      isProtonCountConfigurable: true,
      isMassNumberConfigurable: false,
      isChargeConfigurable: false,
      tandem: tandem
    } );
  }
}

export default SchematicToSymbolProtonCountChallenge;
