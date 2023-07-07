// Copyright 2013-2023, University of Colorado Boulder

/**
 * Base class for challenge views.  This type adds the titles, buttons, and such
 * and controls the visibility based on the state of the challenge.
 *
 * @author John Blanco
 */

import stepTimer from '../../../../axon/js/stepTimer.js';
import FaceNode from '../../../../scenery-phet/js/FaceNode.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import { Color, Node, Text } from '../../../../scenery/js/imports.js';
import TextPushButton from '../../../../sun/js/buttons/TextPushButton.js';
import GameAudioPlayer from '../../../../vegas/js/GameAudioPlayer.js';
import VegasStrings from '../../../../vegas/js/VegasStrings.js';
import buildAnAtom from '../../buildAnAtom.js';
import BAAChallengeState from '../model/BAAChallengeState.js';

const checkString = VegasStrings.check;
const nextString = VegasStrings.next;
const showAnswerString = VegasStrings.showAnswer;
const tryAgainString = VegasStrings.tryAgain;

// constants
const BUTTON_FONT = new PhetFont( 20 );
const BUTTON_FILL = new Color( 0, 255, 153 );
const POINT_TEXT_OPTIONS = { font: new PhetFont( { size: 20, weight: 'bold' } ) };
const BUTTON_MAX_WIDTH = 350;
const BUTTON_TOUCH_AREA_DILATION = 8;

class ChallengeView extends Node {

