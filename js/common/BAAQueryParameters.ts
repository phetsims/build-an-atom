// Copyright 2016-2025, University of Colorado Boulder

/**
 * Query parameters supported by this simulation.
 *
 * @author Aadish Gupta
 */

import { QueryStringMachine } from '../../../query-string-machine/js/QueryStringMachineModule.js';
import buildAnAtom from '../buildAnAtom.js';

const BAAQueryParameters = QueryStringMachine.getAll( {

  // shows the game reward regardless of score
  reward: { type: 'flag' },

  challengesPerLevel: {
    type: 'number',
    defaultValue: 2
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