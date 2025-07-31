// Copyright 2013-2025, University of Colorado Boulder

/**
 * Visual representation of a challenge where the user is presented with a
 * schematic representation of an atom (which looks much like the atoms
 * constructed on the 1st tab), and must determine that atom's mass number.
 *
 * @author John Blanco
 */

import NumberProperty from '../../../../axon/js/NumberProperty.js';
import Bounds2 from '../../../../dot/js/Bounds2.js';
import Range from '../../../../dot/js/Range.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import { combineOptions } from '../../../../phet-core/js/optionize.js';
import ModelViewTransform2 from '../../../../phetcommon/js/view/ModelViewTransform2.js';
import RichText, { RichTextOptions } from '../../../../scenery/js/nodes/RichText.js';
import ParticleCountDisplay from '../../../../shred/js/view/ParticleCountDisplay.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import buildAnAtom from '../../buildAnAtom.js';
import BuildAnAtomFluent from '../../BuildAnAtomFluent.js';
import BAAConstants from '../../common/BAAConstants.js';
import AnswerAtom from '../model/AnswerAtom.js';
import SchematicToMassNumberChallenge from '../model/SchematicToMassNumberChallenge.js';
import BAANumberSpinner from './BAANumberSpinner.js';
import ChallengeView from './ChallengeView.js';
import NonInteractiveSchematicAtomNode from './NonInteractiveSchematicAtomNode.js';

class SchematicToMassNumberChallengeView extends ChallengeView {

  public readonly massNumberAnswerProperty: NumberProperty;
  private readonly disposeSchematicToMassNumberChallengeView: () => void;

  public constructor( schematicToMassNumberChallenge: SchematicToMassNumberChallenge, layoutBounds: Bounds2, tandem: Tandem ) {

    super( schematicToMassNumberChallenge, layoutBounds, tandem );

    this.massNumberAnswerProperty = new NumberProperty( 0, {
      tandem: tandem.createTandem( 'massNumberAnswerProperty' ),
      numberType: 'Integer',
      phetioReadOnly: true,
      range: new Range( 0, 99 ) // Mass number is always a non-negative integer
    } );

    // Create the model-view transform used by the schematic atom.
    const modelViewTransform = ModelViewTransform2.createSinglePointScaleInvertedYMapping(
      Vector2.ZERO,
      new Vector2( layoutBounds.width * 0.275, layoutBounds.height * 0.5 ),
      0.8 );

    // Add the schematic representation of the atom.
    const schematicAtomNode = new NonInteractiveSchematicAtomNode( schematicToMassNumberChallenge.answerAtom,
      modelViewTransform,
      tandem.createTandem( 'noninteractiveSchematicAtomNode' ) );

    this.challengePresentationNode.addChild( schematicAtomNode );


    // Add the particle count indicator.  The width is empirically determined to match the layout in the design doc.
    const particleCountDisplay = new ParticleCountDisplay( schematicToMassNumberChallenge.answerAtom, {
      bottom: schematicAtomNode.top - 10,
      left: schematicAtomNode.left,
      tandem: tandem.createTandem( 'particleCountDisplay' )
    } );
    schematicAtomNode.addChild( particleCountDisplay );

    // Question
    const questionPromptText = new RichText( BuildAnAtomFluent.whatIsTheMassNumberStringProperty, combineOptions<RichTextOptions>( {

      tandem: tandem.createTandem( 'questionPromptText' )
    }, BAAConstants.QUESTION_PROMPT_OPTIONS ) );
    this.interactiveAnswerNode.addChild( questionPromptText );

    // Node for entering the answer
    const massNumberSpinner = new BAANumberSpinner(
      this.massNumberAnswerProperty,
      tandem.createTandem( 'massNumberSpinner' ), {
        minValue: 0,
        maxValue: 99
      } );
    this.interactiveAnswerNode.addChild( massNumberSpinner );

    // Layout
    questionPromptText.centerX = layoutBounds.width * 0.65;
    questionPromptText.centerY = layoutBounds.height * 0.5;
    massNumberSpinner.left = questionPromptText.right + 10;
    massNumberSpinner.centerY = questionPromptText.centerY;
    schematicAtomNode.centerY = massNumberSpinner.centerY;


    this.disposeSchematicToMassNumberChallengeView = () => {
      schematicAtomNode.dispose();
      questionPromptText.dispose();
      massNumberSpinner.dispose();
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
    this.disposeSchematicToMassNumberChallengeView();
    super.dispose();
  }
}

buildAnAtom.register( 'SchematicToMassNumberChallengeView', SchematicToMassNumberChallengeView );

export default SchematicToMassNumberChallengeView;