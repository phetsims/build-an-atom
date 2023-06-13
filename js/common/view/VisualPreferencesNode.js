// Copyright 2020-2023, University of Colorado Boulder

/**
 * Controls for visual options for this sim.
 *
 * @author John Blanco
 * @author Siddhartha Chinthapally (Actual Concepts)
 */

import PreferencesDialog from '../../../../joist/js/preferences/PreferencesDialog.js';
import { Text, VBox } from '../../../../scenery/js/imports.js';
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
      new Text( BuildAnAtomStrings.highContrastParticles, { font: PreferencesDialog.CONTENT_FONT } ), {
        tandem: tandem.createTandem( 'highContrastParticlesCheckbox' )
      } );

    // VBox is used to make it easy to add additional options
    super( {
      children: [ highContrastParticlesCheckbox ],
      spacing: PreferencesDialog.CONTENT_SPACING,
      align: 'left'
    } );
  }
}

buildAnAtom.register( 'VisualPreferencesNode', VisualPreferencesNode );
export default VisualPreferencesNode;