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
   * @param options
   * @constructor
   */
  function RewardNode( options ) {
    Node.call( this, { renderer: 'svg', rendererOptions: { cssTransform: true }, pickable: false } );
    var thisNode = this;

    options = _.extend( { size: new Dimension2( 1000, 750 ), population: 50 }, options );

    thisNode.size = options.size;

    // Add an invisible background node that will serve as a means for positioning this node.
    thisNode.addChild( new Rectangle( 0, 0, thisNode.size.width, thisNode.size.height, 0, 0, { fill: 'rgba( 0, 0, 0, 0 )' } ) );

    // List of moving nodes.  The positions of these nodes are updated at each time step.
    thisNode.movingChildNodes = [];

    // Add the child nodes.
    _.times( options.population, function() {
      thisNode._addRandomNode();
    } );

    // Add the animation capability.
    thisNode.animate = function() {
      var now = Date.now();
      var dt = ( now - thisNode.lastFrameTime ) * 0.001; // Delta time, in milliseconds.
      //TODO: Factor out function.
      thisNode.movingChildNodes.forEach( function( childNode ) {
        childNode.top = childNode.top + childNode.velocity * dt;
        if ( childNode.bottom >= thisNode.size.height ) {
          // Back to the top.

          childNode.top = 0; //
          childNode.left = Math.random() * ( thisNode.size.width - childNode.width );
          childNode.velocity = MIN_CHILD_VELOCITY + Math.random() * ( MAX_CHILD_VELOCITY - MIN_CHILD_VELOCITY );
        }
      } );
      thisNode.lastFrameTime = now;
      if ( thisNode.animating ) {
        requestAnimationFrame( thisNode.animate );
      }
    };
    thisNode.lastFrameTime = Date.now();
    thisNode.animating = false;
  }

  return inherit( Node, RewardNode, {

    // Call this function before releasing reference to this
    startAnimation: function() {
      if ( !this.animating ) {
        this.animating = true;
        this.lastFrameTime = new Date().getTime();
        this.animate();
      }
    },

    stopAnimation: function() {
      this.animating = false;
    },

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