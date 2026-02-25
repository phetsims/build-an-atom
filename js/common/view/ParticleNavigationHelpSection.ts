// Copyright 2025, University of Colorado Boulder
/**
 * Help Section for how to move the particles around.
 *
 * @author Agustín Vallejo (PhET Interactive Simulations)
 */

import KeyboardHelpSection, { KeyboardHelpSectionOptions } from '../../../../scenery-phet/js/keyboard/help/KeyboardHelpSection.js';
import KeyboardHelpSectionRow from '../../../../scenery-phet/js/keyboard/help/KeyboardHelpSectionRow.js';
import buildAnAtom from '../../buildAnAtom.js';
import BuildAnAtomFluent from '../../BuildAnAtomFluent.js';
import BAAParticleKeyboardListener from './BAAParticleKeyboardListener.js';

/**
 * Help section for how to move the particles around.
 */
export default class ParticleNavigationHelpSection extends KeyboardHelpSection {

  public constructor( options?: KeyboardHelpSectionOptions ) {
    const grabOrRelease = KeyboardHelpSectionRow.fromHotkeyData( BAAParticleKeyboardListener.GRAB_OR_RELEASE_HOTKEY_DATA );
    const selectParticle = KeyboardHelpSectionRow.fromHotkeyData( BAAParticleKeyboardListener.SELECT_HOTKEY_DATA );
    const moveParticle = KeyboardHelpSectionRow.fromHotkeyData( BAAParticleKeyboardListener.MOVE_HOTKEY_DATA );
    const returnToBucket = KeyboardHelpSectionRow.fromHotkeyData( BAAParticleKeyboardListener.RETURN_TO_BUCKET_HOTKEY_DATA );
    const cancelMovement = KeyboardHelpSectionRow.fromHotkeyData( BAAParticleKeyboardListener.CANCEL_MOVEMENT_HOTKEY_DATA );

    // all rows contained in a left aligned vbox
    const rows = [ grabOrRelease, selectParticle, moveParticle, returnToBucket, cancelMovement ];

    super( BuildAnAtomFluent.keyboardHelpContent.particleNavigationHeadingStringProperty, rows, options );
  }
}

buildAnAtom.register( 'ParticleNavigationHelpSection', ParticleNavigationHelpSection );