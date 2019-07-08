// Copyright 2013-2017, University of Colorado Boulder

/**
 * View for game challenges where the user is presented with a chemical symbol
 * including atomic number, mass number, and charge, and needs to determine
 * the number of protons, neutrons, and electrons that comprise the atom.
 *
 * @author John Blanco
 */
define( function( require ) {
  'use strict';

  // modules
  var buildAnAtom = require( 'BUILD_AN_ATOM/buildAnAtom' );
  var ChallengeView = require( 'BUILD_AN_ATOM/game/view/ChallengeView' );
  var inherit = require( 'PHET_CORE/inherit' );
  var InteractiveSchematicAtom = require( 'SHRED/view/InteractiveSchematicAtom' );
  var InteractiveSymbolNode = require( 'BUILD_AN_ATOM/game/view/InteractiveSymbolNode' );
  var ModelViewTransform2 = require( 'PHETCOMMON/view/ModelViewTransform2' );
  const NumberAtom = require( 'SHRED/model/NumberAtom' );
  var Vector2 = require( 'DOT/Vector2' );

  /**
   * @param {SymbolToSchematicChallenge} challenge
   * @param {Bounds2} layoutBounds
   * @param {Tandem} tandem
   * @constructor
   */
  function SymbolToSchematicChallengeView( challenge, layoutBounds, tandem ) {

    // Create the model-view transform used by the schematic atom.
    var modelViewTransform = ModelViewTransform2.createSinglePointScaleInvertedYMapping(
      Vector2.ZERO,
      new Vector2( layoutBounds.width * 0.275, layoutBounds.height * 0.45 ),
      0.75
    );

    // Interactive schematic atom node - must be defined before call to super constructor.
    this.interactiveSchematicAtom = new InteractiveSchematicAtom( challenge.buildAnAtomModel, modelViewTransform, {
      tandem: tandem.createTandem( 'interactiveSchematicAtom' )
    } );
    this.interactiveSchematicAtom.scale( 0.95 );


    ChallengeView.call( this, challenge, layoutBounds, tandem );

    // Add interactive schematic atom.
    this.interactiveAnswerNode.addChild( this.interactiveSchematicAtom );

    // Symbol
    var interactiveSymbolNode = new InteractiveSymbolNode( challenge.answerAtom, tandem.createTandem( 'interactiveSymbolNode' ) );
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

  buildAnAtom.register( 'SymbolToSchematicChallengeView', SymbolToSchematicChallengeView );

  // Inherit from ChallengeView.
  return inherit( ChallengeView, SymbolToSchematicChallengeView, {

    // @public
    checkAnswer: function() {
      const submittedAtom = new NumberAtom( {
        protonCount: this.challenge.buildAnAtomModel.particleAtom.protonCountProperty.value,
        neutronCount: this.challenge.buildAnAtomModel.particleAtom.neutronCountProperty.value,
        electronCount: this.challenge.buildAnAtomModel.particleAtom.electronCountProperty.value
      } );
      this.challenge.checkAnswer( submittedAtom );
    },

    // @public
    displayCorrectAnswer: function() {
      this.challenge.buildAnAtomModel.setAtomConfiguration( this.challenge.answerAtom );
    },

    // @public
    dispose: function() {
      this.disposeSymbolToSchematicChallengeView();
      ChallengeView.prototype.dispose.call( this );
    }
  } );
} );
