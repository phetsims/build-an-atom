// Copyright 2013-2015, University of Colorado Boulder

/**
 * Problem where the user is presented with a set of counts for protons,
 * neutrons, and electrons, and must determine the overall charge.
 *
 * @author John Blanco
 */
define( function( require ) {
  'use strict';

  // modules
  var buildAnAtom = require( 'BUILD_AN_ATOM/buildAnAtom' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var inherit = require( 'PHET_CORE/inherit' );
  var MultiLineText = require( 'SCENERY_PHET/MultiLineText' );
  var NumberAtom = require( 'SHRED/model/NumberAtom' );
  var NumberEntryNode = require( 'BUILD_AN_ATOM/game/view/NumberEntryNode' );
  var ParticleCountsNode = require( 'BUILD_AN_ATOM/game/view/ParticleCountsNode' );
  var ProblemView = require( 'BUILD_AN_ATOM/game/view/ProblemView' );
  var Property = require( 'AXON/Property' );
  var ShredConstants = require( 'SHRED/ShredConstants' );

  // phet-io modules
  var TNumber = require( 'ifphetio!PHET_IO/types/TNumber' );

  // strings
  var whatIsTheTotalChargeString = require( 'string!BUILD_AN_ATOM/whatIsTheTotalCharge' );

  /**
   * @param {CountsToChargeProblem} countsToChargeProblem
   * @param {Bounds2} layoutBounds
   * @param {Tandem} tandem
   * @constructor
   */
  function CountsToChargeProblemView( countsToChargeProblem, layoutBounds, tandem ) {

    // @private
    // Must be defined before call to super constructor.
    this.chargeAnswerProperty = new Property( 0, {
      tandem: tandem.createTandem( 'chargeAnswerProperty' ),
      phetioValueType: TNumber( {
        type: 'Integer'
      } )
    } );

    ProblemView.call( this, countsToChargeProblem, layoutBounds, tandem ); // Call super constructor.
    var self = this;

    // Particle counts
    var particleCountsNode = new ParticleCountsNode( countsToChargeProblem.answerAtom );
    self.problemPresentationNode.addChild( particleCountsNode );

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
        showPlusForPositive: true,
        signAfterValue: false,
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

  buildAnAtom.register( 'CountsToChargeProblemView', CountsToChargeProblemView );

  // Inherit from ProblemView.
  return inherit( ProblemView, CountsToChargeProblemView, {

    // @public
    checkAnswer: function() {
      var userSubmittedAnswer = new NumberAtom( {
        protonCount: this.problem.answerAtom.protonCountProperty.get(),
        neutronCount: this.problem.answerAtom.neutronCountProperty.get(),
        electronCount: this.problem.answerAtom.protonCountProperty.get() - this.chargeAnswerProperty.value
      } );
      this.problem.checkAnswer( userSubmittedAnswer );
    },

    // @public
    displayCorrectAnswer: function() {
      this.chargeAnswerProperty.value = this.problem.answerAtom.chargeProperty.get();
    }
  } );
} );
