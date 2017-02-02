// Copyright 2013-2015, University of Colorado Boulder

/**
 * Main file for the Build an Atom simulation.
 */
define( function( require ) {
  'use strict';

  // modules
  var BuildAnAtomModel = require( 'BUILD_AN_ATOM/common/model/BuildAnAtomModel' );
  var BuildAnAtomView = require( 'BUILD_AN_ATOM/buildanatom/view/BuildAnAtomView' );
  var BAAGameModel = require( 'BUILD_AN_ATOM/game/model/BAAGameModel' );
  var BAAGameView = require( 'BUILD_AN_ATOM/game/view/BAAGameView' );
  var SymbolView = require( 'BUILD_AN_ATOM/symbol/view/SymbolView' );
  var Image = require( 'SCENERY/nodes/Image' );
  var Screen = require( 'JOIST/Screen' );
  var Sim = require( 'JOIST/Sim' );
  var SimLauncher = require( 'JOIST/SimLauncher' );
  var Tandem = require( 'TANDEM/Tandem' );
  var Property = require( 'AXON/Property' );

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

  var tandem = Tandem.createRootTandem();

  var simOptions = {
    credits: {
      leadDesign: 'Kelly Lancaster',
      softwareDevelopment: 'John Blanco, Aadish Gupta, Sam Reid',
      team: 'Jack Barbera, Suzanne Brahmia, Julia Chamberlain, Yuen-ying Carpenter,\n' +
            'Kelly Lancaster, Patricia Loeblein, Emily B. Moore, Robert Parson,\n' +
            'Ariel Paul, Kathy Perkins, Sharon Siman-Tov',
      qualityAssurance: 'Steele Dalton, Bryce Griebenow, Elise Morgan, Ben Roberts',
      thanks: 'Conversion of this simulation to HTML5 was funded by the Royal Society of Chemistry.'
    }
  };

  SimLauncher.launch( function() {

    var atomScreenTandem = tandem.createTandem( 'atomScreen' );
    var symbolScreenTandem = tandem.createTandem( 'symbolScreen' );
    var gameScreenTandem = tandem.createTandem( 'gameScreen' );

    // Create and start the sim
    new Sim( buildAnAtomTitleString, [

      // Atom screen
      new Screen(
        function() {
          return new BuildAnAtomModel( atomScreenTandem.createTandem( 'model' ) );
        },
        function( model ) {
          return new BuildAnAtomView( model, atomScreenTandem.createTandem( 'view' ) );
        }, {
          name: atomString,
          homeScreenIcon: new Image( atomIcon ),
          navigationBarIcon: new Image( atomIconSmall ),
          tandem: atomScreenTandem
        }
      ),

      // Symbol screen
      new Screen(
        function() {
          return new BuildAnAtomModel( symbolScreenTandem.createTandem( 'model' ) );
        },
        function( model ) {
          return new SymbolView( model, symbolScreenTandem.createTandem( 'view' ) );
        }, {
          name: symbolString,
          backgroundColorProperty: new Property( 'rgb( 242, 255, 204 )' ), /* Light yellow-green */
          homeScreenIcon: new Image( elementIcon ),
          navigationBarIcon: new Image( elementIconSmall ),
          tandem: symbolScreenTandem
        }
      ),

      // Game screen
      new Screen(
        function() {
          return new BAAGameModel( gameScreenTandem.createTandem( 'model' ) );
        },
        function( model ) {
          return new BAAGameView( model, gameScreenTandem.createTandem( 'view' ) );
        }, {
          name: gameString,
          backgroundColorProperty: new Property( 'rgb( 255, 254, 223 )' ),
          homeScreenIcon: new Image( gameIcon ),
          navigationBarIcon: new Image( gameIconSmall ),
          tandem: gameScreenTandem
        }
      )
    ], simOptions ).start();
  } );
} );

