// Copyright 2025, University of Colorado Boulder

/**
 * Base type for particles in Build An Atom.
 *
 * @author Agustín Vallejo
 */

import Property from '../../../../axon/js/Property.js';
import Particle, { ParticleOptions } from '../../../../shred/js/model/Particle.js';
import buildAnAtom from '../../buildAnAtom.js';
import { BAAParticleType } from './BAAModel.js';

// Valid particle locations used for description. null, it means it's being dragged around.
export type ParticleLocations = 'nucleus' | 'innerShell' | 'outerShell' | 'electronCloud' | 'bucket' | null;

export default class BAAParticle extends Particle {

  // The location of the particle in Build an Atom. Used for description.
  public readonly locationNameProperty: Property<ParticleLocations>;

  public constructor( type: BAAParticleType, providedOptions?: ParticleOptions ) {
    super( type, providedOptions );

    this.locationNameProperty = new Property<ParticleLocations>( 'bucket' );
  }
}

buildAnAtom.register( 'BAAParticle', BAAParticle );