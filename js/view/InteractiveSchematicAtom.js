// Copyright 2002-2013, University of Colorado Boulder

/**
 * Node that depicts an interactive atom where the user can add subatomic
 * particles from a set of buckets.
 */
define( function( require ) {
  'use strict';

  // modules
  var AtomNode = require( 'SHRED/view/AtomNode' );
  var BucketDragHandler = require( 'SHRED/view/BucketDragHandler' );
  var BucketFront = require( 'SCENERY_PHET/bucket/BucketFront' );
  var BucketHole = require( 'SCENERY_PHET/bucket/BucketHole' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( 'SCENERY/nodes/Node' );
  var ParticleView = require( 'SHRED/view/ParticleView' );

  // constants
  var NUM_NUCLEON_LAYERS = 5; // This is based on max number of particles, may need adjustment if that changes.

  /**
   * @param model
   * @param mvt
   * @constructor
   */
  function InteractiveSchematicAtom( model, mvt ) {
    Node.call( this );
    var thisNode = this;

    // Add the node that depicts the textual labels, the electron shells, and the center X marker.
    var atomNode = new AtomNode( model.particleAtom, mvt,
      {
        showElementNameProperty: model.showElementNameProperty,
        showNeutralOrIonProperty: model.showNeutralOrIonProperty,
        showStableOrUnstableProperty: model.showStableOrUnstableProperty,
        electronShellDepictionProperty: model.electronShellDepictionProperty
      } );
    this.addChild( atomNode );

    // Add the bucket holes.  Done separately from the bucket front for layering.
    _.each( model.buckets, function( bucket ) {
      thisNode.addChild( new BucketHole( bucket, mvt ) );
    } );

    // Add the layers where the nucleons will be maintained.
    var nucleonLayers = [];
    _.times( NUM_NUCLEON_LAYERS, function() {
      var nucleonLayer = new Node();
      nucleonLayers.push( nucleonLayer );
      thisNode.addChild( nucleonLayer );
    } );
    nucleonLayers.reverse(); // Set up the nucleon layers so that layer 0 is in front.

    // Add the layer where the electrons will be maintained.
    var electronLayer = new Node( { layerSplit: true } );
    this.addChild( electronLayer );

    // Add the nucleon particle views.
    model.nucleons.forEach( function( nucleon ) {
      nucleonLayers[ nucleon.zLayer ].addChild( new ParticleView( nucleon, mvt ) );
      // Add a listener that adjusts a nucleon's z-order layering.
      nucleon.zLayerProperty.link( function( zLayer ) {
        assert && assert( nucleonLayers.length > zLayer, 'zLayer for nucleon exceeds number of layers, max number may need increasing.' );
        // Determine whether nucleon view is on the correct layer.
        var onCorrectLayer = false;
        nucleonLayers[ zLayer ].children.forEach( function( particleView ) {
          if ( particleView.particle === nucleon ) {
            onCorrectLayer = true;
          }
        } );

        if ( !onCorrectLayer ) {

          // Remove particle view from its current layer.
          var particleView = null;
          for ( var layerIndex = 0; layerIndex < nucleonLayers.length && particleView === null; layerIndex++ ) {
            for ( var childIndex = 0; childIndex < nucleonLayers[ layerIndex ].children.length; childIndex++ ) {
              if ( nucleonLayers[ layerIndex ].children[ childIndex ].particle === nucleon ) {
                particleView = nucleonLayers[ layerIndex ].children[ childIndex ];
                nucleonLayers[ layerIndex ].removeChildAt( childIndex );
                break;
              }
            }
          }

          // Add the particle view to its new layer.
          assert && assert( particleView !== null, 'Particle view not found during relayering' );
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
      thisNode.addChild( bucketFront );
      bucketFront.addInputListener( new BucketDragHandler( bucket, bucketFront, mvt ) );
    } );
  }

  return inherit( Node, InteractiveSchematicAtom );
} );