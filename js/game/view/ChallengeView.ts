// Copyright 2013-2025, University of Colorado Boulder

/**
 * Base class for challenge views.  This type adds the titles, buttons, and the feedback node, and controls the
 * visibility based on the state of the challenge.
 *
 * @author John Blanco
 */

import DerivedStringProperty from '../../../../axon/js/DerivedStringProperty.js';
import Bounds2 from '../../../../dot/js/Bounds2.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import { combineOptions } from '../../../../phet-core/js/optionize.js';
import FaceNode from '../../../../scenery-phet/js/FaceNode.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import VBox from '../../../../scenery/js/layout/nodes/VBox.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import Text from '../../../../scenery/js/nodes/Text.js';
import Color from '../../../../scenery/js/util/Color.js';
import TextPushButton, { TextPushButtonOptions } from '../../../../sun/js/buttons/TextPushButton.js';
import nullSoundPlayer from '../../../../tambo/js/nullSoundPlayer.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import CheckButton from '../../../../vegas/js/buttons/CheckButton.js';
import GameAudioPlayer from '../../../../vegas/js/GameAudioPlayer.js';
import VegasStrings from '../../../../vegas/js/VegasStrings.js';
import buildAnAtom from '../../buildAnAtom.js';
import BAAColors from '../../common/BAAColors.js';
import BAAGameChallenge from '../model/BAAGameChallenge.js';
import { GameState } from '../model/GameModel.js';

const nextStringProperty = VegasStrings.nextStringProperty;
const showAnswerStringProperty = VegasStrings.showAnswerStringProperty;
const tryAgainStringProperty = VegasStrings.tryAgainStringProperty;

// constants
const BUTTON_FONT = new PhetFont( 20 );
const BUTTON_FILL = new Color( 0, 255, 153 );
const POINT_TEXT_OPTIONS = { font: new PhetFont( { size: 20, weight: 'bold' } ) };
const BUTTON_MAX_WIDTH = 250;
const BUTTON_TOUCH_AREA_DILATION = 8;
const COMMON_BUTTON_OPTIONS: TextPushButtonOptions = {
  font: BUTTON_FONT,
  baseColor: BUTTON_FILL,
  maxWidth: BUTTON_MAX_WIDTH,
  touchAreaXDilation: BUTTON_TOUCH_AREA_DILATION,
  touchAreaYDilation: BUTTON_TOUCH_AREA_DILATION,
  phetioVisiblePropertyInstrumented: false,
  phetioEnabledPropertyInstrumented: false
};

abstract class ChallengeView<TChallenge extends BAAGameChallenge = BAAGameChallenge> extends Node {

  public readonly challenge: TChallenge;

  // Node that contains the information needed to solve the challenge, such as the schematic atom or particle counts.
  public readonly challengePresentationNode: Node;

  // Node that contains the interactive controls for answering the challenge, such as a spinner or text field.
  public readonly interactiveAnswerNode: Node;

  // Button that allows the user to check their answer.
  public readonly checkButton: TextPushButton;

  // Function that is called when the game state changes, allowing the view to update its display.
  public readonly handleStateChange: ( state: GameState ) => void;

  // Audio player used for audio feedback.
  // This is used to play sounds when the user answers correctly or incorrectly.
  private readonly gameAudioPlayer: GameAudioPlayer;

  // The buttons that are used to interact with the challenge.
  private readonly answerButtons: TextPushButton[];
  private readonly nextButton: TextPushButton;
  private readonly tryAgainButton: TextPushButton;
  private readonly showAnswerButton: TextPushButton;

  // Collections of Nodes exposed for ordering in the PDOM. Subclasses need to add
  // specific components to these lists, in the order they should appear. The ScreenView will then
  // place these components in order to the appropriate accessible sections.
  public challengeNodesPDOMOrder: Node[] = [];
  public answerNodesPDOMOrder: Node[] = [];

  // The node that will be used to display the correct answer prior to answering the challenge.  This is for internal
  // use only, and is used to make it easier to move through the game while testing.
  protected readonly showAnswerNode: Node | null = null;

