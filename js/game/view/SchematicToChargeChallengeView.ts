// Copyright 2013-2025, University of Colorado Boulder

/**
 * Visual representation of a challenge where the user is presented with a schematic representation of an atom (which
 * looks much like the atoms constructed on the 1st tab), and must determine that atom's charge.
 *
 * @author John Blanco
 */

import DerivedStringProperty from '../../../../axon/js/DerivedStringProperty.js';
import NumberProperty from '../../../../axon/js/NumberProperty.js';
import Bounds2 from '../../../../dot/js/Bounds2.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import ModelViewTransform2 from '../../../../phetcommon/js/view/ModelViewTransform2.js';
import MathSymbols from '../../../../scenery-phet/js/MathSymbols.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import RichText from '../../../../scenery/js/nodes/RichText.js';
import ShredConstants from '../../../../shred/js/ShredConstants.js';
import ParticleCountDisplay from '../../../../shred/js/view/ParticleCountDisplay.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import buildAnAtom from '../../buildAnAtom.js';
import BuildAnAtomFluent from '../../BuildAnAtomFluent.js';
import BAAConstants from '../../common/BAAConstants.js';
import AnswerAtom from '../model/AnswerAtom.js';
import SchematicToChargeChallenge from '../model/SchematicToChargeChallenge.js';
import BAANumberSpinner from './BAANumberSpinner.js';
import ChallengeView from './ChallengeView.js';
import NonInteractiveSchematicAtomNode from './NonInteractiveSchematicAtomNode.js';

class SchematicToChargeChallengeView extends ChallengeView {

  private readonly chargeProperty: NumberProperty;

  public constructor( schematicToChargeChallenge: SchematicToChargeChallenge, layoutBounds: Bounds2, tandem: Tandem ) {

    super( schematicToChargeChallenge, layoutBounds, tandem );

    this.chargeProperty = new NumberProperty( 0, {
      tandem: tandem.createTandem( 'chargeProperty' ),
      phetioDocumentation: 'Charge value entered by the user.',
      numberType: 'Integer',
      phetioReadOnly: true,
      phetioFeatured: true
    } );

    // Create the model-view transform used by the schematic atom.
    const modelViewTransform = ModelViewTransform2.createSinglePointScaleInvertedYMapping(
      Vector2.ZERO,
      new Vector2( layoutBounds.width * 0.275, layoutBounds.height * 0.5 ),
      0.8 );

    // Add the schematic representation of the atom.
    const schematicAtomNode = new NonInteractiveSchematicAtomNode(
      schematicToChargeChallenge.correctAnswerAtom,
      modelViewTransform,
      Tandem.OPT_OUT
    );
    this.challengePresentationNode.addChild( schematicAtomNode );

    // Add the particle count indicator.  The width is empirically determined to match the layout in the design doc.
    const particleCountDisplay = new ParticleCountDisplay( schematicToChargeChallenge.correctAnswerAtom, {
      bottom: schematicAtomNode.top,
      left: schematicAtomNode.left,
      tandem: tandem.createTandem( 'particleCountDisplay' )
    } );
    this.challengePresentationNode.addChild( particleCountDisplay );

    // Question
    const questionPromptText = new RichText( BuildAnAtomFluent.whatIsTheTotalChargeStringProperty, BAAConstants.QUESTION_PROMPT_OPTIONS );
    this.interactiveAnswerNode.addChild( questionPromptText );

    // Node for entering the answer
    const chargeNumberSpinner = new BAANumberSpinner(
      this.chargeProperty,
      tandem.createTandem( 'chargeNumberSpinner' ), {
        minValue: -99,
        maxValue: 99,
        showPlusForPositive: true,
        signAfterValue: false,
        getTextColor: ShredConstants.CHARGE_TEXT_COLOR,
        arrowButtonOptions: {
          visibleProperty: this.challenge.isAnswerInteractiveProperty
        }
      } );
    this.interactiveAnswerNode.addChild( chargeNumberSpinner );

    // Layout
    questionPromptText.centerX = layoutBounds.width * 0.65;
    questionPromptText.centerY = layoutBounds.height * 0.5;
    chargeNumberSpinner.left = questionPromptText.right + 10;
    chargeNumberSpinner.centerY = questionPromptText.centerY;
    schematicAtomNode.centerY = chargeNumberSpinner.centerY + BAAConstants.ATOM_VERTICAL_OFFSET;
  }

  public override checkAnswer(): void {
    const userSubmittedAnswer = new AnswerAtom( {
      protonCount: this.challenge.correctAnswerAtom.protonCountProperty.value,
      neutronCount: this.challenge.correctAnswerAtom.neutronCountProperty.value,
      electronCount: this.challenge.correctAnswerAtom.protonCountProperty.value - this.chargeProperty.value
    } );
    this.challenge.checkAnswer( userSubmittedAnswer );
  }

  public override reset(): void {
    this.chargeProperty.reset();
  }

  public override displayCorrectAnswer(): void {
    this.chargeProperty.value = this.challenge.correctAnswerAtom.chargeProperty.value;
  }

  public override createAnswerNode(): Node {
    const chargeTextProperty = new DerivedStringProperty(
      [ this.challenge.correctAnswerAtom.chargeProperty ],
      ( charge: number ) => {
        const sign = charge > 0 ? MathSymbols.PLUS : charge < 0 ? MathSymbols.MINUS : '';
        return `${this.challenge.challengeType}<br> Net Charge: ${Math.abs( charge )}${sign}`;
      }
    );
    return new RichText( chargeTextProperty, BAAConstants.SHOW_ANSWER_TEXT_OPTIONS );
  }
}

buildAnAtom.register( 'SchematicToChargeChallengeView', SchematicToChargeChallengeView );

export default SchematicToChargeChallengeView;