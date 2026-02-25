// Copyright 2025-2026, University of Colorado Boulder
/**
 * Descriptions for the atom view checkboxes.
 * This file is a collection of methods for creating natural language descriptions of the state of the atom view.
 *
 * @author Agustín Vallejo (PhET Interactive Simulations)
 */

import DerivedProperty from '../../../../../axon/js/DerivedProperty.js';
import DerivedStringProperty from '../../../../../axon/js/DerivedStringProperty.js';
import { TReadOnlyProperty } from '../../../../../axon/js/TReadOnlyProperty.js';
import AccessibleListNode from '../../../../../scenery-phet/js/accessibility/AccessibleListNode.js';
import Node from '../../../../../scenery/js/nodes/Node.js';
import AtomIdentifier from '../../../../../shred/js/AtomIdentifier.js';
import NumberAtom, { TReadOnlyNumberAtom } from '../../../../../shred/js/model/NumberAtom.js';
import ParticleAtom from '../../../../../shred/js/model/ParticleAtom.js';
import ShredFluent from '../../../../../shred/js/ShredFluent.js';
import AtomViewProperties from '../../../../../shred/js/view/AtomViewProperties.js';
import ParticleCountsAccessibleListNode from '../../../../../shred/js/view/description/ParticleCountsAccessibleListNode.js';
import ElectronShellDepiction from '../../../../../shred/js/view/ElectronShellDepiction.js';
import buildAnAtom from '../../../buildAnAtom.js';
import BuildAnAtomFluent from '../../../BuildAnAtomFluent.js';

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
          accessibleHeading: ShredFluent.a11y.particleCounts.accessibleHeadingStringProperty,
          children: [
            new ParticleCountsAccessibleListNode( atom )
          ]
        } )
      ]
    } );
  }

  public static createNonInteractiveAtomListNode( atom: NumberAtom ): Node {
    return new Node( {
      children: [
        new AtomStateAccessibleListNode( atom, AtomViewProperties.everythingOffAtomViewProperties ),
        new Node( {
          accessibleHeading: ShredFluent.a11y.particleCounts.accessibleHeadingStringProperty,
          children: [
            new ParticleCountsAccessibleListNode( atom )
          ]
        } )
      ],
      accessibleHeading: BuildAnAtomFluent.a11y.common.atomAccessibleListNode.builtAtomStringProperty
    } );
  }

  public static createElementNameSentence(
    protonCountProperty: TReadOnlyProperty<number>
  ): TReadOnlyProperty<string> {
    return BuildAnAtomFluent.a11y.common.elementNameCheckbox.contextResponseSelector.createProperty( {
      hasName: protonCountProperty.derived( count => count > 0 ? 'true' : 'false' ),
      name: AtomIdentifier.createDynamicNameProperty( protonCountProperty )
    } );
  }

  public static createNeutralOrIonSentence(
    protonCountProperty: TReadOnlyProperty<number>,
    chargeProperty: TReadOnlyProperty<number>
  ): TReadOnlyProperty<string> {
    return new DerivedStringProperty(
      [
        protonCountProperty,
        chargeProperty,
        BuildAnAtomFluent.a11y.common.neutralAtomIonCheckbox.neutralAtomStringProperty,
        BuildAnAtomFluent.a11y.common.neutralAtomIonCheckbox.positiveIonStringProperty,
        BuildAnAtomFluent.a11y.common.neutralAtomIonCheckbox.negativeIonStringProperty,
        BuildAnAtomFluent.a11y.common.noElementContextResponseStringProperty
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

  public static createStabilitySentence(
    protonCountProperty: TReadOnlyProperty<number>,
    isStableProperty: TReadOnlyProperty<boolean>
  ): TReadOnlyProperty<string> {
    return BuildAnAtomFluent.a11y.common.nuclearStabilityCheckbox.hasNucleusSelector.createProperty( {
      hasNucleus: protonCountProperty.derived( count => count > 0 ? 'true' : 'false' ),
      isStable: isStableProperty.derived( stable => stable ? 'true' : 'false' )
    } );
  }
}

class AtomStateAccessibleListNode extends AccessibleListNode {
  public constructor(
    atom: TReadOnlyNumberAtom | NumberAtom,
    viewProperties: AtomViewProperties
  ) {
    const nucleusContainsProperty = BuildAnAtomFluent.a11y.common.atomAccessibleListNode.nucleusContains.createProperty( {
      nucleonState: new DerivedProperty( [ atom.protonCountProperty, atom.neutronCountProperty ], ( protons, neutrons ) => {
        return ( protons > 0 && neutrons > 0 ) ? 'full' :
               ( protons > 0 ) ? 'protons' :
               ( neutrons > 0 ) ? 'neutrons' : 'empty';
      } ),
      protons: atom.protonCountProperty,
      neutrons: atom.neutronCountProperty
    } );

    const innerElectronCountProperty = new DerivedProperty( [ atom.electronCountProperty ], electrons => Math.min( 2, electrons ) );
    const outerElectronCountProperty = new DerivedProperty( [ atom.electronCountProperty ], electrons => Math.max( 0, electrons - 2 ) );

    const electronsStateProperty = new DerivedStringProperty(
      [
        viewProperties.electronModelProperty,
        atom.electronCountProperty,
        // Shell contains N Electrons
        BuildAnAtomFluent.a11y.common.atomAccessibleListNode.shellInfoFull.createProperty( {
          inner: innerElectronCountProperty, outer: outerElectronCountProperty
        } ),
        // Cloud contains N Electrons
        BuildAnAtomFluent.a11y.common.atomAccessibleListNode.cloudInfoFull.createProperty( {
          value: atom.electronCountProperty
        } ),
        BuildAnAtomFluent.a11y.common.atomAccessibleListNode.shellInfoEmptyStringProperty,
        BuildAnAtomFluent.a11y.common.atomAccessibleListNode.cloudInfoEmptyStringProperty
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
        BuildAnAtomFluent.a11y.common.modelToggle.accessibleNameShellsStringProperty,
        BuildAnAtomFluent.a11y.common.modelToggle.accessibleNameCloudStringProperty
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

    const elementNameListItemProperty = AtomDescriberAccessibleListNode.createElementNameSentence(
      atom.protonCountProperty
    );

    const neutralOrIonListItemProperty = AtomDescriberAccessibleListNode.createNeutralOrIonSentence(
      atom.protonCountProperty,
      atom.chargeProperty
    );

    const stabilityListItemProperty = AtomDescriberAccessibleListNode.createStabilitySentence(
      atom.protonCountProperty,
      atom.nucleusStableProperty
    );

    const hasProtonsProperty = new DerivedProperty( [ atom.protonCountProperty ], protons => protons > 0 );

    const visibleAndHasProtons = ( visibleProperty: TReadOnlyProperty<boolean> ) => {
      return DerivedProperty.and( [ visibleProperty, hasProtonsProperty ] );
    };

    const elementNameVisibleProperty = visibleAndHasProtons( viewProperties.elementNameVisibleProperty );
    const neutralAtomOrIonVisibleProperty = visibleAndHasProtons( viewProperties.neutralAtomOrIonVisibleProperty );
    const nuclearStabilityVisibleProperty = visibleAndHasProtons( viewProperties.nuclearStabilityVisibleProperty );

    const oneOrMoreItemsVisibleProperty = DerivedProperty.or( [
      elementNameVisibleProperty,
      neutralAtomOrIonVisibleProperty,
      nuclearStabilityVisibleProperty
    ] );

    super(
      [
        { stringProperty: elementNameListItemProperty, visibleProperty: elementNameVisibleProperty },
        { stringProperty: neutralOrIonListItemProperty, visibleProperty: neutralAtomOrIonVisibleProperty },
        { stringProperty: stabilityListItemProperty, visibleProperty: nuclearStabilityVisibleProperty }
      ],
      {
        leadingParagraphStringProperty: BuildAnAtomFluent.a11y.common.atomAccessibleListNode.checkboxesListLeadingParagraphStringProperty,
        leadingParagraphVisibleProperty: oneOrMoreItemsVisibleProperty
      }
    );
  }
}

buildAnAtom.register( 'AtomDescriberAccessibleListNode', AtomDescriberAccessibleListNode );

export default AtomDescriberAccessibleListNode;