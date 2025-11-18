// Copyright 2013-2025, University of Colorado Boulder

/**
 * A model of a set of subatomic particles - protons, neutrons, and electrons - that can be assembled into atoms.
 *
 * @author John Blanco
 * @author Agustín Vallejo
 */

import BooleanProperty from '../../../../axon/js/BooleanProperty.js';
import Multilink from '../../../../axon/js/Multilink.js';
import NumberProperty from '../../../../axon/js/NumberProperty.js';
import TProperty from '../../../../axon/js/TProperty.js';
import Dimension2 from '../../../../dot/js/Dimension2.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import affirm from '../../../../perennial-alias/js/browser-and-node/affirm.js';
import { combineOptions } from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import { ParticleContainer } from '../../../../phetcommon/js/model/ParticleContainer.js';
import SphereBucket from '../../../../phetcommon/js/model/SphereBucket.js';
import NumberAtom from '../../../../shred/js/model/NumberAtom.js';
import Particle from '../../../../shred/js/model/Particle.js';
import ParticleAtom from '../../../../shred/js/model/ParticleAtom.js';
import ShredConstants from '../../../../shred/js/ShredConstants.js';
import isSettingPhetioStateProperty from '../../../../tandem/js/isSettingPhetioStateProperty.js';
import { PhetioObjectOptions } from '../../../../tandem/js/PhetioObject.js';
import buildAnAtom from '../../buildAnAtom.js';
import BuildAnAtomFluent from '../../BuildAnAtomFluent.js';
import BAAColors from '../BAAColors.js';
import BAAQueryParameters from '../BAAQueryParameters.js';
import BAAParticle, { BAAParticleType } from './BAAParticle.js';

// constants
export const MAX_PROTONS = 10;
export const MAX_NEUTRONS = 13;
export const MAX_ELECTRONS = 10;
const NUCLEON_CAPTURE_RADIUS = 100;
const BUCKET_WIDTH = 120;
const BUCKET_HEIGHT = BUCKET_WIDTH * 0.45;
const BUCKET_SIZE = new Dimension2( BUCKET_WIDTH, BUCKET_HEIGHT );
const BUCKET_Y_OFFSET = -205;
const NUCLEUS_JUMP_PERIOD = 0.1; // in seconds
const MAX_NUCLEUS_JUMP = ShredConstants.NUCLEON_RADIUS * 0.5;
const JUMP_ANGLES = [ Math.PI * 0.1, Math.PI * 1.6, Math.PI * 0.7, Math.PI * 1.1, Math.PI * 0.3 ];
const JUMP_DISTANCES = [ MAX_NUCLEUS_JUMP * 0.4, MAX_NUCLEUS_JUMP * 0.8, MAX_NUCLEUS_JUMP * 0.2, MAX_NUCLEUS_JUMP * 0.9 ];
const NUMBER_OF_NUCLEON_LAYERS = 6; // Number of layers for nucleons in the atom, used for z-ordering in view.

type SelfOptions = {
  isInitialAtomConfigurable?: boolean; // If true, the initial atom configuration can be changed by query parameter.
};

export type BAAModelOptions = SelfOptions & PickRequired<PhetioObjectOptions, 'tandem'>;

// Type for particle containers
type ContainerType = ParticleContainer<Particle> | null;

class BAAModel {

  // The atom that the user will build, modify, and generally play with.
  public readonly atom: ParticleAtom;

  // The buckets that hold the subatomic particles.
  public readonly protonBucket: SphereBucket<BAAParticle>;
  public readonly neutronBucket: SphereBucket<BAAParticle>;
  public readonly electronBucket: SphereBucket<BAAParticle>;
  public readonly buckets: SphereBucket<BAAParticle>[];

  // Properties that report the number of particles in each bucket. Used mostly for a11y.
  public readonly protonBucketParticleCountProperty: TProperty<number>;
  public readonly neutronBucketParticleCountProperty: TProperty<number>;
  public readonly electronBucketParticleCountProperty: TProperty<number>;

  // Arrays that hold the subatomic particles.
  public readonly nucleons: BAAParticle[];
  public readonly electrons: BAAParticle[];

  // Property that controls whether the nuclear instability is animated, meaning that it jumps around.
  public readonly animateNuclearInstabilityProperty: TProperty<boolean>;

  // countdown for nucleus jump animation, in seconds
  private nucleusJumpCountdown = NUCLEUS_JUMP_PERIOD;

  // count for how many times the nucleus has jumped
  private nucleusJumpCount = 0;

  // Flag to keep track of whether we are resetting to avoid redundant operations
  public resetting = false;

