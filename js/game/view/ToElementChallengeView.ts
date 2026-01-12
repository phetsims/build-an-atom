// Copyright 2013-2026, University of Colorado Boulder

/**
 * Base type for views of challenges where the user is asked to identify the element on the periodic table and then
 * choose whether it is an ion or a neutral atom.
 *
 * @author John Blanco (PhET Interactive Simulations)
 */

import DerivedStringProperty from '../../../../axon/js/DerivedStringProperty.js';
import NumberProperty from '../../../../axon/js/NumberProperty.js';
import Property from '../../../../axon/js/Property.js';
import Bounds2 from '../../../../dot/js/Bounds2.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import HBox from '../../../../scenery/js/layout/nodes/HBox.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import RichText from '../../../../scenery/js/nodes/RichText.js';
import Text from '../../../../scenery/js/nodes/Text.js';
import LinearGradient from '../../../../scenery/js/util/LinearGradient.js';
import AtomIdentifier from '../../../../shred/js/AtomIdentifier.js';
import PeriodicTableNode from '../../../../shred/js/view/PeriodicTableNode.js';
import AquaRadioButtonGroup from '../../../../sun/js/AquaRadioButtonGroup.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import StringUnionIO from '../../../../tandem/js/types/StringUnionIO.js';
import buildAnAtom from '../../buildAnAtom.js';
import BuildAnAtomFluent from '../../BuildAnAtomFluent.js';
import BAAConstants from '../../common/BAAConstants.js';
import AnswerAtom, { NeutralOrIon, neutralOrIonValues } from '../model/AnswerAtom.js';
import CountsToElementChallenge from '../model/CountsToElementChallenge.js';
import ChallengeView from './ChallengeView.js';

// constants
const TITLE_FONT = new PhetFont( 30 );
const INSET = 10;
const CELL_DIMENSION = 25;
const MAX_WIDTH = 110; // empirically determined for long strings

class ToElementChallengeView extends ChallengeView {

  protected readonly protonCountProperty: NumberProperty;
  protected readonly periodicTable: PeriodicTableNode;
  protected readonly neutralOrIonProperty: Property<NeutralOrIon>;
  protected readonly neutralOrIonQuestion: Node;

