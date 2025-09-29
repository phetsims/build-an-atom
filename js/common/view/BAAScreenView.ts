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
import Bounds2 from '../../../../dot/js/Bounds2.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import ScreenView, { ScreenViewOptions } from '../../../../joist/js/ScreenView.js';
import Shape from '../../../../kite/js/Shape.js';
import affirm from '../../../../perennial-alias/js/browser-and-node/affirm.js';
import { combineOptions } from '../../../../phet-core/js/optionize.js';
import { ParticleContainer } from '../../../../phetcommon/js/model/ParticleContainer.js';
import StringUtils from '../../../../phetcommon/js/util/StringUtils.js';
import ModelViewTransform2 from '../../../../phetcommon/js/view/ModelViewTransform2.js';
import AccessibleInteractiveOptions from '../../../../scenery-phet/js/accessibility/AccessibleInteractiveOptions.js';
import BucketFront from '../../../../scenery-phet/js/bucket/BucketFront.js';
import BucketHole from '../../../../scenery-phet/js/bucket/BucketHole.js';
import ResetAllButton from '../../../../scenery-phet/js/buttons/ResetAllButton.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import VBox from '../../../../scenery/js/layout/nodes/VBox.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import Text from '../../../../scenery/js/nodes/Text.js';
import AtomIdentifier from '../../../../shred/js/AtomIdentifier.js';
import Particle from '../../../../shred/js/model/Particle.js';
import ShredConstants from '../../../../shred/js/ShredConstants.js';
import AtomNode, { AtomNodeOptions } from '../../../../shred/js/view/AtomNode.js';
import BucketDragListener from '../../../../shred/js/view/BucketDragListener.js';
import ParticleCountDisplay from '../../../../shred/js/view/ParticleCountDisplay.js';
import ParticleView from '../../../../shred/js/view/ParticleView.js';
import VerticalCheckboxGroup, { VerticalCheckboxGroupItem } from '../../../../sun/js/VerticalCheckboxGroup.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import PeriodicTableAndSymbol from '../../atom/view/PeriodicTableAndSymbol.js';
import buildAnAtom from '../../buildAnAtom.js';
import BuildAnAtomFluent from '../../BuildAnAtomFluent.js';
import BuildAnAtomStrings from '../../BuildAnAtomStrings.js';
import BAAConstants from '../BAAConstants.js';
import BAAModel from '../model/BAAModel.js';
import AtomViewProperties from './AtomViewProperties.js';
import BAAParticleView from './BAAParticleView.js';
import BuildAnAtomAccordionBox, { BuildAnAtomAccordionBoxOptions } from './BuildAnAtomAccordionBox.js';
import AtomViewDescriber from './description/AtomViewDescriber.js';
import ElectronModelControl from './ElectronModelControl.js';

// constants
const CONTROLS_INSET = 10;
const LABEL_CONTROL_FONT = new PhetFont( 12 );
const LABEL_CONTROL_MAX_WIDTH = 180;

class BAAScreenView extends ScreenView {

  protected readonly periodicTableAccordionBox: BuildAnAtomAccordionBox;
  protected readonly accordionBoxes: VBox;

  // Properties that control how the atom is displayed.
  private readonly viewProperties: AtomViewProperties;

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

    this.viewProperties = new AtomViewProperties( tandem.createTandem( 'viewProperties' ) );

    // Create the model-view transform.
    const modelViewTransform = ModelViewTransform2.createSinglePointScaleInvertedYMapping(
      Vector2.ZERO,
      new Vector2( this.layoutBounds.width * 0.3, this.layoutBounds.height * 0.45 ),
      1.0
    );

    // Add the node that shows the textual labels, the electron shells, and the center X marker.
    const atomNode = new AtomNode( model.atom, modelViewTransform, combineOptions<AtomNodeOptions>( {
      showElementNameProperty: this.viewProperties.elementNameVisibleProperty,
      showNeutralOrIonProperty: this.viewProperties.neutralAtomOrIonVisibleProperty,
      showStableOrUnstableProperty: this.viewProperties.nuclearStabilityVisibleProperty,
      electronShellDepictionProperty: this.viewProperties.electronModelProperty,
      tandem: tandem.createTandem( 'atomNode' ),
      phetioVisiblePropertyInstrumented: false,
      phetioFeatured: true,
      focusable: false
    }, AccessibleInteractiveOptions ) );
    this.addChild( atomNode );

