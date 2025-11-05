// Copyright 2013-2025, University of Colorado Boulder

/**
 * Challenge where the user is presented with a set of counts for protons, neutrons, and electrons, and must find the
 * represented element on a periodic table.
 *
 * @author John Blanco
 */

import Bounds2 from '../../../../dot/js/Bounds2.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import buildAnAtom from '../../buildAnAtom.js';
import BuildAnAtomStrings from '../../BuildAnAtomStrings.js';
import CountsToElementChallenge from '../model/CountsToElementChallenge.js';
import ParticleCountsNode from './ParticleCountsNode.js';
import ToElementChallengeView from './ToElementChallengeView.js';

class CountsToElementChallengeView extends ToElementChallengeView {

  public constructor( countsToElementChallenge: CountsToElementChallenge, layoutBounds: Bounds2, tandem: Tandem ) {

    super( countsToElementChallenge, layoutBounds, tandem );

    // Particle counts
    const particleCountsNode = new ParticleCountsNode( countsToElementChallenge.correctAnswerAtom );
    this.challengePresentationNode.addChild( particleCountsNode );

    // Layout
    particleCountsNode.centerX = this.periodicTable.left / 2;
    particleCountsNode.centerY = this.periodicTable.centerY;

    // Accessible Paragraphs for the description of the challenge.
    // Made a child node for consistency with the correct answer paragraph.
    this.accessibleParagraphNode.accessibleParagraph = BuildAnAtomStrings.a11y.gameScreen.challenges.countsToElement.accessibleParagraphStringProperty;

    // Assign challenge specific components to the a11y view
    this.challengeNodesPDOMOrder = [
      ...this.getChallengeNodesPDOMOrder()
    ];
  }
}

buildAnAtom.register( 'CountsToElementChallengeView', CountsToElementChallengeView );

export default CountsToElementChallengeView;