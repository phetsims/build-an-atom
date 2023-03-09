// Copyright 2013-2023, University of Colorado Boulder

/**
 * Challenge where the user is presented with a set of counts for protons,
 * neutrons, and electrons, and must determine the mass number.
 *
 * @author John Blanco
 */

import NumberProperty from '../../../../axon/js/NumberProperty.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import { RichText } from '../../../../scenery/js/imports.js';
import NumberAtom from '../../../../shred/js/model/NumberAtom.js';
import buildAnAtom from '../../buildAnAtom.js';
import BuildAnAtomStrings from '../../BuildAnAtomStrings.js';
import ChallengeView from './ChallengeView.js';
import NumberEntryNode from './NumberEntryNode.js';
import ParticleCountsNode from './ParticleCountsNode.js';

const whatIsTheMassNumberString = BuildAnAtomStrings.whatIsTheMassNumber;

class CountsToMassNumberChallengeView extends ChallengeView {

  /**
   * @param {CountsToMassNumberChallenge} countsToMassNumberChallenge
   * @param {Bounds2} layoutBounds
   * @param {Tandem} tandem
   */
  constructor( countsToMassNumberChallenge, layoutBounds, tandem ) {

    super( countsToMassNumberChallenge, layoutBounds, tandem );

    // @public
    this.massNumberAnswerProperty = new NumberProperty( 0, {
      tandem: tandem.createTandem( 'massNumberAnswerProperty' ),
      numberType: 'Integer'
    } );

    // Particle counts
    const particleCountsNode = new ParticleCountsNode( countsToMassNumberChallenge.answerAtom );
    this.challengePresentationNode.addChild( particleCountsNode );

    const questionPrompt = new RichText( whatIsTheMassNumberString, {
      replaceNewlines: true,
      align: 'left',
      font: new PhetFont( 24 ),
      maxWidth: 200,
      tandem: tandem.createTandem( 'questionPrompt' )
    } );
    this.interactiveAnswerNode.addChild( questionPrompt );

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
    questionPrompt.centerX = layoutBounds.width * 0.65;
    questionPrompt.centerY = layoutBounds.height * 0.5;
    numberEntryNode.left = questionPrompt.right + 10;
    numberEntryNode.centerY = questionPrompt.centerY;

    // @private - called by dispose
    this.disposeCountsToMassNumberChallengeView = function() {
      particleCountsNode.dispose();
      questionPrompt.dispose();
      numberEntryNode.dispose();
      this.massNumberAnswerProperty.dispose();
    };
  }

  // @public
  checkAnswer() {
    const userSubmittedAnswer = new NumberAtom( {
      protonCount: this.challenge.answerAtom.protonCountProperty.get(),
      neutronCount: this.massNumberAnswerProperty.value - this.challenge.answerAtom.protonCountProperty.get(),
      electronCount: this.challenge.answerAtom.electronCountProperty.get()
    } );
    this.challenge.checkAnswer( userSubmittedAnswer );
  }

  // @public
  displayCorrectAnswer() {
    this.massNumberAnswerProperty.value = this.challenge.answerAtom.massNumberProperty.get();
  }

  /**
   * release references
   * @public
   */
  dispose() {
    this.disposeCountsToMassNumberChallengeView();
    super.dispose();
  }
}

buildAnAtom.register( 'CountsToMassNumberChallengeView', CountsToMassNumberChallengeView );

export default CountsToMassNumberChallengeView;