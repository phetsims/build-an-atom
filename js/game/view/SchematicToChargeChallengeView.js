// Copyright 2013-2017, University of Colorado Boulder

/**
 * Visual representation of a challenge where the user is presented with a
 * schematic representation of an atom (which looks much like the atoms
 * constructed on the 1st tab), and must determine that atom's charge.
 *
 * @author John Blanco
 */
define( function( require ) {
  'use strict';

  // modules
  var buildAnAtom = require( 'BUILD_AN_ATOM/buildAnAtom' );
  var ChallengeView = require( 'BUILD_AN_ATOM/game/view/ChallengeView' );
  var inherit = require( 'PHET_CORE/inherit' );
  var ModelViewTransform2 = require( 'PHETCOMMON/view/ModelViewTransform2' );
  var MultiLineText = require( 'SCENERY_PHET/MultiLineText' );
  var NonInteractiveSchematicAtomNode = require( 'BUILD_AN_ATOM/game/view/NonInteractiveSchematicAtomNode' );
  var NumberAtom = require( 'SHRED/model/NumberAtom' );
  var NumberEntryNode = require( 'BUILD_AN_ATOM/game/view/NumberEntryNode' );
  var NumberProperty = require( 'AXON/NumberProperty' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var ShredConstants = require( 'SHRED/ShredConstants' );
  var Vector2 = require( 'DOT/Vector2' );

  // strings
  var whatIsTheTotalChargeString = require( 'string!BUILD_AN_ATOM/whatIsTheTotalCharge' );

  /**
   * @param {SchematicToChargeChallenge} schematicToChargeChallenge
   * @param {Bounds2} layoutBounds
   * @param {Tandem} tandem
   * @constructor
   */
  function SchematicToChargeChallengeView( schematicToChargeChallenge, layoutBounds, tandem ) {

    // Must be defined before call to super constructor.
    this.chargeAnswerProperty = new NumberProperty( 0, {
      tandem: tandem.createTandem( 'chargeAnswerProperty' ),
      valueType: 'Integer'
    } );
    ChallengeView.call( this, schematicToChargeChallenge, layoutBounds, tandem ); 
    var self = this;

    // Create the model-view transform used by the schematic atom.
    var modelViewTransform = ModelViewTransform2.createSinglePointScaleInvertedYMapping(
      Vector2.ZERO,
      new Vector2( layoutBounds.width * 0.275, layoutBounds.height * 0.5 ),
      0.8 );

    // Add the schematic representation of the atom.
    var nonInteractiveSchematicNode = new NonInteractiveSchematicAtomNode( schematicToChargeChallenge.answerAtom,
      modelViewTransform,
      tandem.createTandem( 'noninteractiveSchematicAtomNode' ) );
    this.challengePresentationNode.addChild( nonInteractiveSchematicNode );

    // Question
    var questionPrompt = new MultiLineText( whatIsTheTotalChargeString, {
      align: 'left',
      font: new PhetFont( 24 ),
      maxWidth: 200,
      tandem: tandem.createTandem( 'questionPrompt' )
    } );
    this.interactiveAnswerNode.addChild( questionPrompt );

    // Node for entering the answer
    var chargeEntryNode = new NumberEntryNode(
      self.chargeAnswerProperty,
      tandem.createTandem( 'chargeEntryNode' ), {
        minValue: -99,
        maxValue: 99,
        prependPlusSign: true,
        getTextColor: ShredConstants.CHARGE_TEXT_COLOR
      } );
    self.interactiveAnswerNode.addChild( chargeEntryNode );

    // Layout
    questionPrompt.centerX = layoutBounds.width * 0.65;
    questionPrompt.centerY = layoutBounds.height * 0.5;
    chargeEntryNode.left = questionPrompt.right + 10;
    chargeEntryNode.centerY = questionPrompt.centerY;

    // @private called by dispose
    this.disposeSchematicToChargeChallengeView = function() {
      nonInteractiveSchematicNode.dispose();
      questionPrompt.dispose();
      chargeEntryNode.dispose();
      this.chargeAnswerProperty.dispose();
    };
  }

  buildAnAtom.register( 'SchematicToChargeChallengeView', SchematicToChargeChallengeView );

  // Inherit from ChallengeView.
  return inherit( ChallengeView, SchematicToChargeChallengeView, {

    // @public
    checkAnswer: function() {
      var userSubmittedAnswer = new NumberAtom( {
        protonCount: this.challenge.answerAtom.protonCountProperty.get(),
        neutronCount: this.challenge.answerAtom.neutronCountProperty.get(),
        electronCount: this.challenge.answerAtom.protonCountProperty.get() - this.chargeAnswerProperty.value
      } );
      this.challenge.checkAnswer( userSubmittedAnswer );
    },

    // @public
    displayCorrectAnswer: function() {
      this.chargeAnswerProperty.value = this.challenge.answerAtom.chargeProperty.get();
    },

    dispose: function() {
      this.disposeSchematicToChargeChallengeView();
      ChallengeView.prototype.dispose.call( this );
    }
  } );
} );
