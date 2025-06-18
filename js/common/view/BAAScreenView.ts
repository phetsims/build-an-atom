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
import SphereBucket from '../../../../phetcommon/js/model/SphereBucket.js';
import ModelViewTransform2 from '../../../../phetcommon/js/view/ModelViewTransform2.js';
import BucketFront from '../../../../scenery-phet/js/bucket/BucketFront.js';
import BucketHole from '../../../../scenery-phet/js/bucket/BucketHole.js';
import ResetAllButton from '../../../../scenery-phet/js/buttons/ResetAllButton.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import SceneryEvent from '../../../../scenery/js/input/SceneryEvent.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import Text from '../../../../scenery/js/nodes/Text.js';
import Particle from '../../../../shred/js/model/Particle.js';
import ShredConstants from '../../../../shred/js/ShredConstants.js';
import AtomNode from '../../../../shred/js/view/AtomNode.js';
import BucketDragListener from '../../../../shred/js/view/BucketDragListener.js';
import ParticleCountDisplay from '../../../../shred/js/view/ParticleCountDisplay.js';
import ParticleView from '../../../../shred/js/view/ParticleView.js';
import AccordionBox from '../../../../sun/js/AccordionBox.js';
import AquaRadioButton from '../../../../sun/js/AquaRadioButton.js';
import Panel from '../../../../sun/js/Panel.js';
import VerticalCheckboxGroup from '../../../../sun/js/VerticalCheckboxGroup.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import PeriodicTableAndSymbol from '../../atom/view/PeriodicTableAndSymbol.js';
import buildAnAtom from '../../buildAnAtom.js';
import BuildAnAtomStrings from '../../BuildAnAtomStrings.js';
import BAAColors from '../BAAColors.js';
import BAAConstants from '../BAAConstants.js';
import BAAQueryParameters from '../BAAQueryParameters.js';
import BuildAnAtomModel from '../model/BuildAnAtomModel.js';

// constants
const CONTROLS_INSET = 10;
const LABEL_CONTROL_FONT = new PhetFont( 12 );
const LABEL_CONTROL_MAX_WIDTH = 180;
const ELECTRON_VIEW_CONTROL_FONT = new PhetFont( 12 );
const ELECTRON_VIEW_CONTROL_MAX_WIDTH = 60;
const NUM_NUCLEON_LAYERS = 5; // This is based on max number of particles, and may need adjustment if that changes.

class BAAScreenView extends ScreenView {

  public readonly periodicTableAccordionBox: AccordionBox;
  public readonly controlPanelLayer: Node;
  public readonly model: BuildAnAtomModel;
  private readonly resetFunctions: ( () => void )[];

  public static readonly NUM_NUCLEON_LAYERS = NUM_NUCLEON_LAYERS;

