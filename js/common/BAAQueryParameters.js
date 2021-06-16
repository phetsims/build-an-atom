// Copyright 2016-2021, University of Colorado Boulder

/**
 * Query parameters supported by this simulation.
 *
 * @author Aadish Gupta
 */

import buildAnAtom from '../buildAnAtom.js';

const BAAQueryParameters = QueryStringMachine.getAll( {

  /**
   * If present, high-contrast particles will be on initially, and still controllable through the "Options" menu
   * Requested by users, see https://github.com/phetsims/build-an-atom/issues/217
   * @public
   */
  highContrastParticles: {
    type: 'flag',
    public: true
  },

  // shows the game reward regardless of score
  reward: { type: 'flag' },

  challengesPerLevel: {
    type: 'number',
    defaultValue: 5
  },

  /**
   * Add a way to hide the stable/unstable checkbox for a research study, see https://github.com/phetsims/special-ops/issues/189
   */
  showStableUnstableCheckbox: {
    type: 'boolean',
    defaultValue: true
  }
} );

buildAnAtom.register( 'BAAQueryParameters', BAAQueryParameters );

export default BAAQueryParameters;