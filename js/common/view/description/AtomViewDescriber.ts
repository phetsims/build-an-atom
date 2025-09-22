// Copyright 2025, University of Colorado Boulder
/**
 * Descriptions for the atom view checkboxes.
 * This file is a collection of methods for creating natural language descriptions of the sate of the atom view.
 *
 * @author Agustín Vallejo
 */

import DerivedStringProperty from '../../../../../axon/js/DerivedStringProperty.js';
import { TReadOnlyProperty } from '../../../../../axon/js/TReadOnlyProperty.js';
import StringUtils from '../../../../../phetcommon/js/util/StringUtils.js';
import buildAnAtom from '../../../buildAnAtom.js';
import BuildAnAtomStrings from '../../../BuildAnAtomStrings.js';

class AtomViewDescriber {

  private constructor() {
    // Not intended for instantiation.
  }

  public static createElementNameContextResponse(
    elementNameStringProperty: TReadOnlyProperty<string>
  ): TReadOnlyProperty<string> {
    return new DerivedStringProperty(
      [
        elementNameStringProperty,
        BuildAnAtomStrings.a11y.atomScreen.elementNameCheckbox.accessibleContextResponseCheckedStringProperty
      ],
      (
        elementNameString: string,
        checkedStringPattern: string
      ) => {
        if ( elementNameString === '' ) {
          // TODO: Add this to translated strings https://github.com/phetsims/build-an-atom/issues/351
          return 'No element yet';
        }
        else {
          return StringUtils.fillIn( checkedStringPattern, { name: elementNameString } );
        }
      }
    );
  }

}

buildAnAtom.register( 'AtomViewDescriber', AtomViewDescriber );

export default AtomViewDescriber;