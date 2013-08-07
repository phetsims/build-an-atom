// Copyright 2002-2013, University of Colorado Boulder
require(
  [
    'common/model/BuildAnAtomModel',
    'buildanatom/view/BuildAnAtomTabView',
    'SCENERY_PHET/PhetFont',
    'game/model/BAAGameModel',
    'game/view/BAAGameView',
    'symbol/view/SymbolTabView',
    'SCENERY/nodes/Circle',
    'SCENERY/nodes/Image',
    'SCENERY/nodes/Rectangle',
    'SCENERY/nodes/Text' ,
    'JOIST/Sim',
    'JOIST/SimLauncher',
    'imageLoader'
  ],
  function( BuildAnAtomModel, BuildAnAtomTabView, PhetFont, BAAGameModel, BAAGameView, SymbolTabView, Circle, Image, Rectangle, Text, Sim, SimLauncher, imageLoader ) {
    'use strict';

    var simOptions = {
      credits: 'PhET Development Team -\n' +
               'Lead Design: Kelly Lancaster\n' +
               'Software Development: John Blanco, Sam Reid\n' +
               'Design Team: Jack Barbara, Suzanne Brahmia, Patricia Loeblein, Emily B. Moore, Robert Parson, Ariel Paul, Kathy Perkins\n' +
               'Interviews: Emily Moore, Kelly Lancaster, Ariel Paul',
      thanks: 'Thanks -\n' +
              'Conversion of this simulation to HTML5 was funded by the Royal Society of Chemistry.'
    };

    SimLauncher.launch( imageLoader, function() {

      //Create and start the sim
      //TODO: i18n
      new Sim( 'Build an Atom', [
        { name: 'Atom',
          icon: new Image( imageLoader.getImage( 'baa_atom_icon.png' ) ),
          backgroundColor: 'white',
          createModel: function() { return new BuildAnAtomModel(); },
          createView: function( model ) { return new BuildAnAtomTabView( model ); } },
        { name: 'Symbol',
          icon: new Image( imageLoader.getImage( 'baa_element_icon.png' ) ),
          backgroundColor: 'rgb( 242, 255, 204 )', // Light yellow-green.
          createModel: function() { return new BuildAnAtomModel(); },
          createView: function( model ) { return new SymbolTabView( model ); } },
        { name: 'Game',
          icon: new Image( imageLoader.getImage( 'game_icon.png' ) ),
          backgroundColor: 'rgb( 255, 254, 223 )',
          createModel: function() { return new BAAGameModel(); },
          createView: function( model ) { return new BAAGameView( model ); } }
      ], simOptions ).start();
    } );
  } );
