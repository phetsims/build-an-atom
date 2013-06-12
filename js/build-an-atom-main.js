// Copyright 2002-2013, University of Colorado
require(
  [
    'buildanatom/model/BuildAnAtomModel',
    'buildanatom/view/BuildAnAtomView',
    'symbol/model/SymbolTabModel',
    'symbol/view/SymbolTabView',
    'SCENERY/nodes/Circle',
    'SCENERY/nodes/Rectangle' ,
    'SCENERY/nodes/Text' ,
    'JOIST/Sim',
    'JOIST/SimLauncher',
    'imageLoader'
  ],
  function( BuildAnAtomModel, BuildAnAtomView, SymbolTabModel, SymbolTabView, Circle, Rectangle, Text, Sim, SimLauncher, imageLoader ) {
    "use strict";

    var icon1 = new Rectangle( 0, 0, 50, 50, {fill: 'rgb(255, 254, 223)'} );
    icon1.addChild( new Circle( 10,
      {
        stroke: 'blue',
        lineWidth: 0.5,
        lineDash: [ 1, 1 ],
        translation: {x: 25, y: 25 }
      }
    ) );
    icon1.addChild( new Circle( 20,
      {
        stroke: 'blue',
        lineWidth: 0.5,
        lineDash: [ 1, 1 ],
        translation: {x: 25, y: 25 }
      }
    ) );

    var icon2 = new Rectangle( 0, 0, 50, 50, {fill: 'rgb(255, 254, 223)'} );
    icon2.addChild( new Rectangle( 0, 0, 30, 30,
      {
        stroke: 'black',
        lineWidth: 0.5,
        translation: {x: 10, y: 10 },
        fill: 'rgb( 255, 255, 255)'
      }
    ) );
    icon2.addChild( new Text( "H", {
      translation: { x: 17, y: 30 },
      font: "20px Arial"
    } ) );


    SimLauncher.launch( imageLoader, function() {

      //Create and start the sim
      //TODO: i18n
      new Sim( "Build an Atom", [
        { name: "Build an Atom",
          icon: icon1,
          backgroundColor: 'rgb(255, 254, 223)',
          createModel: function() {
            return new BuildAnAtomModel();
          },
          createView: function( model ) {
            return new BuildAnAtomView( model );
          }
        },
        { name: "Symbol",
          icon: icon2,
          backgroundColor: 'rgb(255, 254, 223)',
          createModel: function() {
            return new SymbolTabModel();
          },
          createView: function( model ) {
            return new SymbolTabView( model );
          }
        }
      ], { home: true, tab: 0, navigationBarInFront: true} ).start();
    } );

  } );
