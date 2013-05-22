// Copyright 2002-2013, University of Colorado
define( function( require ) {

  var Node = require( 'SCENERY/nodes/Node' );
  var Text = require( 'SCENERY/nodes/Text' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var Vector2 = require( 'DOT/Vector2' );
  var AtomIdentifier = require( 'common/view/AtomIdentifier' );
  var UpDownButtonPair = require( 'symbol/view/UpDownButtonPair' );

  var WIDTH = 225; // In screen coords, which are roughly pixels.
  var HEIGHT = 300; // In screen coords, which are roughly pixels.
  var LABEL_FONT = "45px Arial";
  var CONTROL_INSET = 10; // In screen coords, which are roughly pixels.

  var AtomWithParticleStacks = function( numberAtom, particleAtom ) {

    Node.call( this ); // Call super constructor.
    var thisSymbolNode = this;

    // Add the bounding box, which is also the root node for everything else
    // that comprises this node.
    var boundingBox = new Rectangle( 0, 0, WIDTH, HEIGHT, 10, 10,
                                     {
                                       stroke: 'black',
                                       lineWidth: 1,
                                       fill: 'rgb( 254, 255, 153 )'
                                     } );
    this.addChild( boundingBox );

    // Add the control for the number of protons.
    var protonNumberControl = new UpDownButtonPair(
        function() {
          if ( numberAtom.protonCount < 10 ) {
            numberAtom.protonCount++;
          }
        },
        function() {
          if ( numberAtom.protonCount > 0 ) {
            numberAtom.protonCount--;
          }
        },
        { vertical: false }
    ).mutate( { left: CONTROL_INSET, bottom: HEIGHT - CONTROL_INSET } );
    this.addChild( protonNumberControl );

    // Add the control for the number of neutrons.
    var neutronNumberControl = new UpDownButtonPair(
        function() {
          if ( numberAtom.neutronCount < 12 ) {
            numberAtom.neutronCount++;
          }
        },
        function() {
          if ( numberAtom.neutronCount > 0 ) {
            numberAtom.neutronCount--;
          }
        },
        { vertical: false }
    ).mutate( { centerX: WIDTH / 2, bottom: HEIGHT - CONTROL_INSET } );
    this.addChild( neutronNumberControl );

    // Add the electron control.
    var electronNumberControl = new UpDownButtonPair(
        function() {
          if ( numberAtom.electronCount > 0 ) {
            numberAtom.electronCount--;
          }
        },
        function() {
          if ( numberAtom.electronCount < 11 ) {
            numberAtom.electronCount++;
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
