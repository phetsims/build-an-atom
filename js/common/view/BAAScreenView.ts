// Copyright 2013-2025, University of Colorado Boulder

/**
 * ScreenView that presents an interactive atom on the left side, buckets of particles underneath, and controls for
 * label visibility and reset.  A periodic table is included on the right side.  This is intended to be used as a base
 * class for screens with similar views.
 *
 * @author John Blanco
 * @author Aadish Gupta
 */

import Bounds2 from '../../../../dot/js/Bounds2.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import ScreenView from '../../../../joist/js/ScreenView.js';
import affirm from '../../../../perennial-alias/js/browser-and-node/affirm.js';
import { combineOptions } from '../../../../phet-core/js/optionize.js';
import ModelViewTransform2 from '../../../../phetcommon/js/view/ModelViewTransform2.js';
import BucketFront from '../../../../scenery-phet/js/bucket/BucketFront.js';
import BucketHole from '../../../../scenery-phet/js/bucket/BucketHole.js';
import ResetAllButton from '../../../../scenery-phet/js/buttons/ResetAllButton.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import VBox from '../../../../scenery/js/layout/nodes/VBox.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import Text from '../../../../scenery/js/nodes/Text.js';
import Particle from '../../../../shred/js/model/Particle.js';
import ShredConstants from '../../../../shred/js/ShredConstants.js';
import AtomNode from '../../../../shred/js/view/AtomNode.js';
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

  public constructor( model: BAAModel, tandem: Tandem ) {

    super( {

      // A PhET-wide decision was made to not update custom layout bounds even if they do not match the default layout
      // bounds in ScreenView. Do not change these bounds as changes could break or disturb any phet-io instrumentation.
      // See https://github.com/phetsims/phet-io/issues/1939.
      layoutBounds: new Bounds2( 0, 0, 768, 464 ),

      tandem: tandem,
      phetioVisiblePropertyInstrumented: false

    } );

    this.viewProperties = new AtomViewProperties( tandem.createTandem( 'viewProperties' ) );

    // Create the model-view transform.
    const modelViewTransform = ModelViewTransform2.createSinglePointScaleInvertedYMapping(
      Vector2.ZERO,
      new Vector2( this.layoutBounds.width * 0.3, this.layoutBounds.height * 0.45 ),
      1.0
    );

    // Add the node that shows the textual labels, the electron shells, and the center X marker.
    const atomNode = new AtomNode( model.atom, modelViewTransform, {
      showElementNameProperty: this.viewProperties.elementNameVisibleProperty,
      showNeutralOrIonProperty: this.viewProperties.neutralAtomOrIonVisibleProperty,
      showStableOrUnstableProperty: this.viewProperties.nuclearStabilityVisibleProperty,
      electronShellDepictionProperty: this.viewProperties.electronModelProperty,
      tandem: tandem.createTandem( 'atomNode' ),
      phetioVisiblePropertyInstrumented: false,
      phetioFeatured: true
    } );
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

    // Add the layer where the nucleons and electrons will go, this is added last so that it remains on top.
    const nucleonElectronLayer = new Node();

    // Add the layers where the nucleons will exist.  The lower the index number, the closer to the front.  Layer 0 is
    // reserved for nucleons that are being dragged.
    const nucleonLayers: Node[] = [];
    _.times( BAAModel.NUMBER_OF_NUCLEON_LAYERS, () => {
      const nucleonLayer = new Node();
      nucleonLayers.push( nucleonLayer );
      nucleonElectronLayer.addChild( nucleonLayer );
    } );
    nucleonLayers.reverse(); // Set up the nucleon layers so that layer 0 is in front.

    // Add the layer where the electrons will exist.
    const electronLayer = new Node();
    nucleonElectronLayer.addChild( electronLayer );

    // Add the nucleon particle views.
    const protonsGroupTandem = tandem.createTandem( 'protonNodes' ).createGroupTandem( 'protonNode', 1 );
    const neutronsGroupTandem = tandem.createTandem( 'neutronNodes' ).createGroupTandem( 'neutronNode', 1 );
    const electronsGroupTandem = tandem.createTandem( 'electronNodes' ).createGroupTandem( 'electronNode', 1 );

    // Add the nucleons.
    const particleDragBounds = modelViewTransform.viewToModelBounds( this.layoutBounds );

    model.nucleons.forEach( nucleon => {

      assert && assert( nucleon.type === 'proton' || nucleon.type === 'neutron', 'this is not a nucleon' );

      nucleonLayers[ nucleon.zLayerProperty.value ].addChild( new BAAParticleView( nucleon, modelViewTransform, {
        dragBounds: particleDragBounds,
        tandem: nucleon.type === 'proton' ?
                protonsGroupTandem.createNextTandem() :
                neutronsGroupTandem.createNextTandem()
      } ) );

      // Add a listener that adjusts a nucleon's z-order layering.
      nucleon.zLayerProperty.link( zLayer => {
        assert && assert(
          nucleonLayers.length > zLayer,
          'zLayer for nucleon exceeds number of layers, max number may need increasing.'
        );

        // Determine whether nucleon view is on the correct layer.
        let onCorrectLayer = false;
        nucleonLayers[ zLayer ].children.forEach( particleView => {
          affirm( particleView instanceof ParticleView, 'Nucleon layers should only contain ParticleView instance' );
          if ( particleView.particle === nucleon ) {
            onCorrectLayer = true;
          }
        } );

        if ( !onCorrectLayer ) {

          // Remove particle view from its current layer.
          let particleView = null;
          for ( let layerIndex = 0; layerIndex < nucleonLayers.length && particleView === null; layerIndex++ ) {
            for ( let childIndex = 0; childIndex < nucleonLayers[ layerIndex ].children.length; childIndex++ ) {
              const nucleonChild = nucleonLayers[ layerIndex ].children[ childIndex ];

              affirm( nucleonChild instanceof ParticleView, 'nucleonLayers should only contain ParticleView instances' );
              if ( nucleonChild.particle === nucleon ) {
                particleView = nucleonLayers[ layerIndex ].children[ childIndex ];
                nucleonLayers[ layerIndex ].removeChildAt( childIndex );
                break;
              }
            }
          }

          // Add the particle view to its new layer.
          affirm( particleView !== null, 'Particle view not found during re-layering' );
          nucleonLayers[ zLayer ].addChild( particleView );
        }
      } );
    } );

    // Add the electron particle views.
    model.electrons.forEach( ( electron: Particle ) => {
      const electronNode = new BAAParticleView( electron, modelViewTransform, {
        dragBounds: particleDragBounds,
        tandem: electronsGroupTandem.createNextTandem()
      } );
      electronLayer.addChild( electronNode );

      electron.zLayerProperty.link( zLayer => {
        if ( zLayer === 0 ) {
          electronNode.moveToFront();
        }
      } );
    } );

    // When the electrons are represented as a cloud, the individual particles become invisible when added to the atom.
    const updateElectronVisibility = () => {
      electronLayer.getChildren().forEach( electronNode => {
        affirm( electronNode instanceof ParticleView, 'electronLayer should only contain ParticleView instances' );
        electronNode.visible = this.viewProperties.electronModelProperty.value === 'orbits' ||
                               !model.atom.electrons.includes( electronNode.particle );
      } );
    };
    model.atom.electrons.lengthProperty.link( updateElectronVisibility );
    this.viewProperties.electronModelProperty.link( updateElectronVisibility );

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
      bucketFrontLayer.addChild( bucketFront );
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
      bucketFront.addInputListener( {
        click: () => {
          const activeParticle = bucket.extractClosestParticle( bucket.position );
          if ( activeParticle !== null ) {
            activeParticle.isDraggingProperty.value = true;
          }
        }
      } );
    }

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

        // TODO: Add dynamic context response https://github.com/phetsims/build-an-atom/issues/351
        accessibleName: BuildAnAtomStrings.a11y.atomScreen.periodicTable.accessibleNameStringProperty
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

    this.addChild( nucleonElectronLayer );
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