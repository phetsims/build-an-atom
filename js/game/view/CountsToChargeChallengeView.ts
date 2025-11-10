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
import HBox from '../../../../scenery/js/layout/nodes/HBox.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import RichText from '../../../../scenery/js/nodes/RichText.js';
import ShredConstants from '../../../../shred/js/ShredConstants.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import buildAnAtom from '../../buildAnAtom.js';
import BuildAnAtomFluent from '../../BuildAnAtomFluent.js';
import BuildAnAtomStrings from '../../BuildAnAtomStrings.js';
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
      phetioReadOnly: true,
      phetioFeatured: true
    } );

    // Particle counts
    const particleCountsNode = new ParticleCountsNode( countsToChargeChallenge.correctAnswerAtom );
    this.challengePresentationNode.addChild( particleCountsNode );

    const questionPromptText = new RichText( BuildAnAtomFluent.whatIsTheTotalChargeStringProperty, BAAConstants.QUESTION_PROMPT_OPTIONS );

    // Node for entering the answer
    const chargeNumberSpinner = new BAANumberSpinner(
      this.chargeProperty,
      tandem.createTandem( 'chargeNumberSpinner' ), {
        showPlusForPositive: true,
        signAfterValue: false,
        getTextColor: ShredConstants.CHARGE_TEXT_COLOR,
        maxValue: 99,
        minValue: -99,
        accessibleName: BuildAnAtomStrings.a11y.gameScreen.challenges.countsToCharge.accessibleNameStringProperty,
        accessibleHelpText: ChallengeView.createDynamicHelpText(
          BuildAnAtomStrings.a11y.gameScreen.challenges.countsToCharge.accessibleHelpTextStringProperty,
          this.challenge.isAnswerInteractiveProperty
        ),
        arrowButtonOptions: {
          visibleProperty: this.challenge.isAnswerInteractiveProperty
        }
      } );
    this.interactiveAnswerNode.addChild( new HBox( {
      children: [ questionPromptText, chargeNumberSpinner ],
      centerX: layoutBounds.width * 0.65,
      centerY: layoutBounds.height * 0.5,
      spacing: 10
    } ) );

    // Layout
    particleCountsNode.centerX = layoutBounds.width * 0.3;
    particleCountsNode.centerY = layoutBounds.height * 0.5;

    // Accessible Paragraphs for the description of the challenge.
    // Made a child node for consistency with the correct answer paragraph.
    this.accessibleParagraphNode.accessibleParagraph = BuildAnAtomStrings.a11y.gameScreen.challenges.countsToCharge.accessibleParagraphStringProperty;

    // pdom order
    this.challengeNodesPDOMOrder = [
      ...this.getChallengeNodesPDOMOrder(),
      particleCountsNode,
      chargeNumberSpinner
    ];

    this.answerNodesPDOMOrder = [
      ...this.getAnswerNodesPDOMOrder()
    ];
  }

  public override reset(): void {
    super.reset();
    this.chargeProperty.reset();
  }

  public override createAnswerNode(): Node {
    const chargeTextProperty = new DerivedStringProperty(
      [ this.challenge.correctAnswerAtom.chargeProperty ],
      ( charge: number ) => {
        return `${this.challenge.challengeType}<br> Net Charge: ${BAAConstants.chargeToStringSignAfterValue( charge )}`;
      }
    );
    return new RichText( chargeTextProperty, BAAConstants.SHOW_ANSWER_TEXT_OPTIONS );
  }

  public override checkAnswer(): void {
    const userSubmittedAnswer = new AnswerAtom( {
      protonCount: this.challenge.correctAnswerAtom.protonCountProperty.value,
      neutronCount: this.challenge.correctAnswerAtom.neutronCountProperty.value,
      electronCount: this.challenge.correctAnswerAtom.protonCountProperty.value - this.chargeProperty.value
    } );
    this.challenge.checkAnswer( userSubmittedAnswer );
  }

  public override displayCorrectAnswer(): void {
    this.chargeProperty.value = this.challenge.correctAnswerAtom.chargeProperty.value;

    this.correctAnswerAccessibleParagraphNode.accessibleParagraph =
      BuildAnAtomFluent.a11y.gameScreen.challenges.countsToCharge.correctAnswerParagraph.format( {
        charge: BAAConstants.chargeToStringSignBeforeValue( this.challenge.correctAnswerAtom.chargeProperty.value )
      } );
  }
}

buildAnAtom.register( 'CountsToChargeChallengeView', CountsToChargeChallengeView );

export default CountsToChargeChallengeView;