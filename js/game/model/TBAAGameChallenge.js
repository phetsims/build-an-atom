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
  var assertInstanceOf = require( 'ifphetio!PHET_IO/assertInstanceOf' );
  var phetioInherit = require( 'ifphetio!PHET_IO/phetioInherit' );
  var TObject = require( 'ifphetio!PHET_IO/types/TObject' );

  /**
   * Wrapper type for BAAGameChallenge
   * @param {BAAGameChallenge} instance
   * @param {string} phetioID
   * @constructor
   */
  function TBAAGameChallenge( instance, phetioID ) {
    assert && assertInstanceOf( instance, phet.buildAnAtom.BAAGameChallenge );
    TObject.call( this, instance, phetioID );
  }

  phetioInherit( TObject, 'TBAAGameChallenge', TBAAGameChallenge, {}, {
    documentation: 'A challenge for the Game',

    /**
     * @param {BAAGameChallenge} gameChallenge
     * @returns
     */
    toStateObject: function( gameChallenge ) {
      return {
        pointValue: gameChallenge.pointValue,
        answerAtom: TNumberAtom.toStateObject( gameChallenge.answerAtom ),
        modelPhetioID: gameChallenge.model.phetioID,
        challengeType: gameChallenge.challengeType,
        phetioID: gameChallenge.phetioID,
        name: gameChallenge.name
      };
    },

    /**
     *
     * @param {Object} stateObject
     */
    fromStateObject: function( stateObject ) {

      // This may have been deserialized from the instance itself or from the array it was contained in (which
      // is instrumented as TArray), so check to see if it is already deserialized before deserializing.
      // TODO: is there a better way to do this, or at least factor it out?
      var instance = phetio.hasInstance( stateObject.phetioID );
      if ( instance ) {
        return phetio.getInstance( stateObject.phetioID );
      }

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

