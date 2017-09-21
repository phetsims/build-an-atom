// Copyright 2013-2017, University of Colorado Boulder

/**
 * Challenge where the user is presented with a set of counts for protons,
 * neutrons, and electrons, and must determine the overall charge.
 *
 * @author John Blanco
 */
define( function( require ) {
  'use strict';

  // modules
  var buildAnAtom = require( 'BUILD_AN_ATOM/buildAnAtom' );
  var ChallengeView = require( 'BUILD_AN_ATOM/game/view/ChallengeView' );
  var inherit = require( 'PHET_CORE/inherit' );
  var MultiLineText = require( 'SCENERY_PHET/MultiLineText' );
  var NumberAtom = require( 'SHRED/model/NumberAtom' );
  var NumberEntryNode = require( 'BUILD_AN_ATOM/game/view/NumberEntryNode' );
  var NumberProperty = require( 'AXON/NumberProperty' );
  var ParticleCountsNode = require( 'BUILD_AN_ATOM/game/view/ParticleCountsNode' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var ShredConstants = require( 'SHRED/ShredConstants' );

  // strings
  var whatIsTheTotalChargeString = require( 'string!BUILD_AN_ATOM/whatIsTheTotalCharge' );

  /**
   * @param {CountsToChargeChallenge} countsToChargeChallenge
   * @param {Bounds2} layoutBounds
   * @param {Tandem} tandem
   * @constructor
   */
  function CountsToChargeChallengeView( countsToChargeChallenge, layoutBounds, tandem ) {

    // @private
    // Must be defined before call to super constructor.
    this.chargeAnswerProperty = new NumberProperty( 0, {
      tandem: tandem.createTandem( 'chargeAnswerProperty' ),
      valueType: 'Integer'
    } );

    ChallengeView.call( this, countsToChargeChallenge, layoutBounds, tandem ); // Call super constructor.
    var self = this;

    // Particle counts
    var particleCountsNode = new ParticleCountsNode( countsToChargeChallenge.answerAtom );
    self.challengePresentationNode.addChild( particleCountsNode );

    var questionPrompt = new MultiLineText( whatIsTheTotalChargeString, {
      align: 'left',
      font: new PhetFont( 24 ),
      maxWidth: 200,
      tandem: tandem.createTandem( 'questionPrompt' )
    } );
    self.interactiveAnswerNode.addChild( questionPrompt );

    // Node for entering the answer
    var numberEntryNode = new NumberEntryNode(
      self.chargeAnswerProperty,
      tandem.createTandem( 'numberEntryNode' ), {
        prependPlusSign: true,
        getTextColor: ShredConstants.CHARGE_TEXT_COLOR,
        maxValue: 99,
        minValue: -99
      } );
    self.interactiveAnswerNode.addChild( numberEntryNode );

    // Layout
    particleCountsNode.centerX = layoutBounds.width * 0.3;
    particleCountsNode.centerY = layoutBounds.height * 0.5;
    questionPrompt.centerX = layoutBounds.width * 0.65;
    questionPrompt.centerY = layoutBounds.height * 0.5;
    numberEntryNode.left = questionPrompt.right + 10;
    numberEntryNode.centerY = questionPrompt.centerY;
  }

  buildAnAtom.register( 'CountsToChargeChallengeView', CountsToChargeChallengeView );

  // Inherit from ChallengeView.
  return inherit( ChallengeView, CountsToChargeChallengeView, {

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
    }
  } );
} );
