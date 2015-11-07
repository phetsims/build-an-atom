// Copyright 2013-2015, University of Colorado Boulder

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
  var InteractiveSchematicAtom = require( 'BUILD_AN_ATOM/common/view/InteractiveSchematicAtom' );
  var InteractiveSymbolNode = require( 'BUILD_AN_ATOM/game/view/InteractiveSymbolNode' );
  var ModelViewTransform2 = require( 'PHETCOMMON/view/ModelViewTransform2' );
  var ProblemView = require( 'BUILD_AN_ATOM/game/view/ProblemView' );
  var Vector2 = require( 'DOT/Vector2' );

  /**
   * Main constructor function.
   *
   * @constructor
   */
  function SymbolToSchematicProblemView( problem, layoutBounds ) {

    // Create the model-view transform used by the schematic atom.
    var mvt = ModelViewTransform2.createSinglePointScaleInvertedYMapping(
      Vector2.ZERO,
      new Vector2( layoutBounds.width * 0.275, layoutBounds.height * 0.45 ),
      0.75 );

    // Interactive schematic atom node - must be defined before call to super constructor.
    this.interactiveSchematicAtom = new InteractiveSchematicAtom( problem.buildAnAtomModel, mvt );

    // Call super constructor.
    ProblemView.call( this, problem, layoutBounds );

    // Add interactive schematic atom.
    this.interactiveAnswerNode.addChild( this.interactiveSchematicAtom );

    // Symbol
    var symbol = new InteractiveSymbolNode( problem.answerAtom );
    symbol.scale( 0.75 );
    this.problemPresentationNode.addChild( symbol );

    // Layout
    symbol.centerX = layoutBounds.width * 0.25;
    symbol.centerY = layoutBounds.height * 0.45;
    this.interactiveSchematicAtom.centerX = layoutBounds.width * 0.75;
    this.interactiveSchematicAtom.centerY = layoutBounds.height * 0.4;
  }

  // Inherit from ProblemView.
  return inherit( ProblemView, SymbolToSchematicProblemView,
    {
      checkAnswer: function() {
        this.problem.checkAnswer( this.problem.buildAnAtomModel.numberAtom );
      },

      displayCorrectAnswer: function() {
        this.problem.buildAnAtomModel.setAtomConfiguration( this.problem.answerAtom );
      }
    }
  );
} );
