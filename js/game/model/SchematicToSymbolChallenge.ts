// Copyright 2013-2021, University of Colorado Boulder

/**
 * Type for game challenges where the user is presented with a set of particle
 * counts for an atom and must determine the total charge and enter it in an
 * interactive element symbol.
 *
 * @author John Blanco
 */

import Bounds2 from '../../../../dot/js/Bounds2.js';
import NumberAtom from '../../../../shred/js/model/NumberAtom.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import buildAnAtom from '../../buildAnAtom.js';
import SchematicToSymbolChallengeView from '../view/SchematicToSymbolChallengeView.js';
import BAAGameChallenge from './BAAGameChallenge.js';
import GameModel from './GameModel.js';

class SchematicToSymbolChallenge extends BAAGameChallenge {

  // TODO: Maybe these Symbol challenges should be made a parent class? https://github.com/phetsims/build-an-atom/issues/241
  public readonly configurableProtonCount: boolean;
  public readonly configurableMassNumber: boolean;
  public readonly configurableCharge: boolean;

  public constructor(
    buildAnAtomGameModel: GameModel,
    answerAtom: NumberAtom,
    challengeType: string,
    tandem: Tandem,
    configurableProtonCount: boolean,
    configurableMassNumber: boolean,
    configurableCharge: boolean
  ) {
    super( buildAnAtomGameModel, answerAtom, challengeType, tandem );
    this.configurableProtonCount = configurableProtonCount;
    this.configurableMassNumber = configurableMassNumber;
    this.configurableCharge = configurableCharge;
  }

  /**
   * Create the view needed to visually represent this challenge.
   */
  public createView( layoutBounds: Bounds2, tandem: Tandem ): SchematicToSymbolChallengeView {
    return new SchematicToSymbolChallengeView( this, layoutBounds, tandem.createTandem( 'schematicToSymbolChallengeView' ) );
  }
}

buildAnAtom.register( 'SchematicToSymbolChallenge', SchematicToSymbolChallenge );

export default SchematicToSymbolChallenge;