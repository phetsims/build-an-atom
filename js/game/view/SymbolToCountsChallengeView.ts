// Copyright 2013-2025, University of Colorado Boulder

/**
 * View for game challenges where the user is presented with a chemical symbol
 * including atomic number, mass number, and charge, and needs to determine
 * the number of protons, neutrons, and electrons that comprise the atom.
 *
 * @author John Blanco
 */

import Bounds2 from '../../../../dot/js/Bounds2.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import buildAnAtom from '../../buildAnAtom.js';
import SymbolToCountsChallenge from '../model/SymbolToCountsChallenge.js';
import ChallengeView from './ChallengeView.js';
import InteractiveParticleCountsNode from './InteractiveParticleCountsNode.js';
import InteractiveSymbolNode from './InteractiveSymbolNode.js';

class SymbolToCountsChallengeView extends ChallengeView {

  public readonly interactiveParticleCountsNode: InteractiveParticleCountsNode;
  private readonly disposeSymbolToCountsChallengeView: () => void;

  public constructor( symbolToCountsChallenge: SymbolToCountsChallenge, layoutBounds: Bounds2, tandem: Tandem ) {

    super( symbolToCountsChallenge, layoutBounds, tandem );

    this.interactiveParticleCountsNode = new InteractiveParticleCountsNode( { tandem: tandem } );

    // Add interactive particle count.
    this.interactiveAnswerNode.addChild( this.interactiveParticleCountsNode );

    // Symbol
    const interactiveSymbolNode = new InteractiveSymbolNode(
      symbolToCountsChallenge.answerAtom,
      tandem.createTandem( 'interactiveSymbolNode' )
    );
    interactiveSymbolNode.scale( 0.75 );
    this.challengePresentationNode.addChild( interactiveSymbolNode );

    // Layout
    interactiveSymbolNode.centerX = layoutBounds.width * 0.25;
    interactiveSymbolNode.centerY = layoutBounds.height * 0.54;
    this.interactiveParticleCountsNode.centerX = layoutBounds.width * 0.75;
    this.interactiveParticleCountsNode.centerY = layoutBounds.height * 0.49;

    this.disposeSymbolToCountsChallengeView = function() {
      interactiveSymbolNode.dispose();
      this.interactiveParticleCountsNode.dispose();
    };
  }

  public override checkAnswer(): void {
    this.challenge.checkAnswer( this.interactiveParticleCountsNode.answerAtom );
  }

  public override displayCorrectAnswer(): void {
    this.interactiveParticleCountsNode.answerAtom.protonCountProperty.set( this.challenge.answerAtom.protonCountProperty.get() );
    this.interactiveParticleCountsNode.answerAtom.neutronCountProperty.set( this.challenge.answerAtom.neutronCountProperty.get() );
    this.interactiveParticleCountsNode.answerAtom.electronCountProperty.set( this.challenge.answerAtom.electronCountProperty.get() );
  }

  public override reset(): void {
    this.interactiveParticleCountsNode.reset();
  }

  public override dispose(): void {
    this.disposeSymbolToCountsChallengeView();

    super.dispose();
  }
}

buildAnAtom.register( 'SymbolToCountsChallengeView', SymbolToCountsChallengeView );

export default SymbolToCountsChallengeView;