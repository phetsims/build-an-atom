// Copyright 2013-2025, University of Colorado Boulder

/**
 * Base type for views of challenges where the user is asked to identify the
 * element on the periodic table and then choose whether it is an ion or a
 * neutral atom.
 *
 * @author John Blanco
 */

import Property from '../../../../axon/js/Property.js';
import Bounds2 from '../../../../dot/js/Bounds2.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import Text from '../../../../scenery/js/nodes/Text.js';
import LinearGradient from '../../../../scenery/js/util/LinearGradient.js';
import NumberAtom from '../../../../shred/js/model/NumberAtom.js';
import PeriodicTableNode from '../../../../shred/js/view/PeriodicTableNode.js';
import AquaRadioButton from '../../../../sun/js/AquaRadioButton.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import StringUnionIO from '../../../../tandem/js/types/StringUnionIO.js';
import buildAnAtom from '../../buildAnAtom.js';
import BuildAnAtomStrings from '../../BuildAnAtomStrings.js';
import AnswerAtom from '../model/AnswerAtom.js';
import CountsToElementChallenge from '../model/CountsToElementChallenge.js';
import ChallengeView from './ChallengeView.js';

// constants
const TITLE_FONT = new PhetFont( 30 );
const INSET = 10;
const CELL_DIMENSION = 25;
const MAX_WIDTH = 100; // empirically determined for long strings

const neutralOrIonValues = [ 'neutral', 'ion', 'noSelection' ] as const;
export type NeutralOrIon = typeof neutralOrIonValues[number];

class ToElementChallengeView extends ChallengeView {

  protected readonly periodicTableAtom: NumberAtom;
  protected readonly periodicTable: PeriodicTableNode;
  protected readonly neutralOrIonProperty: Property<NeutralOrIon>;
  protected readonly disposeToElementChallengeView: () => void;