  public constructor( model: BuildAnAtomModel, tandem: Tandem ) {

    super( {

      // A PhET wide decision was made to not update custom layout bounds even if they do not match the
      // default layout bounds in ScreenView. Do not change these bounds as changes could break or disturb
      // any phet-io instrumentation. https://github.com/phetsims/phet-io/issues/1939
      layoutBounds: new Bounds2( 0, 0, 768, 464 ),
      tandem: tandem,
      phetioVisiblePropertyInstrumented: false

    } );

    this.model = model;
    this.resetFunctions = [];

    // Create the model-view transform.
    const modelViewTransform = ModelViewTransform2.createSinglePointScaleInvertedYMapping(
      Vector2.ZERO,
      new Vector2( this.layoutBounds.width * 0.3, this.layoutBounds.height * 0.45 ),
      1.0 );

    // Add the node that shows the textual labels, the electron shells, and the center X marker.
    const atomNode = new AtomNode( model.particleAtom, modelViewTransform, {
      showElementNameProperty: model.showElementNameProperty,
      showNeutralOrIonProperty: model.showNeutralOrIonProperty,
      showStableOrUnstableProperty: model.showStableOrUnstableProperty,
      electronShellDepictionProperty: model.electronShellDepictionProperty,
      tandem: tandem.createTandem( 'atomNode' ),
      phetioVisiblePropertyInstrumented: false
    } );
    this.addChild( atomNode );

    // Add the bucket holes.  Done separately from the bucket front for layering.
    _.each( model.buckets, bucket => {
      this.addChild( new BucketHole( bucket, modelViewTransform, {
        pickable: false
      } ) );
    } );

    // add the layer where the nucleons and electrons will go, this is added last so that it remains on top
    const nucleonElectronLayer = new Node();

    // Add the layers where the nucleons will exist.
    const nucleonLayers: Node[] = [];
    _.times( NUM_NUCLEON_LAYERS, () => {
      const nucleonLayer = new Node();
      nucleonLayers.push( nucleonLayer );
      nucleonElectronLayer.addChild( nucleonLayer );
    } );
    nucleonLayers.reverse(); // Set up the nucleon layers so that layer 0 is in front.

    // Add the layer where the electrons will exist.
    const electronLayer = new Node( { layerSplit: true } );
    nucleonElectronLayer.addChild( electronLayer );

    // Add the nucleon particle views.
    const nucleonsGroupTandem = tandem.createTandem( 'nucleons' ).createGroupTandem( 'nucleon', 0 );
    const electronsGroupTandem = tandem.createTandem( 'electrons' ).createGroupTandem( 'electron', 0 );

    // add the nucleons
    const particleDragBounds = modelViewTransform.viewToModelBounds( this.layoutBounds );
    model.nucleons.forEach( ( nucleon: Particle ) => {
      nucleonLayers[ nucleon.zLayerProperty.get() ].addChild( new ParticleView( nucleon, modelViewTransform, {
        dragBounds: particleDragBounds,
        tandem: nucleonsGroupTandem.createNextTandem(),
        phetioVisiblePropertyInstrumented: false
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
          if ( particleView instanceof ParticleView && particleView.particle === nucleon ) {
            onCorrectLayer = true;
          }
        } );

        if ( !onCorrectLayer ) {

          // Remove particle view from its current layer.
          let particleView = null;
          for ( let layerIndex = 0; layerIndex < nucleonLayers.length && particleView === null; layerIndex++ ) {
            for ( let childIndex = 0; childIndex < nucleonLayers[ layerIndex ].children.length; childIndex++ ) {
              const nucleonChild = nucleonLayers[ layerIndex ].children[ childIndex ];
              if ( nucleonChild instanceof ParticleView && nucleonChild.particle === nucleon ) {
                particleView = nucleonLayers[ layerIndex ].children[ childIndex ];
                nucleonLayers[ layerIndex ].removeChildAt( childIndex );
                break;
              }
            }
          }

          // Add the particle view to its new layer.
          assert && assert( particleView !== null, 'Particle view not found during relayering' );
          particleView && nucleonLayers[ zLayer ].addChild( particleView );
        }
      } );
    } );

    // Add the electron particle views.
    model.electrons.forEach( electron => {
      electronLayer.addChild( new ParticleView( electron, modelViewTransform, {
        dragBounds: particleDragBounds,
        tandem: electronsGroupTandem.createNextTandem(),
        phetioVisiblePropertyInstrumented: false
      } ) );
    } );

    // When the electrons are represented as a cloud, the individual particles become invisible when added to the atom.
    const updateElectronVisibility = () => {
      electronLayer.getChildren().forEach( electronNode => {
        if ( electronNode instanceof ParticleView ) {
          electronNode.visible = model.electronShellDepictionProperty.get() === 'orbits' || !model.particleAtom.electrons.includes( electronNode.particle );
        }
      } );
    };
    model.particleAtom.electrons.lengthProperty.link( updateElectronVisibility );
    model.electronShellDepictionProperty.link( updateElectronVisibility );

    // Add the front portion of the buckets. This is done separately from the bucket holes for layering purposes.
    const bucketFrontLayer = new Node();

    const dragListenersTandem = tandem.createTandem( 'bucketDragListeners' );

