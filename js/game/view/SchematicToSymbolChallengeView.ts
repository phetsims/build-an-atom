// Copyright 2013-2025, University of Colorado Boulder

/**
 * Visual representation of a challenge where the user is presented with a schematic representation of an atom (which
 * looks much like the atoms constructed on the 1st tab) and has to adjust some or all portions of an interactive
 * chemical symbol to match.
 *
 * @author John Blanco
 */

import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import { TReadOnlyProperty } from '../../../../axon/js/TReadOnlyProperty.js';
import Bounds2 from '../../../../dot/js/Bounds2.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import ModelViewTransform2 from '../../../../phetcommon/js/view/ModelViewTransform2.js';
import ParticleCountDisplay from '../../../../shred/js/view/ParticleCountDisplay.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import buildAnAtom from '../../buildAnAtom.js';
import BuildAnAtomStrings from '../../BuildAnAtomStrings.js';
import BAAConstants from '../../common/BAAConstants.js';
import AtomDescriberAccessibleListNode from '../../common/view/description/AtomDescriberAccessibleListNode.js';
import SchematicToSymbolChallenge from '../model/SchematicToSymbolChallenge.js';
import NonInteractiveSchematicAtomNode from './NonInteractiveSchematicAtomNode.js';
import ToSymbolChallengeView from './ToSymbolChallengeView.js';

class SchematicToSymbolChallengeView extends ToSymbolChallengeView {

  public constructor( schematicToSymbolChallenge: SchematicToSymbolChallenge, layoutBounds: Bounds2, tandem: Tandem ) {

    super( schematicToSymbolChallenge, layoutBounds, tandem );

    // Create the model-view transform used by the schematic atom.
    const modelViewTransform = ModelViewTransform2.createSinglePointScaleInvertedYMapping(
      Vector2.ZERO,
      new Vector2( layoutBounds.width * 0.275, layoutBounds.height * 0.5 ),
      0.8 );

    // Add the schematic representation of the atom.
    const schematicAtomNode = new NonInteractiveSchematicAtomNode(
      schematicToSymbolChallenge.correctAnswerAtom,
      modelViewTransform,
      Tandem.OPT_OUT
    );
    this.challengePresentationNode.addChild( schematicAtomNode );

    schematicAtomNode.addChild(
      AtomDescriberAccessibleListNode.createNonInteractiveAtomListNode( schematicToSymbolChallenge.correctAnswerAtom )
    );


    // Add the particle count indicator.  The width is empirically determined to match the layout in the design doc.
    const particleCountDisplay = new ParticleCountDisplay( schematicToSymbolChallenge.correctAnswerAtom, {
      bottom: schematicAtomNode.top,
      left: schematicAtomNode.left,
      tandem: tandem.createTandem( 'particleCountDisplay' )
    } );
    this.challengePresentationNode.addChild( particleCountDisplay );

    // Layout - bounds of AtomNode are dependent on its stability indicator text, so place relative to left.
    schematicAtomNode.left = layoutBounds.width * 0.15;
    schematicAtomNode.centerY = layoutBounds.height * 0.50 + BAAConstants.ATOM_VERTICAL_OFFSET;

    // Accessible Paragraphs for the description of the challenge.
    // Made a child node for consistency with the correct answer paragraph.
    // Determine which specific challenge type this is based on the configurable flags
    const accessibleParagraphStringProperty: TReadOnlyProperty<string> = new DerivedProperty(
      [
        BuildAnAtomStrings.a11y.gameScreen.challenges.schematicToSymbolAll.accessibleParagraphStringProperty,
        BuildAnAtomStrings.a11y.gameScreen.challenges.schematicToSymbolCharge.accessibleParagraphStringProperty,
        BuildAnAtomStrings.a11y.gameScreen.challenges.schematicToSymbolMassNumber.accessibleParagraphStringProperty,
        BuildAnAtomStrings.a11y.gameScreen.challenges.schematicToSymbolProtonCount.accessibleParagraphStringProperty
      ],
      (
        schematicToSymbolAll: string,
        schematicToSymbolCharge: string,
        schematicToSymbolMassNumber: string,
        schematicToSymbolProtonCount: string
      ) => {
        if ( schematicToSymbolChallenge.isProtonCountConfigurable &&
             schematicToSymbolChallenge.isMassNumberConfigurable &&
             schematicToSymbolChallenge.isChargeConfigurable ) {
          return schematicToSymbolAll;
        }
        else if ( schematicToSymbolChallenge.isChargeConfigurable &&
                  !schematicToSymbolChallenge.isProtonCountConfigurable &&
                  !schematicToSymbolChallenge.isMassNumberConfigurable ) {
          return schematicToSymbolCharge;
        }
        else if ( schematicToSymbolChallenge.isMassNumberConfigurable &&
                  !schematicToSymbolChallenge.isProtonCountConfigurable &&
                  !schematicToSymbolChallenge.isChargeConfigurable ) {
          return schematicToSymbolMassNumber;
        }
        else if ( schematicToSymbolChallenge.isProtonCountConfigurable &&
                  !schematicToSymbolChallenge.isMassNumberConfigurable &&
                  !schematicToSymbolChallenge.isChargeConfigurable ) {
          return schematicToSymbolProtonCount;
        }
        else {
          return ''; // Fallback for any other configuration
        }
      }
    );

    this.accessibleParagraphNode.accessibleParagraph = accessibleParagraphStringProperty;

    // pdom order
    this.challengeNodesPDOMOrder = [
      ...this.getChallengeNodesPDOMOrder(),
      schematicAtomNode,
      particleCountDisplay
    ];

    this.answerNodesPDOMOrder = [
      this.interactiveSymbolNode,
      ...this.getAnswerNodesPDOMOrder()
    ];
  }
}

buildAnAtom.register( 'SchematicToSymbolChallengeView', SchematicToSymbolChallengeView );

export default SchematicToSymbolChallengeView;