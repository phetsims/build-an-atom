// Copyright 2025, University of Colorado Boulder
/**
 * Button icon for the Advanced Symbol Level on the Game Screen.
 *
 * @author Agustín Vallejo
 */

import Vector2 from '../../../../dot/js/Vector2.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import Rectangle from '../../../../scenery/js/nodes/Rectangle.js';
import Text from '../../../../scenery/js/nodes/Text.js';
import buildAnAtom from '../../buildAnAtom.js';

// constants
const SYMBOL_BOX_WIDTH = 275; // In screen coords, which are roughly pixels.
const SYMBOL_BOX_HEIGHT = 300; // In screen coords, which are roughly pixels.

export default class AdvancedSymbolLevelIcon extends Node {

  public constructor() {

    // Add the bounding box, which is also the root node for everything else
    // that comprises this node.
    const boundingBox = new Rectangle( 0, 0, SYMBOL_BOX_WIDTH, SYMBOL_BOX_HEIGHT, 0, 0, {
      stroke: 'black',
      lineWidth: 4,
      fill: 'white'
    } );

    // Add the symbol text.
    const symbolText = new Text( '?', {
      font: new PhetFont( 250 ),
      fill: 'black',
      center: new Vector2( SYMBOL_BOX_WIDTH / 2, SYMBOL_BOX_HEIGHT / 2 )
    } );
    boundingBox.addChild( symbolText );

    super( {
        children: [ boundingBox ]
      }
    );
  }
}

buildAnAtom.register( 'AdvancedSymbolLevelIcon', AdvancedSymbolLevelIcon );