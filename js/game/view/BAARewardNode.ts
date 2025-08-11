// Copyright 2016-2025, University of Colorado Boulder

/**
 * The reward that is displayed when a game is completed with a perfect score. For testing, the simulation can be run
 * with the 'reward' query parameter to show the reward at the end of every game, regardless of score.
 *
 * @author Aadish Gupta
 */

import dotRandom from '../../../../dot/js/dotRandom.js';
import FaceNode from '../../../../scenery-phet/js/FaceNode.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import AtomIdentifier from '../../../../shred/js/AtomIdentifier.js';
import NumberAtom from '../../../../shred/js/model/NumberAtom.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import RewardNode from '../../../../vegas/js/RewardNode.js';
import buildAnAtom from '../../buildAnAtom.js';
import BAAColors from '../../common/BAAColors.js';
import InteractiveSymbolNode from './InteractiveSymbolNode.js';

// constants
const NUMBER_OF_NODES = 75;
const NUMBER_OF_SYMBOL_NODES = 5;
const FACE_DIAMETER = 40;
const MIN_CHILD_NODE_WIDTH = 40;
const MAX_CHILD_NODE_WIDTH = MIN_CHILD_NODE_WIDTH * 2;

class BAARewardNode extends RewardNode {

  private readonly disposeBAARewardNode: () => void;

  public constructor() {
    const nodes = BAARewardNode.createNodes();
    super( {
      nodes: nodes,

      // As of this writing (Aug 2025), the reward node is not stateful for phet-io.
      tandem: Tandem.OPT_OUT
    } );

    this.disposeBAARewardNode = () => {
      nodes.forEach( node => {
        !node.isDisposed && node.dispose();
      } );
    };
  }

  public override dispose(): void {
    this.disposeBAARewardNode();
    super.dispose();
  }

  private static createRandomStableAtom(): NumberAtom {
    const protonCount = 1 + dotRandom.nextInt( 18 ); // Limit to Argon, since that's as high as translations go.
    return new NumberAtom( {
      protonCount: protonCount,
      neutronCount: AtomIdentifier.getNumNeutronsInMostCommonIsotope( protonCount ),
      electronCount: protonCount
    } );
  }

  private static createNodes(): Node[] {
    const nodes = [];
    for ( let i = 0; i < NUMBER_OF_SYMBOL_NODES; i++ ) {
      const interactiveSymbolNode = new InteractiveSymbolNode( BAARewardNode.createRandomStableAtom(), {
        tandem: Tandem.OPT_OUT
      } );
      interactiveSymbolNode.scale( ( MIN_CHILD_NODE_WIDTH +
                                     dotRandom.nextDouble() *
                                     ( MAX_CHILD_NODE_WIDTH - MIN_CHILD_NODE_WIDTH ) ) /
                                   interactiveSymbolNode.width );
      nodes.push( interactiveSymbolNode );
    }
    const faceNode = new FaceNode( FACE_DIAMETER, { headStroke: BAAColors.facialStrokeColorProperty } );
    nodes.push( faceNode );
    return RewardNode.createRandomNodes( nodes, NUMBER_OF_NODES );
  }
}

buildAnAtom.register( 'BAARewardNode', BAARewardNode );
export default BAARewardNode;