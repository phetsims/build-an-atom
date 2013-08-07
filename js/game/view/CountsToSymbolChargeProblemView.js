// Copyright 2002-2013, University of Colorado Boulder

/**
 * View for game problems where the user is presented with a set of particle
 * counts for an atom and must determine the total charge and enter it in an
 * interactive element symbol.
 *
 * @author John Blanco
 */
define( function( require ) {
  'use strict';

  // Imports
  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( 'SCENERY/nodes/Node' );
  var NumberAtom = require( 'common/model/NumberAtom' );
  var InteractiveSymbolNode = require( 'game/view/InteractiveSymbolNode' );
  var ParticleCountsNode = require( 'game/view/ParticleCountsNode' );
  var ProblemView = require( 'game/view/ProblemView' );

  /**
   * Main constructor function.
   *
   * @constructor
   */
  function CountsToSymbolChargeProblemView( countsToChargeProblem, layoutBounds ) {

    // Interactive Symbol (must be defined before the constructor is invoked).
    this.interactiveSymbol = new InteractiveSymbolNode( countsToChargeProblem.answerAtom, { interactiveCharge: true } );

    ProblemView.call( this, countsToChargeProblem, layoutBounds ); // Call super constructor.
    var thisNode = this;

    // Add the interactive symbol.
    this.interactiveSymbol.scale( 0.75 );
    this.interactiveAnswerNode.addChild( this.interactiveSymbol );

    // Particle counts
    var particleCountsNode = new ParticleCountsNode( countsToChargeProblem.answerAtom );
    this.problemPresentationNode.addChild( particleCountsNode );

    // Layout
    particleCountsNode.centerX = layoutBounds.width * 0.25;
    particleCountsNode.centerY = layoutBounds.height * 0.5;
    this.interactiveSymbol.centerX = layoutBounds.width * 0.75;
    this.interactiveSymbol.centerY = layoutBounds.height * 0.4;
  }

  // Inherit from ProblemView.
  inherit( ProblemView, CountsToSymbolChargeProblemView,
    {
      checkAnswer: function() {
        var userSubmittedAtom = new NumberAtom(
          {
            protonCount: this.interactiveSymbol.protonCount.value,
            neutronCount: this.interactiveSymbol.massNumber.value - this.interactiveSymbol.protonCount.value,
            electronCount: this.interactiveSymbol.protonCount.value - this.interactiveSymbol.charge.value
          } );
        this.problem.checkAnswer( userSubmittedAtom );
      },

      clearAnswer: function() {
        this.interactiveSymbol.reset();
      },

      displayCorrectAnswer: function() {
        this.interactiveSymbol.protonCount.value = this.problem.answerAtom.protonCount;
        this.interactiveSymbol.massNumber.value = this.problem.answerAtom.massNumber;
        this.interactiveSymbol.charge.value = this.problem.answerAtom.charge;
      }
    }
  );

  return CountsToSymbolChargeProblemView;
} );
