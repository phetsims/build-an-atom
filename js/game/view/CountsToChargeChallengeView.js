// Copyright 2013-2023, University of Colorado Boulder

/**
 * Challenge where the user is presented with a set of counts for protons,
 * neutrons, and electrons, and must determine the overall charge.
 *
 * @author John Blanco
 */

import NumberProperty from '../../../../axon/js/NumberProperty.js';
import { RichText } from '../../../../scenery/js/imports.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import NumberAtom from '../../../../shred/js/model/NumberAtom.js';
import ShredConstants from '../../../../shred/js/ShredConstants.js';
import buildAnAtom from '../../buildAnAtom.js';
import BuildAnAtomStrings from '../../BuildAnAtomStrings.js';
import ChallengeView from './ChallengeView.js';
import NumberEntryNode from './NumberEntryNode.js';
import ParticleCountsNode from './ParticleCountsNode.js';

const whatIsTheTotalChargeString = BuildAnAtomStrings.whatIsTheTotalCharge;

class CountsToChargeChallengeView extends ChallengeView {

  /**
   * @param {CountsToChargeChallenge} countsToChargeChallenge
   * @param {Bounds2} layoutBounds
   * @param {Tandem} tandem
   */
  constructor( countsToChargeChallenge, layoutBounds, tandem ) {

    super( countsToChargeChallenge, layoutBounds, tandem );

    // @private
    this.chargeAnswerProperty = new NumberProperty( 0, {
      tandem: tandem.createTandem( 'chargeAnswerProperty' ),
      numberType: 'Integer'
    } );

    // Particle counts
    const particleCountsNode = new ParticleCountsNode( countsToChargeChallenge.answerAtom );
    this.challengePresentationNode.addChild( particleCountsNode );

    const questionPrompt = new RichText( whatIsTheTotalChargeString, {
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
        signAfterValue: false,
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

    // @private called by dispose
    this.disposeCountsToChargeChallengeView = function() {
      this.chargeAnswerProperty.dispose();
      questionPrompt.dispose();
      numberEntryNode.dispose();
    };
  }

  // @public
  checkAnswer() {
    const userSubmittedAnswer = new NumberAtom( {
      protonCount: this.challenge.answerAtom.protonCountProperty.get(),
      neutronCount: this.challenge.answerAtom.neutronCountProperty.get(),
      electronCount: this.challenge.answerAtom.protonCountProperty.get() - this.chargeAnswerProperty.value
    } );
    this.challenge.checkAnswer( userSubmittedAnswer );
  }

  // @public
  displayCorrectAnswer() {
    this.chargeAnswerProperty.value = this.challenge.answerAtom.chargeProperty.get();
  }

  /**
   * release references
   * @public
   */
  dispose() {
    this.disposeCountsToChargeChallengeView();
    super.dispose();
  }
}

buildAnAtom.register( 'CountsToChargeChallengeView', CountsToChargeChallengeView );

export default CountsToChargeChallengeView;