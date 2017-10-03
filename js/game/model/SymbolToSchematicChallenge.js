// Copyright 2013-2017, University of Colorado Boulder

/**
 * Type for game challenges where the user is presented with a chemical symbol
 * including atomic number, mass number, and charge, and needs to construct
 * the equivalent atom from buckets of protons, neutrons, and electrons.
 *
 * @author John Blanco
 */
define( function( require ) {
  'use strict';

  // modules
  var BAAGameChallenge = require( 'BUILD_AN_ATOM/game/model/BAAGameChallenge' );
  var buildAnAtom = require( 'BUILD_AN_ATOM/buildAnAtom' );
  var BuildAnAtomModel = require( 'BUILD_AN_ATOM/common/model/BuildAnAtomModel' );
  var inherit = require( 'PHET_CORE/inherit' );
  var SymbolToSchematicChallengeView = require( 'BUILD_AN_ATOM/game/view/SymbolToSchematicChallengeView' );

  /**
   * @param {BAAGameModel} buildAnAtomGameModel
   * @param {NumberAtom} answerAtom
   * @param {Tandem} tandem
   * @constructor
   */
  function SymbolToSchematicChallenge( buildAnAtomGameModel, answerAtom, tandem ) {
    BAAGameChallenge.call( this, buildAnAtomGameModel, answerAtom, tandem );

    // This challenge is a bit unique in that it has a model of an atom with
    // which the user can interact.
    this.buildAnAtomModel = new BuildAnAtomModel( tandem.createTandem( 'buildAnAtomModel' ) );
    this.buildAnAtomModel.showElementNameProperty.set( false );
    this.buildAnAtomModel.showNeutralOrIonProperty.set( false );
    this.buildAnAtomModel.showStableOrUnstableProperty.set( false );
  }

  buildAnAtom.register( 'SymbolToSchematicChallenge', SymbolToSchematicChallenge );

  // Inherit from base class and define the methods for this object.
  return inherit( BAAGameChallenge, SymbolToSchematicChallenge, {

    // @public - create the view needed to visual represent this challenge
    createView: function( layoutBounds, tandem ) {
      return new SymbolToSchematicChallengeView( this, layoutBounds, tandem.createTandem( 'symbolToSchematicChallengeView' ) );
    },

    // @public - step the atom model when the challenge is stepped
    step: function( dt ) {
      this.buildAnAtomModel.step( dt );
    }
  } );
} );
