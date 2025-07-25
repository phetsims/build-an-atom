// Copyright 2013-2025, University of Colorado Boulder

/**
 * Challenge where the user is presented with a set of counts for protons,
 * neutrons, and electrons, and must determine the mass number.
 *
 * @author John Blanco
 */

import NumberProperty from '../../../../axon/js/NumberProperty.js';
import Bounds2 from '../../../../dot/js/Bounds2.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import RichText from '../../../../scenery/js/nodes/RichText.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import buildAnAtom from '../../buildAnAtom.js';
import BuildAnAtomStrings from '../../BuildAnAtomStrings.js';
import AnswerAtom from '../model/AnswerAtom.js';
import CountsToMassNumberChallenge from '../model/CountsToMassNumberChallenge.js';
import ChallengeView from './ChallengeView.js';
import NumberEntryNode from './NumberEntryNode.js';
import ParticleCountsNode from './ParticleCountsNode.js';

class CountsToMassNumberChallengeView extends ChallengeView {

  public readonly massNumberAnswerProperty: NumberProperty;
  private readonly disposeCountsToMassNumberChallengeView: () => void;

  public constructor( countsToMassNumberChallenge: CountsToMassNumberChallenge, layoutBounds: Bounds2, tandem: Tandem ) {

    super( countsToMassNumberChallenge, layoutBounds, tandem );

    this.massNumberAnswerProperty = new NumberProperty( 0, {
      tandem: tandem.createTandem( 'massNumberAnswerProperty' ),
      numberType: 'Integer',
      phetioReadOnly: true
    } );

    // Particle counts
    const particleCountsNode = new ParticleCountsNode( countsToMassNumberChallenge.answerAtom );
    this.challengePresentationNode.addChild( particleCountsNode );

    const questionPromptText = new RichText( BuildAnAtomStrings.whatIsTheMassNumberStringProperty, {
      replaceNewlines: true,
      align: 'left',
      font: new PhetFont( 24 ),
      maxWidth: 200,
      tandem: tandem.createTandem( 'questionPromptText' )
    } );
    this.interactiveAnswerNode.addChild( questionPromptText );

    // Node for entering the answer
    const numberEntryNode = new NumberEntryNode(
      this.massNumberAnswerProperty,
      tandem.createTandem( 'numberEntryNode' ), {
        minValue: 0,
        maxValue: 99
      } );
    this.interactiveAnswerNode.addChild( numberEntryNode );

    // Layout
    particleCountsNode.centerX = layoutBounds.width * 0.3;
    particleCountsNode.centerY = layoutBounds.height * 0.5;
    questionPromptText.centerX = layoutBounds.width * 0.65;
    questionPromptText.centerY = layoutBounds.height * 0.5;
    numberEntryNode.left = questionPromptText.right + 10;
    numberEntryNode.centerY = questionPromptText.centerY;

    this.disposeCountsToMassNumberChallengeView = function() {
      particleCountsNode.dispose();
      questionPromptText.dispose();
      numberEntryNode.dispose();
      this.massNumberAnswerProperty.dispose();
    };
  }

  public override checkAnswer(): void {
    const userSubmittedAnswer = new AnswerAtom( {
      protonCount: this.challenge.answerAtom.protonCountProperty.get(),
      neutronCount: this.massNumberAnswerProperty.value - this.challenge.answerAtom.protonCountProperty.get(),
      electronCount: this.challenge.answerAtom.electronCountProperty.get()
    } );
    this.challenge.checkAnswer( userSubmittedAnswer );
  }

  public override displayCorrectAnswer(): void {
    this.massNumberAnswerProperty.value = this.challenge.answerAtom.massNumberProperty.get();
  }

  public override reset(): void {
    this.massNumberAnswerProperty.reset();
  }

  public override dispose(): void {
    this.disposeCountsToMassNumberChallengeView();
    super.dispose();
  }
}

buildAnAtom.register( 'CountsToMassNumberChallengeView', CountsToMassNumberChallengeView );

export default CountsToMassNumberChallengeView;