  public constructor( providedOptions: BAAModelOptions ) {

    const options = combineOptions<BAAModelOptions>( {
      isInitialAtomConfigurable: true // If true, the initial atom configuration can be changed by query parameter.
    }, providedOptions );

    const tandem = options.tandem;

    // Create the atom that the user will build, modify, and generally play with.
    this.atom = new ParticleAtom( {
      tandem: tandem.createTandem( 'atom' ),
      phetioFeatured: true
    } );

    // Create the buckets that will hold the subatomic particles.
    const bucketsTandem = tandem.createTandem( 'buckets' );
    this.protonBucket = new SphereBucket( {
      position: new Vector2( -BUCKET_WIDTH * 1.1, BUCKET_Y_OFFSET ),
      size: BUCKET_SIZE,
      sphereRadius: ShredConstants.NUCLEON_RADIUS,
      baseColor: BAAColors.protonColorProperty,
      captionText: BuildAnAtomFluent.protonsStringProperty,
      captionColor: 'white',
      tandem: bucketsTandem.createTandem( 'protonBucket' )
    } );
    this.neutronBucket = new SphereBucket( {
      position: new Vector2( 0, BUCKET_Y_OFFSET ),
      size: BUCKET_SIZE,
      sphereRadius: ShredConstants.NUCLEON_RADIUS,
      baseColor: BAAColors.neutronColorProperty,
      captionText: BuildAnAtomFluent.neutronsStringProperty,
      captionColor: 'white',
      tandem: bucketsTandem.createTandem( 'neutronBucket' )
    } );
    this.electronBucket = new SphereBucket( {
      position: new Vector2( BUCKET_WIDTH * 1.1, BUCKET_Y_OFFSET ),
      size: BUCKET_SIZE,
      sphereRadius: ShredConstants.ELECTRON_RADIUS,
      usableWidthProportion: 0.8,
      baseColor: BAAColors.electronColorProperty,
      captionText: BuildAnAtomFluent.electronsStringProperty,
      captionColor: 'white',
      tandem: bucketsTandem.createTandem( 'electronBucket' )
    } );

    this.buckets = [ this.protonBucket, this.neutronBucket, this.electronBucket ];

    this.protonBucketParticleCountProperty = new NumberProperty( 0 );
    this.neutronBucketParticleCountProperty = new NumberProperty( 0 );
    this.electronBucketParticleCountProperty = new NumberProperty( 0 );

    this.animateNuclearInstabilityProperty = new BooleanProperty( false );

    // Define a function that will decide where to put nucleons.
    const placeNucleon = ( particle: BAAParticle, bucket: SphereBucket<BAAParticle>, atom: ParticleAtom ): void => {
      if ( particle.positionProperty.value.distance( atom.positionProperty.value ) < NUCLEON_CAPTURE_RADIUS ) {
        atom.addParticle( particle );
      }
      else {
        bucket.addParticleNearestOpen( particle, true );
      }
    };

    // Define the arrays where the subatomic particles will reside.
    this.nucleons = [];
    this.electrons = [];

    const protonTandem = tandem.createTandem( 'protons' );
    const neutronTandem = tandem.createTandem( 'neutrons' );
    const electronTandem = tandem.createTandem( 'electrons' );

    const addNucleons = ( particleType: BAAParticleType, numberToAdd: number ): void => {
      const bucket = particleType === 'proton' ? this.protonBucket : this.neutronBucket;
      const parentTandem = particleType === 'proton' ? protonTandem : neutronTandem;
      _.times( numberToAdd, index => {
        const nucleon = new BAAParticle( particleType, {
          tandem: parentTandem.createTandem( `${particleType}${index + 1}` ),
          maxZLayer: NUMBER_OF_NUCLEON_LAYERS - 1,
          colorProperty: particleType === 'proton' ? BAAColors.protonColorProperty : BAAColors.neutronColorProperty
        } );
        this.nucleons.push( nucleon );
        bucket.addParticleFirstOpen( nucleon, false );
        nucleon.isDraggingProperty.lazyLink( isDragging => {
          if ( isDragging ) {
            if ( nucleon.containerProperty.value ) {

              // Remove the nucleon from its container, which will be either a bucket or the particle atom.
              nucleon.containerProperty.value.removeParticle( nucleon );
            }
          }
          else if ( !isDragging && !bucket.includes( nucleon ) ) {
            placeNucleon( nucleon, bucket, this.atom );
          }
        } );

        // Prevent interaction with this particle when it is animating to a destination.  We need the isDraggingProperty
        // because there is a slight delay between setting position and destination that we don't want to turn off
        // input.  The containerProperty is needed because we want to allow interaction when the nucleon is in the atom
        // even when the nucleus is unstable and thus animation, which can also glitch input if we only check position
        // and destination.
        Multilink.multilink(
          [
            nucleon.isDraggingProperty,
            nucleon.containerProperty,
            nucleon.positionProperty,
            nucleon.destinationProperty
          ],
          ( isDragging, container, position, destination ) => {

            const distanceToDestination = position.distance( destination );
            nucleon.inputEnabledProperty.value = isDragging ||
                                                 ( container === this.atom &&
                                                   distanceToDestination <= 2 * MAX_NUCLEUS_JUMP ) ||
                                                 position.equals( destination );
          }
        );

        nucleon.containerProperty.link( ( container: ContainerType, lastCointainer: ContainerType ) => {
          if ( container === bucket ) {
            if ( particleType === 'proton' ) {
              this.protonBucketParticleCountProperty.value++;
            }
            else {
              this.neutronBucketParticleCountProperty.value++;
            }
          }
          else if ( lastCointainer === bucket ) {
            if ( particleType === 'proton' ) {
              this.protonBucketParticleCountProperty.value--;
            }
            else {
              this.neutronBucketParticleCountProperty.value--;
            }
          }
        } );
      } );
    };

    // Add the protons and neutrons, aka the nucleons.
    addNucleons( 'proton', MAX_PROTONS );
    addNucleons( 'neutron', MAX_NEUTRONS );

    // Add the electrons.
    _.times( MAX_ELECTRONS, index => {
      const electron = new BAAParticle( 'electron', {
        tandem: electronTandem.createTandem( `electron${index + 1}` ),
        maxZLayer: NUMBER_OF_NUCLEON_LAYERS - 1,
        colorProperty: BAAColors.electronColorProperty
      } );
      this.electrons.push( electron );
      this.electronBucket.addParticleFirstOpen( electron, false );
      electron.isDraggingProperty.lazyLink( isDragging => {
        if ( isDragging ) {
          if ( electron.containerProperty.value ) {

            // Remove the electron from its container, which will be either a bucket or the particle atom.
            electron.containerProperty.value.removeParticle( electron );
          }
        }
        else if ( !isDragging && !this.electronBucket.includes( electron ) ) {
          if ( electron.positionProperty.value.distance( Vector2.ZERO ) < this.atom.outerElectronShellRadius * 1.1 ) {
            this.atom.addParticle( electron );
          }
          else {
            this.electronBucket.addParticleNearestOpen( electron, true );
          }
        }
      } );

      // Prevent interaction with this particle when it is animating to a destination.
      Multilink.multilink(
        [ electron.isDraggingProperty, electron.positionProperty, electron.destinationProperty ],
        ( isDragging, position, destination ) => {
          electron.inputEnabledProperty.value = isDragging || position.equals( destination );
        }
      );

      electron.containerProperty.link( ( container: ContainerType, lastCointainer: ContainerType ) => {
        if ( container === this.electronBucket ) {
          this.electronBucketParticleCountProperty.value++;
        }
        else if ( lastCointainer === this.electronBucket ) {
          this.electronBucketParticleCountProperty.value--;
        }
      } );
    } );

    if ( options.isInitialAtomConfigurable ) {

      assert && assert( BAAQueryParameters.protons <= MAX_PROTONS, 'Proton count exceeds maximum allowed' );
      assert && assert( BAAQueryParameters.neutrons <= MAX_NEUTRONS, 'Neutron count exceeds maximum allowed' );
      assert && assert( BAAQueryParameters.electrons <= MAX_ELECTRONS, 'Electron count exceeds maximum allowed' );

      this.setAtomConfiguration( new NumberAtom( {
        protonCount: BAAQueryParameters.protons,
        neutronCount: BAAQueryParameters.neutrons,
        electronCount: BAAQueryParameters.electrons
      } ) );
    }
  }

