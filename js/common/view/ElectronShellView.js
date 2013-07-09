// Copyright 2002-2013, University of Colorado Boulder
define( function( require ) {
  "use strict";

  // Imports
  var Node = require( 'SCENERY/nodes/Node' );
  var Circle = require( 'SCENERY/nodes/Circle' );
  var RadialGradient = require( 'SCENERY/util/RadialGradient' );
  var SimpleDragHandler = require( 'SCENERY/input/SimpleDragHandler' );
  var inherit = require( 'PHET_CORE/inherit' );

  // Constants
  var LINE_DASH = [ 4, 5 ];

  var ElectronShellView = function ElectronShellView( atom, mvt ) {
    Node.call( this ); // Call super constructor.

    var outerRadiusInView = mvt.modelToViewDeltaX( atom.outerElectronShellRadius );
    var outerRing = new Circle( outerRadiusInView,
      // Options
                                {
                                  renderer: 'svg', // This is necessary to get dotted lines on IE10, see Scenery issue #70.
                                  stroke: 'blue',
                                  lineWidth: 1.5,
                                  lineDash: LINE_DASH,
                                  translation: mvt.modelToViewPosition( {x: 0, y: 0 } )
                                }
    );
    this.addChild( outerRing );

    var innerRadiusInView = mvt.modelToViewDeltaX( atom.innerElectronShellRadius );
    var innerRing = new Circle( innerRadiusInView,
      // Options
                                {
                                  renderer: 'svg', // This is necessary to get dotted lines on IE10, see Scenery issue #70.
                                  stroke: 'blue',
                                  lineWidth: 1.5,
                                  lineDash: LINE_DASH,
                                  translation: mvt.modelToViewPosition( {x: 0, y: 0 } )
                                }
    );
    this.addChild( innerRing );
  };

  // Inherit from Node.
  inherit( Node, ElectronShellView );

  return ElectronShellView;
} );
