// Copyright 2025, University of Colorado Boulder

/**
 * Class for game challenge where the user sees a Schematic Atom and has to fill in the Net Charge value in the Atom
 * Symbol.
 *
 * @author Agustín Vallejo (PhET Interactive Simulations)
 */

import Tandem from '../../../../tandem/js/Tandem.js';
import buildAnAtom from '../../buildAnAtom.js';
import { ChallengeType } from './ChallengeType.js';
import GameModel from './GameModel.js';
import SchematicToSymbolChallenge from './SchematicToSymbolChallenge.js';

class SchematicToSymbolChargeChallenge extends SchematicToSymbolChallenge {

  public constructor( buildAnAtomGameModel: GameModel, challengeType: ChallengeType, tandem: Tandem ) {
    super( buildAnAtomGameModel, challengeType, {
      isProtonCountConfigurable: false,
      isMassNumberConfigurable: false,
      isChargeConfigurable: true,
      tandem: tandem
    } );
  }
}

buildAnAtom.register( 'SchematicToSymbolChargeChallenge', SchematicToSymbolChargeChallenge );

export default SchematicToSymbolChargeChallenge;