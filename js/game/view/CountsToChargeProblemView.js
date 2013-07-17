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
  var ArrowButton = require( 'game/view/ArrowButton' );
  var BAAFont = require( 'common/view/BAAFont' );
  var inherit = require( 'PHET_CORE/inherit' );
  var MultiLineText = require( 'SCENERY_PHET/MultiLineText' );
  var Node = require( 'SCENERY/nodes/Node' );
  var NumberAtom = require( 'common/model/NumberAtom' );
  var ParticleCountsNode = require( 'game/view/ParticleCountsNode' );
  var ProblemView = require( 'game/view/ProblemView' );
  var Property = require( 'AXON/Property' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var Text = require( 'SCENERY/nodes/Text' );

  // Constants
  var READOUT_SIZE = { width: 50, height: 40 }; // Size empirically determined.

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
    this.problemPresentationNode.addChild( particleCountsNode );

    // Question
    var questionPrompt = new MultiLineText( "What is the\ntotal charge?", { align: 'left', font: new BAAFont( 24 ) } );

    // TODO: Put this into a ValueEntryNode class or something.
    var arrowButtonOptions = { arrowHeight: 12, arrowWidth: 15 };
    thisNode.interactiveAnswerNode.addChild( questionPrompt );
    var upArrowButton = new ArrowButton( 'up', function() { thisNode.chargeAnswer.value = thisNode.chargeAnswer.value + 1; }, arrowButtonOptions );
    thisNode.interactiveAnswerNode.addChild( upArrowButton );
    var downArrowButton = new ArrowButton( 'down', function() { thisNode.chargeAnswer.value = thisNode.chargeAnswer.value - 1; }, arrowButtonOptions );
    thisNode.interactiveAnswerNode.addChild( downArrowButton );
    var answerValueBackground = new Rectangle( 0, 0, READOUT_SIZE.width, READOUT_SIZE.height, 4, 4,
      {
        fill: 'white',
        stroke: 'black',
        lineWidth: 1
      } );
    thisNode.interactiveAnswerNode.addChild( answerValueBackground );
    thisNode.chargeAnswer.link( function( newValue ) {
      answerValueBackground.removeAllChildren();
      var prepend = newValue > 0 ? '+' : '';
      var textNode = new Text( prepend + newValue,
        { font: new BAAFont( 22 ),
          fill: newValue > 0 ? 'red' : newValue < 0 ? 'blue' : 'black',
          centerX: answerValueBackground.width / 2,
          centerY: answerValueBackground.height / 2
        } );
      answerValueBackground.addChild( textNode );
    } );

    // Layout
    particleCountsNode.centerX = layoutBounds.width * 0.25;
    particleCountsNode.centerY = layoutBounds.height * 0.5;
    questionPrompt.centerX = layoutBounds.width * 0.65;
    questionPrompt.centerY = layoutBounds.height * 0.5;
    upArrowButton.left = questionPrompt.right + 10;
    upArrowButton.bottom = questionPrompt.centerY - 1;
    downArrowButton.left = questionPrompt.right + 10;
    downArrowButton.top = questionPrompt.centerY + 1;
    answerValueBackground.centerY = questionPrompt.centerY;
    answerValueBackground.left = upArrowButton.right + 2;
  }

  // Inherit from ProblemView.
  inherit( ProblemView, CountsToChargeProblemView,
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

      clearAnswer: function() {
        this.chargeAnswer.reset;
      },

      displayCorrectAnswer: function() {
        this.chargeAnswer.value = this.problem.answerAtom.charge;
      }
    }
  );

  return CountsToChargeProblemView;
} );
