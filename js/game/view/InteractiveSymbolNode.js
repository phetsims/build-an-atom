// Copyright 2013-2015, University of Colorado Boulder

/**
 * Node that represents an element symbol where each of the numbers on the
 * symbol, i.e. proton count, mass number, and charge, can be interactive.
 *
 * @author John Blanco
 */
define( function( require ) {
  'use strict';

  // modules
  var AtomIdentifier = require( 'SHRED/AtomIdentifier' );
  var buildAnAtom = require( 'BUILD_AN_ATOM/buildAnAtom' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( 'SCENERY/nodes/Node' );
  var NumberEntryNode = require( 'BUILD_AN_ATOM/game/view/NumberEntryNode' );
  var Property = require( 'AXON/Property' );
  var PhetColorScheme = require( 'SCENERY_PHET/PhetColorScheme' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var SharedConstants = require( 'SHRED/SharedConstants' );
  var Text = require( 'SCENERY/nodes/Text' );
  var Vector2 = require( 'DOT/Vector2' );

  // constants
  var SYMBOL_BOX_WIDTH = 275; // In screen coords, which are roughly pixels.
  var SYMBOL_BOX_HEIGHT = 300; // In screen coords, which are roughly pixels.
  var NUMBER_FONT = new PhetFont( 56 );
  var NUMBER_INSET = 15; // In screen coords, which are roughly pixels.
  var NUMBER_ENTRY_NODE_SIDE_INSET = 10; // In screen coords, which are roughly pixels.

  /**
   * Constructor
   * @param {NumberAtom} numberAtom
   * @param {Tandem} tandem
   * @param {Object} [options]
   * @constructor
   */
  function InteractiveSymbolNode( numberAtom, tandem, options ) {

    Node.call( this, options ); // Call super constructor.
    var thisNode = this;

    options = _.extend( { // defaults
      interactiveProtonCount: false,
      interactiveMassNumber: false,
      interactiveCharge: false
    }, options );

    thisNode.protonCountProperty = new Property( options.interactiveProtonCount ? 0 : numberAtom.protonCount, {
      tandem: tandem.createTandem( 'protonCountProperty' )
    } );
    thisNode.massNumberProperty = new Property( options.interactiveMassNumber ? 0 : numberAtom.massNumber, {
      tandem: tandem.createTandem( 'massNumberProperty' )
    } );
    thisNode.chargeProperty = new Property( options.interactiveCharge ? 0 : numberAtom.charge, {
      tandem: tandem.createTandem( 'chargeProperty' )
    } );

    // Add the bounding box, which is also the root node for everything else
    // that comprises this node.
    var boundingBox = new Rectangle( 0, 0, SYMBOL_BOX_WIDTH, SYMBOL_BOX_HEIGHT, 0, 0, {
      stroke: 'black',
      lineWidth: 2,
      fill: 'white'
    } );
    this.addChild( boundingBox );

    // Add the symbol text.
    var symbolText = new Text( '', {
      font: new PhetFont( 150 ),
      fill: 'black',
      center: new Vector2( SYMBOL_BOX_WIDTH / 2, SYMBOL_BOX_HEIGHT / 2 )
    } );
    boundingBox.addChild( symbolText );

    // Add the element caption.
    var elementCaption = new Text( '', {
      font: new PhetFont( 40 ),
      fill: PhetColorScheme.RED_COLORBLIND,
      top: SYMBOL_BOX_HEIGHT + 20,
      centerX: SYMBOL_BOX_WIDTH / 2,
      maxWidth: SYMBOL_BOX_WIDTH
    } );
    boundingBox.addChild( elementCaption );

    // Define a function to update the symbol text and element caption.
    var updateElement = function( protonCount ) {
      symbolText.text = protonCount > 0 ? AtomIdentifier.getSymbol( protonCount ) : '';
      symbolText.center = new Vector2( SYMBOL_BOX_WIDTH / 2, SYMBOL_BOX_HEIGHT / 2 );
      elementCaption.text = protonCount > 0 ? AtomIdentifier.getName( protonCount ) : '';
      elementCaption.centerX = SYMBOL_BOX_WIDTH / 2;
    };

    // So that the interactive and non-interactive numbers are vertically
    // aligned, we need to create a dummy number and look at its height.
    var interactiveNumberCenterYOffset = new Text( '8', { font: NUMBER_FONT } ).height / 2;

    // Add the proton count display, either interactive or not.
    if ( options.interactiveProtonCount ) {
      boundingBox.addChild( new NumberEntryNode(
        thisNode.protonCountProperty,
        tandem.createTandem( 'protonCountEntryNode' ), {
          minValue: 0,
          maxValue: 99,
          getTextColor: function() { return PhetColorScheme.RED_COLORBLIND; },
          left: NUMBER_ENTRY_NODE_SIDE_INSET,
          centerY: SYMBOL_BOX_HEIGHT - NUMBER_INSET - interactiveNumberCenterYOffset
        } ) );
      thisNode.protonCountProperty.link( updateElement );
    }
    else {
      var protonCountDisplay = new Text( numberAtom.protonCount, {
        font: NUMBER_FONT,
        fill: PhetColorScheme.RED_COLORBLIND,
        left: NUMBER_INSET,
        bottom: SYMBOL_BOX_HEIGHT - NUMBER_INSET
      } );
      boundingBox.addChild( protonCountDisplay );
      updateElement( numberAtom.protonCount );
    }

    // Add the mass number display, either interactive or not.
    if ( options.interactiveMassNumber ) {
      boundingBox.addChild( new NumberEntryNode(
        thisNode.massNumberProperty,
        tandem.createTandem( 'massNumberEntryNode' ), {
          minValue: 0,
          maxValue: 99,
          left: NUMBER_ENTRY_NODE_SIDE_INSET,
          centerY: NUMBER_INSET + interactiveNumberCenterYOffset
        } ) );
    }
    else {
      var massNumberDisplay = new Text( numberAtom.massNumber, {
        font: NUMBER_FONT,
        fill: 'black',
        left: NUMBER_INSET,
        top: NUMBER_INSET
      } );
      boundingBox.addChild( massNumberDisplay );
    }

    // Add the charge display, either interactive or not.
    if ( options.interactiveCharge ) {
      boundingBox.addChild( new NumberEntryNode(
        thisNode.chargeProperty,
        tandem.createTandem( 'chargeEntryNode' ), {
          minValue: -99,
          maxValue: 99,
          prependPlusSign: true,
          getTextColor: SharedConstants.CHARGE_TEXT_COLOR,
          right: SYMBOL_BOX_WIDTH - NUMBER_ENTRY_NODE_SIDE_INSET,
          centerY: NUMBER_INSET + interactiveNumberCenterYOffset
        } ) );
    }
    else {
      var chargeTextPrepend = numberAtom.charge > 0 ? '+' : '';
      var chargeDisplay = new Text( chargeTextPrepend + numberAtom.charge, {
        font: NUMBER_FONT,
        fill: SharedConstants.CHARGE_TEXT_COLOR( numberAtom.charge ),
        right: SYMBOL_BOX_WIDTH - NUMBER_INSET,
        top: NUMBER_INSET
      } );
      boundingBox.addChild( chargeDisplay );
    }
  }

  buildAnAtom.register( 'InteractiveSymbolNode', InteractiveSymbolNode );

  // Inherit from Node.
  return inherit( Node, InteractiveSymbolNode, {

    // @public
    reset: function() {
      this.protonCountProperty.reset();
      this.massNumberProperty.reset();
      this.chargeProperty.reset();
    }
  } );
} );
