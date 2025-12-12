// Copyright 2013-2025, University of Colorado Boulder

/**
 * View for game challenges where the user is presented with a chemical symbol including proton count (aka atomic
 * number), mass number, and charge, and needs to determine the number of protons, neutrons, and electrons that comprise
 * the atom.
 *
 * @author John Blanco (PhET Interactive Simulations)
 */

import DerivedStringProperty from '../../../../axon/js/DerivedStringProperty.js';
import Bounds2 from '../../../../dot/js/Bounds2.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import RichText from '../../../../scenery/js/nodes/RichText.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import buildAnAtom from '../../buildAnAtom.js';
import BuildAnAtomFluent from '../../BuildAnAtomFluent.js';
import BuildAnAtomStrings from '../../BuildAnAtomStrings.js';
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

    // Accessible Paragraphs for the description of the challenge.
    // Made a child node for consistency with the correct answer paragraph.
    this.accessibleParagraphNode.accessibleParagraph = BuildAnAtomStrings.a11y.gameScreen.challenges.symbolToCounts.accessibleParagraphStringProperty;

    // Set up the correct answer accessible paragraph.
    this.correctAnswerAccessibleParagraphNode.accessibleParagraph =
      BuildAnAtomFluent.a11y.gameScreen.challenges.symbolToCounts.correctAnswerParagraph.createProperty( {
        protons: this.challenge.correctAnswerAtom.protonCountProperty,
        neutrons: this.challenge.correctAnswerAtom.neutronCountProperty,
        electrons: this.challenge.correctAnswerAtom.electronCountProperty
      } );

    // pdom order
    this.challengeNodesPDOMOrder = [
      ...this.getChallengeNodesPDOMOrder(),
      interactiveSymbolNode,
      this.interactiveParticleCountsNode
    ];

    this.answerNodesPDOMOrder = [
      ...this.getAnswerNodesPDOMOrder()
    ];
  }

  public override checkAnswer(): void {
    this.challenge.checkAnswer( this.interactiveParticleCountsNode.submittedAnswerAtom );
  }

  public override displayCorrectAnswer(): void {

    // Set the interactive particle counts to the correct answer values.  This will trigger the UI to update accordingly.
    this.interactiveParticleCountsNode.submittedAnswerAtom.protonCountProperty.value = this.challenge.correctAnswerAtom.protonCountProperty.value;
    this.interactiveParticleCountsNode.submittedAnswerAtom.neutronCountProperty.value = this.challenge.correctAnswerAtom.neutronCountProperty.value;
    this.interactiveParticleCountsNode.submittedAnswerAtom.electronCountProperty.value = this.challenge.correctAnswerAtom.electronCountProperty.value;
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