// Copyright 2013-2025, University of Colorado Boulder

/**
 * ScreenView that presents an interactive atom on the left side, buckets of particles underneath, and controls for
 * label visibility and reset.  A periodic table is included on the right side.  This is intended to be used as a base
 * class for screens with similar views.
 *
 * @author John Blanco
 * @author Aadish Gupta
 */

import DerivedStringProperty from '../../../../axon/js/DerivedStringProperty.js';
import Multilink from '../../../../axon/js/Multilink.js';
import Property from '../../../../axon/js/Property.js';
import { TReadOnlyProperty } from '../../../../axon/js/TReadOnlyProperty.js';
import Bounds2 from '../../../../dot/js/Bounds2.js';
import { equalsEpsilon } from '../../../../dot/js/util/equalsEpsilon.js';
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
import { OneKeyStroke } from '../../../../scenery/js/input/KeyDescriptor.js';
import VBox from '../../../../scenery/js/layout/nodes/VBox.js';
import KeyboardListener from '../../../../scenery/js/listeners/KeyboardListener.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import Text from '../../../../scenery/js/nodes/Text.js';
import AtomIdentifier from '../../../../shred/js/AtomIdentifier.js';
import Particle, { ParticleType } from '../../../../shred/js/model/Particle.js';
import ShredConstants from '../../../../shred/js/ShredConstants.js';
import ShredStrings from '../../../../shred/js/ShredStrings.js';
import AtomNode from '../../../../shred/js/view/AtomNode.js';
import BucketDragListener from '../../../../shred/js/view/BucketDragListener.js';
import ElectronCloudView from '../../../../shred/js/view/ElectronCloudView.js';
import ParticleCountDisplay from '../../../../shred/js/view/ParticleCountDisplay.js';
import ParticleView from '../../../../shred/js/view/ParticleView.js';
import VerticalCheckboxGroup, { VerticalCheckboxGroupItem } from '../../../../sun/js/VerticalCheckboxGroup.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import PeriodicTableAndSymbol from '../../atom/view/PeriodicTableAndSymbol.js';
import buildAnAtom from '../../buildAnAtom.js';
import BuildAnAtomFluent from '../../BuildAnAtomFluent.js';
import BuildAnAtomStrings from '../../BuildAnAtomStrings.js';
import BAAConstants from '../BAAConstants.js';
import BAAModel, { AtomDestinations } from '../model/BAAModel.js';
import AtomViewProperties from './AtomViewProperties.js';
import BAAParticleKeyboardListener from './BAAParticleKeyboardListener.js';
import BAAParticleView from './BAAParticleView.js';
import BucketGrabReleaseCueNode from './BucketGrabReleaseCueNode.js';
import BuildAnAtomAccordionBox, { BuildAnAtomAccordionBoxOptions } from './BuildAnAtomAccordionBox.js';
import AtomViewDescriber from './description/AtomViewDescriber.js';
import ElectronModelControl from './ElectronModelControl.js';

type FocusUpdateDirection = 'forward' | 'backward';

