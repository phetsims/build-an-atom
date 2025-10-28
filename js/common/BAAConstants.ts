// Copyright 2017-2025, University of Colorado Boulder

/**
 * constants shared between one or more files
 *
 * @author John Blanco
 */

import BooleanProperty from '../../../axon/js/BooleanProperty.js';
import Vector2 from '../../../dot/js/Vector2.js';
import StringUtils from '../../../phetcommon/js/util/StringUtils.js';
import MathSymbols from '../../../scenery-phet/js/MathSymbols.js';
import PhetFont from '../../../scenery-phet/js/PhetFont.js';
import { RichTextOptions } from '../../../scenery/js/nodes/RichText.js';
import Color from '../../../scenery/js/util/Color.js';
import AtomIdentifier from '../../../shred/js/AtomIdentifier.js';
import ShredConstants from '../../../shred/js/ShredConstants.js';
import { AccordionBoxOptions } from '../../../sun/js/AccordionBox.js';
import buildAnAtom from '../buildAnAtom.js';
import BuildAnAtomStrings from '../BuildAnAtomStrings.js';

class BAAConstants {

  private constructor() {
    // Not intended for instantiation.
  }

  public static chargeToStringSignBeforeValue( charge: number, showPlus = true ): string {
    return charge < 0 ? MathSymbols.MINUS + `${Math.abs( charge )}` :
           charge > 0 ? showPlus ? MathSymbols.PLUS + `${charge}` : `${charge}` :
           '0';
  }

  public static chargeToStringSignAfterValue( charge: number, showPlus = true ): string {
    return charge < 0 ? `${Math.abs( charge )}` + MathSymbols.MINUS :
           charge > 0 ? showPlus ? `${charge}` + MathSymbols.PLUS : `${charge}` :
           '0';
  }

  // Formats the chemical symbol so a screen reader can read it properly. For example "He" becomes "upper H e"
  // It's important to note that this function uses the StringProperty value directly, so it will not update
  // automatically with locale changes. It should be called again to get the updated value.
  public static getMathSpeakSymbol( protonCount: number ): string {
    const symbol = AtomIdentifier.getSymbol( protonCount );
    return StringUtils.fillIn(
      BuildAnAtomStrings.a11y.common.mathSpeakUpperStringProperty.value,
      { symbol: symbol.split( '' ).join( ' ' ) }
    );
  }

  public static readonly RESET_BUTTON_RADIUS = 20;
  public static readonly PARTICLE_TOUCH_DRAG_OFFSET = new Vector2( 0, -20 );
  public static readonly NUMBER_OF_GAME_LEVELS = 4;
  public static readonly QUESTION_PROMPT_OPTIONS: RichTextOptions = {
    replaceNewlines: true,
    align: 'left',
    font: new PhetFont( 24 ),
    maxWidth: 140,
    maxHeight: 100
  };
  public static readonly SHOW_ANSWER_TEXT_OPTIONS: RichTextOptions = {
    fill: Color.RED,
    font: new PhetFont( 16 )
  };
  public static readonly ACCORDION_BOX_OPTIONS: AccordionBoxOptions = {
    cornerRadius: 3,
    fill: ShredConstants.DISPLAY_PANEL_BACKGROUND_COLOR,
    contentAlign: 'left',
    titleAlignX: 'left',
    buttonAlign: 'left',
    expandCollapseButtonOptions: {
      touchAreaXDilation: 12,
      touchAreaYDilation: 12
    }
  };

  public static readonly ALWAYS_FALSE_PROPERTY = new BooleanProperty( false, { validValues: [ false ] } );

  // Vertical offset used in SchematicTo* challenges for the atom node
  public static readonly ATOM_VERTICAL_OFFSET = 20;
}

buildAnAtom.register( 'BAAConstants', BAAConstants );

export default BAAConstants;