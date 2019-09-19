// Copyright 2017-2019, University of Colorado Boulder

/**
 * IO type for BAAGameChallenge
 *
 * @author Michael Kauzmann (PhET Interactive Simulations)
 */
define( require => {
  'use strict';

  // modules
  const buildAnAtom = require( 'BUILD_AN_ATOM/buildAnAtom' );
  const NumberAtomIO = require( 'SHRED/model/NumberAtomIO' );
  const ObjectIO = require( 'TANDEM/types/ObjectIO' );
  const validate = require( 'AXON/validate' );

  // ifphetio
  const phetioEngine = require( 'ifphetio!PHET_IO/phetioEngine' );

  class BAAGameChallengeIO extends ObjectIO {

    /**
     * @param {BAAGameChallenge} baaGameChallenge
     * @returns {Object}
     * @override
     */
    static toStateObject( baaGameChallenge ) {
      validate( baaGameChallenge, this.validator );
      return {
        pointValue: baaGameChallenge.pointValue,
        answerAtom: NumberAtomIO.toStateObject( baaGameChallenge.answerAtom ),
        modelPhetioID: baaGameChallenge.model.tandem.phetioID,
        challengeType: baaGameChallenge.challengeType,
        phetioID: baaGameChallenge.tandem.phetioID,
        name: baaGameChallenge.name
      };
    }

    /**
     * @param {Object} stateObject
     * @override
     */
    static fromStateObject( stateObject ) {

      // This may have been deserialized from the instance itself or from the array it was contained in (which
      // is instrumented as ArrayIO), so check to see if it is already deserialized before deserializing.
      // TODO: is there a better way to do this, or at least factor it out?
      var instance = phetioEngine.hasPhetioObject( stateObject.phetioID );
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
  }

  BAAGameChallengeIO.documentation = 'A challenge for the Game';
  BAAGameChallengeIO.validator = { isValidValue: v => v instanceof phet.buildAnAtom.BAAGameChallenge };
  BAAGameChallengeIO.typeName = 'BAAGameChallengeIO';
  ObjectIO.validateSubtype( BAAGameChallengeIO );

  return buildAnAtom.register( 'BAAGameChallengeIO', BAAGameChallengeIO );
} );

