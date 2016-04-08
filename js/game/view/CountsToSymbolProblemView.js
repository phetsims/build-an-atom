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
  var buildAnAtom = require( 'BUILD_AN_ATOM/buildAnAtom' );
  var inherit = require( 'PHET_CORE/inherit' );
  var NumberAtom = require( 'SHRED/model/NumberAtom' );
  var InteractiveSymbolNode = require( 'BUILD_AN_ATOM/game/view/InteractiveSymbolNode' );
  var ParticleCountsNode = require( 'BUILD_AN_ATOM/game/view/ParticleCountsNode' );
  var ProblemView = require( 'BUILD_AN_ATOM/game/view/ProblemView' );

  /**
   * @param {CountsToSymbolProblem} toSymbolProblem
   * @param {Bounds2} layoutBounds
   * @param {Tandem} tandem
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
    particleCountsNode.centerY = layoutBounds.height * 0.48;
    this.interactiveSymbolNode.centerX = layoutBounds.width * 0.745;
    this.interactiveSymbolNode.centerY = layoutBounds.height * 0.54;
  }

  buildAnAtom.register( 'CountsToSymbolProblemView', CountsToSymbolProblemView );

  // Inherit from ProblemView.
  return inherit( ProblemView, CountsToSymbolProblemView, {
      checkAnswer: function() {
        var userSubmittedAtom = new NumberAtom( {
          protonCount: this.interactiveSymbolNode.protonCountProperty.value,
          neutronCount: this.interactiveSymbolNode.massNumberProperty.value - this.interactiveSymbolNode.protonCountProperty.value,
          electronCount: this.interactiveSymbolNode.protonCountProperty.value - this.interactiveSymbolNode.chargeProperty.value
        } );
        this.problem.checkAnswer( userSubmittedAtom );
      },

      displayCorrectAnswer: function() {
        this.interactiveSymbolNode.protonCountProperty.value = this.problem.answerAtom.protonCount;
        this.interactiveSymbolNode.massNumberProperty.value = this.problem.answerAtom.massNumber;
        this.interactiveSymbolNode.chargeProperty.value = this.problem.answerAtom.charge;
      }
    }
  );
} );
