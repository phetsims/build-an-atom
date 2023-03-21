// Copyright 2017, University of Colorado Boulder

/**
 * constants shared between one or more files
 *
 * @author John Blanco
 */
define( function( require ) {
  'use strict';

  // modules
  var buildAnAtom = require( 'BUILD_AN_ATOM/buildAnAtom' );

  var BAASharedConstants = {
    RESET_BUTTON_RADIUS: 20,
    MINUS_SIGN: '\u2212'
  };

  buildAnAtom.register( 'BAASharedConstants', BAASharedConstants );

  return BAASharedConstants;
} );