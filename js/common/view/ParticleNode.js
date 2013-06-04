// Copyright 2002-2013, University of Colorado

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

  function ParticleNode( particleType, radius ) {

    Node.call( this ); // Call super constructor.

    // Set up the color based on the particle type.
    var baseColor;
    switch( particleType ) {
      case 'proton':
        baseColor = 'red';
        break;
      case 'neutron':
        baseColor = 'gray';
        break;
      case 'electron':
        baseColor = 'blue';
        break;
      default:
        console.error( 'Unrecognized particle type.' );
        baseColor = 'black';
        break;
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
  inherit( ParticleNode, Node );

  return ParticleNode;
} );
