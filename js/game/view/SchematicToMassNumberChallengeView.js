// Copyright 2013-2018, University of Colorado Boulder

/**
 * Visual representation of a challenge where the user is presented with a
 * schematic representation of an atom (which looks much like the atoms
 * constructed on the 1st tab), and must determine that atom's mass number.
 *
 * @author John Blanco
 */
define( require => {
  'use strict';

  // modules
  const buildAnAtom = require( 'BUILD_AN_ATOM/buildAnAtom' );
  const ChallengeView = require( 'BUILD_AN_ATOM/game/view/ChallengeView' );
  const inherit = require( 'PHET_CORE/inherit' );
  const ModelViewTransform2 = require( 'PHETCOMMON/view/ModelViewTransform2' );
  const MultiLineText = require( 'SCENERY_PHET/MultiLineText' );
  const NonInteractiveSchematicAtomNode = require( 'BUILD_AN_ATOM/game/view/NonInteractiveSchematicAtomNode' );
  const NumberAtom = require( 'SHRED/model/NumberAtom' );
  const NumberEntryNode = require( 'BUILD_AN_ATOM/game/view/NumberEntryNode' );
  const NumberProperty = require( 'AXON/NumberProperty' );
  const PhetFont = require( 'SCENERY_PHET/PhetFont' );
  const Vector2 = require( 'DOT/Vector2' );

  // strings
  const whatIsTheMassNumberString = require( 'string!BUILD_AN_ATOM/whatIsTheMassNumber' );

  /**
   *
   * @param {SchematicToMassNumberChallenge} schematicToMassNumberChallenge
   * @param {Bounds2} layoutBounds
   * @param {Tandem} tandem
   * @constructor
   */
  function SchematicToMassNumberChallengeView( schematicToMassNumberChallenge, layoutBounds, tandem ) {

    this.massNumberAnswerProperty = new NumberProperty( 0, {
      tandem: tandem.createTandem( 'massNumberAnswerProperty' ),
      numberType: 'Integer'
    } ); // Must be defined before call to super constructor.
    ChallengeView.call( this, schematicToMassNumberChallenge, layoutBounds, tandem );
    const self = this;

    // Create the model-view transform used by the schematic atom.
    const modelViewTransform = ModelViewTransform2.createSinglePointScaleInvertedYMapping(
      Vector2.ZERO,
      new Vector2( layoutBounds.width * 0.275, layoutBounds.height * 0.5 ),
      0.8 );

    // Add the schematic representation of the atom.
    const nonInteractiveSchematicAtomNode = new NonInteractiveSchematicAtomNode( schematicToMassNumberChallenge.answerAtom,
      modelViewTransform,
      tandem.createTandem( 'noninteractiveSchematicAtomNode' ) );

    self.challengePresentationNode.addChild( nonInteractiveSchematicAtomNode );

    // Question
    const questionPrompt = new MultiLineText( whatIsTheMassNumberString, {
      align: 'left',
      font: new PhetFont( 24 ),
      maxWidth: 200,
      tandem: tandem.createTandem( 'questionPrompt' )
    } );
    self.interactiveAnswerNode.addChild( questionPrompt );

    // Node for entering the answer
    const massEntryNode = new NumberEntryNode(
      self.massNumberAnswerProperty,
      tandem.createTandem( 'massEntryNode' ), {
        minValue: 0,
        maxValue: 99
      } );
    self.interactiveAnswerNode.addChild( massEntryNode );

    // Layout
    questionPrompt.centerX = layoutBounds.width * 0.65;
    questionPrompt.centerY = layoutBounds.height * 0.5;
    massEntryNode.left = questionPrompt.right + 10;
    massEntryNode.centerY = questionPrompt.centerY;

    // @private called by dispose
    this.disposeSchematicToMassNumberChallengeView = function() {
      nonInteractiveSchematicAtomNode.dispose();
      questionPrompt.dispose();
      massEntryNode.dispose();
      self.massNumberAnswerProperty.dispose();
    };
  }

  buildAnAtom.register( 'SchematicToMassNumberChallengeView', SchematicToMassNumberChallengeView );

  // Inherit from ChallengeView.
  return inherit( ChallengeView, SchematicToMassNumberChallengeView, {

    // @public
    checkAnswer: function() {
      const userSubmittedAnswer = new NumberAtom( {
        protonCount: this.challenge.answerAtom.protonCountProperty.get(),
        neutronCount: this.massNumberAnswerProperty.value - this.challenge.answerAtom.protonCountProperty.get(),
        electronCount: this.challenge.answerAtom.electronCountProperty.get()
      } );
      this.challenge.checkAnswer( userSubmittedAnswer );
    },

    // @public
    displayCorrectAnswer: function() {
      this.massNumberAnswerProperty.value = this.challenge.answerAtom.massNumberProperty.get();
    },

    // @public
    dispose: function() {
      this.disposeSchematicToMassNumberChallengeView();
      ChallengeView.prototype.dispose.call( this );
    }
  } );
} );
