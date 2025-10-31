// Copyright 2013-2025, University of Colorado Boulder

/**
 * Visual representation of a challenge where the user is presented with a schematic representation of an atom (which
 * looks much like the atoms constructed on the 1st tab), and must determine that atom's mass number.
 *
 * @author John Blanco
 */

import DerivedStringProperty from '../../../../axon/js/DerivedStringProperty.js';
import NumberProperty from '../../../../axon/js/NumberProperty.js';
import Bounds2 from '../../../../dot/js/Bounds2.js';
import Range from '../../../../dot/js/Range.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import ModelViewTransform2 from '../../../../phetcommon/js/view/ModelViewTransform2.js';
import HBox from '../../../../scenery/js/layout/nodes/HBox.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import RichText from '../../../../scenery/js/nodes/RichText.js';
import ParticleCountDisplay from '../../../../shred/js/view/ParticleCountDisplay.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import buildAnAtom from '../../buildAnAtom.js';
import BuildAnAtomFluent from '../../BuildAnAtomFluent.js';
import BuildAnAtomStrings from '../../BuildAnAtomStrings.js';
import BAAConstants from '../../common/BAAConstants.js';
import AnswerAtom from '../model/AnswerAtom.js';
import SchematicToMassNumberChallenge from '../model/SchematicToMassNumberChallenge.js';
import BAANumberSpinner from './BAANumberSpinner.js';
import ChallengeView from './ChallengeView.js';
import NonInteractiveSchematicAtomNode from './NonInteractiveSchematicAtomNode.js';

class SchematicToMassNumberChallengeView extends ChallengeView {

  private readonly massNumberProperty: NumberProperty;

  public constructor( schematicToMassNumberChallenge: SchematicToMassNumberChallenge, layoutBounds: Bounds2, tandem: Tandem ) {

    super( schematicToMassNumberChallenge, layoutBounds, tandem );

    this.massNumberProperty = new NumberProperty( 0, {
      tandem: tandem.createTandem( 'massNumberProperty' ),
      phetioDocumentation: 'Mass value entered by the user.',
      numberType: 'Integer',
      phetioReadOnly: true,
      phetioFeatured: true,
      range: new Range( 0, 99 ) // Mass number is always a non-negative integer
    } );

    // Create the model-view transform used by the schematic atom.
    const modelViewTransform = ModelViewTransform2.createSinglePointScaleInvertedYMapping(
      Vector2.ZERO,
      new Vector2( layoutBounds.width * 0.275, layoutBounds.height * 0.5 ),
      0.8 );

    // Add the schematic representation of the atom.
    const schematicAtomNode = new NonInteractiveSchematicAtomNode( schematicToMassNumberChallenge.correctAnswerAtom,
      modelViewTransform,
      Tandem.OPT_OUT
    );

    this.challengePresentationNode.addChild( schematicAtomNode );


    // Add the particle count indicator.  The width is empirically determined to match the layout in the design doc.
    const particleCountDisplay = new ParticleCountDisplay( schematicToMassNumberChallenge.correctAnswerAtom, {
      bottom: schematicAtomNode.top,
      left: schematicAtomNode.left,
      tandem: tandem.createTandem( 'particleCountDisplay' )
    } );
    this.challengePresentationNode.addChild( particleCountDisplay );

    // Question
    const questionPromptText = new RichText( BuildAnAtomFluent.whatIsTheMassNumberStringProperty, BAAConstants.QUESTION_PROMPT_OPTIONS );

    // Node for entering the answer
    const massNumberSpinner = new BAANumberSpinner(
      this.massNumberProperty,
      tandem.createTandem( 'massNumberSpinner' ), {
        minValue: 0,
        maxValue: 99,
        arrowButtonOptions: {
          visibleProperty: this.challenge.isAnswerInteractiveProperty
        }
      } );
    this.interactiveAnswerNode.addChild( new HBox( {
      children: [ questionPromptText, massNumberSpinner ],
      centerX: layoutBounds.width * 0.65,
      centerY: layoutBounds.height * 0.5,
      spacing: 10
    } ) );

    // Layout
    schematicAtomNode.centerY = layoutBounds.height * 0.5 + BAAConstants.ATOM_VERTICAL_OFFSET;

    // Accessible Paragraphs for the description of the challenge.
    // Made a child node for consistency with the correct answer paragraph.
    this.accessibleParagraphNode.accessibleParagraph = BuildAnAtomStrings.a11y.gameScreen.challenges.schematicToMassNumber.accessibleParagraphStringProperty;

    // pdom order
    this.challengeNodesPDOMOrder = [
      ...this.getChallengeNodesPDOMOrder(),
      schematicAtomNode,
      particleCountDisplay,
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
    this.massNumberProperty.value = this.challenge.correctAnswerAtom.massNumberProperty.value;

    this.correctAnswerAccessibleParagraphNode.accessibleParagraph =
      BuildAnAtomFluent.a11y.gameScreen.challenges.schematicToMassNumber.correctAnswerParagraph.format( {
        mass: this.challenge.correctAnswerAtom.massNumberProperty.value
      } );
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

buildAnAtom.register( 'SchematicToMassNumberChallengeView', SchematicToMassNumberChallengeView );

export default SchematicToMassNumberChallengeView;