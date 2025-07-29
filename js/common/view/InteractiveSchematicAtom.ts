// Copyright 2014-2025, University of Colorado Boulder

/**
 * Node that depicts an interactive atom where the user can add subatomic particles from a set of buckets.
 *
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */

import Property from '../../../../axon/js/Property.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import ModelViewTransform2 from '../../../../phetcommon/js/view/ModelViewTransform2.js';
import BucketFront from '../../../../scenery-phet/js/bucket/BucketFront.js';
import BucketHole from '../../../../scenery-phet/js/bucket/BucketHole.js';
import Node, { NodeOptions } from '../../../../scenery/js/nodes/Node.js';
import AtomNode from '../../../../shred/js/view/AtomNode.js';
import BucketDragListener from '../../../../shred/js/view/BucketDragListener.js';
import ParticleView from '../../../../shred/js/view/ParticleView.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import buildAnAtom from '../../buildAnAtom.js';
import BAAConstants from '../BAAConstants.js';
import BAAModel from '../model/BAAModel.js';
import BAAParticleView from './BAAParticleView.js';

// constants
const NUM_NUCLEON_LAYERS = 5; // This is based on max number of particles, may need adjustment if that changes.
type SelfOptions = EmptySelfOptions;

type InteractiveSchematicAtomOptions = SelfOptions & NodeOptions;

class InteractiveSchematicAtom extends Node {
  private readonly disposeInteractiveSchematicAtom: VoidFunction;

  public constructor( model: BAAModel,
                      modelViewTransform: ModelViewTransform2,
                      providedOptions?: InteractiveSchematicAtomOptions ) {

    const options = optionize<InteractiveSchematicAtomOptions, SelfOptions, NodeOptions>()( {
      tandem: Tandem.REQUIRED
    }, providedOptions );

    super();

    const particleViews: ParticleView[] = []; // remember all the particleViews when using in dispose

    // Add the node that depicts the textual labels, the electron shells, and the center X marker.
    const atomNode = new AtomNode( model.atom, modelViewTransform, {
      showElementNameProperty: BAAConstants.ALWAYS_FALSE_PROPERTY,
      showNeutralOrIonProperty: BAAConstants.ALWAYS_FALSE_PROPERTY,
      showStableOrUnstableProperty: BAAConstants.ALWAYS_FALSE_PROPERTY,
      electronShellDepictionProperty: new Property( 'orbits' ),
      tandem: options.tandem.createTandem( 'atomNode' )
    } );
    this.addChild( atomNode );

    // Add the bucket holes.  Done separately from the bucket front for layering.
    _.each( model.buckets, bucket => this.addChild( new BucketHole( bucket, modelViewTransform ) ) );

    // Add the layers where the nucleons will be maintained.
    const nucleonLayers: Node[] = [];
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
    const nucleonGroupTandem = options.tandem && options.tandem.createTandem( 'nucleons' ).createGroupTandem( 'nucleon', 0 );
    const electronGroupTandem = options.tandem && options.tandem.createTandem( 'electrons' ).createGroupTandem( 'electron', 0 );
    model.nucleons.forEach( nucleon => {
      const particleView = new BAAParticleView( nucleon, modelViewTransform, {
        tandem: nucleonGroupTandem && nucleonGroupTandem.createNextTandem()
      } );
      nucleonLayers[ nucleon.zLayerProperty.get() ].addChild( particleView );
      particleViews.push( particleView );

      // Add a listener that adjusts a nucleon's z-order layering.
      nucleon.zLayerProperty.link( ( zLayer: number ) => {
        assert && assert( nucleonLayers.length > zLayer,
          'zLayer for nucleon exceeds number of layers, max number may need increasing.' );

        const desiredLayer = nucleonLayers[ zLayer ];

        // Determine whether nucleon view is on the correct layer.
        const onCorrectLayer = desiredLayer.children.includes( particleView );

        if ( !onCorrectLayer ) {

          // Remove particle view from its current layer.
          let particleViewFoundAndRemoved = false;
          for ( const layer of nucleonLayers ) {
            if ( layer.children.includes( particleView ) ) {
              layer.removeChild( particleView );
              particleViewFoundAndRemoved = true;
              break;
            }
          }

          // Add the particle view to its new layer.
          assert && assert( particleViewFoundAndRemoved, 'Particle view not found during relayering' );
          desiredLayer.addChild( particleView );
        }
      } );
    } );

    // Add the electron particle views.
    model.electrons.forEach( electron => {
      const particleView = new BAAParticleView( electron, modelViewTransform, {
        tandem: electronGroupTandem.createNextTandem()
      } );
      electronLayer.addChild( particleView );
      particleViews.push( particleView );
    } );

    // Add the front portion of the buckets. This is done separately from the bucket holes for layering purposes.
    const bucketFrontsAndDragHandlers: { dispose: VoidFunction }[] = []; // keep track for disposal
    _.each( model.buckets, bucket => {
      const bucketFront = new BucketFront( bucket, modelViewTransform );
      this.addChild( bucketFront );

      const bucketDragListener = new BucketDragListener( bucket, bucketFront, modelViewTransform, {
        tandem: options.tandem && options.tandem.createTandem( `${bucket.sphereBucketTandem.name}DragListener` )
      } );
      bucketFront.addInputListener( bucketDragListener );

      // add to separate list for later disposal
      bucketFrontsAndDragHandlers.push( bucketFront );
      bucketFrontsAndDragHandlers.push( bucketDragListener );
    } );
    this.disposeInteractiveSchematicAtom = () => {
      particleViews.forEach( particleView => particleView.dispose() );
      bucketFrontsAndDragHandlers.forEach( bucketItem => bucketItem.dispose() );
      atomNode.dispose();
    };

    this.mutate( options );
  }

  public override dispose(): void {
    this.disposeInteractiveSchematicAtom();
    super.dispose();
  }
}

buildAnAtom.register( 'InteractiveSchematicAtom', InteractiveSchematicAtom );
export default InteractiveSchematicAtom;