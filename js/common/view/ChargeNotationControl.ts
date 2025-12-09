// Copyright 2025, University of Colorado Boulder

/**
 * ChargeNotationControl is the user interface for controlling the "charge notation" preference for the Build an Atom
 * sim.
 *
 * @author John Blanco (PhET Interactive Simulations)
 */

import StringUnionProperty from '../../../../axon/js/StringUnionProperty.js';
import PreferencesControl from '../../../../joist/js/preferences/PreferencesControl.js';
import MathSymbols from '../../../../scenery-phet/js/MathSymbols.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import RichText from '../../../../scenery/js/nodes/RichText.js';
import Text from '../../../../scenery/js/nodes/Text.js';
import { ChargeNotation } from '../../../../shred/js/model/ChargeNotation.js';
import AquaRadioButtonGroup, { AquaRadioButtonGroupItem } from '../../../../sun/js/AquaRadioButtonGroup.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import buildAnAtom from '../../buildAnAtom.js';
import BuildAnAtomStrings from '../../BuildAnAtomStrings.js';
import BAAPreferencesNode from './BAAPreferencesNode.js';

const FONT_SIZE = 18;
const TEXT_FONT = new PhetFont( FONT_SIZE );
const LABEL_FONT = new PhetFont( { size: FONT_SIZE, weight: 'bold' } );
const DESCRIPTION_FONT = new PhetFont( FONT_SIZE );
const RADIO_BUTTON_LABEL_OPTIONS = { font: TEXT_FONT, maxWidth: 200 };

class ChargeNotationControl extends PreferencesControl {

  public constructor( chargeNotationProperty: StringUnionProperty<ChargeNotation>, tandem: Tandem ) {

    const labelText = new Text( BuildAnAtomStrings.chargeNotationStringProperty, {
      font: LABEL_FONT,
      maxWidth: 360
    } );

    const descriptionText = new RichText( BuildAnAtomStrings.preferences.chargeNotationSelectorLabelStringProperty, {
      font: DESCRIPTION_FONT,
      lineWrap: 'stretch' as const
    } );

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
      chargeNotationProperty,
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
      labelNode: labelText,
      controlNode: radioButtonGroup,
      descriptionNode: descriptionText,
      phetioFeatured: true,
      phetioVisiblePropertyInstrumented: false,
      tandem: tandem
    } );
  }
}

export default ChargeNotationControl;
buildAnAtom.register( 'BAAPreferencesNode', BAAPreferencesNode );