// Copyright 2014-2026, University of Colorado Boulder

/**
 * InteractiveSchematicAtom is a scenery Node that depicts an interactive atom where the user can add subatomic
 * particles from a set of buckets.
 *
 * @author John Blanco (PhET Interactive Simulations)
 * @author Jesse Greenberg (PhET Interactive Simulations)
 * @author Agustín Vallejo (PhET Interactive Simulations)
 */

import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import Multilink from '../../../../axon/js/Multilink.js';
import Property from '../../../../axon/js/Property.js';
import { TReadOnlyProperty } from '../../../../axon/js/TReadOnlyProperty.js';
import { FluentPatternDerivedProperty } from '../../../../chipper/js/browser/FluentPattern.js';
import type LocalizedStringProperty from '../../../../chipper/js/browser/LocalizedStringProperty.js';
import Bounds2 from '../../../../dot/js/Bounds2.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import Shape from '../../../../kite/js/Shape.js';
import affirm from '../../../../perennial-alias/js/browser-and-node/affirm.js';
import optionize from '../../../../phet-core/js/optionize.js';
import WithRequired from '../../../../phet-core/js/types/WithRequired.js';
import { ParticleContainer } from '../../../../phetcommon/js/model/ParticleContainer.js';
import SphereBucket from '../../../../phetcommon/js/model/SphereBucket.js';
import ModelViewTransform2 from '../../../../phetcommon/js/view/ModelViewTransform2.js';
import BucketFront from '../../../../scenery-phet/js/bucket/BucketFront.js';
import BucketHole from '../../../../scenery-phet/js/bucket/BucketHole.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import SoundDragListener from '../../../../scenery-phet/js/SoundDragListener.js';
import { PDOMValueType } from '../../../../scenery/js/accessibility/pdom/ParallelDOM.js';
import KeyboardListener from '../../../../scenery/js/listeners/KeyboardListener.js';
import { PressListenerEvent } from '../../../../scenery/js/listeners/PressListener.js';
import Node, { NodeOptions } from '../../../../scenery/js/nodes/Node.js';
import Text from '../../../../scenery/js/nodes/Text.js';
import Particle from '../../../../shred/js/model/Particle.js';
import ShredConstants from '../../../../shred/js/ShredConstants.js';
import ShredFluent from '../../../../shred/js/ShredFluent.js';
import AtomNode, { AtomNodeOptions } from '../../../../shred/js/view/AtomNode.js';
import ElectronShellDepiction from '../../../../shred/js/view/ElectronShellDepiction.js';
import sharedSoundPlayers from '../../../../tambo/js/sharedSoundPlayers.js';
import buildAnAtom from '../../buildAnAtom.js';
import BuildAnAtomFluent from '../../BuildAnAtomFluent.js';
import BAAModel from '../model/BAAModel.js';
import BAAParticle, { BAAParticleType } from '../model/BAAParticle.js';
import BAAParticleKeyboardListener from './BAAParticleKeyboardListener.js';
import BAAParticleView from './BAAParticleView.js';
import BucketGrabReleaseCueNode from './BucketGrabReleaseCueNode.js';

type SelfOptions = {

  // drag bounds for particles in view coordinates
  particleDragBounds?: Bounds2;

  // options for the AtomNode that is used to depict the atom
  atomNodeOptions?: AtomNodeOptions;

  // accessible paragraph for the buckets
  bucketsAccessibleParagraph?: PDOMValueType;
};
type InteractiveSchematicAtomOptions = SelfOptions & WithRequired<NodeOptions, 'tandem'>;

// Possible locations for particles within the atom view, used for accessibility.
export type ParticleLocations = 'nucleus' | 'innerShell' | 'outerShell' | 'cloud' | 'bucket';

// constants
const PARTICLE_TO_PLURAL = new Map<BAAParticleType, TReadOnlyProperty<string>>( [
  [ 'proton', ShredFluent.a11y.particles.protonsStringProperty ],
  [ 'neutron', ShredFluent.a11y.particles.neutronsStringProperty ],
  [ 'electron', ShredFluent.a11y.particles.electronsStringProperty ]
] );

