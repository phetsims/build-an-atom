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
  var SharedConstants = require( 'common/SharedConstants' );

  /**
   * Constructor.
   *
   * @param model Build an Atom model object.
   * @constructor
   */
  function BuildAnAtomView( model ) {

    // Create the scene where the user will construct the atoms.
    var sceneGraphDiv = $( '#scene-graph' );

    // Initialize the scene.
    var scene = new Scene( sceneGraphDiv );
    scene.initializeFullscreenEvents(); // sets up listeners on the document with preventDefault(), and forwards those events to our scene
    scene.resizeOnWindowResize(); // the scene gets resized to the full screen size

    // Add a root node.  TODO: Review with JO - Do I want or need this? Where did option values come from and are they correct?
//    var rootNode = new Node( {
//                               x: scene.sceneBounds.width / 3,
//                               y: scene.sceneBounds.centerY,
//                               scale: 0.4 / 0.707,
//                               layerSplit: true
//                             } );
    var rootNode = new Node();
    scene.addChild( rootNode );

    // Create the model-view transform. TODO: This is just using numbers for now, will need to make this more dynamic.  Or something.  Not at all sure.
    var mvt = ModelViewTransform2.createSinglePointScaleInvertedYMapping( { x: 0, y: 0 }, { x: 350, y: 200 }, 1.0 );
//    var mvt = ModelViewTransform2.createSinglePointScaleInvertedYMapping( { x: 0, y: 0 }, { x: 0, y: 0 }, 1.0 );

    // Add the electron shells.
    rootNode.addChild( new ElectronShellView( model.atom, SharedConstants.INNER_ELECTRON_SHELL_RADIUS, SharedConstants.OUTER_ELECTRON_SHELL_RADIUS, mvt ));

    // Add the bucket holes.  Done separately from the bucket front for layering.
    _.each( model.buckets, function( bucket ){
      rootNode.addChild( new BucketHole( bucket, mvt ) );
    });

    // Add the particles.
    _.each( model.nucleons, function( nucleon ){
      rootNode.addChild( new ParticleView( nucleon, mvt ) );
    });
    _.each( model.electrons, function( electron ){
      rootNode.addChild( new ParticleView( electron, mvt ) );
    });

    // Add the front portion of the buckets.  Done separately from the bucket
    // holes for layering purposes.
    _.each( model.buckets, function( bucket ){
      rootNode.addChild( new BucketFront( bucket, mvt ) );
    });

    // Set up a callback that will keep the scene centered.
    function layout() {
      rootNode.x = scene.sceneBounds.width / 3;
      rootNode.y = scene.sceneBounds.centerY;
    }
    $( window ).resize( layout );

    // Create tick function for animation.
    function tick() {
      window.requestAnimationFrame( tick, sceneGraphDiv[0] );

//      stats.begin();
      scene.updateScene(); // repaints dirty regions. use renderScene() to render everything
//      stats.end();
    }

    window.requestAnimationFrame( tick, sceneGraphDiv[0] );
  }


  // TODO: Is this needed?
  BuildAnAtomView.prototype = {
    resetAll: function () {
      // TODO
    },
    step: function () {
      this.model.step();
      this.scenery.scene.updateScene();
    }
  };

  return BuildAnAtomView;
} );