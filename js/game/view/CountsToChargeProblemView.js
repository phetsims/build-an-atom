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
  var ParticleCountsNode = require( 'game/view/ParticleCountsNode' );
  var ProblemView = require( 'game/view/ProblemView' );
  var Property = require( 'AXON/Property' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var Text = require( 'SCENERY/nodes/Text' );

  // Constants
  var READOUT_SIZE = { width: 40, height: 40 }; // Size empirically determined.

  /**
   * Main constructor function.
   *
   * @constructor
   */
  function CountsToChargeProblemView( countsToChargeProblem, layoutBounds ) {
    ProblemView.call( this, countsToChargeProblem, layoutBounds ); // Call super constructor.
    var thisNode = this;

    // Particle counts
    var particleCountsNode = new ParticleCountsNode( countsToChargeProblem.answerAtom );
    this.problemPresentationNode.addChild( particleCountsNode );

    // Question
    var chargeAnswer = new Property( 0 );
    var questionPrompt = new MultiLineText( "What is the\ntotal charge?", { align: 'left', font: new BAAFont( 24 ) } );

    // TODO: Put this into a ValueEntryNode class or something.
    this.interactiveAnswerNode.addChild( questionPrompt );
    var upArrowButton = new ArrowButton( 'up', function() { chargeAnswer.value = chargeAnswer.value + 1; } );
    this.interactiveAnswerNode.addChild( upArrowButton );
    var downArrowButton = new ArrowButton( 'down', function() { chargeAnswer.value = chargeAnswer.value - 1; } );
    this.interactiveAnswerNode.addChild( downArrowButton );
    var answerValueBackground = new Rectangle( 0, 0, READOUT_SIZE.width, READOUT_SIZE.height, 4, 4,
      {
        fill: 'white',
        stroke: 'black',
        lineWidth: 1
      } );
    this.interactiveAnswerNode.addChild( answerValueBackground );
    chargeAnswer.link( function( newValue ) {
      answerValueBackground.removeAllChildren();
      answerValueBackground.addChild( new Text( newValue,
        { font: new BAAFont( 22 ),
          centerX: answerValueBackground.width / 2,
          centerY: answerValueBackground.height / 2
        } ) );
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
  inherit( ProblemView, CountsToChargeProblemView );

  return CountsToChargeProblemView;
} );
