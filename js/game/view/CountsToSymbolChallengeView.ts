// Copyright 2013-2025, University of Colorado Boulder

/**
 * View for game challenges where the user is presented with a set of particle counts for an atom and must determine
 * the total charge and enter it in an interactive element symbol.
 *
 * @author John Blanco
 */

import Bounds2 from '../../../../dot/js/Bounds2.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import buildAnAtom from '../../buildAnAtom.js';
import CountsToSymbolChallenge from '../model/CountsToSymbolChallenge.js';
import ParticleCountsNode from './ParticleCountsNode.js';
import ToSymbolChallengeView from './ToSymbolChallengeView.js';

class CountsToSymbolChallengeView extends ToSymbolChallengeView {

  public constructor( countsToSymbolChallenge: CountsToSymbolChallenge, layoutBounds: Bounds2, tandem: Tandem ) {

    super( countsToSymbolChallenge, layoutBounds, tandem );

    // Create the particle counts node, which the user will need to interpret to set the symbol values correctly.
    const particleCountsNode = new ParticleCountsNode( countsToSymbolChallenge.correctAnswerAtom );
    this.challengePresentationNode.addChild( particleCountsNode );

    // layout
    particleCountsNode.centerX = layoutBounds.width * 0.3;
    particleCountsNode.centerY = layoutBounds.height * 0.48;

    // pdom order
    this.challengeNodesPDOMOrder = [

      // start with order of the super class
      ...this.getChallengeNodesPDOMOrder(),
      particleCountsNode
    ];
  }
}

buildAnAtom.register( 'CountsToSymbolChallengeView', CountsToSymbolChallengeView );

export default CountsToSymbolChallengeView;