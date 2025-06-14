// Copyright 2013-2025, University of Colorado Boulder

/**
 * A model of a set of subatomic particles - protons, neutrons, and electrons - that can be assembled into atoms.
 *
 * @author John Blanco
 */

import BooleanProperty from '../../../../axon/js/BooleanProperty.js';
import { ObservableArray } from '../../../../axon/js/createObservableArray.js';
import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import Property from '../../../../axon/js/Property.js';
import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import Dimension2 from '../../../../dot/js/Dimension2.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import { combineOptions } from '../../../../phet-core/js/optionize.js';
import SphereBucket from '../../../../phetcommon/js/model/SphereBucket.js';
import PhetColorScheme from '../../../../scenery-phet/js/PhetColorScheme.js';
import AtomIdentifier from '../../../../shred/js/AtomIdentifier.js';
import NumberAtom from '../../../../shred/js/model/NumberAtom.js';
import Particle from '../../../../shred/js/model/Particle.js';
import ParticleAtom from '../../../../shred/js/model/ParticleAtom.js';
import ShredConstants from '../../../../shred/js/ShredConstants.js';
import { ElectronShellDepiction } from '../../../../shred/js/view/AtomNode.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import BooleanIO from '../../../../tandem/js/types/BooleanIO.js';
import StringUnionIO from '../../../../tandem/js/types/StringUnionIO.js';
import buildAnAtom from '../../buildAnAtom.js';
import BuildAnAtomStrings from '../../BuildAnAtomStrings.js';
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
  phetioState: boolean;
};

export type BuildAnAtomModelOptions = SelfOptions;

class BuildAnAtomModel {

  public showElementNameProperty: BooleanProperty;
  public showNeutralOrIonProperty: BooleanProperty;
  public showStableOrUnstableProperty: BooleanProperty;
  public electronShellDepictionProperty: Property<ElectronShellDepiction>;
  public particleAtom: ParticleAtom;
  public buckets: Record<string, SphereBucket<Particle>>;
  public nucleons: Particle[];
  public electrons: Particle[];
  public nucleusStableProperty: TReadOnlyProperty<boolean>;
  public nucleusJumpCountdown: number; // countdown for nucleus jump animation
  public nucleusOffset: Vector2; // offset for nucleus jump animation
  public nucleusJumpCount: number; // count for how many times the nucleus has jumped
  public static readonly MAX_CHARGE = Math.max( NUM_PROTONS, NUM_ELECTRONS );
  public static readonly MAX_ELECTRONS = NUM_ELECTRONS;

