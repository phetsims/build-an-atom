// Copyright 2013-2015, University of Colorado Boulder

/**
 * Base class for problem views.  This type adds the titles, buttons, and such
 * and controls the visibility based on the state of the problem.
 *
 * @author John Blanco
 */
define( function( require ) {
  'use strict';

  // modules
  var buildAnAtom = require( 'BUILD_AN_ATOM/buildAnAtom' );
  var Color = require( 'SCENERY/util/Color' );
  var FaceNode = require( 'SCENERY_PHET/FaceNode' );
  var GameAudioPlayer = require( 'VEGAS/GameAudioPlayer' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( 'SCENERY/nodes/Node' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var Text = require( 'SCENERY/nodes/Text' );
  var TextPushButton = require( 'SUN/buttons/TextPushButton' );

  // strings
  var checkString = require( 'string!VEGAS/check' );
  var tryAgainString = require( 'string!VEGAS/tryAgain' );
  var showAnswerString = require( 'string!VEGAS/showAnswer' );
  var nextString = require( 'string!VEGAS/next' );

  // constants
  var BUTTON_FONT = new PhetFont( 20 );
  var BUTTON_FILL = new Color( 0, 255, 153 );
  var POINT_TEXT_OPTIONS = { font: new PhetFont( { size: 20, weight: 'bold' } ) };
  var BUTTON_MAX_WIDTH = 350;

  /**
   * Main constructor function.
   *
   * @constructor
   */
  function ProblemView( problem, layoutBounds, tandem ) {
    Node.call( this ); // Call super constructor.
    var thisNode = this;
    this.problem = problem;

    // Audio player used for audio feedback.
    this.gameAudioPlayer = new GameAudioPlayer( problem.model.soundEnabledProperty );

    // Layout assumes that bounds start at (0,0), so verify that this is true.
    assert && assert( layoutBounds.minX === 0 && layoutBounds.minY === 0 );

    // Add the parent nodes where subclasses will add the problem presentation
    // and the interactive controls.
    this.problemPresentationNode = new Node();
    this.addChild( this.problemPresentationNode );
    this.interactiveAnswerNode = new Node();
    this.addChild( this.interactiveAnswerNode );

    // Face node used to signal correct/incorrect answers.
    var faceNode = new FaceNode( layoutBounds.width * 0.4, { visible: false, opacity: 0.75 } );
    var pointDisplay = new Text( '+0', POINT_TEXT_OPTIONS );
    pointDisplay.centerX = 0;
    pointDisplay.top = faceNode.height / 2;
    faceNode.addChild( pointDisplay );
    this.addChild( faceNode );

    // Buttons.
    this.buttons = [];
    this.checkAnswerButton = new TextPushButton( checkString, {
      listener: function() { thisNode.checkAnswer(); },
      font: BUTTON_FONT,
      baseColor: BUTTON_FILL,
      maxWidth: BUTTON_MAX_WIDTH,
      tandem: tandem.createTandem( 'checkAnswerButton' )
    } );
    this.addChild( this.checkAnswerButton );
    this.buttons.push( this.checkAnswerButton );

    this.nextButton = new TextPushButton( nextString, {
      listener: function() { problem.next(); },
      font: BUTTON_FONT,
      baseColor: BUTTON_FILL,
      maxWidth: BUTTON_MAX_WIDTH,
      tandem: tandem.createTandem( 'nextButton' )
    } );
    this.addChild( this.nextButton );
    this.buttons.push( this.nextButton );

    this.tryAgainButton = new TextPushButton( tryAgainString, {
      listener: function() { problem.tryAgain(); },
      font: BUTTON_FONT,
      baseColor: BUTTON_FILL,
      maxWidth: BUTTON_MAX_WIDTH,
      tandem: tandem.createTandem( 'tryAgainButton' )
    } );
    this.addChild( this.tryAgainButton );
    this.buttons.push( this.tryAgainButton );

    this.displayCorrectAnswerButton = new TextPushButton( showAnswerString, {
      listener: function() { problem.displayCorrectAnswer(); },
      font: BUTTON_FONT,
      baseColor: BUTTON_FILL,
      maxWidth: BUTTON_MAX_WIDTH,
      tandem: tandem.createTandem( 'displayCorrectAnswerButton' )
    } );
    this.addChild( this.displayCorrectAnswerButton );
    this.buttons.push( this.displayCorrectAnswerButton );

    // Utility function to hide all buttons and the feedback face.
    var hideButtonsAndFace = function hideButtonsAndFace() {
      thisNode.buttons.forEach( function( button ) {
        button.visible = false;
      } );
      faceNode.visible = false;
    };
    hideButtonsAndFace();

    // Utility function to enable/disable interaction with answer portion of
    // the displayed problem.
    var setAnswerNodeInteractive = function( interactive ) {
      thisNode.interactiveAnswerNode.pickable = interactive;
    };

    // Updated the visibility of the various buttons and other nodes based on
    // the problem state.
    var stateChangeHandlers = {
      presentingProblem: function() {
        thisNode.clearAnswer();
        setAnswerNodeInteractive( true );
        thisNode.checkAnswerButton.visible = true;
      },
      problemSolvedCorrectly: function() {
        setAnswerNodeInteractive( false );
        faceNode.smile();
        pointDisplay.text = '+' + problem.score;
        faceNode.visible = true;
        thisNode.nextButton.visible = true;
        thisNode.gameAudioPlayer.correctAnswer();
      },
      presentingTryAgain: function() {
        setAnswerNodeInteractive( false );
        faceNode.frown();
        pointDisplay.text = '';
        faceNode.visible = true;
        thisNode.tryAgainButton.visible = true;
        thisNode.gameAudioPlayer.wrongAnswer();
      },
      attemptsExhausted: function() {
        setAnswerNodeInteractive( false );
        thisNode.displayCorrectAnswerButton.visible = true;
        faceNode.frown();
        pointDisplay.text = '';
        faceNode.visible = true;
        thisNode.gameAudioPlayer.wrongAnswer();
      },
      displayingCorrectAnswer: function() {
        setAnswerNodeInteractive( false );
        thisNode.nextButton.visible = true;
        thisNode.displayCorrectAnswer();
      }
    };

    // Update the appearance of the problem as the state changes.
    problem.problemStateProperty.link( function( problemState ) {
      hideButtonsAndFace();
      if ( stateChangeHandlers[ problemState ] !== undefined ) {
        stateChangeHandlers[ problemState ]();
      }
    } );

    // Do an initial layout, but the subclasses can and should move the
    // buttons as needed.
    this.setButtonCenter( layoutBounds.width * 0.75, layoutBounds.height * 0.9 );
    faceNode.centerX = layoutBounds.width / 2;
    faceNode.centerY = layoutBounds.height / 2;
  }

  buildAnAtom.register( 'ProblemView', ProblemView );

  // Inherit from Node.
  return inherit( Node, ProblemView, {

      // Function to clear the user's answer, generally used when
      // giving the user another chance to answer.  Must be implemented
      // in subclasses if any action is desired.
      clearAnswer: function() {},

      // Function to display the correct answer.  Must be implemented
      // in subclasses.
      displayCorrectAnswer: function() {},

      // Function to check the user's submitted answer.  Must be
      // implemented in subclasses.
      checkAnswer: function() {},

      // Function to set the location of all buttons.
      setButtonCenter: function( x, y ) {
        this.buttons.forEach( function( button ) {
          button.centerX = x;
          button.centerY = y;
        } );
      }
    }
  );
} );
