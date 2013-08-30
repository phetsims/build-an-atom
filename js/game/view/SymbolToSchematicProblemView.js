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
  var ModelViewTransform2 = require( 'PHETCOMMON/view/ModelViewTransform2' );
  var Node = require( 'SCENERY/nodes/Node' );
  var NumberAtom = require( 'common/model/NumberAtom' );
  var InteractiveSymbolNode = require( 'game/view/InteractiveSymbolNode' );
  var NonInteractiveSchematicAtomNode = require( 'game/view/NonInteractiveSchematicAtomNode' );
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
      0.8 );

    // Interactive schematic atom node - must be defined before call to super constructor.
    this.interactiveSchematicAtomNode = new NonInteractiveSchematicAtomNode( problem.answerAtom, mvt ); // TODO: Need to make this interactive

    // Call super constructor.
    ProblemView.call( this, problem, layoutBounds );

    // Add interactive schematic atom.
    this.interactiveAnswerNode.addChild( this.interactiveSchematicAtomNode );

    // Symbol
    var symbol = new InteractiveSymbolNode( problem.answerAtom );
    symbol.scale( 0.75 );
    this.problemPresentationNode.addChild( symbol );

    // Layout
    symbol.centerX = layoutBounds.width * 0.25;
    symbol.centerY = layoutBounds.height * 0.5;
    this.interactiveSchematicAtomNode.centerX = layoutBounds.width * 0.75;
    this.interactiveSchematicAtomNode.centerY = layoutBounds.height * 0.45;
  }

  // Inherit from ProblemView.
  inherit( ProblemView, SymbolToSchematicProblemView,
    {
      checkAnswer: function() {
        // TODO - Implement
        return true;
      },

      clearAnswer: function() {
        // TODO - Implement
      },

      displayCorrectAnswer: function() {
        // TODO - Implement
      }
    }
  );

  return SymbolToSchematicProblemView;
} );