  public constructor( tandem: Tandem, options?: BuildAnAtomModelOptions ) {

    options = combineOptions<BuildAnAtomModelOptions>( {
      phetioState: true
    }, options );

    // Properties that control label visibility in the view.
    this.showElementNameProperty = new BooleanProperty( true, {
      tandem: tandem.createTandem( 'showElementNameProperty' ),
      phetioState: options.phetioState,
      phetioFeatured: true
    } );
    this.showNeutralOrIonProperty = new BooleanProperty( true, {
      tandem: tandem.createTandem( 'showNeutralOrIonProperty' ),
      phetioState: options.phetioState,
      phetioFeatured: true
    } );
    this.showStableOrUnstableProperty = new BooleanProperty( false, {
      tandem: tandem.createTandem( 'showStableOrUnstableProperty' ),
      phetioState: options.phetioState,
      phetioFeatured: true
    } );

    // Property that controls electron depiction in the view.
    const electronShellValidValues: ElectronShellDepiction[] = [ 'orbits', 'cloud' ];
    this.electronShellDepictionProperty = new Property<ElectronShellDepiction>( 'orbits', {
      tandem: tandem.createTandem( 'electronShellDepictionProperty' ),
      phetioValueType: StringUnionIO( electronShellValidValues ),
      phetioState: options.phetioState,
      validValues: electronShellValidValues
    } );

    // Create the atom that the user will build, modify, and generally play with.
    this.particleAtom = new ParticleAtom( {
      tandem: tandem.createTandem( 'particleAtom' ),
      phetioState: options.phetioState
    } );

    // Create the buckets that will hold the sub-atomic particles.
    this.buckets = {
      protonBucket: new SphereBucket( {
        position: new Vector2( -BUCKET_WIDTH * 1.1, BUCKET_Y_OFFSET ),
        size: new Dimension2( BUCKET_WIDTH, BUCKET_HEIGHT ),
        sphereRadius: ShredConstants.NUCLEON_RADIUS,
        baseColor: PhetColorScheme.RED_COLORBLIND,
        captionText: BuildAnAtomStrings.protonsStringProperty,
        captionColor: 'white',
        tandem: tandem.createTandem( 'protonBucket' ),
        phetioState: options.phetioState
      } ),
      neutronBucket: new SphereBucket( {
        position: new Vector2( 0, BUCKET_Y_OFFSET ),
        size: new Dimension2( BUCKET_WIDTH, BUCKET_HEIGHT ),
        sphereRadius: ShredConstants.NUCLEON_RADIUS,
        baseColor: 'rgb( 100, 100, 100 )',
        captionText: BuildAnAtomStrings.neutronsStringProperty,
        captionColor: 'white',
        tandem: tandem.createTandem( 'neutronBucket' ),
        phetioState: options.phetioState
      } ),
      electronBucket: new SphereBucket( {
        position: new Vector2( BUCKET_WIDTH * 1.1, BUCKET_Y_OFFSET ),
        size: new Dimension2( BUCKET_WIDTH, BUCKET_HEIGHT ),
        sphereRadius: ShredConstants.ELECTRON_RADIUS,
        usableWidthProportion: 0.8,
        baseColor: 'blue',
        captionText: BuildAnAtomStrings.electronsStringProperty,
        captionColor: 'white',
        tandem: tandem.createTandem( 'electronBucket' ),
        phetioState: options.phetioState
      } )
    };

    // Define a function that will decide where to put nucleons.
    const placeNucleon = (
      particle: Particle,
      bucket: SphereBucket<Particle>,
      atom: ParticleAtom
    ): void => {
      if ( particle.positionProperty.get().distance( atom.positionProperty.get() ) < NUCLEON_CAPTURE_RADIUS ) {
        atom.addParticle( particle );
      }
      else {
        bucket.addParticleNearestOpen( particle, true );
      }
    };

    // Define the arrays where the subatomic particles will reside.
    this.nucleons = [];
    this.electrons = [];

    // Add the protons.
    const protonTandem = tandem.createTandem( 'protons' );
    const neutronTandem = tandem.createTandem( 'neutrons' );
    const electronTandem = tandem.createTandem( 'electrons' );
    _.times( NUM_PROTONS, index => {
      const proton = new Particle( 'proton', {
        tandem: protonTandem.createTandem( `proton${index}` ),
        maxZLayer: BAAScreenView.NUM_NUCLEON_LAYERS - 1
      } );
      this.nucleons.push( proton );
      this.buckets.protonBucket.addParticleFirstOpen( proton, false );
      proton.userControlledProperty.link( userControlled => {
        if ( !userControlled && !this.buckets.protonBucket.containsParticle( proton ) ) {
          placeNucleon( proton, this.buckets.protonBucket, this.particleAtom );
        }
      } );
    } );

    // Add the neutrons.
    _.times( NUM_NEUTRONS, index => {
      const neutron = new Particle( 'neutron', {
        tandem: neutronTandem.createTandem( `neutron${index}` ),
        maxZLayer: BAAScreenView.NUM_NUCLEON_LAYERS - 1
      } );
      this.nucleons.push( neutron );
      this.buckets.neutronBucket.addParticleFirstOpen( neutron, false );
      neutron.userControlledProperty.link( userControlled => {
        if ( !userControlled && !this.buckets.neutronBucket.containsParticle( neutron ) ) {
          placeNucleon( neutron, this.buckets.neutronBucket, this.particleAtom );
        }
      } );
    } );

    // Add the electrons.
    _.times( NUM_ELECTRONS, index => {
      const electron = new Particle( 'electron', {
        tandem: electronTandem.createTandem( `electron${index}` ),
        maxZLayer: BAAScreenView.NUM_NUCLEON_LAYERS - 1
      } );
      this.electrons.push( electron );
      this.buckets.electronBucket.addParticleFirstOpen( electron, false );
      electron.userControlledProperty.link( userControlled => {
        if ( !userControlled && !this.buckets.electronBucket.containsParticle( electron ) ) {
          if ( electron.positionProperty.get().distance( Vector2.ZERO ) < this.particleAtom.outerElectronShellRadius * 1.1 ) {
            this.particleAtom.addParticle( electron );
          }
          else {
            this.buckets.electronBucket.addParticleNearestOpen( electron, true );
          }
        }
      } );
    } );

    // Update the stability state and counter on changes.
    this.nucleusStableProperty = new DerivedProperty(
      [ this.particleAtom.protonCountProperty, this.particleAtom.neutronCountProperty ],
      ( protonCount, neutronCount ) => protonCount + neutronCount > 0 ? AtomIdentifier.isStable( protonCount, neutronCount ) : true,
      {
        tandem: tandem.createTandem( 'nucleusStableProperty' ),
        phetioState: options.phetioState,
        phetioValueType: BooleanIO
      }
    );

    this.nucleusJumpCountdown = NUCLEUS_JUMP_PERIOD;
    this.nucleusOffset = Vector2.ZERO;

    // add a variable used when making the nucleus jump in order to indicate instability
    this.nucleusJumpCount = 0;
  }

