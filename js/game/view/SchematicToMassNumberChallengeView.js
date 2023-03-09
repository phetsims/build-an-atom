// Copyright 2013-2023, University of Colorado Boulder

/**
 * Visual representation of a challenge where the user is presented with a
 * schematic representation of an atom (which looks much like the atoms
 * constructed on the 1st tab), and must determine that atom's mass number.
 *
 * @author John Blanco
 */

import NumberProperty from '../../../../axon/js/NumberProperty.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import ModelViewTransform2 from '../../../../phetcommon/js/view/ModelViewTransform2.js';
import { RichText } from '../../../../scenery/js/imports.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import NumberAtom from '../../../../shred/js/model/NumberAtom.js';
import buildAnAtom from '../../buildAnAtom.js';
import BuildAnAtomStrings from '../../BuildAnAtomStrings.js';
import ChallengeView from './ChallengeView.js';
import NonInteractiveSchematicAtomNode from './NonInteractiveSchematicAtomNode.js';
import NumberEntryNode from './NumberEntryNode.js';

const whatIsTheMassNumberString = BuildAnAtomStrings.whatIsTheMassNumber;

class SchematicToMassNumberChallengeView extends ChallengeView {

  /**
   * @param {SchematicToMassNumberChallenge} schematicToMassNumberChallenge
   * @param {Bounds2} layoutBounds
   * @param {Tandem} tandem
   */
  constructor( schematicToMassNumberChallenge, layoutBounds, tandem ) {

    super( schematicToMassNumberChallenge, layoutBounds, tandem );

    this.massNumberAnswerProperty = new NumberProperty( 0, {
      tandem: tandem.createTandem( 'massNumberAnswerProperty' ),
      numberType: 'Integer'
    } );

    // Create the model-view transform used by the schematic atom.
    const modelViewTransform = ModelViewTransform2.createSinglePointScaleInvertedYMapping(
      Vector2.ZERO,
      new Vector2( layoutBounds.width * 0.275, layoutBounds.height * 0.5 ),
      0.8 );

    // Add the schematic representation of the atom.
    const nonInteractiveSchematicAtomNode = new NonInteractiveSchematicAtomNode( schematicToMassNumberChallenge.answerAtom,
      modelViewTransform,
      tandem.createTandem( 'noninteractiveSchematicAtomNode' ) );

    this.challengePresentationNode.addChild( nonInteractiveSchematicAtomNode );

    // Question
    const questionPrompt = new RichText( whatIsTheMassNumberString, {
      replaceNewlines: true,
      align: 'left',
      font: new PhetFont( 24 ),
      maxWidth: 200,
      tandem: tandem.createTandem( 'questionPrompt' )
    } );
    this.interactiveAnswerNode.addChild( questionPrompt );

    // Node for entering the answer
    const massEntryNode = new NumberEntryNode(
      this.massNumberAnswerProperty,
      tandem.createTandem( 'massEntryNode' ), {
        minValue: 0,
        maxValue: 99
      } );
    this.interactiveAnswerNode.addChild( massEntryNode );

    // Layout
    questionPrompt.centerX = layoutBounds.width * 0.65;
    questionPrompt.centerY = layoutBounds.height * 0.5;
    massEntryNode.left = questionPrompt.right + 10;
    massEntryNode.centerY = questionPrompt.centerY;

    // @private called by dispose
    this.disposeSchematicToMassNumberChallengeView = () => {
      nonInteractiveSchematicAtomNode.dispose();
      questionPrompt.dispose();
      massEntryNode.dispose();
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

  // @public
  dispose() {
    this.disposeSchematicToMassNumberChallengeView();
    super.dispose();
  }
}

buildAnAtom.register( 'SchematicToMassNumberChallengeView', SchematicToMassNumberChallengeView );

export default SchematicToMassNumberChallengeView;