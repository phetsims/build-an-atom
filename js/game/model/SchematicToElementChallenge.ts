// Copyright 2017-2025, University of Colorado Boulder

/**
 * Challenge where the user is presented with a schematic representation of an
 * atom (which looks much like the atoms constructed on the 1st tab), and must
 * find the represented element on a periodic table.
 *
 * @author John Blanco
 */

import Bounds2 from '../../../../dot/js/Bounds2.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import buildAnAtom from '../../buildAnAtom.js';
import SchematicToElementChallengeView from '../view/SchematicToElementChallengeView.js';
import GameModel from './GameModel.js';
import ToElementChallenge from './ToElementChallenge.js';

class SchematicToElementChallenge extends ToElementChallenge {

  public constructor( buildAnAtomGameModel: GameModel, tandem: Tandem ) {
    super( buildAnAtomGameModel, 'schematic-to-element', tandem );
  }

  /**
   * Create the view needed to visually represent this challenge.
   */
  public override createView( layoutBounds: Bounds2, tandem: Tandem ): SchematicToElementChallengeView {
    return new SchematicToElementChallengeView( this, layoutBounds, tandem.createTandem( 'schematicToElementChallengeView' ) );
  }
}

buildAnAtom.register( 'SchematicToElementChallenge', SchematicToElementChallenge );

export default SchematicToElementChallenge;