// Copyright 2013-2025, University of Colorado Boulder

/**
 * Base class for challenge views.  This type adds the titles, buttons, and the feedback node, and controls the
 * visibility based on the state of the challenge.
 *
 * @author John Blanco
 */

import DerivedStringProperty from '../../../../axon/js/DerivedStringProperty.js';
import stepTimer from '../../../../axon/js/stepTimer.js';
import Bounds2 from '../../../../dot/js/Bounds2.js';
import FaceNode from '../../../../scenery-phet/js/FaceNode.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import VBox from '../../../../scenery/js/layout/nodes/VBox.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import Text from '../../../../scenery/js/nodes/Text.js';
import Color from '../../../../scenery/js/util/Color.js';
import TextPushButton from '../../../../sun/js/buttons/TextPushButton.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import GameAudioPlayer from '../../../../vegas/js/GameAudioPlayer.js';
import VegasStrings from '../../../../vegas/js/VegasStrings.js';
import buildAnAtom from '../../buildAnAtom.js';
import BAAColors from '../../common/BAAColors.js';
import BAAGameChallenge from '../model/BAAGameChallenge.js';
import { GameState } from '../model/GameModel.js';

const checkStringProperty = VegasStrings.checkStringProperty;
const nextStringProperty = VegasStrings.nextStringProperty;
const showAnswerStringProperty = VegasStrings.showAnswerStringProperty;
const tryAgainStringProperty = VegasStrings.tryAgainStringProperty;

// constants
const BUTTON_FONT = new PhetFont( 20 );
const BUTTON_FILL = new Color( 0, 255, 153 );
const POINT_TEXT_OPTIONS = { font: new PhetFont( { size: 20, weight: 'bold' } ) };
const BUTTON_MAX_WIDTH = 250;
const BUTTON_TOUCH_AREA_DILATION = 8;

class ChallengeView extends Node {

  public readonly challenge: BAAGameChallenge;
  public readonly challengePresentationNode: Node;
  public readonly interactiveAnswerNode: Node;
  public readonly gameAudioPlayer: GameAudioPlayer;
  public readonly buttons: TextPushButton[];
  public readonly checkAnswerButton: TextPushButton;
  public readonly nextButton: TextPushButton;
  public readonly tryAgainButton: TextPushButton;
  public readonly displayCorrectAnswerButton: TextPushButton;
  public readonly handleStateChange: ( state: GameState ) => void;

