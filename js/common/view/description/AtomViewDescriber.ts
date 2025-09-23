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
    protonCountProperty: TReadOnlyProperty<number>,
    elementNameStringProperty: TReadOnlyProperty<string>
  ): TReadOnlyProperty<string> {
    return new DerivedStringProperty(
      [
        protonCountProperty,
        elementNameStringProperty,
        BuildAnAtomStrings.a11y.atomScreen.elementNameCheckbox.accessibleContextResponseCheckedStringProperty,
        BuildAnAtomStrings.a11y.atomScreen.noElementContextResponseStringProperty
      ],
      (
        protonCount: number,
        elementNameString: string,
        checkedStringPattern: string,
        noElementString: string
      ) => {
        if ( protonCount > 0 ) {
          return StringUtils.fillIn( checkedStringPattern, { name: elementNameString } );
        }
        else {
          return noElementString;
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

  public static createStabilityContextResponse(
    protonCountProperty: TReadOnlyProperty<number>,
    isStableProperty: TReadOnlyProperty<boolean>
  ): TReadOnlyProperty<string> {
    return new DerivedStringProperty(
      [
        protonCountProperty,
        isStableProperty,
        BuildAnAtomStrings.a11y.atomScreen.nuclearStabilityCheckbox.accessibleContextResponseCheckedStringProperty,
        BuildAnAtomStrings.a11y.atomScreen.nuclearStabilityCheckbox.stableStringProperty,
        BuildAnAtomStrings.a11y.atomScreen.nuclearStabilityCheckbox.unstableStringProperty,
        BuildAnAtomStrings.a11y.atomScreen.noElementContextResponseStringProperty
      ],
      (
        protons: number,
        isStable: boolean,
        nucleusStabilityPattern: string,
        stableString: string,
        unstableString: string,
        noElementString: string
      ) => {
        if ( protons > 0 ) {
          return StringUtils.fillIn( nucleusStabilityPattern, { stability: isStable ? stableString : unstableString } );
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