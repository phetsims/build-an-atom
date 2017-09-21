// Copyright 2017, University of Colorado Boulder

/**
 * Possible game states.
 *
 * @author John Blanco
 */
define( function( require ) {
  'use strict';

  // modules
  var buildAnAtom = require( 'BUILD_AN_ATOM/buildAnAtom' );

  var BAAGameState = {
    CHOOSING_LEVEL: 'choosingLevel',
    LEVEL_COMPLETED: 'levelCompleted'
  };

  // verify that enum is immutable, without the runtime penalty in production code
  if ( assert ) { Object.freeze( BAAGameState ); }

  buildAnAtom.register( 'BAAGameState', BAAGameState );

  return BAAGameState;
} );