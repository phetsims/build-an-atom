// Copyright 2017, University of Colorado Boulder

/**
 * @author Michael Kauzmann (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var buildAnAtom = require( 'BUILD_AN_ATOM/buildAnAtom' );
  var TBAAGameChallenge = require( 'BUILD_AN_ATOM/game/model/TBAAGameChallenge' );

  // phet-io modules
  var assertInstanceOf = require( 'ifphetio!PHET_IO/assertions/assertInstanceOf' );
  var phetioInherit = require( 'ifphetio!PHET_IO/phetioInherit' );
  var TObject = require( 'ifphetio!PHET_IO/types/TObject' );

  /**
   * Wrapper type for BAAGameChallenge
   * @param {BAAGameChallenge} instance
   * @param {string} phetioID
   * @constructor
   */
  function TBAAGameState( instance, phetioID ) {
    assertInstanceOf( instance, phet.buildAnAtom.BAAGameState );
    TObject.call( this, instance, phetioID );
  }

  phetioInherit( TObject, 'TBAAGameState', TBAAGameState, {}, {
    documentation: 'A state for the game',

    /**
     *
     * @param {BAAGameChallenge} instance
     * @returns
     */
    toStateObject: function( instance ) {
      if ( instance instanceof phet.buildAnAtom.BAAGameChallenge ) {
        return TBAAGameChallenge.toStateObject( instance );
      }
      else {
        return { name: instance.name };
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
        return TBAAGameChallenge.fromStateObject( stateObject );
      }
      else {
        assert && assert( false, 'unknown game state: ' + stateObject );
      }
    }
  } );
  buildAnAtom.register( 'TBAAGameState', TBAAGameState );

  return TBAAGameState;
} );

