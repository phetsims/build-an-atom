// Copyright 2002-2013, University of Colorado Boulder

/**
 * View for game problems where the user is presented with a chemical symbol
 * including atomic number, mass number, and charge, and needs to determine
 * the number of protons, neutrons, and electrons that comprise the atom.
 *
 * @author John Blanco
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var InteractiveSymbolNode = require( 'BUILD_AN_ATOM/game/view/InteractiveSymbolNode' );
  var InteractiveParticleCountsNode = require( 'BUILD_AN_ATOM/game/view/InteractiveParticleCountsNode' );
  var ProblemView = require( 'BUILD_AN_ATOM/game/view/ProblemView' );

  /**
   * Main constructor function.
   *
   * @constructor
   */
  function SymbolToCountsProblemView( symbolToCountsProblem, layoutBounds ) {

    // Interactive particle count node - must be defined before call to super constructor.
    this.interactiveParticleCountsNode = new InteractiveParticleCountsNode();

    // Call super constructor.
    ProblemView.call( this, symbolToCountsProblem, layoutBounds );

    // Add interactive particle count.
    this.interactiveAnswerNode.addChild( this.interactiveParticleCountsNode );

    // Symbol
    var symbol = new InteractiveSymbolNode( symbolToCountsProblem.answerAtom );
    symbol.scale( 0.75 );
    this.problemPresentationNode.addChild( symbol );

    // Layout
    symbol.centerX = layoutBounds.width * 0.25;
    symbol.centerY = layoutBounds.height * 0.5;
    this.interactiveParticleCountsNode.centerX = layoutBounds.width * 0.75;
    this.interactiveParticleCountsNode.centerY = layoutBounds.height * 0.45;
  }

  // Inherit from ProblemView.
  return inherit( ProblemView, SymbolToCountsProblemView,
    {
      checkAnswer: function() {
        this.problem.checkAnswer( this.interactiveParticleCountsNode.numberAtom );
      },

      displayCorrectAnswer: function() {
        this.interactiveParticleCountsNode.numberAtom.protonCount = this.problem.answerAtom.protonCount;
        this.interactiveParticleCountsNode.numberAtom.neutronCount = this.problem.answerAtom.neutronCount;
        this.interactiveParticleCountsNode.numberAtom.electronCount = this.problem.answerAtom.electronCount;
      }
    }
  );
} );
