// Copyright 2002-2013, University of Colorado

/**
 * Main view for the first tab of the Build an Atom simulation.
 */
define( function( require ) {
  "use strict";

  var AccordionBox = require( 'SUN/AccordionBox' );
  var AtomNode = require( 'common/view/AtomNode' );
  var BucketDragHandler = require( 'buildanatom/view/BucketDragHandler' );
  var BucketFront = require( 'SCENERY_PHET/bucket/BucketFront' );
  var BucketHole = require( 'SCENERY_PHET/bucket/BucketHole' );
  var Button = require( 'SUN/Button' );
  var inherit = require( 'PHET_CORE/inherit' );
  var ModelViewTransform2 = require( 'PHETCOMMON/view/ModelViewTransform2' );
  var Node = require( 'SCENERY/nodes/Node' );
  var PeriodicTableAndSymbol = require( 'buildanatom/view/PeriodicTableAndSymbol' );
  var ParticleAtom = require( 'common/model/ParticleAtom' );
  var ParticleCountDisplay = require( 'common/view/ParticleCountDisplay' );
  var ParticleView = require( 'common/view/ParticleView' );
  var ResetAllButton = require( "SCENERY_PHET/ResetAllButton" );
  var SharedConstants = require( 'common/SharedConstants' );
  var SymbolNode = require( 'symbol/view/SymbolNode' );
  var TabView = require( "JOIST/TabView" );
  var Text = require( 'SCENERY/nodes/Text' );
  var Vector2 = require( "DOT/Vector2" );

  /**
   * Constructor.
   *
   * @param model Build an Atom model object.
   * @constructor
   */
  function SymbolTabView( model ) {
    TabView.call( this ); // Call super constructor.
    var thisView = this;

    // Create the model-view transform.
    var mvt = ModelViewTransform2.createSinglePointScaleInvertedYMapping(
      { x: 0, y: 0 },
      { x: thisView.layoutBounds.width * 0.275, y: thisView.layoutBounds.height * 0.45 },
      1.0 );

    // Add the node that shows the textual labels, the electron shells, and the center X marker.
    this.addChild( new AtomNode( model.particleAtom, mvt ) );

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
//      bucketFront.addInputListener( new BucketDragHandler( bucket, bucketFront, mvt ) );
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
                                               buttonPosition: 'right'
                                             } );
    this.addChild( periodicTableBox );

    // Add the symbol node within an accordion box.
    var symbolNode = new SymbolNode( model.numberAtom );
    symbolNode.scale( 0.65 ); // Scale empirically determined.
    var symbolBox = new AccordionBox( symbolNode,
                                      {
                                        title: 'Symbol', // TODO: i18n
                                        fill: SharedConstants.DISPLAY_PANEL_BACKGROUND_COLOR,
                                        minWidth: periodicTableBox.width,
                                        contentPosition: 'center',
                                        titlePosition: 'left',
                                        buttonPosition: 'right'
                                      } );
    this.addChild( symbolBox );

    // Add the reset button.
    var resetButton = new ResetAllButton( function() {
      model.reset();
      periodicTableBox.open.reset();
      symbolBox.open.reset();
    } );
    resetButton.scale( 0.8 );
    this.addChild( resetButton );

    // Do the layout.
    particleCountDisplay.top = 5;
    particleCountDisplay.left = 5;
    periodicTableBox.top = 5;
    periodicTableBox.right = this.layoutBounds.width;
    symbolBox.top = periodicTableBox.top + periodicTableBox.openHeight + 10;
    symbolBox.left = periodicTableBox.left;
    resetButton.centerX = periodicTableBox.centerX;
    resetButton.bottom = this.layoutBounds.height - 10;
  }

  // Inherit from TabView.
  inherit( TabView, SymbolTabView );

  return SymbolTabView;
} );
