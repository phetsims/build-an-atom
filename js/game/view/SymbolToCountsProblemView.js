// Copyright 2013-2016, University of Colorado Boulder

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
  var buildAnAtom = require( 'BUILD_AN_ATOM/buildAnAtom' );
  var inherit = require( 'PHET_CORE/inherit' );
  var InteractiveSymbolNode = require( 'BUILD_AN_ATOM/game/view/InteractiveSymbolNode' );
  var InteractiveParticleCountsNode = require( 'BUILD_AN_ATOM/game/view/InteractiveParticleCountsNode' );
  var ProblemView = require( 'BUILD_AN_ATOM/game/view/ProblemView' );

  /**
   * @param {SymbolToCountsProblem} symbolToCountsProblem
   * @param {Bounds2} layoutBounds
   * @param {Tandem} tandem
   * @constructor
   */
  function SymbolToCountsProblemView( symbolToCountsProblem, layoutBounds, tandem ) {

    // Interactive particle count node - must be defined before call to super constructor.
    this.interactiveParticleCountsNode = new InteractiveParticleCountsNode( tandem );

    // Call super constructor.
    ProblemView.call( this, symbolToCountsProblem, layoutBounds, tandem );

    // Add interactive particle count.
    this.interactiveAnswerNode.addChild( this.interactiveParticleCountsNode );

    // Symbol
    var interactiveSymbolNode = new InteractiveSymbolNode( symbolToCountsProblem.answerAtom, tandem.createTandem( 'interactiveSymbolNode' ) );
    interactiveSymbolNode.scale( 0.75 );
    this.problemPresentationNode.addChild( interactiveSymbolNode );

    // Layout
    interactiveSymbolNode.centerX = layoutBounds.width * 0.25;
    interactiveSymbolNode.centerY = layoutBounds.height * 0.54;
    this.interactiveParticleCountsNode.centerX = layoutBounds.width * 0.75;
    this.interactiveParticleCountsNode.centerY = layoutBounds.height * 0.49;
  }

  buildAnAtom.register( 'SymbolToCountsProblemView', SymbolToCountsProblemView );

  // Inherit from ProblemView.
  return inherit( ProblemView, SymbolToCountsProblemView, {

    // @public
    checkAnswer: function() {
      this.problem.checkAnswer( this.interactiveParticleCountsNode.numberAtom );
    },

    // @public
    displayCorrectAnswer: function() {
      this.interactiveParticleCountsNode.numberAtom.protonCountProperty.set( this.problem.answerAtom.protonCountProperty.get() );
      this.interactiveParticleCountsNode.numberAtom.neutronCountProperty.set( this.problem.answerAtom.neutronCountProperty.get() );
      this.interactiveParticleCountsNode.numberAtom.electronCountProperty.set( this.problem.answerAtom.electronCountProperty.get() );
    }
  } );
} );
