// Copyright 2013-2022, University of Colorado Boulder

/**
 * View for game challenges where the user is presented with a chemical symbol
 * including atomic number, mass number, and charge, and needs to determine
 * the number of protons, neutrons, and electrons that comprise the atom.
 *
 * @author John Blanco
 */

import Vector2 from '../../../../dot/js/Vector2.js';
import ModelViewTransform2 from '../../../../phetcommon/js/view/ModelViewTransform2.js';
import NumberAtom from '../../../../shred/js/model/NumberAtom.js';
import InteractiveSchematicAtom from '../../../../shred/js/view/InteractiveSchematicAtom.js';
import buildAnAtom from '../../buildAnAtom.js';
import BAAGlobalPreferences from '../../common/BAAGlobalPreferences.js';
import ChallengeView from './ChallengeView.js';
import InteractiveSymbolNode from './InteractiveSymbolNode.js';

class SymbolToSchematicChallengeView extends ChallengeView {

  /**
   * @param {SymbolToSchematicChallenge} challenge
   * @param {Bounds2} layoutBounds
   * @param {Tandem} tandem
   */
  constructor( challenge, layoutBounds, tandem ) {

    // Create the model-view transform used by the schematic atom.
    const modelViewTransform = ModelViewTransform2.createSinglePointScaleInvertedYMapping(
      Vector2.ZERO,
      new Vector2( layoutBounds.width * 0.275, layoutBounds.height * 0.45 ),
      0.75
    );

    super( challenge, layoutBounds, tandem );

    this.interactiveSchematicAtom = new InteractiveSchematicAtom( challenge.buildAnAtomModel, modelViewTransform, {
      highContrastProperty: BAAGlobalPreferences.highContrastParticlesProperty,
      tandem: tandem.createTandem( 'interactiveSchematicAtom' )
    } );
    this.interactiveSchematicAtom.scale( 0.95 );


    // Add interactive schematic atom.
    this.interactiveAnswerNode.addChild( this.interactiveSchematicAtom );

    // Symbol
    const interactiveSymbolNode = new InteractiveSymbolNode( challenge.answerAtom, tandem.createTandem( 'interactiveSymbolNode' ) );
    interactiveSymbolNode.scale( 0.75 );
    this.challengePresentationNode.addChild( interactiveSymbolNode );

    // Layout
    interactiveSymbolNode.centerX = layoutBounds.width * 0.27;
    interactiveSymbolNode.centerY = layoutBounds.height * 0.52;
    this.interactiveSchematicAtom.centerX = layoutBounds.width * 0.745;
    this.interactiveSchematicAtom.centerY = layoutBounds.height * 0.51;

    // @private called by dispose
    this.disposeSymbolToSchematicChallengeView = function() {
      interactiveSymbolNode.dispose();
      this.interactiveSchematicAtom.dispose();
    };
  }

  // @public
  checkAnswer() {
    const submittedAtom = new NumberAtom( {
      protonCount: this.challenge.buildAnAtomModel.particleAtom.protonCountProperty.value,
      neutronCount: this.challenge.buildAnAtomModel.particleAtom.neutronCountProperty.value,
      electronCount: this.challenge.buildAnAtomModel.particleAtom.electronCountProperty.value
    } );
    this.challenge.checkAnswer( submittedAtom );
  }

  // @public
  displayCorrectAnswer() {
    this.challenge.buildAnAtomModel.setAtomConfiguration( this.challenge.answerAtom );
  }

  // @public
  dispose() {
    this.disposeSymbolToSchematicChallengeView();
    super.dispose();
  }
}

buildAnAtom.register( 'SymbolToSchematicChallengeView', SymbolToSchematicChallengeView );

export default SymbolToSchematicChallengeView;