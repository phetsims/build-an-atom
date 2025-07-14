// Copyright 2013-2025, University of Colorado Boulder

/**
 * Visual representation of a challenge where the user is presented with a
 * schematic representation of an atom (which looks much like the atoms
 * constructed on the 1st tab) and has to adjust some or all portions of an
 * interactive chemical symbol to match.
 *
 * @author John Blanco
 */

import Bounds2 from '../../../../dot/js/Bounds2.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import ModelViewTransform2 from '../../../../phetcommon/js/view/ModelViewTransform2.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import buildAnAtom from '../../buildAnAtom.js';
import AnswerAtom from '../model/AnswerAtom.js';
import BAAGameChallenge from '../model/BAAGameChallenge.js';
import ChallengeView from './ChallengeView.js';
import InteractiveSymbolNode from './InteractiveSymbolNode.js';
import NonInteractiveSchematicAtomNode from './NonInteractiveSchematicAtomNode.js';

class SchematicToSymbolChallengeView extends ChallengeView {

  public readonly interactiveSymbolNode: InteractiveSymbolNode;
  private readonly disposeSchematicToSymbolChallengeView: () => void;

  public constructor( toSymbolChallenge: BAAGameChallenge, layoutBounds: Bounds2, tandem: Tandem ) {

    // Temporarily setting tandem to OPT OUT for PhET-iO instrumentation of the view https://github.com/phetsims/build-an-atom/issues/276
    tandem = Tandem.OPT_OUT;

    super( toSymbolChallenge, layoutBounds, tandem );

    this.interactiveSymbolNode = new InteractiveSymbolNode(
      toSymbolChallenge.answerAtom,
      tandem.createTandem( 'interactiveSymbolNode' ), {
        interactiveProtonCount: toSymbolChallenge.configurableProtonCount,
        interactiveMassNumber: toSymbolChallenge.configurableMassNumber,
        interactiveCharge: toSymbolChallenge.configurableCharge
      }
    );

    // Add the interactive symbol.
    this.interactiveSymbolNode.scale( 0.75 );
    this.interactiveAnswerNode.addChild( this.interactiveSymbolNode );

    // Create the model-view transform used by the schematic atom.
    const modelViewTransform = ModelViewTransform2.createSinglePointScaleInvertedYMapping(
      Vector2.ZERO,
      new Vector2( layoutBounds.width * 0.275, layoutBounds.height * 0.5 ),
      0.8 );

    // Add the schematic representation of the atom.
    const schematicAtomNode = new NonInteractiveSchematicAtomNode( toSymbolChallenge.answerAtom, modelViewTransform, tandem.createTandem( 'noninteractiveSchematicAtomNode' ) );
    this.challengePresentationNode.addChild( schematicAtomNode );

    // Layout - bounds of AtomNode is dependent on its stability indicator text, so place relative to left
    schematicAtomNode.left = layoutBounds.width * 0.15;
    schematicAtomNode.centerY = layoutBounds.height * 0.50;
    this.interactiveSymbolNode.centerX = layoutBounds.width * 0.745;
    this.interactiveSymbolNode.centerY = layoutBounds.height * 0.54;

    this.disposeSchematicToSymbolChallengeView = function() {
      schematicAtomNode.dispose();
      this.interactiveSymbolNode.dispose();
    };
  }

  public override checkAnswer(): void {
    const userSubmittedAnswer = new AnswerAtom( {
      protonCount: this.interactiveSymbolNode.protonCountProperty.value,
      neutronCount: this.interactiveSymbolNode.massNumberProperty.value - this.interactiveSymbolNode.protonCountProperty.value,
      electronCount: this.interactiveSymbolNode.protonCountProperty.value - this.interactiveSymbolNode.chargeProperty.value
    } );
    this.challenge.checkAnswer( userSubmittedAnswer );
  }

  public override displayCorrectAnswer(): void {
    this.interactiveSymbolNode.protonCountProperty.value = this.challenge.answerAtom.protonCountProperty.get();
    this.interactiveSymbolNode.massNumberProperty.value = this.challenge.answerAtom.massNumberProperty.get();
    this.interactiveSymbolNode.chargeProperty.value = this.challenge.answerAtom.chargeProperty.get();
  }

  public override dispose(): void {
    this.disposeSchematicToSymbolChallengeView();
    super.dispose();
  }
}

buildAnAtom.register( 'SchematicToSymbolChallengeView', SchematicToSymbolChallengeView );

export default SchematicToSymbolChallengeView;