  public constructor( countsToElementChallenge: CountsToElementChallenge, layoutBounds: Bounds2, tandem: Tandem ) {

    super( countsToElementChallenge, layoutBounds, tandem );

    this.periodicTableAtom = new NumberAtom();

    this.neutralOrIonProperty = new Property<NeutralOrIon>( 'noSelection', {
      tandem: tandem.createTandem( 'neutralOrIonProperty' ),
      phetioValueType: StringUnionIO( neutralOrIonValues )
    } );

    // Periodic table
    this.periodicTable = new PeriodicTableNode( this.periodicTableAtom, {
      interactiveMax: 118,
      cellDimension: CELL_DIMENSION,
      enabledCellColor: new LinearGradient( 0, 0, 0, CELL_DIMENSION ).addColorStop( 0, 'white' ).addColorStop( 1, 'rgb( 240, 240, 240 )' ),
      selectedCellColor: 'yellow',
      scale: 1.02,
      tandem: Tandem.OPT_OUT
    } );
    this.interactiveAnswerNode.addChild( this.periodicTable );

    // Challenge title
    const challengeTitle = new Text( BuildAnAtomStrings.findTheElementStringProperty, {
      font: TITLE_FONT,
      maxWidth: this.periodicTable.width
    } );
    this.challengePresentationNode.addChild( challengeTitle );

    // Neutral atom versus ion question.
    const neutralVersusIonPrompt = new Text( BuildAnAtomStrings.isItStringProperty, {
      font: new PhetFont( 24 ),
      maxWidth: MAX_WIDTH
    } );

    const radioButtonTandems = tandem.createTandem( 'neutralOrIonRadioButtons' );
    const neutralAtomRadioButton = new AquaRadioButton( this.neutralOrIonProperty, 'neutral', new Text( BuildAnAtomStrings.neutralAtomStringProperty, {
      font: new PhetFont( 18 ),
      maxWidth: MAX_WIDTH
    } ), {
      radius: 8,
      tandem: radioButtonTandems.createTandem( 'neutralAtomRadioButton' )
    } );
    const ionRadioButton = new AquaRadioButton( this.neutralOrIonProperty, 'ion', new Text( BuildAnAtomStrings.ionStringProperty, {
      font: new PhetFont( 18 ),
      maxWidth: MAX_WIDTH
    } ), {
      radius: 8,
      tandem: radioButtonTandems.createTandem( 'ionRadioButton' )
    } );
    const neutralAtomVersusIonQuestion = new Node();
    neutralAtomVersusIonQuestion.addChild( neutralVersusIonPrompt );
    neutralAtomRadioButton.left = neutralVersusIonPrompt.right + 10;
    neutralAtomRadioButton.centerY = neutralVersusIonPrompt.centerY;
    neutralAtomVersusIonQuestion.addChild( neutralAtomRadioButton );
    ionRadioButton.left = neutralAtomVersusIonQuestion.right + 10;
    ionRadioButton.centerY = neutralVersusIonPrompt.centerY;
    neutralAtomVersusIonQuestion.addChild( ionRadioButton );
    this.interactiveAnswerNode.addChild( neutralAtomVersusIonQuestion );

    const updateNeutralAtomVersusIonQuestionVisibility = ( protonCount: number ) => {
      // Once the user has selected an element, make the ion question visible.
      neutralAtomVersusIonQuestion.visible = protonCount > 0;
    };

    this.periodicTableAtom.protonCountProperty.link( updateNeutralAtomVersusIonQuestionVisibility );

    // Don't enable the "check answer" button until the user has answered the
    // "neutral vs. ion" question.

    const updateCheckAnswerButton = ( neutralOrIon: NeutralOrIon ) => {
      this.checkAnswerButton.enabled = neutralOrIon !== 'noSelection';
      this.checkAnswerButton.pickable = neutralOrIon !== 'noSelection';
    };

    this.neutralOrIonProperty.link( updateCheckAnswerButton );

    this.disposeToElementChallengeView = function() {
      this.neutralOrIonProperty.unlink( updateCheckAnswerButton );
      this.periodicTableAtom.protonCountProperty.unlink( updateNeutralAtomVersusIonQuestionVisibility );
      this.periodicTableAtom.dispose();
      this.periodicTable.dispose();
      neutralAtomRadioButton.dispose();
      ionRadioButton.dispose();
      this.neutralOrIonProperty.dispose();
    };

    //--------------------------- Layout -------------------------------------

    this.periodicTable.right = layoutBounds.width - INSET;
    this.periodicTable.centerY = layoutBounds.height * 0.55;

    const maxTitleWidth = this.periodicTable.width * 0.9;
    if ( challengeTitle.width > maxTitleWidth ) {
      challengeTitle.scale( maxTitleWidth / challengeTitle.width );
    }
    challengeTitle.centerX = this.periodicTable.centerX;
    challengeTitle.bottom = this.periodicTable.top - 30; // Offset empirically determined.

    neutralAtomVersusIonQuestion.centerX = this.periodicTable.centerX;
    neutralAtomVersusIonQuestion.top = this.periodicTable.bottom + 20;
  }


  public override checkAnswer(): void {
    const userSubmittedAnswer = new AnswerAtom( {
      protonCount: this.periodicTableAtom.protonCountProperty.get(),
      neutronCount: this.challenge.answerAtom.neutronCountProperty.get(),
      electronCount: this.challenge.answerAtom.electronCountProperty.get(),
      neutralOrIon: this.neutralOrIonProperty.get()
    } );
    this.challenge.checkAnswer( userSubmittedAnswer );
  }


  public override clearAnswer(): void {

    // This method can be called before the superconstructor has completed, so the existence of the items being cleared
    // must be checked.
    if ( this.periodicTableAtom ) {
      this.periodicTableAtom.protonCountProperty.reset();
      this.periodicTableAtom.neutronCountProperty.reset();
      this.periodicTableAtom.electronCountProperty.reset();
    }
    this.neutralOrIonProperty && this.neutralOrIonProperty.reset();
  }


  public override displayCorrectAnswer(): void {
    this.periodicTableAtom.protonCountProperty.set( this.challenge.answerAtom.protonCountProperty.get() );
    this.periodicTableAtom.neutronCountProperty.set( this.challenge.answerAtom.neutronCountProperty.get() );
    this.periodicTableAtom.electronCountProperty.set( this.challenge.answerAtom.electronCountProperty.get() );
    this.neutralOrIonProperty.value = this.challenge.answerAtom.chargeProperty.get() === 0 ? 'neutral' : 'ion';
  }


  public override dispose(): void {
    this.disposeToElementChallengeView();
    super.dispose();
  }
}

buildAnAtom.register( 'ToElementChallengeView', ToElementChallengeView );

export default ToElementChallengeView;