  /**
   * @param {BAAGameChallenge} challenge
   * @param {Bounds2} layoutBounds
   * @param {Tandem} tandem
   */
  constructor( challenge, layoutBounds, tandem ) {
    super();
    this.challenge = challenge;

    // Audio player used for audio feedback.
    this.gameAudioPlayer = new GameAudioPlayer();

    // Layout assumes that bounds start at (0,0), so verify that this is true.
    assert && assert( layoutBounds.minX === 0 && layoutBounds.minY === 0 );

    // Add the parent nodes where subclasses will add the challenge presentation and the interactive controls.
    this.challengePresentationNode = new Node();
    this.addChild( this.challengePresentationNode );
    this.interactiveAnswerNode = new Node();
    this.addChild( this.interactiveAnswerNode );

    // face node, used to signal correct/incorrect answers
    const faceNode = new FaceNode( layoutBounds.width * 0.4, { visible: false, opacity: 0.75 } );
    const pointDisplay = new Text( '+0', POINT_TEXT_OPTIONS );
    pointDisplay.centerX = 0;
    pointDisplay.top = faceNode.height / 2;
    faceNode.addChild( pointDisplay );
    this.addChild( faceNode );

    // buttons
    this.buttons = [];
    this.checkAnswerButton = new TextPushButton( checkString, {
      listener: () => { this.checkAnswer(); },
      font: BUTTON_FONT,
      baseColor: BUTTON_FILL,
      maxWidth: BUTTON_MAX_WIDTH,
      touchAreaXDilation: BUTTON_TOUCH_AREA_DILATION,
      touchAreaYDilation: BUTTON_TOUCH_AREA_DILATION,
      tandem: tandem.createTandem( 'checkAnswerButton' )
    } );
    this.addChild( this.checkAnswerButton );
    this.buttons.push( this.checkAnswerButton );

    this.nextButton = new TextPushButton( nextString, {
      listener: () => {

        // Since the button disposes itself while triggering other events, we must run this in the next animation frame
        // to avoid mismatched PhET-iO message indices, see https://github.com/phetsims/build-an-atom/issues/181
        // N.B. That is to say, I don't really understand the problem nor why this solution works.
        stepTimer.setTimeout( () => {
          challenge.next();
        }, 0 );
      },
      font: BUTTON_FONT,
      baseColor: BUTTON_FILL,
      maxWidth: BUTTON_MAX_WIDTH,
      touchAreaXDilation: BUTTON_TOUCH_AREA_DILATION,
      touchAreaYDilation: BUTTON_TOUCH_AREA_DILATION,
      tandem: tandem.createTandem( 'nextButton' )
    } );
    this.addChild( this.nextButton );
    this.buttons.push( this.nextButton );

    this.tryAgainButton = new TextPushButton( tryAgainString, {
      listener: () => { challenge.tryAgain(); },
      font: BUTTON_FONT,
      baseColor: BUTTON_FILL,
      maxWidth: BUTTON_MAX_WIDTH,
      touchAreaXDilation: BUTTON_TOUCH_AREA_DILATION,
      touchAreaYDilation: BUTTON_TOUCH_AREA_DILATION,
      tandem: tandem.createTandem( 'tryAgainButton' )
    } );
    this.addChild( this.tryAgainButton );
    this.buttons.push( this.tryAgainButton );

    this.displayCorrectAnswerButton = new TextPushButton( showAnswerString, {
      listener: () => { challenge.displayCorrectAnswer(); },
      font: BUTTON_FONT,
      baseColor: BUTTON_FILL,
      maxWidth: BUTTON_MAX_WIDTH,
      touchAreaXDilation: BUTTON_TOUCH_AREA_DILATION,
      touchAreaYDilation: BUTTON_TOUCH_AREA_DILATION,
      tandem: tandem.createTandem( 'displayCorrectAnswerButton' )
    } );
    this.addChild( this.displayCorrectAnswerButton );
    this.buttons.push( this.displayCorrectAnswerButton );

    // Utility function to hide all buttons and the feedback face.
    const hideButtonsAndFace = () => {
      this.buttons.forEach( button => {
        button.visible = false;
      } );
      faceNode.visible = false;
    };
    hideButtonsAndFace();

    // Utility function to enable/disable interaction with answer portion of
    // the displayed challenge.
    const setAnswerNodeInteractive = interactive => {
      this.interactiveAnswerNode.pickable = interactive;
    };

    // Update the visibility of the various buttons and other nodes based on
    // the challenge state.
    // Set up the handlers that update the visibility of the various buttons and other nodes based on the challenge state.
    const stateChangeHandlers = {};
    stateChangeHandlers[ BAAChallengeState.PRESENTING_CHALLENGE ] = () => {
      this.clearAnswer();
      setAnswerNodeInteractive( true );
      this.checkAnswerButton.visible = true;
    };
    stateChangeHandlers[ BAAChallengeState.CHALLENGE_SOLVED_CORRECTLY ] = () => {
      setAnswerNodeInteractive( false );
      faceNode.smile();
      pointDisplay.string = `+${challenge.pointValue}`;
      faceNode.visible = true;
      this.nextButton.visible = true;
      this.gameAudioPlayer.correctAnswer();
    };
    stateChangeHandlers[ BAAChallengeState.PRESENTING_TRY_AGAIN ] = () => {
      setAnswerNodeInteractive( false );
      faceNode.frown();
      pointDisplay.string = '';
      faceNode.visible = true;
      this.tryAgainButton.visible = true;
      this.gameAudioPlayer.wrongAnswer();
    };
    stateChangeHandlers[ BAAChallengeState.ATTEMPTS_EXHAUSTED ] = () => {
      setAnswerNodeInteractive( false );
      this.displayCorrectAnswerButton.visible = true;
      faceNode.frown();
      pointDisplay.string = '';
      faceNode.visible = true;
      this.gameAudioPlayer.wrongAnswer();
    };
    stateChangeHandlers[ BAAChallengeState.DISPLAYING_CORRECT_ANSWER ] = () => {
      setAnswerNodeInteractive( false );
      this.nextButton.visible = true;
      this.displayCorrectAnswer();
    };

    // Update the appearance of the challenge as the state changes.
    const handleStateChange = challengeState => {
      hideButtonsAndFace();
      // TODO: Is the check for undefined really needed
      if ( stateChangeHandlers[ challengeState ] !== undefined ) {
        stateChangeHandlers[ challengeState ]();
      }
    };
    challenge.challengeStateProperty.link( handleStateChange );

    this.disposeListeners = () => {
      challenge.challengeStateProperty.unlink( handleStateChange );
    };

    // Do an initial layout, but the subclasses can and should move the
    // buttons as needed.
    this.setButtonCenter( layoutBounds.width * 0.75, layoutBounds.height * 0.92 );
    faceNode.centerX = layoutBounds.width / 2;
    faceNode.centerY = layoutBounds.height / 2;
  }

  /**
   * @public
   */
  dispose() {
    this.disposeListeners();
    this.checkAnswerButton.dispose();
    this.nextButton.dispose();
    this.tryAgainButton.dispose();
    this.displayCorrectAnswerButton.dispose();
    super.dispose();
  }

  // Function to clear the user's answer, generally used when
  // giving the user another chance to answer.  Must be implemented
  // in subclasses if any action is desired.

  /**
   * Function to clear the user's answer, generally used when giving the user another chance to answer.  Must be
   * implemented in subclasses if any action is desired.
   * @public
   */
  clearAnswer() {}

  /**
   * Function to display the correct answer.  Must be implemented in subclasses.
   * @public
   */
  displayCorrectAnswer() {}

  /**
   * Function to check the user's submitted answer.  Must be implemented in subclasses.
   * @public
   */
  checkAnswer() {}

  /**
   * Function to set the positions of all buttons.
   * @param {number} x
   * @param {number} y
   * @public
   */
  setButtonCenter( x, y ) {
    this.buttons.forEach( button => {
      button.centerX = x;
      button.centerY = y;
    } );
  }
}

buildAnAtom.register( 'ChallengeView', ChallengeView );

export default ChallengeView;