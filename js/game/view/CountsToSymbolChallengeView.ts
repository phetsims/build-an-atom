// Copyright 2013-2025, University of Colorado Boulder

/**
 * View for game challenges where the user is presented with a set of particle counts for an atom and must determine
 * the total charge and enter it in an interactive element symbol.
 *
 * @author John Blanco (PhET Interactive Simulations)
 */

import Bounds2 from '../../../../dot/js/Bounds2.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import buildAnAtom from '../../buildAnAtom.js';
import BuildAnAtomFluent from '../../BuildAnAtomFluent.js';
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

    // Accessible Paragraphs for the description of the challenge.
    // Made a child node for consistency with the correct answer paragraph.
    // Determine which specific challenge type this is based on the configurable flags
    this.accessibleParagraphNode.accessibleParagraph = BuildAnAtomFluent.a11y.gameScreen.challenges.countsToSymbol.accessibleParagraph.createProperty( {

      config: ( countsToSymbolChallenge.isProtonCountConfigurable &&
                countsToSymbolChallenge.isMassNumberConfigurable &&
                countsToSymbolChallenge.isChargeConfigurable ) ? 'all' :

              ( countsToSymbolChallenge.isChargeConfigurable &&
                !countsToSymbolChallenge.isProtonCountConfigurable &&
                !countsToSymbolChallenge.isMassNumberConfigurable ) ? 'charge' :

                // Assumes no other cases. Create a fallback string if you need to.
              'massNumber'
    } );

    // pdom order
    this.challengeNodesPDOMOrder = [

      // start with order of the super class
      ...this.getChallengeNodesPDOMOrder(),
      particleCountsNode,
      this.interactiveSymbolNode
    ];
  }
}

buildAnAtom.register( 'CountsToSymbolChallengeView', CountsToSymbolChallengeView );

export default CountsToSymbolChallengeView;