  public dispose(): void {

    // DerivedProperties should be disposed first, see https://github.com/phetsims/axon/issues/167
    this.nucleusStableProperty.dispose();

    // next dispose the root (non-derived) properties
    this.showElementNameProperty.dispose();
    this.showNeutralOrIonProperty.dispose();
    this.showStableOrUnstableProperty.dispose();
    this.electronShellDepictionProperty.dispose();

    // etc...
    this.particleAtom.dispose();
    this.buckets.protonBucket.dispose();
    this.buckets.electronBucket.dispose();
    this.buckets.neutronBucket.dispose();
    this.electrons.forEach( electron => { electron.dispose();} );
    this.nucleons.forEach( nucleon => { nucleon.dispose();} );
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
    if ( !this.nucleusStableProperty.get() && this.showStableOrUnstableProperty.get() ) {
      this.nucleusJumpCountdown -= dt;
      if ( this.nucleusJumpCountdown <= 0 ) {
        this.nucleusJumpCountdown = NUCLEUS_JUMP_PERIOD;
        if ( this.particleAtom.nucleusOffsetProperty ) {
          this.nucleusJumpCount++;
          const angle = JUMP_ANGLES[ this.nucleusJumpCount % JUMP_ANGLES.length ];
          const distance = JUMP_DISTANCES[ this.nucleusJumpCount % JUMP_DISTANCES.length ];
          this.particleAtom.nucleusOffsetProperty.set(
            new Vector2( Math.cos( angle ) * distance, Math.sin( angle ) * distance )
          );
        }
      }
    }
    else if ( this.particleAtom.nucleusOffsetProperty.get() !== Vector2.ZERO ) {

      // animation is not running, make sure nucleus is in center of atom
      this.particleAtom.nucleusOffsetProperty.set( Vector2.ZERO );
    }
  }

  private _moveParticlesFromAtomToBucket( particleCollection: ObservableArray<Particle>, bucket: SphereBucket<Particle> ): void {
    const particlesToRemove = [];
    // Copy the observable particle collection into a regular array.
    for ( let i = 0; i < particleCollection.length; i++ ) {
      particlesToRemove[ i ] = particleCollection.get( i );
    }
    particlesToRemove.forEach( particle => {
        this.particleAtom.removeParticle( particle );
        bucket.addParticleFirstOpen( particle, true );
      }
    );
  }

  public reset(): void {
    this.showElementNameProperty.reset();
    this.showNeutralOrIonProperty.reset();
    this.showStableOrUnstableProperty.reset();
    this.electronShellDepictionProperty.reset();

    // Move any particles that are in transit back to its bucket.
    this.nucleons.forEach( nucleon => {
      if ( !nucleon.positionProperty.get().equals( nucleon.destinationProperty.get() ) ) {
        nucleon.moveImmediatelyToDestination();
      }
    } );
    this.electrons.forEach( electron => {
      if ( !electron.positionProperty.get().equals( electron.destinationProperty.get() ) ) {
        electron.moveImmediatelyToDestination();
      }
    } );

    // Remove all particles from the particle atom.
    this.particleAtom.clear();

    // Remove all particles from the buckets.
    this.buckets.protonBucket.reset();
    this.buckets.neutronBucket.reset();
    this.buckets.electronBucket.reset();

    // Add all the particles back to their buckets so that they are
    // stacked in their original configurations.
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

    // Define a function for transferring particles from buckets to atom.
    const atomCenter = this.particleAtom.positionProperty.get();
    const moveParticlesToAtom = (
      currentCountInAtom: number,
      targetCountInAtom: number,
      particlesInAtom: ObservableArray<Particle>,
      bucket: SphereBucket<Particle>
    ) => {
      while ( currentCountInAtom < targetCountInAtom ) {
        const particle = bucket.extractClosestParticle( atomCenter )!;
        particle.setPositionAndDestination( atomCenter );
        particle.userControlledProperty.set( false ); // Necessary to make it look like user released particle.
        currentCountInAtom++;
      }
      while ( currentCountInAtom > targetCountInAtom ) {
        this._moveParticlesFromAtomToBucket( particlesInAtom, bucket );
        currentCountInAtom--;
      }
    };

    // Move the particles.
    moveParticlesToAtom( this.particleAtom.protons.length,
      numberAtom.protonCountProperty.get(),
      this.particleAtom.protons,
      this.buckets.protonBucket
    );
    moveParticlesToAtom(
      this.particleAtom.neutrons.length,
      numberAtom.neutronCountProperty.get(),
      this.particleAtom.neutrons,
      this.buckets.neutronBucket
    );
    moveParticlesToAtom(
      this.particleAtom.electrons.length,
      numberAtom.electronCountProperty.get(),
      this.particleAtom.electrons,
      this.buckets.electronBucket
    );

    // Finalize particle positions.
    this.particleAtom.moveAllParticlesToDestination();
  }
}

buildAnAtom.register( 'BuildAnAtomModel', BuildAnAtomModel );

export default BuildAnAtomModel;