// Copyright 2013-2025, University of Colorado Boulder

/**
 * Challenge where the user is presented with a set of counts for protons, neutrons, and electrons, and must determine
 * the overall charge.
 *
 * @author John Blanco
 */

import DerivedStringProperty from '../../../../axon/js/DerivedStringProperty.js';
import NumberProperty from '../../../../axon/js/NumberProperty.js';
import Bounds2 from '../../../../dot/js/Bounds2.js';
import MathSymbols from '../../../../scenery-phet/js/MathSymbols.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import RichText from '../../../../scenery/js/nodes/RichText.js';
import ShredConstants from '../../../../shred/js/ShredConstants.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import buildAnAtom from '../../buildAnAtom.js';
import BuildAnAtomFluent from '../../BuildAnAtomFluent.js';
import BAAConstants from '../../common/BAAConstants.js';
import AnswerAtom from '../model/AnswerAtom.js';
import CountsToChargeChallenge from '../model/CountsToChargeChallenge.js';
import BAANumberSpinner from './BAANumberSpinner.js';
import ChallengeView from './ChallengeView.js';
import ParticleCountsNode from './ParticleCountsNode.js';

class CountsToChargeChallengeView extends ChallengeView {

  private readonly chargeProperty: NumberProperty;

  public constructor( countsToChargeChallenge: CountsToChargeChallenge, layoutBounds: Bounds2, tandem: Tandem ) {

    super( countsToChargeChallenge, layoutBounds, tandem );

    this.chargeProperty = new NumberProperty( 0, {
      tandem: tandem.createTandem( 'chargeProperty' ),
      phetioDocumentation: 'Charge value entered by the user.',
      numberType: 'Integer',
      phetioReadOnly: true
    } );

    // Particle counts
    const particleCountsNode = new ParticleCountsNode( countsToChargeChallenge.correctAnswerAtom );
    this.challengePresentationNode.addChild( particleCountsNode );

    const questionPromptText = new RichText( BuildAnAtomFluent.whatIsTheTotalChargeStringProperty, BAAConstants.QUESTION_PROMPT_OPTIONS );
    this.interactiveAnswerNode.addChild( questionPromptText );

    // Node for entering the answer
    const chargeNumberSpinner = new BAANumberSpinner(
      this.chargeProperty,
      tandem.createTandem( 'chargeNumberSpinner' ), {
        showPlusForPositive: true,
        signAfterValue: false,
        getTextColor: ShredConstants.CHARGE_TEXT_COLOR,
        maxValue: 99,
        minValue: -99,
        arrowButtonOptions: {
          visibleProperty: this.challenge.isAnswerInteractiveProperty
        }
      } );
    this.interactiveAnswerNode.addChild( chargeNumberSpinner );

    // Layout
    particleCountsNode.centerX = layoutBounds.width * 0.3;
    particleCountsNode.centerY = layoutBounds.height * 0.5;
    questionPromptText.centerX = layoutBounds.width * 0.65;
    questionPromptText.centerY = layoutBounds.height * 0.5;
    chargeNumberSpinner.left = questionPromptText.right + 10;
    chargeNumberSpinner.centerY = questionPromptText.centerY;
  }

  public override reset(): void {
    super.reset();
    this.chargeProperty.reset();
  }

  public override createAnswerNode(): Node {
    const chargeTextProperty = new DerivedStringProperty(
      [ this.challenge.correctAnswerAtom.chargeProperty ],
      ( charge: number ) => {
        const sign = charge > 0 ? MathSymbols.UNARY_PLUS : charge < 0 ? MathSymbols.UNARY_MINUS : '';
        return `${this.challenge.challengeType}<br> Net Charge: ${Math.abs( charge )}${sign}`;
      }
    );
    return new RichText( chargeTextProperty, BAAConstants.SHOW_ANSWER_TEXT_OPTIONS );
  }

  public override checkAnswer(): void {
    const userSubmittedAnswer = new AnswerAtom( {
      protonCount: this.challenge.correctAnswerAtom.protonCountProperty.get(),
      neutronCount: this.challenge.correctAnswerAtom.neutronCountProperty.get(),
      electronCount: this.challenge.correctAnswerAtom.protonCountProperty.get() - this.chargeProperty.value
    } );
    this.challenge.checkAnswer( userSubmittedAnswer );
  }

  public override displayCorrectAnswer(): void {
    this.chargeProperty.value = this.challenge.correctAnswerAtom.chargeProperty.get();
  }
}

buildAnAtom.register( 'CountsToChargeChallengeView', CountsToChargeChallengeView );

export default CountsToChargeChallengeView;