// Copyright 2025, University of Colorado Boulder

/**
 * Subclass of ParticleView that provides some standard options for the build-an-atom simulation.
 *
 * @author John Blanco (PhET Interactive Simulations)
 */

import DerivedStringProperty from '../../../../axon/js/DerivedStringProperty.js';
import Property from '../../../../axon/js/Property.js';
import TProperty from '../../../../axon/js/TProperty.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import StringUtils from '../../../../phetcommon/js/util/StringUtils.js';
import ModelViewTransform2 from '../../../../phetcommon/js/view/ModelViewTransform2.js';
import ShredFluent from '../../../../shred/js/ShredFluent.js';
import ShredStrings from '../../../../shred/js/ShredStrings.js';
import ParticleView, { ParticleViewOptions } from '../../../../shred/js/view/ParticleView.js';
import buildAnAtom from '../../buildAnAtom.js';
import BAAConstants from '../BAAConstants.js';
import BAAParticle from '../model/BAAParticle.js';

export type BAAParticleViewOptions = ParticleViewOptions;

export default class BAAParticleView extends ParticleView {

  // For accessibility, we set the string of the current location of particles
  public locationNameProperty: TProperty<string>;

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

    this.locationNameProperty = new Property<string>( '' );

    this.accessibleName = new DerivedStringProperty(
      [
        particle.isDraggingProperty,
        particleTypeStringProperty,
        this.locationNameProperty,
        ShredStrings.a11y.particles.accessibleNameStringProperty
      ],
      ( isDragging: boolean, particleType: string, location: string, accessibleName: string ) => {
        if ( isDragging ) {
          return particleType;
        }
        else if ( location !== '' ) {
          return StringUtils.fillIn( accessibleName, { particle: particleType, location: location } );
        }
        else {
          return particleType;
        }
      } );
  }
}

buildAnAtom.register( 'BAAParticleView', BAAParticleView );