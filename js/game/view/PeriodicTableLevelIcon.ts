// Copyright 2025, University of Colorado Boulder
/**
 * Button icon for the Advanced Symbol Level on the Game Screen.
 *
 * @author Agustín Vallejo
 */

import Shape from '../../../../kite/js/Shape.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import NumberAtom from '../../../../shred/js/model/NumberAtom.js';
import PeriodicTableNode from '../../../../shred/js/view/PeriodicTableNode.js';
import buildAnAtom from '../../buildAnAtom.js';

export default class PeriodicTableLevelIcon extends Node {

  public constructor() {

    const periodicTableNode = new PeriodicTableNode(
      new NumberAtom( { protonCount: 11 } ),
      {
        selectedCellColor: 'yellow'
      }
    );

    super( {
        children: [ periodicTableNode ],
        clipArea: new Shape().rect( 0, 50, 150, 75 ) // In screen coords, which are roughly pixels.
      }
    );
  }
}

buildAnAtom.register( 'PeriodicTableLevelIcon', PeriodicTableLevelIcon );