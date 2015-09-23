// Copyright 2002-2013, University of Colorado Boulder

/**
 * Visual representation of a problem where the user is presented with a
 * schematic representation of an atom (which looks much like the atoms
 * constructed on the 1st tab), and must determine that atom's charge.
 *
 * @author John Blanco
 */
define( function( require ) {
  'use strict';

  // modules
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var inherit = require( 'PHET_CORE/inherit' );
  var ModelViewTransform2 = require( 'PHETCOMMON/view/ModelViewTransform2' );
  var MultiLineText = require( 'SCENERY_PHET/MultiLineText' );
  var NonInteractiveSchematicAtomNode = require( 'BUILD_AN_ATOM/game/view/NonInteractiveSchematicAtomNode' );
  var NumberAtom = require( 'BUILD_AN_ATOM/common/model/NumberAtom' );
  var NumberEntryNode = require( 'BUILD_AN_ATOM/game/view/NumberEntryNode' );
  var ProblemView = require( 'BUILD_AN_ATOM/game/view/ProblemView' );
  var Property = require( 'AXON/Property' );
  var SharedConstants = require( 'BUILD_AN_ATOM/common/SharedConstants' );
  var Vector2 = require( 'DOT/Vector2' );

  // strings
  var whatIsTheTotalChargeString = require( 'string!BUILD_AN_ATOM/game.whatIsTheTotalChargeBr' );

  /**
   * Main constructor function.
   *
   * @constructor
   */
  function SchematicToChargeProblemView( schematicToChargeProblem, layoutBounds ) {

    this.chargeAnswer = new Property( 0 ); // Must be defined before call to super constructor.
    ProblemView.call( this, schematicToChargeProblem, layoutBounds ); // Call super constructor.
    var thisNode = this;

    // Create the model-view transform used by the schematic atom.
    var mvt = ModelViewTransform2.createSinglePointScaleInvertedYMapping(
      Vector2.ZERO,
      new Vector2( layoutBounds.width * 0.275, layoutBounds.height * 0.45 ),
      0.8 );

    // Add the schematic representation of the atom.
    this.problemPresentationNode.addChild( new NonInteractiveSchematicAtomNode( schematicToChargeProblem.answerAtom, mvt ) );

    // Question
    var questionPrompt = new MultiLineText( whatIsTheTotalChargeString, { align: 'left', font: new PhetFont( 24 ) } );
    this.interactiveAnswerNode.addChild( questionPrompt );

    // Node for entering the answer
    var numberEntryNode = new NumberEntryNode( thisNode.chargeAnswer,
      {
        minValue: -99,
        maxValue: 99,
        prependPlusSign: true,
        getTextColor: SharedConstants.CHARGE_TEXT_COLOR
      } );
    thisNode.interactiveAnswerNode.addChild( numberEntryNode );

    // Layout
    questionPrompt.centerX = layoutBounds.width * 0.65;
    questionPrompt.centerY = layoutBounds.height * 0.5;
    numberEntryNode.left = questionPrompt.right + 10;
    numberEntryNode.centerY = questionPrompt.centerY;
  }

  // Inherit from ProblemView.
  return inherit( ProblemView, SchematicToChargeProblemView,
    {
      checkAnswer: function() {
        var userSubmittedAnswer = new NumberAtom(
          {
            protonCount: this.problem.answerAtom.protonCount,
            neutronCount: this.problem.answerAtom.neutronCount,
            electronCount: this.problem.answerAtom.protonCount - this.chargeAnswer.value
          } );
        this.problem.checkAnswer( userSubmittedAnswer );
      },

      displayCorrectAnswer: function() {
        this.chargeAnswer.value = this.problem.answerAtom.charge;
      }
    }
  );
} );
