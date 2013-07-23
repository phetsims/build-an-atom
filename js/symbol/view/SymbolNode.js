// Copyright 2002-2013, University of Colorado Boulder
define( function( require ) {
  'use strict';

  // Imports
  var AtomIdentifier = require( 'common/AtomIdentifier' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var ChargeMeter = require( 'common/view/ChargeMeter' );
  var Image = require( 'SCENERY/nodes/Image' );
  var imageLoader = require( 'imageLoader' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var Text = require( 'SCENERY/nodes/Text' );
  var Vector2 = require( 'DOT/Vector2' );

  // Constants
  var SYMBOL_BOX_WIDTH = 275; // In screen coords, which are roughly pixels.
  var SYMBOL_BOX_HEIGHT = 300; // In screen coords, which are roughly pixels.
  var NUMBER_FONT = new PhetFont( 56 );
  var NUMBER_INSET = 20; // In screen coords, which are roughly pixels.

  /**
   * Constructor
   * @param numberAtom
   * @constructor
   */
  var SymbolNode = function SymbolNode( numberAtom ) {

    Node.call( this, { pickable: false } ); // Call super constructor.
    var thisSymbolNode = this;

    // Add the bounding box, which is also the root node for everything else
    // that comprises this node.
    var boundingBox = new Rectangle( 0, 0, SYMBOL_BOX_WIDTH, SYMBOL_BOX_HEIGHT, 0, 0,
      {
        stroke: 'black',
        lineWidth: 2,
        fill: 'white'
      } );
    this.addChild( boundingBox );

    // Add the symbol text.
    var symbolText = new Text( '',
      {
        font: new PhetFont( 150 ),
        fill: 'black',
        center: new Vector2( SYMBOL_BOX_WIDTH / 2, SYMBOL_BOX_HEIGHT / 2 )
      } );

    // Add the listener to update the symbol text.
    numberAtom.protonCountProperty.link( function( protonCount ) {
      var symbol = AtomIdentifier.getSymbol( protonCount );
      symbolText.text = protonCount > 0 ? symbol : '';
      symbolText.center = new Vector2( SYMBOL_BOX_WIDTH / 2, SYMBOL_BOX_HEIGHT / 2 );
    } );
    boundingBox.addChild( symbolText );

    // Add the proton count display.
    var protonCountDisplay = new Text( '0',
      {
        font: NUMBER_FONT,
        fill: 'red'
      } );

    // Add the listener to update the proton count.
    numberAtom.protonCountProperty.link( function( protonCount ) {
      protonCountDisplay.text = protonCount;
      protonCountDisplay.left = NUMBER_INSET;
      protonCountDisplay.bottom = SYMBOL_BOX_HEIGHT - NUMBER_INSET;
    } );
    boundingBox.addChild( protonCountDisplay );

    // Add the atomic mass display.
    var atomicMassDisplay = new Text( '0',
      {
        font: NUMBER_FONT,
        fill: 'black'
      } );
    boundingBox.addChild( atomicMassDisplay );

    // Add the listener to update the atomic mass.
    numberAtom.atomicMassProperty.link( function( atomicMass ) {
      atomicMassDisplay.text = atomicMass;
      atomicMassDisplay.left = NUMBER_INSET;
      atomicMassDisplay.top = NUMBER_INSET;
    } );

    // Add the charge display.
    var chargeDisplay = new Text( '0',
      {
        font: NUMBER_FONT,
        fill: 'black'
      } );
    boundingBox.addChild( chargeDisplay );

    // Add the listener to update the charge.
    numberAtom.chargeProperty.link( function( charge ) {
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
      chargeDisplay.text = sign + charge;
//      chargeDisplay.fill = textColor;
      chargeDisplay.right = SYMBOL_BOX_WIDTH - NUMBER_INSET;
      chargeDisplay.top = NUMBER_INSET;
    } );

    // Add the scale image - just an image with no functionality.
    var scaleImage = new Image( imageLoader.getImage( 'scale.png' ) );
    scaleImage.scale( 0.32 ); // Scale empirically determined to match design layout.
    this.addChild( scaleImage );

    // Add the charge meter.
    var chargeMeter = new ChargeMeter( numberAtom, { showNumericalReadout: false } );
    chargeMeter.scale( 1.5 );
    this.addChild( chargeMeter );

    // Do the layout.
    scaleImage.left = 0;
    scaleImage.centerY = atomicMassDisplay.centerY;
    boundingBox.top = 0;
    boundingBox.left = scaleImage.right + 10;
    chargeMeter.left = boundingBox.right + 10;
    chargeMeter.centerY = chargeDisplay.centerY;
  };

  // Inherit from Node.
  inherit( Node, SymbolNode );

  return SymbolNode;
} );
