// Copyright 2016-2019, University of Colorado Boulder

/**
 * Query parameters supported by this simulation.
 *
 * @author Aadish Gupta
 */
define( require => {
  'use strict';

  // modules
  const buildAnAtom = require( 'BUILD_AN_ATOM/buildAnAtom' );

  const BAAQueryParameters = QueryStringMachine.getAll( {

    // shows the game reward regardless of score
    reward: { type: 'flag' },

    challengesPerLevel: {
      type: 'number',
      defaultValue: 5
    }
  } );

  buildAnAtom.register('BAAQueryParameters', BAAQueryParameters);

  return BAAQueryParameters;
} );