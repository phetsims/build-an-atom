// Copyright 2013-2017, University of Colorado Boulder

/**
 * Challenge where the user is presented with a set of counts for protons,
 * neutrons, and electrons, and must determine the mass number.
 *
 * @author John Blanco
 */
define( function( require ) {
  'use strict';

  // modules
  var buildAnAtom = require( 'BUILD_AN_ATOM/buildAnAtom' );
  var ChallengeView = require( 'BUILD_AN_ATOM/game/view/ChallengeView' );
  var inherit = require( 'PHET_CORE/inherit' );
  var MultiLineText = require( 'SCENERY_PHET/MultiLineText' );
  var NumberAtom = require( 'SHRED/model/NumberAtom' );
  var NumberEntryNode = require( 'BUILD_AN_ATOM/game/view/NumberEntryNode' );
  var NumberProperty = require( 'AXON/NumberProperty' );
  var ParticleCountsNode = require( 'BUILD_AN_ATOM/game/view/ParticleCountsNode' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );

  // strings
  var whatIsTheMassNumberString = require( 'string!BUILD_AN_ATOM/whatIsTheMassNumber' );

  /**
   * @param {CountsToMassNumberChallenge} countsToMassNumberChallenge
   * @param {Bounds2} layoutBounds
   * @param {Tandem} tandem
   * @constructor
   */
  function CountsToMassNumberChallengeView( countsToMassNumberChallenge, layoutBounds, tandem ) {

    // Must be defined before call to super constructor.
    this.massNumberAnswerProperty = new NumberProperty( 0, {
      tandem: tandem.createTandem( 'massNumberAnswerProperty' ),
      numberType: 'Integer'
    } );
    ChallengeView.call( this, countsToMassNumberChallenge, layoutBounds, tandem );
    var self = this;

    // Particle counts
    var particleCountsNode = new ParticleCountsNode( countsToMassNumberChallenge.answerAtom );
    self.challengePresentationNode.addChild( particleCountsNode );

    var questionPrompt = new MultiLineText( whatIsTheMassNumberString, {
      align: 'left',
      font: new PhetFont( 24 ),
      maxWidth: 200,
      tandem: tandem.createTandem( 'questionPrompt' )
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

    // @private - called by dispose
    this.disposeCountsToMassNumberChallengeView = function() {
      particleCountsNode.dispose();
      questionPrompt.dispose();
      numberEntryNode.dispose();
      this.massNumberAnswerProperty.dispose();
    };
  }

  buildAnAtom.register( 'CountsToMassNumberChallengeView', CountsToMassNumberChallengeView );

  // Inherit from ChallengeView.
  return inherit( ChallengeView, CountsToMassNumberChallengeView, {

    // @public
    checkAnswer: function() {
      var userSubmittedAnswer = new NumberAtom( {
        protonCount: this.challenge.answerAtom.protonCountProperty.get(),
        neutronCount: this.massNumberAnswerProperty.value - this.challenge.answerAtom.protonCountProperty.get(),
        electronCount: this.challenge.answerAtom.electronCountProperty.get()
      } );
      this.challenge.checkAnswer( userSubmittedAnswer );
    },

    // @public
    displayCorrectAnswer: function() {
      this.massNumberAnswerProperty.value = this.challenge.answerAtom.massNumberProperty.get();
    },

    dispose: function() {
      this.disposeCountsToMassNumberChallengeView();
      ChallengeView.prototype.dispose.call( this );
    }
  } );
} );
