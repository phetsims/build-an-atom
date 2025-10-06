// Copyright 2025, University of Colorado Boulder
/**
 * Descriptions for the atom view checkboxes.
 * This file is a collection of methods for creating natural language descriptions of the sate of the atom view.
 *
 * @author Agustín Vallejo
 */

import DerivedProperty from '../../../../../axon/js/DerivedProperty.js';
import DerivedStringProperty from '../../../../../axon/js/DerivedStringProperty.js';
import { TReadOnlyProperty } from '../../../../../axon/js/TReadOnlyProperty.js';
import StringUtils from '../../../../../phetcommon/js/util/StringUtils.js';
import AccessibleListNode from '../../../../../scenery-phet/js/accessibility/AccessibleListNode.js';
import ParticleAtom from '../../../../../shred/js/model/ParticleAtom.js';
import { ElectronShellDepiction } from '../../../../../shred/js/view/AtomNode.js';
import buildAnAtom from '../../../buildAnAtom.js';
import BuildAnAtomStrings from '../../../BuildAnAtomStrings.js';
import AtomViewProperties from '../AtomViewProperties.js';

class AtomViewDescriber {

  private constructor() {
    // Not intended for instantiation.
  }

  public static createAccessibleListNode(
    atom: ParticleAtom,
    viewProperties: AtomViewProperties
  ): AccessibleListNode {

    const nucleusContainsProperty = new DerivedStringProperty(
      [
        atom.protonCountProperty,
        atom.neutronCountProperty,
        BuildAnAtomStrings.a11y.common.atomAccessibleListNode.nucleusInfoFullStringProperty,
        BuildAnAtomStrings.a11y.common.atomAccessibleListNode.nucleusInfoEmptyStringProperty,
        BuildAnAtomStrings.a11y.common.atomAccessibleListNode.protonsStringProperty,
        BuildAnAtomStrings.a11y.common.atomAccessibleListNode.neutronsStringProperty,
        BuildAnAtomStrings.a11y.common.atomAccessibleListNode.protonsAndNeutronsStringProperty
      ],
      (
        protons: number,
        neutrons: number,
        nucleusInfoFullString: string,
        nucleusEmptyString: string,
        protonsString: string,
        neutronsString: string,
        protonsAndNeutronsString: string
      ) => {
        if ( protons > 0 ) {
          if ( neutrons > 0 ) {
            return StringUtils.fillIn( nucleusInfoFullString, { particles: protonsAndNeutronsString } );
          }
          else {
            return StringUtils.fillIn( nucleusInfoFullString, { particles: protonsString } );
          }
        }
        else {
          if ( neutrons > 0 ) {
            return StringUtils.fillIn( nucleusInfoFullString, { particles: neutronsString } );
          }
          else {
            return nucleusEmptyString;
          }
        }
      } );

    const electronsStateProperty = new DerivedStringProperty(
      [
        viewProperties.electronModelProperty,
        atom.electronCountProperty,
        BuildAnAtomStrings.a11y.common.atomAccessibleListNode.shellInfoFullStringProperty,
        BuildAnAtomStrings.a11y.common.atomAccessibleListNode.cloudInfoFullStringProperty,
        BuildAnAtomStrings.a11y.common.atomAccessibleListNode.shellInfoEmptyStringProperty,
        BuildAnAtomStrings.a11y.common.atomAccessibleListNode.cloudInfoEmptyStringProperty
      ],
      (
        electronModel: ElectronShellDepiction,
        electrons: number,
        shellInfoFullString: string,
        cloudInfoFullString: string,
        shellInfoEmptyString: string,
        cloudInfoEmptyString: string
      ) => {
        if ( electrons > 0 ) {
          return electronModel === 'shells' ?
                 StringUtils.fillIn( shellInfoFullString, {
                   inner: Math.min( 2, electrons ), outer: Math.max( 0, electrons - 2 )
                 } ) :
                 StringUtils.fillIn( cloudInfoFullString, { value: electrons } );
        }
        else {
          return electronModel === 'shells' ? shellInfoEmptyString : cloudInfoEmptyString;
        }
      }
    );

    const elementNameListItemProperty = this.createElementNameContextResponse(
      atom.protonCountProperty,
      atom.elementNameStringProperty
    );

    const neutralOrIonListItemProperty = this.createNeutralOrIonContextResponse(
      atom.protonCountProperty,
      atom.chargeProperty
    );

    const stabilityListItemProperty = this.createStabilityContextResponse(
      atom.protonCountProperty,
      atom.nucleusStableProperty
    );

    const hasProtonsProperty = new DerivedProperty( [ atom.protonCountProperty ], protons => protons > 0 );

    const visibleAndHasProtons = ( visibleProperty: TReadOnlyProperty<boolean> ) => {
      return DerivedProperty.and( [ visibleProperty, hasProtonsProperty ] );
    };

    return new AccessibleListNode( [
      nucleusContainsProperty,
      electronsStateProperty,
      { stringProperty: elementNameListItemProperty, visibleProperty: visibleAndHasProtons( viewProperties.elementNameVisibleProperty ) },
      { stringProperty: neutralOrIonListItemProperty, visibleProperty: visibleAndHasProtons( viewProperties.neutralAtomOrIonVisibleProperty ) },
      { stringProperty: stabilityListItemProperty, visibleProperty: visibleAndHasProtons( viewProperties.nuclearStabilityVisibleProperty ) }
    ] );
  }

  public static createElementNameContextResponse(
    protonCountProperty: TReadOnlyProperty<number>,
    elementNameStringProperty: TReadOnlyProperty<string>
  ): TReadOnlyProperty<string> {
    return new DerivedStringProperty(
      [
        protonCountProperty,
        elementNameStringProperty,
        BuildAnAtomStrings.a11y.common.elementNameCheckbox.accessibleContextResponseCheckedStringProperty,
        BuildAnAtomStrings.a11y.common.noElementContextResponseStringProperty
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
        BuildAnAtomStrings.a11y.common.neutralAtomIonCheckbox.neutralAtomStringProperty,
        BuildAnAtomStrings.a11y.common.neutralAtomIonCheckbox.positiveIonStringProperty,
        BuildAnAtomStrings.a11y.common.neutralAtomIonCheckbox.negativeIonStringProperty,
        BuildAnAtomStrings.a11y.common.noElementContextResponseStringProperty
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
        BuildAnAtomStrings.a11y.common.nuclearStabilityCheckbox.accessibleContextResponseCheckedStringProperty,
        BuildAnAtomStrings.a11y.common.nuclearStabilityCheckbox.stableStringProperty,
        BuildAnAtomStrings.a11y.common.nuclearStabilityCheckbox.unstableStringProperty,
        BuildAnAtomStrings.a11y.common.noElementContextResponseStringProperty
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