  public step( dt: number ): void {

    // Update particle positions.
    this.nucleons.forEach( nucleon => {
      nucleon.step( dt );
    } );
    this.electrons.forEach( electron => {
      electron.step( dt );
    } );

    // Animate the unstable nucleus by making it jump periodically.
    if ( !this.atom.nucleusStableProperty.value && this.animateNuclearInstabilityProperty.value ) {
      this.nucleusJumpCountdown -= dt;
      if ( this.nucleusJumpCountdown <= 0 ) {
        this.nucleusJumpCountdown = NUCLEUS_JUMP_PERIOD;
        this.nucleusJumpCount++;
        const angle = JUMP_ANGLES[ this.nucleusJumpCount % JUMP_ANGLES.length ];
        const distance = JUMP_DISTANCES[ this.nucleusJumpCount % JUMP_DISTANCES.length ];
        this.atom.nucleusOffsetProperty.value = new Vector2( distance, 0 ).rotated( angle );
      }
    }
    else {

      // animation is not running, make sure nucleus is in center of atom
      this.atom.nucleusOffsetProperty.value = Vector2.ZERO;
    }
  }

  public reset(): void {

    this.resetting = true;

    if ( isSettingPhetioStateProperty.value ) {
      // If we are setting the phet-io state, we don't want to reset the model.
      return;
    }

    // Move any particles that are in transit back to its bucket.
    this.nucleons.forEach( nucleon => {
      if ( !nucleon.positionProperty.value.equals( nucleon.destinationProperty.value ) ) {
        nucleon.moveImmediatelyToDestination();
      }
    } );
    this.electrons.forEach( electron => {
      if ( !electron.positionProperty.value.equals( electron.destinationProperty.value ) ) {
        electron.moveImmediatelyToDestination();
      }
    } );

    // Remove all particles from the particle atom.
    this.atom.clear();

    // Remove all particles from the buckets.
    this.protonBucket.reset();
    this.neutronBucket.reset();
    this.electronBucket.reset();

    // Add all the particles back to their buckets so that they are stacked in their original configurations.
    this.nucleons.forEach( nucleon => {
      if ( nucleon.type === 'proton' ) {
        this.protonBucket.addParticleFirstOpen( nucleon, false );
      }
      else {
        this.neutronBucket.addParticleFirstOpen( nucleon, false );
      }
    } );
    this.electrons.forEach( electron => {
      this.electronBucket.addParticleFirstOpen( electron, false );
    } );

    this.nucleusJumpCountdown = NUCLEUS_JUMP_PERIOD;
    this.nucleusJumpCount = 0;

    this.resetting = false;
  }

