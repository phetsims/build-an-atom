// Copyright 2002-2013, University of Colorado Boulder
define( function( require ) {
  "use strict";

  // Imports
  var Node = require( 'SCENERY/nodes/Node' );
  var Circle = require( 'SCENERY/nodes/Circle' );
  var RadialGradient = require( 'SCENERY/util/RadialGradient' );
  var RadialGradient = require( 'SCENERY/util/RadialGradient' );
  var SimpleDragHandler = require( 'SCENERY/input/SimpleDragHandler' );
  var inherit = require( 'PHET_CORE/inherit' );

  // Constants
  var LINE_DASH = [ 4, 5 ];

  var ElectronShellView = function ElectronShellView( atom, mvt, orbitsOrCloudsProperty ) {

    // Call super constructor.
    Node.call( this,
               { renderer: 'svg'} // This is necessary to get dotted lines on IE10, see Scenery issue #70.
    );

    var outerRingRadius = mvt.modelToViewDeltaX( atom.outerElectronShellRadius );
    var outerRing = new Circle( outerRingRadius,
                                {
                                  stroke: 'blue',
                                  lineWidth: 1.5,
                                  lineDash: LINE_DASH,
                                  translation: mvt.modelToViewPosition( {x: 0, y: 0 } )
                                }
    );

    var innerRing = new Circle( mvt.modelToViewDeltaX( atom.innerElectronShellRadius ),
                                {
                                  stroke: 'blue',
                                  lineWidth: 1.5,
                                  lineDash: LINE_DASH,
                                  translation: mvt.modelToViewPosition( {x: 0, y: 0 } )
                                }
    );

    var orbitsView = new Node( {children: [ innerRing, outerRing ] } );
    this.addChild( orbitsView );

    var electronCloud = new Circle( mvt.modelToViewDeltaX( atom.outerElectronShellRadius ),
                                    {
                                      fill: 'pink',
                                      translation: mvt.modelToViewPosition( {x: 0, y: 0 } )
                                    }
    );
    var cloudView = new Node( {children: [ electronCloud ] } );
    this.addChild( cloudView );

    // Update the cloud as electrons come and go.
    var updateElectronCloud = function( numElectrons ) {
      if ( numElectrons === 0 ) {
        electronCloud.radius = 1E-5; // Arbitrary non-zero value.
        electronCloud.fill = 'transparent'
      }
      else {
        var radius = outerRingRadius * ( numElectrons / 10 ); // TODO: Divisor should be max electrons, pull from a constant somewhere.;
        electronCloud.radius = radius;
        electronCloud.fill = new RadialGradient( 0, 0, 0, 0, 0, radius )
          .addColorStop( 0, 'blue' )
          .addColorStop( 1, 'rgba( 0, 0, 255, 0 )' );
      }
    };
    updateElectronCloud( atom.electrons.length );

    atom.electrons.addListener( function( added, removed, resultingArray ) {
      updateElectronCloud( resultingArray.length );
    } );

  };

  // Inherit from Node.
  inherit( Node, ElectronShellView );

  return ElectronShellView;
} );
