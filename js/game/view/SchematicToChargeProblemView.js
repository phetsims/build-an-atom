// Copyright 2013-2015, University of Colorado Boulder

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
  var buildAnAtom = require( 'BUILD_AN_ATOM/buildAnAtom' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var inherit = require( 'PHET_CORE/inherit' );
  var ModelViewTransform2 = require( 'PHETCOMMON/view/ModelViewTransform2' );
  var MultiLineText = require( 'SCENERY_PHET/MultiLineText' );
  var NonInteractiveSchematicAtomNode = require( 'BUILD_AN_ATOM/game/view/NonInteractiveSchematicAtomNode' );
  var NumberAtom = require( 'SHRED/model/NumberAtom' );
  var NumberEntryNode = require( 'BUILD_AN_ATOM/game/view/NumberEntryNode' );
  var ProblemView = require( 'BUILD_AN_ATOM/game/view/ProblemView' );
  var Property = require( 'AXON/Property' );
  var SharedConstants = require( 'SHRED/SharedConstants' );
  var Vector2 = require( 'DOT/Vector2' );

  // strings
  var whatIsTheTotalChargeString = require( 'string!BUILD_AN_ATOM/whatIsTheTotalCharge' );

  /**
   * Main constructor function.
   *
   * @constructor
   */
  function SchematicToChargeProblemView( schematicToChargeProblem, layoutBounds, tandem ) {

    // Must be defined before call to super constructor.
    this.chargeAnswerProperty = new Property( 0, { tandem: tandem.createTandem( 'chargeAnswerProperty' ) } );
    ProblemView.call( this, schematicToChargeProblem, layoutBounds, tandem ); // Call super constructor.
    var thisNode = this;

    // Create the model-view transform used by the schematic atom.
    var modelViewTransform = ModelViewTransform2.createSinglePointScaleInvertedYMapping(
      Vector2.ZERO,
      new Vector2( layoutBounds.width * 0.275, layoutBounds.height * 0.5 ),
      0.8 );

    // Add the schematic representation of the atom.
    var nonInteractiveSchematicNode = new NonInteractiveSchematicAtomNode( schematicToChargeProblem.answerAtom,
      modelViewTransform,
      tandem.createTandem( 'noninteractiveSchematicAtomNode' ) );
    this.problemPresentationNode.addChild( nonInteractiveSchematicNode );

    // Question
    var questionPrompt = new MultiLineText( whatIsTheTotalChargeString, {
      align: 'left',
      font: new PhetFont( 24 ),
      maxWidth: 200
    } );
    this.interactiveAnswerNode.addChild( questionPrompt );

    // Node for entering the answer
    var chargeEntryNode = new NumberEntryNode(
      thisNode.chargeAnswerProperty,
      tandem.createTandem( 'chargeEntryNode' ), {
        minValue: -99,
        maxValue: 99,
        prependPlusSign: true,
        getTextColor: SharedConstants.CHARGE_TEXT_COLOR
      } );
    thisNode.interactiveAnswerNode.addChild( chargeEntryNode );

    // Layout
    questionPrompt.centerX = layoutBounds.width * 0.65;
    questionPrompt.centerY = layoutBounds.height * 0.5;
    chargeEntryNode.left = questionPrompt.right + 10;
    chargeEntryNode.centerY = questionPrompt.centerY;

    this.schematicToChargeProblemViewDispose = function(){
      nonInteractiveSchematicNode.dispose();
    };
  }

  buildAnAtom.register( 'SchematicToChargeProblemView', SchematicToChargeProblemView );

  // Inherit from ProblemView.
  return inherit( ProblemView, SchematicToChargeProblemView, {
      checkAnswer: function() {
        var userSubmittedAnswer = new NumberAtom( {
          protonCount: this.problem.answerAtom.protonCount,
          neutronCount: this.problem.answerAtom.neutronCount,
          electronCount: this.problem.answerAtom.protonCount - this.chargeAnswerProperty.value
        } );
        this.problem.checkAnswer( userSubmittedAnswer );
      },

      displayCorrectAnswer: function() {
        this.chargeAnswerProperty.value = this.problem.answerAtom.charge;
      },

      dispose: function(){
        this.schematicToChargeProblemViewDispose();
      }
    }
  );
} );
