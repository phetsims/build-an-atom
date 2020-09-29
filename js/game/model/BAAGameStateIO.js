// Copyright 2017-2020, University of Colorado Boulder

/**
 * IO Type for BAAGameState
 *
 * @author Michael Kauzmann (PhET Interactive Simulations)
 */

import IOType from '../../../../tandem/js/types/IOType.js';
import buildAnAtom from '../../buildAnAtom.js';
import BAAGameChallenge from './BAAGameChallenge.js';
import BAAGameState from './BAAGameState.js';

const BAAGameStateIO = new IOType( 'BAAGameStateIO', {
  valueType: BAAGameState,
  documentation: 'A state for the game',
  toStateObject: baaGameState => {
    if ( baaGameState instanceof phet.buildAnAtom.BAAGameChallenge ) {
      return BAAGameChallenge.BAAGameChallengeIO.toStateObject( baaGameState );
    }
    else {
      return { name: baaGameState.name };
    }
  },
  fromStateObject: stateObject => {

    if ( stateObject.name === 'choosingLevel' ) {
      return BAAGameState.CHOOSING_LEVEL;
    }
    else if ( stateObject.name === 'levelCompleted' ) {
      return BAAGameState.LEVEL_COMPLETED;
    }
    else if ( stateObject.name === 'challenge' ) {
      return BAAGameChallenge.BAAGameChallengeIO.fromStateObject( stateObject );
    }
    else {
      assert && assert( false, 'unknown game state: ' + stateObject );
    }
  }
} );

buildAnAtom.register( 'BAAGameStateIO', BAAGameStateIO );
export default BAAGameStateIO;