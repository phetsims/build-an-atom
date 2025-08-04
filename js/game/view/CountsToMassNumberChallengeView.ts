// Copyright 2013-2025, University of Colorado Boulder

/**
 * Challenge where the user is presented with a set of counts for protons,
 * neutrons, and electrons, and must determine the mass number.
 *
 * @author John Blanco
 */

import DerivedStringProperty from '../../../../axon/js/DerivedStringProperty.js';
import NumberProperty from '../../../../axon/js/NumberProperty.js';
import Bounds2 from '../../../../dot/js/Bounds2.js';
import { combineOptions } from '../../../../phet-core/js/optionize.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import RichText, { RichTextOptions } from '../../../../scenery/js/nodes/RichText.js';
import Text from '../../../../scenery/js/nodes/Text.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import buildAnAtom from '../../buildAnAtom.js';
import BuildAnAtomFluent from '../../BuildAnAtomFluent.js';
import BAAConstants from '../../common/BAAConstants.js';
import AnswerAtom from '../model/AnswerAtom.js';
import CountsToMassNumberChallenge from '../model/CountsToMassNumberChallenge.js';
import BAANumberSpinner from './BAANumberSpinner.js';
import ChallengeView from './ChallengeView.js';
import ParticleCountsNode from './ParticleCountsNode.js';

class CountsToMassNumberChallengeView extends ChallengeView {

  private readonly massNumberAnswerProperty: NumberProperty;

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

    const questionPromptText = new RichText( BuildAnAtomFluent.whatIsTheMassNumberStringProperty, combineOptions<RichTextOptions>( {

      tandem: tandem.createTandem( 'questionPromptText' )
    }, BAAConstants.QUESTION_PROMPT_OPTIONS ) );
    this.interactiveAnswerNode.addChild( questionPromptText );

    // Node for entering the answer
    const massNumberSpinner = new BAANumberSpinner(
      this.massNumberAnswerProperty,
      tandem.createTandem( 'massNumberSpinner' ), {
        minValue: 0,
        maxValue: 99,
        arrowButtonOptions: {
          visibleProperty: this.challenge.interactiveAnswerProperty
        }
      } );
    this.interactiveAnswerNode.addChild( massNumberSpinner );

    // Layout
    particleCountsNode.centerX = layoutBounds.width * 0.3;
    particleCountsNode.centerY = layoutBounds.height * 0.5;
    questionPromptText.centerX = layoutBounds.width * 0.65;
    questionPromptText.centerY = layoutBounds.height * 0.5;
    massNumberSpinner.left = questionPromptText.right + 10;
    massNumberSpinner.centerY = questionPromptText.centerY;
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

  public override createAnswerNode(): Node {
    const massNumberTextProperty = new DerivedStringProperty(
      [ this.challenge.answerAtom.massNumberProperty ],
      ( massNumber: number ) => `Mass Number: ${massNumber}`
    );
    return new Text( massNumberTextProperty, BAAConstants.SHOW_ANSWER_TEXT_OPTIONS );
  }
}

buildAnAtom.register( 'CountsToMassNumberChallengeView', CountsToMassNumberChallengeView );

export default CountsToMassNumberChallengeView;