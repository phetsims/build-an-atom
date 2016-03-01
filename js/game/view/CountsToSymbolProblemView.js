// Copyright 2013-2015, University of Colorado Boulder

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
  var NumberAtom = require( 'SHRED/model/NumberAtom' );
  var InteractiveSymbolNode = require( 'BUILD_AN_ATOM/game/view/InteractiveSymbolNode' );
  var ParticleCountsNode = require( 'BUILD_AN_ATOM/game/view/ParticleCountsNode' );
  var ProblemView = require( 'BUILD_AN_ATOM/game/view/ProblemView' );

  /**
   * Main constructor function.
   *
   * @constructor
   */
  function CountsToSymbolProblemView( toSymbolProblem, layoutBounds, tandem ) {

    // Interactive Symbol (must be defined before the super constructor is invoked).
    this.interactiveSymbolNode = new InteractiveSymbolNode(
      toSymbolProblem.answerAtom,
      tandem.createTandem( 'interactiveSymbolNode' ), {
        interactiveProtonCount: toSymbolProblem.configurableProtonCount,
        interactiveMassNumber: toSymbolProblem.configurableMassNumber,
        interactiveCharge: toSymbolProblem.configurableCharge
      }
    );

    ProblemView.call( this, toSymbolProblem, layoutBounds, tandem ); // Call super constructor.

    // Add the interactive symbol.
    this.interactiveSymbolNode.scale( 0.75 );
    this.interactiveAnswerNode.addChild( this.interactiveSymbolNode );

    // Particle counts
    var particleCountsNode = new ParticleCountsNode( toSymbolProblem.answerAtom );
    this.problemPresentationNode.addChild( particleCountsNode );

    // Layout
    particleCountsNode.centerX = layoutBounds.width * 0.3;
    particleCountsNode.centerY = layoutBounds.height * 0.47;
    this.interactiveSymbolNode.centerX = layoutBounds.width * 0.75;
    this.interactiveSymbolNode.centerY = layoutBounds.height * 0.52;
  }

  // Inherit from ProblemView.
  return inherit( ProblemView, CountsToSymbolProblemView, {
      checkAnswer: function() {
        var userSubmittedAtom = new NumberAtom( {
          protonCount: this.interactiveSymbolNode.protonCount.value,
          neutronCount: this.interactiveSymbolNode.massNumber.value - this.interactiveSymbolNode.protonCount.value,
          electronCount: this.interactiveSymbolNode.protonCount.value - this.interactiveSymbolNode.charge.value
        } );
        this.problem.checkAnswer( userSubmittedAtom );
      },

      displayCorrectAnswer: function() {
        this.interactiveSymbolNode.protonCount.value = this.problem.answerAtom.protonCount;
        this.interactiveSymbolNode.massNumber.value = this.problem.answerAtom.massNumber;
        this.interactiveSymbolNode.charge.value = this.problem.answerAtom.charge;
      }
    }
  );
} );
