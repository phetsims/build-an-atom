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

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var NumberAtom = require( 'BUILD_AN_ATOM/common/model/NumberAtom' );
  var InteractiveSymbolNode = require( 'BUILD_AN_ATOM/game/view/InteractiveSymbolNode' );
  var ParticleCountsNode = require( 'BUILD_AN_ATOM/game/view/ParticleCountsNode' );
  var ProblemView = require( 'BUILD_AN_ATOM/game/view/ProblemView' );

  /**
   * Main constructor function.
   *
   * @constructor
   */
  function CountsToSymbolProblemView( toSymbolProblem, layoutBounds ) {

    // Interactive Symbol (must be defined before the super constructor is invoked).
    this.interactiveSymbol = new InteractiveSymbolNode( toSymbolProblem.answerAtom,
      {
        interactiveProtonCount: toSymbolProblem.configurableProtonCount,
        interactiveMassNumber: toSymbolProblem.configurableMassNumber,
        interactiveCharge: toSymbolProblem.configurableCharge
      } );

    ProblemView.call( this, toSymbolProblem, layoutBounds ); // Call super constructor.

    // Add the interactive symbol.
    this.interactiveSymbol.scale( 0.75 );
    this.interactiveAnswerNode.addChild( this.interactiveSymbol );

    // Particle counts
    var particleCountsNode = new ParticleCountsNode( toSymbolProblem.answerAtom );
    this.problemPresentationNode.addChild( particleCountsNode );

    // Layout
    particleCountsNode.centerX = layoutBounds.width * 0.3;
    particleCountsNode.centerY = layoutBounds.height * 0.40;
    this.interactiveSymbol.centerX = layoutBounds.width * 0.75;
    this.interactiveSymbol.centerY = layoutBounds.height * 0.45;
  }

  // Inherit from ProblemView.
  return inherit( ProblemView, CountsToSymbolProblemView,
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

      displayCorrectAnswer: function() {
        this.interactiveSymbol.protonCount.value = this.problem.answerAtom.protonCount;
        this.interactiveSymbol.massNumber.value = this.problem.answerAtom.massNumber;
        this.interactiveSymbol.charge.value = this.problem.answerAtom.charge;
      }
    }
  );
} );
