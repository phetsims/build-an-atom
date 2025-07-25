// Copyright 2017-2025, University of Colorado Boulder

/**
 * The 'Build an Atom' screen in the 'Build an Atom' simulation. Conforms to the contract specified in joist/Screen.
 *
 * @author John Blanco
 */

import Screen from '../../../joist/js/Screen.js';
import Tandem from '../../../tandem/js/Tandem.js';
import buildAnAtom from '../buildAnAtom.js';
import BuildAnAtomStrings from '../BuildAnAtomStrings.js';
import BAAModel from '../common/model/BAAModel.js';
import AtomScreenIcon from './view/AtomScreenIcon.js';
import AtomScreenView from './view/AtomScreenView.js';

class AtomScreen extends Screen<BAAModel, AtomScreenView> {

  public constructor( tandem: Tandem ) {
    super(
      () => new BAAModel( tandem.createTandem( 'model' ) ),
      ( model: BAAModel ) => new AtomScreenView( model, tandem.createTandem( 'view' ) ),
      {
        name: BuildAnAtomStrings.atomStringProperty,
        homeScreenIcon: new AtomScreenIcon( Tandem.OPT_OUT ),
        tandem: tandem
      }
    );
  }
}

buildAnAtom.register( 'AtomScreen', AtomScreen );
export default AtomScreen;