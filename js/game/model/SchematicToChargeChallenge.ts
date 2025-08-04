// Copyright 2017-2025, University of Colorado Boulder

/**
 * Challenge where the user is presented with a schematic representation of an
 * atom (which looks much like the atoms constructed on the 1st tab), and must
 * determine the charge.
 *
 * @author John Blanco
 */

import Bounds2 from '../../../../dot/js/Bounds2.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import buildAnAtom from '../../buildAnAtom.js';
import SchematicToChargeChallengeView from '../view/SchematicToChargeChallengeView.js';
import BAAGameChallenge from './BAAGameChallenge.js';
import GameModel from './GameModel.js';

class SchematicToChargeChallenge extends BAAGameChallenge {

  public constructor( buildAnAtomGameModel: GameModel, tandem: Tandem ) {
    super( buildAnAtomGameModel, tandem );
  }

  /**
   * Create the view needed to visually represent this challenge.
   */
  public override createView( layoutBounds: Bounds2, tandem: Tandem ): SchematicToChargeChallengeView {
    return new SchematicToChargeChallengeView( this, layoutBounds, tandem.createTandem( 'schematicToChargeChallengeView' ) );
  }
}

buildAnAtom.register( 'SchematicToChargeChallenge', SchematicToChargeChallenge );

export default SchematicToChargeChallenge;