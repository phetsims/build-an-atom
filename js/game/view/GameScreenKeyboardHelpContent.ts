// Copyright 2025, University of Colorado Boulder

/**
 * GameScreenKeyboardHelpContent is the content for the keyboard-help dialog in the Game screen.
 *
 * @author Agustín Vallejo
 */

import KeyboardHelpIconFactory from '../../../../scenery-phet/js/keyboard/help/KeyboardHelpIconFactory.js';
import KeyboardHelpSection, { KeyboardHelpSectionOptions } from '../../../../scenery-phet/js/keyboard/help/KeyboardHelpSection.js';
import KeyboardHelpSectionRow from '../../../../scenery-phet/js/keyboard/help/KeyboardHelpSectionRow.js';
import buildAnAtom from '../../buildAnAtom.js';
import BuildAnAtomStrings from '../../BuildAnAtomStrings.js';
import BAAKeyboardHelpContent from '../../common/view/BAAKeyboardHelpContent.js';

export default class GameScreenKeyboardHelpContent extends BAAKeyboardHelpContent {

  public constructor() {
    super( {
      extraLeftSectionContent: new PeriodicTableHelpSection()
    } );
  }
}


/**
 * Help section for how to move the particles around.
 */
class PeriodicTableHelpSection extends KeyboardHelpSection {

  public constructor( options?: KeyboardHelpSectionOptions ) {

    const navigateThroughTable = KeyboardHelpSectionRow.labelWithIcon(
      BuildAnAtomStrings.a11y.common.keyboardHelpContent.navigateThroughTableStringProperty,
      KeyboardHelpIconFactory.arrowOrWasdKeysRowIcon(), {
        labelInnerContent: BuildAnAtomStrings.a11y.common.keyboardHelpContent.navigateThroughTableDescriptionStringProperty
      } );

    const selectChemicalSymbol = KeyboardHelpSectionRow.labelWithIcon(
      BuildAnAtomStrings.a11y.common.keyboardHelpContent.selectChemicalSymbolStringProperty,
      KeyboardHelpIconFactory.spaceOrEnter(), {
        labelInnerContent: BuildAnAtomStrings.a11y.common.keyboardHelpContent.selectChemicalSymbolDescriptionStringProperty
      } );

    // all rows contained in a left aligned vbox
    const rows = [ navigateThroughTable, selectChemicalSymbol ];

    super( BuildAnAtomStrings.a11y.common.keyboardHelpContent.particleNavigationHeadingStringProperty, rows, options );
  }
}

buildAnAtom.register( 'GameScreenKeyboardHelpContent', GameScreenKeyboardHelpContent );