// constants
const CONTROLS_INSET = 10;
const LABEL_CONTROL_FONT = new PhetFont( 12 );
const LABEL_CONTROL_MAX_WIDTH = 180;
const DISTANCE_TESTING_TOLERANCE = 1e-6;
const NAVIGATION_KEYS: OneKeyStroke[] = [ 'arrowRight', 'arrowLeft', 'arrowDown', 'arrowUp', 'w', 'a', 's', 'd' ];

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

    // Add the node that shows the textual labels, the electron shells, and the center X marker.
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

    // Add the particle count indicator.
    const particleCountDisplay = new ParticleCountDisplay( model.atom, {
      top: CONTROLS_INSET,
      left: CONTROLS_INSET,
      tandem: tandem.createTandem( 'particleCountDisplay' )
    } );

    // Add the front portion of the buckets. This is done separately from the bucket holes for layering purposes.
    const bucketFrontLayer = new Node( {
      accessibleHeading: ShredStrings.a11y.buckets.accessibleHeadingStringProperty
    } );

    const bucketsTandem = tandem.createTandem( 'buckets' );

    const createBucketFront = ( bucket: SphereBucket<Particle>, particleTypeStringProperty: TReadOnlyProperty<string> ): void => {
      const bucketAccessibleNameProperty = new DerivedStringProperty(
        [
          particleTypeStringProperty,
          ShredStrings.a11y.buckets.accessibleNameStringProperty
        ],
        ( particleType: string, accessibleName: string ) => {
          return StringUtils.fillIn( accessibleName, { particle: particleType } );
        }
      );

      const bucketaccessibleHelpTextProperty = new DerivedStringProperty(
        [
          particleTypeStringProperty,
          ShredStrings.a11y.buckets.accessibleHelpTextStringProperty
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
        accessibleHelpText: bucketaccessibleHelpTextProperty
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
          bucketFront.addAccessibleObjectResponse( ShredStrings.a11y.buckets.grabbedStringProperty, 'queue' );

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
            particleView.addAccessibleObjectResponse( ShredStrings.a11y.buckets.overNucleusStringProperty, 'queue' );


            // Indicate that the user has interacted with the buckets.
            this.hasBucketInteractionOccurredProperty.value = true;
          }
        }
      } );

      // Keep track of the bucket front views so that we can set focus on them later when needed.
      this.mapBucketsToViews.set( bucket, bucketFront );
    };

    createBucketFront( model.protonBucket, ShredStrings.a11y.buckets.protonStringProperty );
    createBucketFront( model.neutronBucket, ShredStrings.a11y.buckets.neutronStringProperty );
    createBucketFront( model.electronBucket, ShredStrings.a11y.buckets.electronStringProperty );

    // Add the alt-input grab/release cue node.
    bucketFrontLayer.addChild( new BucketGrabReleaseCueNode(
      this.mapBucketsToViews.get( model.protonBucket )!,
      this.mapBucketsToViews.get( model.neutronBucket )!,
      this.mapBucketsToViews.get( model.electronBucket )!,
      this.hasBucketInteractionOccurredProperty,
      bucketsTandem.createTandem( 'bucketGrabReleaseCueNode' )
    ) );

    // Create the layer where the nucleons and electrons will go.
    const particleLayer = new Node();

    // Define group tandems for the particles.
    const protonsGroupTandem = tandem.createTandem( 'protonNodes' ).createGroupTandem( 'protonNode', 1 );
    const neutronsGroupTandem = tandem.createTandem( 'neutronNodes' ).createGroupTandem( 'neutronNode', 1 );
    const electronsGroupTandem = tandem.createTandem( 'electronNodes' ).createGroupTandem( 'electronNode', 1 );

    // The particles should not be draggable outside the layout bounds of this screen view.
    const particleDragBounds = modelViewTransform.viewToModelBounds( this.layoutBounds );

    // Define some offsets that will be used to position the particles in various locations needed by alt-input.
    // These are in model coordinates.
    const belowNucleusOffset = new Vector2( 0, -40 );

    // type safe reference to buckets
    const bucketsAsParticleContainers: ParticleContainer<Particle>[] = model.buckets;

    model.returnedToBucketEmitter.addListener( () => {
      this.addAccessibleContextResponse( ShredStrings.a11y.buckets.particleReturnedToBucketStringProperty, 'queue' );
    } );

    model.addedToAtomEmitter.addListener( ( destination: AtomDestinations ) => {
      const contextResponse = StringUtils.fillIn( ShredStrings.a11y.buckets.particleAddedToStringProperty, {
        location: destination === 'nucleus' ?
                  ShredStrings.a11y.buckets.nucleusStringProperty :
                  destination === 'innerElectronShell' ?
                  ShredStrings.a11y.buckets.innerShellStringProperty :
                  destination === 'outerElectronShell' ?
                  ShredStrings.a11y.buckets.outerShellStringProperty :
                  destination === 'electronCloud' ?
                  ShredStrings.a11y.buckets.cloudStringProperty : ''
      } );

      this.addAccessibleContextResponse( contextResponse, 'queue' );
    } );

    model.atom.protonCountProperty.link( ( protons: number ) => {
      if ( protons === 10 ) {
        this.addAccessibleContextResponse( ShredStrings.a11y.buckets.bucketEmptyStringProperty, 'queue' );
      }
    } );

    model.atom.neutronCountProperty.link( ( neutrons: number ) => {
      if ( neutrons === 14 ) {
        this.addAccessibleContextResponse( ShredStrings.a11y.buckets.bucketEmptyStringProperty, 'queue' );
      }
    } );

    model.atom.electronCountProperty.link( ( electrons: number ) => {
      if ( electrons === 10 ) {
        this.addAccessibleContextResponse( ShredStrings.a11y.buckets.bucketEmptyStringProperty, 'queue' );
      }
    } );

    // Add the particle views.
    [ ...model.nucleons, ...model.electrons ].forEach( particle => {

      const particleView = new BAAParticleView( particle, modelViewTransform, {
        dragBounds: particleDragBounds,
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
        model.atom.innerElectronShellRadius,
        model.atom.outerElectronShellRadius,
        this.updateAtomParticleFocus.bind( this )
      ) );

      // Watch for when particles enter or leave the atom and update the focusability of the particle views for the
      // particles that are in the atom as needed. The goal is to have one focusable particle in the atom when there are
      // particles there, and none (of course) when the atom is empty.
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

    // Add a keyboard listener to the electron cloud.
    this.atomNode.electronCloud.addInputListener( new KeyboardListener( {
      keys: [ 'space', 'enter', ...NAVIGATION_KEYS, 'delete', 'backspace' ],
      fireOnDown: false,
      fire: ( event, keysPressed ) => {

        if ( keysPressed === 'space' || keysPressed === 'enter' ) {

          // Get a reference to the electron most recently added to the atom.
          const electron = model.atom.electrons[ model.atom.electrons.length - 1 ];
          affirm( electron, 'It should not be possible to get key presses here with no electrons in the atom.' );

          // Set the electron as being controlled by the user via keyboard interaction.  This should cause it to be
          // removed from the atom.
          electron.isDraggingProperty.value = true;

          // Move the electron to just below the nucleus.
          electron.setPositionAndDestination( model.atom.positionProperty.value.plus( belowNucleusOffset ) );

          // Set the alt-input focus to this electron.
          const electronView = this.mapParticlesToViews.get( electron );
          affirm( electronView, 'Missing ParticleView for electron' );
          electronView.focusable = true;
          electronView.focus();
        }
        else if ( keysPressed === 'delete' || keysPressed === 'backspace' ) {

          // Get a reference to the electron most recently added to the atom.
          const electron = model.atom.electrons[ model.atom.electrons.length - 1 ];
          affirm( electron, 'It should not be possible to get key presses here with no electrons in the atom.' );

          // Simulate extraction of a particle from the cloud and putting it back in the bucket.
          electron.isDraggingProperty.value = true;
          electron.setPositionAndDestination( model.electronBucket.position );
          electron.isDraggingProperty.value = false;
          electron.moveImmediatelyToDestination();

          if ( model.atom.particleCountProperty.value > 0 ) {

            // Update focus to the first focusable particle in the atom.
            this.updateAtomParticleFocus( null, 'forward' );
          }
          else {

            // There are no particles left in the atom, so shift focus to the electron bucket.
            this.mapBucketsToViews.get( model.electronBucket )!.focus();
          }
        }
        else if ( keysPressed === 'arrowRight' || keysPressed === 'arrowDown' ||
                  keysPressed === 'w' || keysPressed === 's' ) {
          this.updateAtomParticleFocus( this.atomNode.electronCloud, 'forward' );
        }
        else if ( keysPressed === 'arrowLeft' || keysPressed === 'arrowUp' ||
                  keysPressed === 'a' || keysPressed === 'd' ) {
          this.updateAtomParticleFocus( this.atomNode.electronCloud, 'backward' );
        }
      }
    } ) );

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
    this.periodicTableAccordionBox = new BuildAnAtomAccordionBox( periodicTableAndSymbol,
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
      }, BAAConstants.ACCORDION_BOX_OPTIONS ) );

    this.accordionBoxes = new VBox( {
      children: [ this.periodicTableAccordionBox ],
      spacing: 7
    } );
    this.periodicTableAccordionBox.addLinkedElement( model.atom.elementNameStringProperty );

    const checkboxItemTextOptions = {
      font: LABEL_CONTROL_FONT,
      maxWidth: LABEL_CONTROL_MAX_WIDTH
    };
    const checkboxItems: VerticalCheckboxGroupItem[] = [
      {
        createNode: () => new Text( BuildAnAtomFluent.elementStringProperty, checkboxItemTextOptions ),
        property: this.viewProperties.elementNameVisibleProperty,
        tandemName: 'elementNameCheckbox',
        options: {
          accessibleName: BuildAnAtomStrings.a11y.common.elementNameCheckbox.accessibleNameStringProperty,
          accessibleHelpText: BuildAnAtomStrings.a11y.common.elementNameCheckbox.accessibleHelpTextStringProperty,
          accessibleContextResponseUnchecked: BuildAnAtomStrings.a11y.common.elementNameCheckbox.accessibleContextResponseUncheckedStringProperty,

          accessibleContextResponseChecked: AtomViewDescriber.createElementNameContextResponse(
            model.atom.protonCountProperty,
            model.atom.elementNameStringProperty
          )
        }
      },
      {
        createNode: () => new Text( BuildAnAtomFluent.neutralSlashIonStringProperty, checkboxItemTextOptions ),
        property: this.viewProperties.neutralAtomOrIonVisibleProperty,
        tandemName: 'neutralAtomOrIonCheckbox',
        options: {
          accessibleName: BuildAnAtomStrings.a11y.common.neutralAtomIonCheckbox.accessibleNameStringProperty,
          accessibleHelpText: BuildAnAtomStrings.a11y.common.neutralAtomIonCheckbox.accessibleHelpTextStringProperty,
          accessibleContextResponseUnchecked: BuildAnAtomStrings.a11y.common.neutralAtomIonCheckbox.accessibleContextResponseUncheckedStringProperty,

          accessibleContextResponseChecked: AtomViewDescriber.createNeutralOrIonContextResponse(
            model.atom.protonCountProperty,
            model.atom.chargeProperty
          )
        }
      },
      {
        createNode: () => new Text( BuildAnAtomFluent.stableSlashUnstableStringProperty, checkboxItemTextOptions ),
        property: this.viewProperties.nuclearStabilityVisibleProperty,
        tandemName: 'nuclearStabilityCheckbox',
        options: {
          accessibleName: BuildAnAtomStrings.a11y.common.nuclearStabilityCheckbox.accessibleNameStringProperty,
          accessibleHelpText: BuildAnAtomStrings.a11y.common.nuclearStabilityCheckbox.accessibleHelpTextStringProperty,
          accessibleContextResponseUnchecked: BuildAnAtomStrings.a11y.common.nuclearStabilityCheckbox.accessibleContextResponseUncheckedStringProperty,

          accessibleContextResponseChecked: AtomViewDescriber.createStabilityContextResponse(
            model.atom.protonCountProperty,
            model.atom.nucleusStableProperty
          )
        }
      }
    ];

    const checkboxGroup = new VerticalCheckboxGroup( checkboxItems, {
      checkboxOptions: { boxWidth: 12 },
      spacing: 8,
      tandem: tandem.createTandem( 'checkboxGroup' ),
      phetioFeatured: true,
      visiblePropertyOptions: {
        phetioFeatured: true
      }
    } );

    // Link the property that controls whether nuclear instability is depicted by the atom to the model element that
    // controls whether the related animation is enabled.
    this.viewProperties.nuclearStabilityVisibleProperty.link( nuclearStabilityVisible => {
      model.animateNuclearInstabilityProperty.value = nuclearStabilityVisible;
    } );

    // Add the selector panel that controls the electron representation in the atom.
    const electronModelControl = new ElectronModelControl( this.viewProperties.electronModelProperty, {
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

    // Do the layout.
    this.accordionBoxes.top = CONTROLS_INSET;
    this.accordionBoxes.right = this.layoutBounds.maxX - CONTROLS_INSET;
    checkboxGroup.left = this.accordionBoxes.left;
    checkboxGroup.bottom = this.layoutBounds.height - 2 * CONTROLS_INSET;
    electronModelControl.left = this.atomNode.centerX + 130;
    electronModelControl.bottom = this.atomNode.bottom + 5;

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
   * Update which particle in the atom has focus based on the current particle that has focus and the direction to move.
   * This is for alt-input support.  If no node is supplied, then the focus will be set to the first available particle
   * in the atom.
   */
  private updateAtomParticleFocus( currentlyFocusedNode: ParticleView | ElectronCloudView | null,
                                   direction: FocusUpdateDirection ): void {

    affirm(
      currentlyFocusedNode === null || currentlyFocusedNode.focused,
      'The provided particle view or electron cloud must have focus for this to work.'
    );

    // This array will be populated with the nodes that are eligible to receive focus, in the order in which they
    // should receive focus.
    const focusOrder: ( ParticleView | ElectronCloudView )[] = [];

    let particleType: ParticleType | null;
    if ( currentlyFocusedNode ) {
      if ( currentlyFocusedNode instanceof ParticleView ) {
        particleType = currentlyFocusedNode.particle.type;
      }
      else {

        // The provided node must be the electron cloud.
        particleType = 'electron';
      }
    }
    else {
      particleType = null;
    }

    if ( currentlyFocusedNode && particleType === 'proton' ) {
      focusOrder.push( currentlyFocusedNode );
    }
    else {

      const closestProtonToAtomCenter = this.getClosestParticleToAtomCenter( 'proton' );

      // Add the best proton view if there is one.
      if ( closestProtonToAtomCenter ) {
        const protonView = this.mapParticlesToViews.get( closestProtonToAtomCenter );
        affirm( protonView, 'Missing ParticleView for proton' );
        focusOrder.push( protonView );
      }
    }

    if ( currentlyFocusedNode && particleType === 'neutron' ) {
      focusOrder.push( currentlyFocusedNode );
    }
    else {

      const closestNeutronToAtomCenter = this.getClosestParticleToAtomCenter( 'neutron' );

      // Add the best neutron view if there is one.
      if ( closestNeutronToAtomCenter ) {
        const neutronView = this.mapParticlesToViews.get( closestNeutronToAtomCenter );
        affirm( neutronView, 'Missing ParticleView for neutron' );
        focusOrder.push( neutronView );
      }
    }

    if ( this.model.atom.electrons.length > 0 ) {
      if ( this.viewProperties.electronModelProperty.value === 'cloud' ) {

        // We are in cloud mode, so add the cloud to the focus order.
        focusOrder.push( this.atomNode.electronCloud );
      }
      else {

        let electronShellNumber = -1;
        if ( particleType === 'electron' ) {
          electronShellNumber = this.getElectronShellNumber( ( currentlyFocusedNode as ParticleView ).particle );
        }

        // Define a couple of closure functions that will help with adding electrons to the focus order.
        const addInnerElectronToFocusOrder = () => {
          const electronsInInnerShell = [ ...this.model.atom.electrons ].filter( e =>
            this.getElectronShellNumber( e ) === 0
          );
          if ( electronsInInnerShell.length > 0 ) {
            const innerShellElectron = this.mapParticlesToViews.get( electronsInInnerShell[ 0 ] );
            affirm( innerShellElectron, 'Missing ParticleView for electron in inner shell' );
            focusOrder.push( innerShellElectron );
          }
        };
        const addOuterElectronToFocusOrder = () => {
          const electronsInOuterShell = [ ...this.model.atom.electrons ].filter( electron =>
            this.getElectronShellNumber( electron ) === 1
          );
          if ( electronsInOuterShell.length > 0 ) {
            const outerShellElectron = this.mapParticlesToViews.get( electronsInOuterShell[ 0 ] );
            affirm( outerShellElectron, 'Missing ParticleView for electron in outer shell' );
            focusOrder.push( outerShellElectron );
          }
        };

        if ( electronShellNumber === -1 ) {

          // The provided particle is not an electron, so add one electron from each shell, inner first.
          addInnerElectronToFocusOrder();
          addOuterElectronToFocusOrder();
        }
        else if ( currentlyFocusedNode && electronShellNumber === 0 ) {

          // The provided particle is an electron in the inner shell, so add it first, then add an electron from the
          // outer shell if there is one.
          focusOrder.push( currentlyFocusedNode );
          addOuterElectronToFocusOrder();
        }
        else {

          // The provided particle is an electron in the outer shell, so add one from the inner shell first, then add
          // this one.
          addInnerElectronToFocusOrder();
          currentlyFocusedNode && focusOrder.push( currentlyFocusedNode );
        }
      }
    }

    // If there is something available in the atom to shift focus to, do so.
    if ( focusOrder.length > 0 ) {
      const currentIndex = currentlyFocusedNode === null ?
                           focusOrder.length - 1 :
                           focusOrder.indexOf( currentlyFocusedNode );
      let newIndex;
      if ( direction === 'forward' ) {
        newIndex = ( currentIndex + 1 ) % focusOrder.length;
      }
      else {
        newIndex = ( currentIndex - 1 + focusOrder.length ) % focusOrder.length;
      }
      this.setAtomParticleViewFocusable( focusOrder[ newIndex ] );
      focusOrder[ newIndex ].focus();
      if ( currentIndex !== newIndex ) {
        focusOrder[ currentIndex ].focusable = false;
      }
    }
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

  /**
   * Get the shell number (0 for inner, 1 for outer) for the provided electron.  If the electron is not in the atom,
   * or if it is not in either shell, -1 is returned.
   */
  private getElectronShellNumber( electron: Particle ): number {
    affirm( electron.type === 'electron', 'The provided particle must be an electron' );
    let electronShellNumber = -1;
    if ( this.model.atom.electrons.includes( electron ) ) {
      const distanceFromAtomCenter =
        electron.positionProperty.value.distance( this.model.atom.positionProperty.value );
      electronShellNumber = equalsEpsilon(
        distanceFromAtomCenter,
        this.model.atom.innerElectronShellRadius,
        DISTANCE_TESTING_TOLERANCE
      ) ? 0 : 1;
    }
    return electronShellNumber;
  }

  public reset(): void {
    this.periodicTableAccordionBox.expandedProperty.reset();
    this.hasBucketInteractionOccurredProperty.reset();
    this.viewProperties.reset();
  }

  /**
   * Get the particle of the specified type that is closest to the center of the atom.  Returns null if there are no
   * particles of the specified type in the atom.
   */
  private getClosestParticleToAtomCenter( particleType: ParticleType ): Particle | null {
    affirm(
      particleType === 'proton' || particleType === 'neutron' || particleType === 'electron',
      `Unexpected particle type: ${particleType}`
    );
    const atomCenter = this.model.atom.positionProperty.value;
    const particles = particleType === 'proton' ? this.model.atom.protons :
                      particleType === 'neutron' ? this.model.atom.neutrons :
                      this.model.atom.electrons;
    const sortedParticles = [ ...particles ].sort( ( a, b ) => {
      const aDistance = a.positionProperty.value.distance( atomCenter );
      const bDistance = b.positionProperty.value.distance( atomCenter );
      return aDistance - bDistance;
    } );
    return sortedParticles.length > 0 ? sortedParticles[ 0 ] : null;
  }
}

buildAnAtom.register( 'BAAScreenView', BAAScreenView );
export default BAAScreenView;