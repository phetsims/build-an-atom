// Copyright 2025, University of Colorado Boulder

/**
 * BAAPreferencesNode is the user interface for sim-specific preferences, accessed via the "Simulation" tab of the
 * Preferences dialog. These preferences are global and affect all screens.
 *
 * @author John Blanco (PhET Interactive Simulations)
 */

import MathSymbols from '../../../../scenery-phet/js/MathSymbols.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import Text from '../../../../scenery/js/nodes/Text.js';
import AquaRadioButtonGroup, { AquaRadioButtonGroupItem } from '../../../../sun/js/AquaRadioButtonGroup.js';
import buildAnAtom from '../../buildAnAtom.js';
import BuildAnAtomStrings from '../../BuildAnAtomStrings.js';
import BAAPreferences from '../model/BAAPreferences.js';
import { ChargeNotation } from '../model/ChargeNotation.js';
import VBox from '../../../../scenery/js/layout/nodes/VBox.js';
import Tandem from '../../../../tandem/js/Tandem.js';

const RADIO_BUTTON_LABEL_OPTIONS = {
  font: new PhetFont( 20 ),
  maxWidth: 200
};

export default class BAAPreferencesNode extends VBox {

  public constructor( preferences: BAAPreferences, tandem: Tandem ) {

    // TODO: See https://github.com/phetsims/build-an-atom/issues/434.  Make translatable and add description.
    const label = new Text( BuildAnAtomStrings.chargeNotationStringProperty, {
      fontSize: 16,
      fontWeight: 'bold'
    } );

    const radioButtonItems: AquaRadioButtonGroupItem<ChargeNotation>[] = [
      {
        value: 'signLast',
        createNode: () => new Text( `n${MathSymbols.PLUS_MINUS}`, RADIO_BUTTON_LABEL_OPTIONS ),
        options: {
          accessibleName: 'TBD'
        },
        tandemName: 'signLastRadioButton'
      },
      {
        value: 'signFirst',
        createNode: () => new Text( `${MathSymbols.PLUS_MINUS}n`, RADIO_BUTTON_LABEL_OPTIONS ),
        options: {
          accessibleName: 'TBD'
        },
        tandemName: 'signLastRadioButton'
      }
    ];

    const radioButtonGroup = new AquaRadioButtonGroup<ChargeNotation>(
      preferences.chargeNotationProperty,
      radioButtonItems,
      {
        orientation: 'vertical',
        spacing: 5,
        radioButtonOptions: {
          phetioVisiblePropertyInstrumented: false
        },
        phetioVisiblePropertyInstrumented: false,
        tandem: tandem.createTandem( 'radioButtonGroup' )
      }
    );

    super( {
      children: [ label, radioButtonGroup ],
      spacing: 10,
      align: 'left'
    } );
  }
}

buildAnAtom.register( 'BAAPreferencesNode', BAAPreferencesNode );