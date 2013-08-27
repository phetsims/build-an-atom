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

  // Imports
  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( 'SCENERY/nodes/Node' );
  var NumberAtom = require( 'common/model/NumberAtom' );
  var InteractiveSymbolNode = require( 'game/view/InteractiveSymbolNode' );
  var InteractiveParticleCountsNode = require( 'game/view/InteractiveParticleCountsNode' );
  var ProblemView = require( 'game/view/ProblemView' );

  /**
   * Main constructor function.
   *
   * @constructor
   */
  function SymbolToCountsProblemView( symbolToCountsProblem, layoutBounds ) {

    // Interactive particle count node - must be defined before call to super constructor.
    this.particleCountsNode = new InteractiveParticleCountsNode();

    // Call super constructor.
    ProblemView.call( this, symbolToCountsProblem, layoutBounds );

    // Add interactive particle count.
    this.interactiveAnswerNode.addChild( this.particleCountsNode );

    // Symbol
    var symbol = new InteractiveSymbolNode( symbolToCountsProblem.answerAtom );
    symbol.scale( 0.75 );
    this.problemPresentationNode.addChild( symbol );

    // Layout
    symbol.centerX = layoutBounds.width * 0.25;
    symbol.centerY = layoutBounds.height * 0.5;
    this.particleCountsNode.centerX = layoutBounds.width * 0.75;
    this.particleCountsNode.centerY = layoutBounds.height * 0.45;
  }

  // Inherit from ProblemView.
  inherit( ProblemView, SymbolToCountsProblemView,
    {
      checkAnswer: function() {

        this.problem.checkAnswer( this.particleCountsNode.numberAtom );
      },

      clearAnswer: function() {
        this.particleCountsNode.numberAtom.reset();
      },

      displayCorrectAnswer: function() {
        this.particleCountsNode.numberAtom.protonCount = this.problem.answerAtom.protonCount;
        this.particleCountsNode.numberAtom.neutronCount = this.problem.answerAtom.neutronCount;
        this.particleCountsNode.numberAtom.electronCount = this.problem.answerAtom.electronCount;
      }
    }
  );

  return SymbolToCountsProblemView;
} );
