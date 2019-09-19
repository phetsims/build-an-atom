// Copyright 2013-2017, University of Colorado Boulder

/**
 * Visual representation of a challenge where the user is presented with a
 * schematic representation of an atom (which looks much like the atoms
 * constructed on the 1st tab) and has to adjust some or all portions of an
 * interactive chemical symbol to match.
 *
 * @author John Blanco
 */
define( require => {
  'use strict';

  // modules
  const buildAnAtom = require( 'BUILD_AN_ATOM/buildAnAtom' );
  const ChallengeView = require( 'BUILD_AN_ATOM/game/view/ChallengeView' );
  const inherit = require( 'PHET_CORE/inherit' );
  const InteractiveSymbolNode = require( 'BUILD_AN_ATOM/game/view/InteractiveSymbolNode' );
  const ModelViewTransform2 = require( 'PHETCOMMON/view/ModelViewTransform2' );
  const NonInteractiveSchematicAtomNode = require( 'BUILD_AN_ATOM/game/view/NonInteractiveSchematicAtomNode' );
  const NumberAtom = require( 'SHRED/model/NumberAtom' );
  const Vector2 = require( 'DOT/Vector2' );

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

  // Inherit from ChallengeView.
  return inherit( ChallengeView, SchematicToSymbolChallengeView, {

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
} );
