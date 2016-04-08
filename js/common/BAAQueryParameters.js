// Copyright 2016, University of Colorado Boulder

/**
 * Query parameters supported by this simulation.
 *
 * @author Aadish Gupta
 */
define( function( require ) {
  'use strict';

  var getQueryParameter = phet.chipper.getQueryParameter;

  return {

    // shows the game reward regardless of score
    REWARD: getQueryParameter( 'reward' ) || false
  };
} );