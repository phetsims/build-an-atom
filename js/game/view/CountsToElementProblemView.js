// Copyright 2002-2013, University of Colorado Boulder

/**
 * Problem where the user is presented with a set of counts for protons,
 * neutrons, and electrons, and must find the represented element on a
 * periodic table.
 *
 * @author John Blanco
 */
define( function( require ) {
  "use strict";

  // Imports
  var assert = require( "ASSERT/assert" )( "build-an-atom" );
  var BAAFont = require( 'common/view/BAAFont' );
  var Button = require( 'SUN/Button' );
  var FaceNode = require( 'SCENERY_PHET/FaceNode' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( 'SCENERY/nodes/Node' );
  var NumberAtom = require( 'common/model/NumberAtom' );
  var PeriodicTableNode = require( 'common/view/PeriodicTableNode' );
  var Property = require( 'AXON/Property' );
  var AquaRadioButton = require( "SUN/AquaRadioButton" );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var Text = require( 'SCENERY/nodes/Text' );

  // Constants
  var TITLE_FONT = new BAAFont( 30 );
  var PARTICLE_COUNTS_FONT = new BAAFont( 24 );
  var BUTTON_FONT = new BAAFont( 20 );
  var BUTTON_FILL = 'rgb( 0, 255, 153 )';
  var INSET = 10;

  /**
   * Main constructor function.
   *
   * @constructor
   */
  function CountsToElementProblemView( countsToElementProblem, layoutBounds ) {
    Node.call( this ); // Call super constructor.
    var thisNode = this;

    // Layout assumes that bounds start at (0,0), so verify that this is true.
    assert && assert( layoutBounds.minX === 0 && layoutBounds.minY === 0 );

    //--------------- Creation and addition of nodes -------------------------

    // Particle counts
    var protonCountTitle = new Text( "Protons:", PARTICLE_COUNTS_FONT );
    this.addChild( protonCountTitle );
    var protonCountText = new Text( countsToElementProblem.answerAtom.protonCount, PARTICLE_COUNTS_FONT );
    this.addChild( protonCountText );
    var neutronCountTitle = new Text( "Neutrons:", PARTICLE_COUNTS_FONT );
    this.addChild( neutronCountTitle );
    var neutronCountText = new Text( countsToElementProblem.answerAtom.neutronCount, PARTICLE_COUNTS_FONT );
    this.addChild( neutronCountText );
    var electronCountTitle = new Text( "Electrons:", PARTICLE_COUNTS_FONT );
    this.addChild( electronCountTitle );
    var electronCountText = new Text( countsToElementProblem.answerAtom.electronCount, PARTICLE_COUNTS_FONT );
    this.addChild( electronCountText );

    // Problem title
    var problemTitle = new Text( "Find the element:", { font: TITLE_FONT } ); // TODO: i18n
    this.addChild( problemTitle );

    // Periodic table
    var periodicTableAtom = new NumberAtom();
    var periodicTable = new PeriodicTableNode( periodicTableAtom, 100 );
    periodicTable.scale( 0.85 );
    this.addChild( periodicTable );

    // Neutral atom versus ion question. TODO i18n of this section.
    var neutralOrIon = new Property( 'noSelection' );
    var neutralVersusIonPrompt = new Text( "Is it:", { font: new BAAFont( 24 )} );
    var neutralAtomButton = new AquaRadioButton( neutralOrIon, 'neutral', new Text( "Neutral Atom", {font: new BAAFont( 18 )} ), { radius: 8 } );
    var ionButton = new AquaRadioButton( neutralOrIon, 'ion', new Text( "Ion", {font: new BAAFont( 18 )} ), { radius: 8 } );
    var neutralAtomVersusIonQuestion = new Node();
    neutralAtomVersusIonQuestion.addChild( neutralVersusIonPrompt );
    neutralAtomButton.left = neutralVersusIonPrompt.right + 10;
    neutralAtomButton.centerY = neutralVersusIonPrompt.centerY;
    neutralAtomVersusIonQuestion.addChild( neutralAtomButton );
    ionButton.left = neutralAtomVersusIonQuestion.right + 10;
    ionButton.centerY = neutralVersusIonPrompt.centerY;
    neutralAtomVersusIonQuestion.addChild( ionButton );
    this.addChild( neutralAtomVersusIonQuestion );

    // Face node used to signal correct/incorrect answers.
    var faceNode = new FaceNode( layoutBounds.width * 0.4, { visible: false, opacity: 0.75 } );
    this.addChild( faceNode );

    // Buttons. TODO: i18n of all buttons.
    var checkAnswerButton = new Button( new Text( "Check", {font: BUTTON_FONT} ),
                                        function() { countsToElementProblem.checkAnswer( periodicTableAtom, neutralOrIon.value ) },
                                        { fill: BUTTON_FILL } );
    this.addChild( checkAnswerButton );

    var nextButton = new Button( new Text( "Next", {font: BUTTON_FONT} ),
                                 function() {countsToElementProblem.next()},
                                 { fill: BUTTON_FILL } );
    this.addChild( nextButton );

    var tryAgainButton = new Button( new Text( "Try Again", {font: BUTTON_FONT} ),
                                     function() { countsToElementProblem.tryAgain()},
                                     { fill: BUTTON_FILL } );
    this.addChild( tryAgainButton );

    var displayCorrectAnswerButton = new Button( new Text( "Display Correct Answer", {font: BUTTON_FONT} ),
                                                 function() { countsToElementProblem.displayCorrectAnswer() },
                                                 { fill: BUTTON_FILL } );
    this.addChild( displayCorrectAnswerButton );

    //-------------------- Dynamic behavior -----------------------------------

    periodicTableAtom.protonCountProperty.link( function( protonCount ) {
      // Once the user has selected an element, make the ion question visible.
      neutralAtomVersusIonQuestion.visible = protonCount > 0;
    } );

    // Utility function to hide the buttons and the feedback face.
    var hideButtonsAndFace = function hideButtonsAndFace() {
      checkAnswerButton.visible = false;
      nextButton.visible = false;
      tryAgainButton.visible = false;
      displayCorrectAnswerButton.visible = false;
      faceNode.visible = false;
    }
    hideButtonsAndFace();

    // Utility function to enable/disable interaction with answer portion of
    // the displayed problem.
    var setAnswerNodeInteractive = function( interactive ) {
      // TODO: This doesn't seem to work, figure out why and fix.
      periodicTable.pickable = interactive;
      neutralAtomVersusIonQuestion.pickable = interactive;
    }

    // Function to clear the user's answer, generally used when giving the
    // user another change to answer.
    var clearAnswer = function(){
      periodicTableAtom.protonCount = 0;
      periodicTableAtom.neutronCount = 0;
      periodicTableAtom.electronCount = 0;
      neutralOrIon.reset();
    }

    // State change handlers.
    var stateChangeHandlers = {
      presentingProblem: function(){
        clearAnswer();
        setAnswerNodeInteractive( true );
        checkAnswerButton.visible = true;
      },
      problemSolvedCorrectly: function(){
        setAnswerNodeInteractive( true );
        faceNode.smile();
        faceNode.visible = true;
        nextButton.visible = true;
      },
      presentingTryAgain: function(){
        setAnswerNodeInteractive( false );
        faceNode.frown();
        faceNode.visible = true;
        tryAgainButton.visible = true;
      },
      attemptsExhausted: function(){
        setAnswerNodeInteractive( false );
        displayCorrectAnswerButton.visible = true;
        faceNode.frown();
        faceNode.visible = true;
      },
      displayingCorrectAnswer: function(){
        setAnswerNodeInteractive( false );
        nextButton.visible = true;
        periodicTableAtom.protonCount = countsToElementProblem.answerAtom.protonCount;
        if ( countsToElementProblem.answerAtom.charge === 0 ){
          neutralOrIon.value = 'neutral';
        }
        else{
          neutralOrIon.value = 'ion';
        }
      }
    }

    // Update the appearance of the problem as the state changes.
    countsToElementProblem.problemStateProperty.link( function( problemState ) {
      console.log( 'Problem state changed, new state = ' + problemState );
      hideButtonsAndFace();
      if ( stateChangeHandlers[ problemState ] !== undefined ){
        stateChangeHandlers[ problemState ]();
      }
    } );

    neutralOrIon.link( function( neutralOrIon ) {
      checkAnswerButton.enabled = neutralOrIon !== 'noSelection';
      checkAnswerButton.pickable = neutralOrIon !== 'noSelection';
    } );

    //-------------------- Layout --------------------------------------------

    periodicTable.right = layoutBounds.width - INSET;
    periodicTable.centerY = layoutBounds.height / 2;

    var maxTitleWidth = periodicTable.width * 0.9;
    if ( problemTitle.width > maxTitleWidth ) {
      problemTitle.scale( maxTitleWidth / problemTitle.width );
    }
    problemTitle.centerX = periodicTable.centerX;
    problemTitle.bottom = periodicTable.top - 30; // Offset empirically determined.

    var countIndicatorRightEdge = layoutBounds.width * 0.35; // Controls horizontal position of count indicators, adjust as needed.
    protonCountText.right = countIndicatorRightEdge;
    neutronCountText.right = protonCountText.right;
    electronCountText.right = protonCountText.right;
    protonCountText.centerY = periodicTable.top + periodicTable.height * 0.25;
    neutronCountText.centerY = periodicTable.centerY;
    electronCountText.centerY = periodicTable.top + periodicTable.height * 0.75;
    var maxNumberWidth = new Text( "99", { font: PARTICLE_COUNTS_FONT } ).width;
    var maxParticleLabelWidth = Math.max( Math.max( protonCountTitle.width, neutronCountTitle.width ), electronCountTitle.width );
    var countTitleLeftEdge = countIndicatorRightEdge - maxNumberWidth - maxParticleLabelWidth - 10;
    protonCountTitle.left = countTitleLeftEdge;
    neutronCountTitle.left = countTitleLeftEdge;
    electronCountTitle.left = countTitleLeftEdge;
    protonCountTitle.centerY = protonCountText.centerY;
    neutronCountTitle.centerY = neutronCountText.centerY;
    electronCountTitle.centerY = electronCountText.centerY;

    neutralAtomVersusIonQuestion.centerX = periodicTable.centerX;
    neutralAtomVersusIonQuestion.top = periodicTable.bottom + 20;

    checkAnswerButton.centerX = periodicTable.centerX;
    checkAnswerButton.top = neutralAtomVersusIonQuestion.bottom + 20;
    nextButton.centerX = checkAnswerButton.centerX;
    nextButton.centerY = checkAnswerButton.centerY;
    tryAgainButton.centerX = checkAnswerButton.centerX;
    tryAgainButton.centerY = checkAnswerButton.centerY;
    displayCorrectAnswerButton.centerX = checkAnswerButton.centerX;
    displayCorrectAnswerButton.centerY = checkAnswerButton.centerY;

    faceNode.centerX = layoutBounds.width / 2;
    faceNode.centerY = layoutBounds.height / 2;

  }

  // Inherit from Node.
  inherit( Node, CountsToElementProblemView );

  return CountsToElementProblemView;
} );