    _.each( model.buckets, ( bucket: SphereBucket<Particle> ) => {
      const bucketFront = new BucketFront( bucket, modelViewTransform, {
        tandem: Tandem.OPT_OUT,
        labelNode: new Panel(
          new Text( bucket.captionText, {
            font: new PhetFont( 20 ),
            fill: bucket.captionColor
          } ), {
            fill: BAAColors.bucketTextBackgroundColorProperty,
            cornerRadius: 0,
            stroke: null,
            xMargin: 0,
            yMargin: 0
          }
        ),
        // pdom
        tagName: 'button',
        focusable: true
      } );
      bucketFrontLayer.addChild( bucketFront );
      bucketFront.addInputListener( new BucketDragListener( bucket, bucketFront, modelViewTransform, {
        tandem: dragListenersTandem.createTandem( `${bucket.sphereBucketTandem.name}DragListener` )
      } ) );
      bucketFront.addInputListener( {
        click: ( event: SceneryEvent ) => {
          const activeParticle = bucket.extractClosestParticle( bucket.position );
          if ( activeParticle !== null ) {
            activeParticle.userControlledProperty.set( true );
          }
        }
      } );
    } );

    // Add the particle count indicator.
    const particleCountDisplay = new ParticleCountDisplay( model.particleAtom, 13, 250, {
      tandem: tandem.createTandem( 'particleCountDisplay' )
    } );  // Width arbitrarily chosen.
    this.addChild( particleCountDisplay );

    // Add the periodic table display inside of an accordion box.
    const periodicTableAndSymbol = new PeriodicTableAndSymbol(
      model.particleAtom,
      {
        pickable: false
      }
    );
    periodicTableAndSymbol.scale( 0.55 ); // Scale empirically determined to match layout in design doc.
    const periodicTableAccordionBoxTandem = tandem.createTandem( 'periodicTableAccordionBox' );
    this.periodicTableAccordionBox = new AccordionBox( periodicTableAndSymbol, {
      cornerRadius: 3,
      titleNode: new Text( BuildAnAtomStrings.elementStringProperty, {
        font: ShredConstants.ACCORDION_BOX_TITLE_FONT,
        maxWidth: ShredConstants.ACCORDION_BOX_TITLE_MAX_WIDTH,
        tandem: periodicTableAccordionBoxTandem.createTandem( 'titleText' )
      } ),
      fill: ShredConstants.DISPLAY_PANEL_BACKGROUND_COLOR,
      contentAlign: 'left',
      titleAlignX: 'left',
      buttonAlign: 'right',
      expandedDefaultValue: true,
      expandCollapseButtonOptions: {
        touchAreaXDilation: 12,
        touchAreaYDilation: 12
      },

      // phet-io
      tandem: periodicTableAccordionBoxTandem,

      // pdom
      labelContent: BuildAnAtomStrings.elementStringProperty
    } );
    this.addChild( this.periodicTableAccordionBox );

    const labelVisibilityControlsTandem = tandem.createTandem( 'labelVisibilityControls' );
    const checkboxItems = [ {
      createNode: ( tandem: Tandem ) => new Text( BuildAnAtomStrings.elementStringProperty, {
        font: LABEL_CONTROL_FONT,
        maxWidth: LABEL_CONTROL_MAX_WIDTH,
        tandem: labelVisibilityControlsTandem.createTandem( 'elementText' )
      } ),
      property: model.showElementNameProperty,
      tandemName: 'showElementNameCheckbox'
    }, {
      createNode: ( tandem: Tandem ) => new Text( BuildAnAtomStrings.neutralSlashIonStringProperty, {
        font: LABEL_CONTROL_FONT,
        maxWidth: LABEL_CONTROL_MAX_WIDTH,
        tandem: labelVisibilityControlsTandem.createTandem( 'neutralOrIonText' )
      } ),
      property: model.showNeutralOrIonProperty,
      tandemName: 'showNeutralOrIonCheckbox'
    } ];

    // In support of a research study, it is possible to exclude the stable/unstable checkbox, see
    // https://github.com/phetsims/special-ops/issues/189.
    if ( BAAQueryParameters.showStableUnstableCheckbox ) {
      checkboxItems.push( {
        createNode: ( tandem: Tandem ) => new Text( BuildAnAtomStrings.stableSlashUnstableStringProperty, {
          font: LABEL_CONTROL_FONT,
          maxWidth: LABEL_CONTROL_MAX_WIDTH,
          tandem: labelVisibilityControlsTandem.createTandem( 'stableUnstableText' )
        } ),
        property: model.showStableOrUnstableProperty,
        tandemName: 'showStableOrUnstableCheckbox'
      } );
    }

    const labelVisibilityCheckboxGroup = new VerticalCheckboxGroup( checkboxItems, {
      checkboxOptions: { boxWidth: 12 },
      spacing: 8,
      tandem: Tandem.OPT_OUT
    } );
    this.addChild( labelVisibilityCheckboxGroup );

