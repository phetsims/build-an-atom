// Copyright 2017-2025, University of Colorado Boulder

/**
 * constants shared between one or more files
 *
 * @author John Blanco
 */

import BooleanProperty from '../../../axon/js/BooleanProperty.js';
import Random from '../../../dot/js/Random.js';
import Vector2 from '../../../dot/js/Vector2.js';
import PhetFont from '../../../scenery-phet/js/PhetFont.js';
import { RichTextOptions } from '../../../scenery/js/nodes/RichText.js';
import Color from '../../../scenery/js/util/Color.js';
import ShredConstants from '../../../shred/js/ShredConstants.js';
import { AccordionBoxOptions } from '../../../sun/js/AccordionBox.js';
import buildAnAtom from '../buildAnAtom.js';

export const RANDOM = new Random( {
  seed: 1 // Seed will be changed by the GameMode.
} );

class BAAConstants {

  private constructor() {
    // Not intended for instantiation.
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
  public static readonly SHOW_ANSWER_TEXT_OPTIONS = {
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

  // BooleanProperties that are never expected to change, for use in Property links.
  public static readonly ALWAYS_TRUE_PROPERTY = new BooleanProperty( true, { validValues: [ true ] } );
  public static readonly ALWAYS_FALSE_PROPERTY = new BooleanProperty( false, { validValues: [ false ] } );
}

buildAnAtom.register( 'BAAConstants', BAAConstants );

export default BAAConstants;