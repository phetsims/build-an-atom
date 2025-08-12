// Copyright 2013-2025, University of Colorado Boulder

/**
 * A model of a set of subatomic particles - protons, neutrons, and electrons - that can be assembled into atoms.
 *
 * @author John Blanco
 * @author Agustín Vallejo
 */

import BooleanProperty from '../../../../axon/js/BooleanProperty.js';
import { ObservableArray } from '../../../../axon/js/createObservableArray.js';
import Multilink from '../../../../axon/js/Multilink.js';
import NumberProperty from '../../../../axon/js/NumberProperty.js';
import TProperty from '../../../../axon/js/TProperty.js';
import Dimension2 from '../../../../dot/js/Dimension2.js';
import Range from '../../../../dot/js/Range.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import { combineOptions } from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import SphereBucket from '../../../../phetcommon/js/model/SphereBucket.js';
import NumberAtom from '../../../../shred/js/model/NumberAtom.js';
import Particle from '../../../../shred/js/model/Particle.js';
import ParticleAtom from '../../../../shred/js/model/ParticleAtom.js';
import ShredConstants from '../../../../shred/js/ShredConstants.js';
import { PhetioObjectOptions } from '../../../../tandem/js/PhetioObject.js';
import buildAnAtom from '../../buildAnAtom.js';
import BuildAnAtomFluent from '../../BuildAnAtomFluent.js';
import BAAColors from '../BAAColors.js';
import BAAQueryParameters from '../BAAQueryParameters.js';
import BAAScreenView from '../view/BAAScreenView.js';

// constants
const NUM_PROTONS = 10;
const NUM_NEUTRONS = 13;
const NUM_ELECTRONS = 10;
const NUCLEON_CAPTURE_RADIUS = 100;
const BUCKET_WIDTH = 120;
const BUCKET_HEIGHT = BUCKET_WIDTH * 0.45;
const BUCKET_Y_OFFSET = -205;
const NUCLEUS_JUMP_PERIOD = 0.1; // in seconds
const MAX_NUCLEUS_JUMP = ShredConstants.NUCLEON_RADIUS * 0.5;
const JUMP_ANGLES = [ Math.PI * 0.1, Math.PI * 1.6, Math.PI * 0.7, Math.PI * 1.1, Math.PI * 0.3 ];
const JUMP_DISTANCES = [ MAX_NUCLEUS_JUMP * 0.4, MAX_NUCLEUS_JUMP * 0.8, MAX_NUCLEUS_JUMP * 0.2, MAX_NUCLEUS_JUMP * 0.9 ];

type SelfOptions = {
  isInitialAtomConfigurable?: boolean; // If true, the initial atom configuration can be changed by query parameter.
};

export type BAAModelOptions = SelfOptions & PickRequired<PhetioObjectOptions, 'tandem'>;

class BAAModel {

  // The atom that the user will build, modify, and generally play with.
  public readonly atom: ParticleAtom;

  // The buckets that hold the subatomic particles.
  public readonly buckets: Record<string, SphereBucket<Particle>>;

  // Arrays that hold the subatomic particles.
  public readonly nucleons: Particle[];
  public readonly electrons: Particle[];

  // Property that controls the speed of particle animations in the view.
  private readonly particleAnimationSpeedProperty: TProperty<number>;

  // Property that controls whether the nuclear instability is animated, meaning that it jumps around.
  public readonly animateNuclearInstabilityProperty: TProperty<boolean>;

  // TODO: Does this get reset properly? See https://github.com/phetsims/build-an-atom/issues/329
  // countdown for nucleus jump animation, in seconds
  private nucleusJumpCountdown = NUCLEUS_JUMP_PERIOD;

  // TODO: Does this get reset properly? See https://github.com/phetsims/build-an-atom/issues/329
  // count for how many times the nucleus has jumped
  private nucleusJumpCount = 0;

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

