// Copyright 2017-2020, University of Colorado Boulder

/**
 * The 'Build an Atom' screen in the 'Build an Atom' simulation. Conforms to the contract specified in joist/Screen.
 *
 * @author John Blanco
 */

import Screen from '../../../joist/js/Screen.js';
import ScreenIcon from '../../../joist/js/ScreenIcon.js';
import Image from '../../../scenery/js/nodes/Image.js';
import atomIcon from '../../images/atom_icon_png.js';
import atomIconSmall from '../../images/atom_icon_small_png.js';
import buildAnAtom from '../buildAnAtom.js';
import buildAnAtomStrings from '../buildAnAtomStrings.js';
import BuildAnAtomModel from '../common/model/BuildAnAtomModel.js';
import AtomScreenView from './view/AtomScreenView.js';

class AtomScreen extends Screen {

  /**
   * @param {Tandem} tandem
   */
  constructor( tandem ) {
    super(
      () => new BuildAnAtomModel( tandem.createTandem( 'model' ) ),
      model => new AtomScreenView( model, tandem.createTandem( 'view' ) ),
      {
        name: buildAnAtomStrings.atom,
        homeScreenIcon: new ScreenIcon( new Image( atomIcon ), {
          maxIconWidthProportion: 1,
          maxIconHeightProportion: 1
        } ),
        navigationBarIcon: new ScreenIcon( new Image( atomIconSmall ), {
          maxIconWidthProportion: 1,
          maxIconHeightProportion: 1
        } ),
        tandem: tandem
      }
    );
  }
}

buildAnAtom.register( 'AtomScreen', AtomScreen );
export default AtomScreen;