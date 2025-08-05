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

const QUESTION_PROMPT_OPTIONS: RichTextOptions = {
  replaceNewlines: true,
  align: 'left',
  font: new PhetFont( 24 ),
  maxWidth: 140,
  maxHeight: 100
};

const ACCORDION_BOX_BUTTON_DILATION = 12;

const ACCORDION_BOX_OPTIONS: AccordionBoxOptions = {
  cornerRadius: 3,
  fill: ShredConstants.DISPLAY_PANEL_BACKGROUND_COLOR,
  contentAlign: 'left',
  titleAlignX: 'left',
  buttonAlign: 'left',
  expandCollapseButtonOptions: {
    touchAreaXDilation: ACCORDION_BOX_BUTTON_DILATION,
    touchAreaYDilation: ACCORDION_BOX_BUTTON_DILATION
  }
};

const BAAConstants = {
  RESET_BUTTON_RADIUS: 20,
  MAX_CHALLENGE_ATTEMPTS: 2, // Note: Attempt is the same as a submission in BAAGameChallenge.
  ALWAYS_TRUE_PROPERTY: new BooleanProperty( true ),
  ALWAYS_FALSE_PROPERTY: new BooleanProperty( false ),
  NUMBER_OF_GAME_LEVELS: 4,
  PARTICLE_TOUCH_DRAG_OFFSET: new Vector2( 0, -20 ),
  QUESTION_PROMPT_OPTIONS: QUESTION_PROMPT_OPTIONS,
  SHOW_ANSWER_TEXT_OPTIONS: {
    fill: Color.RED,
    font: new PhetFont( 16 )
  },
  ACCORDION_BOX_OPTIONS: ACCORDION_BOX_OPTIONS
};

BAAConstants.ALWAYS_TRUE_PROPERTY.lazyLink( () => assert && assert( false, 'this value should not be changed' ) );
BAAConstants.ALWAYS_FALSE_PROPERTY.lazyLink( () => assert && assert( false, 'this value should not be changed' ) );

buildAnAtom.register( 'BAAConstants', BAAConstants );

export default BAAConstants;