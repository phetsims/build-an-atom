// Copyright 2013-2015, University of Colorado Boulder

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

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var ModelViewTransform2 = require( 'PHETCOMMON/view/ModelViewTransform2' );
  var NumberAtom = require( 'SHRED/model/NumberAtom' );
  var InteractiveSymbolNode = require( 'BUILD_AN_ATOM/game/view/InteractiveSymbolNode' );
  var NonInteractiveSchematicAtomNode = require( 'BUILD_AN_ATOM/game/view/NonInteractiveSchematicAtomNode' );
  var ProblemView = require( 'BUILD_AN_ATOM/game/view/ProblemView' );
  var Vector2 = require( 'DOT/Vector2' );

  /**
   * Main constructor function.
   *
   * @constructor
   */
  function SchematicToSymbolProblemView( toSymbolProblem, layoutBounds, tandem ) {

    // Interactive Symbol (must be defined before the call to the super constructor).
    this.interactiveSymbolNode = new InteractiveSymbolNode(
      toSymbolProblem.answerAtom,
      tandem.createTandem( 'interactiveSymbolNode' ), {
        interactiveProtonCount: toSymbolProblem.configurableProtonCount,
        interactiveMassNumber: toSymbolProblem.configurableMassNumber,
        interactiveCharge: toSymbolProblem.configurableCharge
      } );

    ProblemView.call( this, toSymbolProblem, layoutBounds, tandem ); // Call super constructor.

    // Add the interactive symbol.
    this.interactiveSymbolNode.scale( 0.75 );
    this.interactiveAnswerNode.addChild( this.interactiveSymbolNode );

    // Create the model-view transform used by the schematic atom.
    var mvt = ModelViewTransform2.createSinglePointScaleInvertedYMapping(
      Vector2.ZERO,
      new Vector2( layoutBounds.width * 0.275, layoutBounds.height * 0.45 ),
      0.8 );

    // Add the schematic representation of the atom.
    var schematicAtomNode = new NonInteractiveSchematicAtomNode( toSymbolProblem.answerAtom, mvt, tandem.createTandem( 'noninteractiveSchematicAtomNode' ) );
    this.problemPresentationNode.addChild( schematicAtomNode );

    // Layout
    schematicAtomNode.centerX = layoutBounds.width * 0.25;
    schematicAtomNode.centerY = layoutBounds.height * 0.35;
    this.interactiveSymbolNode.centerX = layoutBounds.width * 0.75;
    this.interactiveSymbolNode.centerY = layoutBounds.height * 0.52;
  }

  // Inherit from ProblemView.
  return inherit( ProblemView, SchematicToSymbolProblemView, {
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
