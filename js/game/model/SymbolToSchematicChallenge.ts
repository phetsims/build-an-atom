// Copyright 2013-2025, University of Colorado Boulder

/**
 * Type for game challenges where the user is presented with a chemical symbol including proton count, mass number, and
 * charge, and needs to construct the equivalent atom from buckets of protons, neutrons, and electrons.
 *
 * @author John Blanco
 */

import Tandem from '../../../../tandem/js/Tandem.js';
import buildAnAtom from '../../buildAnAtom.js';
import BAAModel from '../../common/model/BAAModel.js';
import BAAGameChallenge from './BAAGameChallenge.js';
import { ChallengeType } from './ChallengeType.js';
import GameModel from './GameModel.js';

class SymbolToSchematicChallenge extends BAAGameChallenge {

  public readonly submittedAnswerModel: BAAModel;

  public constructor( buildAnAtomGameModel: GameModel, challengeType: ChallengeType, tandem: Tandem ) {
    super( buildAnAtomGameModel, challengeType, tandem );

    // This challenge is a bit unique in that it has a model of an atom with which the user can interact. We want to
    // keep this model out of the state.
    this.submittedAnswerModel = new BAAModel( {
      isInitialAtomConfigurable: false,
      tandem: tandem.createTandem( 'submittedAnswerModel' )
    } );
  }

  /**
   * step the atom model when the challenge is stepped
   */
  public override step( dt: number ): void {
    this.submittedAnswerModel.step( dt );
  }
}

buildAnAtom.register( 'SymbolToSchematicChallenge', SymbolToSchematicChallenge );

export default SymbolToSchematicChallenge;