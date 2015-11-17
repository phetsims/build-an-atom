// Copyright 2013-2015, University of Colorado Boulder

/**
 * Problem where the user is presented with a set of counts for protons,
 * neutrons, and electrons, and must determine the mass number.
 *
 * @author John Blanco
 */
define( function( require ) {
  'use strict';

  // modules
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var inherit = require( 'PHET_CORE/inherit' );
  var MultiLineText = require( 'SCENERY_PHET/MultiLineText' );
  var NumberAtom = require( 'BUILD_AN_ATOM/common/model/NumberAtom' );
  var NumberEntryNode = require( 'BUILD_AN_ATOM/game/view/NumberEntryNode' );
  var ParticleCountsNode = require( 'BUILD_AN_ATOM/game/view/ParticleCountsNode' );
  var ProblemView = require( 'BUILD_AN_ATOM/game/view/ProblemView' );
  var Property = require( 'AXON/Property' );

  // strings
  var whatIsTheMassNumberString = require( 'string!BUILD_AN_ATOM/whatIsTheMassNumber' );

  /**
   * Main constructor function.
   *
   * @constructor
   */
  function CountsToMassNumberProblemView( countsToMassNumberProblem, layoutBounds ) {

    this.massNumberAnswer = new Property( 0 ); // Must be defined before call to super constructor.
    ProblemView.call( this, countsToMassNumberProblem, layoutBounds ); // Call super constructor.
    var thisNode = this;

    // Particle counts
    var particleCountsNode = new ParticleCountsNode( countsToMassNumberProblem.answerAtom );
    thisNode.problemPresentationNode.addChild( particleCountsNode );

    var questionPrompt = new MultiLineText( whatIsTheMassNumberString, {
      align: 'left',
      font: new PhetFont( 24 )
    } );
    thisNode.interactiveAnswerNode.addChild( questionPrompt );

    // Node for entering the answer
    var numberEntryNode = new NumberEntryNode( thisNode.massNumberAnswer, { minValue: 0, maxValue: 99 } );
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
  return inherit( ProblemView, CountsToMassNumberProblemView,
    {
      checkAnswer: function() {
        var userSubmittedAnswer = new NumberAtom(
          {
            protonCount: this.problem.answerAtom.protonCount,
            neutronCount: this.massNumberAnswer.value - this.problem.answerAtom.protonCount,
            electronCount: this.problem.answerAtom.electronCount
          } );
        this.problem.checkAnswer( userSubmittedAnswer );
      },

      displayCorrectAnswer: function() {
        this.massNumberAnswer.value = this.problem.answerAtom.massNumber;
      }
    }
  );
} );
