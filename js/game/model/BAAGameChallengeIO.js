// Copyright 2017-2020, University of Colorado Boulder

/**
 * IO type for BAAGameChallenge
 *
 * @author Michael Kauzmann (PhET Interactive Simulations)
 */

import validate from '../../../../axon/js/validate.js';
import NumberAtomIO from '../../../../shred/js/model/NumberAtomIO.js';
import ObjectIO from '../../../../tandem/js/types/ObjectIO.js';
import buildAnAtom from '../../buildAnAtom.js';

class BAAGameChallengeIO extends ObjectIO {

  /**
   * @param {BAAGameChallenge} baaGameChallenge
   * @returns {Object}
   * @public
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
   * @public
   * @override
   */
  static fromStateObject( stateObject ) {
    const phetioEngine = phet.phetio.phetioEngine;

    // This may have been deserialized from the instance itself or from the array it was contained in (which
    // is instrumented as ArrayIO), so check to see if it is already deserialized before deserializing.
    // TODO: is there a better way to do this, or at least factor it out?
    const instance = phetioEngine.hasPhetioObject( stateObject.phetioID );
    if ( instance ) {
      return phetioEngine.getPhetioObject( stateObject.phetioID );
    }

    const model = phetioEngine.getPhetioObject( stateObject.modelPhetioID );

    const answerAtom = new phet.shred.NumberAtom( {
      protonCount: stateObject.answerAtom.protonCount,
      neutronCount: stateObject.answerAtom.neutronCount,
      electronCount: stateObject.answerAtom.electronCount
    } );
    const tandem = new phet.tandem.Tandem( stateObject.phetioID );

    return phet.buildAnAtom.ChallengeSetFactory.createChallenge( model, stateObject.challengeType, answerAtom, tandem );
  }
}

BAAGameChallengeIO.documentation = 'A challenge for the Game';
BAAGameChallengeIO.validator = { isValidValue: v => v instanceof phet.buildAnAtom.BAAGameChallenge };
BAAGameChallengeIO.typeName = 'BAAGameChallengeIO';
ObjectIO.validateSubtype( BAAGameChallengeIO );

buildAnAtom.register( 'BAAGameChallengeIO', BAAGameChallengeIO );
export default BAAGameChallengeIO;