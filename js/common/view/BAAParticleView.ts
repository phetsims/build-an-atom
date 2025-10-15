// Copyright 2025, University of Colorado Boulder

/**
 * Subclass of ParticleView that provides some standard options for the build-an-atom simulation.
 *
 * @author John Blanco (PhET Interactive Simulations)
 */

import DerivedStringProperty from '../../../../axon/js/DerivedStringProperty.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import StringUtils from '../../../../phetcommon/js/util/StringUtils.js';
import ModelViewTransform2 from '../../../../phetcommon/js/view/ModelViewTransform2.js';
import ShredStrings from '../../../../shred/js/ShredStrings.js';
import ParticleView, { ParticleViewOptions } from '../../../../shred/js/view/ParticleView.js';
import buildAnAtom from '../../buildAnAtom.js';
import BAAConstants from '../BAAConstants.js';
import BAAParticle, { ParticleLocations } from '../model/BAAParticle.js';

export type BAAParticleViewOptions = ParticleViewOptions;

export default class BAAParticleView extends ParticleView {

  public constructor( particle: BAAParticle,
                      modelViewTransform: ModelViewTransform2,
                      providedOptions?: BAAParticleViewOptions ) {

    const particleTypeStringProperty = particle.type === 'proton' ?
                                       ShredStrings.a11y.particles.protonStringProperty :
                                       particle.type === 'neutron' ?
                                       ShredStrings.a11y.particles.neutronStringProperty :
                                       ShredStrings.a11y.particles.electronStringProperty;

    const particleLocationStringProperty = new DerivedStringProperty(
      [
        particle.locationNameProperty,
        ShredStrings.a11y.particles.bucketStringProperty,
        ShredStrings.a11y.particles.nucleusStringProperty,
        ShredStrings.a11y.particles.innerShellStringProperty,
        ShredStrings.a11y.particles.outerShellStringProperty,
        ShredStrings.a11y.particles.cloudStringProperty
      ],
      (
        locationName: ParticleLocations,
        bucket: string,
        nucleus: string,
        innerShell: string,
        outerShell: string,
        electronCloud: string
      ) => {
        return locationName === 'bucket' ? bucket :
               locationName === 'nucleus' ? nucleus :
               locationName === 'innerShell' ? innerShell :
                locationName === 'outerShell' ? outerShell :
                locationName === 'electronCloud' ? electronCloud : '';
      }
    );

    const accessibleNameProperty = new DerivedStringProperty(
      [
        particle.isDraggingProperty,
        particleTypeStringProperty,
        particleLocationStringProperty,
        ShredStrings.a11y.particles.accessibleNameStringProperty
      ],
      ( isDragging: boolean, particle: string, location: string, accessibleName: string ) => {
        if ( isDragging ) {
          return particle;
        }
        else {
          return StringUtils.fillIn( accessibleName, { particle: particle, location: location } );
        }
      } );

    const options = optionize<BAAParticleViewOptions, EmptySelfOptions, ParticleViewOptions>()( {
      touchOffset: BAAConstants.PARTICLE_TOUCH_DRAG_OFFSET,
      phetioVisiblePropertyInstrumented: false,
      accessibleName: accessibleNameProperty
    }, providedOptions );

    super( particle, modelViewTransform, options );
  }
}

buildAnAtom.register( 'BAAParticleView', BAAParticleView );