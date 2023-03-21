// Copyright 2013-2015, University of Colorado Boulder

/**
 * Scenery node that represents an atomic symbol, meaning that it shows the
 * symbol text, the proton count, atomic number, and charge.
 *
 * @author John Blanco
 */
define( function( require ) {
  'use strict';

  // modules
  var AtomIdentifier = require( 'SHRED/AtomIdentifier' );
  var BAASharedConstants = require( 'BUILD_AN_ATOM/common/BAASharedConstants' );
  var buildAnAtom = require( 'BUILD_AN_ATOM/buildAnAtom' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var ChargeMeter = require( 'BUILD_AN_ATOM/common/view/ChargeMeter' );
  var Image = require( 'SCENERY/nodes/Image' );
  var scaleIcon = require( 'image!BUILD_AN_ATOM/scale.png' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( 'SCENERY/nodes/Node' );
  var PhetColorScheme = require( 'SCENERY_PHET/PhetColorScheme' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var Text = require( 'SCENERY/nodes/Text' );
  var ShredConstants = require( 'SHRED/ShredConstants' );
  var Vector2 = require( 'DOT/Vector2' );

  // constants
  var SYMBOL_BOX_WIDTH = 275; // In screen coords, which are roughly pixels.
  var SYMBOL_BOX_HEIGHT = 300; // In screen coords, which are roughly pixels.
  var NUMBER_FONT = new PhetFont( 56 );
  var NUMBER_INSET = 20; // In screen coords, which are roughly pixels.

  /**
   * Constructor
   * @param {NumberAtom} numberAtom
   * @param {Tandem} tandem
   * @param {Object} [options]
   * @constructor
   */
  function SymbolNode( numberAtom, tandem, options ) {

    Node.call( this, { pickable: false } ); // Call super constructor.

    // Add the bounding box, which is also the root node for everything else
    // that comprises this node.
    var boundingBox = new Rectangle( 0, 0, SYMBOL_BOX_WIDTH, SYMBOL_BOX_HEIGHT, 0, 0, {
      stroke: 'black',
      lineWidth: 2,
      fill: 'white',
      tandem: tandem.createTandem( 'boundingBox' )
    } );
    this.addChild( boundingBox );

    // Add the symbol text.
    var symbolText = new Text( '', {
      font: new PhetFont( 150 ),
      fill: 'black',
      center: new Vector2( SYMBOL_BOX_WIDTH / 2, SYMBOL_BOX_HEIGHT / 2 ),
      tandem: tandem.createTandem( 'symbolText' )
    } );

    // Add the listener to update the symbol text.
    var textCenter = new Vector2( SYMBOL_BOX_WIDTH / 2, SYMBOL_BOX_HEIGHT / 2 );
    numberAtom.protonCountProperty.link( function( protonCount ) {
      var symbol = AtomIdentifier.getSymbol( protonCount );
      symbolText.text = protonCount > 0 ? symbol : '';
      symbolText.center = textCenter;
    } );
    boundingBox.addChild( symbolText );

    // Add the atomic number display.
    var atomicNumberDisplay = new Text( '0', {
      font: NUMBER_FONT,
      fill: PhetColorScheme.RED_COLORBLIND,
      tandem: tandem.createTandem( 'atomicNumberDisplay' )
    } );

    // Add the listener to update the proton count.
    numberAtom.protonCountProperty.link( function( protonCount ) {
      atomicNumberDisplay.text = protonCount;
      atomicNumberDisplay.left = NUMBER_INSET;
      atomicNumberDisplay.bottom = SYMBOL_BOX_HEIGHT - NUMBER_INSET;
    } );
    boundingBox.addChild( atomicNumberDisplay );

    // Add the mass number display.
    var massNumberDisplay = new Text( '0', {
      font: NUMBER_FONT,
      fill: 'black',
      tandem: tandem.createTandem( 'massNumberDisplay' )
    } );
    boundingBox.addChild( massNumberDisplay );

    // Add the listener to update the mass number.
    numberAtom.massNumberProperty.link( function( massNumber ) {
      massNumberDisplay.text = massNumber.toString();
      massNumberDisplay.left = NUMBER_INSET;
      massNumberDisplay.top = NUMBER_INSET;
    } );

    // Add the charge display.
    var chargeDisplay = new Text( '0', {
      font: NUMBER_FONT,
      fill: 'black',
      tandem: tandem.createTandem( 'chargeDisplay' )
    } );
    boundingBox.addChild( chargeDisplay );

    // Add the listener to update the charge.
    numberAtom.chargeProperty.link( function( charge ) {
      var chargeChar = charge > 0 ? '+' : charge < 0 ? BAASharedConstants.MINUS_SIGN : '';
      chargeDisplay.text = Math.abs( charge ).toString( 10 ) + chargeChar;
      chargeDisplay.fill = ShredConstants.CHARGE_TEXT_COLOR( charge );
      chargeDisplay.right = SYMBOL_BOX_WIDTH - NUMBER_INSET;
      chargeDisplay.top = NUMBER_INSET;
    } );

    // Add the scale image - just an image with no functionality.
    var scaleImage = new Image( scaleIcon, { tandem: tandem.createTandem( 'scaleImage' ) } );
    scaleImage.scale( 0.32 ); // Scale empirically determined to match design layout.
    this.addChild( scaleImage );

    // Add the charge meter.
    var chargeMeter = new ChargeMeter( numberAtom, tandem.createTandem( 'chargeMeter' ), {
      showNumericalReadout: false
    } );
    chargeMeter.scale( 1.5 );
    this.addChild( chargeMeter );

    // Do the layout.
    scaleImage.left = 0;
    scaleImage.centerY = massNumberDisplay.centerY;
    boundingBox.top = 0;
    boundingBox.left = scaleImage.right + 10;
    chargeMeter.left = boundingBox.right + 10;
    chargeMeter.centerY = chargeDisplay.centerY;

    options.tandem = tandem;
    this.mutate( options );
  }

  buildAnAtom.register( 'SymbolNode', SymbolNode );

  // Inherit from Node.
  return inherit( Node, SymbolNode );
} );
