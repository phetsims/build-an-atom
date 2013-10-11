// Copyright 2002-2013, University of Colorado Boulder

/**
 * Problem where the user is presented with a set of counts for protons,
 * neutrons, and electrons, and must determine the overall charge.
 *
 * @author John Blanco
 */
define( function( require ) {
  'use strict';

  // Imports
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var inherit = require( 'PHET_CORE/inherit' );
  var MultiLineText = require( 'SCENERY_PHET/MultiLineText' );
  var Node = require( 'SCENERY/nodes/Node' );
  var NumberAtom = require( 'BUILD_AN_ATOM/common/model/NumberAtom' );
  var NumberEntryNode = require( 'BUILD_AN_ATOM/game/view/NumberEntryNode' );
  var ParticleCountsNode = require( 'BUILD_AN_ATOM/game/view/ParticleCountsNode' );
  var ProblemView = require( 'BUILD_AN_ATOM/game/view/ProblemView' );
  var Property = require( 'AXON/Property' );
  var SharedConstants = require( 'BUILD_AN_ATOM/common/SharedConstants' );

  /**
   * Main constructor function.
   *
   * @constructor
   */
  function CountsToChargeProblemView( countsToChargeProblem, layoutBounds ) {

    this.chargeAnswer = new Property( 0 ); // Must be defined before call to super constructor.
    ProblemView.call( this, countsToChargeProblem, layoutBounds ); // Call super constructor.
    var thisNode = this;

    // Particle counts
    var particleCountsNode = new ParticleCountsNode( countsToChargeProblem.answerAtom );
    thisNode.problemPresentationNode.addChild( particleCountsNode );

    // Question TODO: i18n
    var questionPrompt = new MultiLineText( "What is the\ntotal charge?", { align: 'left', font: new PhetFont( 24 ) } );
    thisNode.interactiveAnswerNode.addChild( questionPrompt );

    // Node for entering the answer
    var numberEntryNode = new NumberEntryNode( thisNode.chargeAnswer, { prependPlusSign: true, getTextColor: SharedConstants.CHARGE_TEXT_COLOR } );
    thisNode.interactiveAnswerNode.addChild( numberEntryNode );

    // Layout
    particleCountsNode.centerX = layoutBounds.width * 0.3;
    particleCountsNode.centerY = layoutBounds.height * 0.5;
    questionPrompt.centerX = layoutBounds.width * 0.65;
    questionPrompt.centerY = layoutBounds.height * 0.5;
    numberEntryNode.left = questionPrompt.right + 10;
    numberEntryNode.centerY = questionPrompt.centerY;
  }

  // Inherit from ProblemView.
  return inherit( ProblemView, CountsToChargeProblemView,
    {
      checkAnswer: function() {
        var userSubmittedAnswer = new NumberAtom(
          {
            protonCount: this.problem.answerAtom.protonCount,
            neutronCount: this.problem.answerAtom.neutronCount,
            electronCount: this.problem.answerAtom.protonCount - this.chargeAnswer.value
          } );
        this.problem.checkAnswer( userSubmittedAnswer );
      },

      displayCorrectAnswer: function() {
        this.chargeAnswer.value = this.problem.answerAtom.charge;
      }
    }
  );
} );
