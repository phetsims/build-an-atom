// Copyright 2020-2022, University of Colorado Boulder

/**
 * BAAGlobalPreferences defines the global options for this simulation.
 *
 * @author John Blanco (PhET Interactive Simulations)
 */

import BooleanProperty from '../../../axon/js/BooleanProperty.js';
import Tandem from '../../../tandem/js/Tandem.js';
import buildAnAtom from '../buildAnAtom.js';
import BAAQueryParameters from './BAAQueryParameters.js';

const BAAGlobalPreferences = {

  // @public
  highContrastParticlesProperty:
    new BooleanProperty( BAAQueryParameters.highContrastParticles, {
      tandem: Tandem.PREFERENCES.createTandem( 'highContrastParticlesProperty' ),
      phetioDocumentation: 'determines whether the particles are presented with more contrast for better visibility'
    } )
};

buildAnAtom.register( 'BAAGlobalPreferences', BAAGlobalPreferences );
export default BAAGlobalPreferences;