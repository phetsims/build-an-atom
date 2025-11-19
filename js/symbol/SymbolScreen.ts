// Copyright 2017-2025, University of Colorado Boulder

/**
 * The 'Build an Atom' screen in the 'Build an Atom' simulation. Conforms to the contract specified in joist/Screen.
 *
 * @author John Blanco
 */

import Screen from '../../../joist/js/Screen.js';
import Tandem from '../../../tandem/js/Tandem.js';
import buildAnAtom from '../buildAnAtom.js';
import BuildAnAtomFluent from '../BuildAnAtomFluent.js';
import BuildAnAtomStrings from '../BuildAnAtomStrings.js';
import BAAColors from '../common/BAAColors.js';
import BAAModel from '../common/model/BAAModel.js';
import BAAKeyboardHelpContent from '../common/view/BAAKeyboardHelpContent.js';
import SymbolScreenIcon from './view/SymbolScreenIcon.js';
import SymbolScreenView from './view/SymbolScreenView.js';

class SymbolScreen extends Screen<BAAModel, SymbolScreenView> {

  public constructor( tandem: Tandem ) {
    super(
      () => new BAAModel( { tandem: tandem.createTandem( 'model' ) } ),
      model => new SymbolScreenView( model, tandem.createTandem( 'view' ) ),
      {
        name: BuildAnAtomFluent.symbolStringProperty,
        screenButtonsHelpText: BuildAnAtomStrings.a11y.symbolScreen.screenIcon.accessibleHelpTextStringProperty,
        backgroundColorProperty: BAAColors.symbolsScreenBackgroundColorProperty,
        homeScreenIcon: new SymbolScreenIcon(),
        tandem: tandem,
        createKeyboardHelpNode: () => new BAAKeyboardHelpContent()
      }
    );
  }
}

buildAnAtom.register( 'SymbolScreen', SymbolScreen );
export default SymbolScreen;