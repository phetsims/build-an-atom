// Copyright 2017, University of Colorado Boulder

/**
 * BAAGlobalOptions defines the global options for this simulation, accessed via PhET > Options.
 *
 * @author John Blanco (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var BAAQueryParameters = require( 'BUILD_AN_ATOM/common/BAAQueryParameters' );
  var BooleanProperty = require( 'AXON/BooleanProperty' );
  var buildAnAtom = require( 'BUILD_AN_ATOM/buildAnAtom' );

  var BAAGlobalOptions = {

    // @public
    highContrastParticlesProperty: new BooleanProperty( BAAQueryParameters.highContrastParticles )
  };

  buildAnAtom.register( 'BAAGlobalOptions', BAAGlobalOptions );

  return BAAGlobalOptions;
} );