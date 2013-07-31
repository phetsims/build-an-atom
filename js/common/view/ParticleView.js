// Copyright 2002-2013, University of Colorado Boulder

/**
 * Type that represents a sub-atomic particle in the view.
 */
define( function( require ) {
  'use strict';

  var Node = require( 'SCENERY/nodes/Node' );
  var Image = require( 'SCENERY/nodes/Image' );
  var Circle = require( 'SCENERY/nodes/Circle' );
  var SimpleDragHandler = require( 'SCENERY/input/SimpleDragHandler' );
  var ParticleNode = require( 'common/view/ParticleNode' );
  var inherit = require( 'PHET_CORE/inherit' );

  var particleNodes = {};

  function getParticleNode( particle, mvt ) {
    var id = 'id-' + particle.type + '-' + particle.radius;
    if ( particleNodes[id] ) {
      return particleNodes[id];
    }

    //Scale up before rasterization so it won't be too pixellated/fuzzy
    var scale = 2;
    // var particleNode = new ParticleNode( particle.type, mvt.modelToViewDeltaX( particle.radius ) ).mutate( { scale: scale } );
    var viewRadius = mvt.modelToViewDeltaX( particle.radius );
    var scaledRadius = viewRadius * scale;
    
    var particleNode = new ParticleNode( particle.type, scaledRadius );
    console.log( scaledRadius );

    var node = new Node( { cursor: 'pointer' } );
    particleNode.toImage( function( im, x, y ) {

      //Scale back down so the image will be the desired size
      var image = new Image( im, { x: -x, y: -y } );
      image.scale( 1 / scale, 1 / scale, true );
      node.addChild( image );
    }, scaledRadius + 1, scaledRadius + 1, 2 * ( scaledRadius + 1 ), 2 * ( scaledRadius + 1 ) );
    return node;
  }

  function ParticleView( particle, mvt ) {

    Node.call( this, { renderer: 'svg' } ); // Call super constructor.
    var thisParticleView = this;

    // Set up fields.
    this.particle = particle;
    this.mvt = mvt;

    // Add the particle representation.
    this.addChild( getParticleNode( particle, mvt ) );

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
