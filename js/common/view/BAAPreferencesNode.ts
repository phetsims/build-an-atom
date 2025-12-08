// Copyright 2025, University of Colorado Boulder

/**
 * BAAPreferencesNode is the user interface for sim-specific preferences, accessed via the "Simulation" tab of the
 * Preferences dialog. These preferences are global and affect all screens.
 *
 * @author John Blanco (PhET Interactive Simulations)
 */

import MathSymbols from '../../../../scenery-phet/js/MathSymbols.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import GridBox from '../../../../scenery/js/layout/nodes/GridBox.js';
import Text from '../../../../scenery/js/nodes/Text.js';
import { ChargeNotation } from '../../../../shred/js/model/ChargeNotation.js';
import AquaRadioButtonGroup, { AquaRadioButtonGroupItem } from '../../../../sun/js/AquaRadioButtonGroup.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import buildAnAtom from '../../buildAnAtom.js';
import BuildAnAtomStrings from '../../BuildAnAtomStrings.js';
import BAAPreferences from '../model/BAAPreferences.js';

const FONT_SIZE = 18;
const TEXT_FONT = new PhetFont( FONT_SIZE );
const LABEL_FONT = new PhetFont( { size: FONT_SIZE, weight: 'bold' } );
const RADIO_BUTTON_LABEL_OPTIONS = { font: TEXT_FONT, maxWidth: 200 };

export default class BAAPreferencesNode extends GridBox {

  public constructor( preferences: BAAPreferences, tandem: Tandem ) {

    const label = new Text( BuildAnAtomStrings.chargeNotationStringProperty, { font: LABEL_FONT } );

    const radioButtonItems: AquaRadioButtonGroupItem<ChargeNotation>[] = [
      {
        value: 'signLast',
        createNode: () => new Text( `n${MathSymbols.PLUS_MINUS}`, RADIO_BUTTON_LABEL_OPTIONS ),
        options: {
          accessibleName: BuildAnAtomStrings.a11y.preferences.signLast.accessibleNameStringProperty
        },
        tandemName: 'signLastRadioButton'
      },
      {
        value: 'signFirst',
        createNode: () => new Text( `${MathSymbols.PLUS_MINUS}n`, RADIO_BUTTON_LABEL_OPTIONS ),
        options: {
          accessibleName: BuildAnAtomStrings.a11y.preferences.signFirst.accessibleNameStringProperty
        },
        tandemName: 'signFirstRadioButton'
      }
    ];

    const radioButtonGroup = new AquaRadioButtonGroup<ChargeNotation>(
      preferences.chargeNotationProperty,
      radioButtonItems,
      {
        orientation: 'horizontal',
        spacing: 15,
        radioButtonOptions: {
          phetioVisiblePropertyInstrumented: false
        },
        phetioVisiblePropertyInstrumented: false,
        tandem: tandem.createTandem( 'radioButtonGroup' )
      }
    );

    super( {
      rows: [
        [ label, radioButtonGroup ],
        [ new Text( BuildAnAtomStrings.preferences.chargeNotationSelectorLabelStringProperty, { font: TEXT_FONT } ), null ]
      ],
      xAlign: 'left',
      xSpacing: 50,
      ySpacing: 5,
      accessibleHelpText: BuildAnAtomStrings.a11y.preferences.accessibleHelpTextStringProperty
    } );
  }
}

buildAnAtom.register( 'BAAPreferencesNode', BAAPreferencesNode );