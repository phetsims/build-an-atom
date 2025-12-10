// Copyright 2025, University of Colorado Boulder

/**
 * GameScreenKeyboardHelpContent is the content for the keyboard-help dialog in screen 3.
 *
 * @author Agustín Vallejo
 */

import BasicActionsKeyboardHelpSection from '../../../../scenery-phet/js/keyboard/help/BasicActionsKeyboardHelpSection.js';
import KeyboardHelpIconFactory from '../../../../scenery-phet/js/keyboard/help/KeyboardHelpIconFactory.js';
import KeyboardHelpSection from '../../../../scenery-phet/js/keyboard/help/KeyboardHelpSection.js';
import KeyboardHelpSectionRow from '../../../../scenery-phet/js/keyboard/help/KeyboardHelpSectionRow.js';
import TwoColumnKeyboardHelpContent from '../../../../scenery-phet/js/keyboard/help/TwoColumnKeyboardHelpContent.js';
import GameShortcutsKeyboardHelpSection from '../../../../vegas/js/keyboard/GameShortcutsKeyboardHelpSection.js';
import buildAnAtom from '../../buildAnAtom.js';
import BuildAnAtomStrings from '../../BuildAnAtomStrings.js';
import ParticleNavigationHelpSection from '../../common/view/ParticleNavigationHelpSection.js';

export default class GameScreenKeyboardHelpContent extends TwoColumnKeyboardHelpContent {

  public constructor() {

    const gameShortcutsKeyboardHelpSection = new GameShortcutsKeyboardHelpSection();

    const periodicTableNavigationHelpSection = new KeyboardHelpSection(
      BuildAnAtomStrings.a11y.common.keyboardHelpContent.periodicTableHeadingStringProperty,
      [
        KeyboardHelpSectionRow.labelWithIcon(
          BuildAnAtomStrings.a11y.common.keyboardHelpContent.selectChemicalSymbolStringProperty,
          KeyboardHelpIconFactory.arrowOrWasdKeysRowIcon(), {
            labelInnerContent: BuildAnAtomStrings.a11y.common.keyboardHelpContent.navigateThroughTableDescriptionStringProperty
          } )
      ]
    );

    // sections in the left column
    const leftSections = [
      gameShortcutsKeyboardHelpSection,
      periodicTableNavigationHelpSection,
      new ParticleNavigationHelpSection()
    ];

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

buildAnAtom.register( 'GameScreenKeyboardHelpContent', GameScreenKeyboardHelpContent );