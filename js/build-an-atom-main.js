// Copyright 2002-2013, University of Colorado Boulder
require(
  [
    'buildanatom/model/BuildAnAtomModel',
    'buildanatom/view/BuildAnAtomTabView',
    'common/view/BAAFont',
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
  function( BuildAnAtomModel, BuildAnAtomTabView, BAAFont, BAAGameModel, BAAGameView, SymbolTabView, Circle, Image, Rectangle, Text, Sim, SimLauncher, imageLoader ) {
    "use strict";

    var gameIcon = new Rectangle( 0, 0, 67, 50, {fill: 'rgb(255, 254, 223)'} );
    gameIcon.addChild( new Circle( 10,
                                   {
                                     stroke: 'blue',
                                     lineWidth: 0.5,
                                     lineDash: [ 1, 1 ],
                                     center: gameIcon.center
                                   }
    ) );
    gameIcon.addChild( new Circle( 20,
                                   {
                                     stroke: 'blue',
                                     lineWidth: 0.5,
                                     lineDash: [ 1, 1 ],
                                     center: gameIcon.center
                                   }
    ) );
    gameIcon.addChild( new Text( "?",
                                 {
                                   font: new BAAFont( 40, 'bold' ),
                                   fill: 'rgba(50, 50, 50, 20)',
                                   center: gameIcon.center
                                 } ) );

    SimLauncher.launch( imageLoader, function() {

      //Create and start the sim
      //TODO: i18n
      new Sim( "Build an Atom", [
        { name: "Atom",
          icon: new Image( imageLoader.getImage( "BAA_atom.png" ) ),
          backgroundColor: 'white',
          createModel: function() {
            return new BuildAnAtomModel();
          },
          createView: function( model ) {
            return new BuildAnAtomTabView( model );
          }
        },
        { name: "Symbol",
          icon: new Image( imageLoader.getImage( "BAA_symbol.png" ) ),
//          backgroundColor: 'rgb(255, 230, 179)', // Somewhat orange-ish color (1st try at distinguishing colors)
//          backgroundColor: 'rgb( 255, 246, 219 )', // Lighter orange-ish.  Looks a bit funny.
//          backgroundColor: 'rgb( 255, 252, 173 )', // Yellow, somewhat lighter than control panel yellow
          backgroundColor: 'rgb( 242, 255, 204 )', // Light yellow-green.

          createModel: function() {
            return new BuildAnAtomModel();
          },
          createView: function( model ) {
            return new SymbolTabView( model );
          }
        },
        { name: "Game",
          icon: gameIcon,
          backgroundColor: 'rgb(255, 254, 223)',
          createModel: function() {
            return new BAAGameModel();
          },
          createView: function( model ) {
            return new BAAGameView( model );
          }
        }
      ], { home: true, tab: 0, navigationBarInFront: true} ).start();
    } );

  } );
