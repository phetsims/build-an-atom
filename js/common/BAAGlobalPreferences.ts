// Copyright 2020-2025, University of Colorado Boulder

/**
 * BAAGlobalPreferences defines the global options for this simulation.
 *
 * @author John Blanco (PhET Interactive Simulations)
 */

import BooleanProperty from '../../../axon/js/BooleanProperty.js';
import Tandem from '../../../tandem/js/Tandem.js';
import buildAnAtom from '../buildAnAtom.js';
import BAAQueryParameters from './BAAQueryParameters.js';

// TODO: Some sims make these preferences a class https://github.com/phetsims/build-an-atom/issues/241

const BAAGlobalPreferences = {

  highContrastParticlesProperty:
    new BooleanProperty( BAAQueryParameters.highContrastParticles, {
      tandem: Tandem.PREFERENCES.createTandem( 'highContrastParticlesProperty' ),
      phetioDocumentation: 'determines whether the particles are presented with more contrast for better visibility',
      phetioFeatured: true
    } )
};

buildAnAtom.register( 'BAAGlobalPreferences', BAAGlobalPreferences );
export default BAAGlobalPreferences;