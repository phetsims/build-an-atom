// Copyright 2013-2025, University of Colorado Boulder

/**
 * SymbolToSchematicChallenge is the model for a game challenge where the user is presented with a chemical symbol
 * including proton count (aka atomic number), mass number, and charge, and needs to construct the equivalent atom from
 * buckets of protons, neutrons, and electrons.
 *
 * @author John Blanco (PhET Interactive Simulations)
 */

import Tandem from '../../../../tandem/js/Tandem.js';
import buildAnAtom from '../../buildAnAtom.js';
import BAAModel from '../../common/model/BAAModel.js';
import BAAGameChallenge from './BAAGameChallenge.js';
import { ChallengeType } from './ChallengeType.js';
import GameModel from './GameModel.js';

class SymbolToSchematicChallenge extends BAAGameChallenge {

  // The model representing the user's submitted answer (the atom they built).
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
   * Step the atom model when the challenge is stepped.  This is needed for animation.
   */
  public override step( dt: number ): void {
    this.submittedAnswerModel.step( dt );
  }
}

buildAnAtom.register( 'SymbolToSchematicChallenge', SymbolToSchematicChallenge );

export default SymbolToSchematicChallenge;