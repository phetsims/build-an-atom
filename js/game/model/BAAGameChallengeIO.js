// Copyright 2017-2018, University of Colorado Boulder

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
  var ObjectIO = require( 'TANDEM/types/ObjectIO' );
  var phetioInherit = require( 'TANDEM/phetioInherit' );
  var validate = require( 'AXON/validate' );

  // ifphetio
  var phetioEngine = require( 'ifphetio!PHET_IO/phetioEngine' );

  /**
   * @param {BAAGameChallenge} baaGameChallenge
   * @param {string} phetioID
   * @constructor
   */
  function BAAGameChallengeIO( baaGameChallenge, phetioID ) {
    ObjectIO.call( this, baaGameChallenge, phetioID );
  }

  phetioInherit( ObjectIO, 'BAAGameChallengeIO', BAAGameChallengeIO, {}, {
    documentation: 'A challenge for the Game',
    validator: { isValidValue: v => v instanceof phet.buildAnAtom.BAAGameChallenge },

    /**
     * @param {BAAGameChallenge} baaGameChallenge
     * @returns {Object}
     * @override
     */
    toStateObject: function( baaGameChallenge ) {
      validate( baaGameChallenge, this.validator );
      return {
        pointValue: baaGameChallenge.pointValue,
        answerAtom: NumberAtomIO.toStateObject( baaGameChallenge.answerAtom ),
        modelPhetioID: baaGameChallenge.model.tandem.phetioID,
        challengeType: baaGameChallenge.challengeType,
        phetioID: baaGameChallenge.tandem.phetioID,
        name: baaGameChallenge.name
      };
    },

    /**
     * @param {Object} stateObject
     * @override
     */
    fromStateObject: function( stateObject ) {

      // This may have been deserialized from the instance itself or from the array it was contained in (which
      // is instrumented as ArrayIO), so check to see if it is already deserialized before deserializing.
      // TODO: is there a better way to do this, or at least factor it out?
      var instance = phetioEngine.hasInstance( stateObject.phetioID );
      if ( instance ) {
        return phetioEngine.getPhetioObject( stateObject.phetioID );
      }

      var model = phetioEngine.getPhetioObject( stateObject.modelPhetioID );

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

