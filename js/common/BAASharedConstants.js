// Copyright 2017, University of Colorado Boulder

/**
 * constants shared between one or more files
 *
 * @author John Blanco
 */
define( require => {
  'use strict';

  // modules
  const buildAnAtom = require( 'BUILD_AN_ATOM/buildAnAtom' );

  const BAASharedConstants = {
    RESET_BUTTON_RADIUS: 20,
    MAX_CHALLENGE_ATTEMPTS: 2 // Note: Attempt is the same as a submission in BAAGameChallenge.
  };

  buildAnAtom.register( 'BAASharedConstants', BAASharedConstants );

  return BAASharedConstants;
} );