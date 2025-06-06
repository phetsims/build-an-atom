// Copyright 2020-2025, University of Colorado Boulder

/**
 * Controls for visual options for this sim.
 *
 * @author John Blanco
 * @author Siddhartha Chinthapally (Actual Concepts)
 */

import BooleanProperty from '../../../../axon/js/BooleanProperty.js';
import PreferencesDialogConstants from '../../../../joist/js/preferences/PreferencesDialogConstants.js';
import VBox from '../../../../scenery/js/layout/nodes/VBox.js';
import Text from '../../../../scenery/js/nodes/Text.js';
import Checkbox from '../../../../sun/js/Checkbox.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import buildAnAtom from '../../buildAnAtom.js';
import BuildAnAtomStrings from '../../BuildAnAtomStrings.js';

class VisualPreferencesNode extends VBox {

  public constructor( highContrastParticlesProperty: BooleanProperty, tandem: Tandem ) {

    // Add support for turning on high-contrast particles.
    const highContrastParticlesCheckbox = new Checkbox(
      highContrastParticlesProperty,
      new Text( BuildAnAtomStrings.highContrastParticlesStringProperty, { font: PreferencesDialogConstants.CONTENT_FONT } ), {
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