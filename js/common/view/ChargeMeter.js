// Copyright 2002-2013, University of Colorado Boulder

/**
 * Type that represents a change meter that displays the charge of the
 * provided atom.
 */
define( function( require ) {
  'use strict';

  // Imports
  var ArrowNode = require( 'SCENERY_PHET/ArrowNode' );
  var BAAFont = require( 'common/view/BAAFont' );
  var Dimension2 = require( 'DOT/Dimension2' );
  var inherit = require( 'PHET_CORE/inherit' );
  var LinearGradient = require( 'SCENERY/util/LinearGradient' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Path = require( 'SCENERY/nodes/Path' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var Shape = require( 'KITE/Shape' );
  var Text = require( 'SCENERY/nodes/Text' );
  var Vector2 = require( 'DOT/Vector2' );

  // Constants
  var WIDTH = 70; // In screen coords, which are roughly pixels.
  var _MAX_CHARGE = 10;
  var CHARGE_SYMBOL_WIDTH = 7; // In screen coords, which are roughly pixels.
  var SYMBOL_LINE_WIDTH = 2; // In screen coords, which are roughly pixels.

  // TODO: Document options.
  var ChargeMeter = function ChargeMeter( numberAtom, options ) {

    Node.call( this ); // Call super constructor.

    options = _.extend(
      {
        showNumericalReadout: true
      },
      options
    );

    // Add the background.
    var backgroundHeight = options.showNumericalReadout ? WIDTH * 0.9 : WIDTH * 0.55; // Multipliers arbitrary to get desired aspect ratios.
    var background = new Rectangle( 0, 0, WIDTH, backgroundHeight, 7, 7, { fill: 'rgb( 210, 210, 210 )', stroke: 'gray', lineWidth: 1.0 } );
    this.addChild( background );

    // Add the meter window.
    var meterWindowShape = new Shape();
    var meterWindowWidth = background.width * 0.8;
    var meterWindowHeight = meterWindowWidth * 0.5; // Empirically chosen, change if needed.
    meterWindowShape.moveTo( 0, meterWindowHeight );
    meterWindowShape.quadraticCurveTo( 0, 0, meterWindowWidth / 2, 0 );
    meterWindowShape.quadraticCurveTo( meterWindowWidth, 0, meterWindowWidth, meterWindowHeight );
    meterWindowShape.close();
    var meterWindow = new Path( {
                                  shape: meterWindowShape,
                                  stroke: 'gray',
                                  lineWidth: 2,
                                  fill: new LinearGradient( 0, 0, meterWindowWidth, 0 ).
                                    addColorStop( 0, 'rgb( 0, 0, 255 )' ).
                                    addColorStop( 0.5, 'white' ).
                                    addColorStop( 1, 'rgb( 255, 0, 0 )' ),
                                  centerX: background.centerX,
                                  top: 3 // Adjust as needed to work with background graphics.
                                } );
    this.addChild( meterWindow );

    // Add the plus symbol, which will be drawn (not done as a character).
    var shadowOffset = 0.5; // In pixels.
    var plusShape = new Shape().moveTo( -CHARGE_SYMBOL_WIDTH / 2, 0 ).
      lineTo( CHARGE_SYMBOL_WIDTH / 2, 0 ).
      moveTo( 0, -CHARGE_SYMBOL_WIDTH / 2 ).
      lineTo( 0, CHARGE_SYMBOL_WIDTH / 2 );
    var plusSymbol = new Node();
    plusSymbol.addChild( new Path( { shape: plusShape, lineWidth: SYMBOL_LINE_WIDTH, stroke: 'black', centerX: shadowOffset, centerY: shadowOffset } ) );
    plusSymbol.addChild( new Path( { shape: plusShape, lineWidth: SYMBOL_LINE_WIDTH, stroke: 'rgb(255, 0, 0 )' } ) );
    plusSymbol.center = new Vector2( meterWindow.width * 0.7, meterWindow.height * 0.5 );
    meterWindow.addChild( plusSymbol );

    // Add the minus symbol, which will be drawn (not done as a character).
    var minusShape = new Shape().moveTo( -CHARGE_SYMBOL_WIDTH / 2, 0 ).lineTo( CHARGE_SYMBOL_WIDTH / 2, 0 );
    var minusSymbol = new Node();
    minusSymbol.addChild( new Path( { shape: minusShape, lineWidth: SYMBOL_LINE_WIDTH, stroke: 'black', centerX: shadowOffset, centerY: shadowOffset } ) );
    minusSymbol.addChild( new Path( { shape: minusShape, lineWidth: SYMBOL_LINE_WIDTH, stroke: 'rgb(0, 0, 255 )' } ) );
    minusSymbol.center = new Vector2( meterWindow.width * 0.3, meterWindow.height * 0.5 );
    meterWindow.addChild( minusSymbol );

    // Add the layer that contains the meter line.
    var meterNeedleLayer = new Node();
    this.addChild( meterNeedleLayer );

    // Add the numerical display, if present.
    if ( options.showNumericalReadout ) {
      var size = new Dimension2( WIDTH * 0.6, ( background.height - meterWindow.height ) * 0.6 );
      var numericalReadout = new Rectangle( 0, 0, size.width, size.height, 3, 3,
                                            {
                                              fill: 'white',
                                              stroke: 'black',
                                              lineWidth: 1,
                                              top: meterWindow.bottom + 3,
                                              centerX: background.centerX
                                            } );
      this.addChild( numericalReadout );
    }

    // Add the listeners that will update the meter and numerical display when the charge changes.
    numberAtom.chargeProperty.link( function( charge ) {
      meterNeedleLayer.removeAllChildren();
      var deflectionAngle = ( charge / _MAX_CHARGE ) * Math.PI * 0.4;
      var meterNeedle = new ArrowNode( meterWindow.centerX,
                                       meterWindow.bottom - 3,
                                       meterWindow.centerX + meterWindowHeight * Math.sin( deflectionAngle ),
                                       meterWindow.bottom - meterWindowHeight * Math.cos( deflectionAngle ) * 0.9,
                                       7,
                                       5,
                                       1 );
      meterNeedleLayer.addChild( meterNeedle );

      if ( numericalReadout !== undefined ) {
        numericalReadout.removeAllChildren();
        var sign = '';
        var textColor;
        if ( charge > 0 ) {
          sign = '+';
          textColor = 'red';
        }
        else if ( charge < 0 ) {
          textColor = 'blue';
        }
        else {
          textColor = 'black';
        }
        var readoutText = new Text( sign + numberAtom.charge,
                                    {
                                      font: new BAAFont( 24, 'bold' ),
                                      fill: textColor
                                    } );
        readoutText.scale( Math.min( Math.min( numericalReadout.width * 0.8 / readoutText.width, numericalReadout.height * 0.8 / readoutText.height ), 1 ) );
        readoutText.center = new Vector2( numericalReadout.width / 2, numericalReadout.height / 2 );

        numericalReadout.addChild( readoutText );
      }
    } );
  };

  // Inherit from Node.
  inherit( Node, ChargeMeter );

  return ChargeMeter;
} );
