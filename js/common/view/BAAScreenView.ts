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
import VBox from '../../../../scenery/js/layout/nodes/VBox.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import Text from '../../../../scenery/js/nodes/Text.js';
import AtomIdentifier from '../../../../shred/js/AtomIdentifier.js';
import Particle, { ParticleLocations } from '../../../../shred/js/model/Particle.js';
import ShredConstants from '../../../../shred/js/ShredConstants.js';
import ShredStrings from '../../../../shred/js/ShredStrings.js';
import AtomNode from '../../../../shred/js/view/AtomNode.js';
import BucketDragListener from '../../../../shred/js/view/BucketDragListener.js';
import ElectronCloudView from '../../../../shred/js/view/ElectronCloudView.js';
import ParticleCountDisplay from '../../../../shred/js/view/ParticleCountDisplay.js';
import ParticleView from '../../../../shred/js/view/ParticleView.js';
import sharedSoundPlayers from '../../../../tambo/js/sharedSoundPlayers.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import PeriodicTableAndSymbol from '../../atom/view/PeriodicTableAndSymbol.js';
import buildAnAtom from '../../buildAnAtom.js';
import BuildAnAtomFluent from '../../BuildAnAtomFluent.js';
import BuildAnAtomStrings from '../../BuildAnAtomStrings.js';
import BAAConstants from '../BAAConstants.js';
import BAAModel, { MAX_ELECTRONS, MAX_NEUTRONS, MAX_PROTONS } from '../model/BAAModel.js';
import AtomAppearanceCheckboxGroup from './AtomAppearanceCheckboxGroup.js';
import AtomViewProperties from './AtomViewProperties.js';
import BAAParticleKeyboardListener from './BAAParticleKeyboardListener.js';
import BAAParticleView from './BAAParticleView.js';
import BucketGrabReleaseCueNode from './BucketGrabReleaseCueNode.js';
import BuildAnAtomAccordionBox, { BuildAnAtomAccordionBoxOptions } from './BuildAnAtomAccordionBox.js';
import AtomViewDescriber from './description/AtomViewDescriber.js';
import ElectronCloudKeyboardListener from './ElectronCloudKeyboardListener.js';
import ElectronModelControl from './ElectronModelControl.js';

