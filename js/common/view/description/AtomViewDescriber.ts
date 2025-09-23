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
        BuildAnAtomStrings.a11y.atomScreen.elementNameCheckbox.accessibleContextResponseCheckedStringProperty,
        BuildAnAtomStrings.a11y.atomScreen.noElementContextResponseStringProperty
      ],
      (
        elementNameString: string,
        checkedStringPattern: string,
        noElementString: string
      ) => {
        if ( elementNameString === '' ) {
          // TODO: Add this to translated strings https://github.com/phetsims/build-an-atom/issues/351
          return noElementString;
        }
        else {
          return StringUtils.fillIn( checkedStringPattern, { name: elementNameString } );
        }
      }
    );
  }

  public static createNeutralOrIonContextResponse(
    protonCountProperty: TReadOnlyProperty<number>,
    chargeProperty: TReadOnlyProperty<number>
  ): TReadOnlyProperty<string> {
    return new DerivedStringProperty(
      [
        protonCountProperty,
        chargeProperty,
        BuildAnAtomStrings.a11y.atomScreen.neutralAtomIonCheckbox.neutralAtomStringProperty,
        BuildAnAtomStrings.a11y.atomScreen.neutralAtomIonCheckbox.positiveIonStringProperty,
        BuildAnAtomStrings.a11y.atomScreen.neutralAtomIonCheckbox.negativeIonStringProperty,
        BuildAnAtomStrings.a11y.atomScreen.noElementContextResponseStringProperty
      ],
      (
        protons: number,
        charge: number,
        neutralAtomString: string,
        positiveIonString: string,
        negativeIonString: string,
        noElementString: string
      ) => {
        if ( protons > 0 ) {
          return charge > 0 ? positiveIonString : charge < 0 ? negativeIonString : neutralAtomString;
        }
        else {
          return noElementString;
        }
      }
    );
  }
}

buildAnAtom.register( 'AtomViewDescriber', AtomViewDescriber );

export default AtomViewDescriber;