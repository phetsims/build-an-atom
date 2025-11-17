// Copyright 2025, University of Colorado Boulder

/**
 * Base type for particles in Build An Atom.
 *
 * @author Agustín Vallejo
 */

import Particle, { ParticleOptions } from '../../../../shred/js/model/Particle.js';
import buildAnAtom from '../../buildAnAtom.js';
import { BAAParticleType } from './BAAModel.js';

export default class BAAParticle extends Particle {

  public constructor( type: BAAParticleType, providedOptions?: ParticleOptions ) {
    super( type, providedOptions );
  }
}

buildAnAtom.register( 'BAAParticle', BAAParticle );