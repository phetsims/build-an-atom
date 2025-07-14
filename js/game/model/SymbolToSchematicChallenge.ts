// Copyright 2013-2025, University of Colorado Boulder

/**
 * Type for game challenges where the user is presented with a chemical symbol
 * including atomic number, mass number, and charge, and needs to construct
 * the equivalent atom from buckets of protons, neutrons, and electrons.
 *
 * @author John Blanco
 */

import Bounds2 from '../../../../dot/js/Bounds2.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import buildAnAtom from '../../buildAnAtom.js';
import BuildAnAtomModel from '../../common/model/BuildAnAtomModel.js';
import SymbolToSchematicChallengeView from '../view/SymbolToSchematicChallengeView.js';
import AnswerAtom from './AnswerAtom.js';
import BAAGameChallenge from './BAAGameChallenge.js';
import GameModel from './GameModel.js';

class SymbolToSchematicChallenge extends BAAGameChallenge {

  public readonly buildAnAtomModel: BuildAnAtomModel;

  public constructor( buildAnAtomGameModel: GameModel, answerAtom: AnswerAtom, challengeType: string, tandem: Tandem ) {
    super( buildAnAtomGameModel, answerAtom, challengeType, tandem );

    // This challenge is a bit unique in that it has a model of an atom with which the user can interact. We want to
    // keep this model out of the state.
    this.buildAnAtomModel = new BuildAnAtomModel( Tandem.OPT_OUT );
  }

  /**
   * Create the view needed to visually represent this challenge.
   */
  public override createView( layoutBounds: Bounds2, tandem: Tandem ): SymbolToSchematicChallengeView {
    return new SymbolToSchematicChallengeView( this, layoutBounds, tandem.createTandem( 'symbolToSchematicChallengeView' ) );
  }

  /**
   * step the atom model when the challenge is stepped
   */
  public override step( dt: number ): void {
    this.buildAnAtomModel.step( dt );
  }
}

buildAnAtom.register( 'SymbolToSchematicChallenge', SymbolToSchematicChallenge );

export default SymbolToSchematicChallenge;