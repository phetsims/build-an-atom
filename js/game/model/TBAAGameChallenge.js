// Copyright 2017, University of Colorado Boulder

/**
 * @author Michael Kauzmann (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var buildAnAtom = require( 'BUILD_AN_ATOM/buildAnAtom' );
  var TNumberAtom = require( 'SHRED/model/TNumberAtom' );

  // phet-io modules
  var phetio = require( 'ifphetio!PHET_IO/phetio' );
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
        pointValue: gameChallenge.pointValue,
        answerAtom: TNumberAtom.toStateObject( gameChallenge.answerAtom ),
        modelPhetioID: gameChallenge.model.phetioID,
        challengeType: gameChallenge.challengeType,
        phetioID: gameChallenge.phetioID
      };
    },

    /**
     *
     * @param {Object} stateObject
     */
    fromStateObject: function( stateObject ) {

      var model = phetio.getInstance( stateObject.modelPhetioID );

      var answerAtom = new phet.shred.NumberAtom( {
        protonCount: stateObject.answerAtom.protonCount,
        neutronCount: stateObject.answerAtom.neutronCount,
        electronCount: stateObject.answerAtom.electronCount
      } );
      var tandem = new phet.tandem.Tandem( stateObject.phetioID );

      return phet.buildAnAtom.ChallengeSetFactory.createChallenge( model, stateObject.challengeType, answerAtom, tandem );

    }
  } );
  buildAnAtom.register( 'TBAAGameChallenge', TBAAGameChallenge );

  return TBAAGameChallenge;
} );

