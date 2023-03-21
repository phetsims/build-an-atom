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
  var BAASharedConstants = require( 'BUILD_AN_ATOM/common/BAASharedConstants' );
  var buildAnAtom = require( 'BUILD_AN_ATOM/buildAnAtom' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( 'SCENERY/nodes/Node' );
  var NumberEntryNode = require( 'BUILD_AN_ATOM/game/view/NumberEntryNode' );
  var Property = require( 'AXON/Property' );
  var PhetColorScheme = require( 'SCENERY_PHET/PhetColorScheme' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var ShredConstants = require( 'SHRED/ShredConstants' );
  var Text = require( 'SCENERY/nodes/Text' );
  var Vector2 = require( 'DOT/Vector2' );

  // phet-io modules
  var TNumber = require( 'ifphetio!PHET_IO/types/TNumber' );

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
    var self = this;

    options = _.extend( { // defaults
      interactiveProtonCount: false,
      interactiveMassNumber: false,
      interactiveCharge: false
    }, options );

    self.protonCountProperty = new Property( options.interactiveProtonCount ? 0 : numberAtom.protonCountProperty.get(), {
      tandem: tandem.createTandem( 'protonCountProperty' ),
      phetioValueType: TNumber( { type: 'Integer' } )
    } );
    self.massNumberProperty = new Property( options.interactiveMassNumber ? 0 : numberAtom.massNumberProperty.get(), {
      tandem: tandem.createTandem( 'massNumberProperty' ),
      phetioValueType: TNumber( { type: 'Integer' } )
    } );
    self.chargeProperty = new Property( options.interactiveCharge ? 0 : numberAtom.chargeProperty.get(), {
      tandem: tandem.createTandem( 'chargeProperty' ),
      phetioValueType: TNumber( { type: 'Integer' } )
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
        self.protonCountProperty,
        tandem.createTandem( 'protonCountEntryNode' ), {
          minValue: 0,
          maxValue: 99,
          getTextColor: function() { return PhetColorScheme.RED_COLORBLIND; },
          left: NUMBER_ENTRY_NODE_SIDE_INSET,
          centerY: SYMBOL_BOX_HEIGHT - NUMBER_INSET - interactiveNumberCenterYOffset
        } ) );
      self.protonCountProperty.link( updateElement );
    }
    else {
      var protonCountDisplay = new Text( numberAtom.protonCountProperty.get(), {
        font: NUMBER_FONT,
        fill: PhetColorScheme.RED_COLORBLIND,
        left: NUMBER_INSET,
        bottom: SYMBOL_BOX_HEIGHT - NUMBER_INSET
      } );
      boundingBox.addChild( protonCountDisplay );
      updateElement( numberAtom.protonCountProperty.get() );
    }

    // Add the mass number display, either interactive or not.
    if ( options.interactiveMassNumber ) {
      boundingBox.addChild( new NumberEntryNode(
        self.massNumberProperty,
        tandem.createTandem( 'massNumberEntryNode' ), {
          minValue: 0,
          maxValue: 99,
          left: NUMBER_ENTRY_NODE_SIDE_INSET,
          centerY: NUMBER_INSET + interactiveNumberCenterYOffset
        } ) );
    }
    else {
      var massNumberDisplay = new Text( numberAtom.massNumberProperty.get(), {
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
        self.chargeProperty,
        tandem.createTandem( 'chargeEntryNode' ), {
          minValue: -99,
          maxValue: 99,
          showPlusForPositive: true,
          getTextColor: ShredConstants.CHARGE_TEXT_COLOR,
          right: SYMBOL_BOX_WIDTH - NUMBER_ENTRY_NODE_SIDE_INSET,
          centerY: NUMBER_INSET + interactiveNumberCenterYOffset
        } ) );
    }
    else {
      var charge = numberAtom.chargeProperty.get();
      var chargeSign = charge > 0 ? '+' : charge < 0 ? BAASharedConstants.MINUS_SIGN : '';
      var chargeDisplay = new Text( Math.abs( charge ).toString() + chargeSign, {
        font: NUMBER_FONT,
        fill: ShredConstants.CHARGE_TEXT_COLOR( numberAtom.chargeProperty.get() ),
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
