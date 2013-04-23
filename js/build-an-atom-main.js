// Copyright 2002-2012, University of Colorado
require(
    [
      'model/BuildAnAtomModel',
      'view/BuildAnAtomView',
      'SCENERY/nodes/Rectangle' ,
      'JOIST/Sim'
    ],
    function ( BuildAnAtomModel, BuildAnAtomView, Rectangle, Sim ) {
      "use strict";

      //Create and start the sim
      //TODO: i18n
      new Sim( "Build an Atom", [
        { name: "Build an Atom",
          icon: new Rectangle( 0, 0, 50, 50, {fill: 'blue'} ),
          backgroundColor: 'rgb(255, 255, 153)',
          createModel: function () {return new BuildAnAtomModel();},
          createView: function ( model ) {return new BuildAnAtomView( model ).scene;}
        }
      ], { home: true, tab: 0, navigationBarInFront: true} ).start();
    } );
