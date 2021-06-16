// Copyright 2020-2021, University of Colorado Boulder

/**
 * BAAGlobalOptions defines the global options for this simulation, accessed via PhET > Options.
 *
 * @author John Blanco (PhET Interactive Simulations)
 */

import BooleanProperty from '../../../axon/js/BooleanProperty.js';
import Tandem from '../../../tandem/js/Tandem.js';
import buildAnAtom from '../buildAnAtom.js';
import BAAQueryParameters from './BAAQueryParameters.js';

// constants
const optionsTandem = Tandem.GLOBAL_MODEL.createTandem( 'options' );

const BAAGlobalOptions = {

  // @public
  highContrastParticlesProperty:
    new BooleanProperty( BAAQueryParameters.highContrastParticles, {
      tandem: optionsTandem.createTandem( 'highContrastParticlesProperty' ),
      phetioDocumentation: 'determines whether the particles are presented with more contrast for better visibility'
    } )
};

buildAnAtom.register( 'BAAGlobalOptions', BAAGlobalOptions );
export default BAAGlobalOptions;