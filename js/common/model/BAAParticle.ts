// Copyright 2025, University of Colorado Boulder

/**
 * Base type for particles in Build An Atom.
 *
 * @author Agustín Vallejo
 */

import Property from '../../../../axon/js/Property.js';
import Particle, { ParticleOptions, ParticleType } from '../../../../shred/js/model/Particle.js';
import buildAnAtom from '../../buildAnAtom.js';

// List of the places the particle in BAA could be located.
export type ParticleLocations = 'nucleus' | 'innerShell' | 'outerShell' | 'electronCloud' | 'bucket';

export default class BAAParticle extends Particle {

  // The location of the particle in Build an Atom.
  public readonly locationNameProperty: Property<ParticleLocations>;

  public constructor( type: ParticleType, providedOptions?: ParticleOptions ) {
    super( type, providedOptions );

    this.locationNameProperty = new Property<ParticleLocations>( 'bucket' );
  }
}

buildAnAtom.register( 'BAAParticle', BAAParticle );