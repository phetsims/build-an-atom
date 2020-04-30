// Copyright 2014-2020, University of Colorado Boulder

/**
 * Node that depicts an interactive atom where the user can add subatomic particles from a set of buckets.
 */

import inherit from '../../../phet-core/js/inherit.js';
import merge from '../../../phet-core/js/merge.js';
import BucketFront from '../../../scenery-phet/js/bucket/BucketFront.js';
import BucketHole from '../../../scenery-phet/js/bucket/BucketHole.js';
import Node from '../../../scenery/js/nodes/Node.js';
import Tandem from '../../../tandem/js/Tandem.js';
import shred from '../shred.js';
import AtomNode from './AtomNode.js';
import BucketDragHandler from './BucketDragHandler.js';
import ParticleView from './ParticleView.js';

// constants
const NUM_NUCLEON_LAYERS = 5; // This is based on max number of particles, may need adjustment if that changes.

/**
 * @param {BuildAnAtomModel} model
 * @param {ModelViewTransform2} modelViewTransform
 * @param {Object} [options]
 * @constructor
 */
function InteractiveSchematicAtom( model, modelViewTransform, options ) {
  options = merge( {
    tandem: Tandem.REQUIRED
  }, options );

  Node.call( this );
  const self = this;

  const particleViews = []; // remember all the particleViews when using in dispose

  // Add the node that depicts the textual labels, the electron shells, and the center X marker.
  const atomNode = new AtomNode( model.particleAtom, modelViewTransform, {
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
  const nucleonLayers = [];
  _.times( NUM_NUCLEON_LAYERS, function() {
    const nucleonLayer = new Node();
    nucleonLayers.push( nucleonLayer );
    self.addChild( nucleonLayer );
  } );
  nucleonLayers.reverse(); // Set up the nucleon layers so that layer 0 is in front.

  // Add the layer where the electrons will be maintained.
  const electronLayer = new Node( { layerSplit: true } );
  this.addChild( electronLayer );

  // Add the nucleon particle views.
  const nucleonGroupTandem = options.tandem && options.tandem.createGroupTandem( 'nucleons' );
  const electronGroupTandem = options.tandem && options.tandem.createGroupTandem( 'electrons' );
  model.nucleons.forEach( function( nucleon ) {
    const particleView = new ParticleView( nucleon, modelViewTransform, {
      tandem: nucleonGroupTandem && nucleonGroupTandem.createNextTandem()
    } );
    nucleonLayers[ nucleon.zLayerProperty.get() ].addChild( particleView );
    particleViews.push( particleView );

    // Add a listener that adjusts a nucleon's z-order layering.
    nucleon.zLayerProperty.link( function( zLayer ) {
      assert && assert( nucleonLayers.length > zLayer,
        'zLayer for nucleon exceeds number of layers, max number may need increasing.' );

      // Determine whether nucleon view is on the correct layer.
      let onCorrectLayer = false;
      nucleonLayers[ zLayer ].children.forEach( function( particleView ) {
        if ( particleView.particle === nucleon ) {
          onCorrectLayer = true;
        }
      } );

      if ( !onCorrectLayer ) {

        // Remove particle view from its current layer.
        let particleView = null;
        for ( let layerIndex = 0; layerIndex < nucleonLayers.length && particleView === null; layerIndex++ ) {
          for ( let childIndex = 0; childIndex < nucleonLayers[ layerIndex ].children.length; childIndex++ ) {
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
    const particleView = new ParticleView( electron, modelViewTransform, {
      tandem: electronGroupTandem.createNextTandem()
    } );
    electronLayer.addChild( particleView );
    particleViews.push( particleView );
  } );

  // When the electrons are represented as a cloud, the individual particles become invisible when added to the atom.
  const updateElectronVisibility = function() {
    electronLayer.getChildren().forEach( function( electronNode ) {
      electronNode.visible = model.electronShellDepictionProperty.get() === 'orbits' || !model.particleAtom.electrons.contains( electronNode.particle );
    } );
  };
  model.particleAtom.electrons.lengthProperty.link( updateElectronVisibility );
  model.electronShellDepictionProperty.link( updateElectronVisibility );

  // Add the front portion of the buckets. This is done separately from the bucket holes for layering purposes.
  const bucketGroupTandem = options.tandem.createGroupTandem( 'bucketFronts' );
  const bucketFrontsAndDragHandlers = []; // keep track for disposal
  _.each( model.buckets, function( bucket ) {
    const bucketFront = new BucketFront( bucket, modelViewTransform, { tandem: bucketGroupTandem.createNextTandem() } );
    self.addChild( bucketFront );
    const bucketDragHandler = new BucketDragHandler( bucket, bucketFront, modelViewTransform, {
      tandem: options.tandem && options.tandem.createTandem( bucket.sphereBucketTandem.name + 'DragHandler' )
    } );
    bucketFront.addInputListener( bucketDragHandler );

    // add to separate list for later disposal
    bucketFrontsAndDragHandlers.push( bucketFront );
    bucketFrontsAndDragHandlers.push( bucketDragHandler );
  } );

  this.disposeInteractiveSchematicAtom = function() {
    particleViews.forEach( function( particleView ) { particleView.dispose(); } );
    bucketFrontsAndDragHandlers.forEach( function( bucketItem ) { bucketItem.dispose(); } );
    atomNode.dispose();
    model.particleAtom.electrons.lengthProperty.unlink( updateElectronVisibility );
    model.electronShellDepictionProperty.unlink( updateElectronVisibility );
  };

  this.mutate( options );
}

shred.register( 'InteractiveSchematicAtom', InteractiveSchematicAtom );

inherit( Node, InteractiveSchematicAtom, {
  // @public
  dispose: function() {
    this.disposeInteractiveSchematicAtom();
    Node.prototype.dispose.call( this );
  }
} );

export default InteractiveSchematicAtom;