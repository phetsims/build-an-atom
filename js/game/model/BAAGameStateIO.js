// Copyright 2017-2019, University of Colorado Boulder

/**
 * IO type for BAAGameState
 *
 * @author Michael Kauzmann (PhET Interactive Simulations)
 */
define( require => {
  'use strict';

  // modules
  const BAAGameChallengeIO = require( 'BUILD_AN_ATOM/game/model/BAAGameChallengeIO' );
  const BAAGameState = require( 'BUILD_AN_ATOM/game/model/BAAGameState' );
  const buildAnAtom = require( 'BUILD_AN_ATOM/buildAnAtom' );
  const ObjectIO = require( 'TANDEM/types/ObjectIO' );
  const validate = require( 'AXON/validate' );

  class BAAGameStateIO extends ObjectIO {

    /**
     * @param {BAAGameChallenge} baaGameState
     * @returns
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
     *
     * @param {Object} stateObject
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

  return buildAnAtom.register( 'BAAGameStateIO', BAAGameStateIO );
} );

