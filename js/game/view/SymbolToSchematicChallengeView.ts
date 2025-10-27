// Copyright 2013-2025, University of Colorado Boulder

/**
 * View for game challenges where the user is presented with a chemical symbol including proton count (aka atomic
 * number), mass number, and charge, and needs to determine the number of protons, neutrons, and electrons that comprise
 * the atom.
 *
 * @author John Blanco
 */

import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import DerivedStringProperty from '../../../../axon/js/DerivedStringProperty.js';
import { TReadOnlyProperty } from '../../../../axon/js/TReadOnlyProperty.js';
import Bounds2 from '../../../../dot/js/Bounds2.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import ModelViewTransform2 from '../../../../phetcommon/js/view/ModelViewTransform2.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import RichText from '../../../../scenery/js/nodes/RichText.js';
import ParticleCountDisplay from '../../../../shred/js/view/ParticleCountDisplay.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import NumberIO from '../../../../tandem/js/types/NumberIO.js';
import buildAnAtom from '../../buildAnAtom.js';
import BuildAnAtomStrings from '../../BuildAnAtomStrings.js';
import BAAConstants from '../../common/BAAConstants.js';
import InteractiveSchematicAtom from '../../common/view/InteractiveSchematicAtom.js';
import AnswerAtom from '../model/AnswerAtom.js';
import SymbolToSchematicChallenge from '../model/SymbolToSchematicChallenge.js';
import ChallengeView from './ChallengeView.js';
import InteractiveSymbolNode from './InteractiveSymbolNode.js';

class SymbolToSchematicChallengeView extends ChallengeView {

  public override challenge: SymbolToSchematicChallenge;
  public interactiveSchematicAtom: InteractiveSchematicAtom;

  // These properties are only used for PhET-iO, so they are not used in the code elsewhere.
  private userProtonCountProperty: TReadOnlyProperty<number>;
  private userNeutronCountProperty: TReadOnlyProperty<number>;
  private userElectronCountProperty: TReadOnlyProperty<number>;


  public constructor( challenge: SymbolToSchematicChallenge, layoutBounds: Bounds2, tandem: Tandem ) {

    // Create the model-view transform used by the schematic atom.
    const modelViewTransform = ModelViewTransform2.createSinglePointScaleInvertedYMapping(
      Vector2.ZERO,
      new Vector2( layoutBounds.width * 0.275, layoutBounds.height * 0.45 ),
      0.75
    );

    super( challenge, layoutBounds, tandem );

    this.challenge = challenge;

    this.interactiveSchematicAtom = new InteractiveSchematicAtom( challenge.submittedAnswerModel, modelViewTransform, {
      tandem: tandem.createTandem( 'interactiveSchematicAtom' ),
      scale: 0.95 // Scale down the atom to fit well in the challenge view, value empirically determined
    } );

    // Add interactive schematic atom.
    this.interactiveAnswerNode.addChild( this.interactiveSchematicAtom );

    // Add the particle count indicator.  The width is empirically determined to match the layout in the design doc.
    const particleCountDisplay = new ParticleCountDisplay( challenge.submittedAnswerModel.atom, {
      bottom: this.interactiveSchematicAtom.top,
      left: this.interactiveSchematicAtom.left,
      tandem: tandem.createTandem( 'particleCountDisplay' )
    } );
    this.interactiveSchematicAtom.addChild( particleCountDisplay );
    particleCountDisplay.moveToBack(); // Move to back so particles are in front of the display

    // symbol
    const interactiveSymbolNode = new InteractiveSymbolNode( challenge.correctAnswerAtom, {
      tandem: Tandem.OPT_OUT
    } );
    interactiveSymbolNode.scale( 0.75 );
    this.challengePresentationNode.addChild( interactiveSymbolNode );

    // Derived properties to know the amount of protons, neutrons, and electrons
    // For PhET-iO we need to create these properties even if they are not used in the code elsewhere.
    // This was requested in https://github.com/phetsims/build-an-atom/issues/294
    const particleCountTandem = tandem.createTandem( 'particleCounts' );
    this.userProtonCountProperty = new DerivedProperty(
      [ challenge.submittedAnswerModel.atom.protonCountProperty ], protons => protons,
      {
        tandem: particleCountTandem.createTandem( 'protonCountProperty' ),
        phetioDocumentation: 'The number of protons entered by the user.',
        phetioValueType: NumberIO,
        phetioFeatured: true
      } );
    this.userNeutronCountProperty = new DerivedProperty(
      [ challenge.submittedAnswerModel.atom.neutronCountProperty ], neutrons => neutrons,
      {
        tandem: particleCountTandem.createTandem( 'neutronCountProperty' ),
        phetioDocumentation: 'The number of neutrons entered by the user.',
        phetioValueType: NumberIO,
        phetioFeatured: true
      } );
    this.userElectronCountProperty = new DerivedProperty(
      [ challenge.submittedAnswerModel.atom.electronCountProperty ], electrons => electrons,
      {
        tandem: particleCountTandem.createTandem( 'electronCountProperty' ),
        phetioDocumentation: 'The number of electrons entered by the user.',
        phetioValueType: NumberIO,
        phetioFeatured: true
      } );

    // layout
    interactiveSymbolNode.centerX = layoutBounds.width * 0.27;
    interactiveSymbolNode.centerY = layoutBounds.height * 0.52;
    this.interactiveSchematicAtom.centerX = layoutBounds.width * 0.745;
    this.interactiveSchematicAtom.centerY = layoutBounds.height * 0.51;

    // Accessible Paragraphs for the description of the challenge.
    // Made a child node for consistency with the correct answer paragraph.
    this.addChild( new Node( {
      accessibleParagraph: BuildAnAtomStrings.a11y.gameScreen.challenges.symbolToSchematic.accessibleParagraphStringProperty
    } ) );

    // pdom order
    this.challengeNodesPDOMOrder = [
      ...this.getChallengeNodesPDOMOrder(),
      interactiveSymbolNode
    ];
    this.answerNodesPDOMOrder = [
      ...this.getAnswerNodesPDOMOrder(),
      this.interactiveSchematicAtom
    ];
  }

  public override checkAnswer(): void {
    const userSubmittedAnswer = new AnswerAtom( {
      protonCount: this.challenge.submittedAnswerModel.atom.protonCountProperty.value,
      neutronCount: this.challenge.submittedAnswerModel.atom.neutronCountProperty.value,
      electronCount: this.challenge.submittedAnswerModel.atom.electronCountProperty.value
    } );
    this.challenge.checkAnswer( userSubmittedAnswer );
  }

  public override reset(): void {
    this.challenge.submittedAnswerModel.reset();
  }

  public override displayCorrectAnswer(): void {
    this.challenge.submittedAnswerModel.setAtomConfiguration( this.challenge.correctAnswerAtom );
  }

  public override createAnswerNode(): Node {

    const answerTextProperty = new DerivedStringProperty(
      [
        this.challenge.correctAnswerAtom.protonCountProperty,
        this.challenge.correctAnswerAtom.neutronCountProperty,
        this.challenge.correctAnswerAtom.electronCountProperty
      ],
      ( protonCount: number, neutronCount, electronCount ) => {
        return `${this.challenge.challengeType}<br> Protons: ${protonCount}, Neutrons: ${neutronCount}, Electrons: ${electronCount}`;
      }
    );
    return new RichText( answerTextProperty, BAAConstants.SHOW_ANSWER_TEXT_OPTIONS );
  }
}

buildAnAtom.register( 'SymbolToSchematicChallengeView', SymbolToSchematicChallengeView );

export default SymbolToSchematicChallengeView;