  protected constructor( countsToElementChallenge: CountsToElementChallenge, layoutBounds: Bounds2, tandem: Tandem ) {

    super( countsToElementChallenge, layoutBounds, tandem );

    this.protonCountProperty = new NumberProperty( 0, {
      tandem: tandem.createTandem( 'protonCountProperty' ),
      phetioDocumentation: 'Indicates the element selected by the user.',
      phetioReadOnly: true,
      phetioFeatured: true
    } );

    this.neutralOrIonProperty = new Property<NeutralOrIon>( 'noSelection', {
      tandem: tandem.createTandem( 'neutralOrIonProperty' ),
      phetioDocumentation: 'Indicates whether the user selected Neutral Atom or Ion.',
      validValues: neutralOrIonValues,
      phetioValueType: StringUnionIO( neutralOrIonValues ),
      phetioReadOnly: true,
      phetioFeatured: true
    } );

    // Periodic table
    this.periodicTable = new PeriodicTableNode( this.protonCountProperty, {
      interactiveMax: 118,
      cellDimension: CELL_DIMENSION,
      enabledCellColor: new LinearGradient( 0, 0, 0, CELL_DIMENSION ).addColorStop( 0, 'white' ).addColorStop( 1, 'rgb( 240, 240, 240 )' ),
      selectedCellColor: 'yellow',
      scale: 1.02,
      tandem: Tandem.OPT_OUT,

      // Accessibility features and descriptions
      // TODO: This is going to be different, see https://github.com/phetsims/build-an-atom/issues/471
      accessibleHelpText: ChallengeView.createDynamicHelpText(
        BuildAnAtomFluent.a11y.gameScreen.components.periodicTable.accessibleHelpTextStringProperty,
        this.challenge.isAnswerInteractiveProperty
      ),
      cellAriaRoleDescription: BuildAnAtomFluent.a11y.gameScreen.components.periodicTable.cellAriaDescriptionStringProperty
    } );
    this.interactiveAnswerNode.addChild( this.periodicTable );
    this.challenge.isAnswerInteractiveProperty.link( isInteractive => {
      this.periodicTable.enabled = isInteractive;
    } );

    // challenge title
    const challengeTitle = new Text( BuildAnAtomFluent.findTheElementStringProperty, {
      font: TITLE_FONT,
      maxWidth: this.periodicTable.width * 0.9
    } );
    this.challengePresentationNode.addChild( challengeTitle );

    // neutral atom versus ion question
    const neutralVersusIonPrompt = new Text( BuildAnAtomFluent.isItStringProperty, {
      font: new PhetFont( 24 ),
      maxWidth: MAX_WIDTH,
      accessibleParagraph: BuildAnAtomFluent.a11y.gameScreen.components.periodicTable.accessibleParagraphStringProperty
    } );

    const neutralOrIonRadioButtonGroup = new AquaRadioButtonGroup(
      this.neutralOrIonProperty,
      [
        {
          value: 'neutral',
          createNode: () => new Text( BuildAnAtomFluent.neutralAtomStringProperty, {
            font: new PhetFont( 18 ),
            maxWidth: MAX_WIDTH
          } ),
          tandemName: 'neutralAtomRadioButton'
        },
        {
          value: 'ion',
          createNode: () => new Text( BuildAnAtomFluent.ionStringProperty, {
            font: new PhetFont( 18 ),
            maxWidth: MAX_WIDTH
          } ),
          tandemName: 'ionRadioButton'
        }
      ],
      {
        spacing: 10,
        orientation: 'horizontal',
        tandem: tandem.createTandem( 'neutralOrIonRadioButtonGroup' ),
        enabledProperty: this.challenge.isAnswerInteractiveProperty,
        disabledOpacity: 1,
        radioButtonOptions: {
          radius: 8,
          phetioVisiblePropertyInstrumented: false
        },
        visiblePropertyOptions: {
          phetioReadOnly: true
        }
      }
    );

    // If the user focuses on the radio button group without having made a selection, select "neutral" by default.
    // This was part of the accessibility design, to avoid having an empty radio button group, which
    // might make sense for visual users, but not for screen reader users.
    neutralOrIonRadioButtonGroup.addInputListener( {
      focusin: () => {
        if ( this.neutralOrIonProperty.value === 'noSelection' ) {
          this.neutralOrIonProperty.value = 'neutral';
        }
      }
    } );

    this.neutralOrIonQuestion = new HBox( {
      children: [ neutralVersusIonPrompt, neutralOrIonRadioButtonGroup ],
      spacing: 10
    } );
    this.interactiveAnswerNode.addChild( this.neutralOrIonQuestion );

    // If the proton count is 0, then the user cannot select "neutral" or "ion".
    this.protonCountProperty.link( protonCount => {
      this.neutralOrIonQuestion.visible = protonCount > 0;
    } );

    // Don't enable the "check answer" button until the user has answered the "neutral vs. ion" question.
    this.neutralOrIonProperty.link( ( neutralOrIon: NeutralOrIon ) => {
      this.checkButton.enabled = neutralOrIon !== 'noSelection';
      this.checkButton.pickable = neutralOrIon !== 'noSelection';
    } );

    // Handle both 'counts-to-element' and 'schematic-to-element' challenge types
    const elementSymbolProperty = new DerivedStringProperty(
      [ this.challenge.correctAnswerAtom.protonCountProperty ],
      ( protonCount: number ) => {
        return AtomIdentifier.getSpokenSymbol( protonCount );
      }
    );
    const neutralOrIonStringProperty = new DerivedStringProperty(
      [
        this.challenge.correctAnswerAtom.chargeProperty,
        BuildAnAtomFluent.neutralAtomStringProperty,
        BuildAnAtomFluent.ionStringProperty
      ],
      ( charge: number, neutralAtom: string, ion: string ) => {
        return charge === 0 ? neutralAtom : ion;
      }
    );
    const correctAnswerParagraphPattern = this.challenge.challengeType === 'counts-to-element' ?
                                          BuildAnAtomFluent.a11y.gameScreen.challenges.countsToElement.correctAnswerParagraph :
                                          BuildAnAtomFluent.a11y.gameScreen.challenges.schematicToElement.correctAnswerParagraph;
    this.correctAnswerAccessibleParagraphNode.accessibleParagraph = correctAnswerParagraphPattern.createProperty( {
      symbol: elementSymbolProperty,
      neutralOrIon: neutralOrIonStringProperty
    } );

    //--------------------------- Layout -------------------------------------

    this.periodicTable.right = layoutBounds.width - INSET;
    this.periodicTable.centerY = layoutBounds.height * 0.55;

    challengeTitle.boundsProperty.link( () => {
      challengeTitle.centerX = this.periodicTable.centerX;
      challengeTitle.bottom = this.periodicTable.top - 30; // Offset empirically determined.
    } );

    this.neutralOrIonQuestion.boundsProperty.link( () => {
      this.neutralOrIonQuestion.right = this.periodicTable.right;
      this.neutralOrIonQuestion.top = this.periodicTable.bottom + 20;
    } );

    this.answerNodesPDOMOrder = [
      ...this.getAnswerNodesPDOMOrder()
    ];
  }

  public override checkAnswer(): void {
    const userSubmittedAnswer = new AnswerAtom( {
      protonCount: this.protonCountProperty.value,
      neutronCount: this.challenge.correctAnswerAtom.neutronCountProperty.value,
      electronCount: this.challenge.correctAnswerAtom.electronCountProperty.value,
      neutralOrIon: this.neutralOrIonProperty.value
    } );
    this.challenge.checkAnswer( userSubmittedAnswer );
  }

  public override reset(): void {

    // This method can be called before the superconstructor has completed, so the existence of the items being cleared
    // must be checked.
    if ( this.protonCountProperty ) {
      this.protonCountProperty.reset();
    }
    this.neutralOrIonProperty && this.neutralOrIonProperty.reset();
  }

  public override displayCorrectAnswer(): void {

    // Set the local properties to match the correct answer.  This will update the periodic table selection and the
    // neutral/ion radio button group as well as the accessible paragraph.
    this.protonCountProperty.value = this.challenge.correctAnswerAtom.protonCountProperty.value;
    this.neutralOrIonProperty.value = this.challenge.correctAnswerAtom.chargeProperty.value === 0 ? 'neutral' : 'ion';
  }

  public override createAnswerNode(): Node {
    const elementAndIonStringProperty = new DerivedStringProperty(
      [
        this.challenge.correctAnswerAtom.protonCountProperty,
        this.challenge.correctAnswerAtom.chargeProperty
      ],
      ( protonCount: number, charge: number ) => {
        const elementSymbol = AtomIdentifier.getSymbol( protonCount );
        const ionString = charge === 0 ? 'Neutral Atom' : 'Ion';
        return `${this.challenge.challengeType}<br> ${elementSymbol}, ${ionString}`;
      }
    );
    return new RichText( elementAndIonStringProperty, BAAConstants.SHOW_ANSWER_TEXT_OPTIONS );
  }

}

buildAnAtom.register( 'ToElementChallengeView', ToElementChallengeView );

export default ToElementChallengeView;