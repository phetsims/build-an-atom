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
import SphereBucket from '../../../../phetcommon/js/model/SphereBucket.js';
import GrabReleaseCueNode from '../../../../scenery-phet/js/accessibility/nodes/GrabReleaseCueNode.js';
import BucketFront from '../../../../scenery-phet/js/bucket/BucketFront.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import buildAnAtom from '../../buildAnAtom.js';
import BAAParticle from '../model/BAAParticle.js';

class BucketGrabReleaseCueNode extends GrabReleaseCueNode {
  public constructor(
    protonBucketNode: BucketFront,
    neutronBucketNode: BucketFront,
    electronBucketNode: BucketFront,
    hasBucketInteractionOccurredProperty: TReadOnlyProperty<boolean>,
    enabledProperty: TReadOnlyProperty<boolean>,
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
        let focusedBucketNode: BucketFront | null = null;
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
      [ bucketNodeWithFocusProperty, hasBucketInteractionOccurredProperty, enabledProperty ],
      ( bucketNodeWithFocus, hasBucketInteractionOccurred, enabled ) => {
        let focusedBucketIsEmpty = false;
        if ( bucketNodeWithFocus ) {
          const bucket = bucketNodeWithFocus.bucket as SphereBucket<BAAParticle>;
          focusedBucketIsEmpty = bucket.getParticleList().length === 0;
        }
        return !!bucketNodeWithFocus && !hasBucketInteractionOccurred && !focusedBucketIsEmpty && enabled;
      }
    );

    super( {
      visibleProperty: showThisCueProperty,
      tandem: tandem
    } );

    // Offset in the Y direction from the top of the bucket node to the bottom of this grab/release node.
    const yOffsetFromBucketNode = -70;

    // Update position when a bucket gains focus.  Note that this assumes that this node and the buckets are in the same
    // coordinate frame.
    bucketNodeWithFocusProperty.link( focusedBucketNode => {

      if ( focusedBucketNode ) {

        // The y-offset is the same for all buckets.
        this.bottom = focusedBucketNode.top + yOffsetFromBucketNode;

        // The x-offset depends on which bucket has focus.
        if ( focusedBucketNode === protonBucketNode ) {

          // This one needs to be positioned such that it doesn't go off the left side of the screen.
          this.left = 10;
        }
        else {

          // Center this node over the focused bucket.
          this.centerX = focusedBucketNode.centerX;
        }
      }
    } );
  }
}

buildAnAtom.register( 'BucketGrabReleaseCueNode', BucketGrabReleaseCueNode );

export default BucketGrabReleaseCueNode;