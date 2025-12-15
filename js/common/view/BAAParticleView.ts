// Copyright 2025, University of Colorado Boulder

/**
 * Subclass of ParticleView that provides some standard options for the build-an-atom simulation.
 *
 * @author John Blanco (PhET Interactive Simulations)
 */

import Property from '../../../../axon/js/Property.js';
import TProperty from '../../../../axon/js/TProperty.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import ModelViewTransform2 from '../../../../phetcommon/js/view/ModelViewTransform2.js';
import ShredFluent from '../../../../shred/js/ShredFluent.js';
import ParticleView, { ParticleViewOptions } from '../../../../shred/js/view/ParticleView.js';
import buildAnAtom from '../../buildAnAtom.js';
import BAAConstants from '../BAAConstants.js';
import BAAParticle from '../model/BAAParticle.js';
import { ParticleLocations } from './InteractiveSchematicAtom.js';

export type BAAParticleViewOptions = ParticleViewOptions;

export default class BAAParticleView extends ParticleView {

  // For accessibility, we set the string of the current location of particles
  public locationNameProperty: TProperty<ParticleLocations>;

  public constructor( particle: BAAParticle,
                      modelViewTransform: ModelViewTransform2,
                      providedOptions?: BAAParticleViewOptions ) {

    const options = optionize<BAAParticleViewOptions, EmptySelfOptions, ParticleViewOptions>()( {
      touchOffset: BAAConstants.PARTICLE_TOUCH_DRAG_OFFSET,
      phetioVisiblePropertyInstrumented: false
    }, providedOptions );

    super( particle, modelViewTransform, options );

    const particleTypeStringProperty = ShredFluent.a11y.particles.type.createProperty( {
      type: particle.type
    } );

    this.locationNameProperty = new Property<ParticleLocations>( 'bucket' );

    this.accessibleName = ShredFluent.a11y.particles.accessibleName.createProperty( {
      pattern: particle.isDraggingProperty.derived( dragging => !dragging ? 'withLocation' : 'withoutLocation' ),
      particle: particleTypeStringProperty,
      location: ShredFluent.a11y.particles.locationCapitalized.createProperty( {
        location: this.locationNameProperty
      } )
    } );
  }
}

buildAnAtom.register( 'BAAParticleView', BAAParticleView );