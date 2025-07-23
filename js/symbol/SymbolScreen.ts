// Copyright 2017-2025, University of Colorado Boulder

/**
 * The 'Build an Atom' screen in the 'Build an Atom' simulation. Conforms to the contract specified in joist/Screen.
 *
 * @author John Blanco
 */

import Screen from '../../../joist/js/Screen.js';
import ScreenIcon from '../../../joist/js/ScreenIcon.js';
import Image from '../../../scenery/js/nodes/Image.js';
import Tandem from '../../../tandem/js/Tandem.js';
import elementIcon_png from '../../images/elementIcon_png.js';
import elementIconSmall_png from '../../images/elementIconSmall_png.js';
import buildAnAtom from '../buildAnAtom.js';
import BuildAnAtomStrings from '../BuildAnAtomStrings.js';
import BAAColors from '../common/BAAColors.js';
import BAAModel from '../common/model/BAAModel.js';
import SymbolScreenView from './view/SymbolScreenView.js';

class SymbolScreen extends Screen<BAAModel, SymbolScreenView> {

  public constructor( tandem: Tandem ) {
    super(
      () => new BAAModel( tandem.createTandem( 'model' ) ),
      model => new SymbolScreenView( model, tandem.createTandem( 'view' ) ),
      {
        name: BuildAnAtomStrings.symbolStringProperty,
        backgroundColorProperty: BAAColors.symbolsScreenBackgroundColorProperty,
        homeScreenIcon: new ScreenIcon( new Image( elementIcon_png ), {
          maxIconWidthProportion: 1,
          maxIconHeightProportion: 1
        } ),
        navigationBarIcon: new ScreenIcon( new Image( elementIconSmall_png ), {
          maxIconWidthProportion: 1,
          maxIconHeightProportion: 1
        } ),
        tandem: tandem
      }
    );
  }
}

buildAnAtom.register( 'SymbolScreen', SymbolScreen );
export default SymbolScreen;