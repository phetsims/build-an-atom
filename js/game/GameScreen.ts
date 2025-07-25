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
import BAAColors from '../common/BAAColors.js';
import GameModel from './model/GameModel.js';
import GameScreenIcon from './view/GameScreenIcon.js';
import GameScreenView from './view/GameScreenView.js';

class GameScreen extends Screen<GameModel, GameScreenView> {

  public constructor( tandem: Tandem ) {
    super(
      () => new GameModel( tandem.createTandem( 'model' ) ),

      model => new GameScreenView( model, tandem.createTandem( 'view' ) ),
      {
        name: BuildAnAtomStrings.gameStringProperty,
        backgroundColorProperty: BAAColors.gameScreenBackgroundColorProperty,
        homeScreenIcon: new GameScreenIcon( Tandem.OPT_OUT ),
        tandem: tandem
      }
    );
  }
}

buildAnAtom.register( 'GameScreen', GameScreen );
export default GameScreen;