// Copyright 2025, University of Colorado Boulder

/**
 * Subclass of ParticleView that provides some standard options for the build-an-atom simulation.
 *
 * @author John Blanco (PhET Interactive Simulations)
 */

import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import ModelViewTransform2 from '../../../../phetcommon/js/view/ModelViewTransform2.js';
import Particle from '../../../../shred/js/model/Particle.js';
import ParticleView, { ParticleViewOptions } from '../../../../shred/js/view/ParticleView.js';
import buildAnAtom from '../../buildAnAtom.js';
import BAAConstants from '../BAAConstants.js';

export type BAAParticleViewOptions = ParticleViewOptions;

export default class BAAParticleView extends ParticleView {

  public constructor( particle: Particle,
                      modelViewTransform: ModelViewTransform2,
                      providedOptions?: BAAParticleViewOptions ) {

    const options = optionize<BAAParticleViewOptions, EmptySelfOptions, ParticleViewOptions>()( {
      touchOffset: BAAConstants.PARTICLE_TOUCH_DRAG_OFFSET,
      phetioVisiblePropertyInstrumented: false
    }, providedOptions );

    super( particle, modelViewTransform, options );
  }
}

buildAnAtom.register( 'BAAParticleView', BAAParticleView );