    // Add the radio buttons that control the electron representation in the atom.
    const radioButtonRadius = 6;
    const orbitsRadioButtonTandem = tandem.createTandem( 'orbitsRadioButton' );
    const orbitsRadioButton = new AquaRadioButton(
      model.electronShellDepictionProperty,
      'orbits',
      new Text( BuildAnAtomStrings.orbitsStringProperty, {
          font: ELECTRON_VIEW_CONTROL_FONT,
          maxWidth: ELECTRON_VIEW_CONTROL_MAX_WIDTH,
          tandem: orbitsRadioButtonTandem.createTandem( 'orbitsText' )
        }
      ),
      { radius: radioButtonRadius, tandem: orbitsRadioButtonTandem }
    );
    const cloudRadioButtonTandem = tandem.createTandem( 'cloudRadioButton' );
    const cloudRadioButton = new AquaRadioButton(
      model.electronShellDepictionProperty,
      'cloud',
      new Text( BuildAnAtomStrings.cloudStringProperty, {
        font: ELECTRON_VIEW_CONTROL_FONT,
        maxWidth: ELECTRON_VIEW_CONTROL_MAX_WIDTH,
        tandem: cloudRadioButtonTandem.createTandem( 'cloudText' )
      } ),
      { radius: radioButtonRadius, tandem: cloudRadioButtonTandem }
    );
    const electronViewButtonGroup = new Node( { tandem: tandem.createTandem( 'electronViewButtonGroup' ) } );
    electronViewButtonGroup.addChild( new Text( BuildAnAtomStrings.modelStringProperty, {
      font: new PhetFont( {
        size: 14,
        weight: 'bold'
      } ),
      maxWidth: ELECTRON_VIEW_CONTROL_MAX_WIDTH + 20,
      tandem: tandem.createTandem( 'electronViewButtonGroupLabelText' )
    } ) );
    orbitsRadioButton.top = electronViewButtonGroup.bottom + 5;
    orbitsRadioButton.left = electronViewButtonGroup.left;
    electronViewButtonGroup.addChild( orbitsRadioButton );
    cloudRadioButton.top = electronViewButtonGroup.bottom + 5;
    cloudRadioButton.left = electronViewButtonGroup.left;
    electronViewButtonGroup.addChild( cloudRadioButton );
    this.addChild( electronViewButtonGroup );

    // Add the reset button.
    const resetAllButton = new ResetAllButton( {
      listener: () => {
        this.model.reset();
        this.reset();
      },
      right: this.layoutBounds.maxX - CONTROLS_INSET,
      bottom: this.layoutBounds.maxY - CONTROLS_INSET,
      radius: BAAConstants.RESET_BUTTON_RADIUS,
      tandem: tandem.createTandem( 'resetAllButton' )
    } );
    this.addChild( resetAllButton );

    // Do the layout.
    particleCountDisplay.top = CONTROLS_INSET;
    particleCountDisplay.left = CONTROLS_INSET;
    this.periodicTableAccordionBox.top = CONTROLS_INSET;
    this.periodicTableAccordionBox.right = this.layoutBounds.maxX - CONTROLS_INSET;
    labelVisibilityCheckboxGroup.left = this.periodicTableAccordionBox.left;
    labelVisibilityCheckboxGroup.bottom = this.layoutBounds.height - 2 * CONTROLS_INSET;
    electronViewButtonGroup.left = atomNode.right + 30;
    electronViewButtonGroup.bottom = atomNode.bottom + 5;

    // Any other objects added by class calling it will be added in this node for layering purposes
    this.controlPanelLayer = new Node();
    this.addChild( this.controlPanelLayer );

    this.addChild( nucleonElectronLayer );
    this.addChild( bucketFrontLayer );

    // pdom - set navigation order for the Atom screen view
    this.pdomPlayAreaNode.pdomOrder = [
      bucketFrontLayer,
      atomNode,
      electronViewButtonGroup,
      this.periodicTableAccordionBox
    ];
  }

  public reset(): void {
    this.periodicTableAccordionBox.expandedProperty.reset();
  }
}

buildAnAtom.register( 'BAAScreenView', BAAScreenView );
export default BAAScreenView;