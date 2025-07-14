// Copyright 2013-2025, University of Colorado Boulder

/**
 * Challenge where the user is presented with a set of counts for protons,
 * neutrons, and electrons, and must determine the overall charge.
 *
 * @author John Blanco
 */

import NumberProperty from '../../../../axon/js/NumberProperty.js';
import Bounds2 from '../../../../dot/js/Bounds2.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import RichText from '../../../../scenery/js/nodes/RichText.js';
import ShredConstants from '../../../../shred/js/ShredConstants.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import buildAnAtom from '../../buildAnAtom.js';
import BuildAnAtomStrings from '../../BuildAnAtomStrings.js';
import AnswerAtom from '../model/AnswerAtom.js';
import CountsToChargeChallenge from '../model/CountsToChargeChallenge.js';
import ChallengeView from './ChallengeView.js';
import NumberEntryNode from './NumberEntryNode.js';
import ParticleCountsNode from './ParticleCountsNode.js';

class CountsToChargeChallengeView extends ChallengeView {

  private readonly chargeAnswerProperty: NumberProperty;
  private readonly disposeCountsToChargeChallengeView: () => void;

  public constructor( countsToChargeChallenge: CountsToChargeChallenge, layoutBounds: Bounds2, tandem: Tandem ) {

    // TODO: Temporarily setting tandem to OPT OUT for PhET-iO instrumentation of the view https://github.com/phetsims/build-an-atom/issues/276
    tandem = Tandem.OPT_OUT;

    super( countsToChargeChallenge, layoutBounds, tandem );

    this.chargeAnswerProperty = new NumberProperty( 0, {
      tandem: tandem.createTandem( 'chargeAnswerProperty' ),
      numberType: 'Integer'
    } );

    // Particle counts
    const particleCountsNode = new ParticleCountsNode( countsToChargeChallenge.answerAtom );
    this.challengePresentationNode.addChild( particleCountsNode );

    const questionPrompt = new RichText( BuildAnAtomStrings.whatIsTheTotalChargeStringProperty, {
      replaceNewlines: true,
      align: 'left',
      font: new PhetFont( 24 ),
      maxWidth: 200,
      tandem: tandem.createTandem( 'questionPrompt' )
    } );
    this.interactiveAnswerNode.addChild( questionPrompt );

    // Node for entering the answer
    const numberEntryNode = new NumberEntryNode(
      this.chargeAnswerProperty,
      tandem.createTandem( 'numberEntryNode' ), {
        showPlusForPositive: true,
        signAfterValue: true,
        getTextColor: ShredConstants.CHARGE_TEXT_COLOR,
        maxValue: 99,
        minValue: -99
      } );
    this.interactiveAnswerNode.addChild( numberEntryNode );

    // Layout
    particleCountsNode.centerX = layoutBounds.width * 0.3;
    particleCountsNode.centerY = layoutBounds.height * 0.5;
    questionPrompt.centerX = layoutBounds.width * 0.65;
    questionPrompt.centerY = layoutBounds.height * 0.5;
    numberEntryNode.left = questionPrompt.right + 10;
    numberEntryNode.centerY = questionPrompt.centerY;

    this.disposeCountsToChargeChallengeView = function() {
      this.chargeAnswerProperty.dispose();
      questionPrompt.dispose();
      numberEntryNode.dispose();
    };
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
    this.chargeAnswerProperty.value = this.challenge.answerAtom.chargeProperty.get();
  }

  public override dispose(): void {
    this.disposeCountsToChargeChallengeView();
    super.dispose();
  }
}

buildAnAtom.register( 'CountsToChargeChallengeView', CountsToChargeChallengeView );

export default CountsToChargeChallengeView;