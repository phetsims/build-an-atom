// Copyright 2013-2015, University of Colorado Boulder

/**
 * This type defines an animated screen which is displayed as a sort of
 * 'reward' when the user gets a perfect score on a game level.  It animates
 * a set of chemical symbols falling from the sky.
 *
 * @author John Blanco
 */
define( function( require ) {
  'use strict';

  // modules
  var AtomIdentifier = require( 'SHRED/AtomIdentifier' );
  var Dimension2 = require( 'DOT/Dimension2' );
  var FaceNode = require( 'SCENERY_PHET/FaceNode' );
  var Image = require( 'SCENERY/nodes/Image' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( 'SCENERY/nodes/Node' );
  var NumberAtom = require( 'SHRED/model/NumberAtom' );
  var InteractiveSymbolNode = require( 'BUILD_AN_ATOM/game/view/InteractiveSymbolNode' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );

  // constants
  var MIN_CHILD_NODE_WIDTH = 40;
  var MAX_CHILD_NODE_WIDTH = MIN_CHILD_NODE_WIDTH * 2;
  var MIN_CHILD_VELOCITY = 100; // In pixels per second.
  var MAX_CHILD_VELOCITY = 200; // In pixels per second.
  var NUM_SYMBOL_NODES_TO_CREATE = 8;
  var NUM_FACE_NODES_CREATED = 3;
  var NUM_TIMES_TO_REUSE_NODES = 3;

  /**
   * @param stepClock
   * @param {Tandem} tandem
   * @param {Object} [options]
   * @constructor
   */
  function RewardNode( stepClock, tandem, options ) {
    Node.call( this, { pickable: false } );
    var thisNode = this;

    options = _.extend( { size: new Dimension2( 1000, 850 ), population: 50 }, options );

    thisNode.size = options.size;

    // Add an invisible background node that will serve as a means for positioning this node.
    thisNode.addChild( new Rectangle( 0, 0, thisNode.size.width, thisNode.size.height, 0, 0, { visible: false } ) );

    // List of moving nodes.  The positions of these nodes are updated at each time step.
    thisNode.movingChildNodes = [];

    // Function for adding multiple instances of an image.  Reusing the same
    // node multiple times requires less resources and thus runs smoother.
    function addImage( image ) {
      var imageNode = new Image( image );
      _.times( NUM_TIMES_TO_REUSE_NODES, function() {
        var rootNode = new Node();
        rootNode.addChild( imageNode );
        rootNode.mutate( {
          centerX: Math.random() * ( thisNode.size.width - imageNode.width ),
          centerY: Math.random() * ( thisNode.size.height - imageNode.height )
        } );
        rootNode.velocity = MIN_CHILD_VELOCITY + Math.random() * ( MAX_CHILD_VELOCITY - MIN_CHILD_VELOCITY );
        thisNode.movingChildNodes.push( rootNode );
        thisNode.addChild( rootNode );
      } );
    }

    // Create the symbol and smiley face nodes.
    thisNode.symbolNodes = [];
    var groupTandem = tandem.createGroupTandem( 'interactiveSymbolNodes' );
    _.times( NUM_SYMBOL_NODES_TO_CREATE, function() {
      var interactiveSymbolNode = new InteractiveSymbolNode( thisNode._createRandomStableAtom(), groupTandem.createNextTandem() );
      interactiveSymbolNode.scale( ( MIN_CHILD_NODE_WIDTH + Math.random() * ( MAX_CHILD_NODE_WIDTH - MIN_CHILD_NODE_WIDTH ) ) / interactiveSymbolNode.width );
      interactiveSymbolNode.toImage( addImage );
    } );
    thisNode.faceNodes = [];
    for ( var i = 0; i < NUM_FACE_NODES_CREATED; i++ ) {
      var faceNode = new FaceNode( MIN_CHILD_NODE_WIDTH + ( ( i + 1 ) / NUM_FACE_NODES_CREATED ) * ( MAX_CHILD_NODE_WIDTH - MIN_CHILD_NODE_WIDTH ) );
      faceNode.toImage( addImage );
    }

    // Hook up the step clock to drive the animation.
    stepClock.addStepListener( function( dt ) {
      if ( thisNode.animationEnabled ) {
        for ( var i = 0; i < thisNode.movingChildNodes.length; i++ ) {
          var childNode = thisNode.movingChildNodes[ i ];
          childNode.translate( 0, childNode.velocity * dt / childNode.getScaleVector().y );
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

    _createRandomStableAtom: function() {
      var atomicNumber = 1 + Math.floor( Math.random() * 18 ); // Limit to Argon, since that's as high as translations go.
      return new NumberAtom( {
        protonCount: atomicNumber,
        neutronCount: AtomIdentifier.getNumNeutronsInMostCommonIsotope( atomicNumber ),
        electronCount: atomicNumber
      } );
    }
  } );
} );
