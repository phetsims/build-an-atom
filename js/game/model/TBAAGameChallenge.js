// Copyright 2017, University of Colorado Boulder

/**
 * @author Michael Kauzmann (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var buildAnAtom = require( 'BUILD_AN_ATOM/buildAnAtom' );

  // phet-io modules
  var assertInstanceOf = require( 'ifphetio!PHET_IO/assertions/assertInstanceOf' );
  var phetioInherit = require( 'ifphetio!PHET_IO/phetioInherit' );
  var TObject = require( 'ifphetio!PHET_IO/types/TObject' );

  /**
   * Wrapper type for BAAGameChallenge
   * @param {BAAGameChallenge} instance
   * @param {string} phetioID
   * @constructor
   */
  function TBAAGameChallenge( instance, phetioID ) {
    assertInstanceOf( instance, phet.buildAnAtom.BAAGameChallenge );

    TObject.call( this, instance, phetioID );
  }

  phetioInherit( TObject, 'TBAAGameChallenge', TBAAGameChallenge, {}, {
    documentation: 'A challenge for the Game',

    /**
     *
     * @param {BAAGameChallenge} gameChallenge
     * @returns
     */
    toStateObject: function( gameChallenge ) {
      return {
        // TODO: potentially include the "challengeType" string for subtype challenges that don't need their own ttype.
        pointValue: gameChallenge.pointValue
      };
    }
  } );
  buildAnAtom.register( 'TBAAGameChallenge', TBAAGameChallenge );

  return TBAAGameChallenge;
} );

