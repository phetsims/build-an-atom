// Copyright 2025, University of Colorado Boulder

/**
 * Base type for views of challenges where the user is asked to configure an interactive symbol (basically like a cell
 * in the periodic table) to be correct based on provided information about the atom.
 *
 * @author John Blanco
 */

import DerivedStringProperty from '../../../../axon/js/DerivedStringProperty.js';
import Bounds2 from '../../../../dot/js/Bounds2.js';
import MathSymbols from '../../../../scenery-phet/js/MathSymbols.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import RichText from '../../../../scenery/js/nodes/RichText.js';
import Color from '../../../../scenery/js/util/Color.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import buildAnAtom from '../../buildAnAtom.js';
import BAAConstants from '../../common/BAAConstants.js';
import AnswerAtom from '../model/AnswerAtom.js';
import ToSymbolChallenge from '../model/ToSymbolChallenge.js';
import ChallengeView from './ChallengeView.js';
import InteractiveSymbolNode from './InteractiveSymbolNode.js';

// constants
class ToSymbolChallengeView extends ChallengeView<ToSymbolChallenge> {

  private readonly interactiveSymbolNode: InteractiveSymbolNode;

  protected constructor( toSymbolChallenge: ToSymbolChallenge,
                         layoutBounds: Bounds2,
                         tandem: Tandem ) {

    super( toSymbolChallenge, layoutBounds, tandem );

    // Create and add the interactive symbol, which is where the user will enter their answer.
    this.interactiveSymbolNode = new InteractiveSymbolNode(
      toSymbolChallenge.correctAnswerAtom,
      {
        isProtonCountInteractive: toSymbolChallenge.isProtonCountConfigurable,
        isMassNumberInteractive: toSymbolChallenge.isMassNumberConfigurable,
        isChargeInteractive: toSymbolChallenge.isChargeConfigurable,
        showArrowButtonsProperty: toSymbolChallenge.isAnswerInteractiveProperty,
        tandem: tandem.createTandem( 'interactiveSymbolNode' )
      }
    );
    this.interactiveSymbolNode.scale( 0.75 );
    this.interactiveAnswerNode.addChild( this.interactiveSymbolNode );

    // position empirically determined to match the design
    this.interactiveSymbolNode.centerX = layoutBounds.width * 0.745;
    this.interactiveSymbolNode.centerY = layoutBounds.height * 0.54;
  }

  public override checkAnswer(): void {
    const userSubmittedAnswer = new AnswerAtom( {
      protonCount: this.interactiveSymbolNode.protonCountProperty.value,
      neutronCount: this.interactiveSymbolNode.massNumberProperty.value - this.interactiveSymbolNode.protonCountProperty.value,
      electronCount: this.interactiveSymbolNode.protonCountProperty.value - this.interactiveSymbolNode.chargeProperty.value
    } );
    this.challenge.checkAnswer( userSubmittedAnswer );
  }

  public override displayCorrectAnswer(): void {
    this.interactiveSymbolNode.protonCountProperty.value = this.challenge.correctAnswerAtom.protonCountProperty.value;
    this.interactiveSymbolNode.massNumberProperty.value = this.challenge.correctAnswerAtom.massNumberProperty.value;
    this.interactiveSymbolNode.chargeProperty.value = this.challenge.correctAnswerAtom.chargeProperty.value;
  }

  public override reset(): void {
    this.interactiveSymbolNode.reset();
  }

  public override createAnswerNode(): Node {

    let answerNode: Node;
    if ( this.challenge.isProtonCountConfigurable &&
         !this.challenge.isChargeConfigurable &&
         !this.challenge.isMassNumberConfigurable ) {

      // Add the text node for the atomic number, since that is the only configurable property.
      const atomicNumberTextProperty = new DerivedStringProperty(
        [ this.challenge.correctAnswerAtom.protonCountProperty ],
        ( atomicNumber: number ) => `${this.challenge.challengeType}<br> Atomic Number: ${atomicNumber}`
      );
      answerNode = new RichText( atomicNumberTextProperty, BAAConstants.SHOW_ANSWER_TEXT_OPTIONS );
    }
    else if ( this.challenge.isChargeConfigurable &&
              !this.challenge.isProtonCountConfigurable &&
              !this.challenge.isMassNumberConfigurable ) {

      // Add the text node for the net charge, since that is the only configurable property.
      const atomicNumberTextProperty = new DerivedStringProperty(
        [ this.challenge.correctAnswerAtom.chargeProperty ],
        ( charge: number ) => {
          const sign = charge > 0 ? MathSymbols.UNARY_PLUS : charge < 0 ? MathSymbols.UNARY_MINUS : '';
          return `${this.challenge.challengeType}<br> Net Charge: ${Math.abs( charge )}${sign}`;
        }
      );
      answerNode = new RichText( atomicNumberTextProperty, BAAConstants.SHOW_ANSWER_TEXT_OPTIONS );
    }
    else if ( this.challenge.isMassNumberConfigurable &&
              !this.challenge.isProtonCountConfigurable &&
              !this.challenge.isChargeConfigurable ) {

      // Add the text node for the mass number, since that is the only configurable property.
      const atomicNumberTextProperty = new DerivedStringProperty(
        [ this.challenge.correctAnswerAtom.massNumberProperty ],
        ( massNumber: number ) => `${this.challenge.challengeType}<br> Mass Number: ${Math.abs( massNumber )}`
      );
      answerNode = new RichText( atomicNumberTextProperty, BAAConstants.SHOW_ANSWER_TEXT_OPTIONS );
    }
    else {

      // The challenge has two or more configurable properties, so return a symbol node that represents the answer.
      answerNode = new InteractiveSymbolNode( this.challenge.correctAnswerAtom, {
        isProtonCountInteractive: false,
        isChargeInteractive: false,
        isMassNumberInteractive: false,
        scale: 0.22, // empirically determined to fit below the interactive symbol node
        stroke: Color.RED,
        lineWidth: 2,
        tandem: Tandem.OPT_OUT
      } );
    }
    return answerNode;
  }

}

buildAnAtom.register( 'ToSymbolChallengeView', ToSymbolChallengeView );

export default ToSymbolChallengeView;