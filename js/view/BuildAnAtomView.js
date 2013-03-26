define( function( require ) {
  "use strict";
  var scenery = require( 'SCENERY/main' );
  var Bucket = require( 'PHETCOMMON/model/Bucket' );

  function BuildAnAtomView( model ) {
    var view = this;

    view.model = model;
    view.model.on( 'reset-all', function() { view.resetAll(); } );

    // Temp: model bucket.
    var bucket = new Bucket( {
                               x: 600,
                               y: 100,
                               width: 200,
                               height: 50,
                               baseColor: 'red',
                               caption: 'Protons'
                             } );
  }

  BuildAnAtomView.prototype = {
    resetAll: function() {
      // TODO
    },
    step: function() {
      this.model.step();
      this.scenery.scene.updateScene();
    }
  };

  return BuildAnAtomView;
} );