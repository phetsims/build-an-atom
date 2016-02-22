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
   * Main constructor
   *
   * @param countsToElementProblem
   * @param layoutBounds
   * @param {Tandem} tandem
   * @constructor
   */
  function ToElementProblemView( countsToElementProblem, layoutBounds, tandem ) {
    this.periodicTableAtom = new NumberAtom( { tandem: tandem.createTandem( 'periodicTableAtom' ) } );
    this.neutralOrIon = new Property( 'noSelection', {
      tandem: tandem.createTandem( 'neutralOrIonProperty' )
    } );
    ProblemView.call( this, countsToElementProblem, layoutBounds, tandem ); // Call super constructor.
    var thisNode = this;

    // Periodic table
    this.periodicTable = new PeriodicTableNode( this.periodicTableAtom, {
      tandem: tandem.createTandem( 'periodicTable' ),
      interactiveMax: 118,
      cellDimension: CELL_DIMENSION,
      enabledCellColor: new LinearGradient( 0, 0, 0, CELL_DIMENSION ).addColorStop( 0, 'white' ).addColorStop( 1, 'rgb( 240, 240, 240 )' ),
      selectedCellColor: 'yellow'
    } );
    this.periodicTable.scale( 0.85 );
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
    var neutralAtomRadioButton = new AquaRadioButton( this.neutralOrIon, 'neutral', new Text( neutralAtomString, {
      font: new PhetFont( 18 ),
      maxWidth: MAX_WIDTH
    } ), {
      radius: 8,
      tandem: tandem.createTandem( 'neutralAtomRadioButton' )
    } );
    var ionRadioButton = new AquaRadioButton( this.neutralOrIon, 'ion', new Text( ionString, {
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

    this.periodicTableAtom.protonCountProperty.link( function( protonCount ) {
      // Once the user has selected an element, make the ion question visible.
      neutralAtomVersusIonQuestion.visible = protonCount > 0;
    } );

    // Don't enable the "check answer" button until the user has answered the
    // "neutral vs. ion" question.
    this.neutralOrIon.link( function( neutralOrIon ) {
      thisNode.checkAnswerButton.enabled = neutralOrIon !== 'noSelection';
      thisNode.checkAnswerButton.pickable = neutralOrIon !== 'noSelection';
    } );

    //--------------------------- Layout -------------------------------------

    this.periodicTable.right = layoutBounds.width - INSET;
    this.periodicTable.centerY = layoutBounds.height / 2;

    var maxTitleWidth = this.periodicTable.width * 0.9;
    if ( problemTitle.width > maxTitleWidth ) {
      problemTitle.scale( maxTitleWidth / problemTitle.width );
    }
    problemTitle.centerX = this.periodicTable.centerX;
    problemTitle.bottom = this.periodicTable.top - 30; // Offset empirically determined.

    neutralAtomVersusIonQuestion.centerX = this.periodicTable.centerX;
    neutralAtomVersusIonQuestion.top = this.periodicTable.bottom + 20;

    this.setButtonCenter( this.periodicTable.centerX, neutralAtomVersusIonQuestion.bottom + 40 );
  }

  // Inherit from ProblemView.
  return inherit( ProblemView, ToElementProblemView, {
    checkAnswer: function() {
      var submittedAtom = new NumberAtom( {
        protonCount: this.periodicTableAtom.protonCount,
        neutronCount: this.problem.answerAtom.neutronCount,
        electronCount: this.problem.answerAtom.electronCount
      } );
      this.problem.checkAnswer( submittedAtom, this.neutralOrIon.value );
    },
    clearAnswer: function() {
      this.periodicTableAtom.protonCount = 0;
      this.periodicTableAtom.neutronCount = 0;
      this.periodicTableAtom.electronCount = 0;
      this.neutralOrIon.reset();
    },
    displayCorrectAnswer: function() {
      this.periodicTableAtom.protonCount = this.problem.answerAtom.protonCount;
      this.periodicTableAtom.neutronCount = this.problem.answerAtom.neutronCount;
      this.periodicTableAtom.electronCount = this.problem.answerAtom.electronCount;
      this.neutralOrIon.value = this.problem.answerAtom.charge === 0 ? 'neutral' : 'ion';
    }
  } );
} );
