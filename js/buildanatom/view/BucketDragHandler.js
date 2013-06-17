// Copyright 2002-2013, University of Colorado

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
  "use strict";

  // Imports
  var inherit = require( 'PHET_CORE/inherit' );
  var SimpleDragHandler = require( 'SCENERY/input/SimpleDragHandler' );
  var Vector2 = require( 'DOT/Vector2' );

  /**
   * @constructor
   */
  var BucketDragHandler = function BucketDragHandler( bucket, bucketView, mvt ) {
    var activeParticle = null;
    var options = {
      start: function( event ) {
        console.log( "-----------------------------." );
        console.log( "Start drag received, obtaining particle from bucket." );
        var positionInModelSpace = mvt.viewToModelPosition( bucketView.localToGlobalPoint( event.pointer.point ) );
        var particle = bucket.extractClosestParticle( positionInModelSpace );
        activeParticle = particle;
        if ( activeParticle != null ) {
          activeParticle.setPositionAndDestination( positionInModelSpace );
          activeParticle.userControlled = true;
        }
      },
      translate: function( translationParams ) {
        console.log( "-----------------------------." );
        console.log( "Translate received, delta = " + translationParams.delta );
        if ( activeParticle != null ) {
          activeParticle.setPositionAndDestination( activeParticle.position.plus( mvt.viewToModelDelta( translationParams.delta ) ) );
        }
      },
      end: function( event ) {
        console.log( "-----------------------------." );
        console.log( "End drag received" );
        if ( activeParticle != null ) {
          activeParticle.userControlled = false;
        }
      }
    };
    SimpleDragHandler.call( this, options ); // Call super constructor.
  };

  // Inherit from base class.
  inherit( SimpleDragHandler, BucketDragHandler );

  return BucketDragHandler;
} );