// constants
const CONTROLS_INSET = 10;

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
  private readonly mapBucketsToViews: Map<ParticleContainer<Particle>, BucketFront> =
    new Map<ParticleContainer<Particle>, BucketFront>();

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
      AtomViewDescriber.createAccessibleListNode( model.atom, this.viewProperties )
    );

    // Create the particle count indicator.
    const particleCountDisplay = new ParticleCountDisplay( model.atom, {
      top: CONTROLS_INSET,
      left: CONTROLS_INSET,
      tandem: tandem.createTandem( 'particleCountDisplay' )
    } );

    // Create the layers that will hold the bucket fronts.
    const bucketFrontLayer = new Node( {
      accessibleHeading: ShredStrings.a11y.particles.accessibleHeadingStringProperty
    } );

    const bucketsTandem = tandem.createTandem( 'buckets' );

    // Helper function to add a bucket front to the bucket front layer.
    const addBucketFront = (
      bucket: SphereBucket<Particle>,
      particleTypeStringProperty: TReadOnlyProperty<string>,
      bucketEmptyProperty: TReadOnlyProperty<boolean>
    ): void => {
      const bucketAccessibleNameProperty = new DerivedStringProperty(
        [
          particleTypeStringProperty,
          bucketEmptyProperty,
          ShredStrings.a11y.buckets.accessibleNameStringProperty,
          ShredStrings.a11y.buckets.emptyNameStringProperty
        ],
        ( particleType: string, bucketEmpty: boolean, accessibleName: string, emptyName: string ) => {
          return StringUtils.fillIn( bucketEmpty ? emptyName : accessibleName, { particle: particleType } );
        }
      );

      const bucketAccessibleHelpTextProperty = new DerivedStringProperty(
        [
          particleTypeStringProperty,
          ShredStrings.a11y.particles.accessibleHelpTextStringProperty
        ],
        ( particleType: string, accessibleHelpText: string ) => {
          return StringUtils.fillIn( accessibleHelpText, { particle: particleType } );
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
        accessibleName: bucketAccessibleNameProperty,
        accessibleHelpText: bucketAccessibleHelpTextProperty
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
          bucketFront.addAccessibleObjectResponse( ShredStrings.a11y.grabbedStringProperty, 'queue' );

          const particle = bucket.extractClosestParticle( model.atom.positionProperty.value );
          if ( particle !== null ) {

            // Get the view node that is associated with this particle.
            const particleView = this.mapParticlesToViews.get( particle );
            affirm( particleView, 'ParticleView not found for extracted particle' );

            // Set the focus to the particle's view so that it can be manipulated via keyboard.
            particleView.focusable = true;
            particleView.focus();

            // Mark the particle as being controlled by the user via keyboard interaction.
            particle.isDraggingProperty.value = true;

            // Position the particle just below the center of the atom's nucleus.
            particle.setPositionAndDestination( model.atom.positionProperty.value.plus( belowNucleusOffset ) );
            particleView.addAccessibleObjectResponse( ShredStrings.a11y.particles.overNucleusStringProperty, 'queue' );

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
      ShredStrings.a11y.particles.protonStringProperty,
      DerivedProperty.valueEqualsConstant( model.atom.protonCountProperty, MAX_PROTONS )
    );
    addBucketFront(
      model.neutronBucket,
      ShredStrings.a11y.particles.neutronStringProperty,
      DerivedProperty.valueEqualsConstant( model.atom.neutronCountProperty, MAX_NEUTRONS )
    );
    addBucketFront(
      model.electronBucket,
      ShredStrings.a11y.particles.electronStringProperty,
      DerivedProperty.valueEqualsConstant( model.atom.electronCountProperty, MAX_ELECTRONS )
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
    const bucketsAsParticleContainers: ParticleContainer<Particle>[] = model.buckets;

    model.particleAddedToEmitter.addListener( ( destination: ParticleLocations ) => {
      let contextResponse: LocalizedStringProperty | string;

      if ( destination === 'bucket' ) {
        contextResponse = ShredStrings.a11y.particles.particleReturnedToBucketStringProperty;
      }
      else {
        contextResponse = StringUtils.fillIn( ShredStrings.a11y.particles.particleAddedToStringProperty, {
          location: destination === 'nucleus' ?
                    ShredStrings.a11y.particles.nucleusStringProperty :
                    destination === 'innerShell' ?
                    ShredStrings.a11y.particles.innerShellStringProperty :
                    destination === 'outerShell' ?
                    ShredStrings.a11y.particles.outerShellStringProperty :
                    destination === 'electronCloud' ?
                    ShredStrings.a11y.particles.cloudStringProperty : ''
        } );
      }

      this.addAccessibleContextResponse( contextResponse, 'queue' );
    } );

    model.atom.protonCountProperty.link( ( protons: number ) => {
      if ( protons === MAX_PROTONS ) {
        this.mapBucketsToViews.get( model.protonBucket )!.addAccessibleContextResponse( ShredStrings.a11y.particles.bucketEmptyStringProperty, 'queue' );
      }
    } );

    model.atom.neutronCountProperty.link( ( neutrons: number ) => {
      if ( neutrons === MAX_NEUTRONS ) {
        this.mapBucketsToViews.get( model.neutronBucket )!.addAccessibleContextResponse( ShredStrings.a11y.particles.bucketEmptyStringProperty, 'queue' );
      }
    } );

    model.atom.electronCountProperty.link( ( electrons: number ) => {
      if ( electrons === MAX_ELECTRONS ) {
        this.mapBucketsToViews.get( model.electronBucket )!.addAccessibleContextResponse( ShredStrings.a11y.particles.bucketEmptyStringProperty, 'queue' );
      }
    } );

    // Add the particle views.
    [ ...model.nucleons, ...model.electrons ].forEach( particle => {

      const particleView = new BAAParticleView( particle, modelViewTransform, {
        dragBounds: modelViewTransform.viewToModelBounds( this.layoutBounds ),
        focusable: false,
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

        const particleView = this.mapParticlesToViews.get( particle );
        affirm( particleView, 'Missing ParticleView for particle' );

        if ( newContainer === model.atom ) {

          // The particle has become part of the atom.  Make it focusable and make it the only focusable thing there.
          this.setAtomParticleViewFocusable( particleView );
        }
        else if ( newContainer && bucketsAsParticleContainers.includes( newContainer ) ) {

          // This particle was just placed into a bucket, so make sure that it is not focusable.
          particleView.focusable = false;
        }

        if ( oldContainer === model.atom ) {

          // If the particle was removed from the atom then update what is focusable there.
          this.setAtomParticleViewFocusable( null );
        }
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

    const periodicTableAccessibleParagraphProperty = new DerivedStringProperty(
      [
        model.atom.protonCountProperty,
        BuildAnAtomStrings.a11y.common.mathSpeakUpperStringProperty,
        BuildAnAtomStrings.a11y.common.periodicTable.accessibleParagraphHighlightedStringProperty,
        BuildAnAtomStrings.a11y.common.periodicTable.accessibleParagraphNoSymbolStringProperty
      ],
      (
        protonCount: number,
        upperString: string,
        highlightedString: string,
        noSymbolString: string
      ) => {
        if ( protonCount > 0 ) {
          const symbol = AtomIdentifier.getSymbol( protonCount );
          const mathSpeakSymbol = StringUtils.fillIn( upperString, { symbol: symbol.split( '' ).join( ' ' ) } );
          return StringUtils.fillIn( highlightedString, { symbol: mathSpeakSymbol } );
        }
        else {
          return noSymbolString;
        }
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
    this.setAtomParticleViewFocusable( null );

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
  private getHomeBucket( particle: Particle ): SphereBucket<Particle> {
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
   * Set the provided particle view or electron cloud view as focusable, and make all other particles in the atom
   * non-focusable.  If null is provided, then the first available particle in the atom will be made focusable based
   * on the designed precedence order.
   */
  private setAtomParticleViewFocusable( particleView: ParticleView | ElectronCloudView | null ): void {
    if ( particleView ) {
      if ( particleView instanceof ParticleView ) {
        affirm(
          particleView.particle.containerProperty.value === this.model.atom,
          'The provided particle must be in the atom'
        );
      }
      particleView.focusable = true;

      // Make all other particles in the atom non-focusable.
      this.mapParticlesToViews.forEach( otherParticleView => {
        if ( otherParticleView !== particleView ) {
          otherParticleView.focusable = false;
        }
      } );

      // Make the electron cloud non-focusable if it is not the provided node.
      if ( this.atomNode.electronCloud !== particleView ) {
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
        particleView.focusable = true;
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