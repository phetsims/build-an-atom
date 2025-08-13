// Copyright 2025, University of Colorado Boulder

/**
 * Screen icon for the Symbol screen.
 *
 * @author Agustín Vallejo
 */

import ScreenIcon, { MINIMUM_HOME_SCREEN_ICON_SIZE } from '../../../../joist/js/ScreenIcon.js';
import Rectangle from '../../../../scenery/js/nodes/Rectangle.js';
import NumberAtom from '../../../../shred/js/model/NumberAtom.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import buildAnAtom from '../../buildAnAtom.js';
import BAAColors from '../../common/BAAColors.js';
import InteractiveSymbolNode from '../../game/view/InteractiveSymbolNode.js';

export default class SymbolScreenIcon extends ScreenIcon {

  public constructor() {

    const backgroundNode = new Rectangle( 0, 0, MINIMUM_HOME_SCREEN_ICON_SIZE.width, MINIMUM_HOME_SCREEN_ICON_SIZE.height, {
      fill: BAAColors.symbolsScreenBackgroundColorProperty,
      stroke: null
    } );

    // Add the schematic representation of the atom.
    const symbolNode = new InteractiveSymbolNode(
      new NumberAtom( { protonCount: 3, neutronCount: 4, electronCount: 2 } ),
      {
        isProtonCountInteractive: false,
        isChargeInteractive: false,
        isMassNumberInteractive: false,
        showAtomName: false,
        excludeInvisibleChildrenFromBounds: true,
        tandem: Tandem.OPT_OUT
      }
    );

    symbolNode.center = backgroundNode.center;

    backgroundNode.addChild( symbolNode );

    super(
      backgroundNode,
      {
        maxIconWidthProportion: 1,
        maxIconHeightProportion: 1
      }
    );
  }
}

buildAnAtom.register( 'SymbolScreenIcon', SymbolScreenIcon );