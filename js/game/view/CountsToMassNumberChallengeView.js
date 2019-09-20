// Copyright 2013-2019, University of Colorado Boulder

/**
 * Challenge where the user is presented with a set of counts for protons,
 * neutrons, and electrons, and must determine the mass number.
 *
 * @author John Blanco
 */
define( require => {
  'use strict';

  // modules
  const buildAnAtom = require( 'BUILD_AN_ATOM/buildAnAtom' );
  const ChallengeView = require( 'BUILD_AN_ATOM/game/view/ChallengeView' );
  const inherit = require( 'PHET_CORE/inherit' );
  const MultiLineText = require( 'SCENERY_PHET/MultiLineText' );
  const NumberAtom = require( 'SHRED/model/NumberAtom' );
  const NumberEntryNode = require( 'BUILD_AN_ATOM/game/view/NumberEntryNode' );
  const NumberProperty = require( 'AXON/NumberProperty' );
  const ParticleCountsNode = require( 'BUILD_AN_ATOM/game/view/ParticleCountsNode' );
  const PhetFont = require( 'SCENERY_PHET/PhetFont' );

  // strings
  const whatIsTheMassNumberString = require( 'string!BUILD_AN_ATOM/whatIsTheMassNumber' );

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
    const self = this;

    // Particle counts
    const particleCountsNode = new ParticleCountsNode( countsToMassNumberChallenge.answerAtom );
    self.challengePresentationNode.addChild( particleCountsNode );

    const questionPrompt = new MultiLineText( whatIsTheMassNumberString, {
      align: 'left',
      font: new PhetFont( 24 ),
      maxWidth: 200,
      tandem: tandem.createTandem( 'questionPrompt' )
    } );
    self.interactiveAnswerNode.addChild( questionPrompt );

    // Node for entering the answer
    const numberEntryNode = new NumberEntryNode(
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
      const userSubmittedAnswer = new NumberAtom( {
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
