// Copyright 2025, University of Colorado Boulder
/**
 * Descriptions for the atom view checkboxes.
 * This file is a collection of methods for creating natural language descriptions of the state of the atom view.
 *
 * @author Agustín Vallejo
 */

import DerivedProperty from '../../../../../axon/js/DerivedProperty.js';
import DerivedStringProperty from '../../../../../axon/js/DerivedStringProperty.js';
import { TReadOnlyProperty } from '../../../../../axon/js/TReadOnlyProperty.js';
import StringUtils from '../../../../../phetcommon/js/util/StringUtils.js';
import AccessibleListNode from '../../../../../scenery-phet/js/accessibility/AccessibleListNode.js';
import Node from '../../../../../scenery/js/nodes/Node.js';
import ParticleAtom from '../../../../../shred/js/model/ParticleAtom.js';
import ShredStrings from '../../../../../shred/js/ShredStrings.js';
import { ElectronShellDepiction } from '../../../../../shred/js/view/AtomNode.js';
import ParticleCountsAccessibleListNode from '../../../../../shred/js/view/description/ParticleCountsAccessibleListNode.js';
import buildAnAtom from '../../../buildAnAtom.js';
import BuildAnAtomFluent from '../../../BuildAnAtomFluent.js';
import BuildAnAtomStrings from '../../../BuildAnAtomStrings.js';
import AtomViewProperties from '../AtomViewProperties.js';

class AtomDescriberAccessibleListNode extends Node {
  public constructor(
    atom: ParticleAtom,
    viewProperties: AtomViewProperties
  ) {
    super( {
      children: [
        new AtomStateAccessibleListNode( atom, viewProperties ),
        new CheckboxesAccessibleListNode( atom, viewProperties ),
        new Node( {
          accessibleHeading: ShredStrings.a11y.particleCounts.accessibleHeadingStringProperty,
          children: [
            new ParticleCountsAccessibleListNode( atom )
          ]
        } )
      ]
    } );
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
          return StringUtils.fillIn( checkedStringPattern, { name: StringUtils.capitalize( elementNameString ) } );
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

class AtomStateAccessibleListNode extends AccessibleListNode {
  public constructor(
    atom: ParticleAtom,
    viewProperties: AtomViewProperties
  ) {
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

    const innerElectronCountProperty = new DerivedProperty( [ atom.electronCountProperty ], electrons => Math.min( 2, electrons ) );
    const outerElectronCountProperty = new DerivedProperty( [ atom.electronCountProperty ], electrons => Math.max( 0, electrons - 2 ) );

    const electronsStateProperty = new DerivedStringProperty(
      [
        viewProperties.electronModelProperty,
        atom.electronCountProperty,
        // Shell contains N electrons
        BuildAnAtomFluent.a11y.common.atomAccessibleListNode.shellInfoFull.createProperty( {
          inner: innerElectronCountProperty, outer: outerElectronCountProperty
        } ),
        // Cloud contains N electrons
        BuildAnAtomFluent.a11y.common.atomAccessibleListNode.cloudInfoFull.createProperty( {
          value: atom.electronCountProperty
        } ),
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
          return electronModel === 'shells' ? shellInfoFullString : cloudInfoFullString;
        }
        else {
          return electronModel === 'shells' ? shellInfoEmptyString : cloudInfoEmptyString;
        }
      }
    );

    const shellsOrCloudStringProperty = new DerivedStringProperty(
      [
        viewProperties.electronModelProperty,
        BuildAnAtomStrings.a11y.common.modelToggle.accessibleNameShellsStringProperty,
        BuildAnAtomStrings.a11y.common.modelToggle.accessibleNameCloudStringProperty
      ],
      (
        electronModel: ElectronShellDepiction,
        shells: string,
        cloud: string
      ) => {
        return electronModel === 'shells' ? shells : cloud;
      } );

    const leadingParagraphStringProperty =
      BuildAnAtomFluent.a11y.common.atomAccessibleListNode.atomStateLeadingParagraph.createProperty( {
        model: shellsOrCloudStringProperty
      } );

    super( [
      nucleusContainsProperty,
      electronsStateProperty
    ], {
      leadingParagraphStringProperty: leadingParagraphStringProperty
    } );
  }
}


class CheckboxesAccessibleListNode extends AccessibleListNode {
  public constructor(
    atom: ParticleAtom,
    viewProperties: AtomViewProperties
  ) {

    const elementNameListItemProperty = AtomDescriberAccessibleListNode.createElementNameContextResponse(
      atom.protonCountProperty,
      atom.elementNameStringProperty
    );

    const neutralOrIonListItemProperty = AtomDescriberAccessibleListNode.createNeutralOrIonContextResponse(
      atom.protonCountProperty,
      atom.chargeProperty
    );

    const stabilityListItemProperty = AtomDescriberAccessibleListNode.createStabilityContextResponse(
      atom.protonCountProperty,
      atom.nucleusStableProperty
    );

    const hasProtonsProperty = new DerivedProperty( [ atom.protonCountProperty ], protons => protons > 0 );

    const visibleAndHasProtons = ( visibleProperty: TReadOnlyProperty<boolean> ) => {
      return DerivedProperty.and( [ visibleProperty, hasProtonsProperty ] );
    };

    super( [
      { stringProperty: elementNameListItemProperty, visibleProperty: visibleAndHasProtons( viewProperties.elementNameVisibleProperty ) },
      { stringProperty: neutralOrIonListItemProperty, visibleProperty: visibleAndHasProtons( viewProperties.neutralAtomOrIonVisibleProperty ) },
      { stringProperty: stabilityListItemProperty, visibleProperty: visibleAndHasProtons( viewProperties.nuclearStabilityVisibleProperty ) }
    ], {
      leadingParagraphStringProperty: BuildAnAtomStrings.a11y.common.atomAccessibleListNode.checkboxesListLeadingParagraphStringProperty,
      leadingParagraphVisibleProperty: hasProtonsProperty
    } );
  }
}

buildAnAtom.register( 'AtomDescriberAccessibleListNode', AtomDescriberAccessibleListNode );

export default AtomDescriberAccessibleListNode;