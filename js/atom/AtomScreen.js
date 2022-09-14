// Copyright 2017-2022, University of Colorado Boulder

/**
 * The 'Build an Atom' screen in the 'Build an Atom' simulation. Conforms to the contract specified in joist/Screen.
 *
 * @author John Blanco
 */

import Screen from '../../../joist/js/Screen.js';
import ScreenIcon from '../../../joist/js/ScreenIcon.js';
import { Image } from '../../../scenery/js/imports.js';
import atomIcon_png from '../../images/atomIcon_png.js';
import atomIconSmall_png from '../../images/atomIconSmall_png.js';
import buildAnAtom from '../buildAnAtom.js';
import BuildAnAtomStrings from '../BuildAnAtomStrings.js';
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
        name: BuildAnAtomStrings.atomStringProperty,
        homeScreenIcon: new ScreenIcon( new Image( atomIcon_png ), {
          maxIconWidthProportion: 1,
          maxIconHeightProportion: 1
        } ),
        navigationBarIcon: new ScreenIcon( new Image( atomIconSmall_png ), {
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