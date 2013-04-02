// Copyright 2002-2013, University of Colorado

/**
 * Type that represents a sub-atomic particle in the view.
 */
define( function ( require ) {
  'use strict';

  var _ = require( 'lodash' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Circle = require( 'SCENERY/nodes/Circle' );
  var SimpleDragHandler = require( 'SCENERY/input/SimpleDragHandler' );
  var inherit = require( 'PHET_CORE/inherit' );

  function ParticleView( particle, mvt ) {

    Node.call( this ); // Call super constructor.
    var particleView = this;

    // Set up fields.
    this.particle = particle;
    this.mvt = mvt;
    this.drawRadius = mvt.modelToView( particle.radius );

    // Create the basic shape.
    this.addChild( new Circle( this.drawRadius, { fill: 'red' } ) );

    // Listen to the model position and update.
    particle.link( 'position', function ( m, position ) {
      particleView.translation = mvt.modelToView( position );
    } );

    // Add a drag handler
    this.addInputListener(
        new SimpleDragHandler( {
                                 // Allow moving a finger (touch) across a node to pick it up.
                                 allowTouchSnag: true
                               } ) );

    // Add a handler for setting/clearing the "user controlled" state.
    this.addInputListener(
        {
          down: function () {
            particleView.particle.userControlled = true;
          },
          up: function () {
            particleView.particle.userControlled = false;
          }
        }
    );
  }

  // Inherit from Node.
  inherit( ParticleView, Node );

  return ParticleView;
} );
