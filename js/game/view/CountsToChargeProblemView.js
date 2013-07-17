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
  var BAAFont = require( 'common/view/BAAFont' );
  var inherit = require( 'PHET_CORE/inherit' );
  var MultiLineText = require( 'SCENERY_PHET/MultiLineText' );
  var Node = require( 'SCENERY/nodes/Node' );
  var ParticleCountsNode = require( 'game/view/ParticleCountsNode' );
  var ProblemView = require( 'game/view/ProblemView' );
  var Text = require( 'SCENERY/nodes/Text' );

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
    var questionPrompt = new MultiLineText( "What is the\ntotal charge?", { align: 'left', font: new BAAFont( 24 ) } );
    this.interactiveAnswerNode.addChild( questionPrompt );

    // Layout
    particleCountsNode.centerX = layoutBounds.width * 0.25;
    particleCountsNode.centerY = layoutBounds.height * 0.5;
    questionPrompt.centerX = layoutBounds.width * 0.65;
    questionPrompt.centerY = layoutBounds.height * 0.5;
  }

  // Inherit from ProblemView.
  inherit( ProblemView, CountsToChargeProblemView );

  return CountsToChargeProblemView;
} );