    // Add the particle count indicator.
    const particleCountDisplay = new ParticleCountDisplay( model.atom, {
      top: CONTROLS_INSET,
      left: CONTROLS_INSET,
      tandem: tandem.createTandem( 'particleCountDisplay' )
    } );
    this.addChild( particleCountDisplay );

    // Add the bucket holes.  Done separately from the bucket front for layering.
    _.each( model.buckets, bucket => {
      this.addChild( new BucketHole( bucket, modelViewTransform, {
        pickable: false
      } ) );
    } );

    // Add the layer where the nucleons and electrons will go.
    const particleLayer = new Node();

    const protonsGroupTandem = tandem.createTandem( 'protonNodes' ).createGroupTandem( 'protonNode', 1 );
    const neutronsGroupTandem = tandem.createTandem( 'neutronNodes' ).createGroupTandem( 'neutronNode', 1 );
    const electronsGroupTandem = tandem.createTandem( 'electronNodes' ).createGroupTandem( 'electronNode', 1 );

    const particleDragBounds = modelViewTransform.viewToModelBounds( this.layoutBounds );

    // Create a map that associates particles with their views for quick lookup.
    const mapParticlesToViews: Map<Particle, ParticleView> = new Map<Particle, ParticleView>();

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
      mapParticlesToViews.set( particle, particleView );

      const bucketsAsParticleContainers: ParticleContainer<Particle>[] = model.buckets;

