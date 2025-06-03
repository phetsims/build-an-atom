// Copyright 2017-2025, University of Colorado Boulder

/**
 * Challenge where the user is presented with a schematic representation of an
 * atom (which looks much like the atoms constructed on the 1st tab), and must
 * determine the mass number.
 *
 * @author John Blanco
 */

import Bounds2 from '../../../../dot/js/Bounds2.js';
import NumberAtom from '../../../../shred/js/model/NumberAtom.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import buildAnAtom from '../../buildAnAtom.js';
import SchematicToMassNumberChallengeView from '../view/SchematicToMassNumberChallengeView.js';
import BAAGameChallenge from './BAAGameChallenge.js';
import GameModel from './GameModel.js';

class SchematicToMassNumberChallenge extends BAAGameChallenge {

  public constructor( buildAnAtomGameModel: GameModel, answerAtom: NumberAtom, challengeType: string, tandem: Tandem ) {
    super( buildAnAtomGameModel, answerAtom, challengeType, tandem );
  }

  /**
   * Create the view needed to visually represent this challenge.
   */
  public override createView( layoutBounds: Bounds2, tandem: Tandem ): SchematicToMassNumberChallengeView {
    return new SchematicToMassNumberChallengeView( this, layoutBounds, tandem.createTandem( 'schematicToMassNumberChallengeView' ) );
  }
}

buildAnAtom.register( 'SchematicToMassNumberChallenge', SchematicToMassNumberChallenge );

export default SchematicToMassNumberChallenge;