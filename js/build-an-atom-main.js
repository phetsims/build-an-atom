// Copyright 2013-2015, University of Colorado Boulder

/**
 * Main file for the Build an Atom simulation.
 */
define( function( require ) {
  'use strict';

  // modules
  var BuildAnAtomModel = require( 'BUILD_AN_ATOM/common/model/BuildAnAtomModel' );
  var BuildAnAtomView = require( 'buildanatom/view/BuildAnAtomView' );
  var BAAGameModel = require( 'BUILD_AN_ATOM/game/model/BAAGameModel' );
  var BAAGameView = require( 'BUILD_AN_ATOM/game/view/BAAGameView' );
  var SymbolView = require( 'BUILD_AN_ATOM/symbol/view/SymbolView' );
  var Image = require( 'SCENERY/nodes/Image' );
  var Screen = require( 'JOIST/Screen' );
  var Sim = require( 'JOIST/Sim' );
  var SimLauncher = require( 'JOIST/SimLauncher' );
  var Tandem = require( 'TANDEM/Tandem' );

  // strings
  var buildAnAtomTitleString = require( 'string!BUILD_AN_ATOM/build-an-atom.title' );
  var atomString = require( 'string!BUILD_AN_ATOM/atom' );
  var symbolString = require( 'string!BUILD_AN_ATOM/symbol' );
  var gameString = require( 'string!BUILD_AN_ATOM/game' );

  // images
  var atomIcon = require( 'image!BUILD_AN_ATOM/atom_icon.png' );
  var atomIconSmall = require( 'image!BUILD_AN_ATOM/atom_icon_small.png' );
  var elementIcon = require( 'image!BUILD_AN_ATOM/element_icon.png' );
  var elementIconSmall = require( 'image!BUILD_AN_ATOM/element_icon_small.png' );
  var gameIcon = require( 'image!BUILD_AN_ATOM/game_icon.png' );
  var gameIconSmall = require( 'image!BUILD_AN_ATOM/game_icon_small.png' );

  var tandem = new Tandem( 'buildAnAtom' );

  var simOptions = {
    credits: {
      leadDesign: 'Kelly Lancaster',
      softwareDevelopment: 'John Blanco, Sam Reid',
      team: 'Jack Barbera, Suzanne Brahmia, Julia Chamberlain, Yuen-ying Carpenter,\n' +
            'Kelly Lancaster, Patricia Loeblein, Emily B. Moore, Ariel Paul, Robert Parson,\n' +
            'Ariel Paul, Kathy Perkins, Sharon Siman-Tov',
      thanks: 'Conversion of this simulation to HTML5 was funded by the Royal Society of Chemistry.'
    },
    tandem: tandem
  };

  SimLauncher.launch( function() {

    var atomScreenTandem = tandem.createTandem( 'atomScreen' );
    var symbolScreenTandem = tandem.createTandem( 'symbolScreen' );
    var gameScreenTandem = tandem.createTandem( 'gameScreen' );

    // Create and start the sim
    new Sim( buildAnAtomTitleString, [
      new Screen( atomString, new Image( atomIcon ),
        function() { return new BuildAnAtomModel(); },
        function( model ) { return new BuildAnAtomView( model, atomScreenTandem ); }, {
          tandem: atomScreenTandem,
          navigationBarIcon: new Image( atomIconSmall )
        }
      ),
      new Screen( symbolString, new Image( elementIcon ),
        function() { return new BuildAnAtomModel(); },
        function( model ) { return new SymbolView( model, symbolScreenTandem ); }, {
          backgroundColor: 'rgb( 242, 255, 204 )', /* Light yellow-green */
          navigationBarIcon: new Image( elementIconSmall ),
          tandem: symbolScreenTandem
        }
      ),
      new Screen( gameString, new Image( gameIcon ),
        function() { return new BAAGameModel( gameScreenTandem ); },
        function( model ) { return new BAAGameView( model, gameScreenTandem ); }, {
          backgroundColor: 'rgb( 255, 254, 223 )',
          navigationBarIcon: new Image( gameIconSmall ),
          tandem: gameScreenTandem
        }
      )
    ], simOptions ).start();
  } );
} );
