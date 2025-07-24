// Copyright 2025, University of Colorado Boulder
/**
 * Screen icon for the Symbol screen.
 *
 * @author Agustín Vallejo
 */

import ScreenIcon, { MINIMUM_HOME_SCREEN_ICON_SIZE } from '../../../../joist/js/ScreenIcon.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import Rectangle from '../../../../scenery/js/nodes/Rectangle.js';
import NumberAtom from '../../../../shred/js/model/NumberAtom.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import buildAnAtom from '../../buildAnAtom.js';
import BAAColors from '../../common/BAAColors.js';
import InteractiveSymbolNode from '../../game/view/InteractiveSymbolNode.js';

export default class SymbolScreenIcon extends ScreenIcon {

  public constructor( tandem: Tandem ) {

    const iconNode = new Node();

    const backgroundNode = new Rectangle( 0, 0, MINIMUM_HOME_SCREEN_ICON_SIZE.width, MINIMUM_HOME_SCREEN_ICON_SIZE.height, {
      fill: BAAColors.symbolsScreenBackgroundColorProperty,
      stroke: null
    } );
    iconNode.addChild( backgroundNode );

    // Add the schematic representation of the atom.
    const symbolNode = new InteractiveSymbolNode(
      new NumberAtom( { protonCount: 3, neutronCount: 4, electronCount: 2 } ),
      tandem.createTandem( 'symbolNode' ),
      {
        interactiveProtonCount: false,
        interactiveCharge: false,
        interactiveMassNumber: false,
        showAtomName: false,
        excludeInvisibleChildrenFromBounds: true
      }
    );

    symbolNode.center = backgroundNode.center;

    iconNode.addChild( symbolNode );

    super(
      iconNode,
      {
        tandem: tandem,
        maxIconWidthProportion: 1,
        maxIconHeightProportion: 1
      }
    );
  }
}

buildAnAtom.register( 'SymbolScreenIcon', SymbolScreenIcon );