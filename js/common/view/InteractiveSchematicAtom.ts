// Copyright 2014-2025, University of Colorado Boulder

/**
 * Node that depicts an interactive atom where the user can add subatomic particles from a set of buckets.
 *
 * @author Jesse Greenberg (PhET Interactive Simulations)
 * @author John Blanco (PhET Interactive Simulations)
 * @author Agustín Vallejo (PhET Interactive Simulations)
 */

import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import DerivedStringProperty from '../../../../axon/js/DerivedStringProperty.js';
import Property from '../../../../axon/js/Property.js';
import { TReadOnlyProperty } from '../../../../axon/js/TReadOnlyProperty.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import Shape from '../../../../kite/js/Shape.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import WithRequired from '../../../../phet-core/js/types/WithRequired.js';
import { ParticleContainer } from '../../../../phetcommon/js/model/ParticleContainer.js';
import SphereBucket from '../../../../phetcommon/js/model/SphereBucket.js';
import ModelViewTransform2 from '../../../../phetcommon/js/view/ModelViewTransform2.js';
import BucketFront from '../../../../scenery-phet/js/bucket/BucketFront.js';
import BucketHole from '../../../../scenery-phet/js/bucket/BucketHole.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import Node, { NodeOptions } from '../../../../scenery/js/nodes/Node.js';
import Text from '../../../../scenery/js/nodes/Text.js';
import Particle from '../../../../shred/js/model/Particle.js';
import ShredStrings from '../../../../shred/js/ShredStrings.js';
import AtomNode from '../../../../shred/js/view/AtomNode.js';
import BucketDragListener from '../../../../shred/js/view/BucketDragListener.js';
import ParticleView from '../../../../shred/js/view/ParticleView.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import buildAnAtom from '../../buildAnAtom.js';
import BuildAnAtomStrings from '../../BuildAnAtomStrings.js';
import BAAConstants from '../BAAConstants.js';
import BAAModel, { BAAParticleType } from '../model/BAAModel.js';
import BAAParticle from '../model/BAAParticle.js';
import BAAParticleView from './BAAParticleView.js';

type SelfOptions = EmptySelfOptions;
type InteractiveSchematicAtomOptions = SelfOptions & WithRequired<NodeOptions, 'tandem'>;

// constants
const PARTICLE_TO_PLURAL = new Map<BAAParticleType, TReadOnlyProperty<string>>( [
  [ 'proton', ShredStrings.a11y.particles.protonsStringProperty ],
  [ 'neutron', ShredStrings.a11y.particles.neutronsStringProperty ],
  [ 'electron', ShredStrings.a11y.particles.electronsStringProperty ]
] );

// Define the position where a particle will be initially placed when pulled from a bucket using alt-input.
// const BELOW_NUCLEUS_OFFSET = new Vector2( 0, -40 );

class InteractiveSchematicAtom extends Node {

  // A map that associates buckets in the model with the bucket front views for quick lookup.
  private readonly mapBucketsToViews: Map<ParticleContainer<BAAParticle>, BucketFront> =
    new Map<ParticleContainer<BAAParticle>, BucketFront>();

  // A map that associates particles with their views for quick lookup.
  private readonly mapParticlesToViews: Map<Particle, ParticleView> = new Map<Particle, ParticleView>();

  // flag to track whether the user has extracted a particle from a bucket yet
  private readonly hasBucketInteractionOccurredProperty = new Property<boolean>( false );

