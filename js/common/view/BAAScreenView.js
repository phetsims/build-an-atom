// Copyright 2013-2022, University of Colorado Boulder

/**
 * ScreenView that presents an interactive atom on the left side, buckets of particles underneath, and controls for
 * label visibility and reset.  A periodic table is included on the right side.  This is intended to be used as a base
 * class for screens with similar views.
 *
 * @author John Blanco
 * @author Aadish Gupta
 */

import BooleanProperty from '../../../../axon/js/BooleanProperty.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import ScreenView from '../../../../joist/js/ScreenView.js';
import { Shape } from '../../../../kite/js/imports.js';
import ModelViewTransform2 from '../../../../phetcommon/js/view/ModelViewTransform2.js';
import BucketFront from '../../../../scenery-phet/js/bucket/BucketFront.js';
import BucketHole from '../../../../scenery-phet/js/bucket/BucketHole.js';
import ResetAllButton from '../../../../scenery-phet/js/buttons/ResetAllButton.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import { Node, Path, Text } from '../../../../scenery/js/imports.js';
import ShredConstants from '../../../../shred/js/ShredConstants.js';
import AtomNode from '../../../../shred/js/view/AtomNode.js';
import BucketDragListener from '../../../../shred/js/view/BucketDragListener.js';
import ParticleCountDisplay from '../../../../shred/js/view/ParticleCountDisplay.js';
import ParticleView from '../../../../shred/js/view/ParticleView.js';
import AccordionBox from '../../../../sun/js/AccordionBox.js';
import AquaRadioButton from '../../../../sun/js/AquaRadioButton.js';
import Panel from '../../../../sun/js/Panel.js';
import VerticalCheckboxGroup from '../../../../sun/js/VerticalCheckboxGroup.js';
import PeriodicTableAndSymbol from '../../atom/view/PeriodicTableAndSymbol.js';
import buildAnAtom from '../../buildAnAtom.js';
import BuildAnAtomStrings from '../../BuildAnAtomStrings.js';
import BAAGlobalPreferences from '../BAAGlobalPreferences.js';
import BAAQueryParameters from '../BAAQueryParameters.js';
import BAASharedConstants from '../BAASharedConstants.js';

// strings
const cloudString = BuildAnAtomStrings.cloud;
const elementString = BuildAnAtomStrings.element;
const modelString = BuildAnAtomStrings.model;
const neutralSlashIonString = BuildAnAtomStrings.neutralSlashIon;
const orbitsString = BuildAnAtomStrings.orbits;
const showString = BuildAnAtomStrings.show;
const stableSlashUnstableString = BuildAnAtomStrings.stableSlashUnstable;

// constants
const CONTROLS_INSET = 10;
const LABEL_CONTROL_FONT = new PhetFont( 12 );
const LABEL_CONTROL_MAX_WIDTH = 180;
const LABEL_CONTROL_LINE_WIDTH = 1;
const ELECTRON_VIEW_CONTROL_FONT = new PhetFont( 12 );
const ELECTRON_VIEW_CONTROL_MAX_WIDTH = 60;
const NUM_NUCLEON_LAYERS = 5; // This is based on max number of particles, may need adjustment if that changes.

class BAAScreenView extends ScreenView {

