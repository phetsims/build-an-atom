// Copyright 2024, University of Colorado Boulder

/**
 * ESLint configuration for build-an-atom.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 * @author Michael Kauzmann (PhET Interactive Simulations)
 */

import simEslintConfig from '../perennial-alias/js/eslint/config/sim.eslint.config.mjs';

export default [
  ...simEslintConfig,
  {
    rules: {

      // This sim was initially written before the no-view-imported-from-model rule was in effect, and the game is
      // architected such that the individual game challenge classes in the model contain the information about which
      // class should be used to represent that challenge in the view. Thus, the challenge models import view
      // information.  That's why this rule is disabled.
      'phet/no-view-imported-from-model': 'off'
    }
  }
];