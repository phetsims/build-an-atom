// Copyright 2017, University of Colorado Boulder

/**
 * IO type for BAAGameChallenge
 *
 * @author Michael Kauzmann (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var buildAnAtom = require( 'BUILD_AN_ATOM/buildAnAtom' );
  var NumberAtomIO = require( 'SHRED/model/NumberAtomIO' );

  // phet-io modules
  var assertInstanceOf = require( 'ifphetio!PHET_IO/assertInstanceOf' );
  var ObjectIO = require( 'ifphetio!PHET_IO/types/ObjectIO' );
  var phetio = require( 'ifphetio!PHET_IO/phetio' );
  var phetioInherit = require( 'ifphetio!PHET_IO/phetioInherit' );

  /**
   * @param {BAAGameChallenge} baaGameChallenge
   * @param {string} phetioID
   * @constructor
   */
  function BAAGameChallengeIO( baaGameChallenge, phetioID ) {
    assert && assertInstanceOf( baaGameChallenge, phet.buildAnAtom.BAAGameChallenge );
    ObjectIO.call( this, baaGameChallenge, phetioID );
  }

  phetioInherit( ObjectIO, 'BAAGameChallengeIO', BAAGameChallengeIO, {}, {
    documentation: 'A challenge for the Game',

    /**
     * @param {BAAGameChallenge} baaGameChallenge
     * @returns {Object}
     */
    toStateObject: function( baaGameChallenge ) {
      assert && assertInstanceOf( baaGameChallenge, phet.buildAnAtom.BAAGameChallenge );
      return {
        pointValue: baaGameChallenge.pointValue,
        answerAtom: NumberAtomIO.toStateObject( baaGameChallenge.answerAtom ),
        modelPhetioID: baaGameChallenge.model.phetioID,
        challengeType: baaGameChallenge.challengeType,
        phetioID: baaGameChallenge.phetioID,
        name: baaGameChallenge.name
      };
    },

    /**
     *
     * @param {Object} stateObject
     */
    fromStateObject: function( stateObject ) {

      // This may have been deserialized from the instance itself or from the array it was contained in (which
      // is instrumented as ArrayIO), so check to see if it is already deserialized before deserializing.
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
  buildAnAtom.register( 'BAAGameChallengeIO', BAAGameChallengeIO );

  return BAAGameChallengeIO;
} );

