// Copyright 2025, University of Colorado Boulder

/**
 * Button icon for the Mass and Charge Level on the Game Screen.
 *
 * @author Agustín Vallejo (PhET Interactive Simulations)
 */

import Property from '../../../../axon/js/Property.js';
import Bounds2 from '../../../../dot/js/Bounds2.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import RichText from '../../../../scenery/js/nodes/RichText.js';
import MassNumberDisplay from '../../atom/view/MassNumberDisplay.js';
import buildAnAtom from '../../buildAnAtom.js';
import ChargeMeter from '../../common/view/ChargeMeter.js';

export default class MassAndChargeLevelIcon extends Node {

  public constructor() {

    const containerNode = new Node( {
      localBounds: new Bounds2( 0, 0, 190, 100 )
    } );

    const massNumberDisplay = new MassNumberDisplay(
      new Property( 1 ),
      {
        showMassReadout: false
      }
    );

    const chargeMeter = new ChargeMeter(
      new Property( 0 ),
      {
        showNumericalReadout: false
      }
    );

    containerNode.addChild( chargeMeter );
    containerNode.addChild( massNumberDisplay );

    chargeMeter.centerX = containerNode.centerX + chargeMeter.height * 0.75;
    massNumberDisplay.centerX = containerNode.centerX;

    chargeMeter.centerY = containerNode.centerY - chargeMeter.height * 0.75;
    massNumberDisplay.centerY = containerNode.centerY + massNumberDisplay.height / 2;

    const levelNumberText = new RichText( '2', { font: new PhetFont( { size: 55, weight: 'bold' } ) } );

    levelNumberText.centerX = containerNode.centerX;
    levelNumberText.top = containerNode.bottom + 30;

    super( {
        children: [ containerNode, levelNumberText ]
      }
    );
  }
}

buildAnAtom.register( 'MassAndChargeLevelIcon', MassAndChargeLevelIcon );