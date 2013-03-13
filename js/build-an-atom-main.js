// Copyright 2002-2012, University of Colorado
require(
    [
      'lodash',
      'SCENERY/main',
      'KITE/shape',
      'model/BuildAnAtomModel',
      'view/BucketFront',
      'common/ModelViewTransform2D'
    ],
    function ( _, scenery, Shape, BuildAnAtomModel, BucketFront, ModelViewTransform2D ) {
      "use strict";

      // Create the model.
      var buildAnAtomModel = new BuildAnAtomModel();

      // TODO: Pull the scene out into its own file.
      // Create the scene where the user will construct the atoms.
      var sceneGraphDiv = $( '#scene-graph' );

      // Initialize our scene
      var scene = new scenery.Scene( sceneGraphDiv );
      scene.initializeFullscreenEvents(); // sets up listeners on the document with preventDefault(), and forwards those events to our scene
      scene.resizeOnWindowResize(); // the scene gets resized to the full screen size

      var rootNode = new scenery.Node( {
                                         x: scene.sceneBounds.width / 3,
                                         y: scene.sceneBounds.centerY,
                                         scale: 0.4 / 0.707,
                                         layerSplit: true
                                       } );
      scene.addChild( rootNode );

      // keep the container centered
      function layout() {
        rootNode.x = scene.sceneBounds.width() / 3;
        rootNode.y = scene.sceneBounds.centerY();
      }

      $( window ).resize( layout );

      // our paths node for the shape
      var protonView = new scenery.Path( {
                                           shape: Shape.circle( 0, 0, 40 ),
                                           fill: 'red',
                                           stroke: '#000000',
                                           cursor: 'pointer'
                                         } );

      var neutronView = new scenery.Path( {
                                            shape: Shape.circle( 0, 0, 40 ),
                                            fill: 'gray',
                                            stroke: '#000000',
                                            cursor: 'pointer'
                                          } );
      var count = 20;
      for ( var i = 0; i < count; i++ ) {
        // anonymous function so the closure variables aren't shared between iterations
        (function () {
          var node = new scenery.Node( {
                                         x: ( Math.random() - 0.5 ) * 300,
                                         y: ( Math.random() - 0.5 ) * 300
                                       } );

          // point each node to the same path (DAG)
          node.addChild( Math.random() < 0.5 ? protonView : neutronView );
          rootNode.addChild( node );

          // add a drag handler to each node
          node.addInputListener( new scenery.SimpleDragHandler( {
                                                                  // allow moving a finger (touch) across a node to pick it up
                                                                  allowTouchSnag: true
                                                                } ) );
        })();
      }

      // Create the model-view transform. TODO: This is just using numbers for now, will need to make this more dynamic.  Or something.  Not at all sure.
      var mvt = new ModelViewTransform2D( 1, { x: 200, y: 200 } );

      // Add the bucket holes to the scene.
//  rootNode.addChild( new BucketHole( buildAnAtomModel.buckets.protonBucket, mvt ) );
//  rootNode.addChild( new BucketHole( buildAnAtomModel.buckets.neutronBucket, mvt ) );
//  rootNode.addChild( new BucketHole( buildAnAtomModel.buckets.electronBucket, mvt ) );

      // Add the bucket fronts to the scene.
      rootNode.addChild( new BucketFront( buildAnAtomModel.buckets.protonBucket, mvt ) );
      rootNode.addChild( new BucketFront( buildAnAtomModel.buckets.neutronBucket, mvt ) );
      rootNode.addChild( new BucketFront( buildAnAtomModel.buckets.electronBucket, mvt ) );

      /*---------------------------------------------------------------------------*
       * FPS meter
       *----------------------------------------------------------------------------*/

      //    var stats = new Stats();
      //    stats.setMode( 0 ); // 0: fps, 1: ms
      //    stats.domElement.style.position = 'absolute';
      //    stats.domElement.style.right = '0';
      //    stats.domElement.style.top = '0';
      //    document.body.appendChild( stats.domElement );


      /*---------------------------------------------------------------------------*
       * main loop
       *----------------------------------------------------------------------------*/

      var lastTime = 0;
      var timeElapsed = 0;

      function tick() {
        window.requestAnimationFrame( tick, sceneGraphDiv[0] );

//      stats.begin();
        scene.updateScene(); // repaints dirty regions. use renderScene() to render everything
//      stats.end();
      }

      window.requestAnimationFrame( tick, sceneGraphDiv[0] );

      // Create the widgets that will display various information about the constructed atom.
//  $( document ).ready( function () {
//    var atom = buildAnAtomModel.atom;
//    var periodicTableWidget = new PeriodicTableView( atom );
//    var symbolWidget = new SymbolView( atom );
//    var massNumberWidget = new MassNumberView( atom );
//    var netChargeWidget = new NetChargeView( atom );
//  } );
    } );
