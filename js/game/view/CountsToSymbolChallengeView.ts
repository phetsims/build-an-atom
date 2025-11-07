// Copyright 2013-2025, University of Colorado Boulder

/**
 * View for game challenges where the user is presented with a set of particle counts for an atom and must determine
 * the total charge and enter it in an interactive element symbol.
 *
 * @author John Blanco
 */

import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import { TReadOnlyProperty } from '../../../../axon/js/TReadOnlyProperty.js';
import Bounds2 from '../../../../dot/js/Bounds2.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import buildAnAtom from '../../buildAnAtom.js';
import BuildAnAtomStrings from '../../BuildAnAtomStrings.js';
import CountsToSymbolChallenge from '../model/CountsToSymbolChallenge.js';
import ParticleCountsNode from './ParticleCountsNode.js';
import ToSymbolChallengeView from './ToSymbolChallengeView.js';

class CountsToSymbolChallengeView extends ToSymbolChallengeView {

  public constructor( countsToSymbolChallenge: CountsToSymbolChallenge, layoutBounds: Bounds2, tandem: Tandem ) {

    super( countsToSymbolChallenge, layoutBounds, tandem );

    // Create the particle counts node, which the user will need to interpret to set the symbol values correctly.
    const particleCountsNode = new ParticleCountsNode( countsToSymbolChallenge.correctAnswerAtom );
    this.challengePresentationNode.addChild( particleCountsNode );

    // layout
    particleCountsNode.centerX = layoutBounds.width * 0.3;
    particleCountsNode.centerY = layoutBounds.height * 0.48;

    // Accessible Paragraphs for the description of the challenge.
    // Made a child node for consistency with the correct answer paragraph.
    // Determine which specific challenge type this is based on the configurable flags
    const accessibleParagraphStringProperty: TReadOnlyProperty<string> = new DerivedProperty(
      [
        BuildAnAtomStrings.a11y.gameScreen.challenges.countsToSymbolAll.accessibleParagraphStringProperty,
        BuildAnAtomStrings.a11y.gameScreen.challenges.countsToSymbolCharge.accessibleParagraphStringProperty,
        BuildAnAtomStrings.a11y.gameScreen.challenges.countsToSymbolMassNumber.accessibleParagraphStringProperty
      ],
      ( countsToSymbolAll: string,
        countsToSymbolCharge: string,
        countsToSymbolMassNumber: string
      ) => {
        if ( countsToSymbolChallenge.isProtonCountConfigurable &&
             countsToSymbolChallenge.isMassNumberConfigurable &&
             countsToSymbolChallenge.isChargeConfigurable ) {
          return countsToSymbolAll;
        }
        else if ( countsToSymbolChallenge.isChargeConfigurable &&
                  !countsToSymbolChallenge.isProtonCountConfigurable &&
                  !countsToSymbolChallenge.isMassNumberConfigurable ) {
          return countsToSymbolCharge;
        }
        else if ( countsToSymbolChallenge.isMassNumberConfigurable &&
                  !countsToSymbolChallenge.isProtonCountConfigurable &&
                  !countsToSymbolChallenge.isChargeConfigurable ) {
          return countsToSymbolMassNumber;
        }
        else {
          return ''; // Fallback for any other configuration
        }
      }
    );

    this.accessibleParagraphNode.accessibleParagraph = accessibleParagraphStringProperty;

    // pdom order
    this.challengeNodesPDOMOrder = [

      // start with order of the super class
      ...this.getChallengeNodesPDOMOrder(),
      particleCountsNode,
      this.interactiveSymbolNode
    ];
  }
}

buildAnAtom.register( 'CountsToSymbolChallengeView', CountsToSymbolChallengeView );

export default CountsToSymbolChallengeView;