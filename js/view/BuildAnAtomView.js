// Copyright 2002-2013, University of Colorado

/**
 * Main view for the first tab of the Build an Atom simulation.
 */
define( function ( require ) {
  "use strict";

  var Scene = require( 'SCENERY/scene' );
  var Node = require( 'SCENERY/nodes/Node' );
  var ParticleView = require( 'view/ParticleView' );
  var BucketFront = require( 'SCENERY_PHET/bucket/BucketFront' );
  var BucketHole = require( 'SCENERY_PHET/bucket/BucketHole' );
  var ModelViewTransform2 = require( 'PHETCOMMON/view/ModelViewTransform2' );
  var ElectronShellView = require( 'view/ElectronShellView' );
  var Atom = require( 'model/Atom' );
  var AtomView = require( 'view/AtomView' );
  var Dimension2 = require( "DOT/Dimension2" );
  var Vector2 = require( "DOT/Vector2" );
  var TabView = require( "JOIST/TabView" );

  /**
   * Constructor.
   *
   * @param model Build an Atom model object.
   * @constructor
   */
  function BuildAnAtomView( model ) {

    // Initialize the scene.
    var scene = new TabView();
    this.scene = scene;

    // Add a root node.  TODO: Review with JO - Do I want or need this? Where did option values come from and are they correct?
//    var rootNode = new Node( {
//                               x: scene.sceneBounds.width / 3,
//                               y: scene.sceneBounds.centerY,
//                               scale: 0.4 / 0.707,
//                               layerSplit: true
//                             } );
    var rootNode = new Node();
    scene.addChild( rootNode );

    var nucleonLayer = new Node();

    // Size of the "stage" where graphics will be displayed.
    var UNITY_WINDOW_SIZE = new Dimension2( 1024, 768 ); // At this window size, scaling is 1.

    // Create the model-view transform.
    var mvt = ModelViewTransform2.createSinglePointScaleInvertedYMapping( { x: 0, y: 0 }, { x: UNITY_WINDOW_SIZE.width / 2, y: UNITY_WINDOW_SIZE.height * 0.3 }, 1.0 );


    // Add the node that shows the 'x' center marker and all the textual labels.
    rootNode.addChild( new AtomView( model.atom, mvt ) );

    // Add the electron shells.
    rootNode.addChild( new ElectronShellView( model.atom, Atom.INNER_ELECTRON_SHELL_RADIUS, Atom.OUTER_ELECTRON_SHELL_RADIUS, mvt ) );

    // Add the bucket holes.  Done separately from the bucket front for layering.
    _.each( model.buckets, function ( bucket ) {
      rootNode.addChild( new BucketHole( bucket, mvt ) );
    } );
    rootNode.addChild( nucleonLayer );

    // Add the particles.
    _.each( model.nucleons, function ( nucleon ) {
      nucleonLayer.addChild( new ParticleView( nucleon, mvt ) );
    } );
    _.each( model.electrons, function ( electron ) {
      rootNode.addChild( new ParticleView( electron, mvt ) );
    } );

    //Note: this sorts all of the nucleons, even though we technically only need to sort the ones in the nucleus
    model.atom.on( 'reconfigureNucleus', function () {
      nucleonLayer.children = _.sortBy( nucleonLayer.children, function ( child ) {
        //Central things should be in front
        return -child.particle.position.distance( Vector2.ZERO );
      } );
    } );

    // Add the front portion of the buckets.  Done separately from the bucket
    // holes for layering purposes.
    _.each( model.buckets, function ( bucket ) {
      rootNode.addChild( new BucketFront( bucket, mvt ) );
    } );

    // Scale and center the scene when the browser window is resized.
    var handleResize = function () {
      var windowSize = new Dimension2( $( window ).width(), $( window ).height() );
      var scale = Math.min( windowSize.width / UNITY_WINDOW_SIZE.width, windowSize.height / UNITY_WINDOW_SIZE.height );
      scene.setScaleMagnitude( scale );
      scene.centerX = windowSize.width / 2;
      scene.centerY = windowSize.height / 2;
    };
    $( window ).resize( handleResize );
    handleResize(); // initial size
  }

  return BuildAnAtomView;
} );