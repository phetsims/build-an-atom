// Copyright 2013-2025, University of Colorado Boulder

/**
 * A model of a set of subatomic particles - protons, neutrons, and electrons - that can be assembled into atoms.
 *
 * @author John Blanco
 * @author Agustín Vallejo
 */

import BooleanProperty from '../../../../axon/js/BooleanProperty.js';
import Emitter from '../../../../axon/js/Emitter.js';
import Multilink from '../../../../axon/js/Multilink.js';
import TEmitter from '../../../../axon/js/TEmitter.js';
import TProperty from '../../../../axon/js/TProperty.js';
import Dimension2 from '../../../../dot/js/Dimension2.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import affirm from '../../../../perennial-alias/js/browser-and-node/affirm.js';
import { combineOptions } from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import SphereBucket from '../../../../phetcommon/js/model/SphereBucket.js';
import NumberAtom from '../../../../shred/js/model/NumberAtom.js';
import Particle, { ParticleType } from '../../../../shred/js/model/Particle.js';
import ParticleAtom from '../../../../shred/js/model/ParticleAtom.js';
import ShredConstants from '../../../../shred/js/ShredConstants.js';
import isSettingPhetioStateProperty from '../../../../tandem/js/isSettingPhetioStateProperty.js';
import { PhetioObjectOptions } from '../../../../tandem/js/PhetioObject.js';
import buildAnAtom from '../../buildAnAtom.js';
import BuildAnAtomFluent from '../../BuildAnAtomFluent.js';
import BAAColors from '../BAAColors.js';
import BAAQueryParameters from '../BAAQueryParameters.js';

// constants
const NUM_PROTONS = 10;
const NUM_NEUTRONS = 13;
const NUM_ELECTRONS = 10;
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

export type AtomDestinations = 'nucleus' | 'innerElectronShell' | 'outerElectronShell' | 'electronCloud';

export type BAAModelOptions = SelfOptions & PickRequired<PhetioObjectOptions, 'tandem'>;

class BAAModel {

  // The atom that the user will build, modify, and generally play with.
  public readonly atom: ParticleAtom;

  // The buckets that hold the subatomic particles.
  public readonly protonBucket: SphereBucket<Particle>;
  public readonly neutronBucket: SphereBucket<Particle>;
  public readonly electronBucket: SphereBucket<Particle>;
  public readonly buckets: SphereBucket<Particle>[];

  // Arrays that hold the subatomic particles.
  public readonly nucleons: Particle[];
  public readonly electrons: Particle[];

  // Property that controls whether the nuclear instability is animated, meaning that it jumps around.
  public readonly animateNuclearInstabilityProperty: TProperty<boolean>;

  // countdown for nucleus jump animation, in seconds
  private nucleusJumpCountdown = NUCLEUS_JUMP_PERIOD;

  // count for how many times the nucleus has jumped
  private nucleusJumpCount = 0;

  // Emitter for context response for when particles are animated to position
  public returnedToBucketEmitter: TEmitter;
  public addedToAtomEmitter: TEmitter<[ AtomDestinations ]>;

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

    this.animateNuclearInstabilityProperty = new BooleanProperty( false );

    this.returnedToBucketEmitter = new Emitter();
    this.addedToAtomEmitter = new Emitter<[ AtomDestinations ]>( { parameters: [ { valueType: 'string' } ] } );

    // Define a function that will decide where to put nucleons.
    const placeNucleon = ( particle: Particle, bucket: SphereBucket<Particle>, atom: ParticleAtom ): void => {
      if ( particle.positionProperty.value.distance( atom.positionProperty.value ) < NUCLEON_CAPTURE_RADIUS ) {
        atom.addParticle( particle );
        this.addedToAtomEmitter.emit( 'nucleus' );
      }
      else {
        bucket.addParticleNearestOpen( particle, true );
        this.returnedToBucketEmitter.emit();
      }
    };

    // Define the arrays where the subatomic particles will reside.
    this.nucleons = [];
    this.electrons = [];

    const protonTandem = tandem.createTandem( 'protons' );
    const neutronTandem = tandem.createTandem( 'neutrons' );
    const electronTandem = tandem.createTandem( 'electrons' );

    const addNucleons = ( particleType: ParticleType, numberToAdd: number ): void => {
      const bucket = particleType === 'proton' ? this.protonBucket : this.neutronBucket;
      const parentTandem = particleType === 'proton' ? protonTandem : neutronTandem;
      _.times( numberToAdd, index => {
        const nucleon = new Particle( particleType, {
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

        // Prevent interaction with this particle when it is animating to a destination.
        Multilink.multilink(
          [ nucleon.isDraggingProperty, nucleon.positionProperty, nucleon.destinationProperty ],
          ( isDragging, position, destination ) => {
            nucleon.inputEnabledProperty.value = isDragging || position.equals( destination );
          }
        );
      } );
    };

    // Add the protons and neutrons, aka the nucleons.
    addNucleons( 'proton', NUM_PROTONS );
    addNucleons( 'neutron', NUM_NEUTRONS );

    // Add the electrons.
    _.times( NUM_ELECTRONS, index => {
      const electron = new Particle( 'electron', {
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
            if ( this.atom.electronCountProperty.value <= 2 ) {
              // Electron will go to inner shell

              this.addedToAtomEmitter.emit( 'innerElectronShell' );
            }
            else {
              // Electron will go to outer shell

              this.addedToAtomEmitter.emit( 'outerElectronShell' );
            }
            this.atom.addParticle( electron );
          }
          else {
            this.electronBucket.addParticleNearestOpen( electron, true );
            this.returnedToBucketEmitter.emit();
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
    else {

      // animation is not running, make sure nucleus is in center of atom
      this.atom.nucleusOffsetProperty.value = Vector2.ZERO;
    }
  }

  public reset(): void {

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
  private adjustParticleCountInAtom( particleType: ParticleType, targetCount: number ): void {

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
      assert && assert( particle, `No ${particleType} particle to move from atom to bucket` );
      bucket.addParticleFirstOpen( particle, true );
      currentCountInAtom--;
    }
  }

  public static readonly MAX_CHARGE = Math.max( NUM_PROTONS, NUM_ELECTRONS );
  public static readonly NUMBER_OF_NUCLEON_LAYERS = NUMBER_OF_NUCLEON_LAYERS;
}

buildAnAtom.register( 'BAAModel', BAAModel );

export default BAAModel;