    // TODO: Substructure for buckets good? See https://github.com/phetsims/build-an-atom/issues/329
    // Create the buckets that will hold the subatomic particles.
    this.buckets = {
      protonBucket: new SphereBucket( {
        position: new Vector2( -BUCKET_WIDTH * 1.1, BUCKET_Y_OFFSET ),
        size: new Dimension2( BUCKET_WIDTH, BUCKET_HEIGHT ),
        sphereRadius: ShredConstants.NUCLEON_RADIUS,
        baseColor: BAAColors.protonColorProperty,
        captionText: BuildAnAtomFluent.protonsStringProperty,
        captionColor: 'white',
        tandem: tandem.createTandem( 'protonBucket' )
      } ),
      neutronBucket: new SphereBucket( {
        position: new Vector2( 0, BUCKET_Y_OFFSET ),
        size: new Dimension2( BUCKET_WIDTH, BUCKET_HEIGHT ),
        sphereRadius: ShredConstants.NUCLEON_RADIUS,
        baseColor: BAAColors.neutronColorProperty,
        captionText: BuildAnAtomFluent.neutronsStringProperty,
        captionColor: 'white',
        tandem: tandem.createTandem( 'neutronBucket' )
      } ),
      electronBucket: new SphereBucket( {
        position: new Vector2( BUCKET_WIDTH * 1.1, BUCKET_Y_OFFSET ),
        size: new Dimension2( BUCKET_WIDTH, BUCKET_HEIGHT ),
        sphereRadius: ShredConstants.ELECTRON_RADIUS,
        usableWidthProportion: 0.8,
        baseColor: BAAColors.electronColorProperty,
        captionText: BuildAnAtomFluent.electronsStringProperty,
        captionColor: 'white',
        tandem: tandem.createTandem( 'electronBucket' )
      } )
    };

    this.animateNuclearInstabilityProperty = new BooleanProperty( false );

    // Create a property that controls the speed of particle animations in the view.  This is only used for phet-io.
    this.particleAnimationSpeedProperty = new NumberProperty( ShredConstants.DEFAULT_PARTICLE_SPEED, {
      tandem: tandem.createTandem( 'particleAnimationSpeedProperty' ),
      range: new Range( ShredConstants.DEFAULT_PARTICLE_SPEED / 10, ShredConstants.DEFAULT_PARTICLE_SPEED * 10 ),
      units: 'view-coordinates/s'
    } );

