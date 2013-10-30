// Copyright 2002-2013, University of Colorado Boulder
require(
  [
    'BUILD_AN_ATOM/common/model/BuildAnAtomModel',
    'buildanatom/view/BuildAnAtomView',
    'BUILD_AN_ATOM/game/model/BAAGameModel',
    'BUILD_AN_ATOM/game/view/BAAGameView',
    'BUILD_AN_ATOM/symbol/view/SymbolView',
    'SCENERY/nodes/Image',
    'JOIST/Screen',
    'JOIST/Sim',
    'JOIST/SimLauncher',
    'string!BUILD_AN_ATOM/build-an-atom.name',
    'string!BUILD_AN_ATOM/title.atomModule',
    'string!BUILD_AN_ATOM/title.symbolModule',
    'string!BUILD_AN_ATOM/title.gameModule',
    'image!BUILD_AN_ATOM/baa_atom_icon.png',
    'image!BUILD_AN_ATOM/baa_atom_icon_small.png',
    'image!BUILD_AN_ATOM/baa_element_icon.png',
    'image!BUILD_AN_ATOM/baa_element_icon_small.png',
    'image!BUILD_AN_ATOM/game_icon.png',
    'image!BUILD_AN_ATOM/game_icon_small.png'
  ],
  function( BuildAnAtomModel, BuildAnAtomView, BAAGameModel, BAAGameView, SymbolView, Image, Screen, Sim, SimLauncher, simTitle, atomModuleString, symbolModuleString, gameModuleString, atomIcon, atomIconSmall, elementIcon, elementIconSmall, gameIcon, gameIconSmall ) {
    'use strict';

    var simOptions = {
      credits: {
        leadDesign: 'Kelly Lancaster',
        softwareDevelopment: 'John Blanco, Sam Reid',
        designTeam: 'Jack Barbera, Suzanne Brahmia, Julia Chamberlain, Yuen-ying Carpenter,\n' +
                    'Patricia Loeblein, Emily B. Moore, Robert Parson, Ariel Paul, Kathy Perkins, Sharon Siman-Tov',
        interviews: 'Emily B. Moore, Kelly Lancaster, Ariel Paul',
        thanks: 'Conversion of this simulation to HTML5 was funded by the Royal Society of Chemistry.'
      }
    };

    SimLauncher.launch( function() {

      //Create and start the sim
      new Sim( simTitle, [
        new Screen( atomModuleString, new Image( atomIcon ),
          function() { return new BuildAnAtomModel(); },
          function( model ) { return new BuildAnAtomView( model ); },
          { navigationBarIcon: new Image( atomIconSmall )}
        ),
        new Screen( symbolModuleString, new Image( elementIcon ),
          function() { return new BuildAnAtomModel(); },
          function( model ) { return new SymbolView( model ); },
          {
            backgroundColor: 'rgb( 242, 255, 204 )', /* Light yellow-green */
            navigationBarIcon: new Image( elementIconSmall )
          }
        ),
        new Screen( gameModuleString, new Image( gameIcon ),
          function() { return new BAAGameModel(); },
          function( model ) { return new BAAGameView( model ); },
          { backgroundColor: 'rgb( 255, 254, 223 )',
            navigationBarIcon: new Image( gameIconSmall )
          }
        )
      ], simOptions ).start();
    } );
  } );