      // The particle view will either be a child of this screen view or a child of the atom node, based on its state.
      // The following listener moves it back and forth as needed.  It's necessary to change parent nodes like this to
      // support alt-input group behavior in the atom node.
      Multilink.multilink(
        [ particle.containerProperty, particle.isDraggingProperty ],
        ( container, isDragging ) => {

          const isParticleNodeChildOfScreenView = particleView.parent === particleLayer;

          if ( isParticleNodeChildOfScreenView && ( container === model.atom || isDragging ) ) {

            // Move the particle view to the atom node.
            particleLayer.removeChild( particleView );
            atomNode.addParticleView( particleView );
          }
          else if ( !isParticleNodeChildOfScreenView &&
                    ( ( container !== null && bucketsAsParticleContainers.includes( container ) ) ||
                      ( container === null && !isDragging ) ) ) {

            // Move the particle view to this screen view.
            atomNode.removeParticleView( particleView );
            particleLayer.addChild( particleView );
          }
        }
      );
    } );

    // The following code manages the visibility of the individual electron particles.  When the electrons are
    // represented as a cloud, the individual particles become invisible when added to the atom, but remain visible when
    // outside the atom.
    const updateElectronViewVisibility = () => {
      model.electrons.forEach( electron => {
        const electronView = mapParticlesToViews.get( electron );
        affirm( electronView, 'Missing ParticleView for electron' );
        const isElectronInAtom = model.atom.electrons.includes( electron );
        electronView.visible = this.viewProperties.electronModelProperty.value === 'shells' ||
                               electron.isDraggingProperty.value ||
                               !isElectronInAtom;
      } );
    };
    model.atom.electrons.lengthProperty.link( updateElectronViewVisibility );
    this.viewProperties.electronModelProperty.link( updateElectronViewVisibility );

    // Add the front portion of the buckets. This is done separately from the bucket holes for layering purposes.
    const bucketFrontLayer = new Node();

    const bucketsTandem = tandem.createTandem( 'buckets' );
    for ( const bucket of model.buckets ) {
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
        tagName: 'button'
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

      // Define a function that will find the view for a given particle.  Returns null if not found.
      const findParticleView = ( particle: Particle ): ParticleView | null => {
        let particleView = null;
        for ( const node of particleLayer.children ) {
          if ( node instanceof ParticleView && node.particle === particle ) {
            particleView = node;
            break;
          }
        }
        if ( !particleView ) {
          particleView = atomNode.getParticleView( particle );
        }
        return particleView;
      };

      // Add an input listener for accessibility that will be fired when the user presses enter or space while the
      // bucket has focus.  This will extract a particle from the bucket and add it to the atom.
      bucketFront.addInputListener( {
        click: () => {
          const particle = bucket.extractClosestParticle( model.atom.positionProperty.value );
          if ( particle !== null ) {

            // Mark the particle as being controlled by the user via keyboard interaction.
            particle.isDraggingProperty.value = true;

            // Position the particle just below the center of the atom.
            particle.setPositionAndDestination( model.atom.positionProperty.value.plusXY( 0, -40 ) );

            // Get the view node that is associated with this particle.
            const particleView = findParticleView( particle );
            affirm( particleView !== null, 'ParticleView not found for extracted particle' );

            // Set the focus to the particle's view so that it can be manipulated via keyboard.
            particleView.focusable = true;
            particleView.focus();
          }
        }
      } );
    }

    const periodicTableAccessibleParagraphProperty = new DerivedStringProperty(
      [
        model.atom.protonCountProperty,
        BuildAnAtomStrings.a11y.common.mathSpeakUpperStringProperty,
        BuildAnAtomStrings.a11y.atomScreen.periodicTable.accessibleParagraphHighlightedStringProperty,
        BuildAnAtomStrings.a11y.atomScreen.periodicTable.accessibleParagraphNoSymbolStringProperty
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

        accessibleName: BuildAnAtomStrings.a11y.atomScreen.periodicTable.accessibleNameStringProperty,
        accessibleHelpTextExpanded: periodicTableAccessibleParagraphProperty
      }, BAAConstants.ACCORDION_BOX_OPTIONS ) );

    this.accordionBoxes = new VBox( {
      children: [ this.periodicTableAccordionBox ],
      spacing: 7
    } );
    this.addChild( this.accordionBoxes );
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
          accessibleName: BuildAnAtomStrings.a11y.atomScreen.elementNameCheckbox.accessibleNameStringProperty,
          accessibleHelpText: BuildAnAtomStrings.a11y.atomScreen.elementNameCheckbox.accessibleHelpTextStringProperty,
          accessibleContextResponseUnchecked: BuildAnAtomStrings.a11y.atomScreen.elementNameCheckbox.accessibleContextResponseUncheckedStringProperty,

          // TODO: Should this use addAccessibleContextResponse()? https://github.com/phetsims/build-an-atom/issues/351
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
          accessibleName: BuildAnAtomStrings.a11y.atomScreen.neutralAtomIonCheckbox.accessibleNameStringProperty,
          accessibleHelpText: BuildAnAtomStrings.a11y.atomScreen.neutralAtomIonCheckbox.accessibleHelpTextStringProperty,
          accessibleContextResponseUnchecked: BuildAnAtomStrings.a11y.atomScreen.neutralAtomIonCheckbox.accessibleContextResponseUncheckedStringProperty,

          // TODO: Should this use addAccessibleContextResponse()? https://github.com/phetsims/build-an-atom/issues/351
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
          accessibleName: BuildAnAtomStrings.a11y.atomScreen.nuclearStabilityCheckbox.accessibleNameStringProperty,
          accessibleHelpText: BuildAnAtomStrings.a11y.atomScreen.nuclearStabilityCheckbox.accessibleHelpTextStringProperty,
          accessibleContextResponseUnchecked: BuildAnAtomStrings.a11y.atomScreen.nuclearStabilityCheckbox.accessibleContextResponseUncheckedStringProperty,

          // TODO: Should this use addAccessibleContextResponse()? https://github.com/phetsims/build-an-atom/issues/351
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
    this.addChild( checkboxGroup );

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
    this.addChild( electronModelControl );

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
    this.addChild( resetAllButton );

    // Do the layout.
    this.accordionBoxes.top = CONTROLS_INSET;
    this.accordionBoxes.right = this.layoutBounds.maxX - CONTROLS_INSET;
    checkboxGroup.left = this.accordionBoxes.left;
    checkboxGroup.bottom = this.layoutBounds.height - 2 * CONTROLS_INSET;
    electronModelControl.left = atomNode.centerX + 130;
    electronModelControl.bottom = atomNode.bottom + 5;

    this.addChild( particleLayer );
    this.addChild( bucketFrontLayer );

    // pdom - set navigation order for the Atom screen view
    this.pdomPlayAreaNode.pdomOrder = [
      bucketFrontLayer,
      atomNode,
      electronModelControl,
      this.periodicTableAccordionBox
    ];
  }

  public reset(): void {
    this.periodicTableAccordionBox.expandedProperty.reset();
    this.viewProperties.reset();
  }
}

buildAnAtom.register( 'BAAScreenView', BAAScreenView );
export default BAAScreenView;