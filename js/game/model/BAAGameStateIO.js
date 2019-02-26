// Copyright 2017-2018, University of Colorado Boulder

/**
 * IO type for BAAGameState
 *
 * @author Michael Kauzmann (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var BAAGameChallengeIO = require( 'BUILD_AN_ATOM/game/model/BAAGameChallengeIO' );
  var BAAGameState = require( 'BUILD_AN_ATOM/game/model/BAAGameState' );
  var buildAnAtom = require( 'BUILD_AN_ATOM/buildAnAtom' );
  var ObjectIO = require( 'TANDEM/types/ObjectIO' );
  var phetioInherit = require( 'TANDEM/phetioInherit' );
  var validate = require( 'AXON/validate' );

  /**
   * @param {BAAGameChallenge} baaGameState
   * @param {string} phetioID
   * @constructor
   */
  function BAAGameStateIO( baaGameState, phetioID ) {
    ObjectIO.call( this, baaGameState, phetioID );
  }

  phetioInherit( ObjectIO, 'BAAGameStateIO', BAAGameStateIO, {}, {
    validator: { valueType: BAAGameState },
    documentation: 'A state for the game',

    /**
     * @param {BAAGameChallenge} baaGameState
     * @returns
     * @override
     */
    toStateObject: function( baaGameState ) {
      validate( baaGameState, this.validator );
      if ( baaGameState instanceof phet.buildAnAtom.BAAGameChallenge ) {
        return BAAGameChallengeIO.toStateObject( baaGameState );
      }
      else {
        return { name: baaGameState.name };
      }
    },

    /**
     *
     * @param {Object} stateObject
     * @override
     */
    fromStateObject: function( stateObject ) {

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
  } );
  buildAnAtom.register( 'BAAGameStateIO', BAAGameStateIO );

  return BAAGameStateIO;
} );