// Define the position where a particle will be initially placed when pulled from a bucket using alt-input.
const BELOW_NUCLEUS_OFFSET = ShredConstants.BELOW_NUCLEUS_OFFSET;

class InteractiveSchematicAtom extends Node {

  // A map that associates buckets in the model with the bucket front views for quick lookup.
  private readonly mapBucketsToViews: Map<ParticleContainer<BAAParticle>, BucketFront> =
    new Map<ParticleContainer<BAAParticle>, BucketFront>();

  // A map that associates particles with their views for quick lookup.
  private readonly mapParticlesToViews: Map<Particle, BAAParticleView> = new Map<Particle, BAAParticleView>();

  // A flag to track whether the user has extracted a particle from a bucket yet.
  private readonly hasBucketInteractionOccurredProperty = new Property<boolean>( false );

  // reference to the model, which contains the buckets, particles, and atom
  private model: BAAModel;

  public constructor(
    model: BAAModel,
    modelViewTransform: ModelViewTransform2,
    providedOptions: InteractiveSchematicAtomOptions
  ) {

    const options = optionize<InteractiveSchematicAtomOptions, SelfOptions, NodeOptions>()( {
      particleDragBounds: Bounds2.EVERYTHING,
      phetioVisiblePropertyInstrumented: false,

      bucketsAccessibleParagraph: BuildAnAtomFluent.a11y.common.buckets.accessibleHelpTextStringProperty,

      atomNodeOptions: {
        enabledProperty: providedOptions.enabledProperty,
        accessibleHeading: BuildAnAtomFluent.a11y.common.atomAccessibleListNode.accessibleHeadingStringProperty,
        phetioVisiblePropertyInstrumented: false,
        particlesAccessibleParagraph: BuildAnAtomFluent.a11y.common.atomAccessibleListNode.accessibleParagraphStringProperty,
        tandem: providedOptions.tandem.createTandem( 'atomNode' )
      },
      isDisposable: false
    }, providedOptions );

    super( options );

    this.model = model;

    // Add the node that depicts the constructed atom, which includes the electron shell or cloud, the textual labels,
    // and the center X marker.
    const atomNode = new AtomNode( model.atom, this.mapParticlesToViews, modelViewTransform, options.atomNodeOptions );

    // variable needed for bucket creation
    const bucketFrontLayer = new Node( {
      accessibleHeading: BuildAnAtomFluent.a11y.common.buckets.accessibleHeadingStringProperty,
      children: [
        new Node( {
          accessibleParagraph: options.bucketsAccessibleParagraph,
          visibleProperty: this.enabledProperty
        } )
      ]
    } );
    const bucketHoleLayer = new Node();

    // Define a function that adds the nodes for a bucket.
    const addBucketNodes = (
      bucket: SphereBucket<BAAParticle>,
      particleTypeStringProperty: TReadOnlyProperty<string>,
      bucketEmptyProperty: TReadOnlyProperty<boolean>
    ): void => {

      const bucketFront = new BucketFront( bucket, modelViewTransform, {
        labelNode: new Text( bucket.captionText, {
          font: new PhetFont( 20 ),
          fill: bucket.captionColor,
          pickable: false
        } ),

        // Adjust the gradient luminance a bit to improve contrast with the labels, see
        // https://github.com/phetsims/build-an-atom/issues/248.
        gradientLuminanceLeft: 0.2,
        gradientLuminanceRight: -0.6,

        // pdom
        tagName: 'button',
        accessibleName: particleTypeStringProperty
      } );

      // When bucket is empty, or when the game has made them non-interactive, set aria-disabled.
      Multilink.lazyMultilink( [
        bucketEmptyProperty,
        this.enabledProperty
      ], ( empty: boolean, enabled: boolean ) => {
        bucketFront.setPDOMAttribute( 'aria-disabled', empty || !enabled );
        bucketFront.accessibleHelpText = empty ? BuildAnAtomFluent.a11y.common.buckets.emptyHelpTextStringProperty : null;
      } );

      // Create a focus highlight for the bucket that is extended on top so that it can include the particles.  The
      // size and position were determined empirically.
      bucketFront.setFocusHighlight(
        Shape.bounds( bucketFront.localBounds.dilatedXY( 5, 35 ).shifted( new Vector2( 0, -30 ) ) )
      );
      bucketFrontLayer.addChild( bucketFront );

      // Add the drag listener for dragging particles out of the bucket when clicking directly on it.
      bucketFront.addInputListener( SoundDragListener.createForwardingListener(
          ( event: PressListenerEvent ) => {

            // Determine where this pointer event is in model space.
            const pointInParticleLayer = particleLayer.globalToLocalPoint( event.pointer.point );
            const modelPosition = modelViewTransform.viewToModelPosition( pointInParticleLayer );

            // Extract a particle from the bucket to add to the model.
            const particle = bucket.extractClosestParticle( modelPosition );

            if ( particle !== null ) {
              particle.isDraggingProperty.value = true;
              particle.setPositionAndDestination( modelPosition );

              // Forward the event to the particle.
              const particleView = this.mapParticlesToViews.get( particle );
              affirm( particleView, 'ParticleView not found for extracted particle' );
              particleView.startSyntheticDrag( event );
            }
          },
          { allowTouchSnag: true }
        )
      );

      // Add a listener for alt-input that will be fired when the user presses enter or space while the bucket has
      // focus.  This will extract a particle from the bucket and add it to the atom.
      bucketFront.addInputListener( new KeyboardListener( {
        fireOnClick: true,
        fire: () => {
          const particle = bucket.extractClosestParticle( model.atom.positionProperty.value );
          if ( particle !== null ) {

            // Get the view node that is associated with this particle.
            const particleView = this.mapParticlesToViews.get( particle );
            affirm( particleView, 'ParticleView not found for extracted particle' );

            // Set the focus to the particle's view so that it can be manipulated via keyboard.
            particleView.accessibleVisible = true;
            particleView.focusable = true;
            particleView.focus();

            // Make sure that nothing else in the atom is focusable so that if the user tabs away, focus doesn't go to
            // another particle in the atom.
            atomNode.makeAllOtherParticleViewsNotFocusable( particleView );

            // Mark the particle as being controlled by the user via keyboard interaction.
            particle.isDraggingProperty.value = true;

            // Play the grab sound.
            sharedSoundPlayers.get( 'grab' ).play();

            // Position the particle just below the center of the atom's nucleus.
            particle.setPositionAndDestination( model.atom.positionProperty.value.plus( BELOW_NUCLEUS_OFFSET ) );

            // Handle focus for the case where an electron is released back into the cloud.
            if ( electronModelProperty.value === 'cloud' ) {
              particleView.addAccessibleObjectResponse( ShredFluent.a11y.particles.overAtomStringProperty );
            }
            else {
              particleView.addAccessibleObjectResponse( ShredFluent.a11y.particles.overNucleusStringProperty );
            }

            // Indicate that the user has interacted with the buckets.
            this.hasBucketInteractionOccurredProperty.value = true;
          }
        }
      } ) );

      // Keep track of the bucket front views so that we can set focus on them later when needed.
      this.mapBucketsToViews.set( bucket, bucketFront );

      // Add the bucket hole to the appropriate layer.
      bucketHoleLayer.addChild( new BucketHole( bucket, modelViewTransform ) );
    };

    // Add the nodes for the buckets.
    addBucketNodes(
      model.protonBucket,
      PARTICLE_TO_PLURAL.get( 'proton' )!,
      DerivedProperty.valueEqualsConstant( model.protonBucketParticleCountProperty, 0 )
    );
    addBucketNodes(
      model.neutronBucket,
      PARTICLE_TO_PLURAL.get( 'neutron' )!,
      DerivedProperty.valueEqualsConstant( model.neutronBucketParticleCountProperty, 0 )
    );
    addBucketNodes(
      model.electronBucket,
      PARTICLE_TO_PLURAL.get( 'electron' )!,
      DerivedProperty.valueEqualsConstant( model.electronBucketParticleCountProperty, 0 )
    );

    // Add the alt-input grab/release cue node for the buckets.
    const cueLayer = new Node();
    cueLayer.addChild( new BucketGrabReleaseCueNode(
      this.mapBucketsToViews.get( model.protonBucket )!,
      this.mapBucketsToViews.get( model.neutronBucket )!,
      this.mapBucketsToViews.get( model.electronBucket )!,
      this.hasBucketInteractionOccurredProperty,
      this.enabledProperty
    ) );

    // Add listeners that will announce when a bucket becomes empty.
    model.protonBucketParticleCountProperty.lazyLink( ( protons: number ) => {
      if ( protons === 0 && !model.resetting ) {
        this.mapBucketsToViews.get( model.protonBucket )!.addAccessibleContextResponse(
          BuildAnAtomFluent.a11y.common.buckets.bucketEmptyStringProperty );
      }
    } );
    model.neutronBucketParticleCountProperty.lazyLink( ( neutrons: number ) => {
      if ( neutrons === 0 && !model.resetting ) {
        this.mapBucketsToViews.get( model.neutronBucket )!.addAccessibleContextResponse(
          BuildAnAtomFluent.a11y.common.buckets.bucketEmptyStringProperty );
      }
    } );
    model.electronBucketParticleCountProperty.lazyLink( ( electrons: number ) => {
      if ( electrons === 0 && !model.resetting ) {
        this.mapBucketsToViews.get( model.electronBucket )!.addAccessibleContextResponse(
          BuildAnAtomFluent.a11y.common.buckets.bucketEmptyStringProperty );
      }
    } );

    // Create the layer where the subatomic particles will go when they are not a part of the atom.
    const particleLayer = new Node();

    // Define group tandems for the particles.
    const protonsGroupTandem = options.tandem.createTandem( 'protonNodes' ).createGroupTandem( 'protonNode', 1 );
    const neutronsGroupTandem = options.tandem.createTandem( 'neutronNodes' ).createGroupTandem( 'neutronNode', 1 );
    const electronsGroupTandem = options.tandem.createTandem( 'electronNodes' ).createGroupTandem( 'electronNode', 1 );

    // Define a type-safe reference to buckets.
    const bucketsAsParticleContainers: ParticleContainer<BAAParticle>[] = model.buckets;

    const electronModelProperty = options.atomNodeOptions.atomViewProperties ?
                                  options.atomNodeOptions.atomViewProperties.electronModelProperty :
                                  new Property<ElectronShellDepiction>( 'shells' );

    // Add the particle views.
    [ ...model.nucleons, ...model.electrons ].forEach( particle => {

      const particleView = new BAAParticleView( particle, modelViewTransform, {
        dragBounds: options.particleDragBounds,
        accessibleVisible: false,
        enabledProperty: this.enabledProperty,
        tandem: particle.type === 'proton' ?
                protonsGroupTandem.createNextTandem() :
                particle.type === 'neutron' ?
                neutronsGroupTandem.createNextTandem() :
                electronsGroupTandem.createNextTandem()
      } );

      this.mapParticlesToViews.set( particle, particleView );

      // Add the particle to the appropriate parent.  Since it is possible for the model atom to have particles in it
      // at startup, we need to check the container property to determine where to add it.
      affirm( particle.containerProperty.value, 'Particle must be in a container at startup.' );
      if ( particle.containerProperty.value === model.atom ) {
        atomNode.addParticleView( particleView, false );
      }
      else {
        particleLayer.addChild( particleView );
      }

      // Add a listener that makes sure that this particle view is visible in the PDOM and focusable when the particle
      // is being dragged.  This is for consistency between pointer and alt-input interactions.
      particle.isDraggingProperty.lazyLink( isDragging => {
        if ( isDragging ) {
          particleView.accessibleVisible = true;
          particleView.focusable = true;

          // Now that it's accessibleVisible we can announce the grab.
          particleView.addAccessibleObjectResponse(
            ShredFluent.a11y.grabbedStringProperty
          );
        }
        else {
          // Emitting the response from the atom since sometimes released particles are invisible before the response
          this.addAccessibleObjectResponse(
            ShredFluent.a11y.releasedStringProperty
          );
        }
      } );

      // The particle view will transition back and forth from being a child of the particle layer or a child of the
      // atom node based on where the particle model is and what it's doing. The following listener moves it back and
      // forth as needed.  It's necessary to change parent nodes like this to support alt-input group behavior in the
      // atom node.
      Multilink.lazyMultilink(
        [ particle.containerProperty, particle.isDraggingProperty ],
        ( container, isDragging ) => {

          const isParticleViewOnParticleLayer = particleView.parent === particleLayer;

          if ( isParticleViewOnParticleLayer && ( container === model.atom || isDragging ) ) {

            // Move the particle view to the atom node, preserving focus if needed.
            const hasFocus = particleView.focused;
            particleLayer.removeChild( particleView );
            atomNode.addParticleView( particleView, hasFocus );
          }
          else if ( !isParticleViewOnParticleLayer &&
                    ( ( container !== null && bucketsAsParticleContainers.includes( container ) ) ||
                      ( container === null && !isDragging ) ) ) {

            // Move the particle view to the local particle layer (outside the atom).
            atomNode.removeParticleView( particleView );
            particleLayer.addChild( particleView );
          }
        }
      );

      // Add the keyboard listener that will allow this particle to be controlled via keyboard when it has alt-input
      // focus.
      particleView.addInputListener( new BAAParticleKeyboardListener(
        particle,
        this.getHomeBucket( particle ),
        model.atom,
        electronModelProperty,
        particleView,
        this.getHomeBucketFront( particle ),
        atomNode.electronCloud,
        atomNode.shiftParticleFocus.bind( atomNode ),
        options.tandem.createTandem( 'particleViewKeyboardListener' )
      ) );

      // Watch for when particles enter or leave the atom and update the focusability of the particle views owned by the
      // for the atom as needed. The goal is to have one focusable particle in the atom when there are particles there
      // and none (of course) when the atom is empty.
      particle.containerProperty.lazyLink( newContainer => {
        let contextResponse: LocalizedStringProperty | FluentPatternDerivedProperty | string;

        if ( newContainer && bucketsAsParticleContainers.includes( newContainer ) ) {

          // The particle was just placed into a bucket. Make sure that it is not focusable or visible in the PDOM.
          particleView.focusable = false;
          particleView.accessibleVisible = false;

          // Update what is focusable in the atom now that a particle fully has left it.
          atomNode.updateParticleViewAltInputState();

          if ( !model.resetting ) {
            contextResponse = BuildAnAtomFluent.a11y.common.particles.particleReturnedToBucket.format( {
              particle: ShredFluent.a11y.particles.type.format( { type: particle.type } )
            } );
            this.addAccessibleContextResponse( contextResponse );
          }
        }
        else if ( newContainer === model.atom ) {

          let location: ParticleLocations = 'bucket';

          if ( particle.type === 'proton' || particle.type === 'neutron' ) {
            location = 'nucleus';
          }
          else if ( particle.type === 'electron' ) {
            if ( electronModelProperty.value === 'cloud' ) {
              location = 'cloud';
            }
            else if ( model.atom.electronCountProperty.value <= 2 ) {
              location = 'innerShell';
            }
            else {
              location = 'outerShell';
            }
          }

          particleView.locationNameProperty.value = location;

          if ( !model.resetting ) {
            contextResponse = BuildAnAtomFluent.a11y.common.particles.particleAddedTo.format( {
              particle: ShredFluent.a11y.particles.type.format( { type: particle.type } ),
              particles: PARTICLE_TO_PLURAL.get( particle.type )!,
              count: model.getParticleCountByType( particle.type ),
              location: ShredFluent.a11y.particles.location.format( {
                location: location
              } )
            } );

            this.addAccessibleContextResponse( contextResponse );
          }
        }
      } );
    } );

    // The following code manages the visibility of the individual electron particles.  When the electrons are
    // represented as a cloud, the individual particles become invisible when added to the atom, but remain visible when
    // outside the atom.
    Multilink.multilink(
      [ electronModelProperty, model.atom.electrons.lengthProperty ],
      electronModel => {
        model.electrons.forEach( electron => {
          const electronView = this.mapParticlesToViews.get( electron );
          affirm( electronView, 'Missing ParticleView for electron' );
          const isElectronInAtom = model.atom.electrons.includes( electron );
          electronView.visible = electronModel === 'shells' ||
                                 electron.isDraggingProperty.value ||
                                 !isElectronInAtom;
        } );
      }
    );

    // When a particle is moving inwards to the nucleus, make sure all inner shell electrons are labeled appropriately
    Multilink.multilink(
      [ electronModelProperty, model.atom.isMovingElectronInwardsProperty ],
      ( electronModel, isMovingInwards ) => {

        if ( isMovingInwards || electronModel === 'shells' ) {
          const innerShellElectrons = model.atom.electrons.filter( e => atomNode.getElectronShellNumber( e ) === 0 );
          innerShellElectrons.forEach( electron => {
            const electronView = this.mapParticlesToViews.get( electron );
            affirm( electronView, 'Missing ParticleView for electron' );
            electronView.locationNameProperty.value = 'innerShell';
          } );

          const outerShellElectrons = model.atom.electrons.filter( e => atomNode.getElectronShellNumber( e ) === 1 );
          outerShellElectrons.forEach( electron => {
            const electronView = this.mapParticlesToViews.get( electron );
            affirm( electronView, 'Missing ParticleView for electron' );
            electronView.locationNameProperty.value = 'outerShell';
          } );
        }
        else if ( electronModel === 'cloud' ) {
          model.atom.electrons.forEach( electron => {
            const electronView = this.mapParticlesToViews.get( electron );
            affirm( electronView, 'Missing ParticleView for electron' );
            electronView.locationNameProperty.value = 'cloud';
          } );
        }
      } );

    // Add the layers in the sequence needed for desired z-order and tab navigation order.
    this.addChild( bucketHoleLayer );
    this.addChild( particleLayer );
    this.addChild( bucketFrontLayer );
    this.addChild( atomNode );
    this.addChild( cueLayer );
  }

  /**
   * Get the bucket that is "home" for the provided particle.
   */
  private getHomeBucket( particle: Particle ): SphereBucket<BAAParticle> {
    const particleType = particle.type;
    affirm(
      particleType === 'proton' || particleType === 'neutron' || particleType === 'electron',
      `Unexpected particle type: ${particleType}`
    );
    return particleType === 'proton' ?
           this.model.protonBucket :
           particleType === 'neutron' ?
           this.model.neutronBucket :
           this.model.electronBucket;
  }

  /**
   * Get the bucket front for the bucket that is "home" for the provided particle.  This is useful in cases where focus
   * needs to move to the bucket from which the particle came.
   */
  private getHomeBucketFront( particle: Particle ): BucketFront {
    const homeBucket = this.getHomeBucket( particle );
    const bucketView = this.mapBucketsToViews.get( homeBucket );
    affirm( bucketView, 'Missing BucketFront view for bucket' );
    return bucketView;
  }

  public reset(): void {
    this.hasBucketInteractionOccurredProperty.reset();
  }
}

buildAnAtom.register( 'InteractiveSchematicAtom', InteractiveSchematicAtom );
export default InteractiveSchematicAtom;