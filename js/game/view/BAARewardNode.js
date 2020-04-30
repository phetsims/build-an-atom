// Copyright 2016-2020, University of Colorado Boulder
/**
 * The reward that is displayed when a game is completed with a perfect score. For testing, the simulation can be run
 * with the 'reward' query parameter to show the reward at the end of every game, regardless of score.
 *
 * @author Aadish Gupta
 */

import inherit from '../../../../phet-core/js/inherit.js';
import FaceNode from '../../../../scenery-phet/js/FaceNode.js';
import AtomIdentifier from '../../../../shred/js/AtomIdentifier.js';
import NumberAtom from '../../../../shred/js/model/NumberAtom.js';
import RewardNode from '../../../../vegas/js/RewardNode.js';
import buildAnAtom from '../../buildAnAtom.js';
import InteractiveSymbolNode from './InteractiveSymbolNode.js';

// constants
const NUMBER_OF_NODES = 75;
const NUMBER_OF_SYMBOL_NODES = 5;
const FACE_DIAMETER = 40;
const MIN_CHILD_NODE_WIDTH = 40;
const MAX_CHILD_NODE_WIDTH = MIN_CHILD_NODE_WIDTH * 2;

/**
 * @param {Tandem} tandem
 * @constructor
 */
function BAARewardNode( tandem ) {
  const nodes = this.createNodes( tandem );
  RewardNode.call( this, { nodes: nodes } );

  // @private
  this.disposeBAARewardNode = function() {
    nodes.forEach( function( node ) {
      !node.isDisposed && node.dispose();
    } );
  };
}

buildAnAtom.register( 'BAARewardNode', BAARewardNode );

inherit( RewardNode, BAARewardNode, {

  /**
   * @public
   */
  dispose: function() {
    this.disposeBAARewardNode();
    RewardNode.prototype.dispose.call( this );
  },

  // @private
  _createRandomStableAtom: function() {
    const atomicNumber = 1 + phet.joist.random.nextInt( 18 ); // Limit to Argon, since that's as high as translations go.
    return new NumberAtom( {
      protonCount: atomicNumber,
      neutronCount: AtomIdentifier.getNumNeutronsInMostCommonIsotope( atomicNumber ),
      electronCount: atomicNumber
    } );
  },

  // @public
  createNodes: function( tandem ) {
    const self = this;
    const nodes = [];
    const groupTandem = tandem.createGroupTandem( 'interactiveSymbolNodes' );
    for ( let i = 0; i < NUMBER_OF_SYMBOL_NODES; i++ ) {
      const interactiveSymbolNode = new InteractiveSymbolNode( self._createRandomStableAtom(), groupTandem.createNextTandem() );
      interactiveSymbolNode.scale( ( MIN_CHILD_NODE_WIDTH +
                                     phet.joist.random.nextDouble() *
                                     ( MAX_CHILD_NODE_WIDTH - MIN_CHILD_NODE_WIDTH ) ) /
                                   interactiveSymbolNode.width );
      nodes.push( interactiveSymbolNode );
    }
    const faceNode = new FaceNode( FACE_DIAMETER );
    nodes.push( faceNode );
    return RewardNode.createRandomNodes( nodes, NUMBER_OF_NODES );
  }
} );

export default BAARewardNode;