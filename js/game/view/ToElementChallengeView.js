// Copyright 2013-2017, University of Colorado Boulder

/**
 * Base type for views of challenges where the user is asked to identify the
 * element on the periodic table and then choose whether it is an ion or a
 * neutral atom.
 *
 * @author John Blanco
 */
define( function( require ) {
  'use strict';

  // modules
  var AquaRadioButton = require( 'SUN/AquaRadioButton' );
  var buildAnAtom = require( 'BUILD_AN_ATOM/buildAnAtom' );
  var ChallengeView = require( 'BUILD_AN_ATOM/game/view/ChallengeView' );
  var inherit = require( 'PHET_CORE/inherit' );
  var LinearGradient = require( 'SCENERY/util/LinearGradient' );
  var Node = require( 'SCENERY/nodes/Node' );
  var NumberAtom = require( 'SHRED/model/NumberAtom' );
  var PeriodicTableNode = require( 'SHRED/view/PeriodicTableNode' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var Property = require( 'AXON/Property' );
  var Text = require( 'SCENERY/nodes/Text' );
  var PropertyIO = require( 'AXON/PropertyIO' );

  // phet-io modules
  var StringIO = require( 'ifphetio!PHET_IO/types/StringIO' );

  // strings
  var findTheElementString = require( 'string!BUILD_AN_ATOM/findTheElement' );
  var ionString = require( 'string!BUILD_AN_ATOM/ion' );
  var isItString = require( 'string!BUILD_AN_ATOM/isIt' );
  var neutralAtomString = require( 'string!BUILD_AN_ATOM/neutralAtom' );

  // constants
  var TITLE_FONT = new PhetFont( 30 );
  var INSET = 10;
  var CELL_DIMENSION = 25;
  var MAX_WIDTH = 100; // empirically determined for long strings

  /**
   * @param {CountsToElementChallenge} countsToElementChallenge
   * @param {Bounds2} layoutBounds
   * @param {Tandem} tandem
   * @constructor
   */
  function ToElementChallengeView( countsToElementChallenge, layoutBounds, tandem ) {
    this.periodicTableAtom = new NumberAtom( { tandem: tandem.createTandem( 'periodicTableAtom' ) } );
    this.neutralOrIonProperty = new Property( 'noSelection', {
      tandem: tandem.createTandem( 'neutralOrIonProperty' ),
      phetioType: PropertyIO( StringIO )
    } );
    ChallengeView.call( this, countsToElementChallenge, layoutBounds, tandem ); // Call super constructor.
    var self = this;

    // Periodic table
    this.periodicTable = new PeriodicTableNode( this.periodicTableAtom, {
      tandem: tandem.createTandem( 'periodicTable' ),
      interactiveMax: 118,
      cellDimension: CELL_DIMENSION,
      enabledCellColor: new LinearGradient( 0, 0, 0, CELL_DIMENSION ).addColorStop( 0, 'white' ).addColorStop( 1, 'rgb( 240, 240, 240 )' ),
      selectedCellColor: 'yellow'
    } );
    this.periodicTable.scale( 0.85 ); // scale value empirically determined
    this.interactiveAnswerNode.addChild( this.periodicTable );

    // Challenge title
    var challengeTitle = new Text( findTheElementString, {
      font: TITLE_FONT,
      maxWidth: this.periodicTable.width
    } );
    this.challengePresentationNode.addChild( challengeTitle );

    // Neutral atom versus ion question.
    var neutralVersusIonPrompt = new Text( isItString, {
      font: new PhetFont( 24 ),
      maxWidth: MAX_WIDTH
    } );
    var neutralAtomRadioButton = new AquaRadioButton( this.neutralOrIonProperty, 'neutral', new Text( neutralAtomString, {
      font: new PhetFont( 18 ),
      maxWidth: MAX_WIDTH
    } ), {
      radius: 8,
      tandem: tandem.createTandem( 'neutralAtomRadioButton' )
    } );
    var ionRadioButton = new AquaRadioButton( this.neutralOrIonProperty, 'ion', new Text( ionString, {
      font: new PhetFont( 18 ),
      maxWidth: MAX_WIDTH
    } ), {
      radius: 8,
      tandem: tandem.createTandem( 'ionRadioButton' )
    } );
    var neutralAtomVersusIonQuestion = new Node();
    neutralAtomVersusIonQuestion.addChild( neutralVersusIonPrompt );
    neutralAtomRadioButton.left = neutralVersusIonPrompt.right + 10;
    neutralAtomRadioButton.centerY = neutralVersusIonPrompt.centerY;
    neutralAtomVersusIonQuestion.addChild( neutralAtomRadioButton );
    ionRadioButton.left = neutralAtomVersusIonQuestion.right + 10;
    ionRadioButton.centerY = neutralVersusIonPrompt.centerY;
    neutralAtomVersusIonQuestion.addChild( ionRadioButton );
    this.interactiveAnswerNode.addChild( neutralAtomVersusIonQuestion );

    var updateNeutralAtomVersusIonQuestionVisibility = function( protonCount ) {
      // Once the user has selected an element, make the ion question visible.
      neutralAtomVersusIonQuestion.visible = protonCount > 0;
    };

    this.periodicTableAtom.protonCountProperty.link( updateNeutralAtomVersusIonQuestionVisibility );

    // Don't enable the "check answer" button until the user has answered the
    // "neutral vs. ion" question.

    var updateCheckAnswerButton = function( neutralOrIon ) {
      self.checkAnswerButton.enabled = neutralOrIon !== 'noSelection';
      self.checkAnswerButton.pickable = neutralOrIon !== 'noSelection';
    };

    this.neutralOrIonProperty.link( updateCheckAnswerButton );

    // @private called by dispose
    this.disposeToElementChallengeView = function() {
      this.periodicTableAtom.dispose();
      this.periodicTable.dispose();
      neutralAtomRadioButton.dispose();
      ionRadioButton.dispose();
      this.neutralOrIonProperty.dispose();
    };

    //--------------------------- Layout -------------------------------------

    this.periodicTable.right = layoutBounds.width - INSET;
    this.periodicTable.centerY = layoutBounds.height * 0.55;

    var maxTitleWidth = this.periodicTable.width * 0.9;
    if ( challengeTitle.width > maxTitleWidth ) {
      challengeTitle.scale( maxTitleWidth / challengeTitle.width );
    }
    challengeTitle.centerX = this.periodicTable.centerX;
    challengeTitle.bottom = this.periodicTable.top - 30; // Offset empirically determined.

    neutralAtomVersusIonQuestion.centerX = this.periodicTable.centerX;
    neutralAtomVersusIonQuestion.top = this.periodicTable.bottom + 20;
  }

  buildAnAtom.register( 'ToElementChallengeView', ToElementChallengeView );

  // Inherit from ChallengeView.
  return inherit( ChallengeView, ToElementChallengeView, {

    // @public
    checkAnswer: function() {
      var submittedAtom = new NumberAtom( {
        protonCount: this.periodicTableAtom.protonCountProperty.get(),
        neutronCount: this.challenge.answerAtom.neutronCountProperty.get(),
        electronCount: this.challenge.answerAtom.electronCountProperty.get()
      } );
      this.challenge.checkAnswer( submittedAtom, this.neutralOrIonProperty.value );
    },

    // @public
    clearAnswer: function() {
      this.periodicTableAtom.protonCountProperty.set( 0 );
      this.periodicTableAtom.neutronCountProperty.set( 0 );
      this.periodicTableAtom.electronCountProperty.set( 0 );
      this.neutralOrIonProperty.reset();
    },

    // @public
    displayCorrectAnswer: function() {
      this.periodicTableAtom.protonCountProperty.set( this.challenge.answerAtom.protonCountProperty.get() );
      this.periodicTableAtom.neutronCountProperty.set( this.challenge.answerAtom.neutronCountProperty.get() );
      this.periodicTableAtom.electronCountProperty.set( this.challenge.answerAtom.electronCountProperty.get() );
      this.neutralOrIonProperty.value = this.challenge.answerAtom.chargeProperty.get() === 0 ? 'neutral' : 'ion';
    },

    // @public
    dispose: function() {
      this.disposeToElementChallengeView();
      ChallengeView.prototype.dispose.call( this );
    }
  } );
} );
