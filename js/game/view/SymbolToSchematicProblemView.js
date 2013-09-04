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
  var InteractiveSchematicAtom = require( 'common/view/InteractiveSchematicAtom' );
  var InteractiveSymbolNode = require( 'game/view/InteractiveSymbolNode' );
  var ModelViewTransform2 = require( 'PHETCOMMON/view/ModelViewTransform2' );
  var Node = require( 'SCENERY/nodes/Node' );
  var NumberAtom = require( 'common/model/NumberAtom' );
  var ProblemView = require( 'game/view/ProblemView' );

  /**
   * Main constructor function.
   *
   * @constructor
   */
  function SymbolToSchematicProblemView( problem, layoutBounds ) {

    // Create the model-view transform used by the schematic atom.
    var mvt = ModelViewTransform2.createSinglePointScaleInvertedYMapping(
      { x: 0, y: 0 },
      { x: layoutBounds.width * 0.275, y: layoutBounds.height * 0.45 },
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
  inherit( ProblemView, SymbolToSchematicProblemView,
    {
      checkAnswer: function() {
        this.problem.checkAnswer( this.problem.buildAnAtomModel.numberAtom );
      },

      clearAnswer: function() {
        this.problem.buildAnAtomModel.reset();
      },

      displayCorrectAnswer: function() {
        this.problem.buildAnAtomModel.setAtomConfiguration( this.problem.answerAtom );
      }
    }
  );

  return SymbolToSchematicProblemView;
} );
