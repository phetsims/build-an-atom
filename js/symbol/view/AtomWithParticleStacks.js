// Copyright 2002-2013, University of Colorado
define( function( require ) {

  // Imports
  var Node = require( 'SCENERY/nodes/Node' );
  var Text = require( 'SCENERY/nodes/Text' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var Vector2 = require( 'DOT/Vector2' );
  var Bounds2 = require( 'DOT/Bounds2' );
  var ModelViewTransform2 = require( 'PHETCOMMON/view/ModelViewTransform2' );
  var AtomIdentifier = require( 'common/view/AtomIdentifier' );
  var UpDownButtonPair = require( 'symbol/view/UpDownButtonPair' );
  var AtomNode = require( 'common/view/AtomNode' );
  var ParticleView = require( 'common/view/ParticleView' );
  var SharedConstants = require( 'common/SharedConstants' );

  // Constants
  var WIDTH = 225; // In screen coords, which are roughly pixels.
  var HEIGHT = 300; // In screen coords, which are roughly pixels.
  var CONTROL_INSET = 10; // In screen coords, which are roughly pixels.

  /**
   * @param symbolTableModel
   * @constructor
   */
  var AtomWithParticleStacks = function( symbolTableModel ) {

    Node.call( this ); // Call super constructor.
    var thisNode = this;

    // Create our own local model view transform, since the parent view doesn't
    // have or need one.
    var mvt = ModelViewTransform2.createSinglePointScaleInvertedYMapping( { x: 0, y: 0 },
                                                                          { x: WIDTH / 2, y: HEIGHT * 0.35 },
                                                                          0.5 );

    // Add the bounding box, which is also the root node for everything else
    // that comprises this node.
    var boundingBox = new Rectangle( 0, 0, WIDTH, HEIGHT, 10, 10,
                                     {
                                       stroke: 'black',
                                       lineWidth: 1,
                                       fill: SharedConstants.DISPLAY_PANEL_BACKGROUND_COLOR
                                     } );
    this.addChild( boundingBox );

    // Add the node that presents the atom.
    var atomNode = new AtomNode( symbolTableModel.particleAtom, mvt, {showElementName: false, showStability: false, showIonIndicator: false } );
    this.addChild( atomNode );

    // Add the particle views.
    symbolTableModel.protons.forEach( function( proton ) {
      thisNode.addChild( new ParticleView( proton, mvt ) );
    } );
    symbolTableModel.neutrons.forEach( function( neutron ) {
      thisNode.addChild( new ParticleView( neutron, mvt ) );
    } );
    symbolTableModel.electrons.forEach( function( electron ) {
      thisNode.addChild( new ParticleView( electron, mvt ) );
    } );

    // Add the control for the number of protons.
    var protonNumberControl = new UpDownButtonPair(
        function() {
          if ( symbolTableModel.numberAtom.protonCount < 10 ) {
            symbolTableModel.numberAtom.protonCount++;
          }
        },
        function() {
          if ( symbolTableModel.numberAtom.protonCount > 0 ) {
            symbolTableModel.numberAtom.protonCount--;
          }
        },
        { vertical: false }
    ).mutate( { left: CONTROL_INSET, bottom: HEIGHT - CONTROL_INSET } );
    this.addChild( protonNumberControl );

    // Add the control for the number of neutrons.
    var neutronNumberControl = new UpDownButtonPair(
        function() {
          if ( symbolTableModel.numberAtom.neutronCount < 12 ) {
            symbolTableModel.numberAtom.neutronCount++;
          }
        },
        function() {
          if ( symbolTableModel.numberAtom.neutronCount > 0 ) {
            symbolTableModel.numberAtom.neutronCount--;
          }
        },
        { vertical: false }
    ).mutate( { centerX: WIDTH / 2, bottom: HEIGHT - CONTROL_INSET } );
    this.addChild( neutronNumberControl );

    // Add the control for the number of electrons.
    var electronNumberControl = new UpDownButtonPair(
        function() {
          if ( symbolTableModel.numberAtom.electronCount < 10 ) {
            symbolTableModel.numberAtom.electronCount++;
          }
        },
        function() {
          if ( symbolTableModel.numberAtom.electronCount > 0 ) {
            symbolTableModel.numberAtom.electronCount--;
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
