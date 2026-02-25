// Copyright 2025, University of Colorado Boulder

/**
 * BAAKeyboardHelpContent is the content for the keyboard help dialog in screens 1 and 2.
 *
 * @author Agustín Vallejo (PhET Interactive Simulations)
 */

import BasicActionsKeyboardHelpSection from '../../../../scenery-phet/js/keyboard/help/BasicActionsKeyboardHelpSection.js';
import TwoColumnKeyboardHelpContent from '../../../../scenery-phet/js/keyboard/help/TwoColumnKeyboardHelpContent.js';
import buildAnAtom from '../../buildAnAtom.js';
import ParticleNavigationHelpSection from './ParticleNavigationHelpSection.js';

export default class BAAKeyboardHelpContent extends TwoColumnKeyboardHelpContent {

  public constructor() {

    // sections in the left column
    const leftSections = [ new ParticleNavigationHelpSection() ];

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

buildAnAtom.register( 'BAAKeyboardHelpContent', BAAKeyboardHelpContent );