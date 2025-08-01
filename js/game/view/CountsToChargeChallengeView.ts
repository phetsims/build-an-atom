// Copyright 2013-2025, University of Colorado Boulder

/**
 * Challenge where the user is presented with a set of counts for protons,
 * neutrons, and electrons, and must determine the overall charge.
 *
 * @author John Blanco
 */

import NumberProperty from '../../../../axon/js/NumberProperty.js';
import Bounds2 from '../../../../dot/js/Bounds2.js';
import { combineOptions } from '../../../../phet-core/js/optionize.js';
import RichText, { RichTextOptions } from '../../../../scenery/js/nodes/RichText.js';
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

  private readonly chargeAnswerProperty: NumberProperty;
  private readonly disposeCountsToChargeChallengeView: () => void;

  public constructor( countsToChargeChallenge: CountsToChargeChallenge, layoutBounds: Bounds2, tandem: Tandem ) {

    super( countsToChargeChallenge, layoutBounds, tandem );

    this.chargeAnswerProperty = new NumberProperty( 0, {
      tandem: tandem.createTandem( 'chargeAnswerProperty' ),
      numberType: 'Integer',
      phetioReadOnly: true
    } );

    // Particle counts
    const particleCountsNode = new ParticleCountsNode( countsToChargeChallenge.answerAtom );
    this.challengePresentationNode.addChild( particleCountsNode );

    const questionPromptText = new RichText( BuildAnAtomFluent.whatIsTheTotalChargeStringProperty, combineOptions<RichTextOptions>( {
      tandem: tandem.createTandem( 'questionPromptText' )
    }, BAAConstants.QUESTION_PROMPT_OPTIONS ) );
    this.interactiveAnswerNode.addChild( questionPromptText );

    // Node for entering the answer
    const chargeNumberSpinner = new BAANumberSpinner(
      this.chargeAnswerProperty,
      tandem.createTandem( 'chargeNumberSpinner' ), {
        showPlusForPositive: true,
        signAfterValue: false,
        getTextColor: ShredConstants.CHARGE_TEXT_COLOR,
        maxValue: 99,
        minValue: -99
      } );
    this.interactiveAnswerNode.addChild( chargeNumberSpinner );

    // Layout
    particleCountsNode.centerX = layoutBounds.width * 0.3;
    particleCountsNode.centerY = layoutBounds.height * 0.5;
    questionPromptText.centerX = layoutBounds.width * 0.65;
    questionPromptText.centerY = layoutBounds.height * 0.5;
    chargeNumberSpinner.left = questionPromptText.right + 10;
    chargeNumberSpinner.centerY = questionPromptText.centerY;

    this.disposeCountsToChargeChallengeView = function() {
      this.chargeAnswerProperty.dispose();
      questionPromptText.dispose();
      chargeNumberSpinner.dispose();
    };
  }

  public override reset(): void {
    super.reset();
    this.chargeAnswerProperty.reset();
  }

  public override checkAnswer(): void {
    const userSubmittedAnswer = new AnswerAtom( {
      protonCount: this.challenge.answerAtom.protonCountProperty.get(),
      neutronCount: this.challenge.answerAtom.neutronCountProperty.get(),
      electronCount: this.challenge.answerAtom.protonCountProperty.get() - this.chargeAnswerProperty.value
    } );
    this.challenge.checkAnswer( userSubmittedAnswer );
  }

  public override displayCorrectAnswer(): void {
    this.chargeAnswerProperty.value = this.challenge.answerAtom.netChargeProperty.get();
  }

  public override dispose(): void {
    this.disposeCountsToChargeChallengeView();
    super.dispose();
  }
}

buildAnAtom.register( 'CountsToChargeChallengeView', CountsToChargeChallengeView );

export default CountsToChargeChallengeView;