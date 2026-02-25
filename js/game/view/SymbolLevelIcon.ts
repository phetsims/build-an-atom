// Copyright 2025, University of Colorado Boulder

/**
 * Button icon for the Symbol Level on the Game Screen.
 *
 * @author Agustín Vallejo (PhET Interactive Simulations)
 */

import Vector2 from '../../../../dot/js/Vector2.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import Rectangle from '../../../../scenery/js/nodes/Rectangle.js';
import RichText from '../../../../scenery/js/nodes/RichText.js';
import Text from '../../../../scenery/js/nodes/Text.js';
import buildAnAtom from '../../buildAnAtom.js';
import BAAColors from '../../common/BAAColors.js';

// constants
const SYMBOL_BOX_WIDTH = 275; // In screen coords, which are roughly pixels.
const SYMBOL_BOX_HEIGHT = 300; // In screen coords, which are roughly pixels.
const NUMBER_FONT = new PhetFont( 56 );
const NUMBER_INSET = 15; // In screen coords, which are roughly pixels.

export default class SymbolLevelIcon extends Node {

  public constructor() {

    // Add the bounding box, which is also the root node for everything else
    // that comprises this node.
    const boundingBox = new Rectangle( 0, 0, SYMBOL_BOX_WIDTH, SYMBOL_BOX_HEIGHT, 0, 0, {
      stroke: 'black',
      lineWidth: 4,
      fill: 'white'
    } );

    // Add the symbol text.
    const symbolText = new Text( 'H', {
      font: new PhetFont( 150 ),
      fill: 'black',
      center: new Vector2( SYMBOL_BOX_WIDTH / 2, SYMBOL_BOX_HEIGHT / 2 )
    } );
    boundingBox.addChild( symbolText );

    const protonCountDisplay = new Text( '1', {
      font: NUMBER_FONT,
      fill: BAAColors.protonColorProperty,
      left: NUMBER_INSET,
      bottom: SYMBOL_BOX_HEIGHT - NUMBER_INSET
    } );
    boundingBox.addChild( protonCountDisplay );

    const massNumberDisplay = new Text( '1', {
      font: NUMBER_FONT,
      fill: 'black',
      left: NUMBER_INSET,
      top: NUMBER_INSET
    } );
    boundingBox.addChild( massNumberDisplay );

    const chargeNumberDisplay = new Text( '?', {
      font: NUMBER_FONT,
      fill: 'black',
      right: SYMBOL_BOX_WIDTH - NUMBER_INSET,
      top: NUMBER_INSET
    } );
    boundingBox.addChild( chargeNumberDisplay );

    boundingBox.setScaleMagnitude( 0.5 );

    const levelNumberText = new RichText( '3', { font: new PhetFont( { size: 70, weight: 'bold' } ) } );

    levelNumberText.centerX = boundingBox.centerX;
    levelNumberText.top = boundingBox.bottom + 10;

    super( {
        children: [ boundingBox, levelNumberText ]
      }
    );
  }
}

buildAnAtom.register( 'SymbolLevelIcon', SymbolLevelIcon );