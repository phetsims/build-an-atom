// Copyright 2016, University of Colorado Boulder

/**
 * Query parameters supported by this simulation.
 *
 * @author Aadish Gupta
 */
define( function( require ) {
  'use strict';

  //modules
  var buildAnAtom = require( 'BUILD_AN_ATOM/buildAnAtom' );

  var getQueryParameter = phet.chipper.getQueryParameter;

  var BAAQueryParameters = {
    // shows the game reward regardless of score
    REWARD: getQueryParameter( 'reward' ) || false
  };

  buildAnAtom.register('BAAQueryParameters', BAAQueryParameters);

  return BAAQueryParameters;
} );