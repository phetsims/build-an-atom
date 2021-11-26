// Copyright 2014-2021, University of Colorado Boulder

/**
 * Node that depicts an interactive atom where the user can add subatomic particles from a set of buckets.
 */

import merge from '../../../phet-core/js/merge.js';
import BucketFront from '../../../scenery-phet/js/bucket/BucketFront.js';
import BucketHole from '../../../scenery-phet/js/bucket/BucketHole.js';
import { Node } from '../../../scenery/js/imports.js';
import Tandem from '../../../tandem/js/Tandem.js';
import shred from '../shred.js';
import AtomNode from './AtomNode.js';
import BucketDragListener from './BucketDragListener.js';
import ParticleView from './ParticleView.js';

// constants
const NUM_NUCLEON_LAYERS = 5; // This is based on max number of particles, may need adjustment if that changes.

class InteractiveSchematicAtom extends Node {

  /**
   * @param {BuildAnAtomModel} model
   * @param {ModelViewTransform2} modelViewTransform
   * @param {Object} [options]
   */
  constructor( model, modelViewTransform, options ) {
    options = merge( {

      // {Property.<boolean>|null} - property that can be used to turn on high-contrast particles
      highContrastProperty: null,

      tandem: Tandem.REQUIRED
    }, options );

    super();

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
    _.each( model.buckets, bucket => this.addChild( new BucketHole( bucket, modelViewTransform ) ) );

    // Add the layers where the nucleons will be maintained.
    const nucleonLayers = [];
    _.times( NUM_NUCLEON_LAYERS, () => {
      const nucleonLayer = new Node();
      nucleonLayers.push( nucleonLayer );
      this.addChild( nucleonLayer );
    } );
    nucleonLayers.reverse(); // Set up the nucleon layers so that layer 0 is in front.

    // Add the layer where the electrons will be maintained.
    const electronLayer = new Node( { layerSplit: true } );
    this.addChild( electronLayer );

    // Add the nucleon particle views.
    const nucleonGroupTandem = options.tandem && options.tandem.createTandem( 'nucleons' ).createGroupTandem( 'nucleon' );
    const electronGroupTandem = options.tandem && options.tandem.createTandem( 'electrons' ).createGroupTandem( 'electron' );
    model.nucleons.forEach( nucleon => {
      const particleView = new ParticleView( nucleon, modelViewTransform, {
        highContrastProperty: options.highContrastProperty,
        tandem: nucleonGroupTandem && nucleonGroupTandem.createNextTandem()
      } );
      nucleonLayers[ nucleon.zLayerProperty.get() ].addChild( particleView );
      particleViews.push( particleView );

      // Add a listener that adjusts a nucleon's z-order layering.
      nucleon.zLayerProperty.link( zLayer => {
        assert && assert( nucleonLayers.length > zLayer,
          'zLayer for nucleon exceeds number of layers, max number may need increasing.' );

        // Determine whether nucleon view is on the correct layer.
        let onCorrectLayer = false;
        nucleonLayers[ zLayer ].children.forEach( particleView => {
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
    model.electrons.forEach( electron => {
      const particleView = new ParticleView( electron, modelViewTransform, {
        highContrastProperty: options.highContrastProperty,
        tandem: electronGroupTandem.createNextTandem()
      } );
      electronLayer.addChild( particleView );
      particleViews.push( particleView );
    } );

    // When the electrons are represented as a cloud, the individual particles become invisible when added to the atom.
    const updateElectronVisibility = () => {
      electronLayer.getChildren().forEach( electronNode => {
        electronNode.visible = model.electronShellDepictionProperty.get() === 'orbits' ||
                               !model.particleAtom.electrons.includes( electronNode.particle );
      } );
    };
    model.particleAtom.electrons.lengthProperty.link( updateElectronVisibility );
    model.electronShellDepictionProperty.link( updateElectronVisibility );

    // Add the front portion of the buckets. This is done separately from the bucket holes for layering purposes.
    const bucketGroupTandem = options.tandem.createTandem( 'bucketFronts' ).createGroupTandem( 'bucketFront' );
    const bucketFrontsAndDragHandlers = []; // keep track for disposal
    _.each( model.buckets, bucket => {
      const bucketFront = new BucketFront( bucket, modelViewTransform, { tandem: bucketGroupTandem.createNextTandem() } );
      this.addChild( bucketFront );
      const bucketDragListener = new BucketDragListener( bucket, bucketFront, modelViewTransform, {
        tandem: options.tandem && options.tandem.createTandem( `${bucket.sphereBucketTandem.name}DragListener` )
      } );
      bucketFront.addInputListener( bucketDragListener );

      // add to separate list for later disposal
      bucketFrontsAndDragHandlers.push( bucketFront );
      bucketFrontsAndDragHandlers.push( bucketDragListener );
    } );

    // @private
    this.disposeInteractiveSchematicAtom = () => {
      particleViews.forEach( particleView => particleView.dispose() );
      bucketFrontsAndDragHandlers.forEach( bucketItem => bucketItem.dispose() );
      atomNode.dispose();
      model.particleAtom.electrons.lengthProperty.unlink( updateElectronVisibility );
      model.electronShellDepictionProperty.unlink( updateElectronVisibility );
    };

    this.mutate( options );
  }

  /**
   * @public
   * @override
   */
  dispose() {
    this.disposeInteractiveSchematicAtom();
    super.dispose();
  }
}

shred.register( 'InteractiveSchematicAtom', InteractiveSchematicAtom );
export default InteractiveSchematicAtom;