// Copyright 2020, University of Colorado Boulder

/**
 * Global options shown in the "Options" dialog from the PhET Menu
 *
 * @author John Blanco
 * @author Siddhartha Chinthapally (Actual Concepts)
 */

import OptionsDialog from '../../../../joist/js/OptionsDialog.js';
import Text from '../../../../scenery/js/nodes/Text.js';
import VBox from '../../../../scenery/js/nodes/VBox.js';
import Checkbox from '../../../../sun/js/Checkbox.js';
import buildAnAtomStrings from '../../buildAnAtomStrings.js';
import buildAnAtom from '../../buildAnAtom.js';

class GlobalOptionsNode extends VBox {

  /**
   * @param {BooleanProperty} highContrastParticlesProperty
   * @param {Tandem} tandem
   */
  constructor( highContrastParticlesProperty, tandem ) {

    // Add support for turning on high-contrast particles.
    const highContrastParticlesCheckbox = new Checkbox(
      new Text( buildAnAtomStrings.highContrastParticles, { font: OptionsDialog.DEFAULT_FONT } ),
      highContrastParticlesProperty,
      {
        tandem: tandem.createTandem( 'highContrastParticlesCheckbox' )
      }
    );

    // VBox is used to make it easy to add additional options
    super( {
      children: [ highContrastParticlesCheckbox ],
      spacing: OptionsDialog.DEFAULT_SPACING,
      align: 'left'
    } );

    // @private
    this.disposeGlobalOptionsNode = () => {
      highContrastParticlesCheckbox.dispose();
    };
  }

  /**
   * @public
   * @override
   */
  dispose() {
    this.disposeGlobalOptionsNode();
    super.dispose();
  }
}

buildAnAtom.register( 'GlobalOptionsNode', GlobalOptionsNode );
export default GlobalOptionsNode;