  public constructor( model: BAAModel,
                      modelViewTransform: ModelViewTransform2,
                      providedOptions: InteractiveSchematicAtomOptions ) {

    const options = optionize<InteractiveSchematicAtomOptions, SelfOptions, NodeOptions>()( {
      phetioVisiblePropertyInstrumented: false
    }, providedOptions );

    super( options );

    // Add the node that depicts the textual labels, the electron shells, and the center X marker.
    const atomNode = new AtomNode( model.atom, modelViewTransform, {
      showElementNameProperty: BAAConstants.ALWAYS_FALSE_PROPERTY,
      showNeutralOrIonProperty: BAAConstants.ALWAYS_FALSE_PROPERTY,
      showStableOrUnstableProperty: BAAConstants.ALWAYS_FALSE_PROPERTY,
      electronShellDepictionProperty: new Property( 'shells' ),
      tandem: Tandem.OPT_OUT
    } );
    this.addChild( atomNode );

    this.addChild( new Node( {
      accessibleParagraph: BuildAnAtomStrings.a11y.gameScreen.challenges.symbolToSchematic.accessibleHelpTextStringProperty
    } ) );

    // Add the bucket holes.  Done separately from the bucket front for layering.
    _.each( model.buckets, bucket => this.addChild( new BucketHole( bucket, modelViewTransform ) ) );

    // Add the layers where the nucleons will be maintained.
    const nucleonLayers: Node[] = [];
    _.times( BAAModel.NUMBER_OF_NUCLEON_LAYERS, () => {
      const nucleonLayer = new Node();
      nucleonLayers.push( nucleonLayer );
      this.addChild( nucleonLayer );
    } );

    nucleonLayers.reverse(); // Set up the nucleon layers so that layer 0 is in front.

    // Add the layer where the electrons will be maintained.
    const electronLayer = new Node();
    this.addChild( electronLayer );

    // Add the nucleon particle views.
    const protonGroupTandem = options.tandem && options.tandem.createTandem( 'protons' ).createGroupTandem( 'proton', 0 );
    const neutronGroupTandem = options.tandem && options.tandem.createTandem( 'neutrons' ).createGroupTandem( 'neutron', 0 );
    const electronGroupTandem = options.tandem && options.tandem.createTandem( 'electrons' ).createGroupTandem( 'electron', 0 );
    model.nucleons.forEach( nucleon => {

      const tandemGroup = nucleon.typeProperty.value === 'proton' ? protonGroupTandem : neutronGroupTandem;

      const particleView = new BAAParticleView( nucleon, modelViewTransform, {
        focusable: false,
        tandem: tandemGroup.createNextTandem()
      } );
      nucleonLayers[ nucleon.zLayerProperty.value ].addChild( particleView );

      // Add a listener that adjusts a nucleon's z-order layering.
      nucleon.zLayerProperty.link( ( zLayer: number ) => {
        assert && assert( nucleonLayers.length > zLayer,
          'zLayer for nucleon exceeds number of layers, max number may need increasing.' );

        const desiredLayer = nucleonLayers[ zLayer ];

        // Determine whether nucleon view is on the correct layer.
        const onCorrectLayer = desiredLayer.children.includes( particleView );

        if ( !onCorrectLayer ) {

          // Remove particle view from its current layer.
          let particleViewFoundAndRemoved = false;
          for ( const layer of nucleonLayers ) {
            if ( layer.children.includes( particleView ) ) {
              layer.removeChild( particleView );
              particleViewFoundAndRemoved = true;
              break;
            }
          }

          // Add the particle view to its new layer.
          assert && assert( particleViewFoundAndRemoved, 'Particle view not found during relayering' );
          desiredLayer.addChild( particleView );
        }
      } );
    } );

    // Add the electron particle views.
    model.electrons.forEach( electron => {
      const particleView = new BAAParticleView( electron, modelViewTransform, {
        focusable: false,
        tandem: electronGroupTandem.createNextTandem()
      } );
      electronLayer.addChild( particleView );
    } );

    const bucketsTandem = options.tandem.createTandem( 'buckets' );
    const bucketFrontLayer = new Node();
    this.addChild( bucketFrontLayer );

    const addBucketFront = (
      bucket: SphereBucket<BAAParticle>,
      particleTypeStringProperty: TReadOnlyProperty<string>,
      bucketEmptyProperty: TReadOnlyProperty<boolean>
    ): void => {

      const bucketAccessibleHelpTextProperty = new DerivedStringProperty(
        [
          bucketEmptyProperty,
          ShredStrings.a11y.buckets.emptyHelpTextStringProperty
        ],
        ( bucketEmpty: boolean, emptyHelpText: string ) => {
          return bucketEmpty ? emptyHelpText : '';
        }
      );

      const bucketFront = new BucketFront( bucket, modelViewTransform, {
        labelNode: new Text( bucket.captionText, {
          font: new PhetFont( 20 ),
          fill: bucket.captionColor
        } ),

        // Adjust the gradient luminance a bit to improve contrast with the labels, see
        // https://github.com/phetsims/build-an-atom/issues/248.
        gradientLuminanceLeft: 0.2,
        gradientLuminanceRight: -0.6,

        // pdom
        tagName: 'button',
        accessibleName: particleTypeStringProperty,
        accessibleHelpText: bucketAccessibleHelpTextProperty
      } );

      bucketEmptyProperty.link( ( empty: boolean ) => {
        bucketFront.setPDOMAttribute( 'aria-disabled', empty );
      } );

      // Create a focus highlight for the bucket that is extended on top so that it can include the particles.  The
      // size and position were determined empirically.
      bucketFront.setFocusHighlight(
        Shape.bounds( bucketFront.localBounds.dilatedXY( 5, 35 ).shifted( new Vector2( 0, -30 ) ) )
      );
      bucketFrontLayer.addChild( bucketFront );

      // Add the drag listener for dragging particles out of the bucket when clicking directly on it.
      bucketFront.addInputListener( new BucketDragListener( bucket, bucketFront, modelViewTransform, {
        tandem: bucketsTandem.createTandem( `${bucket.tandem.name}DragListener` ),
        applyOffset: false,

        // Offset the particle position a little if this is a touch pointer so that the finger doesn't cover it.
        offsetPosition: ( viewPoint, dragListener ) => {
          return dragListener.pointer?.isTouchLike() ?
                 BAAConstants.PARTICLE_TOUCH_DRAG_OFFSET :
                 Vector2.ZERO;
        }
      } ) );

      // Add a listener for alt-input that will be fired when the user presses enter or space while the bucket has
      // focus.  This will extract a particle from the bucket and add it to the atom.
      bucketFront.addInputListener( {
        click: () => {
          if ( !bucketEmptyProperty.value ) {
            bucketFront.addAccessibleObjectResponse(
              ShredStrings.a11y.grabbedStringProperty, { alertBehavior: 'queue' }
            );
          }

          console.warn( 'InteractiveSchematicAtom: alt-input extraction from buckets is disabled.' );
          // TODO: Bring back this code when the maps are being populated.  See https://github.com/phetsims/build-an-atom/issues/394.
          // const particle = bucket.extractClosestParticle( model.atom.positionProperty.value );
          // if ( particle !== null ) {
          //
          //   // Get the view node that is associated with this particle.
          //   const particleView = this.mapParticlesToViews.get( particle );
          //   affirm( particleView, 'ParticleView not found for extracted particle' );
          //
          //   // Set the focus to the particle's view so that it can be manipulated via keyboard.
          //   particleView.pdomVisible = true;
          //   particleView.focusable = true;
          //   particleView.focus();
          //
          //   // Make sure that nothing else in the atom is focusable so that if the user tabs away, focus doesn't go to
          //   // another particle in the atom.
          //   atomNode.makeAllOtherParticleViewsNotFocusable( particleView );
          //
          //   // Mark the particle as being controlled by the user via keyboard interaction.
          //   particle.isDraggingProperty.value = true;
          //
          //   // Position the particle just below the center of the atom's nucleus.
          //   particle.setPositionAndDestination( model.atom.positionProperty.value.plus( BELOW_NUCLEUS_OFFSET ) );
          //   particleView.addAccessibleObjectResponse(
          //     ShredStrings.a11y.particles.overNucleusStringProperty, { alertBehavior: 'queue' }
          //   );
          //
          //   // Play the grab sound.
          //   sharedSoundPlayers.get( 'grab' ).play();
          //
          //   // Indicate that the user has interacted with the buckets.
          //   this.hasBucketInteractionOccurredProperty.value = true;
          // }
        }
      } );

      // Keep track of the bucket front views so that we can set focus on them later when needed.
      this.mapBucketsToViews.set( bucket, bucketFront );
    };

    // Add the front portion of the buckets. This is done separately from the bucket holes for layering purposes.
    addBucketFront(
      model.protonBucket,
      PARTICLE_TO_PLURAL.get( 'proton' )!,
      DerivedProperty.valueEqualsConstant( model.protonBucketParticleCountProperty, 0 )
    );
    addBucketFront(
      model.neutronBucket,
      PARTICLE_TO_PLURAL.get( 'neutron' )!,
      DerivedProperty.valueEqualsConstant( model.neutronBucketParticleCountProperty, 0 )
    );
    addBucketFront(
      model.electronBucket,
      PARTICLE_TO_PLURAL.get( 'electron' )!,
      DerivedProperty.valueEqualsConstant( model.electronBucketParticleCountProperty, 0 )
    );
  }

  public reset(): void {
    this.hasBucketInteractionOccurredProperty.reset();
  }
}

buildAnAtom.register( 'InteractiveSchematicAtom', InteractiveSchematicAtom );
export default InteractiveSchematicAtom;