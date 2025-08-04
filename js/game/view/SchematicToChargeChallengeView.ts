// Copyright 2013-2025, University of Colorado Boulder

/**
 * Visual representation of a challenge where the user is presented with a
 * schematic representation of an atom (which looks much like the atoms
 * constructed on the 1st tab), and must determine that atom's charge.
 *
 * @author John Blanco
 */

import DerivedStringProperty from '../../../../axon/js/DerivedStringProperty.js';
import NumberProperty from '../../../../axon/js/NumberProperty.js';
import Bounds2 from '../../../../dot/js/Bounds2.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import { combineOptions } from '../../../../phet-core/js/optionize.js';
import ModelViewTransform2 from '../../../../phetcommon/js/view/ModelViewTransform2.js';
import MathSymbols from '../../../../scenery-phet/js/MathSymbols.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import RichText, { RichTextOptions } from '../../../../scenery/js/nodes/RichText.js';
import Text from '../../../../scenery/js/nodes/Text.js';
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

  private readonly chargeAnswerProperty: NumberProperty;

  public constructor( schematicToChargeChallenge: SchematicToChargeChallenge, layoutBounds: Bounds2, tandem: Tandem ) {

    super( schematicToChargeChallenge, layoutBounds, tandem );

    this.chargeAnswerProperty = new NumberProperty( 0, {
      tandem: tandem.createTandem( 'chargeAnswerProperty' ),
      numberType: 'Integer',
      phetioReadOnly: true
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
    const particleCountDisplay = new ParticleCountDisplay( schematicToChargeChallenge.answerAtom, {
      bottom: schematicAtomNode.top - 10,
      left: schematicAtomNode.left,
      tandem: tandem.createTandem( 'particleCountDisplay' )
    } );
    schematicAtomNode.addChild( particleCountDisplay );

    // Question
    const questionPromptText = new RichText( BuildAnAtomFluent.whatIsTheTotalChargeStringProperty, combineOptions<RichTextOptions>( {

      tandem: tandem.createTandem( 'questionPromptText' )
    }, BAAConstants.QUESTION_PROMPT_OPTIONS ) );
    this.interactiveAnswerNode.addChild( questionPromptText );

    // Node for entering the answer
    const chargeNumberSpinner = new BAANumberSpinner(
      this.chargeAnswerProperty,
      tandem.createTandem( 'chargeNumberSpinner' ), {
        minValue: -99,
        maxValue: 99,
        showPlusForPositive: true,
        signAfterValue: true,
        getTextColor: ShredConstants.CHARGE_TEXT_COLOR,
        arrowButtonOptions: {
          visibleProperty: this.challenge.interactiveAnswerProperty
        }
      } );
    this.interactiveAnswerNode.addChild( chargeNumberSpinner );

    // Layout
    questionPromptText.centerX = layoutBounds.width * 0.65;
    questionPromptText.centerY = layoutBounds.height * 0.5;
    chargeNumberSpinner.left = questionPromptText.right + 10;
    chargeNumberSpinner.centerY = questionPromptText.centerY;
    schematicAtomNode.centerY = chargeNumberSpinner.centerY;
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
    this.chargeAnswerProperty.value = this.challenge.answerAtom.netChargeProperty.get();
  }

  public override createAnswerNode(): Node {
    const chargeTextProperty = new DerivedStringProperty(
      [ this.challenge.answerAtom.netChargeProperty ],
      ( netCharge: number ) => {
        const sign = netCharge > 0 ? MathSymbols.UNARY_PLUS : netCharge < 0 ? MathSymbols.UNARY_MINUS : '';
        return `Net Charge: ${Math.abs( netCharge )}${sign}`;
      }
    );
    return new Text( chargeTextProperty, BAAConstants.SHOW_ANSWER_TEXT_OPTIONS );
  }
}

buildAnAtom.register( 'SchematicToChargeChallengeView', SchematicToChargeChallengeView );

export default SchematicToChargeChallengeView;