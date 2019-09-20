// Copyright 2017-2019, University of Colorado Boulder

/**
 * Challenge where the user is presented with a schematic representation of an
 * atom (which looks much like the atoms constructed on the 1st tab), and must
 * determine the charge.
 *
 * @author John Blanco
 */
define( require => {
  'use strict';

  // modules
  const BAAGameChallenge = require( 'BUILD_AN_ATOM/game/model/BAAGameChallenge' );
  const buildAnAtom = require( 'BUILD_AN_ATOM/buildAnAtom' );
  const inherit = require( 'PHET_CORE/inherit' );
  const SchematicToChargeChallengeView = require( 'BUILD_AN_ATOM/game/view/SchematicToChargeChallengeView' );

  /**
   * @param {BAAGameModel} buildAnAtomGameModel
   * @param {NumberAtom} answerAtom
   * @param {string} challengeType
   * @param {Tandem} tandem
   * @constructor
   */
  function SchematicToChargeChallenge( buildAnAtomGameModel, answerAtom, challengeType, tandem ) {
    BAAGameChallenge.call( this, buildAnAtomGameModel, answerAtom, challengeType, tandem );
  }

  buildAnAtom.register( 'SchematicToChargeChallenge', SchematicToChargeChallenge );

  // Inherit from base class and define the methods for this object.
  return inherit( BAAGameChallenge, SchematicToChargeChallenge, {

    // Create the view needed to visual represent this challenge.
    createView: function( layoutBounds, tandem ) {
      return new SchematicToChargeChallengeView( this, layoutBounds, tandem.createTandem( 'schematicToChargeChallengeView' ) );
    }
  } );
} );
