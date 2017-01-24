// Copyright 2014-2015, University of Colorado Boulder

/**
 * Node that depicts an interactive atom where the user can add subatomic particles from a set of buckets.
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
  var shred = require( 'SHRED/shred' );
  var Tandem = require( 'TANDEM/Tandem' );

  // constants
  var NUM_NUCLEON_LAYERS = 5; // This is based on max number of particles, may need adjustment if that changes.

  /**
   * @param {BuildAnAtomModel} model
   * @param {ModelViewTransform2} modelViewTransform
   * @param {Object} [options]
   * @constructor
   */
  function InteractiveSchematicAtom( model, modelViewTransform, options ) {
    options = _.extend( {
      tandem: Tandem.tandemRequired()
    }, options );

    Tandem.validateOptions( options ); // The tandem is required when brand==='phet-io'

    Node.call( this );
    var self = this;

    var particleViews = []; // remember all the particleViews when using in dispose

    // Add the node that depicts the textual labels, the electron shells, and the center X marker.
    var atomNode = new AtomNode( model.particleAtom, modelViewTransform, {
      showElementNameProperty: model.showElementNameProperty,
      showNeutralOrIonProperty: model.showNeutralOrIonProperty,
      showStableOrUnstableProperty: model.showStableOrUnstableProperty,
      electronShellDepictionProperty: model.electronShellDepictionProperty,
      tandem: options.tandem.createTandem( 'atomNode' )
    } );
    this.addChild( atomNode );

    // Add the bucket holes.  Done separately from the bucket front for layering.
    _.each( model.buckets, function( bucket ) {
      self.addChild( new BucketHole( bucket, modelViewTransform ) );
    } );

    // Add the layers where the nucleons will be maintained.
    var nucleonLayers = [];
    _.times( NUM_NUCLEON_LAYERS, function() {
      var nucleonLayer = new Node();
      nucleonLayers.push( nucleonLayer );
      self.addChild( nucleonLayer );
    } );
    nucleonLayers.reverse(); // Set up the nucleon layers so that layer 0 is in front.

    // Add the layer where the electrons will be maintained.
    var electronLayer = new Node( { layerSplit: true } );
    this.addChild( electronLayer );

    // Add the nucleon particle views.
    var nucleonGroupTandem = options.tandem && options.tandem.createGroupTandem( 'nucleons' );
    var electronGroupTandem = options.tandem && options.tandem.createGroupTandem( 'electrons' );
    model.nucleons.forEach( function( nucleon ) {
      var particleView = new ParticleView( nucleon, modelViewTransform, {
        tandem: nucleonGroupTandem && nucleonGroupTandem.createNextTandem()
      } );
      nucleonLayers[ nucleon.zLayerProperty.get() ].addChild( particleView );
      particleViews.push( particleView );

      // Add a listener that adjusts a nucleon's z-order layering.
      nucleon.zLayerProperty.link( function( zLayer ) {
        assert && assert( nucleonLayers.length > zLayer,
          'zLayer for nucleon exceeds number of layers, max number may need increasing.' );

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
      var particleView = new ParticleView( electron, modelViewTransform, {
        tandem: electronGroupTandem.createNextTandem()
      } );
      electronLayer.addChild( particleView );
      particleViews.push( particleView );
    } );

    // When the electrons are represented as a cloud, the individual particles become invisible when added to the atom.
    var updateElectronVisibility = function() {
      electronLayer.getChildren().forEach( function( electronNode ) {
        electronNode.visible = model.electronShellDepictionProperty.get() === 'orbits' || !model.particleAtom.electrons.contains( electronNode.particle );
      } );
    };
    model.particleAtom.electrons.lengthProperty.link( updateElectronVisibility );
    model.electronShellDepictionProperty.link( updateElectronVisibility );

    // Add the front portion of the buckets. This is done separately from the bucket holes for layering purposes.
    _.each( model.buckets, function( bucket ) {
      var bucketFront = new BucketFront( bucket, modelViewTransform );
      self.addChild( bucketFront );
      bucketFront.addInputListener( new BucketDragHandler( bucket, bucketFront, modelViewTransform, {
        tandem: options.tandem && options.tandem.createTandem( bucket.tandemName + 'DragHandler' )
      } ) );
    } );

    this.disposeInteractiveSchematicAtom = function() {
      particleViews.forEach( function( particleView ) {
        particleView.dispose();
      } );
      atomNode.dispose();
      model.particleAtom.electrons.lengthProperty.unlink( updateElectronVisibility );
      model.electronShellDepictionProperty.unlink( updateElectronVisibility );
    };
  }

  shred.register( 'InteractiveSchematicAtom', InteractiveSchematicAtom );

  return inherit( Node, InteractiveSchematicAtom, {
    // @public
    dispose: function() {
      this.disposeInteractiveSchematicAtom();
    }
  } );
} );