// Copyright 2013-2023, University of Colorado Boulder

/**
 * Type that represents a change meter that displays the charge of the
 * provided atom.
 */

import Dimension2 from '../../../../dot/js/Dimension2.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import { Shape } from '../../../../kite/js/imports.js';
import merge from '../../../../phet-core/js/merge.js';
import ArrowNode from '../../../../scenery-phet/js/ArrowNode.js';
import PhetColorScheme from '../../../../scenery-phet/js/PhetColorScheme.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import { LinearGradient, Node, Path, Rectangle, Text } from '../../../../scenery/js/imports.js';
import buildAnAtom from '../../buildAnAtom.js';

// constants
const WIDTH = 70; // In screen coords, which are roughly pixels.
const _MAX_CHARGE = 10;
const CHARGE_SYMBOL_WIDTH = 7; // In screen coords, which are roughly pixels.
const SYMBOL_LINE_WIDTH = 2; // In screen coords, which are roughly pixels.

class ChargeMeter extends Node {

  /**
   * @param {NumberAtom} numberAtom
   * @param {Tandem} tandem
   * @param {Object} [options]
   */
  constructor( numberAtom, tandem, options ) {

    options = merge( { showNumericalReadout: true, tandem: tandem }, options );

    super();

    // Add the background.
    const backgroundHeight = options.showNumericalReadout ? WIDTH * 0.9 : WIDTH * 0.55; // Multipliers arbitrary to get desired aspect ratios.
    const background = new Rectangle( 0, 0, WIDTH, backgroundHeight, 7, 7, {
      fill: 'rgb( 210, 210, 210 )',
      stroke: 'gray',
      lineWidth: 1.0,
      tandem: tandem.createTandem( 'background' )
    } );
    this.addChild( background );

    // Add the meter window.
    const meterWindowShape = new Shape();
    const meterWindowWidth = background.width * 0.8;
    const meterWindowHeight = meterWindowWidth * 0.5; // Empirically chosen, change if needed.
    meterWindowShape.moveTo( 0, meterWindowHeight );
    meterWindowShape.quadraticCurveTo( 0, 0, meterWindowWidth / 2, 0 );
    meterWindowShape.quadraticCurveTo( meterWindowWidth, 0, meterWindowWidth, meterWindowHeight );
    meterWindowShape.close();
    const meterWindow = new Path( meterWindowShape, {
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
    const shadowOffset = 0.5; // In pixels.
    const plusShape = new Shape().moveTo( -CHARGE_SYMBOL_WIDTH / 2, 0 ).lineTo( CHARGE_SYMBOL_WIDTH / 2, 0 ).moveTo( 0, -CHARGE_SYMBOL_WIDTH / 2 ).lineTo( 0, CHARGE_SYMBOL_WIDTH / 2 );
    const plusSymbol = new Node( { tandem: tandem.createTandem( 'plusSymbol' ) } );
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
    const minusShape = new Shape().moveTo( -CHARGE_SYMBOL_WIDTH / 2, 0 ).lineTo( CHARGE_SYMBOL_WIDTH / 2, 0 );
    const minusSymbol = new Node( { tandem: tandem.createTandem( 'minusSymbol' ) } );
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
    const meterNeedleLayer = new Node( {
      x: meterWindow.centerX,
      y: meterWindow.bottom - 3,
      tandem: tandem.createTandem( 'meterNeedleWindow' )
    } );
    meterNeedleLayer.setScaleMagnitude( 1, 0.9 ); // match previous scaling behavior
    const meterNeedle = new ArrowNode(
      0, 0, // tip at origin, so we can rotate around it
      0, 3 - meterWindowHeight, {
        headHeight: 7,
        headWidth: 5,
        tailWidth: 1,
        tandem: tandem.createTandem( 'meterNeedle' )
      } );
    meterNeedleLayer.addChild( meterNeedle );
    this.addChild( meterNeedleLayer );

    let numericalReadout;
    let readoutText;

    // Add the numerical display, if present.
    const readoutSize = new Dimension2( WIDTH * 0.6, ( background.height - meterWindow.height ) * 0.6 );
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
    numberAtom.chargeProperty.link( charge => {
      meterNeedle.rotation = ( charge / _MAX_CHARGE ) * Math.PI * 0.4;

      if ( numericalReadout !== undefined ) {
        let sign = '';
        let textColor;
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

        const newText = sign + charge;
        if ( newText !== readoutText.string ) {
          readoutText.string = newText;

          // reposition as necessary.
          readoutText.resetTransform();
          readoutText.scale( Math.min( Math.min( readoutSize.width * 0.8 / readoutText.width, readoutSize.height * 0.8 / readoutText.height ), 1 ) );
          readoutText.center = new Vector2( readoutSize.width / 2, readoutSize.height / 2 );
        }
      }
    } );

    this.mutate( options );
  }
}

buildAnAtom.register( 'ChargeMeter', ChargeMeter );

export default ChargeMeter;