  /**
   * @param {BuildAnAtomModel} model
   * @param {Tandem} tandem
   */
  constructor( model, tandem ) {

    super( {
      layoutBounds: ShredConstants.LAYOUT_BOUNDS,
      tandem: tandem
    } );

    this.model = model;
    this.resetFunctions = [];

    // @protected
    this.periodicTableAccordionBoxExpandedProperty = new BooleanProperty( true, {
      tandem: tandem.createTandem( 'periodicTableAccordionBoxExpandedProperty' )
    } );

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
      tandem: tandem.createTandem( 'atomNode' )
    } );
    this.addChild( atomNode );

    // Add the bucket holes.  Done separately from the bucket front for layering.
    _.each( model.buckets, bucket => {
      this.addChild( new BucketHole( bucket, modelViewTransform, {
        pickable: false,
        tandem: tandem.createTandem( `${bucket.sphereBucketTandem.name}Hole` )
      } ) );
    } );

    // add the layer where the nucleons and electrons will go, this is added last so that it remains on top
    const nucleonElectronLayer = new Node( { tandem: tandem.createTandem( 'nucleonElectronLayer' ) } );

    // Add the layers where the nucleons will exist.
    const nucleonLayers = [];
    _.times( NUM_NUCLEON_LAYERS, () => {
      const nucleonLayer = new Node();
      nucleonLayers.push( nucleonLayer );
      nucleonElectronLayer.addChild( nucleonLayer );
    } );
    nucleonLayers.reverse(); // Set up the nucleon layers so that layer 0 is in front.

    // Add the layer where the electrons will exist.
    const electronLayer = new Node( { layerSplit: true, tandem: tandem.createTandem( 'electronLayer' ) } );
    nucleonElectronLayer.addChild( electronLayer );

    // Add the nucleon particle views.
    const nucleonsGroupTandem = tandem.createTandem( 'nucleons' ).createGroupTandem( 'nucleon' );
    const electronsGroupTandem = tandem.createTandem( 'electrons' ).createGroupTandem( 'electron' );

    // add the nucleons
    const particleDragBounds = modelViewTransform.viewToModelBounds( this.layoutBounds );
    model.nucleons.forEach( nucleon => {
      nucleonLayers[ nucleon.zLayerProperty.get() ].addChild( new ParticleView( nucleon, modelViewTransform, {
        dragBounds: particleDragBounds,
        highContrastProperty: BAAGlobalPreferences.highContrastParticlesProperty,
        tandem: nucleonsGroupTandem.createNextTandem()
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
          if ( particleView.particle === nucleon ) {
            onCorrectLayer = true;
          }
        } );

        if ( !onCorrectLayer ) {

          // Remove particle view from its current layer.
          let particleView = null;
          for ( let layerIndex = 0; layerIndex < nucleonLayers.length && particleView === null; layerIndex++ ) {
            for ( let childIndex = 0; childIndex < nucleonLayers[ layerIndex ].children.length; childIndex++ ) {
              if ( nucleonLayers[ layerIndex ].children[ childIndex ].particle === nucleon ) {
                particleView = nucleonLayers[ layerIndex ].children[ childIndex ];
                nucleonLayers[ layerIndex ].removeChildAt( childIndex );
                break;
              }
            }
          }

          // Add the particle view to its new layer.
          assert && assert( particleView !== null, 'Particle view not found during relayering' );
          nucleonLayers[ zLayer ].addChild( particleView );
        }
      } );
    } );

    // Add the electron particle views.
    model.electrons.forEach( electron => {
      electronLayer.addChild( new ParticleView( electron, modelViewTransform, {
        dragBounds: particleDragBounds,
        highContrastProperty: BAAGlobalPreferences.highContrastParticlesProperty,
        tandem: electronsGroupTandem.createNextTandem()
      } ) );
    } );

    // When the electrons are represented as a cloud, the individual particles become invisible when added to the atom.
    const updateElectronVisibility = () => {
      electronLayer.getChildren().forEach( electronNode => {
        electronNode.visible = model.electronShellDepictionProperty.get() === 'orbits' || !model.particleAtom.electrons.includes( electronNode.particle );
      } );
    };
    model.particleAtom.electrons.lengthProperty.link( updateElectronVisibility );
    model.electronShellDepictionProperty.link( updateElectronVisibility );

    // Add the front portion of the buckets. This is done separately from the bucket holes for layering purposes.
    const bucketFrontLayer = new Node( { tandem: tandem.createTandem( 'bucketFrontLayer' ) } );

    _.each( model.buckets, bucket => {
      const bucketFront = new BucketFront( bucket, modelViewTransform, {
        tandem: tandem.createTandem( `${bucket.sphereBucketTandem.name}FrontNode` )
      } );
      bucketFrontLayer.addChild( bucketFront );
      bucketFront.addInputListener( new BucketDragListener( bucket, bucketFront, modelViewTransform, {
        tandem: tandem.createTandem( `${bucket.sphereBucketTandem.name}DragListener` )
      } ) );
    } );

    // Add the particle count indicator.
    const particleCountDisplay = new ParticleCountDisplay( model.particleAtom, 13, 250, {
      tandem: tandem.createTandem( 'particleCountDisplay' )
    } );  // Width arbitrarily chosen.
    this.addChild( particleCountDisplay );

    // Add the periodic table display inside of an accordion box.
    const periodicTableAndSymbol = new PeriodicTableAndSymbol(
      model.particleAtom,
      tandem.createTandem( 'periodicTableAndSymbol' ),
      {
        pickable: false
      }
    );
    periodicTableAndSymbol.scale( 0.55 ); // Scale empirically determined to match layout in design doc.
    const periodicTableAccordionBoxTandem = tandem.createTandem( 'periodicTableAccordionBox' );
    this.periodicTableAccordionBox = new AccordionBox( periodicTableAndSymbol, {
      cornerRadius: 3,
      titleNode: new Text( elementString, {
        font: ShredConstants.ACCORDION_BOX_TITLE_FONT,
        maxWidth: ShredConstants.ACCORDION_BOX_TITLE_MAX_WIDTH,
        tandem: periodicTableAccordionBoxTandem.createTandem( 'titleText' )
      } ),
      fill: ShredConstants.DISPLAY_PANEL_BACKGROUND_COLOR,
      contentAlign: 'left',
      titleAlignX: 'left',
      buttonAlign: 'right',
      expandedProperty: this.periodicTableAccordionBoxExpandedProperty,
      expandCollapseButtonOptions: {
        touchAreaXDilation: 12,
        touchAreaYDilation: 12
      },

      // phet-io
      tandem: periodicTableAccordionBoxTandem,

      // pdom
      labelContent: elementString
    } );
    this.addChild( this.periodicTableAccordionBox );

    const labelVisibilityControlPanelTandem = tandem.createTandem( 'labelVisibilityControlPanel' );
    const checkboxItems = [ {
      createNode: tandem => new Text( elementString, {
        font: LABEL_CONTROL_FONT,
        maxWidth: LABEL_CONTROL_MAX_WIDTH,
        tandem: tandem.createTandem( 'elementText' )
      } ),
      property: model.showElementNameProperty,
      tandemName: 'showElementNameCheckbox'
    }, {
      createNode: tandem => new Text( neutralSlashIonString, {
        font: LABEL_CONTROL_FONT,
        maxWidth: LABEL_CONTROL_MAX_WIDTH,
        tandem: tandem.createTandem( 'neutralOrIonText' )
      } ),
      property: model.showNeutralOrIonProperty,
      tandemName: 'showNeutralOrIonCheckbox'
    } ];

    // In support of a research study, it is possible to exclude the stable/unstable checkbox, see
    // https://github.com/phetsims/special-ops/issues/189.
    if ( BAAQueryParameters.showStableUnstableCheckbox ) {
      checkboxItems.push( {
        createNode: tandem => new Text( stableSlashUnstableString, {
          font: LABEL_CONTROL_FONT,
          maxWidth: LABEL_CONTROL_MAX_WIDTH,
          tandem: tandem.createTandem( 'stableUnstableText' )
        } ),
        property: model.showStableOrUnstableProperty,
        tandemName: 'showStableOrUnstableCheckbox'
      } );
    }

    const labelVisibilityControlPanel = new Panel( new VerticalCheckboxGroup( checkboxItems, {
      checkboxOptions: { boxWidth: 12 },
      spacing: 8,
      tandem: tandem.createTandem( 'labelVisibilityCheckboxGroup' )
    } ), {
      fill: 'rgb( 245, 245, 245 )',
      lineWidth: LABEL_CONTROL_LINE_WIDTH,
      xMargin: 7.5,
      cornerRadius: 5,
      resize: false,
      tandem: labelVisibilityControlPanelTandem
    } );
    const numDividerLines = checkboxItems.length - 1;
    const dividerLineShape = new Shape().moveTo( 0, 0 ).lineTo( labelVisibilityControlPanel.width - 2 * LABEL_CONTROL_LINE_WIDTH, 0 );
    for ( let dividerLines = 0; dividerLines < numDividerLines; dividerLines++ ) {
      const dividerLine1 = new Path( dividerLineShape, {
        lineWidth: 1,
        stroke: 'gray',
        centerY: labelVisibilityControlPanel.height * ( dividerLines + 1 ) / ( numDividerLines + 1 ),
        x: LABEL_CONTROL_LINE_WIDTH / 2
      } );
      labelVisibilityControlPanel.addChild( dividerLine1 );
    }

    this.addChild( labelVisibilityControlPanel );
    const labelVisibilityControlPanelTitleText = new Text( showString, {
      font: new PhetFont( { size: 16, weight: 'bold' } ),
      maxWidth: labelVisibilityControlPanel.width,
      tandem: tandem.createTandem( 'labelVisibilityControlPanelTitleText' )
    } );
    this.addChild( labelVisibilityControlPanelTitleText );

    // Add the radio buttons that control the electron representation in the atom.
    const radioButtonRadius = 6;
    const orbitsRadioButtonTandem = tandem.createTandem( 'orbitsRadioButton' );
    const orbitsRadioButton = new AquaRadioButton(
      model.electronShellDepictionProperty,
      'orbits',
      new Text( orbitsString, {
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
      new Text( cloudString, {
        font: ELECTRON_VIEW_CONTROL_FONT,
        maxWidth: ELECTRON_VIEW_CONTROL_MAX_WIDTH,
        tandem: cloudRadioButtonTandem.createTandem( 'cloudText' )
      } ),
      { radius: radioButtonRadius, tandem: cloudRadioButtonTandem }
    );
    const electronViewButtonGroup = new Node( { tandem: tandem.createTandem( 'electronViewButtonGroup' ) } );
    electronViewButtonGroup.addChild( new Text( modelString, {
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
      radius: BAASharedConstants.RESET_BUTTON_RADIUS,
      tandem: tandem.createTandem( 'resetAllButton' )
    } );
    this.addChild( resetAllButton );

    // Do the layout.
    particleCountDisplay.top = CONTROLS_INSET;
    particleCountDisplay.left = CONTROLS_INSET;
    this.periodicTableAccordionBox.top = CONTROLS_INSET;
    this.periodicTableAccordionBox.right = this.layoutBounds.maxX - CONTROLS_INSET;
    labelVisibilityControlPanel.left = this.periodicTableAccordionBox.left;
    labelVisibilityControlPanel.bottom = this.layoutBounds.height - CONTROLS_INSET;
    labelVisibilityControlPanelTitleText.bottom = labelVisibilityControlPanel.top;
    labelVisibilityControlPanelTitleText.centerX = labelVisibilityControlPanel.centerX;
    electronViewButtonGroup.left = atomNode.right + 30;
    electronViewButtonGroup.bottom = atomNode.bottom + 5;

    // Any other objects added by class calling it will be added in this node for layering purposes
    this.controlPanelLayer = new Node( { tandem: tandem.createTandem( 'controlPanelLayer' ) } );
    this.addChild( this.controlPanelLayer );

    this.addChild( nucleonElectronLayer );
    this.addChild( bucketFrontLayer );
  }

  // @public
  reset() {
    this.periodicTableAccordionBoxExpandedProperty.reset();
  }
}

// @public export for usage when creating shred Particles
BAAScreenView.NUM_NUCLEON_LAYERS = NUM_NUCLEON_LAYERS;

buildAnAtom.register( 'BAAScreenView', BAAScreenView );
export default BAAScreenView;