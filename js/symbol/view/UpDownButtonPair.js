// Copyright 2002-2013, University of Colorado

/**
 * This type defines a pair of buttons that can be used to control an integer
 * parameter.  It is visually similar to a spinner except that there is no
 * indication of current value.
 */
define( function( require ) {
  'use strict';

  // Imports
  var Node = require( 'SCENERY/nodes/Node' );
  var Text = require( 'SCENERY/nodes/Text' );
  var Path = require( 'SCENERY/nodes/Path' );
  var Circle = require( 'SCENERY/nodes/Circle' );
  var RadialGradient = require( 'SCENERY/util/RadialGradient' );
  var Shape = require( 'KITE/Shape' );
  var inherit = require( 'PHET_CORE/inherit' );
  var BAAGraphicButton = require( 'common/view/BAAGraphicButton' );
  var Vector2 = require( 'DOT/Vector2' );

  // Constants
  var BUTTON_RADIUS = 12; // In screen coords, basically pixels.
  var ICON_HEIGHT = BUTTON_RADIUS / 2;
  var ICON_STROKE_WIDTH = 3;

  /**
   *
   * @param upFunction - Function to execute when up button pressed.
   * @param downFunction - Function to execute when down button pressed.
   * @param options - options for this node:
   *    vertical - boolean value, defaults to true.
   * @constructor
   */
  var UpDownButtonPair = function UpDownButtonPair( upFunction, downFunction, options ) {

    Node.call( this ); // Call super constructor.
    var thisUpDownButton = this;

    options = _.extend( {
                          vertical: 'true' // Custom option that controls orientation.
                        },
                        options );

    // Create the fills used for the various button states.
    var idleButtonFill = new RadialGradient( -BUTTON_RADIUS * 0.25, -BUTTON_RADIUS * 0.25, BUTTON_RADIUS * 0.1, 0, 0, BUTTON_RADIUS ).
      addColorStop( 0, 'rgb( 150, 150, 150 )' ).
      addColorStop( 0.6, 'black' );

    var disabledButtonFill = new RadialGradient( -BUTTON_RADIUS * 0.25, -BUTTON_RADIUS * 0.25, BUTTON_RADIUS * 0.1, 0, 0, BUTTON_RADIUS ).
      addColorStop( 0, 'rgb( 150, 150, 150 )' ).
      addColorStop( 0.6, 'gray' );

    // Create the up icon that will appear on each up button
    var upSymbolShape = new Shape();
    upSymbolShape.moveTo( 0, ICON_HEIGHT );
    upSymbolShape.lineTo( BUTTON_RADIUS * 0.4, 0 );
    upSymbolShape.lineTo( BUTTON_RADIUS * 0.8, ICON_HEIGHT );
    var upIcon = new Path( {
                             shape: upSymbolShape,
                             stroke: 'yellow',
                             lineWidth: ICON_STROKE_WIDTH,
                             lineCap: 'round',
                             lineJoin: 'miter',
                             centerX: 0,
                             centerY: -BUTTON_RADIUS * 0.1 // Bit of a tweak factor for better visual effect.
                           } );

    // Create the down icon that will appear on each down button.
    var downSymbolShape = new Shape();
    downSymbolShape.moveTo( 0, 0 );
    downSymbolShape.lineTo( BUTTON_RADIUS * 0.4, ICON_HEIGHT );
    downSymbolShape.lineTo( BUTTON_RADIUS * 0.8, 0 );
    var downIcon = new Path( {
                             shape: downSymbolShape,
                             stroke: 'yellow',
                             lineWidth: ICON_STROKE_WIDTH,
                             lineCap: 'round',
                             lineJoin: 'miter',
                             centerX: 0,
                             centerY: BUTTON_RADIUS * 0.1 // Bit of a tweak factor for better visual effect.
                           } );

    // Create the buttons.
    var upButtonIdleContent = new Circle( BUTTON_RADIUS, { fill: idleButtonFill } );
    upButtonIdleContent.addChild( upIcon );
    var upButtonIdle = new BAAGraphicButton( upButtonIdleContent, upFunction );
    this.addChild( upButtonIdle );
    var upButtonDisabledContent = new Circle( BUTTON_RADIUS, { fill: disabledButtonFill } );
    upButtonDisabledContent.addChild( upIcon.mutate( { stroke: 'rgb( 200, 200, 200 )' } ) );
    var upButtonDisabled = new BAAGraphicButton( upButtonDisabledContent, function(){} );
//    this.addChild( upButtonDisabled );

    var downButtonIdleContent = new Circle( BUTTON_RADIUS, { fill: idleButtonFill } );
    downButtonIdleContent.addChild( downIcon );
    var downButtonIdle = new BAAGraphicButton( downButtonIdleContent, downFunction );
    this.addChild( downButtonIdle );
//    var downButtonIdleContent = new Circle( BUTTON_RADIUS, { fill: idleButtonFill } );
//    downButtonIdleContent.addChild( downIcon );
//    var downButtonIdle = new BAAGraphicButton( downButtonIdleContent, downFunction );
//    this.addChild( downButtonIdle );

    // Layout
    if ( options && options.vertical ) {
      downButtonIdle.top = upButtonIdle.bottom + BUTTON_RADIUS * 0.2;
    }
    else {
      downButtonIdle.left = upButtonIdle.right + BUTTON_RADIUS * 0.2;
    }
  };

  // Inherit from Node.
  inherit( Node, UpDownButtonPair );

  return UpDownButtonPair;
} );
