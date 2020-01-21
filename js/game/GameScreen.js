// Copyright 2017-2019, University of Colorado Boulder

/**
 * The 'Build an Atom' screen in the 'Build an Atom' simulation. Conforms to the contract specified in joist/Screen.
 *
 * @author John Blanco
 */
define( require => {
  'use strict';

  // modules
  const BAAGameModel = require( 'BUILD_AN_ATOM/game/model/BAAGameModel' );
  const BAAGameScreenView = require( 'BUILD_AN_ATOM/game/view/BAAGameScreenView' );
  const buildAnAtom = require( 'BUILD_AN_ATOM/buildAnAtom' );
  const Image = require( 'SCENERY/nodes/Image' );
  const inherit = require( 'PHET_CORE/inherit' );
  const Property = require( 'AXON/Property' );
  const Screen = require( 'JOIST/Screen' );
  const Tandem = require( 'TANDEM/Tandem' );

  // strings
  const gameString = require( 'string!BUILD_AN_ATOM/game' );

  // images
  const gameIcon = require( 'image!BUILD_AN_ATOM/game_icon.png' );
  const gameIconSmall = require( 'image!BUILD_AN_ATOM/game_icon_small.png' );

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
        homeScreenIcon: new Image( gameIcon ),
        navigationBarIcon: new Image( gameIconSmall ),
        tandem: tandem
      }
    );
  }

  buildAnAtom.register( 'GameScreen', GameScreen );

  return inherit( Screen, GameScreen );
} );