// Copyright 2013-2020, University of Colorado Boulder

/**
 * Visual representation of a challenge where the user is presented with a
 * schematic representation of an atom (which looks much like the atoms
 * constructed on the 1st tab) and has to adjust some or all portions of an
 * interactive chemical symbol to match.
 *
 * @author John Blanco
 */

import Vector2 from '../../../../dot/js/Vector2.js';
import inherit from '../../../../phet-core/js/inherit.js';
import ModelViewTransform2 from '../../../../phetcommon/js/view/ModelViewTransform2.js';
import NumberAtom from '../../../../shred/js/model/NumberAtom.js';
import buildAnAtom from '../../buildAnAtom.js';
import ChallengeView from './ChallengeView.js';
import InteractiveSymbolNode from './InteractiveSymbolNode.js';
import NonInteractiveSchematicAtomNode from './NonInteractiveSchematicAtomNode.js';

/**
 * @param {ToSymbolChallenge} toSymbolChallenge
 * @param {Bounds2} layoutBounds
 * @param {Tandem} tandem
 * @constructor
 */
function SchematicToSymbolChallengeView( toSymbolChallenge, layoutBounds, tandem ) {

  // Interactive Symbol (must be defined before the call to the super constructor).
  this.interactiveSymbolNode = new InteractiveSymbolNode(
    toSymbolChallenge.answerAtom,
    tandem.createTandem( 'interactiveSymbolNode' ), {
      interactiveProtonCount: toSymbolChallenge.configurableProtonCount,
      interactiveMassNumber: toSymbolChallenge.configurableMassNumber,
      interactiveCharge: toSymbolChallenge.configurableCharge
    } );

  ChallengeView.call( this, toSymbolChallenge, layoutBounds, tandem );

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

  // @private called by dispose
  this.disposeSchematicToSymbolChallengeView = function() {
    schematicAtomNode.dispose();
    this.interactiveSymbolNode.dispose();
  };
}

buildAnAtom.register( 'SchematicToSymbolChallengeView', SchematicToSymbolChallengeView );

inherit( ChallengeView, SchematicToSymbolChallengeView, {

  // @public
  checkAnswer: function() {
    const userSubmittedAtom = new NumberAtom( {
      protonCount: this.interactiveSymbolNode.protonCountProperty.value,
      neutronCount: this.interactiveSymbolNode.massNumberProperty.value - this.interactiveSymbolNode.protonCountProperty.value,
      electronCount: this.interactiveSymbolNode.protonCountProperty.value - this.interactiveSymbolNode.chargeProperty.value
    } );
    this.challenge.checkAnswer( userSubmittedAtom );
  },

  // @public
  displayCorrectAnswer: function() {
    this.interactiveSymbolNode.protonCountProperty.value = this.challenge.answerAtom.protonCountProperty.get();
    this.interactiveSymbolNode.massNumberProperty.value = this.challenge.answerAtom.massNumberProperty.get();
    this.interactiveSymbolNode.chargeProperty.value = this.challenge.answerAtom.chargeProperty.get();
  },

  // @public
  dispose: function() {
    this.disposeSchematicToSymbolChallengeView();
    ChallengeView.prototype.dispose.call( this );
  }
} );

export default SchematicToSymbolChallengeView;