    // Define a function that will decide where to put nucleons.
    const placeNucleon = ( particle: Particle, bucket: SphereBucket<Particle>, atom: ParticleAtom ): void => {
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

    // Add the protons and neutrons, aka the nucleons.
    _.times( NUM_PROTONS + NUM_NEUTRONS, index => {
      const particleType = index < NUM_PROTONS ? 'proton' : 'neutron';
      const bucket = particleType === 'proton' ? this.buckets.protonBucket : this.buckets.neutronBucket;
      const tandem = particleType === 'proton' ? protonTandem : neutronTandem;
      const nucleon = new Particle( particleType, {
        animationSpeedProperty: this.particleAnimationSpeedProperty,
        tandem: tandem.createTandem( `${particleType}${index}` ),
        maxZLayer: BAAScreenView.NUM_NUCLEON_LAYERS - 1,
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

      // Prevent interaction with this particle when it is animating to a destination.
      Multilink.multilink(
        [ nucleon.isDraggingProperty, nucleon.positionProperty, nucleon.destinationProperty ],
        ( isDragging, position, destination ) => {
          nucleon.inputEnabledProperty.value = isDragging || position.equals( destination );
        }
      );
    } );

    // Add the electrons.
    _.times( NUM_ELECTRONS, index => {
      const electron = new Particle( 'electron', {
        animationSpeedProperty: this.particleAnimationSpeedProperty,
        tandem: electronTandem.createTandem( `electron${index}` ),
        maxZLayer: BAAScreenView.NUM_NUCLEON_LAYERS - 1,
        colorProperty: BAAColors.electronColorProperty
      } );
      this.electrons.push( electron );
      this.buckets.electronBucket.addParticleFirstOpen( electron, false );
      electron.isDraggingProperty.lazyLink( isDragging => {
        if ( isDragging ) {
          if ( electron.containerProperty.value ) {

            // Remove the electron from its container, which will be either a bucket or the particle atom.
            electron.containerProperty.value.removeParticle( electron );
          }
        }
        else if ( !isDragging && !this.buckets.electronBucket.includes( electron ) ) {
          if ( electron.positionProperty.value.distance( Vector2.ZERO ) < this.atom.outerElectronShellRadius * 1.1 ) {
            this.atom.addParticle( electron );
          }
          else {
            this.buckets.electronBucket.addParticleNearestOpen( electron, true );
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

    } );

    if ( options.isInitialAtomConfigurable ) {

      assert && assert( BAAQueryParameters.protons <= NUM_PROTONS, 'Proton count exceeds maximum allowed' );
      assert && assert( BAAQueryParameters.neutrons <= NUM_NEUTRONS, 'Neutron count exceeds maximum allowed' );
      assert && assert( BAAQueryParameters.electrons <= NUM_ELECTRONS, 'Electron count exceeds maximum allowed' );

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
        this.atom.nucleusOffsetProperty.value =
          new Vector2( Math.cos( angle ) * distance, Math.sin( angle ) * distance );
      }
    }
    else if ( this.atom.nucleusOffsetProperty.value.equals( Vector2.ZERO ) ) {

      // animation is not running, make sure nucleus is in center of atom
      this.atom.nucleusOffsetProperty.value = Vector2.ZERO;
    }
  }

  private _moveParticlesFromAtomToBucket( particleCollection: ObservableArray<Particle>, bucket: SphereBucket<Particle> ): void {

    // Copy the observable particle collection into a regular array.
    const particlesToRemove = particleCollection.getArrayCopy();
    particlesToRemove.forEach( particle => {
        this.atom.removeParticle( particle );
        bucket.addParticleFirstOpen( particle, true );
      }
    );
  }

  public reset(): void {

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
    this.buckets.protonBucket.reset();
    this.buckets.neutronBucket.reset();
    this.buckets.electronBucket.reset();

    // Add all the particles back to their buckets so that they are stacked in their original configurations.
    this.nucleons.forEach( nucleon => {
      if ( nucleon.type === 'proton' ) {
        this.buckets.protonBucket.addParticleFirstOpen( nucleon, false );
      }
      else {
        this.buckets.neutronBucket.addParticleFirstOpen( nucleon, false );
      }
    } );
    this.electrons.forEach( electron => {
      this.buckets.electronBucket.addParticleFirstOpen( electron, false );
    } );
  }

  public setAtomConfiguration( numberAtom: NumberAtom ): void {

    // First reset the atom because sometimes the assigned particles are already displayed
    this.reset();

    // Define a function for transferring particles from buckets to atom.
    const atomCenter = this.atom.positionProperty.value;

    // TODO: Should this be adjacent to _moveParticlesFromAtomToBucket? https://github.com/phetsims/build-an-atom/issues/329
    const moveParticlesToAtom = (
      currentCountInAtom: number,
      targetCountInAtom: number,
      particlesInAtom: ObservableArray<Particle>,
      bucket: SphereBucket<Particle>
    ) => {
      while ( currentCountInAtom < targetCountInAtom ) {
        const particle = bucket.extractClosestParticle( atomCenter )!;
        particle.setPositionAndDestination( atomCenter );
        particle.isDraggingProperty.value = false; // Necessary to make it look like user released particle.
        currentCountInAtom++;
      }
      while ( currentCountInAtom > targetCountInAtom ) {
        this._moveParticlesFromAtomToBucket( particlesInAtom, bucket );
        currentCountInAtom--;
      }
    };

    // Move the particles.
    moveParticlesToAtom( this.atom.protons.length,
      numberAtom.protonCountProperty.value,
      this.atom.protons,
      this.buckets.protonBucket
    );
    moveParticlesToAtom(
      this.atom.neutrons.length,
      numberAtom.neutronCountProperty.value,
      this.atom.neutrons,
      this.buckets.neutronBucket
    );
    moveParticlesToAtom(
      this.atom.electrons.length,
      numberAtom.electronCountProperty.value,
      this.atom.electrons,
      this.buckets.electronBucket
    );

    // Finalize particle positions.
    this.atom.moveAllParticlesToDestination();
  }

  public static readonly MAX_CHARGE = Math.max( NUM_PROTONS, NUM_ELECTRONS );
}

buildAnAtom.register( 'BAAModel', BAAModel );

export default BAAModel;