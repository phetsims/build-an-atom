// Copyright 2017-2021, University of Colorado Boulder

/**
 * constants shared between one or more files
 *
 * @author John Blanco
 */

import buildAnAtom from '../buildAnAtom.js';

const BAASharedConstants = {
  RESET_BUTTON_RADIUS: 20,
  MAX_CHALLENGE_ATTEMPTS: 2 // Note: Attempt is the same as a submission in BAAGameChallenge.
};

buildAnAtom.register( 'BAASharedConstants', BAASharedConstants );

export default BAASharedConstants;