// Copyright 2017-2025, University of Colorado Boulder

/**
 * The 'Atom' screen in the 'Build an Atom' simulation. Conforms to the contract specified in joist/Screen.
 *
 * @author John Blanco (PhET Interactive Simulations)
 */

import Screen from '../../../joist/js/Screen.js';
import Tandem from '../../../tandem/js/Tandem.js';
import buildAnAtom from '../buildAnAtom.js';
import BuildAnAtomFluent from '../BuildAnAtomFluent.js';
import BAAModel from '../common/model/BAAModel.js';
import BAAKeyboardHelpContent from '../common/view/BAAKeyboardHelpContent.js';
import AtomScreenIcon from './view/AtomScreenIcon.js';
import AtomScreenView from './view/AtomScreenView.js';

class AtomScreen extends Screen<BAAModel, AtomScreenView> {

  public constructor( tandem: Tandem ) {
    super(
      () => new BAAModel( { tandem: tandem.createTandem( 'model' ) } ),
      model => new AtomScreenView( model, tandem.createTandem( 'view' ) ),
      {
        name: BuildAnAtomFluent.atomStringProperty,
        screenButtonsHelpText: BuildAnAtomFluent.a11y.atomScreen.screenIcon.accessibleHelpTextStringProperty,

        homeScreenIcon: new AtomScreenIcon(),
        tandem: tandem,

        createKeyboardHelpNode: () => new BAAKeyboardHelpContent()

      }
    );
  }
}

buildAnAtom.register( 'AtomScreen', AtomScreen );
export default AtomScreen;