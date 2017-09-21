// Copyright 2017, University of Colorado Boulder

/**
 * Challenge where the user is presented with a schematic representation of an
 * atom (which looks much like the atoms constructed on the 1st tab), and must
 * find the represented element on a periodic table.
 *
 * @author John Blanco
 */
define( function( require ) {
  'use strict';

  // modules
  var buildAnAtom = require( 'BUILD_AN_ATOM/buildAnAtom' );
  var inherit = require( 'PHET_CORE/inherit' );
  var SchematicToElementChallengeView = require( 'BUILD_AN_ATOM/game/view/SchematicToElementChallengeView' );
  var ToElementChallenge = require( 'BUILD_AN_ATOM/game/model/ToElementChallenge' );

  /**
   * @param {BAAGameModel} buildAnAtomGameModel
   * @param {NumberAtom} answerAtom
   * @constructor
   */
  function SchematicToElementChallenge( buildAnAtomGameModel, answerAtom ) {
    ToElementChallenge.call( this, buildAnAtomGameModel, answerAtom );
  }

  buildAnAtom.register( 'SchematicToElementChallenge',  SchematicToElementChallenge );

  // Inherit from base class and define the methods for this object.
  return inherit( ToElementChallenge, SchematicToElementChallenge, {

    // Create the view needed to visual represent this challenge.
    createView: function( layoutBounds, tandem ) {
      return new SchematicToElementChallengeView( this, layoutBounds, tandem.createTandem( 'schematicToElementChallengeView' ) );
    }
  } );
} );
