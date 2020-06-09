// Copyright 2017-2020, University of Colorado Boulder

/**
 * The 'Build an Atom' screen in the 'Build an Atom' simulation. Conforms to the contract specified in joist/Screen.
 *
 * @author John Blanco
 */

import Property from '../../../axon/js/Property.js';
import Screen from '../../../joist/js/Screen.js';
import ScreenIcon from '../../../joist/js/ScreenIcon.js';
import inherit from '../../../phet-core/js/inherit.js';
import Image from '../../../scenery/js/nodes/Image.js';
import Tandem from '../../../tandem/js/Tandem.js';
import gameIcon from '../../images/game_icon_png.js';
import gameIconSmall from '../../images/game_icon_small_png.js';
import buildAnAtom from '../buildAnAtom.js';
import buildAnAtomStrings from '../buildAnAtomStrings.js';
import BAAGameModel from './model/BAAGameModel.js';
import BAAGameScreenView from './view/BAAGameScreenView.js';

const gameString = buildAnAtomStrings.game;


/**
 * @constructor
 * @param {Tandem} tandem
 */
function GameScreen( tandem ) {
  Screen.call(
    this,
    function() { return new BAAGameModel( tandem.createTandem( 'model' ) ); },

    // TODO: Instrument the game screen, see https://github.com/phetsims/build-an-atom/issues/156
    function( model ) { return new BAAGameScreenView( model, Tandem.OPTIONAL ); },
    {
      name: gameString,
      backgroundColorProperty: new Property( 'rgb( 255, 254, 223 )' ),
      homeScreenIcon: new ScreenIcon( new Image( gameIcon ), {
        maxIconWidthProportion: 1,
        maxIconHeightProportion: 1
      } ),
      navigationBarIcon: new ScreenIcon( new Image( gameIconSmall ), {
        maxIconWidthProportion: 1,
        maxIconHeightProportion: 1
      } ),
      tandem: tandem
    }
  );
}

buildAnAtom.register( 'GameScreen', GameScreen );

inherit( Screen, GameScreen );
export default GameScreen;