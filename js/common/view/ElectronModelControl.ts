// Copyright 2025, University of Colorado Boulder

/**
 * ElectronModelControl is a panel with a title and a radio button group that allows the user to select - i.e. control -
 * the visual representation of electrons to use in the simulation, either 'shells' or 'cloud'.
 *
 * @author John Blanco (PhET Interactive Simulations)
 */

import Property from '../../../../axon/js/Property.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import WithRequired from '../../../../phet-core/js/types/WithRequired.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import VBox from '../../../../scenery/js/layout/nodes/VBox.js';
import Text from '../../../../scenery/js/nodes/Text.js';
import Color from '../../../../scenery/js/util/Color.js';
import ElectronShellDepiction from '../../../../shred/js/view/ElectronShellDepiction.js';
import AquaRadioButtonGroup from '../../../../sun/js/AquaRadioButtonGroup.js';
import Panel, { PanelOptions } from '../../../../sun/js/Panel.js';
import buildAnAtom from '../../buildAnAtom.js';
import BuildAnAtomFluent from '../../BuildAnAtomFluent.js';
import BuildAnAtomStrings from '../../BuildAnAtomStrings.js';

type SelfOptions = EmptySelfOptions;
type ElectronModelControlOptions = SelfOptions & WithRequired<PanelOptions, 'tandem'>;

// constants
const ELECTRON_MODEL_SELECTOR_FONT = new PhetFont( 12 );
const TITLE_FONT = new PhetFont( {
  size: 14,
  weight: 'bold'
} );
const SPACING = 5;
const TITLE_MAX_WIDTH = 110; // empirically determined
const RADIO_BUTTON_TEXT_MAX_WIDTH = TITLE_MAX_WIDTH - 20; // empirically determined

class ElectronModelControl extends Panel {

  public constructor( electronModelProperty: Property<ElectronShellDepiction>,
                      providedOptions: ElectronModelControlOptions ) {

    const options = optionize<ElectronModelControlOptions, SelfOptions, PanelOptions>()( {
      fill: Color.TRANSPARENT,
      stroke: null,
      xMargin: 0,
      yMargin: 0
    }, providedOptions );

    const radioButtonGroup = new AquaRadioButtonGroup(
      electronModelProperty,
      [
        {
          value: 'shells',
          createNode: () => new Text( BuildAnAtomFluent.shellsStringProperty, {
            font: ELECTRON_MODEL_SELECTOR_FONT,
            maxWidth: RADIO_BUTTON_TEXT_MAX_WIDTH
          } ),
          tandemName: 'shellsRadioButton',
          options: {
            accessibleName: BuildAnAtomStrings.a11y.common.modelToggle.accessibleNameShellsStringProperty
          }
        },
        {
          value: 'cloud',
          createNode: () => new Text( BuildAnAtomFluent.cloudStringProperty, {
            font: ELECTRON_MODEL_SELECTOR_FONT,
            maxWidth: RADIO_BUTTON_TEXT_MAX_WIDTH
          } ),
          tandemName: 'cloudRadioButton',
          options: {
            accessibleName: BuildAnAtomStrings.a11y.common.modelToggle.accessibleNameCloudStringProperty
          }
        }
      ],
      {
        spacing: SPACING,
        orientation: 'vertical',
        align: 'left',
        radioButtonOptions: {
          radius: 6,
          phetioVisiblePropertyInstrumented: false
        },
        tandem: options.tandem.createTandem( 'radioButtonGroup' ),
        accessibleName: BuildAnAtomStrings.a11y.common.modelToggle.accessibleNameStringProperty,
        accessibleHelpText: BuildAnAtomStrings.a11y.common.modelToggle.accessibleHelpTextStringProperty,
        phetioVisiblePropertyInstrumented: false // Clients should hide the entire panel.
      }
    );

    const titleText = new Text( BuildAnAtomFluent.modelStringProperty, {
      font: TITLE_FONT,
      maxWidth: TITLE_MAX_WIDTH
    } );

    const content = new VBox( {
      align: 'left',
      spacing: SPACING,
      children: [ titleText, radioButtonGroup ]
    } );

    super( content, options );
  }
}

buildAnAtom.register( 'ElectronModelControl', ElectronModelControl );
export default ElectronModelControl;