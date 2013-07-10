// Copyright 2002-2013, University of Colorado Boulder

/**
 * Tab view that presents an interactive atom on the left side, buckets of
 * particles underneath, and controls for label visibility and reset.  A
 * periodic table is included on the right side.  This is intended to be used
 * as a base type for tabs with similar views.
 */
define( function( require ) {
  "use strict";

  // Imports
  var AccordionBox = require( "SUN/AccordionBox" );
  var AquaRadioButton = require( "SUN/AquaRadioButton" );
  var AtomNode = require( 'common/view/AtomNode' );
  var BAAFont = require( 'common/view/BAAFont' );
  var BucketDragHandler = require( 'buildanatom/view/BucketDragHandler' );
  var BucketFront = require( 'SCENERY_PHET/bucket/BucketFront' );
  var BucketHole = require( 'SCENERY_PHET/bucket/BucketHole' );
  var inherit = require( 'PHET_CORE/inherit' );
  var ModelViewTransform2 = require( 'PHETCOMMON/view/ModelViewTransform2' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Panel = require( "SUN/Panel" );
  var ParticleCountDisplay = require( 'common/view/ParticleCountDisplay' );
  var ParticleView = require( 'common/view/ParticleView' );
  var PeriodicTableAndSymbol = require( 'buildanatom/view/PeriodicTableAndSymbol' );
  var ResetAllButton = require( "SCENERY_PHET/ResetAllButton" );
  var SharedConstants = require( 'common/SharedConstants' );
  var TabView = require( "JOIST/TabView" );
  var Text = require( "SCENERY/nodes/Text" );
  var VerticalCheckBoxGroup = require( "SUN/VerticalCheckBoxGroup" );

  // Constants
  var CONTROLS_INSET = 10;
  var LABEL_CONTROL_FONT = new BAAFont( 24 );
  var ELECTRON_VIEW_CONTROL_FONT = new BAAFont( 14 );
  var ACCORDION_BOX_FONT = new BAAFont( 18 );

  /**
   * Constructor.
   *
   * @param model Build an Atom model object.
   * @constructor
   */
  function AtomTabView( model ) {
    TabView.call( this ); // Call super constructor.
    var thisView = this;
    this.model = model;

    // Create the model-view transform.
    var mvt = ModelViewTransform2.createSinglePointScaleInvertedYMapping(
      { x: 0, y: 0 },
      { x: thisView.layoutBounds.width * 0.275, y: thisView.layoutBounds.height * 0.45 },
      1.0 );

    // Add the node that shows the textual labels, the electron shells, and the center X marker.
    var atomNode = new AtomNode( model.particleAtom, mvt,
                                 { showElementName: model.showElementName,
                                   showNeutralOrIon: model.showNeutralOrIon,
                                   showStableOrUnstable: model.showStableOrUnstable,
                                   electronShellDepiction: model.electronShellDepiction
                                 } );
    this.addChild( atomNode );

    // Add the bucket holes.  Done separately from the bucket front for layering.
    _.each( model.buckets, function( bucket ) {
      thisView.addChild( new BucketHole( bucket, mvt ) );
    } );

    // Add the layer where the nucleons will be maintained.
    var nucleonLayer = new Node( { layerSplit: true } );
    this.addChild( nucleonLayer );

    // Add the layer where the electrons will be maintained.
    var electronLayer = new Node( { layerSplit: true } );
    this.addChild( electronLayer );

    // Add the particles.
    _.each( model.nucleons, function( nucleon ) {
      nucleonLayer.addChild( new ParticleView( nucleon, mvt ) );
    } );
    _.each( model.electrons, function( electron ) {
      electronLayer.addChild( new ParticleView( electron, mvt ) );
    } );

    // Layer the particle views so that the nucleus looks good, with the
    // particles closer to the center being higher in the z-order.
    var relayerNucleus = function() {
      var particlesInNucleus = _.filter( nucleonLayer.children, function( particleView ) {
        return particleView.particle.destination.distance( model.particleAtom.position ) < model.particleAtom.outerElectronShellRadius;
      } );

      if ( particlesInNucleus.length > 3 ) {
        particlesInNucleus = _.sortBy( particlesInNucleus, function( particleView ) {
          // Central nucleons should be in front
          return -particleView.particle.destination.distance( model.particleAtom.position );
        } );
        _.each( particlesInNucleus, function( particleView ) {
          nucleonLayer.removeChild( particleView );
          nucleonLayer.addChild( particleView );
        } );
      }
    };
    model.particleAtom.on( 'nucleusReconfigured', function() {
      relayerNucleus();
    } );

    // When the electrons are represented as a cloud, the individual particles
    // become invisible when added to the atom.
    var updateElectronVisibility = function() {
      electronLayer.getChildren().forEach( function( electronNode ) {
        electronNode.visible = model.electronShellDepiction.value === 'orbits' || !model.particleAtom.electrons.contains( electronNode.particle );
      } );
    }
    model.particleAtom.electrons.addListener( updateElectronVisibility );
    model.electronShellDepiction.link( updateElectronVisibility );

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
    var periodicTable = new PeriodicTableAndSymbol( model.numberAtom );
    periodicTable.scale( 0.525 ); // Scale empirically determined to match layout in design doc.
    this.periodicTableBox = new AccordionBox( periodicTable,
                                              {
                                                title: 'Element', // TODO: i18n
                                                fill: SharedConstants.DISPLAY_PANEL_BACKGROUND_COLOR,
                                                contentPosition: 'left',
                                                titlePosition: 'left',
                                                buttonPosition: 'right',
                                                font: ACCORDION_BOX_FONT
                                              } );
    this.addChild( this.periodicTableBox );

    // Add the control panel for label visibility. TODO: i18n
    var labelVizControlPanel = new Panel( new VerticalCheckBoxGroup(
      [
        { content: new Text( 'Element Name', {font: LABEL_CONTROL_FONT} ), property: model.showElementName, label: 'Element Name' },
        { content: new Text( 'Neutral/Ion', {font: LABEL_CONTROL_FONT} ), property: model.showNeutralOrIon, label: 'Neutral/Ion' },
        { content: new Text( 'Stable/Unstable', {font: LABEL_CONTROL_FONT} ), property: model.showStableOrUnstable, label: 'Stable/Unstable' }
      ] ), { fill: 'rgb( 240, 240, 240 )' } );
    labelVizControlPanel.scale( 0.65 );  // TODO: Seems a bit of a hack.  Is there a better way to get the check boxes to scale?
    this.addChild( labelVizControlPanel );
    var labelVizControlPanelTitle = new Text( "Show", new BAAFont( 16, 'bold' ) ); // TODO: i18n
    this.addChild( labelVizControlPanelTitle );

    // Add the radio buttons that control the electron representation in the atom. TODO: i18n
    var radioButtonRadius = 6;
    var orbitsButton = new AquaRadioButton( model.electronShellDepiction, 'orbits', new Text( "Orbits", ELECTRON_VIEW_CONTROL_FONT ), { radius: radioButtonRadius } );
    var cloudButton = new AquaRadioButton( model.electronShellDepiction, 'cloud', new Text( "Cloud", ELECTRON_VIEW_CONTROL_FONT ), { radius: radioButtonRadius } );
    var electronViewButtonGroup = new Node();
    electronViewButtonGroup.addChild( new Text( "Model:", { font: new BAAFont( 18, 'bold' ) } ) );
    orbitsButton.top = electronViewButtonGroup.bottom;
    orbitsButton.left = electronViewButtonGroup.left + 5;
    electronViewButtonGroup.addChild( orbitsButton );
    cloudButton.top = electronViewButtonGroup.bottom + 3;
    cloudButton.left = electronViewButtonGroup.left + 5;
    electronViewButtonGroup.addChild( cloudButton );
    this.addChild( electronViewButtonGroup );

    // Add the reset button.
    this.reset = function(){
      thisView.model.reset();
      thisView.periodicTableBox.open.reset();
    }
    var resetButton = new ResetAllButton( function(){
      thisView.reset();
    } );
    resetButton.scale( 0.8 ); // Empirically determined scale factor.
    this.addChild( resetButton );

    // Do the layout.
    particleCountDisplay.top = CONTROLS_INSET;
    particleCountDisplay.left = CONTROLS_INSET;
    this.periodicTableBox.top = CONTROLS_INSET;
    this.periodicTableBox.right = this.layoutBounds.width - CONTROLS_INSET;
    resetButton.left = this.periodicTableBox.left;
    labelVizControlPanel.centerX = ( resetButton.right + this.layoutBounds.width ) / 2;
    labelVizControlPanel.bottom = this.layoutBounds.height - CONTROLS_INSET;
    resetButton.centerY = labelVizControlPanel.centerY;
    labelVizControlPanelTitle.bottom = labelVizControlPanel.top;
    labelVizControlPanelTitle.centerX = labelVizControlPanel.centerX;
    electronViewButtonGroup.left = atomNode.right + 5;
    electronViewButtonGroup.bottom = atomNode.bottom + 5;
  }

  // Inherit from TabView.
  inherit( TabView, AtomTabView );

  return AtomTabView;
} );
