// Copyright 2013-2016, University of Colorado Boulder

/**
 * ScreenView that presents an interactive atom on the left side, buckets of
 * particles underneath, and controls for label visibility and reset.  A
 * periodic table is included on the right side.  This is intended to be used
 * as a base type for screens with similar views.
 */
define( function( require ) {
  'use strict';

  // modules
  var AccordionBox = require( 'SUN/AccordionBox' );
  var AquaRadioButton = require( 'SUN/AquaRadioButton' );
  var AtomNode = require( 'SHRED/view/AtomNode' );
  var buildAnAtom = require( 'BUILD_AN_ATOM/buildAnAtom' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var BucketDragHandler = require( 'SHRED/view/BucketDragHandler' );
  var BucketFront = require( 'SCENERY_PHET/bucket/BucketFront' );
  var BucketHole = require( 'SCENERY_PHET/bucket/BucketHole' );
  var inherit = require( 'PHET_CORE/inherit' );
  var ModelViewTransform2 = require( 'PHETCOMMON/view/ModelViewTransform2' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Panel = require( 'SUN/Panel' );
  var ParticleCountDisplay = require( 'SHRED/view/ParticleCountDisplay' );
  var ParticleView = require( 'SHRED/view/ParticleView' );
  var Path = require( 'SCENERY/nodes/Path' );
  var PeriodicTableAndSymbol = require( 'BUILD_AN_ATOM/buildanatom/view/PeriodicTableAndSymbol' );
  var ResetAllButton = require( 'SCENERY_PHET/buttons/ResetAllButton' );
  var ScreenView = require( 'JOIST/ScreenView' );
  var Shape = require( 'KITE/Shape' );
  var ShredConstants = require( 'SHRED/ShredConstants' );
  var Text = require( 'SCENERY/nodes/Text' );
  var Vector2 = require( 'DOT/Vector2' );
  var VerticalCheckBoxGroup = require( 'SUN/VerticalCheckBoxGroup' );
  var Property = require( 'AXON/Property' );

  // strings
  var elementString = require( 'string!BUILD_AN_ATOM/element' );
  var neutralSlashIonString = require( 'string!BUILD_AN_ATOM/neutralSlashIon' );
  var stableSlashUnstableString = require( 'string!BUILD_AN_ATOM/stableSlashUnstable' );
  var showString = require( 'string!BUILD_AN_ATOM/show' );
  var orbitsString = require( 'string!BUILD_AN_ATOM/orbits' );
  var cloudString = require( 'string!BUILD_AN_ATOM/cloud' );
  var modelString = require( 'string!BUILD_AN_ATOM/model' );

  // constants
  var CONTROLS_INSET = 10;
  var LABEL_CONTROL_FONT = new PhetFont( 12 );
  var LABEL_CONTROL_MAX_WIDTH = 180;
  var LABEL_CONTROL_LINE_WIDTH = 1;
  var ELECTRON_VIEW_CONTROL_FONT = new PhetFont( 12 );
  var ELECTRON_VIEW_CONTROL_MAX_WIDTH = 60;
  var NUM_NUCLEON_LAYERS = 5; // This is based on max number of particles, may need adjustment if that changes.

  /**
   * @param {BuildAnAtomModel} model
   * @param {Tandem} tandem
   * @constructor
   */
  function AtomView( model, tandem ) {
    ScreenView.call( this, { layoutBounds: ShredConstants.LAYOUT_BOUNDS } ); // Call super constructor.
    var self = this;
    this.model = model;
    this.resetFunctions = [];

    // @protected
    this.periodicTableBoxExpandedProperty = new Property( true );

    // Create the model-view transform.
    var modelViewTransform = ModelViewTransform2.createSinglePointScaleInvertedYMapping(
      Vector2.ZERO,
      new Vector2( self.layoutBounds.width * 0.3, self.layoutBounds.height * 0.45 ),
      1.0 );

    // Add the node that shows the textual labels, the electron shells, and the center X marker.
    var atomNode = new AtomNode( model.particleAtom, modelViewTransform, {
      showElementNameProperty: model.showElementNameProperty,
      showNeutralOrIonProperty: model.showNeutralOrIonProperty,
      showStableOrUnstableProperty: model.showStableOrUnstableProperty,
      electronShellDepictionProperty: model.electronShellDepictionProperty
    } );
    this.addChild( atomNode );

    // Add the bucket holes.  Done separately from the bucket front for layering.
    _.each( model.buckets, function( bucket ) {
      self.addChild( new BucketHole( bucket, modelViewTransform ).mutate( { pickable: false } ) );
    } );

    // add the layer where the nucleons and electrons will go, this is added last so that it remains on top
    var nucleonElectronLayer = new Node();

    // Add the layers where the nucleons will exist.
    var nucleonLayers = [];
    _.times( NUM_NUCLEON_LAYERS, function() {
      var nucleonLayer = new Node();
      nucleonLayers.push( nucleonLayer );
      nucleonElectronLayer.addChild( nucleonLayer );
    } );
    nucleonLayers.reverse(); // Set up the nucleon layers so that layer 0 is in front.

    // Add the layer where the electrons will exist.
    var electronLayer = new Node( { layerSplit: true } );
    nucleonElectronLayer.addChild( electronLayer );

    // Add the nucleon particle views.
    var nucleonTandem = tandem.createGroupTandem( 'nucleons' );
    var electronsTandem = tandem.createGroupTandem( 'electrons' );
    var bucketsTandem = tandem.createGroupTandem( 'bucket' );

    model.nucleons.forEach( function( nucleon ) {
      nucleonLayers[ nucleon.zLayerProperty.get() ].addChild( new ParticleView( nucleon, modelViewTransform, {
        tandem: nucleonTandem.createNextTandem()
      } ) );
      // Add a listener that adjusts a nucleon's z-order layering.
      nucleon.zLayerProperty.link( function( zLayer ) {
        assert && assert( nucleonLayers.length > zLayer, 'zLayer for nucleon exceeds number of layers, max number may need increasing.' );
        // Determine whether nucleon view is on the correct layer.
        var onCorrectLayer = false;
        nucleonLayers[ zLayer ].children.forEach( function( particleView ) {
          if ( particleView.particle === nucleon ) {
            onCorrectLayer = true;
          }
        } );

        if ( !onCorrectLayer ) {

          // Remove particle view from its current layer.
          var particleView = null;
          for ( var layerIndex = 0; layerIndex < nucleonLayers.length && particleView === null; layerIndex++ ) {
            for ( var childIndex = 0; childIndex < nucleonLayers[ layerIndex ].children.length; childIndex++ ) {
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
    model.electrons.forEach( function( electron ) {
      electronLayer.addChild( new ParticleView( electron, modelViewTransform, {
        tandem: electronsTandem.createNextTandem()
      } ) );
    } );

    // When the electrons are represented as a cloud, the individual particles
    // become invisible when added to the atom.
    var updateElectronVisibility = function() {
      electronLayer.getChildren().forEach( function( electronNode ) {
        electronNode.visible = model.electronShellDepictionProperty.get() === 'orbits' || !model.particleAtom.electrons.contains( electronNode.particle );
      } );
    };
    model.particleAtom.electrons.lengthProperty.link( updateElectronVisibility );
    model.electronShellDepictionProperty.link( updateElectronVisibility );

    // Add the front portion of the buckets. This is done separately from the bucket holes for layering purposes.
    var bucketFrontLayer = new Node();

    _.each( model.buckets, function( bucket ) {
      var bucketFront = new BucketFront( bucket, modelViewTransform );
      bucketFrontLayer.addChild( bucketFront );
      bucketFront.addInputListener( new BucketDragHandler( bucket, bucketFront, modelViewTransform, {
        tandem: bucketsTandem.createNextTandem()
      } ) );
    } );

    // Add the particle count indicator.
    var particleCountDisplay = new ParticleCountDisplay( model.numberAtom, 13, 250 );  // Width arbitrarily chosen.
    this.addChild( particleCountDisplay );

    // Add the periodic table display inside of an accordion box.
    var periodicTableAndSymbol = new PeriodicTableAndSymbol( model.numberAtom, tandem.createTandem( 'periodicTableAndSymbol' ) ).mutate( {
      pickable: false
    } );
    periodicTableAndSymbol.scale( 0.55 ); // Scale empirically determined to match layout in design doc.
    this.periodicTableBox = new AccordionBox( periodicTableAndSymbol, {
      titleNode: new Text( elementString, {
        font: ShredConstants.ACCORDION_BOX_TITLE_FONT,
        maxWidth: ShredConstants.ACCORDION_BOX_TITLE_MAX_WIDTH
      } ),
      fill: ShredConstants.DISPLAY_PANEL_BACKGROUND_COLOR,
      contentAlign: 'left',
      titleAlignX: 'left',
      buttonAlign: 'right',
      expandedProperty: this.periodicTableBoxExpandedProperty,
      buttonTouchAreaXDilation: 8,
      buttonTouchAreaYDilation: 8
    } );
    this.addChild( this.periodicTableBox );

    var labelVisualizationControlPanel = new Panel( new VerticalCheckBoxGroup( [ {
      content: new Text( elementString, { font: LABEL_CONTROL_FONT, maxWidth: LABEL_CONTROL_MAX_WIDTH } ),
      property: model.showElementNameProperty,
      tandemName: 'showElementNameCheckBox'
    }, {
      content: new Text( neutralSlashIonString, { font: LABEL_CONTROL_FONT, maxWidth: LABEL_CONTROL_MAX_WIDTH } ),
      property: model.showNeutralOrIonProperty,
      tandemName: 'showNeutralOrIonCheckBox'
    }, {
      content: new Text( stableSlashUnstableString, { font: LABEL_CONTROL_FONT, maxWidth: LABEL_CONTROL_MAX_WIDTH } ),
      property: model.showStableOrUnstableProperty,
      tandemName: 'showStableOrUnstableCheckBox'
    } ], {
      boxWidth: 12,
      spacing: 8,
      tandem: tandem.createTandem( 'labelVisualizationControlPanel' )
    } ), {
      fill: 'rgb( 245, 245, 245 )',
      lineWidth: LABEL_CONTROL_LINE_WIDTH,
      xMargin: 7.5,
      cornerRadius: 5,
      resize: false
    } );
    var numDividerLines = 2;
    var dividerLineShape = new Shape().moveTo( 0, 0 ).lineTo( labelVisualizationControlPanel.width - 2 * LABEL_CONTROL_LINE_WIDTH, 0 );
    for ( var dividerLines = 0; dividerLines < numDividerLines; dividerLines++ ) {
      var dividerLine1 = new Path( dividerLineShape, {
        lineWidth: 1,
        stroke: 'gray',
        centerY: labelVisualizationControlPanel.height * ( dividerLines + 1 ) / ( numDividerLines + 1 ),
        x: LABEL_CONTROL_LINE_WIDTH / 2
      } );
      labelVisualizationControlPanel.addChild( dividerLine1 );
    }

    this.addChild( labelVisualizationControlPanel );
    var labelVizControlPanelTitle = new Text( showString, {
      font: new PhetFont( { size: 16, weight: 'bold' } ),
      maxWidth: labelVisualizationControlPanel.width
    } );
    this.addChild( labelVizControlPanelTitle );

    // Add the radio buttons that control the electron representation in the atom.
    var radioButtonRadius = 6;
    var orbitsRadioButton = new AquaRadioButton( model.electronShellDepictionProperty, 'orbits', new Text( orbitsString, {
      font: ELECTRON_VIEW_CONTROL_FONT,
      maxWidth: ELECTRON_VIEW_CONTROL_MAX_WIDTH
    } ), {
      radius: radioButtonRadius,
      tandem: tandem.createTandem( 'orbitsRadioButton' )
    } );
    var cloudRadioButton = new AquaRadioButton( model.electronShellDepictionProperty, 'cloud', new Text( cloudString, {
      font: ELECTRON_VIEW_CONTROL_FONT,
      maxWidth: ELECTRON_VIEW_CONTROL_MAX_WIDTH
    } ), {
      radius: radioButtonRadius,
      tandem: tandem.createTandem( 'cloudRadioButton' )
    } );
    var electronViewButtonGroup = new Node();
    electronViewButtonGroup.addChild( new Text( modelString, {
      font: new PhetFont( {
        size: 14,
        weight: 'bold'
      } ),
      maxWidth: ELECTRON_VIEW_CONTROL_MAX_WIDTH + 20
    } ) );
    orbitsRadioButton.top = electronViewButtonGroup.bottom + 5;
    orbitsRadioButton.left = electronViewButtonGroup.left;
    electronViewButtonGroup.addChild( orbitsRadioButton );
    cloudRadioButton.top = electronViewButtonGroup.bottom + 5;
    cloudRadioButton.left = electronViewButtonGroup.left;
    electronViewButtonGroup.addChild( cloudRadioButton );
    this.addChild( electronViewButtonGroup );

    // Add the reset button.
    var resetAllButton = new ResetAllButton( {
      listener: function() {
        self.model.reset();
        self.reset();
      },
      right: this.layoutBounds.maxX - CONTROLS_INSET,
      bottom: this.layoutBounds.maxY - CONTROLS_INSET,
      touchAreaDilation: 8,
      tandem: tandem.createTandem( 'resetAllButton' )
    } );
    resetAllButton.scale( 0.85 );
    this.addChild( resetAllButton );

    // Do the layout.
    particleCountDisplay.top = CONTROLS_INSET;
    particleCountDisplay.left = CONTROLS_INSET;
    this.periodicTableBox.top = CONTROLS_INSET;
    this.periodicTableBox.right = this.layoutBounds.maxX - CONTROLS_INSET;
    labelVisualizationControlPanel.left = this.periodicTableBox.left;
    labelVisualizationControlPanel.bottom = this.layoutBounds.height - CONTROLS_INSET;
    labelVizControlPanelTitle.bottom = labelVisualizationControlPanel.top;
    labelVizControlPanelTitle.centerX = labelVisualizationControlPanel.centerX;
    electronViewButtonGroup.left = atomNode.right + 30;
    electronViewButtonGroup.bottom = atomNode.bottom + 5;

    // Any other objects added by class calling it will be added in this node for layering purposes
    this.controlPanelLayer = new Node();
    this.addChild( this.controlPanelLayer );

    this.addChild( nucleonElectronLayer );
    this.addChild( bucketFrontLayer );
  }

  buildAnAtom.register( 'AtomView', AtomView );

  // Inherit from ScreenView.
  return inherit( ScreenView, AtomView, {
    reset: function() {
      this.periodicTableBoxExpandedProperty.reset();
    }
  } );
} );
