// Copyright 2025, University of Colorado Boulder
/**
 * Help Section for how to move the particles around.
 *
 * @author Agustín Vallejo
 */

import KeyboardHelpIconFactory from '../../../../scenery-phet/js/keyboard/help/KeyboardHelpIconFactory.js';
import KeyboardHelpSection, { KeyboardHelpSectionOptions } from '../../../../scenery-phet/js/keyboard/help/KeyboardHelpSection.js';
import KeyboardHelpSectionRow from '../../../../scenery-phet/js/keyboard/help/KeyboardHelpSectionRow.js';
import TextKeyNode from '../../../../scenery-phet/js/keyboard/TextKeyNode.js';
import buildAnAtom from '../../buildAnAtom.js';
import BuildAnAtomStrings from '../../BuildAnAtomStrings.js';

/**
 * Help section for how to move the particles around.
 */
export default class ParticleNavigationHelpSection extends KeyboardHelpSection {

  public constructor( options?: KeyboardHelpSectionOptions ) {

    const grabOrRelease = KeyboardHelpSectionRow.labelWithIcon(
      BuildAnAtomStrings.a11y.common.keyboardHelpContent.grabOrReleaseStringProperty,
      KeyboardHelpIconFactory.spaceOrEnter(), {
        labelInnerContent: BuildAnAtomStrings.a11y.common.keyboardHelpContent.grabOrReleaseDescriptionStringProperty
      } );

    const selectParticle = KeyboardHelpSectionRow.labelWithIconList(
      BuildAnAtomStrings.a11y.common.keyboardHelpContent.selectParticleInAtomStringProperty,
      [ KeyboardHelpIconFactory.upDownOrWSKeysRowIcon() ], {
        labelInnerContent: BuildAnAtomStrings.a11y.common.keyboardHelpContent.selectParticleInAtomDescriptionStringProperty
      } );

    const moveParticle = KeyboardHelpSectionRow.labelWithIconList(
      BuildAnAtomStrings.a11y.common.keyboardHelpContent.moveGrabbedParticleStringProperty,
      [ KeyboardHelpIconFactory.upDownOrWSKeysRowIcon() ], {
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

buildAnAtom.register( 'ParticleNavigationHelpSection', ParticleNavigationHelpSection );