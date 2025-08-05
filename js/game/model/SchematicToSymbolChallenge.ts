// Copyright 2013-2025, University of Colorado Boulder

/**
 * Type for game challenges where the user is presented with a set of particle counts for an atom and must determine the
 * total charge and enter it in an interactive element symbol.
 *
 * @author John Blanco
 */

import Bounds2 from '../../../../dot/js/Bounds2.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import buildAnAtom from '../../buildAnAtom.js';
import SchematicToSymbolChallengeView from '../view/SchematicToSymbolChallengeView.js';
import BAAGameChallenge from './BAAGameChallenge.js';
import GameModel from './GameModel.js';

class SchematicToSymbolChallenge extends BAAGameChallenge {

  public constructor(
    buildAnAtomGameModel: GameModel,
    tandem: Tandem,
    configurableProtonCount: boolean,
    configurableMassNumber: boolean,
    configurableCharge: boolean
  ) {
    super( buildAnAtomGameModel, tandem );
    this.configurableProtonCount = configurableProtonCount;
    this.configurableMassNumber = configurableMassNumber;
    this.configurableCharge = configurableCharge;
  }

  /**
   * Create the view needed to visually represent this challenge.
   */
  public override createView( layoutBounds: Bounds2, tandem: Tandem ): SchematicToSymbolChallengeView {
    return new SchematicToSymbolChallengeView( this, layoutBounds, tandem.createTandem( 'schematicToSymbolChallengeView' ) );
  }
}

buildAnAtom.register( 'SchematicToSymbolChallenge', SchematicToSymbolChallenge );

export default SchematicToSymbolChallenge;