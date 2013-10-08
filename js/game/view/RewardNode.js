// Copyright 2002-2013, University of Colorado Boulder

/**
 * This type defines an animated screen which is displayed as a sort of
 * 'reward' when the user gets a perfect score on a game level.  It animates
 * a set of chemical symbols falling from the sky.
 */
define( function( require ) {
  'use strict';

  // Imports
  var AtomIdentifier = require( 'common/AtomIdentifier' );
  var Dimension2 = require( 'DOT/Dimension2' );
  var FaceNode = require( 'SCENERY_PHET/FaceNode' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( 'SCENERY/nodes/Node' );
  var NumberAtom = require( 'common/model/NumberAtom' );
  var InteractiveSymbolNode = require( 'game/view/InteractiveSymbolNode' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );

  // Constants
  var MIN_CHILD_NODE_WIDTH = 40;
  var MAX_CHILD_NODE_WIDTH = MIN_CHILD_NODE_WIDTH * 2;
  var MIN_CHILD_VELOCITY = 100; // In pixels per second.
  var MAX_CHILD_VELOCITY = 200; // In pixels per second.

  /**
   * @param stepClock
   * @param options
   * @constructor
   */
  function RewardNode( stepClock, options ) {
    Node.call( this, { renderer: 'svg', rendererOptions: { cssTransform: true }, pickable: false } );
    var thisNode = this;

    options = _.extend( { size: new Dimension2( 1000, 850 ), population: 50 }, options );

    thisNode.size = options.size;

    // Add an invisible background node that will serve as a means for positioning this node.
    thisNode.addChild( new Rectangle( 0, 0, thisNode.size.width, thisNode.size.height, 0, 0, { fill: 'rgba( 0, 0, 0, 0 )' } ) );

    // List of moving nodes.  The positions of these nodes are updated at each time step.
    thisNode.movingChildNodes = [];

    // Add the child nodes.
    _.times( options.population, function() {
      thisNode._addRandomNode();
    } );

    // Hook up to the step clock.
    stepClock.addStepListener( function( dt ){
      if ( thisNode.animationEnabled ){
        for ( var i = 0; i< thisNode.movingChildNodes.length; i++ ){
          var childNode = thisNode.movingChildNodes[i];
          childNode.top = childNode.top + childNode.velocity * dt;
          if ( childNode.bottom >= thisNode.size.height ) {
            // Back to the top.
            childNode.top = 0;
            childNode.left = Math.random() * ( thisNode.size.width - childNode.width );
            childNode.velocity = MIN_CHILD_VELOCITY + Math.random() * ( MAX_CHILD_VELOCITY - MIN_CHILD_VELOCITY );
          }
        }
      }
    } );
  }

  return inherit( Node, RewardNode, {

    // Turns on/off the animation.
    animationEnabled: false,

    _addRandomNode: function() {
      var childNode;
      if ( Math.random() > 0.2 ) {
        // Add a symbol node.
        childNode = new InteractiveSymbolNode( this._createRandomStableAtom() );
        childNode.scale( ( MIN_CHILD_NODE_WIDTH + Math.random() * ( MAX_CHILD_NODE_WIDTH - MIN_CHILD_NODE_WIDTH ) ) / childNode.width );
      }
      else {
        // Add a smiley face.
        childNode = new FaceNode( MIN_CHILD_NODE_WIDTH + Math.random() * ( MAX_CHILD_NODE_WIDTH - MIN_CHILD_NODE_WIDTH ) );
      }
      childNode.mutate( { centerX: Math.random() * ( this.size.width - childNode.width ), centerY: Math.random() * ( this.size.height - childNode.height ) } );
      this.addChild( childNode );
      childNode.velocity = MIN_CHILD_VELOCITY + Math.random() * ( MAX_CHILD_VELOCITY - MIN_CHILD_VELOCITY );
      this.movingChildNodes.push( childNode );
    },

    _createRandomStableAtom: function() {
      var atomicNumber = 1 + Math.floor( Math.random() * 108 );
      return new NumberAtom(
        {
          protonCount: atomicNumber,
          neutronCount: AtomIdentifier.getNumNeutronsInMostCommonIsotope( atomicNumber ),
          electronCount: atomicNumber
        } );
    }
  } );
} );