// Copyright 2002-2012, University of Colorado
define( function ( require ) {

  var _ = require( 'lodash' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Circle = require( 'SCENERY/nodes/Circle' );
  var RadialGradient = require( 'SCENERY/util/RadialGradient' );
  var SimpleDragHandler = require( 'SCENERY/input/SimpleDragHandler' );
  var inherit = require( 'PHET_CORE/inherit' );

  var ElectronShellView = function ( atom, innerRadius, outerRadius, mvt ) {
    Node.call( this ); // Call super constructor.

    var outerRadiusInView = mvt.modelToViewDeltaX( outerRadius );
    var outerRing = new Circle( outerRadiusInView,
        // Options
                                {
                                  stroke: 1,
                                  color: 'blue',
                                  translation: mvt.modelToViewPosition( {x: 0, y: 0 } )
                                }
    );
    this.addChild( outerRing );

    var innerRadiusInView = mvt.modelToViewDeltaX( innerRadius );
    var innerRing = new Circle( innerRadiusInView,
        // Options
                                {
                                  stroke: 1,
                                  translation: mvt.modelToViewPosition( {x: 0, y: 0 } )
                                }
    );
    this.addChild( innerRing );
  };

  return ElectronShellView;
} );
