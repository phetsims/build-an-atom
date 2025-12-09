// Copyright 2025, University of Colorado Boulder

/**
 * BAAPreferencesNode is the user interface for sim-specific preferences, accessed via the "Simulation" tab of the
 * Preferences dialog. These preferences are global and affect all screens.
 *
 * @author John Blanco (PhET Interactive Simulations)
 */

import VBox from '../../../../scenery/js/layout/nodes/VBox.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import buildAnAtom from '../../buildAnAtom.js';
import BAAPreferences from '../model/BAAPreferences.js';
import ChargeNotationControl from './ChargeNotationControl.js';

export default class BAAPreferencesNode extends VBox {

  public constructor( preferences: BAAPreferences, tandem: Tandem ) {

    const chargeNotationControl = new ChargeNotationControl(
      preferences.chargeNotationProperty,
      tandem.createTandem( 'chargeNotationControl' )
    );

    super( {
      children: [ chargeNotationControl ],
      isDisposable: false,
      align: 'left',
      spacing: 30,
      phetioVisiblePropertyInstrumented: false
    } );
  }
}

buildAnAtom.register( 'BAAPreferencesNode', BAAPreferencesNode );