  public getParticleCountByType( particleType: BAAParticleType ): number {
    if ( particleType === 'proton' ) {
      return this.atom.protons.length;
    }
    else if ( particleType === 'neutron' ) {
      return this.atom.neutrons.length;
    }
    else {
      return this.atom.electrons.length;
    }
  }

  /**
   * Set the atom to the provided configuration.  This will move particles between the buckets and the atom as needed.
   */
  public setAtomConfiguration( numberAtom: NumberAtom ): void {

    // Move the particles.
    this.adjustParticleCountInAtom( 'proton', numberAtom.protonCountProperty.value );
    this.adjustParticleCountInAtom( 'neutron', numberAtom.neutronCountProperty.value );
    this.adjustParticleCountInAtom( 'electron', numberAtom.electronCountProperty.value );

    // Finalize particle positions.
    this.nucleons.forEach( nucleon => { nucleon.moveImmediatelyToDestination(); } );
    this.electrons.forEach( electron => { electron.moveImmediatelyToDestination(); } );
  }

  /**
   * Move particles of the specified type between the buckets and atoms to reach the specified target count in the atom.
   */
  private adjustParticleCountInAtom( particleType: BAAParticleType, targetCount: number ): void {

    // Make sure this is one of the particle types we handle.
    assert && assert( particleType === 'proton' || particleType === 'neutron' || particleType === 'electron',
      `Unhandled particle type: ${particleType}` );

    // Get the bucket and the current count of this particle type in the atom based on the particle type.
    const bucket = particleType === 'proton' ? this.protonBucket :
                   particleType === 'neutron' ? this.neutronBucket :
                   this.electronBucket;
    let currentCountInAtom = particleType === 'proton' ? this.atom.protons.length :
                             particleType === 'neutron' ? this.atom.neutrons.length :
                             this.atom.electrons.length;

    const atomCenter = this.atom.positionProperty.value;

    while ( currentCountInAtom < targetCount ) {
      const particle = bucket.extractClosestParticle( atomCenter );
      affirm( particle, `No ${particleType} particle to move from bucket to atom` );
      this.atom.addParticle( particle );
      currentCountInAtom++;
    }
    while ( currentCountInAtom > targetCount ) {
      const particle = this.atom.extractParticle( particleType );
      affirm( particle, `No ${particleType} particle to move from atom to bucket` );
      bucket.addParticleFirstOpen( particle as BAAParticle, true );
      currentCountInAtom--;
    }
  }

  public static readonly MAX_CHARGE = Math.max( MAX_PROTONS, MAX_ELECTRONS );
  public static readonly NUMBER_OF_NUCLEON_LAYERS = NUMBER_OF_NUCLEON_LAYERS;
}

buildAnAtom.register( 'BAAModel', BAAModel );

export default BAAModel;