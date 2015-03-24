// Copyright 2002-2013, University of Colorado Boulder

/**
 * Particle, represented as a circle with a gradient.  This type does not
 * track a particle, use ParticleView for that.
 */
define( function( require ) {
  'use strict';

  var Node = require( 'SCENERY/nodes/Node' );
  var Circle = require( 'SCENERY/nodes/Circle' );
  var RadialGradient = require( 'SCENERY/util/RadialGradient' );
  var inherit = require( 'PHET_CORE/inherit' );

  /**
   * @param particleType - proton, neutron, or electron
   * @param radius
   * @param {Object} [options]
   * @constructor
   */
  function ParticleNode( particleType, radius, options ) {

    Node.call( this, options ); // Call super constructor.

    var colors = { proton: 'red', neutron: 'gray', electron: 'blue' };
    var baseColor = colors[ particleType ];
    if ( baseColor === undefined ) {
      console.error( 'Unrecognized particle type: ' + particleType );
      baseColor = 'black';
    }

    // Create the node a circle with a gradient.
    this.addChild( new Circle( radius,
      {
        fill: new RadialGradient( -radius * 0.4, -radius * 0.4, 0, -radius * 0.4, -radius * 0.4, radius * 1.6 )
          .addColorStop( 0, 'white' )
          .addColorStop( 1, baseColor ),
        cursor: 'pointer'
      } ) );
  }

  // Inherit from Node.
  return inherit( Node, ParticleNode );
} );
