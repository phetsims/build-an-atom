// Copyright 2013-2025, University of Colorado Boulder

/**
 * ScreenView that presents an interactive atom on the left side, buckets of particles underneath, and controls for
 * label visibility and reset.  A periodic table is included on the right side.  This is intended to be used as a base
 * class for screens with similar views.
 *
 * @author John Blanco
 * @author Aadish Gupta
 */

import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import DerivedStringProperty from '../../../../axon/js/DerivedStringProperty.js';
import Multilink from '../../../../axon/js/Multilink.js';
import Property from '../../../../axon/js/Property.js';
import { TReadOnlyProperty } from '../../../../axon/js/TReadOnlyProperty.js';
import { FluentPatternDerivedProperty } from '../../../../chipper/js/browser/FluentPattern.js';
import type LocalizedStringProperty from '../../../../chipper/js/browser/LocalizedStringProperty.js';
import Bounds2 from '../../../../dot/js/Bounds2.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import ScreenView, { ScreenViewOptions } from '../../../../joist/js/ScreenView.js';
import Shape from '../../../../kite/js/Shape.js';
import affirm from '../../../../perennial-alias/js/browser-and-node/affirm.js';
import { combineOptions } from '../../../../phet-core/js/optionize.js';
import { ParticleContainer } from '../../../../phetcommon/js/model/ParticleContainer.js';
import SphereBucket from '../../../../phetcommon/js/model/SphereBucket.js';
import StringUtils from '../../../../phetcommon/js/util/StringUtils.js';
import ModelViewTransform2 from '../../../../phetcommon/js/view/ModelViewTransform2.js';
import BucketFront from '../../../../scenery-phet/js/bucket/BucketFront.js';
import BucketHole from '../../../../scenery-phet/js/bucket/BucketHole.js';
import ResetAllButton from '../../../../scenery-phet/js/buttons/ResetAllButton.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import ParallelDOM from '../../../../scenery/js/accessibility/pdom/ParallelDOM.js';
import VBox from '../../../../scenery/js/layout/nodes/VBox.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import Text from '../../../../scenery/js/nodes/Text.js';
import AtomIdentifier from '../../../../shred/js/AtomIdentifier.js';
import Particle from '../../../../shred/js/model/Particle.js';
import ShredConstants from '../../../../shred/js/ShredConstants.js';
import ShredStrings from '../../../../shred/js/ShredStrings.js';
import AtomNode from '../../../../shred/js/view/AtomNode.js';
import BucketDragListener from '../../../../shred/js/view/BucketDragListener.js';
import ParticleCountDisplay from '../../../../shred/js/view/ParticleCountDisplay.js';
import ParticleView from '../../../../shred/js/view/ParticleView.js';
import PeriodicTableNode from '../../../../shred/js/view/PeriodicTableNode.js';
import sharedSoundPlayers from '../../../../tambo/js/sharedSoundPlayers.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import PeriodicTableAndSymbol from '../../atom/view/PeriodicTableAndSymbol.js';
import buildAnAtom from '../../buildAnAtom.js';
import BuildAnAtomFluent from '../../BuildAnAtomFluent.js';
import BuildAnAtomStrings from '../../BuildAnAtomStrings.js';
import BAAConstants from '../BAAConstants.js';
import BAAModel, { BAAParticleType } from '../model/BAAModel.js';
import BAAParticle, { ParticleLocations } from '../model/BAAParticle.js';
import AtomAppearanceCheckboxGroup from './AtomAppearanceCheckboxGroup.js';
import AtomViewProperties from './AtomViewProperties.js';
import BAAParticleKeyboardListener from './BAAParticleKeyboardListener.js';
import BAAParticleView from './BAAParticleView.js';
import BucketGrabReleaseCueNode from './BucketGrabReleaseCueNode.js';
import BuildAnAtomAccordionBox, { BuildAnAtomAccordionBoxOptions } from './BuildAnAtomAccordionBox.js';
import AtomDescriberAccessibleListNode from './description/AtomDescriberAccessibleListNode.js';
import ElectronCloudKeyboardListener from './ElectronCloudKeyboardListener.js';
import ElectronModelControl from './ElectronModelControl.js';

// constants
const CONTROLS_INSET = 10;

const PARTICLE_TO_PLURAL = new Map<BAAParticleType, TReadOnlyProperty<string>>( [
  [ 'proton', ShredStrings.a11y.particles.protonsStringProperty ],
  [ 'neutron', ShredStrings.a11y.particles.neutronsStringProperty ],
  [ 'electron', ShredStrings.a11y.particles.electronsStringProperty ]
] );

