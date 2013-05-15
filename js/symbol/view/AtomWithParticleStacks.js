// Copyright 2002-2012, University of Colorado
define( function( require ) {

  var Node = require( 'SCENERY/nodes/Node' );
  var Text = require( 'SCENERY/nodes/Text' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var Vector2 = require( 'DOT/Vector2' );
  var AtomIdentifier = require( 'common/AtomIdentifier' );
  var UpDownButtonPair = require( 'symbol/view/UpDownButtonPair' );

  var WIDTH = 225; // In screen coords, which are roughly pixels.
  var HEIGHT = 300; // In screen coords, which are roughly pixels.
  var LABEL_FONT = "45px Arial";
  var CONTROL_INSET = 10; // In screen coords, which are roughly pixels.

  var AtomWithParticleStacks = function( atom ) {

    Node.call( this ); // Call super constructor.
    var thisSymbolNode = this;

    // Add the bounding box, which is also the root node for everything else
    // that comprises this node.
    var boundingBox = new Rectangle( 0, 0, WIDTH, HEIGHT, 10, 10,
                                     {
                                       stroke: 'black',
                                       lineWidth: 1,
                                       fill: 'rgb( 229, 229, 255 )'
                                     } );
    this.addChild( boundingBox );

    // Add the control for the number of protons.
    var protonNumberControl = new UpDownButtonPair(
        function() {
          if ( atom.protonCount < 10 ) {
            atom.protonCount++;
          }
        },
        function() {
          if ( atom.protonCount > 0 ) {
            atom.protonCount--;
          }
        },
        { vertical: false }
    ).mutate( { left: CONTROL_INSET, bottom: HEIGHT - CONTROL_INSET } );
    this.addChild( protonNumberControl );

    // Add the control for the number of neutrons.
    var neutronNumberControl = new UpDownButtonPair(
        function() {
          if ( atom.neutronCount < 12 ) {
            atom.neutronCount++;
          }
        },
        function() {
          if ( atom.neutronCount > 0 ) {
            atom.neutronCount--;
          }
        },
        { vertical: false }
    ).mutate( { centerX: WIDTH / 2, bottom: HEIGHT - CONTROL_INSET } );
    this.addChild( neutronNumberControl );

    // Add the electron control.
    var electronNumberControl = new UpDownButtonPair(
        function() {
          if ( atom.electronCount > 0 ) {
            atom.electronCount--;
          }
        },
        function() {
          if ( atom.electronCount < 11 ) {
            atom.electronCount++;
          }
        },
        { vertical: false }
    ).mutate( { right: WIDTH - CONTROL_INSET, bottom: HEIGHT - CONTROL_INSET } );
    this.addChild( electronNumberControl );
  };

  // Inherit from Node.
  inherit( AtomWithParticleStacks, Node );

  return AtomWithParticleStacks;
} );
