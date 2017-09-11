// Copyright 2013-2015, University of Colorado Boulder

/**
 * Type that represents a change meter that displays the charge of the
 * provided atom.
 */
define( function( require ) {
  'use strict';

  // modules
  var ArrowNode = require( 'SCENERY_PHET/ArrowNode' );
  var buildAnAtom = require( 'BUILD_AN_ATOM/buildAnAtom' );
  var Dimension2 = require( 'DOT/Dimension2' );
  var inherit = require( 'PHET_CORE/inherit' );
  var LinearGradient = require( 'SCENERY/util/LinearGradient' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Path = require( 'SCENERY/nodes/Path' );
  var PhetColorScheme = require( 'SCENERY_PHET/PhetColorScheme' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var Shape = require( 'KITE/Shape' );
  var Text = require( 'SCENERY/nodes/Text' );
  var Vector2 = require( 'DOT/Vector2' );

  // constants
  var WIDTH = 70; // In screen coords, which are roughly pixels.
  var _MAX_CHARGE = 10;
  var CHARGE_SYMBOL_WIDTH = 7; // In screen coords, which are roughly pixels.
  var SYMBOL_LINE_WIDTH = 2; // In screen coords, which are roughly pixels.

  /**
   * @param {NumberAtom} numberAtom
   * @param {Tandem} tandem
   * @param {Object} [options]
   * @constructor
   */
  function ChargeMeter( numberAtom, tandem, options ) {

    Node.call( this ); // Call super constructor.

    options = _.extend( { showNumericalReadout: true }, options );

    // Add the background.
    var backgroundHeight = options.showNumericalReadout ? WIDTH * 0.9 : WIDTH * 0.55; // Multipliers arbitrary to get desired aspect ratios.
    var background = new Rectangle( 0, 0, WIDTH, backgroundHeight, 7, 7, {
      fill: 'rgb( 210, 210, 210 )',
      stroke: 'gray',
      lineWidth: 1.0,
      tandem: tandem.createTandem( 'background' )
    } );
    this.addChild( background );

    // Add the meter window.
    var meterWindowShape = new Shape();
    var meterWindowWidth = background.width * 0.8;
    var meterWindowHeight = meterWindowWidth * 0.5; // Empirically chosen, change if needed.
    meterWindowShape.moveTo( 0, meterWindowHeight );
    meterWindowShape.quadraticCurveTo( 0, 0, meterWindowWidth / 2, 0 );
    meterWindowShape.quadraticCurveTo( meterWindowWidth, 0, meterWindowWidth, meterWindowHeight );
    meterWindowShape.close();
    var meterWindow = new Path( meterWindowShape, {
      stroke: 'gray',
      lineWidth: 2,
      fill: new LinearGradient( 0, 0, meterWindowWidth, 0 )
        .addColorStop( 0, 'rgb( 0, 0, 255 )' )
        .addColorStop( 0.5, 'white' )
        .addColorStop( 1, 'rgb( 255, 0, 0 )' ),
      centerX: background.centerX,
      top: 3, // Adjust as needed to work with background graphics.
      tandem: tandem.createTandem( 'meterWindow' )
    } );
    this.addChild( meterWindow );

    // Add the plus symbol, which will be drawn (not done as a character).
    var shadowOffset = 0.5; // In pixels.
    var plusShape = new Shape().moveTo( -CHARGE_SYMBOL_WIDTH / 2, 0 ).lineTo( CHARGE_SYMBOL_WIDTH / 2, 0 ).moveTo( 0, -CHARGE_SYMBOL_WIDTH / 2 ).lineTo( 0, CHARGE_SYMBOL_WIDTH / 2 );
    var plusSymbol = new Node( { tandem: tandem.createTandem( 'plusSymbol' ) } );
    plusSymbol.addChild( new Path( plusShape, {
      lineWidth: SYMBOL_LINE_WIDTH,
      stroke: 'black',
      centerX: shadowOffset,
      centerY: shadowOffset,
      tandem: tandem.createTandem( 'plusSymbolShadow' )
    } ) );
    plusSymbol.addChild( new Path( plusShape, {
      lineWidth: SYMBOL_LINE_WIDTH,
      stroke: 'rgb(255, 0, 0 )',
      tandem: tandem.createTandem( 'plusSymbolMainShape' )
    } ) );
    plusSymbol.center = new Vector2( meterWindow.width * 0.7, meterWindow.height * 0.5 );
    meterWindow.addChild( plusSymbol );

    // Add the minus symbol, which will be drawn (not done as a character).
    var minusShape = new Shape().moveTo( -CHARGE_SYMBOL_WIDTH / 2, 0 ).lineTo( CHARGE_SYMBOL_WIDTH / 2, 0 );
    var minusSymbol = new Node( { tandem: tandem.createTandem( 'minusSymbol' ) } );
    minusSymbol.addChild( new Path( minusShape, {
      lineWidth: SYMBOL_LINE_WIDTH,
      stroke: 'black',
      centerX: shadowOffset,
      centerY: shadowOffset,
      tandem: tandem.createTandem( 'minusSymbolShadow' )
    } ) );
    minusSymbol.addChild( new Path( minusShape, {
      lineWidth: SYMBOL_LINE_WIDTH,
      stroke: 'rgb(0, 0, 255 )',
      tandem: tandem.createTandem( 'minusSymbolMainShape' )
    } ) );
    minusSymbol.center = new Vector2( meterWindow.width * 0.3, meterWindow.height * 0.5 );
    meterWindow.addChild( minusSymbol );

    // Add the layer that contains the meter line.
    var meterNeedleLayer = new Node( {
      x: meterWindow.centerX,
      y: meterWindow.bottom - 3,
      tandem: tandem.createTandem( 'meterNeedleWindow' )
    } );
    meterNeedleLayer.setScaleMagnitude( 1, 0.9 ); // match previous scaling behavior
    var meterNeedle = new ArrowNode(
      0, 0, // tip at origin, so we can rotate around it
      0, 3 - meterWindowHeight, {
        headHeight: 7,
        headWidth: 5,
        tailWidth: 1,
        tandem: tandem.createTandem( 'meterNeedle' )
      } );
    meterNeedleLayer.addChild( meterNeedle );
    this.addChild( meterNeedleLayer );

    var numericalReadout;
    var readoutText;

    // Add the numerical display, if present.
    var readoutSize = new Dimension2( WIDTH * 0.6, ( background.height - meterWindow.height ) * 0.6 );
    if ( options.showNumericalReadout ) {
      numericalReadout = new Rectangle( 0, 0, readoutSize.width, readoutSize.height, 3, 3, {
        fill: 'white',
        stroke: 'black',
        lineWidth: 1,
        top: meterWindow.bottom + 3,
        centerX: background.centerX,
        tandem: tandem.createTandem( 'numericalReadout' )
      } );
      this.addChild( numericalReadout );

      // Created with placeholder empty-string, which will be changed.
      readoutText = new Text( '', {
        font: new PhetFont( { size: 24, weight: 'bold' } ),
        tandem: tandem.createTandem( 'readoutText' )
      } );
      numericalReadout.addChild( readoutText );
    }

    // Add the listeners that will update the meter and numerical display when the charge changes.
    numberAtom.chargeProperty.link( function( charge ) {
      meterNeedle.rotation = ( charge / _MAX_CHARGE ) * Math.PI * 0.4;

      if ( numericalReadout !== undefined ) {
        var sign = '';
        var textColor;
        if ( charge > 0 ) {
          sign = '+';
          textColor = PhetColorScheme.RED_COLORBLIND;
        }
        else if ( charge < 0 ) {
          textColor = 'blue';
        }
        else {
          textColor = 'black';
        }
        readoutText.fill = textColor;

        var newText = sign + charge;
        if ( newText !== readoutText.text ) {
          readoutText.text = newText;

          // reposition as necessary.
          readoutText.resetTransform();
          readoutText.scale( Math.min( Math.min( readoutSize.width * 0.8 / readoutText.width, readoutSize.height * 0.8 / readoutText.height ), 1 ) );
          readoutText.center = new Vector2( readoutSize.width / 2, readoutSize.height / 2 );
        }
      }
    } );

    options.tandem = tandem;
    this.mutate( options );
  }

  buildAnAtom.register( 'ChargeMeter', ChargeMeter );

  // Inherit from Node.
  return inherit( Node, ChargeMeter );
} );
