// Copyright 2016-2021, University of Colorado Boulder

/**
 * The reward that is displayed when a game is completed with a perfect score. For testing, the simulation can be run
 * with the 'reward' query parameter to show the reward at the end of every game, regardless of score.
 *
 * @author Aadish Gupta
 */

import dotRandom from '../../../../dot/js/dotRandom.js';
import FaceNode from '../../../../scenery-phet/js/FaceNode.js';
import AtomIdentifier from '../../../../shred/js/AtomIdentifier.js';
import NumberAtom from '../../../../shred/js/model/NumberAtom.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import RewardNode from '../../../../vegas/js/RewardNode.js';
import buildAnAtom from '../../buildAnAtom.js';
import InteractiveSymbolNode from './InteractiveSymbolNode.js';

// constants
const NUMBER_OF_NODES = 75;
const NUMBER_OF_SYMBOL_NODES = 5;
const FACE_DIAMETER = 40;
const MIN_CHILD_NODE_WIDTH = 40;
const MAX_CHILD_NODE_WIDTH = MIN_CHILD_NODE_WIDTH * 2;

class BAARewardNode extends RewardNode {

  /**
   * @param {Tandem} tandem
   */
  constructor( tandem ) {
    const nodes = createNodes( tandem );
    super( { nodes: nodes } );

    // @private
    this.disposeBAARewardNode = () => {
      nodes.forEach( node => {
        !node.isDisposed && node.dispose();
      } );
    };
  }

  /**
   * @public
   * @override
   */
  dispose() {
    this.disposeBAARewardNode();
    super.dispose();
  }
}

// @private
function createRandomStableAtom() {
  const atomicNumber = 1 + dotRandom.nextInt( 18 ); // Limit to Argon, since that's as high as translations go.
  return new NumberAtom( {
    protonCount: atomicNumber,
    neutronCount: AtomIdentifier.getNumNeutronsInMostCommonIsotope( atomicNumber ),
    electronCount: atomicNumber
  } );
}

// @public
function createNodes( tandem ) {
  const nodes = [];
  for ( let i = 0; i < NUMBER_OF_SYMBOL_NODES; i++ ) {
    const interactiveSymbolNode = new InteractiveSymbolNode( createRandomStableAtom(), Tandem.OPT_OUT );
    interactiveSymbolNode.scale( ( MIN_CHILD_NODE_WIDTH +
                                   dotRandom.nextDouble() *
                                   ( MAX_CHILD_NODE_WIDTH - MIN_CHILD_NODE_WIDTH ) ) /
                                 interactiveSymbolNode.width );
    nodes.push( interactiveSymbolNode );
  }
  const faceNode = new FaceNode( FACE_DIAMETER );
  nodes.push( faceNode );
  return RewardNode.createRandomNodes( nodes, NUMBER_OF_NODES );
}

buildAnAtom.register( 'BAARewardNode', BAARewardNode );
export default BAARewardNode;