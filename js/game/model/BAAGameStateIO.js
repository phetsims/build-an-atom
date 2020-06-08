// Copyright 2017-2020, University of Colorado Boulder

/**
 * IO type for BAAGameState
 *
 * @author Michael Kauzmann (PhET Interactive Simulations)
 */

import validate from '../../../../axon/js/validate.js';
import ObjectIO from '../../../../tandem/js/types/ObjectIO.js';
import buildAnAtom from '../../buildAnAtom.js';
import BAAGameChallengeIO from './BAAGameChallengeIO.js';
import BAAGameState from './BAAGameState.js';

class BAAGameStateIO extends ObjectIO {

  /**
   * @param {BAAGameChallenge} baaGameState
   * @returns
   * @public
   * @override
   */
  static toStateObject( baaGameState ) {
    validate( baaGameState, this.validator );
    if ( baaGameState instanceof phet.buildAnAtom.BAAGameChallenge ) {
      return BAAGameChallengeIO.toStateObject( baaGameState );
    }
    else {
      return { name: baaGameState.name };
    }
  }

  /**
   * @param {Object} stateObject
   * @public
   * @override
   */
  static fromStateObject( stateObject ) {

    if ( stateObject.name === 'choosingLevel' ) {
      return BAAGameState.CHOOSING_LEVEL;
    }
    else if ( stateObject.name === 'levelCompleted' ) {
      return BAAGameState.LEVEL_COMPLETED;
    }
    else if ( stateObject.name === 'challenge' ) {
      return BAAGameChallengeIO.fromStateObject( stateObject );
    }
    else {
      assert && assert( false, 'unknown game state: ' + stateObject );
    }
  }
}

BAAGameStateIO.validator = { valueType: BAAGameState };
BAAGameStateIO.documentation = 'A state for the game';
BAAGameStateIO.typeName = 'BAAGameStateIO';
ObjectIO.validateSubtype( BAAGameStateIO );

buildAnAtom.register( 'BAAGameStateIO', BAAGameStateIO );
export default BAAGameStateIO;