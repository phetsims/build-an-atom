// Copyright 2002-2013, University of Colorado

/**
 * Type that represents a change meter that displays the charge of the
 * provided atom.
 */
define( function( require ) {
  "use strict";

  // Imports
  var Node = require( 'SCENERY/nodes/Node' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var Vector2 = require( 'DOT/Vector2' );
  var Image = require( 'SCENERY/nodes/Image' );
  var BAAImages = require( "common/BAAImages" );
  var Path = require( 'SCENERY/nodes/Path' );
  var Shape = require( 'KITE/Shape' );
  var LinearGradient = require( 'SCENERY/util/LinearGradient' );

  // Constants
  var _WIDTH = 70; // In screen coords, which are roughly pixels.
  var _MAX_CHARGE = 10;
  var _CHARGE_SYMBOL_WIDTH = 7; // In screen coords, which are roughly pixels.
  var _SYMBOL_LINE_WIDTH = 2; // In screen coords, which are roughly pixels.

  var ChargeMeter = function( atom ) {

    Node.call( this ); // Call super constructor.

    // Add the background image.
    var background = new Image( BAAImages.getImage( "charge_meter_short_background.svg" ) );
    background.scale( _WIDTH / background.width ); // Scale to the targeted width.
    this.addChild( background );

    // Add the meter window.
    var meterWindowShape = new Shape();
    var meterWindowWidth = background.width * 0.8;
    var meterWindowHeight = background.height * 0.7;
    meterWindowShape.moveTo( 0, meterWindowHeight );
    meterWindowShape.quadraticCurveTo( 0, 0, meterWindowWidth / 2, 0 );
    meterWindowShape.quadraticCurveTo( meterWindowWidth, 0, meterWindowWidth, meterWindowHeight );
    meterWindowShape.close();
    var meterWindow = new Path( {
                                  shape: meterWindowShape,
                                  stroke: 'gray',
                                  lineWidth: 2,
                                  fill: new LinearGradient( 0, 0, meterWindowWidth, 0 ).
                                      addColorStop( 0, 'blue' ).
                                      addColorStop( 0.5, 'white' ).
                                      addColorStop( 1, 'red' ),
                                  center: background.center
                                } );
    this.addChild( meterWindow );

    // Add the plus symbol, which will be drawn (not done as a character).
    var shadowOffset = 0.5; // In pixels.
    var plusShape = new Shape().moveTo( -_CHARGE_SYMBOL_WIDTH / 2, 0 ).
        lineTo( _CHARGE_SYMBOL_WIDTH / 2, 0 ).
        moveTo( 0, -_CHARGE_SYMBOL_WIDTH / 2 ).
        lineTo( 0, _CHARGE_SYMBOL_WIDTH / 2 );
    var plusSymbol = new Node();
    plusSymbol.addChild( new Path( { shape: plusShape, lineWidth: _SYMBOL_LINE_WIDTH, stroke: 'black', centerX: shadowOffset, centerY: shadowOffset } ) );
    plusSymbol.addChild( new Path( { shape: plusShape, lineWidth: _SYMBOL_LINE_WIDTH, stroke: 'rgb(255, 0, 0 )' } ) );
    plusSymbol.center = new Vector2( background.width * 0.7, background.height * 0.5 );
    this.addChild( plusSymbol );

    // Add the minus symbol, which will be drawn (not done as a character).
    var minusShape = new Shape().moveTo( -_CHARGE_SYMBOL_WIDTH / 2, 0 ).lineTo( _CHARGE_SYMBOL_WIDTH / 2, 0 );
    var minusSymbol = new Node();
    minusSymbol.addChild( new Path( { shape: minusShape, lineWidth: _SYMBOL_LINE_WIDTH, stroke: 'black', centerX: shadowOffset, centerY: shadowOffset } ) );
    minusSymbol.addChild( new Path( { shape: minusShape, lineWidth: _SYMBOL_LINE_WIDTH, stroke: 'rgb(0, 0, 255 )' } ) );
    minusSymbol.center = new Vector2( background.width * 0.3, background.height * 0.5 );
    this.addChild( minusSymbol );

    // Add the layer that contains the meter line.
    var meterLineLayer = new Node();
    this.addChild( meterLineLayer );

    // Define a function that updates the meter when the atom charge changes.
    var update = function() {
      meterLineLayer.removeAllChildren();
      var lineShape = new Shape();
      lineShape.moveTo( meterWindow.centerX, meterWindow.bottom - 3 );
      var deflectionAngle = ( atom.getCharge() / _MAX_CHARGE ) * Math.PI * 0.4;
      lineShape.lineTo( meterWindow.centerX + meterWindowHeight * Math.sin( deflectionAngle ), meterWindow.bottom - meterWindowHeight * Math.cos( deflectionAngle ) * 0.9 );
      meterLineLayer.addChild( new Path( { shape: lineShape, lineWidth: 2, stroke: 'black', lineCap: 'round'} ) );
    };

    // Add the listeners that will call the update function.
    atom.link( 'protonCount', function() {
      update();
    } );
    atom.link( 'electronCount', function() {
      update();
    } );
  };

  // Inherit from Node.
  inherit( ChargeMeter, Node );

  return ChargeMeter;
} );
