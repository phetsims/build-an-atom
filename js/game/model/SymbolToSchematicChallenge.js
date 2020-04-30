// Copyright 2013-2020, University of Colorado Boulder

/**
 * Type for game challenges where the user is presented with a chemical symbol
 * including atomic number, mass number, and charge, and needs to construct
 * the equivalent atom from buckets of protons, neutrons, and electrons.
 *
 * @author John Blanco
 */

import inherit from '../../../../phet-core/js/inherit.js';
import buildAnAtom from '../../buildAnAtom.js';
import BuildAnAtomModel from '../../common/model/BuildAnAtomModel.js';
import SymbolToSchematicChallengeView from '../view/SymbolToSchematicChallengeView.js';
import BAAGameChallenge from './BAAGameChallenge.js';

/**
 * @param {BAAGameModel} buildAnAtomGameModel
 * @param {NumberAtom} answerAtom
 * @param {string} challengeType
 * @param {Tandem} tandem
 * @constructor
 */
function SymbolToSchematicChallenge( buildAnAtomGameModel, answerAtom, challengeType, tandem ) {
  BAAGameChallenge.call( this, buildAnAtomGameModel, answerAtom, challengeType, tandem );

  // This challenge is a bit unique in that it has a model of an atom with
  // which the user can interact. We want to keep this model out of the state
  this.buildAnAtomModel = new BuildAnAtomModel( tandem.createTandem( 'buildAnAtomModel' ), { phetioState: false } );
  this.buildAnAtomModel.showElementNameProperty.set( false );
  this.buildAnAtomModel.showNeutralOrIonProperty.set( false );
  this.buildAnAtomModel.showStableOrUnstableProperty.set( false );
}

buildAnAtom.register( 'SymbolToSchematicChallenge', SymbolToSchematicChallenge );

// Inherit from base class and define the methods for this object.

inherit( BAAGameChallenge, SymbolToSchematicChallenge, {

  dispose: function() {

    // Normally we must dispose objects in the reverse order they are created.  However, in this case, disposing
    // the model before disposing the view causes failures when the view tries to remove its listeners from the model.
    // Hence in this case, we must dispose the view first (in the parent call), then dispose the model next.
    BAAGameChallenge.prototype.dispose.call( this );
    this.buildAnAtomModel.dispose(); // We can dispose this after because it doesn't use anything the supertype depends on
  },

  // @public - create the view needed to visual represent this challenge
  createView: function( layoutBounds, tandem ) {
    return new SymbolToSchematicChallengeView( this, layoutBounds, tandem.createTandem( 'symbolToSchematicChallengeView' ) );
  },

  // @public - step the atom model when the challenge is stepped
  step: function( dt ) {
    this.buildAnAtomModel.step( dt );
  }
} );

export default SymbolToSchematicChallenge;