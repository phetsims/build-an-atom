// Copyright 2025-2026, University of Colorado Boulder

/**
 * Button icon for the Advanced Symbol Level on the Game Screen.
 *
 * @author Agustín Vallejo
 */

import NumberProperty from '../../../../axon/js/NumberProperty.js';
import Shape from '../../../../kite/js/Shape.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import RichText from '../../../../scenery/js/nodes/RichText.js';
import PeriodicTableNode from '../../../../shred/js/view/PeriodicTableNode.js';
import buildAnAtom from '../../buildAnAtom.js';

export default class PeriodicTableLevelIcon extends Node {

  public constructor() {

    // Encompassing the periodic table with a node to use clipping.
    const periodicTableNode = new Node( {
      children: [
        new PeriodicTableNode( new NumberProperty( 11 ), {
          selectedCellColor: 'yellow',
          accessibleVisible: false
        } )
      ],
      clipArea: new Shape().rect( 0, 50, 150, 75 ) // In screen coords, which are roughly pixels.
    } );

    const levelNumberText = new RichText( '1', { font: new PhetFont( { size: 38, weight: 'bold' } ) } );

    levelNumberText.centerX = periodicTableNode.centerX;
    levelNumberText.top = periodicTableNode.bottom + 10;

    super( {
        children: [ periodicTableNode, levelNumberText ]
      }
    );
  }
}

buildAnAtom.register( 'PeriodicTableLevelIcon', PeriodicTableLevelIcon );