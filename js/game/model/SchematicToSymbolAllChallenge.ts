// Copyright 2025, University of Colorado Boulder

/**
 * Class for game challenge where the user sees a Schematic Atom and
 * has to fill in the corresponding Atom Symbol with all its components:
 * Proton Count, Atomic Mass and Net Charge.
 *
 * @author Agustín Vallejo
 */

import Bounds2 from '../../../../dot/js/Bounds2.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import buildAnAtom from '../../buildAnAtom.js';
import SchematicToSymbolChallengeView from '../view/SchematicToSymbolChallengeView.js';
import GameModel from './GameModel.js';
import SchematicToSymbolChallenge from './SchematicToSymbolChallenge.js';

class SchematicToSymbolAllChallenge extends SchematicToSymbolChallenge {

  public constructor( buildAnAtomGameModel: GameModel, tandem: Tandem ) {
    super( buildAnAtomGameModel, 'schematic-to-symbol-all', tandem, true, true, true );
  }

  /**
   * Create the view needed to visually represent this challenge.
   */
  public override createView( layoutBounds: Bounds2, tandem: Tandem ): SchematicToSymbolChallengeView {
    return new SchematicToSymbolChallengeView( this, layoutBounds, tandem.createTandem( 'schematicToSymbolAllChallengeView' ) );
  }
}

buildAnAtom.register( 'SchematicToSymbolAllChallenge', SchematicToSymbolAllChallenge );

export default SchematicToSymbolAllChallenge;