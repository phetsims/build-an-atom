// Copyright 2017-2020, University of Colorado Boulder

/**
 * The 'Build an Atom' screen in the 'Build an Atom' simulation. Conforms to the contract specified in joist/Screen.
 *
 * @author John Blanco
 */

import Property from '../../../axon/js/Property.js';
import Screen from '../../../joist/js/Screen.js';
import ScreenIcon from '../../../joist/js/ScreenIcon.js';
import Image from '../../../scenery/js/nodes/Image.js';
import elementIcon from '../../images/element_icon_png.js';
import elementIconSmall from '../../images/element_icon_small_png.js';
import buildAnAtom from '../buildAnAtom.js';
import buildAnAtomStrings from '../buildAnAtomStrings.js';
import BuildAnAtomModel from '../common/model/BuildAnAtomModel.js';
import SymbolView from './view/SymbolView.js';

class SymbolScreen extends Screen {

  /**
   * @param {Tandem} tandem
   */
  constructor( tandem ) {
    super(
      () => new BuildAnAtomModel( tandem.createTandem( 'model' ) ),
      model => new SymbolView( model, tandem.createTandem( 'view' ) ),
      {
        name: buildAnAtomStrings.symbol,
        backgroundColorProperty: new Property( 'rgb( 242, 255, 204 )' ), /* Light yellow-green */
        homeScreenIcon: new ScreenIcon( new Image( elementIcon ), {
          maxIconWidthProportion: 1,
          maxIconHeightProportion: 1
        } ),
        navigationBarIcon: new ScreenIcon( new Image( elementIconSmall ), {
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