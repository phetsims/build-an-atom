// Copyright 2002-2013, University of Colorado Boulder

/**
 * Scenery node that represents a simple, non-interactive clock.  It is
 * intended for use in situations where an icon representing time is needed.
 */
define( function( require ) {
  'use strict';

  // Imports
  var Circle = require( 'SCENERY/nodes/Circle' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Line = require( 'SCENERY/nodes/Line' );
  var Node = require( 'SCENERY/nodes/Node' );

  /**
   * @param radius
   * @param options
   * @constructor
   */
  function SimpleClockIcon( radius, options ) {
    Node.call( this );
    options = _.extend( { fill: 'white', stroke: 'black', lineWidth: 2 }, options );
    var rootNode = new Node();
    rootNode.addChild( new Circle( radius, options ) );
    rootNode.addChild( new Circle( radius * 0.1, { fill: options.stroke } ) );
    rootNode.addChild( new Line( 0, 0, 0, -radius * 0.8, { stroke: options.stroke, lineWidth: options.lineWidth } ) );
    rootNode.addChild( new Line( 0, 0, radius * 0.5, 0, { stroke: options.stroke, lineWidth: options.lineWidth } ) );
    rootNode.centerX = radius;
    rootNode.centerY = radius;
    this.addChild( rootNode );
    this.mutate( options );
  }

  return inherit( Node, SimpleClockIcon );
} );