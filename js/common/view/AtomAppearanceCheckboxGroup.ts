// Copyright 2025, University of Colorado Boulder

/**
 * AtomAppearanceCheckboxGroup is a VerticalCheckboxGroup that allows the user to turn on and off various aspects of
 * the atom's appearance.
 *
 * @author John Blanco (PhET Interactive Simulations)
 */

import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import WithRequired from '../../../../phet-core/js/types/WithRequired.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import Text from '../../../../scenery/js/nodes/Text.js';
import ParticleAtom from '../../../../shred/js/model/ParticleAtom.js';
import VerticalCheckboxGroup, { VerticalCheckboxGroupItem, VerticalCheckboxGroupOptions } from '../../../../sun/js/VerticalCheckboxGroup.js';
import buildAnAtom from '../../buildAnAtom.js';
import BuildAnAtomFluent from '../../BuildAnAtomFluent.js';
import BuildAnAtomStrings from '../../BuildAnAtomStrings.js';
import AtomViewProperties from '../../../../shred/js/view/AtomViewProperties.js';
import AtomDescriberAccessibleListNode from './description/AtomDescriberAccessibleListNode.js';

const LABEL_FONT = new PhetFont( 12 );
const LABEL_MAX_WIDTH = 180;
const CHECKBOX_ITEM_TEXT_OPTIONS = {
  font: LABEL_FONT,
  maxWidth: LABEL_MAX_WIDTH
};

type SelfOptions = EmptySelfOptions;
type AtomAppearanceCheckboxGroupOptions = SelfOptions & WithRequired<VerticalCheckboxGroupOptions, 'tandem'>;

class AtomAppearanceCheckboxGroup extends VerticalCheckboxGroup {

  public constructor( atom: ParticleAtom,
                      viewProperties: AtomViewProperties,
                      providedOptions: AtomAppearanceCheckboxGroupOptions ) {

    const options = optionize<AtomAppearanceCheckboxGroupOptions, SelfOptions, VerticalCheckboxGroupOptions>()( {
      checkboxOptions: { boxWidth: 12 },
      spacing: 8,
      phetioFeatured: true,
      visiblePropertyOptions: {
        phetioFeatured: true
      }
    }, providedOptions );

    const checkboxItems: VerticalCheckboxGroupItem[] = [
      {
        createNode: () => new Text( BuildAnAtomFluent.elementStringProperty, CHECKBOX_ITEM_TEXT_OPTIONS ),
        property: viewProperties.elementNameVisibleProperty,
        tandemName: 'elementNameCheckbox',
        options: {
          accessibleName: BuildAnAtomStrings.a11y.common.elementNameCheckbox.accessibleNameStringProperty,
          accessibleHelpText: BuildAnAtomStrings.a11y.common.elementNameCheckbox.accessibleHelpTextStringProperty,
          accessibleContextResponseUnchecked: BuildAnAtomStrings.a11y.common.elementNameCheckbox.accessibleContextResponseUncheckedStringProperty,

          accessibleContextResponseChecked: AtomDescriberAccessibleListNode.createElementNameContextResponse(
            atom.protonCountProperty,
            atom.elementNameStringProperty
          )
        }
      },
      {
        createNode: () => new Text( BuildAnAtomFluent.neutralSlashIonStringProperty, CHECKBOX_ITEM_TEXT_OPTIONS ),
        property: viewProperties.neutralAtomOrIonVisibleProperty,
        tandemName: 'neutralAtomOrIonCheckbox',
        options: {
          accessibleName: BuildAnAtomStrings.a11y.common.neutralAtomIonCheckbox.accessibleNameStringProperty,
          accessibleHelpText: BuildAnAtomStrings.a11y.common.neutralAtomIonCheckbox.accessibleHelpTextStringProperty,
          accessibleContextResponseUnchecked: BuildAnAtomStrings.a11y.common.neutralAtomIonCheckbox.accessibleContextResponseUncheckedStringProperty,

          accessibleContextResponseChecked: AtomDescriberAccessibleListNode.createNeutralOrIonContextResponse(
            atom.protonCountProperty,
            atom.chargeProperty
          )
        }
      },
      {
        createNode: () => new Text( BuildAnAtomFluent.stableSlashUnstableStringProperty, CHECKBOX_ITEM_TEXT_OPTIONS ),
        property: viewProperties.nuclearStabilityVisibleProperty,
        tandemName: 'nuclearStabilityCheckbox',
        options: {
          accessibleName: BuildAnAtomStrings.a11y.common.nuclearStabilityCheckbox.accessibleNameStringProperty,
          accessibleHelpText: BuildAnAtomStrings.a11y.common.nuclearStabilityCheckbox.accessibleHelpTextStringProperty,
          accessibleContextResponseUnchecked: BuildAnAtomStrings.a11y.common.nuclearStabilityCheckbox.accessibleContextResponseUncheckedStringProperty,

          accessibleContextResponseChecked: AtomDescriberAccessibleListNode.createStabilityContextResponse(
            atom.protonCountProperty,
            atom.nucleusStableProperty
          )
        }
      }
    ];

    super( checkboxItems, options );
  }
}

buildAnAtom.register( 'AtomAppearanceCheckboxGroup', AtomAppearanceCheckboxGroup );
export default AtomAppearanceCheckboxGroup;