// Copyright 2025, University of Colorado Boulder

/**
 * ElectronModelSelectorPanel is a panel with a title and a radio button group that allows the user to select the
 * electron model to use in the simulation.
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
import { ElectronShellDepiction } from '../../../../shred/js/view/AtomNode.js';
import AquaRadioButtonGroup from '../../../../sun/js/AquaRadioButtonGroup.js';
import Panel, { PanelOptions } from '../../../../sun/js/Panel.js';
import buildAnAtom from '../../buildAnAtom.js';
import BuildAnAtomStrings from '../../BuildAnAtomStrings.js';

type SelfOptions = EmptySelfOptions;
type ElectronModelSelectorPanelOptions = SelfOptions & WithRequired<PanelOptions, 'tandem'>;

// constants
const ELECTRON_MODEL_SELECTOR_FONT = new PhetFont( 12 );
const TITLE_FONT = new PhetFont( {
  size: 14,
  weight: 'bold'
} );
const SPACING = 5;

class ElectronModelSelectorPanel extends Panel {

  public constructor( electronModelProperty: Property<ElectronShellDepiction>,
                      providedOptions: ElectronModelSelectorPanelOptions ) {

    const options = optionize<ElectronModelSelectorPanelOptions, SelfOptions, PanelOptions>()( {
      fill: Color.TRANSPARENT,
      stroke: null,
      xMargin: 0,
      yMargin: 0,
      maxWidth: 100 // determined empirically
    }, providedOptions );

    const radioButtonGroup = new AquaRadioButtonGroup(
      electronModelProperty,
      [
        {
          value: 'orbits',
          createNode: () => new Text( BuildAnAtomStrings.orbitsStringProperty, {
            font: ELECTRON_MODEL_SELECTOR_FONT
          } ),
          tandemName: 'orbitsRadioButton'
        },
        {
          value: 'cloud',
          createNode: () => new Text( BuildAnAtomStrings.cloudStringProperty, {
            font: ELECTRON_MODEL_SELECTOR_FONT
          } ),
          tandemName: 'cloudRadioButton'
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
        maxWidth: 100, // determined empirically
        tandem: options.tandem.createTandem( 'radioButtonGroup' ),
        phetioVisiblePropertyInstrumented: false // Clients should hide the entire panel.
      }
    );

    const titleText = new Text( BuildAnAtomStrings.modelStringProperty, {
      font: TITLE_FONT
    } );

    const content = new VBox( {
      align: 'left',
      spacing: SPACING,
      children: [ titleText, radioButtonGroup ]
    } );

    super( content, options );
  }
}

buildAnAtom.register( 'ElectronModelSelectorPanel', ElectronModelSelectorPanel );
export default ElectronModelSelectorPanel;