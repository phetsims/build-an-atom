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
  var titleAtomModuleString = require( 'string!BUILD_AN_ATOM/title.atomModule' );
  var titleSymbolModuleString = require( 'string!BUILD_AN_ATOM/title.symbolModule' );
  var titleGameModuleString = require( 'string!BUILD_AN_ATOM/title.gameModule' );

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

    // Create and start the sim
    new Sim( buildAnAtomTitleString, [
      new Screen( titleAtomModuleString, new Image( atomIcon ),
        function() { return new BuildAnAtomModel(); },
        function( model ) { return new BuildAnAtomView( model ); }, {
          tandemScreenName: 'atomScreen',
          navigationBarIcon: new Image( atomIconSmall )
        }
      ),
      new Screen( titleSymbolModuleString, new Image( elementIcon ),
        function() { return new BuildAnAtomModel(); },
        function( model ) { return new SymbolView( model ); }, {
          backgroundColor: 'rgb( 242, 255, 204 )', /* Light yellow-green */
          navigationBarIcon: new Image( elementIconSmall ),
          tandemScreenName: 'symbolScreen'
        }
      ),
      new Screen( titleGameModuleString, new Image( gameIcon ),
        function() { return new BAAGameModel(); },
        function( model ) { return new BAAGameView( model ); }, {
          backgroundColor: 'rgb( 255, 254, 223 )',
          navigationBarIcon: new Image( gameIconSmall ),
          tandemScreenName: 'gameScreen'
        }
      )
    ], simOptions ).start();
  } );
} );
