// Copyright 2013-2025, University of Colorado Boulder

/**
 * Visual representation of a challenge where the user is presented with a
 * schematic representation of an atom (which looks much like the atoms
 * constructed on the 1st tab), and must determine that atom's charge.
 *
 * @author John Blanco
 */

import NumberProperty from '../../../../axon/js/NumberProperty.js';
import Bounds2 from '../../../../dot/js/Bounds2.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import ModelViewTransform2 from '../../../../phetcommon/js/view/ModelViewTransform2.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import RichText from '../../../../scenery/js/nodes/RichText.js';
import ShredConstants from '../../../../shred/js/ShredConstants.js';
import ParticleCountDisplay from '../../../../shred/js/view/ParticleCountDisplay.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import buildAnAtom from '../../buildAnAtom.js';
import BuildAnAtomStrings from '../../BuildAnAtomStrings.js';
import AnswerAtom from '../model/AnswerAtom.js';
import SchematicToChargeChallenge from '../model/SchematicToChargeChallenge.js';
import ChallengeView from './ChallengeView.js';
import NonInteractiveSchematicAtomNode from './NonInteractiveSchematicAtomNode.js';
import NumberEntryNode from './NumberEntryNode.js';

class SchematicToChargeChallengeView extends ChallengeView {

  public readonly chargeAnswerProperty: NumberProperty;
  private readonly disposeSchematicToChargeChallengeView: () => void;

  public constructor( schematicToChargeChallenge: SchematicToChargeChallenge, layoutBounds: Bounds2, tandem: Tandem ) {

    super( schematicToChargeChallenge, layoutBounds, tandem );

    this.chargeAnswerProperty = new NumberProperty( 0, {
      tandem: tandem.createTandem( 'chargeAnswerProperty' ),
      numberType: 'Integer'
    } );

    // Create the model-view transform used by the schematic atom.
    const modelViewTransform = ModelViewTransform2.createSinglePointScaleInvertedYMapping(
      Vector2.ZERO,
      new Vector2( layoutBounds.width * 0.275, layoutBounds.height * 0.5 ),
      0.8 );

    // Add the schematic representation of the atom.
    const schematicAtomNode = new NonInteractiveSchematicAtomNode(
      schematicToChargeChallenge.answerAtom,
      modelViewTransform,
      tandem.createTandem( 'noninteractiveSchematicAtomNode' )
    );
    this.challengePresentationNode.addChild( schematicAtomNode );

    // Add the particle count indicator.  The width is empirically determined to match the layout in the design doc.
    const particleCountDisplay = new ParticleCountDisplay( schematicToChargeChallenge.answerAtom, tandem, {
      bottom: schematicAtomNode.top - 10,
      left: schematicAtomNode.left
    } );
    schematicAtomNode.addChild( particleCountDisplay );

    // Question
    const questionPromptText = new RichText( BuildAnAtomStrings.whatIsTheTotalChargeStringProperty, {
      replaceNewlines: true,
      align: 'left',
      font: new PhetFont( 24 ),
      maxWidth: 200,
      tandem: tandem.createTandem( 'questionPromptText' )
    } );
    this.interactiveAnswerNode.addChild( questionPromptText );

    // Node for entering the answer
    const chargeEntryNode = new NumberEntryNode(
      this.chargeAnswerProperty,
      tandem.createTandem( 'chargeEntryNode' ), {
        minValue: -99,
        maxValue: 99,
        showPlusForPositive: true,
        signAfterValue: true,
        getTextColor: ShredConstants.CHARGE_TEXT_COLOR
      } );
    this.interactiveAnswerNode.addChild( chargeEntryNode );

    // Layout
    questionPromptText.centerX = layoutBounds.width * 0.65;
    questionPromptText.centerY = layoutBounds.height * 0.5;
    chargeEntryNode.left = questionPromptText.right + 10;
    chargeEntryNode.centerY = questionPromptText.centerY;
    schematicAtomNode.centerY = chargeEntryNode.centerY;

    this.disposeSchematicToChargeChallengeView = function() {
      schematicAtomNode.dispose();
      questionPromptText.dispose();
      chargeEntryNode.dispose();
      this.chargeAnswerProperty.dispose();
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

  public override reset(): void {
    this.chargeAnswerProperty.reset();
  }

  public override displayCorrectAnswer(): void {
    this.chargeAnswerProperty.value = this.challenge.answerAtom.chargeProperty.get();
  }

  public override dispose(): void {
    this.disposeSchematicToChargeChallengeView();
    super.dispose();
  }
}

buildAnAtom.register( 'SchematicToChargeChallengeView', SchematicToChargeChallengeView );

export default SchematicToChargeChallengeView;