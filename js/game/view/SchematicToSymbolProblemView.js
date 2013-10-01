// Copyright 2002-2013, University of Colorado Boulder

/**
 * Visual representation of a problem where the user is presented with a
 * schematic representation of an atom (which looks much like the atoms
 * constructed on the 1st tab) and has to adjust some or all portions of an
 * interactive chemical symbol to match.
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
  function SchematicToSymbolProblemView( toSymbolProblem, layoutBounds ) {

    // Interactive Symbol (must be defined before the call to the super constructor).
    this.interactiveSymbol = new InteractiveSymbolNode( toSymbolProblem.answerAtom,
      {
        interactiveProtonCount: toSymbolProblem.configurableProtonCount,
        interactiveMassNumber: toSymbolProblem.configurableMassNumber,
        interactiveCharge: toSymbolProblem.configurableCharge
      } );

    ProblemView.call( this, toSymbolProblem, layoutBounds ); // Call super constructor.
    var thisNode = this;

    // Add the interactive symbol.
    this.interactiveSymbol.scale( 0.75 );
    this.interactiveAnswerNode.addChild( this.interactiveSymbol );

    // Create the model-view transform used by the schematic atom.
    var mvt = ModelViewTransform2.createSinglePointScaleInvertedYMapping(
      { x: 0, y: 0 },
      { x: layoutBounds.width * 0.275, y: layoutBounds.height * 0.45 },
      0.8 );

    // Add the schematic representation of the atom.
    var schematicAtomNode = new NonInteractiveSchematicAtomNode( toSymbolProblem.answerAtom, mvt );
    this.problemPresentationNode.addChild( schematicAtomNode );

    // Layout
    schematicAtomNode.centerX = layoutBounds.width * 0.3;
    schematicAtomNode.centerY = layoutBounds.height * 0.4;
    this.interactiveSymbol.centerX = layoutBounds.width * 0.75;
    this.interactiveSymbol.centerY = layoutBounds.height * 0.45;
  }

  // Inherit from ProblemView.
  inherit( ProblemView, SchematicToSymbolProblemView,
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

      clearAnswer: function() {
        this.interactiveSymbol.reset();
      },

      displayCorrectAnswer: function() {
        this.interactiveSymbol.protonCount.value = this.problem.answerAtom.protonCount;
        this.interactiveSymbol.massNumber.value = this.problem.answerAtom.massNumber;
        this.interactiveSymbol.charge.value = this.problem.answerAtom.charge;
      }
    }
  );

  return SchematicToSymbolProblemView;
} );
