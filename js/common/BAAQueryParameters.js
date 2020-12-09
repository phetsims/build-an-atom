// Copyright 2016-2020, University of Colorado Boulder

/**
 * Query parameters supported by this simulation.
 *
 * @author Aadish Gupta
 */

import buildAnAtom from '../buildAnAtom.js';

const BAAQueryParameters = QueryStringMachine.getAll( {

  // shows the game reward regardless of score
  reward: { type: 'flag' },

  // if present, high-contrast particles will be on initially
  highContrastParticles: { type: 'flag' },

  challengesPerLevel: {
    type: 'number',
    defaultValue: 5
  }
} );

buildAnAtom.register( 'BAAQueryParameters', BAAQueryParameters );

export default BAAQueryParameters;