  protected constructor( challenge: TChallenge, layoutBounds: Bounds2, tandem: Tandem ) {
    super( {
      tandem: tandem,
      phetioVisiblePropertyInstrumented: false
    } );
    this.challenge = challenge;

    this.addLinkedElement( challenge, {
      tandemName: 'challenge'
    } );

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
        challenge.model.pointsProperty
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
    this.answerButtons = [];
    this.checkButton = new CheckButton( combineOptions<TextPushButtonOptions>( {
      listener: () => {
        this.checkAnswer();

        // Focus management. If the answer was correct, move focus to the next challenge button.
        // Otherwise, move to the try again button.
        if ( challenge.model.gameStateProperty.value === 'solvedCorrectly' ) {
          this.nextButton.focus();
        }
        else {
          this.tryAgainButton.focus();
        }
      },
      tandem: tandem.createTandem( 'checkButton' ),
      soundPlayer: nullSoundPlayer // Turn off default sound, since a feedback sound will be played instead.
    }, COMMON_BUTTON_OPTIONS ) );

    this.addChild( this.checkButton );
    this.answerButtons.push( this.checkButton );

    this.nextButton = new TextPushButton( nextStringProperty, combineOptions<TextPushButtonOptions>( {
      listener: () => {

        // TODO: When a new challenge is shown, the heading for the next challenge gets focus. Makes sense, but
        //  was accidental from how I implemented it. Is this OK? If so, ill make sure it is more intentional.
        //  See https://github.com/phetsims/vegas/issues/138
        challenge.next();
      },
      tandem: tandem.createTandem( 'nextButton' )
    }, COMMON_BUTTON_OPTIONS ) );
    this.addChild( this.nextButton );
    this.answerButtons.push( this.nextButton );

    this.tryAgainButton = new TextPushButton( tryAgainStringProperty, combineOptions<TextPushButtonOptions>( {
      listener: () => { challenge.tryAgain(); },
      tandem: tandem.createTandem( 'tryAgainButton' )
    }, COMMON_BUTTON_OPTIONS ) );
    this.addChild( this.tryAgainButton );
    this.answerButtons.push( this.tryAgainButton );

    this.showAnswerButton = new TextPushButton( showAnswerStringProperty, combineOptions<TextPushButtonOptions>( {
      listener: () => { challenge.displayCorrectAnswer(); },
      tandem: tandem.createTandem( 'showAnswerButton' )
    }, COMMON_BUTTON_OPTIONS ) );
    this.addChild( this.showAnswerButton );
    this.answerButtons.push( this.showAnswerButton );

    // Utility function to hide all buttons and the feedback face.
    const hideButtonsAndFace = () => {
      this.answerButtons.forEach( button => {
        button.visible = false;
      } );
      feedbackNode.visible = false;
    };
    hideButtonsAndFace();

    // Utility function to enable/disable interaction with answer portion of
    // the displayed challenge.
    const setAnswerNodeInteractive = ( isInteractive: boolean ) => {
      challenge.isAnswerInteractiveProperty.value = isInteractive; // This one is used to hide arrow buttons on spinners.
      this.interactiveAnswerNode.pickable = isInteractive; // This one disables periodic table, buckets and others
    };

    // Set up the handler that updates the visibility of the various buttons and other nodes based on the challenge
    // state.
    this.handleStateChange = ( challengeState: GameState ) => {
      hideButtonsAndFace();
      switch( challengeState ) {
        case 'presentingChallenge':
          this.clearAnswer();
          setAnswerNodeInteractive( true );
          this.checkButton.visible = true;
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
          this.showAnswerButton.visible = true;
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
    const defaultButtonCenter = new Vector2( layoutBounds.width * 0.5, layoutBounds.height * 0.92 );
    this.setButtonCenter( defaultButtonCenter );
    feedbackNode.center = layoutBounds.center;

    // pdom order - all challenges have buttons in the answer section, but subclasses must order
    // all other content
    this.answerNodesPDOMOrder = [
      ...this.answerButtons
    ];

    // If the showAnswers query parameter is set, then we will display "cheat code" answer node.
    if ( phet.chipper.queryParameters.showAnswers ) {
      this.showAnswerNode = this.createAnswerNode();
      this.addChild( this.showAnswerNode );
      this.showAnswerNode.centerX = layoutBounds.width * 0.75;
      this.showAnswerNode.centerY = defaultButtonCenter.y;
    }
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
   * Function to create the node that is used in conjunction with the 'showAnswers' query parameter.  This must be
   * implemented in subclasses.
   */
  public abstract createAnswerNode(): Node;

  /**
   * Returns a defensive copy of the challengeNodesPDOMOrder array. Useful so that
   * subclasses can add to the array without duplicating the order of the base class.
   */
  public getChallengeNodesPDOMOrder(): Node[] {
    return this.challengeNodesPDOMOrder.slice();
  }

  /**
   * Returns a defensive copy of the answerNodesPDOMOrder array. Useful so that
   * subclasses can add to the array without duplicating the order of the base class.
   */
  public getAnswerNodesPDOMOrder(): Node[] {
    return this.answerNodesPDOMOrder.slice();
  }

  /**
   * Function to set the positions of all buttons.
   */
  private setButtonCenter( buttonCenter: Vector2 ): void {
    this.answerButtons.forEach( button => {
      button.localBoundsProperty.link( () => {
        button.center = buttonCenter;
      } );
    } );
  }
}

buildAnAtom.register( 'ChallengeView', ChallengeView );

export default ChallengeView;