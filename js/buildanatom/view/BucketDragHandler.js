// Copyright 2002-2013, University of Colorado Boulder

/**
 * A drag handler specifically tailored for the particle buckets.  This
 * handler extracts a particle from a bucket and manages it as though the
 * user had clicked directly on the particle.  This exists to make it easier
 * for the users to get particles out of the buckets when using a touch-based
 * device.
 *
 * @author John Blanco
 */
define( function( require ) {
  'use strict';

  // Imports
  var inherit = require( 'PHET_CORE/inherit' );
  var SimpleDragHandler = require( 'SCENERY/input/SimpleDragHandler' );

  /**
   * @constructor
   */
  function BucketDragHandler( bucket, bucketView, mvt ) {
    var activeParticle = null;
    var options = {
      start: function( event, trail ) {
        // Note: The following transform works, but it is a bit obscure, and
        // relies on the topology of the scene graph.  JB, SR, and JO
        // discussed potentially better ways to do it.  If this code is
        // leveraged, revisit this line for potential improvement.
        var positionInModelSpace = mvt.viewToModelPosition( bucketView.getParents()[0].globalToLocalPoint( event.pointer.point ) );

        activeParticle = bucket.extractClosestParticle( positionInModelSpace );
        if ( activeParticle !== null ) {
          activeParticle.setPositionAndDestination( positionInModelSpace );
        }
      },
      translate: function( translationParams ) {
        if ( activeParticle !== null ) {
          activeParticle.setPositionAndDestination( activeParticle.position.plus( mvt.viewToModelDelta( translationParams.delta ) ) );
        }
      },
      end: function( event ) {
        if ( activeParticle !== null ) {
          activeParticle.userControlled = false;
        }
      }
    };
    SimpleDragHandler.call( this, options ); // Call super constructor.
  }

  // Inherit from base class.
  return inherit( SimpleDragHandler, BucketDragHandler );
} );
