// Copyright 2025, University of Colorado Boulder

/**
 * Class for game challenge where the user sees a Schematic Atom and has to fill in the corresponding Atom Symbol with
 * all its components, i.e. proton count (aka the atomic number), mass number, and net charge.
 *
 * @author Agustín Vallejo (PhET Interactive Simulations)
 */

import Tandem from '../../../../tandem/js/Tandem.js';
import buildAnAtom from '../../buildAnAtom.js';
import { ChallengeType } from './ChallengeType.js';
import GameModel from './GameModel.js';
import SchematicToSymbolChallenge from './SchematicToSymbolChallenge.js';

class SchematicToSymbolAllChallenge extends SchematicToSymbolChallenge {

  public constructor( buildAnAtomGameModel: GameModel, challengeType: ChallengeType, tandem: Tandem ) {
    super( buildAnAtomGameModel, challengeType, {
      isProtonCountConfigurable: true,
      isMassNumberConfigurable: true,
      isChargeConfigurable: true,
      tandem: tandem
    } );
  }
}

buildAnAtom.register( 'SchematicToSymbolAllChallenge', SchematicToSymbolAllChallenge );

export default SchematicToSymbolAllChallenge;