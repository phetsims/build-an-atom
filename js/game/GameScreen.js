// Copyright 2017, University of Colorado Boulder

/**
 * The 'Build an Atom' screen in the 'Build an Atom' simulation. Conforms to the contract specified in joist/Screen.
 *
 * @author John Blanco
 */
define( function( require ) {
  'use strict';

  // imports
  var BAAGameModel = require( 'BUILD_AN_ATOM/game/model/BAAGameModel' );
  var BAAGameScreenView = require( 'BUILD_AN_ATOM/game/view/BAAGameScreenView' );
  var buildAnAtom = require( 'BUILD_AN_ATOM/buildAnAtom' );
  var Image = require( 'SCENERY/nodes/Image' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Property = require( 'AXON/Property' );
  var Screen = require( 'JOIST/Screen' );
  var Tandem = require( 'TANDEM/Tandem' );

  // strings
  var gameString = require( 'string!BUILD_AN_ATOM/game' );

  // images
  var gameIcon = require( 'image!BUILD_AN_ATOM/game_icon.png' );
  var gameIconSmall = require( 'image!BUILD_AN_ATOM/game_icon_small.png' );

  /**
   * @constructor
   * @param {Tandem} tandem
   */
  function GameScreen( tandem ) {
    Screen.call(
      this,
      function() { return new BAAGameModel( tandem.createTandem( 'model' ) ); },

      // TODO: Support instrumented element that is dynamic/lazily created, see https://github.com/phetsims/phet-io/issues/1443
      function( model ) { return new BAAGameScreenView( model, Tandem.optional ); },
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