class BAAScreenView extends ScreenView {

  protected readonly periodicTableAccordionBox: BuildAnAtomAccordionBox;
  protected readonly accordionBoxes: VBox;

  // The model that this view is based on.
  private readonly model: BAAModel;

  // The node that shows the atom, including the center marker, electron shells, and electron clouds.  The subatomic
  // particles become children of this when then are in the atom or moving towards it.
  private readonly atomNode: AtomNode;

  // Properties that control how the atom is displayed.
  private readonly viewProperties: AtomViewProperties;

  // flag to track whether the user has extracted a particle from a bucket yet
  private readonly hasBucketInteractionOccurredProperty = new Property<boolean>( false );

  // A map that associates particles with their views for quick lookup.
  private readonly mapParticlesToViews: Map<Particle, ParticleView> = new Map<Particle, ParticleView>();

  // A map that associates buckets with the bucket front views for quick lookup.
  private readonly mapBucketsToViews: Map<ParticleContainer<BAAParticle>, BucketFront> =
    new Map<ParticleContainer<BAAParticle>, BucketFront>();

  public constructor( model: BAAModel, tandem: Tandem, providedOptions?: ScreenViewOptions ) {

    const options = combineOptions<ScreenViewOptions>( {

      // A PhET-wide decision was made to not update custom layout bounds even if they do not match the default layout
      // bounds in ScreenView. Do not change these bounds as changes could break or disturb any phet-io instrumentation.
      // See https://github.com/phetsims/phet-io/issues/1939.
      layoutBounds: new Bounds2( 0, 0, 768, 464 ),

      tandem: tandem,
      phetioVisiblePropertyInstrumented: false
    }, providedOptions );

    super( options );

    this.model = model;
    this.viewProperties = new AtomViewProperties( tandem.createTandem( 'viewProperties' ) );

    // Create the model-view transform.
    const modelViewTransform = ModelViewTransform2.createSinglePointScaleInvertedYMapping(
      Vector2.ZERO,
      new Vector2( this.layoutBounds.width * 0.3, this.layoutBounds.height * 0.45 ),
      1.0
    );

    // Create the node that represents the built atom.  This includes things like the electron shells, textual labels,
    // and the marker at the center of an empty atom.
    this.atomNode = new AtomNode( model.atom, modelViewTransform, {
      showElementNameProperty: this.viewProperties.elementNameVisibleProperty,
      showNeutralOrIonProperty: this.viewProperties.neutralAtomOrIonVisibleProperty,
      showStableOrUnstableProperty: this.viewProperties.nuclearStabilityVisibleProperty,
      electronShellDepictionProperty: this.viewProperties.electronModelProperty,
      tandem: tandem.createTandem( 'atomNode' ),
      phetioVisiblePropertyInstrumented: false,
      phetioFeatured: true,
      accessibleHeading: BuildAnAtomStrings.a11y.common.atomAccessibleListNode.accessibleHeadingStringProperty
    } );

    this.atomNode.addChild(
      new AtomDescriberAccessibleListNode( model.atom, this.viewProperties )
    );

    // Create the particle count indicator.
    const particleCountDisplay = new ParticleCountDisplay( model.atom, {
      top: CONTROLS_INSET,
      left: CONTROLS_INSET,
      tandem: tandem.createTandem( 'particleCountDisplay' )
    } );

    // Create the layers that will hold the bucket fronts.
    const bucketFrontLayer = new Node( {
      accessibleHeading: BuildAnAtomStrings.a11y.common.buckets.accessibleHeadingStringProperty,
      accessibleHelpText: BuildAnAtomStrings.a11y.common.buckets.accessibleHelpTextStringProperty,
      accessibleHelpTextBehavior: ParallelDOM.HELP_TEXT_BEFORE_CONTENT
    } );

    const bucketsTandem = tandem.createTandem( 'buckets' );

    // Helper function to add a bucket front to the bucket front layer.
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

          const particle = bucket.extractClosestParticle( model.atom.positionProperty.value );
          if ( particle !== null ) {

            // Get the view node that is associated with this particle.
            const particleView = this.mapParticlesToViews.get( particle );
            affirm( particleView, 'ParticleView not found for extracted particle' );

            // Set the focus to the particle's view so that it can be manipulated via keyboard.
            particleView.pdomVisible = true;
            particleView.focusable = true;
            particleView.focus();

            // Mark the particle as being controlled by the user via keyboard interaction.
            particle.isDraggingProperty.value = true;

            // Position the particle just below the center of the atom's nucleus.
            particle.setPositionAndDestination( model.atom.positionProperty.value.plus( belowNucleusOffset ) );
            particleView.addAccessibleObjectResponse(
              ShredStrings.a11y.particles.overNucleusStringProperty, { alertBehavior: 'queue' }
            );

            // Play the grab sound.
            sharedSoundPlayers.get( 'grab' ).play();

            // Indicate that the user has interacted with the buckets.
            this.hasBucketInteractionOccurredProperty.value = true;
          }
        }
      } );

      // Keep track of the bucket front views so that we can set focus on them later when needed.
      this.mapBucketsToViews.set( bucket, bucketFront );
    };

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

    // Add the alt-input grab/release cue node for the buckets.
    bucketFrontLayer.addChild( new BucketGrabReleaseCueNode(
      this.mapBucketsToViews.get( model.protonBucket )!,
      this.mapBucketsToViews.get( model.neutronBucket )!,
      this.mapBucketsToViews.get( model.electronBucket )!,
      this.hasBucketInteractionOccurredProperty,
      bucketsTandem.createTandem( 'bucketGrabReleaseCueNode' )
    ) );

    // Create the layer where the subatomic particles will go when they are not a part of the atom.
    const particleLayer = new Node();

    // Define group tandems for the particles.
    const protonsGroupTandem = tandem.createTandem( 'protonNodes' ).createGroupTandem( 'protonNode', 1 );
    const neutronsGroupTandem = tandem.createTandem( 'neutronNodes' ).createGroupTandem( 'neutronNode', 1 );
    const electronsGroupTandem = tandem.createTandem( 'electronNodes' ).createGroupTandem( 'electronNode', 1 );

    // type safe reference to buckets
    const bucketsAsParticleContainers: ParticleContainer<BAAParticle>[] = model.buckets;

    model.protonBucketParticleCountProperty.link( ( protons: number ) => {
      if ( protons === 0 ) {
        this.mapBucketsToViews.get( model.protonBucket )!.addAccessibleContextResponse(
          ShredStrings.a11y.particles.bucketEmptyStringProperty, { alertBehavior: 'queue' } );
      }
    } );

    model.neutronBucketParticleCountProperty.link( ( neutrons: number ) => {
      if ( neutrons === 0 ) {
        this.mapBucketsToViews.get( model.neutronBucket )!.addAccessibleContextResponse(
          ShredStrings.a11y.particles.bucketEmptyStringProperty, { alertBehavior: 'queue' } );
      }
    } );

    model.electronBucketParticleCountProperty.link( ( electrons: number ) => {
      if ( electrons === 0 ) {
        this.mapBucketsToViews.get( model.electronBucket )!.addAccessibleContextResponse(
          ShredStrings.a11y.particles.bucketEmptyStringProperty, { alertBehavior: 'queue' } );
      }
    } );

    // Add the particle views.
    [ ...model.nucleons, ...model.electrons ].forEach( particle => {

      const particleView = new BAAParticleView( particle, modelViewTransform, {
        dragBounds: modelViewTransform.viewToModelBounds( this.layoutBounds ),
        pdomVisible: false,
        tandem: particle.type === 'proton' ?
                protonsGroupTandem.createNextTandem() :
                particle.type === 'neutron' ?
                neutronsGroupTandem.createNextTandem() :
                electronsGroupTandem.createNextTandem()
      } );

      particleLayer.addChild( particleView );
      this.mapParticlesToViews.set( particle, particleView );

      // The particle view will either be a child of this screen view or a child of the atom node based on where the
      // particle it represents is and what it's doing. The following listener moves it back and forth as needed.  It's
      // necessary to change parent nodes like this to support alt-input group behavior in the atom node.
      Multilink.multilink(
        [ particle.containerProperty, particle.isDraggingProperty ],
        ( container, isDragging ) => {

          const isParticleNodeChildOfScreenView = particleView.parent === particleLayer;

          if ( isParticleNodeChildOfScreenView && ( container === model.atom || isDragging ) ) {

            // Move the particle view to the atom node, preserving focus if needed.
            const hasFocus = particleView.focused;
            particleLayer.removeChild( particleView );
            this.atomNode.addParticleView( particleView, hasFocus );
          }
          else if ( !isParticleNodeChildOfScreenView &&
                    ( ( container !== null && bucketsAsParticleContainers.includes( container ) ) ||
                      ( container === null && !isDragging ) ) ) {

            // Move the particle view to this screen view.
            this.atomNode.removeParticleView( particleView );
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
        this.viewProperties.electronModelProperty,
        particleView,
        this.getHomeBucketFront( particle ),
        this.atomNode.electronCloud,
        this.atomNode.updateParticleFocus.bind( this.atomNode ),
        tandem.createTandem( 'particleViewKeyboardListener' )
      ) );

      // Watch for when particles enter or leave the atom and update the focusability of the particle views owned by the
      // for the atom as needed. The goal is to have one focusable particle in the atom when there are particles there
      // and none (of course) when the atom is empty.
      particle.containerProperty.lazyLink( ( newContainer, oldContainer ) => {

        if ( newContainer === model.atom ) {

          // The particle has become part of the atom.  Make it focusable and make it the only focusable thing there.
          this.setAtomParticleFocusable( particle );
        }
        else if ( newContainer && bucketsAsParticleContainers.includes( newContainer ) ) {

          // This particle was just placed into a bucket, so make sure that it is not focusable or visible in the PDOM.
          particleView.focusable = false;
          particleView.pdomVisible = false;
        }
        else if ( newContainer === null && oldContainer === model.atom ) {

          // The particle was just removed from the atom, so update what is focusable there.
          this.setAtomParticleFocusable( null );

          // The particle is still focusable, since the user is interacting with it, but should no longer be visible in
          // the PDOM.
          particleView.pdomVisible = false;
        }
      } );

      particle.locationNameProperty.lazyLink( ( destination: ParticleLocations ) => {
        let contextResponse: LocalizedStringProperty | FluentPatternDerivedProperty | string;

        if ( destination === 'bucket' ) {
          contextResponse = BuildAnAtomFluent.a11y.common.particles.particleReturnedToBucket.format( {
            particle: StringUtils.capitalize( particle.type )
          } );
        }
        else {
          const location = destination === 'nucleus' ?
                           BuildAnAtomStrings.a11y.common.particles.nucleusStringProperty :
                           destination === 'innerShell' ?
                           BuildAnAtomStrings.a11y.common.particles.innerShellStringProperty :
                           destination === 'outerShell' ?
                           BuildAnAtomStrings.a11y.common.particles.outerShellStringProperty :
                           destination === 'electronCloud' ?
                           BuildAnAtomStrings.a11y.common.particles.cloudStringProperty : '';
          contextResponse = BuildAnAtomFluent.a11y.common.particles.particleAddedTo.format( {
            particle: StringUtils.capitalize( particle.type ),
            particles: PARTICLE_TO_PLURAL.get( particle.type as BAAParticleType )!,
            count: model.getParticleCountByType( particle.type as BAAParticleType ),
            location: location
          } );
        }

        this.addAccessibleContextResponse( contextResponse, { alertBehavior: 'queue' } );
      } );
    } );

    // The following code manages the visibility of the individual electron particles.  When the electrons are
    // represented as a cloud, the individual particles become invisible when added to the atom, but remain visible when
    // outside the atom.
    Multilink.multilink(
      [ this.viewProperties.electronModelProperty, model.atom.electrons.lengthProperty ],
      ( electronModel, numberOfElectrons ) => {
        const cloudWasFocusable = this.atomNode.electronCloud.focusable;
        let anElectronWasFocusable = false;
        model.electrons.forEach( electron => {
          const electronView = this.mapParticlesToViews.get( electron );
          affirm( electronView, 'Missing ParticleView for electron' );
          if ( electronView.focusable ) {
            anElectronWasFocusable = true;
          }
          const isElectronInAtom = model.atom.electrons.includes( electron );
          electronView.visible = electronModel === 'shells' ||
                                 electron.isDraggingProperty.value ||
                                 !isElectronInAtom;
        } );

        // If the electron model is changing and the other representation had focus, transfer the focus to the new
        // representation.
        if ( electronModel === 'cloud' && anElectronWasFocusable ) {
          this.atomNode.electronCloud.focusable = numberOfElectrons > 0;
        }
        else if ( electronModel === 'shells' && cloudWasFocusable ) {
          if ( numberOfElectrons > 0 ) {
            const electronView = this.mapParticlesToViews.get( model.atom.electrons[ 0 ] );
            affirm( electronView, 'Missing ParticleView for electron' );
            electronView.pdomVisible = true;
            electronView.focusable = true;
          }
        }
      }
    );

    // Define the position where a particle will be initially placed when pulled from a bucket using alt-input.
    const belowNucleusOffset = new Vector2( 0, -40 );

    // Add a keyboard listener to the electron cloud.
    this.atomNode.electronCloud.addInputListener( new ElectronCloudKeyboardListener(
      model.atom,
      this.atomNode,
      model.electronBucket,
      this.mapBucketsToViews.get( model.electronBucket )!,
      this.mapParticlesToViews,
      belowNucleusOffset,
      this.atomNode.updateParticleFocus.bind( this.atomNode ),
      tandem.createTandem( 'electronCloudKeyboardListener' )
    ) );

    // TODO: See https://github.com/phetsims/build-an-atom/issues/370 - This derived string was causing issues with
    //   the focus order due to it triggering a significant re-render when the proton count changed.  The original code
    //   is commented out below, and a slightly modified version that does not watch the proton count and therefore does
    //   not cause the same problem is used instead.  When the larger issue is resolved, the original code should be
    //   restored.
    const periodicTableAccessibleParagraphProperty = new DerivedStringProperty(
      [
        // model.atom.protonCountProperty, // TODO: Uncomment!!! https://github.com/phetsims/build-an-atom/issues/370
        BuildAnAtomStrings.a11y.common.mathSpeakUpperStringProperty,
        BuildAnAtomStrings.a11y.common.periodicTable.accessibleParagraphHighlightedStringProperty
      ],
      // ( protonCount: number, upperString: string, highlightedString: string ) => {
      ( upperString: string, highlightedString: string ) => {
        const protonCount = 1; // Hardcoded to 1 to avoid re-render issues, see comment above.
        const symbol = AtomIdentifier.getSymbol( protonCount );
        const mathSpeakSymbol = StringUtils.fillIn( upperString, { symbol: symbol.split( '' ).join( ' ' ) } );
        const elementCoordinates = PeriodicTableNode.getElementCoordinates( protonCount );
        return StringUtils.fillIn( highlightedString, {
          symbol: mathSpeakSymbol,
          row: elementCoordinates.y,
          column: elementCoordinates.x
        } ) + ' <i>(This is likely incorrect, fix coming.)</i>'; // TODO: Remove!!! https://github.com/phetsims/build-an-atom/issues/370
      }
    );

    // Add the periodic table display.
    const periodicTableAndSymbol = new PeriodicTableAndSymbol( model.atom.protonCountProperty, {
      pickable: false,
      scale: 0.55 // Scale empirically determined to match layout in design doc.
    } );
    this.periodicTableAccordionBox = new BuildAnAtomAccordionBox(
      periodicTableAndSymbol,
      combineOptions<BuildAnAtomAccordionBoxOptions>( {}, {
        titleNode: new Text( BuildAnAtomFluent.periodicTableStringProperty, {
          font: ShredConstants.ACCORDION_BOX_TITLE_FONT,
          maxWidth: ShredConstants.ACCORDION_BOX_TITLE_MAX_WIDTH
        } ),
        expandedDefaultValue: true,

        // phet-io
        tandem: tandem.createTandem( 'periodicTableAccordionBox' ),
        phetioFeatured: true,

        accessibleName: BuildAnAtomStrings.a11y.common.periodicTable.accessibleNameStringProperty,
        accessibleHelpTextExpanded: periodicTableAccessibleParagraphProperty
      }, BAAConstants.ACCORDION_BOX_OPTIONS )
    );

    this.accordionBoxes = new VBox( {
      children: [ this.periodicTableAccordionBox ],
      spacing: 7,
      top: CONTROLS_INSET,
      right: this.layoutBounds.maxX - CONTROLS_INSET
    } );
    this.periodicTableAccordionBox.addLinkedElement( model.atom.elementNameStringProperty );

    // Add the checkbox group that controls some of the atom appearance options.
    const checkboxGroup = new AtomAppearanceCheckboxGroup( model.atom, this.viewProperties, {
      left: this.accordionBoxes.left,
      bottom: this.layoutBounds.height - 2 * CONTROLS_INSET,
      tandem: tandem.createTandem( 'checkboxGroup' )
    } );

    // Link the property that controls whether nuclear instability is depicted by the atom to the model element that
    // controls whether the related animation is enabled.
    this.viewProperties.nuclearStabilityVisibleProperty.link( nuclearStabilityVisible => {
      model.animateNuclearInstabilityProperty.value = nuclearStabilityVisible;
    } );

    // Add the selector panel that controls the electron representation in the atom.
    const electronModelControl = new ElectronModelControl( this.viewProperties.electronModelProperty, {

      // position empirically determined to match design doc
      left: this.atomNode.centerX + 130,
      bottom: this.atomNode.bottom + 5,

      tandem: tandem.createTandem( 'electronModelControl' ),
      phetioFeatured: true,
      visiblePropertyOptions: {
        phetioFeatured: true
      }
    } );

    // Add the reset button.
    const resetAllButton = new ResetAllButton( {
      listener: () => {
        model.reset();
        this.reset();
      },
      right: this.layoutBounds.maxX - CONTROLS_INSET,
      bottom: this.layoutBounds.maxY - CONTROLS_INSET,
      radius: BAAConstants.RESET_BUTTON_RADIUS,
      tandem: tandem.createTandem( 'resetAllButton' )
    } );

    // Add the top level children in the desired z-order.
    this.addChild( electronModelControl );
    this.addChild( checkboxGroup );
    this.addChild( particleCountDisplay );
    this.addChild( this.accordionBoxes );
    _.each( model.buckets, bucket => {
      this.addChild( new BucketHole( bucket, modelViewTransform, {
        pickable: false
      } ) );
    } );
    this.addChild( particleLayer );
    this.addChild( this.atomNode );
    this.addChild( bucketFrontLayer );
    this.addChild( resetAllButton );

    // Do an initial update of the focusable state of the particles in the atom in case there are any there.  Query
    // parameters and phet-io state could have placed particles in the atom at startup.
    this.setAtomParticleFocusable( null );

    // pdom - set navigation order for the Atom screen view
    this.pdomPlayAreaNode.pdomOrder = [
      bucketFrontLayer,
      particleCountDisplay,
      this.atomNode,
      this.accordionBoxes
    ];

    this.pdomControlAreaNode.pdomOrder = [
      checkboxGroup,
      electronModelControl
    ];
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

  /**
   * Set the view associated with the provided particle as focusable, and make all other particles in the atom
   * non-focusable.  If null is provided, then the first available particle in the atom will be made focusable based
   * on the designed precedence order.
   */
  private setAtomParticleFocusable( particle: Particle | null ): void {
    if ( particle ) {
      affirm( particle.containerProperty.value === this.model.atom, 'The provided particle must be in the atom' );

      if ( this.viewProperties.electronModelProperty.value === 'cloud' && particle.type === 'electron' ) {

        // Make the electron cloud focusable instead of the individual electron particle.
        this.atomNode.electronCloud.focusable = true;
        this.mapParticlesToViews.forEach( electronParticleView => {
          electronParticleView.focusable = false;
        } );
      }
      else {

        // Make the provided particle's view node focusable.
        const particleView = this.mapParticlesToViews.get( particle );
        affirm( particleView, 'Missing ParticleView for particle' );
        particleView.pdomVisible = true;
        particleView.focusable = true;

        // Make all other particles in the atom non-focusable.
        this.mapParticlesToViews.forEach( otherParticleView => {
          if ( otherParticleView !== particleView ) {
            otherParticleView.focusable = false;
          }
        } );

        // Make sure that the electron cloud is not focusable.
        this.atomNode.electronCloud.focusable = false;
      }
    }
    else {

      // If no particleView is provided, make the first available particle in the atom focusable based on the designed
      // precedence order: proton, neutron, electron.
      const particlesInAtom: Particle[] = [
        ...this.model.atom.protons,
        ...this.model.atom.neutrons,
        ...this.model.atom.electrons
      ];
      if ( particlesInAtom.length > 0 ) {
        const particleView = this.mapParticlesToViews.get( particlesInAtom[ 0 ] );
        affirm( particleView, 'Missing ParticleView for particle' );
        if ( particleView.particle.type === 'electron' &&
             this.viewProperties.electronModelProperty.value === 'cloud' ) {

          // If the first particle is an electron and the electron model is "cloud", then make the cloud focusable.
          this.atomNode.electronCloud.focusable = true;
        }
        else {
          particleView.focusable = true;
          this.atomNode.electronCloud.focusable = false;
        }
      }
      else {

        // There are no particles in the atom, so make sure that the electron cloud is not focusable.
        this.atomNode.electronCloud.focusable = false;
      }
    }
  }

  public reset(): void {
    this.periodicTableAccordionBox.expandedProperty.reset();
    this.hasBucketInteractionOccurredProperty.reset();
    this.viewProperties.reset();
  }
}

buildAnAtom.register( 'BAAScreenView', BAAScreenView );
export default BAAScreenView;