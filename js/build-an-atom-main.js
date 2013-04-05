// Copyright 2002-2012, University of Colorado
require(
    [
      'model/BuildAnAtomModel',
      'view/BuildAnAtomView'
    ],
    function ( BuildAnAtomModel, BuildAnAtomView ) {
      "use strict";

      // First tab.
      var model = new BuildAnAtomModel();
      var view = new BuildAnAtomView( model );
    } );
