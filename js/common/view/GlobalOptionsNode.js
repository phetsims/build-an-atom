// Copyright 2020-2022, University of Colorado Boulder

/**
 * Global options shown in the "Options" dialog from the PhET Menu
 *
 * @author John Blanco
 * @author Siddhartha Chinthapally (Actual Concepts)
 */

import PreferencesDialog from '../../../../joist/js/preferences/PreferencesDialog.js';
import { Text, VBox } from '../../../../scenery/js/imports.js';
import Checkbox from '../../../../sun/js/Checkbox.js';
import buildAnAtom from '../../buildAnAtom.js';
import buildAnAtomStrings from '../../buildAnAtomStrings.js';

class GlobalOptionsNode extends VBox {

  /**
   * @param {BooleanProperty} highContrastParticlesProperty
   * @param {Tandem} tandem
   */
  constructor( highContrastParticlesProperty, tandem ) {

    // Add support for turning on high-contrast particles.
    const highContrastParticlesCheckbox = new Checkbox(
      highContrastParticlesProperty,
      new Text( buildAnAtomStrings.highContrastParticles, { font: PreferencesDialog.CONTENT_FONT } ), {
        tandem: tandem.createTandem( 'highContrastParticlesCheckbox' )
      } );

    // VBox is used to make it easy to add additional options
    super( {
      children: [ highContrastParticlesCheckbox ],
      spacing: PreferencesDialog.CONTENT_SPACING,
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