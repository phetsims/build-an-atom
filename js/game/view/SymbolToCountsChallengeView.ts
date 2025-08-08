// Copyright 2013-2025, University of Colorado Boulder

/**
 * View for game challenges where the user is presented with a chemical symbol including atomic number, mass number, and
 * charge, and needs to determine the number of protons, neutrons, and electrons that comprise the atom.
 *
 * @author John Blanco
 */

import DerivedStringProperty from '../../../../axon/js/DerivedStringProperty.js';
import Bounds2 from '../../../../dot/js/Bounds2.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import RichText from '../../../../scenery/js/nodes/RichText.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import buildAnAtom from '../../buildAnAtom.js';
import BAAConstants from '../../common/BAAConstants.js';
import SymbolToCountsChallenge from '../model/SymbolToCountsChallenge.js';
import ChallengeView from './ChallengeView.js';
import InteractiveParticleCountsNode from './InteractiveParticleCountsNode.js';
import InteractiveSymbolNode from './InteractiveSymbolNode.js';

class SymbolToCountsChallengeView extends ChallengeView {

  public readonly interactiveParticleCountsNode: InteractiveParticleCountsNode;

  public constructor( symbolToCountsChallenge: SymbolToCountsChallenge, layoutBounds: Bounds2, tandem: Tandem ) {

    super( symbolToCountsChallenge, layoutBounds, tandem );

    this.interactiveParticleCountsNode = new InteractiveParticleCountsNode( {
      tandem: tandem.createTandem( 'interactiveParticleCountsNode' ),
      showArrowButtonsProperty: symbolToCountsChallenge.isAnswerInteractiveProperty
    } );

    // Add interactive particle count.
    this.interactiveAnswerNode.addChild( this.interactiveParticleCountsNode );

    // Symbol
    const interactiveSymbolNode = new InteractiveSymbolNode(
      symbolToCountsChallenge.correctAnswerAtom,
      { tandem: Tandem.OPT_OUT }
    );
    interactiveSymbolNode.scale( 0.75 );
    this.challengePresentationNode.addChild( interactiveSymbolNode );

    // Layout
    interactiveSymbolNode.centerX = layoutBounds.width * 0.25;
    interactiveSymbolNode.centerY = layoutBounds.height * 0.54;
    this.interactiveParticleCountsNode.centerX = layoutBounds.width * 0.75;
    this.interactiveParticleCountsNode.centerY = layoutBounds.height * 0.49;
  }

  public override checkAnswer(): void {
    this.challenge.checkAnswer( this.interactiveParticleCountsNode.submittedAnswerAtom );
  }

  public override displayCorrectAnswer(): void {
    this.interactiveParticleCountsNode.submittedAnswerAtom.protonCountProperty.set( this.challenge.correctAnswerAtom.protonCountProperty.get() );
    this.interactiveParticleCountsNode.submittedAnswerAtom.neutronCountProperty.set( this.challenge.correctAnswerAtom.neutronCountProperty.get() );
    this.interactiveParticleCountsNode.submittedAnswerAtom.electronCountProperty.set( this.challenge.correctAnswerAtom.electronCountProperty.get() );
  }

  public override reset(): void {
    this.interactiveParticleCountsNode.reset();
  }

  public override createAnswerNode(): Node {

    const answerTextProperty = new DerivedStringProperty(
      [
        this.challenge.correctAnswerAtom.protonCountProperty,
        this.challenge.correctAnswerAtom.neutronCountProperty,
        this.challenge.correctAnswerAtom.electronCountProperty
      ],
      ( protonCount: number, neutronCount, electronCount ) => {
        return `${this.challenge.challengeType}<br> Protons: ${protonCount}, Neutrons: ${neutronCount}, Electrons: ${electronCount}`;
      }
    );
    return new RichText( answerTextProperty, BAAConstants.SHOW_ANSWER_TEXT_OPTIONS );
  }
}

buildAnAtom.register( 'SymbolToCountsChallengeView', SymbolToCountsChallengeView );

export default SymbolToCountsChallengeView;