// Copyright 2013-2025, University of Colorado Boulder

/**
 * View for game challenges where the user is presented with a chemical symbol
 * including atomic number, mass number, and charge, and needs to determine
 * the number of protons, neutrons, and electrons that comprise the atom.
 *
 * @author John Blanco
 */

import DerivedStringProperty from '../../../../axon/js/DerivedStringProperty.js';
import Bounds2 from '../../../../dot/js/Bounds2.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import Text from '../../../../scenery/js/nodes/Text.js';
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
      showArrowButtonsProperty: symbolToCountsChallenge.interactiveAnswerProperty
    } );

    // Add interactive particle count.
    this.interactiveAnswerNode.addChild( this.interactiveParticleCountsNode );

    // Symbol
    const interactiveSymbolNode = new InteractiveSymbolNode(
      symbolToCountsChallenge.answerAtom,
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

  public override createAnswerNode(): Node {

    const answerTextProperty = new DerivedStringProperty(
      [
        this.challenge.answerAtom.protonCountProperty,
        this.challenge.answerAtom.neutronCountProperty,
        this.challenge.answerAtom.electronCountProperty
      ],
      ( protonCount: number, neutronCount, electronCount ) => {
        return `Protons: ${protonCount}, Neutrons: ${neutronCount}, Electrons: ${electronCount}`;
      }
    );
    return new Text( answerTextProperty, BAAConstants.SHOW_ANSWER_TEXT_OPTIONS );
  }
}

buildAnAtom.register( 'SymbolToCountsChallengeView', SymbolToCountsChallengeView );

export default SymbolToCountsChallengeView;