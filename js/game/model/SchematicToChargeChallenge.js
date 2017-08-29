// Copyright 2013-2015, University of Colorado Boulder

/**
 * Challenge where the user is presented with a schematic representation of an
 * atom (which looks much like the atoms constructed on the 1st tab), and must
 * determine the charge.
 *
 * @author John Blanco
 */
define( function( require ) {
  'use strict';

  // modules
  var buildAnAtom = require( 'BUILD_AN_ATOM/buildAnAtom' );
  var BAAGameChallenge = require( 'BUILD_AN_ATOM/game/model/BAAGameChallenge' );
  var SchematicToChargeChallengeView = require( 'BUILD_AN_ATOM/game/view/SchematicToChargeChallengeView' );
  var inherit = require( 'PHET_CORE/inherit' );

  /**
   * @param {BAAGameModel} buildAnAtomGameModel
   * @param {NumberAtom} answerAtom
   * @constructor
   */
  function SchematicToChargeChallenge( buildAnAtomGameModel, answerAtom ) {
    BAAGameChallenge.call( this, buildAnAtomGameModel, answerAtom );
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
