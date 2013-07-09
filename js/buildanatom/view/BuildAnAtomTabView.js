// Copyright 2002-2013, University of Colorado Boulder

/**
 * Main view for the first tab of the Build an Atom simulation.
 */
define( function( require ) {
  "use strict";

  // Imports
  var AccordionBox = require( 'SUN/AccordionBox' );
  var AtomNode = require( 'common/view/AtomNode' );
  var BAAFont = require( 'common/view/BAAFont' );
  var BucketDragHandler = require( 'buildanatom/view/BucketDragHandler' );
  var BucketFront = require( 'SCENERY_PHET/bucket/BucketFront' );
  var BucketHole = require( 'SCENERY_PHET/bucket/BucketHole' );
  var ChargeComparisonDisplay = require( 'buildanatom/view/ChargeComparisonDisplay' );
  var ChargeMeter = require( 'common/view/ChargeMeter' );
  var inherit = require( 'PHET_CORE/inherit' );
  var MassNumberDisplay = require( 'buildanatom/view/MassNumberDisplay' );
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
  var INTER_BOX_SPACING = 10;
  var LABEL_CONTROL_FONT = new BAAFont( 24 );

  /**
   * Constructor.
   *
   * @param model Build an Atom model object.
   * @constructor
   */
  function BuildAnAtomTabView( model ) {
    TabView.call( this ); // Call super constructor.
    var thisView = this;

    // Create the model-view transform.
    var mvt = ModelViewTransform2.createSinglePointScaleInvertedYMapping(
      { x: 0, y: 0 },
      { x: thisView.layoutBounds.width * 0.275, y: thisView.layoutBounds.height * 0.45 },
      1.0 );

    // Add the node that shows the textual labels, the electron shells, and the center X marker.
    this.addChild( new AtomNode( model.particleAtom, mvt,
                                 { showElementName : model.showElementName,
                                   showNeutralOrIon : model.showNeutralOrIon,
                                   showStableOrUnstable : model.showStableOrUnstable
                                 } ) );

    // Add the bucket holes.  Done separately from the bucket front for layering.
    _.each( model.buckets, function( bucket ) {
      thisView.addChild( new BucketHole( bucket, mvt ) );
    } );

    // Add the layer where the nucleons will be maintained.
    var nucleonLayer = new Node( { layerSplit: true } );
    this.addChild( nucleonLayer );

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
    periodicTable.scale( 0.65 ); // Scale empirically determined.
    var periodicTableBox = new AccordionBox( periodicTable,
                                             {
                                               title: 'Periodic Table', // TODO: i18n
                                               fill: SharedConstants.DISPLAY_PANEL_BACKGROUND_COLOR,
                                               contentPosition: 'left',
                                               titlePosition: 'left',
                                               buttonPosition: 'right',
                                               font: new BAAFont( 20 )
                                             } );
    this.addChild( periodicTableBox );

    // Add the charge meter and charge comparison display inside of an accordion box.
    var chargeMeterBoxContents = new Node();
    chargeMeterBoxContents.addChild( new ChargeMeter( model.numberAtom ),
                                     {
                                       title: 'Net Charge', // TODO: i18n
                                       fill: SharedConstants.DISPLAY_PANEL_BACKGROUND_COLOR,
                                       initiallyOpen: false,
                                       minWidth: periodicTableBox.width,
                                       contentPosition: 'left',
                                       titlePosition: 'left',
                                       buttonPosition: 'right',
                                       font: new BAAFont( 20 )
                                     } );
    var chargeComparisonDisplay = new ChargeComparisonDisplay( model.numberAtom );
    chargeComparisonDisplay.left = chargeMeterBoxContents.right + 5;
    chargeComparisonDisplay.centerY = chargeMeterBoxContents.centerY;
    chargeMeterBoxContents.addChild( chargeComparisonDisplay );
    var chargeMeterBox = new AccordionBox( chargeMeterBoxContents,
                                           {
                                             title: 'Net Charge', // TODO: i18n
                                             fill: SharedConstants.DISPLAY_PANEL_BACKGROUND_COLOR,
                                             initiallyOpen: false,
                                             minWidth: periodicTableBox.width,
                                             contentPosition: 'left',
                                             titlePosition: 'left',
                                             buttonPosition: 'right',
                                             font: new BAAFont( 20 )
                                           } );
    this.addChild( chargeMeterBox );

    // Add the mass indicator inside of an accordion box.
    var massNumberBox = new AccordionBox( new MassNumberDisplay( model.numberAtom ),
                                          {
                                            title: 'Mass Number', // TODO: i18n
                                            fill: SharedConstants.DISPLAY_PANEL_BACKGROUND_COLOR,
                                            initiallyOpen: false,
                                            minWidth: periodicTableBox.width,
                                            contentPosition: 'left',
                                            titlePosition: 'left',
                                            buttonPosition: 'right'
                                          } );
    this.addChild( massNumberBox );

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

    // Add the reset button.
    var resetButton = new ResetAllButton( function() {
      model.reset();
      periodicTableBox.open.reset();
      chargeMeterBox.open.reset();
      massNumberBox.open.reset();
    } );
    resetButton.scale( 0.8 );
    this.addChild( resetButton );

    // Do the layout.
    particleCountDisplay.top = CONTROLS_INSET;
    particleCountDisplay.left = CONTROLS_INSET;
    periodicTableBox.top = CONTROLS_INSET;
    periodicTableBox.right = this.layoutBounds.width - CONTROLS_INSET;
    chargeMeterBox.right = periodicTableBox.right;
    chargeMeterBox.top = periodicTableBox.bottom + INTER_BOX_SPACING;
    massNumberBox.right = periodicTableBox.right;
    massNumberBox.top = chargeMeterBox.top + chargeMeterBox.openHeight + INTER_BOX_SPACING;
    resetButton.left = periodicTableBox.left;
    labelVizControlPanel.centerX = ( resetButton.right + this.layoutBounds.width ) / 2;
    labelVizControlPanel.bottom = this.layoutBounds.height - CONTROLS_INSET;
    resetButton.centerY = labelVizControlPanel.centerY;
    labelVizControlPanelTitle.bottom = labelVizControlPanel.top;
    labelVizControlPanelTitle.centerX = labelVizControlPanel.centerX;
  }

  // Inherit from TabView.
  inherit( TabView, BuildAnAtomTabView );

  return BuildAnAtomTabView;
} );
