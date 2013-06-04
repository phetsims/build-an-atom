// Copyright 2002-2013, University of Colorado
define( function( require ) {
  "use strict";

  var Node = require( 'SCENERY/nodes/Node' );
  var Circle = require( 'SCENERY/nodes/Circle' );
  var RadialGradient = require( 'SCENERY/util/RadialGradient' );
  var SimpleDragHandler = require( 'SCENERY/input/SimpleDragHandler' );
  var inherit = require( 'PHET_CORE/inherit' );

  var ElectronShellView = function( atom, mvt ) {
    Node.call( this ); // Call super constructor.

    var outerRadiusInView = mvt.modelToViewDeltaX( atom.outerElectronShellRadius );
    var outerRing = new Circle( outerRadiusInView,
      // Options
      {
        stroke: 'blue',
        lineWidth: 1.5,
        lineDash: [ 10, 15 ],
        translation: mvt.modelToViewPosition( {x: 0, y: 0 } )
      }
    );
    this.addChild( outerRing );

    var innerRadiusInView = mvt.modelToViewDeltaX( atom.innerElectronShellRadius );
    var innerRing = new Circle( innerRadiusInView,
      // Options
      {
        stroke: 'blue',
        lineWidth: 1.5,
        lineDash: [ 10, 15 ],
        translation: mvt.modelToViewPosition( {x: 0, y: 0 } )
      }
    );
    this.addChild( innerRing );
  };

  // Inherit from Node.
  inherit( ElectronShellView, Node );

  return ElectronShellView;
} );
