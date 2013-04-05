// Copyright 2002-2013, University of Colorado

/**
 * Main view for the first tab of the Build an Atom simulation.
 */
define( function ( require ) {
  "use strict";

  var Scene = require( 'SCENERY/scene' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Path = require( 'SCENERY/nodes/Path' );
  var SimpleDragHandler = require( 'SCENERY/input/SimpleDragHandler' );
  var Shape = require( 'KITE/Shape' );
  var Particle = require( 'model/Particle' ); // TODO: Only needed temporarily, I think.
  var ParticleView = require( 'view/ParticleView' );
  var BucketFront = require( 'SCENERY_PHET/bucket/BucketFront' );
  var BucketHole = require( 'SCENERY_PHET/bucket/BucketHole' );
  var ModelViewTransform2D = require( 'PHETCOMMON/view/ModelViewTransform2D' );
  var Bucket = require( 'PHETCOMMON/model/Bucket' ); // TODO: Only needed temporarily, I think.
  var Vector2 = require( 'DOT/Vector2' );

  /**
   * Constructor.
   *
   * @param model Build an Atom model object.
   * @constructor
   */
  function BuildAnAtomView( model ) {
    var view = this;

    // Create the scene where the user will construct the atoms.
    var sceneGraphDiv = $( '#scene-graph' );

    // Initialize the scene.
    var scene = new Scene( sceneGraphDiv );
    scene.initializeFullscreenEvents(); // sets up listeners on the document with preventDefault(), and forwards those events to our scene
    scene.resizeOnWindowResize(); // the scene gets resized to the full screen size

    // Add a root node.  TODO: Review with JO - Do I want or need this? Where did option values come from and are they correct?
    var rootNode = new Node( {
                               x: scene.sceneBounds.width / 3,
                               y: scene.sceneBounds.centerY,
                               scale: 0.4 / 0.707,
                               layerSplit: true
                             } );
    scene.addChild( rootNode );

    // Create the model-view transform. TODO: This is just using numbers for now, will need to make this more dynamic.  Or something.  Not at all sure.
    var mvt = new ModelViewTransform2D( 1, { x: 200, y: 200 } );

    // Add the front portion of the buckets.  Done separately from the bucket
    // holes for layering purposes.
    _.each( model.buckets, function( bucket ){
      rootNode.addChild( new BucketFront( bucket ) );
    });

    // Add the particles.
    _.each( model.nucleons, function( nucleon ){
      rootNode.addChild( new ParticleView( nucleon, mvt ) );
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