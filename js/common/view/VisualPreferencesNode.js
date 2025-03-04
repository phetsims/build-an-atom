// Copyright 2020-2025, University of Colorado Boulder

/**
 * Controls for visual options for this sim.
 *
 * @author John Blanco
 * @author Siddhartha Chinthapally (Actual Concepts)
 */

import PreferencesDialogConstants from '../../../../joist/js/preferences/PreferencesDialogConstants.js';
import VBox from '../../../../scenery/js/layout/nodes/VBox.js';
import Text from '../../../../scenery/js/nodes/Text.js';
import Checkbox from '../../../../sun/js/Checkbox.js';
import buildAnAtom from '../../buildAnAtom.js';
import BuildAnAtomStrings from '../../BuildAnAtomStrings.js';

class VisualPreferencesNode extends VBox {

  /**
   * @param {BooleanProperty} highContrastParticlesProperty
   * @param {Tandem} tandem
   */
  constructor( highContrastParticlesProperty, tandem ) {

    // Add support for turning on high-contrast particles.
    const highContrastParticlesCheckbox = new Checkbox(
      highContrastParticlesProperty,
      new Text( BuildAnAtomStrings.highContrastParticles, { font: PreferencesDialogConstants.CONTENT_FONT } ), {
        tandem: tandem.createTandem( 'highContrastParticlesCheckbox' )
      } );

    // VBox is used to make it easy to add additional options
    super( {
      children: [ highContrastParticlesCheckbox ],
      spacing: PreferencesDialogConstants.CONTENT_SPACING,
      align: 'left'
    } );
  }
}

buildAnAtom.register( 'VisualPreferencesNode', VisualPreferencesNode );
export default VisualPreferencesNode;