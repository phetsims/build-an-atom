// Copyright 2002-2013, University of Colorado

/**
 * Main view for the first tab of the Build an Atom simulation.
 */
define( function( require ) {
  "use strict";

  var Node = require( 'SCENERY/nodes/Node' );
  var Text = require( 'SCENERY/nodes/Text' );
  var ParticleView = require( 'common/view/ParticleView' );
  var BucketFront = require( 'SCENERY_PHET/bucket/BucketFront' );
  var BucketHole = require( 'SCENERY_PHET/bucket/BucketHole' );
  var ModelViewTransform2 = require( 'PHETCOMMON/view/ModelViewTransform2' );
  var ParticleAtom = require( 'common/model/ParticleAtom' );
  var AtomNode = require( 'common/view/AtomNode' );
  var Vector2 = require( "DOT/Vector2" );
  var Button = require( 'SUN/Button' );
  var AccordionBox = require( 'SUN/AccordionBox' );
  var TabView = require( "JOIST/TabView" );
  var inherit = require( 'PHET_CORE/inherit' );
  var ParticleCountDisplay = require( 'common/view/ParticleCountDisplay' );
  var ChargeMeter = require( 'common/view/ChargeMeter' );
  var PeriodicTableAndSymbol = require( 'buildanatom/view/PeriodicTableAndSymbol' );
  var MassNumberDisplay = require( 'buildanatom/view/MassNumberDisplay' );
  var SharedConstants = require( 'common/SharedConstants' );

  /**
   * Constructor.
   *
   * @param model Build an Atom model object.
   * @constructor
   */
  function BuildAnAtomView( model ) {
    TabView.call( this ); // Call super constructor.
    var thisView = this;

    // Create the model-view transform.
    var mvt = ModelViewTransform2.createSinglePointScaleInvertedYMapping(
      { x: 0, y: 0 },
      { x: thisView.layoutBounds.width * 0.3, y: thisView.layoutBounds.height * 0.45 },
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

    // Layer the particles views so that the nucleus looks good, with the
    // particles closer to the center being higher in the z-order.
    var relayerNucleus = function() {
      var particlesInNucleus = _.filter( nucleonLayer.children, function( particleView ) {
        return particleView.particle.destination.distance( model.particleAtom.position ) < model.particleAtom.innerElectronShellRadius;
      } );

      if ( particlesInNucleus.length > 4 ) {
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
    model.particleAtom.neutrons.addListener( relayerNucleus );
    model.particleAtom.protons.addListener( relayerNucleus );

    // Add the front portion of the buckets.  This is done separately from the
    // bucket holes for layering purposes.
    _.each( model.buckets, function( bucket ) {
      thisView.addChild( new BucketFront( bucket, mvt ) );
    } );

    // Add the particle count indicator.
    var particleCountDisplay = new ParticleCountDisplay( model.numberAtom, 13, 250 );  // Width arbitrarily chosen.
    this.addChild( particleCountDisplay );

    // Add the periodic table display inside of an accordion box.
    var periodicTable = new PeriodicTableAndSymbol( model.numberAtom );
    periodicTable.scale( 0.7 ); // Scale empirically determined.
    var periodicTableBox = new AccordionBox( periodicTable,
                                             {
                                               title: 'Periodic Table', // TODO: i18n
                                               fill: SharedConstants.DISPLAY_PANEL_BACKGROUND_COLOR,
                                               contentPosition: 'left',
                                               titlePosition: 'left',
                                               buttonPosition: 'right'
                                             } );
    this.addChild( periodicTableBox );

    // Add the charge meter inside of an accordion box.
    var chargeMeterBox = new AccordionBox( new ChargeMeter( model.numberAtom ),
                                           {
                                             title: 'Net Charge', // TODO: i18n
                                             fill: SharedConstants.DISPLAY_PANEL_BACKGROUND_COLOR,
                                             initiallyOpen: false,
                                             minWidth: periodicTableBox.width,
                                             contentPosition: 'left',
                                             titlePosition: 'left',
                                             buttonPosition: 'right'
                                           } );
    this.addChild( chargeMeterBox );

    // Add the mass indicator inside of an accordion box.
    var massIndicatorBox = new AccordionBox( new MassNumberDisplay( model.numberAtom ),
                                             {
                                               title: 'Mass Number', // TODO: i18n
                                               fill: SharedConstants.DISPLAY_PANEL_BACKGROUND_COLOR,
                                               initiallyOpen: false,
                                               minWidth: periodicTableBox.width,
                                               contentPosition: 'left',
                                               titlePosition: 'left',
                                               buttonPosition: 'right'
                                             } );
    this.addChild( massIndicatorBox );

    // Add the reset button.
    var bucketCenterPosition = mvt.modelToViewPosition( model.buckets.electronBucket.position );
    this.addChild( new Button( new Text( "Reset", { font: 'bold 24px Arial'} ),
                               function() {
                                 model.reset();
                               },
                               {
                                 fill: 'orange',
                                 xMargin: 10,
                                 lineWidth: 1.5
                               } ).mutate( {center: bucketCenterPosition.plus( new Vector2( 150, 30 ) )} ) );

    // Do the layout.
    particleCountDisplay.top = 5;
    particleCountDisplay.left = 5;
    periodicTableBox.top = 5;
    periodicTableBox.right = this.layoutBounds.width;
    chargeMeterBox.right = periodicTableBox.right;
    chargeMeterBox.top = periodicTableBox.bottom + 10;
    massIndicatorBox.right = periodicTableBox.right;
    massIndicatorBox.top = chargeMeterBox.top + chargeMeterBox.openHeight + 10;
  }

  // Inherit from TabView.
  inherit( TabView, BuildAnAtomView );

  return BuildAnAtomView;
} );
