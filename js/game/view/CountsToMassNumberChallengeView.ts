// Copyright 2013-2025, University of Colorado Boulder

/**
 * Challenge where the user is presented with a set of counts for protons, neutrons, and electrons, and must determine
 * the mass number.
 *
 * @author John Blanco (PhET Interactive Simulations)
 */

import DerivedStringProperty from '../../../../axon/js/DerivedStringProperty.js';
import NumberProperty from '../../../../axon/js/NumberProperty.js';
import Bounds2 from '../../../../dot/js/Bounds2.js';
import Range from '../../../../dot/js/Range.js';
import HBox from '../../../../scenery/js/layout/nodes/HBox.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import RichText from '../../../../scenery/js/nodes/RichText.js';
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

  private readonly massNumberProperty: NumberProperty;

  public constructor( countsToMassNumberChallenge: CountsToMassNumberChallenge, layoutBounds: Bounds2, tandem: Tandem ) {

    super( countsToMassNumberChallenge, layoutBounds, tandem );

    this.massNumberProperty = new NumberProperty( 0, {
      tandem: tandem.createTandem( 'massNumberProperty' ),
      phetioDocumentation: 'Mass value entered by the user.',
      numberType: 'Integer',
      phetioReadOnly: true,
      phetioFeatured: true,
      range: new Range( 0, 99 ) // Mass number is always a non-negative integer
    } );

    // Particle counts
    const particleCountsNode = new ParticleCountsNode( countsToMassNumberChallenge.correctAnswerAtom );
    this.challengePresentationNode.addChild( particleCountsNode );

    const questionPromptText = new RichText( BuildAnAtomFluent.whatIsTheMassNumberStringProperty, BAAConstants.QUESTION_PROMPT_OPTIONS );

    // Node for entering the answer
    const massNumberSpinner = new BAANumberSpinner(
      this.massNumberProperty,
      tandem.createTandem( 'massNumberSpinner' ), {
        minValue: 0,
        maxValue: 99,
        accessibleName: BuildAnAtomFluent.a11y.gameScreen.challenges.countsToMassNumber.accessibleNameStringProperty,
        accessibleHelpText: BuildAnAtomFluent.a11y.gameScreen.challenges.countsToMassNumber.accessibleHelpTextStringProperty,
        enabledProperty: this.challenge.isAnswerInteractiveProperty
      } );
    this.interactiveAnswerNode.addChild( new HBox( {
      children: [ questionPromptText, massNumberSpinner ],
      centerX: layoutBounds.width * 0.65,
      centerY: layoutBounds.height * 0.5,
      spacing: 10
    } ) );

    // Layout
    particleCountsNode.centerX = layoutBounds.width * 0.3;
    particleCountsNode.centerY = layoutBounds.height * 0.5;

    // Accessible Paragraphs for the description of the challenge.
    // Made a child node for consistency with the correct answer paragraph.
    this.accessibleParagraphNode.accessibleParagraph = BuildAnAtomFluent.a11y.gameScreen.challenges.countsToMassNumber.accessibleParagraphStringProperty;

    // Set up the correct answer accessible paragraph such that it will update on changes to the mass and on changes
    // to the pattern string from which it is built.
    this.correctAnswerAccessibleParagraphNode.accessibleParagraph =
      BuildAnAtomFluent.a11y.gameScreen.challenges.countsToMassNumber.correctAnswerParagraph.createProperty( {
        mass: this.massNumberProperty
      } );

    // pdom order
    this.challengeNodesPDOMOrder = [

      // start with order of the super class
      ...this.getChallengeNodesPDOMOrder(),
      particleCountsNode,
      massNumberSpinner
    ];

    this.answerNodesPDOMOrder = [
      ...this.getAnswerNodesPDOMOrder()
    ];
  }

  public override checkAnswer(): void {
    const userSubmittedAnswer = new AnswerAtom( {
      protonCount: this.challenge.correctAnswerAtom.protonCountProperty.value,
      neutronCount: this.massNumberProperty.value - this.challenge.correctAnswerAtom.protonCountProperty.value,
      electronCount: this.challenge.correctAnswerAtom.electronCountProperty.value
    } );
    this.challenge.checkAnswer( userSubmittedAnswer );
  }

  public override displayCorrectAnswer(): void {

    // Set the mass number property to the correct answer's mass number.  This will trigger updates to the spinner and
    // the answer node.
    this.massNumberProperty.value = this.challenge.correctAnswerAtom.massNumberProperty.value;
  }

  public override reset(): void {
    this.massNumberProperty.reset();
  }

  public override createAnswerNode(): Node {
    const massNumberTextProperty = new DerivedStringProperty(
      [ this.challenge.correctAnswerAtom.massNumberProperty ],
      ( massNumber: number ) => `${this.challenge.challengeType}<br> Mass Number: ${massNumber}`
    );
    return new RichText( massNumberTextProperty, BAAConstants.SHOW_ANSWER_TEXT_OPTIONS );
  }
}

buildAnAtom.register( 'CountsToMassNumberChallengeView', CountsToMassNumberChallengeView );

export default CountsToMassNumberChallengeView;