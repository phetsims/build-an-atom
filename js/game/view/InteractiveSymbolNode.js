// Copyright 2002-2013, University of Colorado Boulder

/**
 * Node that represents an element symbol where each of the numbers on the
 * symbol, i.e. proton count, mass number, and charge, can be interactive.
 */
define( function( require ) {
  'use strict';

  // Imports
  var AtomIdentifier = require( 'common/AtomIdentifier' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( 'SCENERY/nodes/Node' );
  var NumberEntryNode = require( 'game/view/NumberEntryNode' );
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
  function InteractiveSymbolNode( numberAtom, options ) {

    Node.call( this ); // Call super constructor.
    var thisNode = this;

    options = _.extend(
      { // defaults
        interactiveProtonCount: false,
        interactiveMassNumber: false,
        interactiveCharge: false
      }, options );

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

    // Add the proton count display, either interactive or not.
    if ( options.interactiveProtonCount ) {
      boundingBox.addChild( new NumberEntryNode( numberAtom.protonCountProperty, false,
        {
          BOTTOM: SYMBOL_BOX_HEIGHT - NUMBER_INSET,
          right: NUMBER_INSET
        } ) );
    }
    else {
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
    }

    // Add the mass number display.
    var massNumberDisplay = new Text( '0',
      {
        font: NUMBER_FONT,
        fill: 'black'
      } );
    boundingBox.addChild( massNumberDisplay );

    // Add the listener to update the mass number.
    numberAtom.massNumberProperty.link( function( massNumber ) {
      massNumberDisplay.text = massNumber;
      massNumberDisplay.left = NUMBER_INSET;
      massNumberDisplay.top = NUMBER_INSET;
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
      chargeDisplay.fill = textColor;
      chargeDisplay.right = SYMBOL_BOX_WIDTH - NUMBER_INSET;
      chargeDisplay.top = NUMBER_INSET;
    } );
  }

  // Inherit from Node.
  inherit( Node, InteractiveSymbolNode );

  return InteractiveSymbolNode;
} );
