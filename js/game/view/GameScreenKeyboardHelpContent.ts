// Copyright 2025, University of Colorado Boulder

/**
 * GameScreenKeyboardHelpContent is the content for the keyboard-help dialog in screen 3.
 *
 * @author Agustín Vallejo
 */

import BasicActionsKeyboardHelpSection from '../../../../scenery-phet/js/keyboard/help/BasicActionsKeyboardHelpSection.js';
import TwoColumnKeyboardHelpContent from '../../../../scenery-phet/js/keyboard/help/TwoColumnKeyboardHelpContent.js';
import PeriodicTableControlsKeyboardHelpSection from '../../../../shred/js/view/PeriodicTableControlsKeyboardHelpSection.js';
import GameShortcutsKeyboardHelpSection from '../../../../vegas/js/keyboard/GameShortcutsKeyboardHelpSection.js';
import buildAnAtom from '../../buildAnAtom.js';
import ParticleNavigationHelpSection from '../../common/view/ParticleNavigationHelpSection.js';

export default class GameScreenKeyboardHelpContent extends TwoColumnKeyboardHelpContent {

  public constructor() {

    // sections in the left column
    const leftSections = [
      new GameShortcutsKeyboardHelpSection(),
      new PeriodicTableControlsKeyboardHelpSection(),
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