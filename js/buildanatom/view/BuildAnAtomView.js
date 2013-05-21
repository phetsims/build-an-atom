// Copyright 2002-2013, University of Colorado

/**
 * Main view for the first tab of the Build an Atom simulation.
 */
define( function ( require ) {
  "use strict";

  var Node = require( 'SCENERY/nodes/Node' );
  var Text = require( 'SCENERY/nodes/Text' );
  var ParticleView = require( 'buildanatom/view/ParticleView' );
  var BucketFront = require( 'SCENERY_PHET/bucket/BucketFront' );
  var BucketHole = require( 'SCENERY_PHET/bucket/BucketHole' );
  var ModelViewTransform2 = require( 'PHETCOMMON/view/ModelViewTransform2' );
  var ElectronShellView = require( 'common/view/ElectronShellView' );
  var ParticleAtom = require( 'common/model/ParticleAtom' );
  var AtomView = require( 'buildanatom/view/AtomView' );
  var Vector2 = require( "DOT/Vector2" );
  var TabView = require( "JOIST/TabView" );
  var Bounds2 = require( 'DOT/Bounds2' );
  var Button = require( 'SUN/Button' );

  // Size of the stage, in screen coordinates.  This was obtained by setting
  // a Chrome window to 1024 x 768 and measuring the actual display region.
  var STAGE_SIZE = new Bounds2( 0, 0, 1010, 655 );

  /**
   * Constructor.
   *
   * @param model Build an Atom model object.
   * @constructor
   */
  function BuildAnAtomView( model ) {

    var thisView = this;

    // Initialize the scene.
    var scene = new TabView();
    scene.layoutBounds = STAGE_SIZE;
    this.scene = scene;

    // Add a root node.  TODO: Get rid of this - no longer needed.
    var rootNode = new Node();
    scene.addChild( rootNode );

    // Create the model-view transform.
    var mvt = ModelViewTransform2.createSinglePointScaleInvertedYMapping( { x: 0, y: 0 },
                                                                          { x: STAGE_SIZE.width / 2, y: STAGE_SIZE.height * 0.35 },
                                                                          1.0 );

    // Add the node that shows the 'x' center marker and all the textual labels.
    rootNode.addChild( new AtomView( model.atom, mvt ) );

    // Add the electron shells.
    rootNode.addChild( new ElectronShellView( model.atom, ParticleAtom.INNER_ELECTRON_SHELL_RADIUS, ParticleAtom.OUTER_ELECTRON_SHELL_RADIUS, mvt ) );

    // Add the bucket holes.  Done separately from the bucket front for layering.
    _.each( model.buckets, function ( bucket ) {
      rootNode.addChild( new BucketHole( bucket, mvt ) );
    } );

    // Add the layer where the nucleons will be maintained.
    var nucleonLayer = new Node();
    rootNode.addChild( nucleonLayer );

    // Add the particles.
    _.each( model.nucleons, function ( nucleon ) {
      nucleonLayer.addChild( new ParticleView( nucleon, mvt ) );
    } );
    _.each( model.electrons, function ( electron ) {
      rootNode.addChild( new ParticleView( electron, mvt ) );
    } );

    // Layer the particles views so that the nucleus looks reasonable. Note
    // that this sorts all of the nucleons, even though we technically only
    // need to sort the ones in the nucleus.
    model.atom.on( 'reconfigureNucleus', function () {
      var particlesInNucleus = _.filter( nucleonLayer.children, function ( particleView ) {
        return particleView.particle.position.distance( model.atom.position ) < ParticleAtom.INNER_ELECTRON_SHELL_RADIUS;
      } );

      if ( particlesInNucleus.length > 4 ) {
        particlesInNucleus = _.sortBy( particlesInNucleus, function ( particleView ) {
          // Central nucleons should be in front
          return -particleView.particle.position.distance( model.atom.position );
        } );
        _.each( particlesInNucleus, function ( particleView ) {
          nucleonLayer.removeChild( particleView );
          nucleonLayer.addChild( particleView );
        } );
      }
    } );

    // Add the front portion of the buckets.  Done separately from the bucket
    // holes for layering purposes.
    _.each( model.buckets, function ( bucket ) {
      rootNode.addChild( new BucketFront( bucket, mvt ) );
    } );

    // Add the reset button.
    var bucketCenterPosition = mvt.modelToViewPosition( model.buckets.electronBucket.position )
    rootNode.addChild( new Button( new Text( "Reset", { font: 'bold 32px Arial'} ),
                                   function () {
                                     console.log( "Reset button pressed." );
                                     model.reset();
                                   },
                                   {
                                     fill: 'orange',
                                     xMargin: 10,
                                     lineWidth: 1.5
                                   } ).mutate( {center: bucketCenterPosition.plus( new Vector2( 170, 40 ) )} ) );
  }

  return BuildAnAtomView;
} );