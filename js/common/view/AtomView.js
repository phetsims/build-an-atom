// Copyright 2002-2013, University of Colorado Boulder

/**
 * ScreenView that presents an interactive atom on the left side, buckets of
 * particles underneath, and controls for label visibility and reset.  A
 * periodic table is included on the right side.  This is intended to be used
 * as a base type for screens with similar views.
 */
define( function( require ) {
  'use strict';

  // Imports
  var AccordionBox = require( 'SUN/AccordionBox' );
  var AquaRadioButton = require( 'SUN/AquaRadioButton' );
  var AtomNode = require( 'BUILD_AN_ATOM/common/view/AtomNode' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var BucketDragHandler = require( 'BUILD_AN_ATOM/buildanatom/view/BucketDragHandler' );
  var BucketFront = require( 'SCENERY_PHET/bucket/BucketFront' );
  var BucketHole = require( 'SCENERY_PHET/bucket/BucketHole' );
  var inherit = require( 'PHET_CORE/inherit' );
  var ModelViewTransform2 = require( 'PHETCOMMON/view/ModelViewTransform2' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Panel = require( 'SUN/Panel' );
  var ParticleCountDisplay = require( 'BUILD_AN_ATOM/common/view/ParticleCountDisplay' );
  var ParticleView = require( 'BUILD_AN_ATOM/common/view/ParticleView' );
  var Path = require( 'SCENERY/nodes/Path' );
  var PeriodicTableAndSymbol = require( 'BUILD_AN_ATOM/buildanatom/view/PeriodicTableAndSymbol' );
  var ResetAllButton = require( 'SCENERY_PHET/buttons/ResetAllButton' );
  var ScreenView = require( 'JOIST/ScreenView' );
  var Shape = require( 'KITE/Shape' );
  var SharedConstants = require( 'BUILD_AN_ATOM/common/SharedConstants' );
  var Text = require( 'SCENERY/nodes/Text' );
  var Vector2 = require( 'DOT/Vector2' );
  var VerticalCheckBoxGroup = require( 'SUN/VerticalCheckBoxGroup' );
  var PropertySet = require( 'AXON/PropertySet' );

  // Strings
  var elementString = require( 'string!BUILD_AN_ATOM/indicator.element' );
  var elementNameString = require( 'string!BUILD_AN_ATOM/element.name' );
  var neutralIonString = require( 'string!BUILD_AN_ATOM/neutralIon' );
  var stableUnstableString = require( 'string!BUILD_AN_ATOM/stableUnstable' );
  var showString = require( 'string!BUILD_AN_ATOM/show' );
  var orbitsString = require( 'string!BUILD_AN_ATOM/electron.model.orbits' );
  var cloudString = require( 'string!BUILD_AN_ATOM/electron.model.cloud' );
  var modelString = require( 'string!BUILD_AN_ATOM/electron.model' );

  // Constants
  var CONTROLS_INSET = 10;
  var LABEL_CONTROL_FONT = new PhetFont( 32 );
  var ELECTRON_VIEW_CONTROL_FONT = new PhetFont( 14 );
  var NUM_NUCLEON_LAYERS = 5; // This is based on max number of particles, may need adjustment if that changes.

  /**
   * Constructor.
   *
   * @param model Build an Atom model object.
   * @constructor
   */
  function AtomView( model ) {
    ScreenView.call( this, { renderer: 'svg' } ); // Call super constructor.
//    ScreenView.call( this ); // Call super constructor.
    var thisView = this;
    this.model = model;
    this.resetFunctions = [];

    // @protected
    this.viewProperties = new PropertySet( {
      periodicTableBoxExpanded: true
    } );

    // Create the model-view transform.
    var mvt = ModelViewTransform2.createSinglePointScaleInvertedYMapping(
      Vector2.ZERO,
      new Vector2( thisView.layoutBounds.width * 0.275, thisView.layoutBounds.height * 0.45 ),
      1.0 );

    // Add the node that shows the textual labels, the electron shells, and the center X marker.
    var atomNode = new AtomNode( model.particleAtom, mvt,
      { showElementNameProperty: model.showElementNameProperty,
        showNeutralOrIonProperty: model.showNeutralOrIonProperty,
        showStableOrUnstableProperty: model.showStableOrUnstableProperty,
        electronShellDepictionProperty: model.electronShellDepictionProperty
      } );
    this.addChild( atomNode );

    // Add the bucket holes.  Done separately from the bucket front for layering.
    _.each( model.buckets, function( bucket ) {
      thisView.addChild( new BucketHole( bucket, mvt ).mutate( { pickable: false } ) );
    } );

    // Add the layers where the nucleons will be maintained.
    var nucleonLayers = [];
    _.times( NUM_NUCLEON_LAYERS, function() {
      var nucleonLayer = new Node();
      nucleonLayers.push( nucleonLayer );
      thisView.addChild( nucleonLayer );
    } );
    nucleonLayers.reverse(); // Set up the nucleon layers so that layer 0 is in front.

    // Add the layer where the electrons will be maintained.
    var electronLayer = new Node( { layerSplit: true } );
    this.addChild( electronLayer );

    // Add the nucleon particle views.
    model.nucleons.forEach( function( nucleon ) {
      nucleonLayers[nucleon.zLayer].addChild( new ParticleView( nucleon, mvt ) );
      // Add a listener that adjusts a nucleon's z-order layering.
      nucleon.zLayerProperty.link( function( zLayer ) {
        assert && assert( nucleonLayers.length > zLayer, "zLayer for nucleon exceeds number of layers, max number may need increasing." );
        // Determine whether nucleon view is on the correct layer.
        var onCorrectLayer = false;
        nucleonLayers[zLayer].children.forEach( function( particleView ) {
          if ( particleView.particle === nucleon ) {
            onCorrectLayer = true;
          }
        } );

        if ( !onCorrectLayer ) {

          // Remove particle view from its current layer.
          var particleView = null;
          for ( var layerIndex = 0; layerIndex < nucleonLayers.length && particleView === null; layerIndex++ ) {
            for ( var childIndex = 0; childIndex < nucleonLayers[layerIndex].children.length; childIndex++ ) {
              if ( nucleonLayers[layerIndex].children[childIndex].particle === nucleon ) {
                particleView = nucleonLayers[layerIndex].children[childIndex];
                nucleonLayers[layerIndex].removeChildAt( childIndex );
                break;
              }
            }
          }

          // Add the particle view to its new layer.
          assert && assert( particleView !== null, "Particle view not found during relayering" );
          nucleonLayers[ zLayer ].addChild( particleView );
        }
      } );
    } );

    // Add the electron particle views.
    model.electrons.forEach( function( electron ) {
      electronLayer.addChild( new ParticleView( electron, mvt ) );
    } );

    // When the electrons are represented as a cloud, the individual particles
    // become invisible when added to the atom.
    var updateElectronVisibility = function() {
      electronLayer.getChildren().forEach( function( electronNode ) {
        electronNode.visible = model.electronShellDepiction === 'orbits' || !model.particleAtom.electrons.contains( electronNode.particle );
      } );
    };
    model.particleAtom.electrons.lengthProperty.link( updateElectronVisibility );
    model.electronShellDepictionProperty.link( updateElectronVisibility );

    // Add the front portion of the buckets.  This is done separately from the
    // bucket holes for layering purposes.
    _.each( model.buckets, function( bucket ) {
      var bucketFront = new BucketFront( bucket, mvt );
      thisView.addChild( bucketFront );
      bucketFront.addInputListener( new BucketDragHandler( bucket, bucketFront, mvt ) );
    } );

    // Add the particle count indicator.
    var particleCountDisplay = new ParticleCountDisplay( model.numberAtom, 13, 250 );  // Width arbitrarily chosen.
    this.addChild( particleCountDisplay );

    // Add the periodic table display inside of an accordion box.
    var periodicTable = new PeriodicTableAndSymbol( model.numberAtom ).mutate( { pickable: false } );
    periodicTable.scale( 0.55 ); // Scale empirically determined to match layout in design doc.
    this.periodicTableBox = new AccordionBox( periodicTable, {
      titleNode: new Text( elementString, { font: SharedConstants.ACCORDION_BOX_TITLE_FONT } ),
        fill: SharedConstants.DISPLAY_PANEL_BACKGROUND_COLOR,
        contentAlign: 'left',
        titleAlign: 'left',
        buttonAlign: 'right',
      expandedProperty: this.viewProperties.periodicTableBoxExpandedProperty
      } );
    this.addChild( this.periodicTableBox );

    var labelVizControlPanel = new Panel( new VerticalCheckBoxGroup(
      [
        { content: new Text( elementNameString, {font: LABEL_CONTROL_FONT} ), property: model.showElementNameProperty },
        { content: new Text( neutralIonString, {font: LABEL_CONTROL_FONT} ), property: model.showNeutralOrIonProperty },
        { content: new Text( stableUnstableString, {font: LABEL_CONTROL_FONT} ), property: model.showStableOrUnstableProperty }
      ] ), { fill: 'rgb( 245, 245, 245 )', xMargin: 15 } );
    var numDividerLines = 2;
    var dividerLineShape = new Shape().moveTo( 0, 0 ).lineTo( labelVizControlPanel.width, 0 );
    for ( var dividerLines = 0; dividerLines < numDividerLines; dividerLines++ ) {
      var dividerLine1 = new Path( dividerLineShape,
        {
          lineWidth: 1,
          stroke: 'gray',
          centerY: labelVizControlPanel.height * ( dividerLines + 1 ) / ( numDividerLines + 1 )
        } );
      labelVizControlPanel.addChild( dividerLine1 );
    }

    labelVizControlPanel.scale( 0.55 );  // Use a large font, then scale down to get smaller checkboxes.
    this.addChild( labelVizControlPanel );
    var labelVizControlPanelTitle = new Text( showString, new PhetFont( { size: 16, weight: 'bold' } ) );
    this.addChild( labelVizControlPanelTitle );

    // Add the radio buttons that control the electron representation in the atom.
    var radioButtonRadius = 6;
    var orbitsButton = new AquaRadioButton( model.electronShellDepictionProperty, 'orbits', new Text( orbitsString, ELECTRON_VIEW_CONTROL_FONT ), { radius: radioButtonRadius } );
    var cloudButton = new AquaRadioButton( model.electronShellDepictionProperty, 'cloud', new Text( cloudString, ELECTRON_VIEW_CONTROL_FONT ), { radius: radioButtonRadius } );
    var electronViewButtonGroup = new Node();
    electronViewButtonGroup.addChild( new Text( modelString, { font: new PhetFont( { size: 18, weight: 'bold' } ) } ) );
    orbitsButton.top = electronViewButtonGroup.bottom;
    orbitsButton.left = electronViewButtonGroup.left + 5;
    electronViewButtonGroup.addChild( orbitsButton );
    cloudButton.top = electronViewButtonGroup.bottom + 3;
    cloudButton.left = electronViewButtonGroup.left + 5;
    electronViewButtonGroup.addChild( cloudButton );
    this.addChild( electronViewButtonGroup );

    // Add the reset button.
    var resetButton = new ResetAllButton(
      {
        listener: function() {
          thisView.model.reset();
          thisView.viewProperties.reset();
        }
      } );
    this.addChild( resetButton );

    // Do the layout.
    particleCountDisplay.top = CONTROLS_INSET;
    particleCountDisplay.left = CONTROLS_INSET;
    this.periodicTableBox.top = CONTROLS_INSET;
    this.periodicTableBox.right = this.layoutBounds.width - CONTROLS_INSET;
    labelVizControlPanel.left = this.periodicTableBox.left + 10;
    labelVizControlPanel.bottom = this.layoutBounds.height - CONTROLS_INSET;
    labelVizControlPanelTitle.bottom = labelVizControlPanel.top;
    labelVizControlPanelTitle.centerX = labelVizControlPanel.centerX;
    resetButton.centerX = ( labelVizControlPanel.right + this.periodicTableBox.right ) / 2;
    resetButton.centerY = labelVizControlPanel.centerY;
    electronViewButtonGroup.right = this.periodicTableBox.left - 30;
    electronViewButtonGroup.bottom = atomNode.bottom + 5;
  }

  // Inherit from ScreenView.
  return inherit( ScreenView, AtomView );
} );
