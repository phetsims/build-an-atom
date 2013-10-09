// Copyright 2002-2013, University of Colorado Boulder
require(
  [
    'common/model/BuildAnAtomModel',
    'buildanatom/view/BuildAnAtomView',
    'game/model/BAAGameModel',
    'game/view/BAAGameView',
    'symbol/view/SymbolView',
    'SCENERY/nodes/Image',
    'JOIST/Sim',
    'JOIST/SimLauncher',
    'string!BUILD_AN_ATOM/build-an-atom.name',
    'image!BUILD_AN_ATOM/baa_atom_icon.png',
    'image!BUILD_AN_ATOM/baa_element_icon.png',
    'image!BUILD_AN_ATOM/game_icon.png'
  ],
  function( BuildAnAtomModel, BuildAnAtomView, BAAGameModel, BAAGameView, SymbolView,
            Image, Sim, SimLauncher, simTitle, atomIcon, elementIcon, gameIcon ) {
    'use strict';

    var simOptions = {
      credits: 'PhET Development Team -\n' +
               'Lead Design: Kelly Lancaster\n' +
               'Software Development: John Blanco, Sam Reid\n' +
               'Design Team: Jack Barbera, Suzanne Brahmia, Julia Chamberlain, Yuen-ying Carpenter, Patricia Loeblein, Emily B. Moore, Robert Parson, Ariel Paul, Kathy Perkins, Sharon Siman-Tov\n' +
               'Interviews: Emily B. Moore, Kelly Lancaster, Ariel Paul',
      thanks: 'Thanks -\n' +
              'Conversion of this simulation to HTML5 was funded by the Royal Society of Chemistry.'
    };

    SimLauncher.launch( function() {

      //Create and start the sim
      //TODO: i18n
      new Sim( simTitle, [
        { name: 'Atom', // TODO: i18n
          icon: new Image( atomIcon ),
          backgroundColor: 'white',
          createModel: function() { return new BuildAnAtomModel(); },
          createView: function( model ) { return new BuildAnAtomView( model ); } },
        { name: 'Symbol', // TODO: i18n
          icon: new Image( elementIcon ),
          backgroundColor: 'rgb( 242, 255, 204 )', // Light yellow-green.
          createModel: function() { return new BuildAnAtomModel(); },
          createView: function( model ) { return new SymbolView( model ); } },
        { name: 'Games', // TODO: i18n
          icon: new Image( gameIcon ),
          backgroundColor: 'rgb( 255, 254, 223 )',
          createModel: function() { return new BAAGameModel(); },
          createView: function( model ) { return new BAAGameView( model ); } }
      ], simOptions ).start();
    } );
  } );
