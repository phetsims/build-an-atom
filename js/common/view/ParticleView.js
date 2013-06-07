// Copyright 2002-2013, University of Colorado

/**
 * Type that represents a sub-atomic particle in the view.
 */
define( function( require ) {
  'use strict';

  var Node = require( 'SCENERY/nodes/Node' );
  var Circle = require( 'SCENERY/nodes/Circle' );
  var SimpleDragHandler = require( 'SCENERY/input/SimpleDragHandler' );
  var ParticleNode = require( 'common/view/ParticleNode' );
  var inherit = require( 'PHET_CORE/inherit' );

  function ParticleView( particle, mvt ) {

    Node.call( this ); // Call super constructor.
    var thisParticleView = this;

    // Set up fields.
    this.particle = particle;
    this.mvt = mvt;

    // Add the particle representation.
    this.addChild( new ParticleNode( particle.type, mvt.modelToViewDeltaX( particle.radius ) ) );

    // Listen to the model position and update.
    particle.positionProperty.link( function( position ) {
      thisParticleView.translation = thisParticleView.mvt.modelToViewPosition( position );
    } );

    // Add a drag handler
    this.addInputListener( new SimpleDragHandler( {
      // Allow moving a finger (touch) across a node to pick it up.
      allowTouchSnag: true,

      // Handler that moves the particle in model space.
      translate: function( translationParams ) {
        particle.setPositionAndDestination( particle.position.plus( mvt.viewToModelDelta( translationParams.delta ) ) );
        return translationParams.position;
      },
      start: function( event, trail ) {
        thisParticleView.particle.userControlled = true;
      },
      end: function( event, trail ) {
        thisParticleView.particle.userControlled = false;
      }
    } ) );
  }

  // Inherit from Node.
  inherit( Node, ParticleView );

  return ParticleView;
} );
