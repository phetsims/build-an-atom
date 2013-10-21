// Copyright 2002-2013, University of Colorado Boulder
require(
  [
    'BUILD_AN_ATOM/common/model/BuildAnAtomModel',
    'buildanatom/view/BuildAnAtomView',
    'BUILD_AN_ATOM/game/model/BAAGameModel',
    'BUILD_AN_ATOM/game/view/BAAGameView',
    'BUILD_AN_ATOM/symbol/view/SymbolView',
    'SCENERY/nodes/Image',
    'JOIST/Sim',
    'JOIST/SimLauncher',
    'string!BUILD_AN_ATOM/build-an-atom.name',
    'string!BUILD_AN_ATOM/title.atomModule',
    'string!BUILD_AN_ATOM/title.symbolModule',
    'string!BUILD_AN_ATOM/title.gameModule',
    'image!BUILD_AN_ATOM/baa_atom_icon.png',
    'image!BUILD_AN_ATOM/baa_element_icon.png',
    'image!BUILD_AN_ATOM/game_icon.png'
  ],
  function( BuildAnAtomModel, BuildAnAtomView, BAAGameModel, BAAGameView, SymbolView, Image, Sim, SimLauncher, simTitle, atomModuleString, symbolModuleString, gameModuleString, atomIcon, elementIcon, gameIcon ) {
    'use strict';

    var simOptions = {
      credits: 'PhET Development Team -\n' +
               'Lead Design: Kelly Lancaster\n' +
               'Software Development: John Blanco, Sam Reid\n' +
               'Design Team: Jack Barbera, Suzanne Brahmia, Julia Chamberlain, Yuen-ying Carpenter,\n' +
               'Patricia Loeblein, Emily B. Moore, Robert Parson, Ariel Paul, Kathy Perkins, Sharon Siman-Tov\n' +
               'Interviews: Emily B. Moore, Kelly Lancaster, Ariel Paul',
      thanks: 'Thanks -\n' +
              'Conversion of this simulation to HTML5 was funded by the Royal Society of Chemistry.'
    };

    SimLauncher.launch( function() {

      //Create and start the sim
      new Sim( simTitle, [
        { name: atomModuleString,
          icon: new Image( atomIcon ),
          backgroundColor: 'white',
          createModel: function() { return new BuildAnAtomModel(); },
          createView: function( model ) { return new BuildAnAtomView( model ); } },
        { name: symbolModuleString,
          icon: new Image( elementIcon ),
          backgroundColor: 'rgb( 242, 255, 204 )', // Light yellow-green.
          createModel: function() { return new BuildAnAtomModel(); },
          createView: function( model ) { return new SymbolView( model ); } },
        { name: gameModuleString,
          icon: new Image( gameIcon ),
          backgroundColor: 'rgb( 255, 254, 223 )',
          createModel: function() { return new BAAGameModel(); },
          createView: function( model ) { return new BAAGameView( model ); } }
      ], simOptions ).start();
    } );
  } );