  public constructor( challenge: BAAGameChallenge, layoutBounds: Bounds2, tandem: Tandem ) {
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

    // Create the face node, used to signal correct/incorrect answers by smiling or frowning.
    const faceNode = new FaceNode( layoutBounds.width * 0.4, {
      opacity: 0.75,
      headStroke: BAAColors.facialStrokeColorProperty
    } );

    // Add the point display to the face node, which will be updated with the points earned for a correct answer.
    const pointDisplayStringProperty = new DerivedStringProperty(
      [
        challenge.model.gameStateProperty,
        challenge.model.pointValueProperty
      ],
      ( gameState, pointValue ) => gameState === 'solvedCorrectly' ? `+${pointValue}` : ''
    );
    const pointDisplay = new Text( pointDisplayStringProperty, POINT_TEXT_OPTIONS );

    // Combine the face and points into a single node.
    const feedbackNode = new VBox( {
      children: [ faceNode, pointDisplay ],
      spacing: 2
    } );
    this.addChild( feedbackNode );

    // buttons
    this.buttons = [];
    this.checkAnswerButton = new TextPushButton( checkStringProperty, {
      listener: () => { this.checkAnswer(); },
      font: BUTTON_FONT,
      baseColor: BUTTON_FILL,
      maxWidth: BUTTON_MAX_WIDTH,
      touchAreaXDilation: BUTTON_TOUCH_AREA_DILATION,
      touchAreaYDilation: BUTTON_TOUCH_AREA_DILATION,
      tandem: tandem.createTandem( 'checkAnswerButton' ),
      phetioVisiblePropertyInstrumented: false,
      phetioEnabledPropertyInstrumented: false
    } );
    this.addChild( this.checkAnswerButton );
    this.buttons.push( this.checkAnswerButton );

    this.nextButton = new TextPushButton( nextStringProperty, {
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
      tandem: tandem.createTandem( 'nextButton' ),
      phetioVisiblePropertyInstrumented: false,
      phetioEnabledPropertyInstrumented: false
    } );
    this.addChild( this.nextButton );
    this.buttons.push( this.nextButton );

    this.tryAgainButton = new TextPushButton( tryAgainStringProperty, {
      listener: () => { challenge.tryAgain(); },
      font: BUTTON_FONT,
      baseColor: BUTTON_FILL,
      maxWidth: BUTTON_MAX_WIDTH,
      touchAreaXDilation: BUTTON_TOUCH_AREA_DILATION,
      touchAreaYDilation: BUTTON_TOUCH_AREA_DILATION,
      tandem: tandem.createTandem( 'tryAgainButton' ),
      phetioVisiblePropertyInstrumented: false,
      phetioEnabledPropertyInstrumented: false
    } );
    this.addChild( this.tryAgainButton );
    this.buttons.push( this.tryAgainButton );

    this.displayCorrectAnswerButton = new TextPushButton( showAnswerStringProperty, {
      listener: () => { challenge.displayCorrectAnswer(); },
      font: BUTTON_FONT,
      baseColor: BUTTON_FILL,
      maxWidth: BUTTON_MAX_WIDTH,
      touchAreaXDilation: BUTTON_TOUCH_AREA_DILATION,
      touchAreaYDilation: BUTTON_TOUCH_AREA_DILATION,
      tandem: tandem.createTandem( 'displayCorrectAnswerButton' ),
      phetioVisiblePropertyInstrumented: false,
      phetioEnabledPropertyInstrumented: false
    } );
    this.addChild( this.displayCorrectAnswerButton );
    this.buttons.push( this.displayCorrectAnswerButton );

    // Utility function to hide all buttons and the feedback face.
    const hideButtonsAndFace = () => {
      this.buttons.forEach( button => {
        button.visible = false;
      } );
      feedbackNode.visible = false;
    };
    hideButtonsAndFace();

    // Utility function to enable/disable interaction with answer portion of
    // the displayed challenge.
    const setAnswerNodeInteractive = ( interactive: boolean ) => {
      this.interactiveAnswerNode.pickable = interactive;
    };

    // Set up the handler that updates the visibility of the various buttons and other nodes based on the challenge
    // state.
    this.handleStateChange = ( challengeState: GameState ) => {
      hideButtonsAndFace();
      switch( challengeState ) {
        case 'presentingChallenge':
          this.clearAnswer();
          setAnswerNodeInteractive( true );
          this.checkAnswerButton.visible = true;
          break;
        case 'solvedCorrectly':
          setAnswerNodeInteractive( false );
          faceNode.smile();
          feedbackNode.visible = true;
          this.nextButton.visible = true;
          this.gameAudioPlayer.correctAnswer();
          break;
        case 'tryAgain':
          setAnswerNodeInteractive( false );
          faceNode.frown();
          feedbackNode.visible = true;
          this.tryAgainButton.visible = true;
          this.gameAudioPlayer.wrongAnswer();
          break;
        case 'attemptsExhausted':
          setAnswerNodeInteractive( false );
          this.displayCorrectAnswerButton.visible = true;
          faceNode.frown();
          feedbackNode.visible = true;
          this.gameAudioPlayer.wrongAnswer();
          break;
        case 'showingAnswer':
          setAnswerNodeInteractive( false );
          this.nextButton.visible = true;
          this.displayCorrectAnswer();
          break;
        default:
          // No action needed for other states.
          break;
      }
    };

    // Do an initial layout, but the subclasses can and should move the buttons as needed.
    this.setButtonCenter( layoutBounds.width * 0.5, layoutBounds.height * 0.92 );
    feedbackNode.center = layoutBounds.center;
  }

  /**
   * Function to clear the user's answer, generally used when giving the user another chance to answer.  Must be
   * implemented in subclasses if any action is desired.
   */
  public clearAnswer(): void {
    // no-op, implemented in subclass
  }

  /**
   * Reset the challenge view to its initial state.  This is called when the challenge is initially presented to the
   * user.  Must be implemented in subclasses if any action is desired.
   */
  public reset(): void {
    // no-op, implemented in subclass
  }

  /**
   * Function to display the correct answer.  Must be implemented in subclasses.
   */
  public displayCorrectAnswer(): void {
    // no-op, implemented in subclass
  }

  /**
   * Function to check the user's submitted answer.  Must be implemented in subclasses.
   */
  public checkAnswer(): void {
    // no-op, implemented in subclass
  }

  /**
   * Function to set the positions of all buttons.
   */
  public setButtonCenter( x: number, y: number ): void {
    this.buttons.forEach( button => {
      button.boundsProperty.link( () => {
        button.centerX = x;
        button.centerY = y;
      } );
    } );
  }

  public override dispose(): void {
    this.checkAnswerButton.dispose();
    this.nextButton.dispose();
    this.tryAgainButton.dispose();
    this.displayCorrectAnswerButton.dispose();
    super.dispose();
  }
}

buildAnAtom.register( 'ChallengeView', ChallengeView );

export default ChallengeView;