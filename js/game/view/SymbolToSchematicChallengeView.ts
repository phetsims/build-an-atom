// Copyright 2013-2025, University of Colorado Boulder

/**
 * View for game challenges where the user is presented with a chemical symbol
 * including atomic number, mass number, and charge, and needs to determine
 * the number of protons, neutrons, and electrons that comprise the atom.
 *
 * @author John Blanco
 */

import Bounds2 from '../../../../dot/js/Bounds2.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import ModelViewTransform2 from '../../../../phetcommon/js/view/ModelViewTransform2.js';
import ParticleCountDisplay from '../../../../shred/js/view/ParticleCountDisplay.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import buildAnAtom from '../../buildAnAtom.js';
import InteractiveSchematicAtom from '../../common/view/InteractiveSchematicAtom.js';
import AnswerAtom from '../model/AnswerAtom.js';
import SymbolToSchematicChallenge from '../model/SymbolToSchematicChallenge.js';
import ChallengeView from './ChallengeView.js';
import InteractiveSymbolNode from './InteractiveSymbolNode.js';

class SymbolToSchematicChallengeView extends ChallengeView {

  public override challenge: SymbolToSchematicChallenge;
  public interactiveSchematicAtom: InteractiveSchematicAtom;
  private readonly disposeSymbolToSchematicChallengeView: () => void;

  public constructor( challenge: SymbolToSchematicChallenge, layoutBounds: Bounds2, tandem: Tandem ) {

    // TODO: Temporarily setting tandem to OPT OUT for PhET-iO instrumentation of the view https://github.com/phetsims/build-an-atom/issues/276
    tandem = Tandem.OPT_OUT;

    // Create the model-view transform used by the schematic atom.
    const modelViewTransform = ModelViewTransform2.createSinglePointScaleInvertedYMapping(
      Vector2.ZERO,
      new Vector2( layoutBounds.width * 0.275, layoutBounds.height * 0.45 ),
      0.75
    );

    super( challenge, layoutBounds, tandem );

    this.challenge = challenge;

    this.interactiveSchematicAtom = new InteractiveSchematicAtom( challenge.buildAnAtomModel, modelViewTransform, {
      tandem: tandem.createTandem( 'interactiveSchematicAtom' ),
      scale: 0.95 // Scale down the atom to fit well in the challenge view, value empirically determined
    } );

    // Add interactive schematic atom.
    this.interactiveAnswerNode.addChild( this.interactiveSchematicAtom );

    // Add the particle count indicator.  The width is empirically determined to match the layout in the design doc.
    const particleCountDisplay = new ParticleCountDisplay( challenge.buildAnAtomModel.atom, 13, {
      tandem: tandem.createTandem( 'particleCountDisplay' ),
      bottom: this.interactiveSchematicAtom.top,
      left: this.interactiveSchematicAtom.left
    } );
    this.interactiveSchematicAtom.addChild( particleCountDisplay );

    // Symbol
    const interactiveSymbolNode = new InteractiveSymbolNode( challenge.answerAtom, tandem.createTandem( 'interactiveSymbolNode' ) );
    interactiveSymbolNode.scale( 0.75 );
    this.challengePresentationNode.addChild( interactiveSymbolNode );

    // Layout
    interactiveSymbolNode.centerX = layoutBounds.width * 0.27;
    interactiveSymbolNode.centerY = layoutBounds.height * 0.52;
    this.interactiveSchematicAtom.centerX = layoutBounds.width * 0.745;
    this.interactiveSchematicAtom.centerY = layoutBounds.height * 0.51;

    this.disposeSymbolToSchematicChallengeView = () => {
      interactiveSymbolNode.dispose();
      this.interactiveSchematicAtom.dispose();
    };
  }

  public override checkAnswer(): void {
    const userSubmittedAnswer = new AnswerAtom( {
      protonCount: this.challenge.buildAnAtomModel.atom.protonCountProperty.value,
      neutronCount: this.challenge.buildAnAtomModel.atom.neutronCountProperty.value,
      electronCount: this.challenge.buildAnAtomModel.atom.electronCountProperty.value
    } );
    this.challenge.checkAnswer( userSubmittedAnswer );
  }

  public override reset(): void {
    this.challenge.buildAnAtomModel.reset();
  }

  public override displayCorrectAnswer(): void {
    this.challenge.buildAnAtomModel.setAtomConfiguration( this.challenge.answerAtom );
  }

  public override dispose(): void {
    this.disposeSymbolToSchematicChallengeView();
    super.dispose();
  }
}

buildAnAtom.register( 'SymbolToSchematicChallengeView', SymbolToSchematicChallengeView );

export default SymbolToSchematicChallengeView;