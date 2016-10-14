// Copyright 2013-2015, University of Colorado Boulder

/**
 * Base type for views of problems where the user is asked to identify the
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
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var inherit = require( 'PHET_CORE/inherit' );
  var LinearGradient = require( 'SCENERY/util/LinearGradient' );
  var Node = require( 'SCENERY/nodes/Node' );
  var NumberAtom = require( 'SHRED/model/NumberAtom' );
  var PeriodicTableNode = require( 'SHRED/view/PeriodicTableNode' );
  var ProblemView = require( 'BUILD_AN_ATOM/game/view/ProblemView' );
  var Property = require( 'AXON/Property' );
  var Text = require( 'SCENERY/nodes/Text' );

  // strings
  var findTheElementString = require( 'string!BUILD_AN_ATOM/findTheElement' );
  var ionString = require( 'string!BUILD_AN_ATOM/ion' );
  var neutralAtomString = require( 'string!BUILD_AN_ATOM/neutralAtom' );
  var isItString = require( 'string!BUILD_AN_ATOM/isIt' );

  // constants
  var TITLE_FONT = new PhetFont( 30 );
  var INSET = 10;
  var CELL_DIMENSION = 25;
  var MAX_WIDTH = 100; // empirically determined for long strings

  /**
   * @param {CountsToElementProblem} countsToElementProblem
   * @param {Bounds2} layoutBounds
   * @param {Tandem} tandem
   * @constructor
   */
  function ToElementProblemView( countsToElementProblem, layoutBounds, tandem ) {
    this.periodicTableAtom = new NumberAtom( { tandem: tandem.createTandem( 'periodicTableAtom' ) } );
    this.neutralOrIonProperty = new Property( 'noSelection', {
      tandem: tandem.createTandem( 'neutralOrIonProperty' )
    } );
    ProblemView.call( this, countsToElementProblem, layoutBounds, tandem ); // Call super constructor.
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

    // Problem title
    var problemTitle = new Text( findTheElementString, {
      font: TITLE_FONT,
      maxWidth: this.periodicTable.width
    } );
    this.problemPresentationNode.addChild( problemTitle );

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

    // unlink from Properties
    this.toElementProblemViewDispose = function() {
      self.neutralOrIonProperty.unlink( updateCheckAnswerButton );
      self.periodicTableAtom.protonCountProperty.unlink( updateNeutralAtomVersusIonQuestionVisibility );
    };

    //--------------------------- Layout -------------------------------------

    this.periodicTable.right = layoutBounds.width - INSET;
    this.periodicTable.centerY = layoutBounds.height * 0.55;

    var maxTitleWidth = this.periodicTable.width * 0.9;
    if ( problemTitle.width > maxTitleWidth ) {
      problemTitle.scale( maxTitleWidth / problemTitle.width );
    }
    problemTitle.centerX = this.periodicTable.centerX;
    problemTitle.bottom = this.periodicTable.top - 30; // Offset empirically determined.

    neutralAtomVersusIonQuestion.centerX = this.periodicTable.centerX;
    neutralAtomVersusIonQuestion.top = this.periodicTable.bottom + 20;
  }

  buildAnAtom.register( 'ToElementProblemView', ToElementProblemView );

  // Inherit from ProblemView.
  return inherit( ProblemView, ToElementProblemView, {

    // @public
    checkAnswer: function() {
      var submittedAtom = new NumberAtom( {
        protonCount: this.periodicTableAtom.protonCountProperty.get(),
        neutronCount: this.problem.answerAtom.neutronCountProperty.get(),
        electronCount: this.problem.answerAtom.electronCountProperty.get()
      } );
      this.problem.checkAnswer( submittedAtom, this.neutralOrIonProperty.value );
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
      this.periodicTableAtom.protonCountProperty.set( this.problem.answerAtom.protonCountProperty.get() );
      this.periodicTableAtom.neutronCountProperty.set( this.problem.answerAtom.neutronCountProperty.get() );
      this.periodicTableAtom.electronCountProperty.set( this.problem.answerAtom.electronCountProperty.get() );
      this.neutralOrIonProperty.value = this.problem.answerAtom.chargeProperty.get() === 0 ? 'neutral' : 'ion';
    },

    // @public
    dispose: function() {
      this.periodicTable.dispose();
      this.toElementProblemViewDispose();
    }
  } );
} );
