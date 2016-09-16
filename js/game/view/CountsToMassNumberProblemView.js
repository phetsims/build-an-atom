// Copyright 2013-2015, University of Colorado Boulder

/**
 * Problem where the user is presented with a set of counts for protons,
 * neutrons, and electrons, and must determine the mass number.
 *
 * @author John Blanco
 */
define( function( require ) {
  'use strict';

  // modules
  var buildAnAtom = require( 'BUILD_AN_ATOM/buildAnAtom' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var inherit = require( 'PHET_CORE/inherit' );
  var MultiLineText = require( 'SCENERY_PHET/MultiLineText' );
  var NumberAtom = require( 'SHRED/model/NumberAtom' );
  var NumberEntryNode = require( 'BUILD_AN_ATOM/game/view/NumberEntryNode' );
  var ParticleCountsNode = require( 'BUILD_AN_ATOM/game/view/ParticleCountsNode' );
  var ProblemView = require( 'BUILD_AN_ATOM/game/view/ProblemView' );
  var Property = require( 'AXON/Property' );

  // strings
  var whatIsTheMassNumberString = require( 'string!BUILD_AN_ATOM/whatIsTheMassNumber' );

  /**
   * @param {CountsToMassNumberProblem} countsToMassNumberProblem
   * @param {Bounds2} layoutBounds
   * @param {Tandem} tandem
   * @constructor
   */
  function CountsToMassNumberProblemView( countsToMassNumberProblem, layoutBounds, tandem ) {

    // Must be defined before call to super constructor.
    this.massNumberAnswerProperty = new Property( 0, {
      tandem: tandem.createTandem( 'massNumberAnswerProperty' )
    } );
    ProblemView.call( this, countsToMassNumberProblem, layoutBounds, tandem ); // Call super constructor.
    var self = this;

    // Particle counts
    var particleCountsNode = new ParticleCountsNode( countsToMassNumberProblem.answerAtom );
    self.problemPresentationNode.addChild( particleCountsNode );

    var questionPrompt = new MultiLineText( whatIsTheMassNumberString, {
      align: 'left',
      font: new PhetFont( 24 ),
      maxWidth: 200
    } );
    self.interactiveAnswerNode.addChild( questionPrompt );

    // Node for entering the answer
    var numberEntryNode = new NumberEntryNode(
      self.massNumberAnswerProperty,
      tandem.createTandem( 'numberEntryNode' ), {
        minValue: 0,
        maxValue: 99
      } );
    self.interactiveAnswerNode.addChild( numberEntryNode );

    // Layout
    particleCountsNode.centerX = layoutBounds.width * 0.3;
    particleCountsNode.centerY = layoutBounds.height * 0.5;
    questionPrompt.centerX = layoutBounds.width * 0.65;
    questionPrompt.centerY = layoutBounds.height * 0.5;
    numberEntryNode.left = questionPrompt.right + 10;
    numberEntryNode.centerY = questionPrompt.centerY;
  }

  buildAnAtom.register( 'CountsToMassNumberProblemView', CountsToMassNumberProblemView );

  // Inherit from ProblemView.
  return inherit( ProblemView, CountsToMassNumberProblemView, {

    // @public
    checkAnswer: function() {
      var userSubmittedAnswer = new NumberAtom( {
        protonCount: this.problem.answerAtom.protonCount,
        neutronCount: this.massNumberAnswerProperty.value - this.problem.answerAtom.protonCount,
        electronCount: this.problem.answerAtom.electronCount
      } );
      this.problem.checkAnswer( userSubmittedAnswer );
    },

    // @public
    displayCorrectAnswer: function() {
      this.massNumberAnswerProperty.value = this.problem.answerAtom.massNumber;
    }
  } );
} );
