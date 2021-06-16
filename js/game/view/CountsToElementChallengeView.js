// Copyright 2013-2021, University of Colorado Boulder

/**
 * Challenge where the user is presented with a set of counts for protons,
 * neutrons, and electrons, and must find the represented element on a
 * periodic table.
 *
 * @author John Blanco
 */

import buildAnAtom from '../../buildAnAtom.js';
import ParticleCountsNode from './ParticleCountsNode.js';
import ToElementChallengeView from './ToElementChallengeView.js';

class CountsToElementChallengeView extends ToElementChallengeView {

  /**
   * @param {CountsToElementChallenge} countsToElementChallenge
   * @param {Bounds2} layoutBounds
   * @param {Tandem} tandem
   */
  constructor( countsToElementChallenge, layoutBounds, tandem ) {
    super( countsToElementChallenge, layoutBounds, tandem );

    // Particle counts
    const particleCountsNode = new ParticleCountsNode( countsToElementChallenge.answerAtom );
    this.challengePresentationNode.addChild( particleCountsNode );

    // Layout
    particleCountsNode.centerX = this.periodicTable.left / 2;
    particleCountsNode.centerY = this.periodicTable.centerY;
  }
}

buildAnAtom.register( 'CountsToElementChallengeView', CountsToElementChallengeView );

export default CountsToElementChallengeView;