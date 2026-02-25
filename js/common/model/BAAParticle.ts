// Copyright 2025, University of Colorado Boulder

/**
 * Base type for particles in Build An Atom.
 *
 * @author Agustín Vallejo (PhET Interactive Simulations)
 */

import Property from '../../../../axon/js/Property.js';
import TProperty from '../../../../axon/js/TProperty.js';
import Particle, { ParticleOptions } from '../../../../shred/js/model/Particle.js';
import buildAnAtom from '../../buildAnAtom.js';

export type BAAParticleType = 'proton' | 'neutron' | 'electron';

export default class BAAParticle extends Particle {

  public override readonly typeProperty: TProperty<BAAParticleType>;

  public constructor( type: BAAParticleType, providedOptions?: ParticleOptions ) {
    super( type, providedOptions );

    this.typeProperty = new Property<BAAParticleType>( type );
  }

  public override get type(): BAAParticleType { return this.typeProperty.value; }

}

buildAnAtom.register( 'BAAParticle', BAAParticle );