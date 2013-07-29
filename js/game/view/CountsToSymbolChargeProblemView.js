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
  function CountsToChargeProblemView( countsToChargeProblem, layoutBounds ) {

    this.userSubmittedAtom = new NumberAtom(); // Must create before call to super constructor.

    ProblemView.call( this, countsToChargeProblem, layoutBounds ); // Call super constructor.
    var thisNode = this;

    // Particle counts
    var particleCountsNode = new ParticleCountsNode( countsToChargeProblem.answerAtom );
    this.problemPresentationNode.addChild( particleCountsNode );

    // Interactive Symbol
//    var interactiveSymbol = new InteractiveSymbolNode( this.userSubmittedAtom, { interactiveProtonCount: true } );
    var interactiveSymbol = new InteractiveSymbolNode( this.userSubmittedAtom );
    interactiveSymbol.scale( 0.75 );

//    var Rectangle = require( 'SCENERY/nodes/Rectangle' );
//    var interactiveSymbol = new Rectangle( 0, 0, 100, 100, 5, 5, { fill: 'pink'});
    this.interactiveAnswerNode.addChild( interactiveSymbol );

    // Layout
    particleCountsNode.centerX = layoutBounds.width * 0.25;
    particleCountsNode.centerY = layoutBounds.height * 0.5;
    interactiveSymbol.centerX = layoutBounds.width * 0.75;
    interactiveSymbol.centerY = layoutBounds.height * 0.5;
  }

  // Inherit from ProblemView.
  inherit( ProblemView, CountsToChargeProblemView,
    {
      checkAnswer: function() {
        this.problem.checkAnswer( this.userSubmittedAtom );
      },

      clearAnswer: function() {
        this.userSubmittedAtom.reset();
      },

      displayCorrectAnswer: function() {
        this.userSubmittedAtom.protonCount = this.problem.answerAtom.protonCount;
        this.userSubmittedAtom.neutronCount = this.problem.answerAtom.neutronCount;
        this.userSubmittedAtom.electronCount = this.problem.answerAtom.electronCount;
      }
    }
  );

  return CountsToChargeProblemView;
} );
