// Copyright 2017, University of Colorado Boulder

/**
 * @author Michael Kauzmann (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var BAAGameChallengeIO = require( 'BUILD_AN_ATOM/game/model/BAAGameChallengeIO' );
  var buildAnAtom = require( 'BUILD_AN_ATOM/buildAnAtom' );

  // phet-io modules
  var assertInstanceOf = require( 'ifphetio!PHET_IO/assertInstanceOf' );
  var ObjectIO = require( 'ifphetio!PHET_IO/types/ObjectIO' );
  var phetioInherit = require( 'ifphetio!PHET_IO/phetioInherit' );

  /**
   * @param {BAAGameChallenge} baaGameState
   * @param {string} phetioID
   * @constructor
   */
  function BAAGameStateIO( baaGameState, phetioID ) {
    assert && assertInstanceOf( baaGameState, phet.buildAnAtom.BAAGameState );
    ObjectIO.call( this, baaGameState, phetioID );
  }

  phetioInherit( ObjectIO, 'BAAGameStateIO', BAAGameStateIO, {}, {
    documentation: 'A state for the game',

    /**
     *
     * @param {BAAGameChallenge} baaGameState
     * @returns
     */
    toStateObject: function( baaGameState ) {
      assert && assertInstanceOf( baaGameState, phet.buildAnAtom.BAAGameState );
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
     */
    fromStateObject: function( stateObject ) {

      if ( stateObject.name === 'choosingLevel' ) {
        return phet.buildAnAtom.BAAGameState.CHOOSING_LEVEL;
      }
      else if ( stateObject.name === 'levelCompleted' ) {
        return phet.buildAnAtom.BAAGameState.LEVEL_COMPLETED;
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

