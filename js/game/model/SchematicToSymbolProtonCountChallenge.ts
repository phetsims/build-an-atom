// Copyright 2025, University of Colorado Boulder

/**
 * Class for game challenge where the user sees a Schematic Atom and has to fill in the Proton Count value in the Atom
 * Symbol.
 *
 * @author Agustín Vallejo
 */

import Bounds2 from '../../../../dot/js/Bounds2.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import buildAnAtom from '../../buildAnAtom.js';
import SchematicToSymbolChallengeView from '../view/SchematicToSymbolChallengeView.js';
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

  /**
   * Create the view needed to visually represent this challenge.
   */
  public override createView( layoutBounds: Bounds2, tandem: Tandem ): SchematicToSymbolChallengeView {
    return new SchematicToSymbolChallengeView( this, layoutBounds, tandem.createTandem( 'schematicToSymbolProtonCountChallengeView' ) );
  }
}

buildAnAtom.register( 'SchematicToSymbolProtonCountChallenge', SchematicToSymbolProtonCountChallenge );

export default SchematicToSymbolProtonCountChallenge;