// Copyright 2025, University of Colorado Boulder

/**
 * BucketGrabReleaseCueNode is a GrabReleaseCueNode for the buckets in Build An Atom.  This is used for alt-input, and
 * it is shown to cue the user that the 'space' key can be used to grab particles from the bucket and then release them
 * into the atom.
 *
 * @author John Blanco (PhET Interactive Simulations)
 */

import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import { TReadOnlyProperty } from '../../../../axon/js/TReadOnlyProperty.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import affirm from '../../../../perennial-alias/js/browser-and-node/affirm.js';
import GrabReleaseCueNode from '../../../../scenery-phet/js/accessibility/nodes/GrabReleaseCueNode.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import buildAnAtom from '../../buildAnAtom.js';

class BucketGrabReleaseCueNode extends GrabReleaseCueNode {
  public constructor(
    protonBucketNode: Node,
    neutronBucketNode: Node,
    electronBucketNode: Node,
    hasBucketInteractionOccurredProperty: TReadOnlyProperty<boolean>,
    tandem: Tandem
  ) {

    // Create a derived property that tracks which bucket node has focus, or null if none have focus.
    const bucketNodeWithFocusProperty = new DerivedProperty(
      [
        protonBucketNode.focusedProperty,
        neutronBucketNode.focusedProperty,
        electronBucketNode.focusedProperty
      ],
      ( protonBucketNodeFocused, neutronBucketNodeFocused, electronBucketNodeFocused ) => {
        let focusedBucketNode: Node | null = null;
        if ( protonBucketNodeFocused ) {
          focusedBucketNode = protonBucketNode;
        }
        else if ( neutronBucketNodeFocused ) {
          focusedBucketNode = neutronBucketNode;
        }
        else if ( electronBucketNodeFocused ) {
          focusedBucketNode = electronBucketNode;
        }
        return focusedBucketNode;
      }
    );

    // Create a derived property that is true when any bucket has focus and interaction has not yet occurred.
    const showThisCueProperty = new DerivedProperty(
      [ bucketNodeWithFocusProperty, hasBucketInteractionOccurredProperty ],
      ( bucketNodeWithFocus, hasBucketInteractionOccurred ) => !!bucketNodeWithFocus && !hasBucketInteractionOccurred
    );

    super( {
      visibleProperty: showThisCueProperty,
      tandem: tandem
    } );

    // Set up offset position relative to the focused bucket.  These are empirically determined, adjust as needed.
    const mapBucketNodeToCueOffset = new Map<Node, Vector2>(
      [
        [ protonBucketNode, new Vector2( 10, -110 ) ],
        [ neutronBucketNode, new Vector2( 0, -110 ) ],
        [ electronBucketNode, new Vector2( 0, -110 ) ]
      ]
    );

    // Update position when a bucket gains focus.  Note that this assumes that this node and the buckets are in the same
    // coordinate frame.
    bucketNodeWithFocusProperty.link( focusedBucketNode => {
      if ( focusedBucketNode ) {
        const offset = mapBucketNodeToCueOffset.get( focusedBucketNode );
        affirm( offset, 'No offset found for focused bucket node' );
        this.center = focusedBucketNode.center.plus( offset );
      }
    } );
  }
}

buildAnAtom.register( 'BucketGrabReleaseCueNode', BucketGrabReleaseCueNode );

export default BucketGrabReleaseCueNode;