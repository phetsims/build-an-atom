// Copyright 2013-2020, University of Colorado Boulder

/**
 * View for game challenges where the user is presented with a chemical symbol
 * including atomic number, mass number, and charge, and needs to determine
 * the number of protons, neutrons, and electrons that comprise the atom.
 *
 * @author John Blanco
 */

import inherit from '../../../../phet-core/js/inherit.js';
import buildAnAtom from '../../buildAnAtom.js';
import ChallengeView from './ChallengeView.js';
import InteractiveParticleCountsNode from './InteractiveParticleCountsNode.js';
import InteractiveSymbolNode from './InteractiveSymbolNode.js';

/**
 * @param {SymbolToCountsChallenge} symbolToCountsChallenge
 * @param {Bounds2} layoutBounds
 * @param {Tandem} tandem
 * @constructor
 */
function SymbolToCountsChallengeView( symbolToCountsChallenge, layoutBounds, tandem ) {

  // Interactive particle count node - must be defined before call to super constructor.
  this.interactiveParticleCountsNode = new InteractiveParticleCountsNode( tandem );


  ChallengeView.call( this, symbolToCountsChallenge, layoutBounds, tandem );

  // Add interactive particle count.
  this.interactiveAnswerNode.addChild( this.interactiveParticleCountsNode );

  // Symbol
  const interactiveSymbolNode = new InteractiveSymbolNode( symbolToCountsChallenge.answerAtom, tandem.createTandem( 'interactiveSymbolNode' ) );
  interactiveSymbolNode.scale( 0.75 );
  this.challengePresentationNode.addChild( interactiveSymbolNode );

  // Layout
  interactiveSymbolNode.centerX = layoutBounds.width * 0.25;
  interactiveSymbolNode.centerY = layoutBounds.height * 0.54;
  this.interactiveParticleCountsNode.centerX = layoutBounds.width * 0.75;
  this.interactiveParticleCountsNode.centerY = layoutBounds.height * 0.49;

  // @private called by dispose
  this.disposeSymbolToCountsChallengeView = function() {
    interactiveSymbolNode.dispose();
    this.interactiveParticleCountsNode.dispose();
  };
}

buildAnAtom.register( 'SymbolToCountsChallengeView', SymbolToCountsChallengeView );

inherit( ChallengeView, SymbolToCountsChallengeView, {

  // @public
  checkAnswer: function() {
    this.challenge.checkAnswer( this.interactiveParticleCountsNode.numberAtom );
  },

  // @public
  displayCorrectAnswer: function() {
    this.interactiveParticleCountsNode.numberAtom.protonCountProperty.set( this.challenge.answerAtom.protonCountProperty.get() );
    this.interactiveParticleCountsNode.numberAtom.neutronCountProperty.set( this.challenge.answerAtom.neutronCountProperty.get() );
    this.interactiveParticleCountsNode.numberAtom.electronCountProperty.set( this.challenge.answerAtom.electronCountProperty.get() );
  },

  dispose: function() {
    this.disposeSymbolToCountsChallengeView();

    ChallengeView.prototype.dispose.call( this );
  }
} );

export default SymbolToCountsChallengeView;