// Copyright 2025, University of Colorado Boulder

/**
 * BAAKeyboardHelpContent is the content for the keyboard-help dialog in screens 1 and 2.
 *
 * @author Agustín Vallejo
 */

import BasicActionsKeyboardHelpSection from '../../../../scenery-phet/js/keyboard/help/BasicActionsKeyboardHelpSection.js';
import KeyboardHelpIconFactory from '../../../../scenery-phet/js/keyboard/help/KeyboardHelpIconFactory.js';
import KeyboardHelpSection, { KeyboardHelpSectionOptions } from '../../../../scenery-phet/js/keyboard/help/KeyboardHelpSection.js';
import KeyboardHelpSectionRow from '../../../../scenery-phet/js/keyboard/help/KeyboardHelpSectionRow.js';
import TwoColumnKeyboardHelpContent, { TwoColumnKeyboardHelpContentOptions } from '../../../../scenery-phet/js/keyboard/help/TwoColumnKeyboardHelpContent.js';
import TextKeyNode from '../../../../scenery-phet/js/keyboard/TextKeyNode.js';
import buildAnAtom from '../../buildAnAtom.js';
import BuildAnAtomStrings from '../../BuildAnAtomStrings.js';

type SelfOptions = {
  extraLeftSectionContent?: BasicActionsKeyboardHelpSection;
};

export type BAAKeyboardHelpContentOptions = SelfOptions & TwoColumnKeyboardHelpContentOptions;

export default class BAAKeyboardHelpContent extends TwoColumnKeyboardHelpContent {

  public constructor( providedOptions: BAAKeyboardHelpContentOptions ) {

    // sections in the left column
    const leftSections = providedOptions.extraLeftSectionContent ? [
        new MoveParticleHelpSection(),
        providedOptions.extraLeftSectionContent
      ] : [ new MoveParticleHelpSection() ];

    // sections in the right column
    const rightSections = [
      new BasicActionsKeyboardHelpSection( {
        withCheckboxContent: true
      } )
    ];

    super( leftSections, rightSections, {
      isDisposable: false
    } );
  }
}

/**
 * Help section for how to move the particles around.
 */
class MoveParticleHelpSection extends KeyboardHelpSection {

  public constructor( options?: KeyboardHelpSectionOptions ) {

    const grabOrRelease = KeyboardHelpSectionRow.labelWithIcon(
      BuildAnAtomStrings.a11y.common.keyboardHelpContent.grabOrReleaseStringProperty,
      KeyboardHelpIconFactory.spaceOrEnter(), {
        labelInnerContent: BuildAnAtomStrings.a11y.common.keyboardHelpContent.grabOrReleaseDescriptionStringProperty
      } );

    // Using a helper function because this element appears twice
    const createArrowsAndWASDIconList = () => {
      const leftRightOrADKeysRowIcon = KeyboardHelpIconFactory.leftRightOrADKeysRowIcon();
      const upDownOrWSKeysRowIcon = KeyboardHelpIconFactory.upDownOrWSKeysRowIcon();
      return [ leftRightOrADKeysRowIcon, upDownOrWSKeysRowIcon ];
    };

    const selectParticle = KeyboardHelpSectionRow.labelWithIconList(
      BuildAnAtomStrings.a11y.common.keyboardHelpContent.selectParticleInAtomStringProperty,
      createArrowsAndWASDIconList(), {
      labelInnerContent: BuildAnAtomStrings.a11y.common.keyboardHelpContent.selectParticleInAtomDescriptionStringProperty
    } );

    const moveParticle = KeyboardHelpSectionRow.labelWithIconList(
      BuildAnAtomStrings.a11y.common.keyboardHelpContent.moveGrabbedParticleStringProperty,
      createArrowsAndWASDIconList(), {
        labelInnerContent: BuildAnAtomStrings.a11y.common.keyboardHelpContent.moveGrabbedParticleDescriptionStringProperty
      } );

    const returnToBucket = KeyboardHelpSectionRow.labelWithIconList(
      BuildAnAtomStrings.a11y.common.keyboardHelpContent.returnToBucketStringProperty,
      [ TextKeyNode.delete(), TextKeyNode.backspace() ], {
        labelInnerContent: BuildAnAtomStrings.a11y.common.keyboardHelpContent.returnToBucketDescriptionStringProperty
      } );

    const cancelMovement = KeyboardHelpSectionRow.labelWithIcon(
      BuildAnAtomStrings.a11y.common.keyboardHelpContent.cancelMovementStringProperty,
      TextKeyNode.esc(), {
        labelInnerContent: BuildAnAtomStrings.a11y.common.keyboardHelpContent.cancelMovementDescriptionStringProperty
      } );

    // all rows contained in a left aligned vbox
    const rows = [ grabOrRelease, selectParticle, moveParticle, returnToBucket, cancelMovement ];

    super( BuildAnAtomStrings.a11y.common.keyboardHelpContent.particleNavigationHeadingStringProperty, rows, options );
  }
}

buildAnAtom.register( 'BAAKeyboardHelpContent', BAAKeyboardHelpContent );