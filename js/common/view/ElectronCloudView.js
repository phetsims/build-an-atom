// Copyright 2002-2013, University of Colorado Boulder

/**
 * Node that represents the electron shell in an atom as a "cloud" that grows
 * and shrinks depending on the number of electrons that it contains.  This
 * has also been referred to as the "Schroedinger model" representation.
 *
 * @author John Blanco
 */
define( function( require ) {
  "use strict";

  // Imports
  var Node = require( 'SCENERY/nodes/Node' );
  var Circle = require( 'SCENERY/nodes/Circle' );
  var RadialGradient = require( 'SCENERY/util/RadialGradient' );
  var SimpleDragHandler = require( 'SCENERY/input/SimpleDragHandler' );
  var inherit = require( 'PHET_CORE/inherit' );

  var ElectronCloudView = function ElectronCloudView( atom, mvt ) {

    // Call super constructor.
    Node.call( this, { cursor: 'pointer' } );
    var thisNode = this;

    var electronCloud = new Circle( mvt.modelToViewDeltaX( atom.outerElectronShellRadius ),
                                    {
                                      fill: 'pink',
                                      translation: mvt.modelToViewPosition( {x: 0, y: 0 } )
                                    }
    );
    this.addChild( electronCloud );

    // Function that updates the size of the cloud based on the number of electrons.
    var updateElectronCloud = function( numElectrons ) {
      if ( numElectrons === 0 ) {
        electronCloud.radius = 1E-5; // Arbitrary non-zero value.
        electronCloud.fill = 'transparent';
      }
      else {
        var minRadius = mvt.modelToViewDeltaX( atom.innerElectronShellRadius ) * 0.5;
        var maxRadius = mvt.modelToViewDeltaX( atom.outerElectronShellRadius );
        var radius = minRadius + ( ( maxRadius - minRadius ) / 10 ) * numElectrons; // TODO: Divisor should be max electrons, pull from a constant somewhere.;
        electronCloud.radius = radius;
        electronCloud.fill = new RadialGradient( 0, 0, 0, 0, 0, radius )
          .addColorStop( 0, 'rgba( 0, 0, 255, 200 )' )
          .addColorStop( 0.9, 'rgba( 0, 0, 255, 0 )' );
      }
    };
    updateElectronCloud( atom.electrons.length );

    // Update the cloud size as electrons come and go.
    atom.electrons.addListener( function( added, removed, resultingArray ) {
      updateElectronCloud( resultingArray.length );
    } );

    // If the user clicks on the cloud, extract an electron.
    this.extractedElectron = null;
    this.addInputListener( new SimpleDragHandler(
      {
        activeParticle: null,
        start: function( event, trail ) {
          // Note: The following transform works, but it is a bit obscure, and
          // relies on the topology of the scene graph.  JB, SR, and JO
          // discussed potentially better ways to do it.  If this code is
          // leveraged, revisit this line for potential improvement.
          var positionInModelSpace = mvt.viewToModelPosition( thisNode.getParents()[0].globalToLocalPoint( event.pointer.point ) );

          var electron = atom.removeParticle( 'electron' );
          if ( electron !== null ) {
            electron.userControlled = true;
            electron.setPositionAndDestination( positionInModelSpace );
            thisNode.extractedElectron = electron;
          }
        },
        translate: function( translationParams ) {
          if ( thisNode.extractedElectron !== null ) {
            thisNode.extractedElectron.setPositionAndDestination( thisNode.extractedElectron.position.plus( mvt.viewToModelDelta( translationParams.delta ) ) );
          }
        },
        end: function( event ) {
          if ( thisNode.extractedElectron !== null ) {
            thisNode.extractedElectron.userControlled = false;
          }
        }
      } ) );
  };

  // Inherit from Node.
  inherit( Node, ElectronCloudView );

  return ElectronCloudView;
} );
