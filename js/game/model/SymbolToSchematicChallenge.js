// Copyright 2013-2021, University of Colorado Boulder

/**
 * Type for game challenges where the user is presented with a chemical symbol
 * including atomic number, mass number, and charge, and needs to construct
 * the equivalent atom from buckets of protons, neutrons, and electrons.
 *
 * @author John Blanco
 */

import buildAnAtom from '../../buildAnAtom.js';
import BuildAnAtomModel from '../../common/model/BuildAnAtomModel.js';
import SymbolToSchematicChallengeView from '../view/SymbolToSchematicChallengeView.js';
import BAAGameChallenge from './BAAGameChallenge.js';

class SymbolToSchematicChallenge extends BAAGameChallenge {

  /**
   * @param {GameMode} buildAnAtomGameModel
   * @param {NumberAtom} answerAtom
   * @param {string} challengeType
   * @param {Tandem} tandem
   */
  constructor( buildAnAtomGameModel, answerAtom, challengeType, tandem ) {
    super( buildAnAtomGameModel, answerAtom, challengeType, tandem );

    // This challenge is a bit unique in that it has a model of an atom with
    // which the user can interact. We want to keep this model out of the state
    this.buildAnAtomModel = new BuildAnAtomModel( tandem.createTandem( 'buildAnAtomModel' ), { phetioState: false } );
    this.buildAnAtomModel.showElementNameProperty.set( false );
    this.buildAnAtomModel.showNeutralOrIonProperty.set( false );
    this.buildAnAtomModel.showStableOrUnstableProperty.set( false );
  }

  /**
   * release references
   * @public
   */
  dispose() {

    // Normally we must dispose objects in the reverse order they are created.  However, in this case, disposing
    // the model before disposing the view causes failures when the view tries to remove its listeners from the model.
    // Hence in this case, we must dispose the view first (in the parent call), then dispose the model next.
    super.dispose();
    this.buildAnAtomModel.dispose(); // We can dispose this after because it doesn't use anything the supertype depends on
  }

  /**
   * Create the view needed to visual represent this challenge.
   * @param {Bounds2} layoutBounds
   * @param {Tandem} tandem
   * @returns {CountsToChargeChallengeView}
   * @public
   */
  createView( layoutBounds, tandem ) {
    return new SymbolToSchematicChallengeView( this, layoutBounds, tandem.createTandem( 'symbolToSchematicChallengeView' ) );
  }

  // @public - step the atom model when the challenge is stepped
  step( dt ) {
    this.buildAnAtomModel.step( dt );
  }
}

buildAnAtom.register( 'SymbolToSchematicChallenge', SymbolToSchematicChallenge );

export default SymbolToSchematicChallenge;