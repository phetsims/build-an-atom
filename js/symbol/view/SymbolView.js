// Copyright 2013-2015, University of Colorado Boulder

/**
 * Main view for the "Symbol" screen of the Build an Atom simulation.
 *
 * @author John Blanco
 */
define( function( require ) {
  'use strict';

  // modules
  var AccordionBox = require( 'SUN/AccordionBox' );
  var AtomView = require( 'BUILD_AN_ATOM/common/view/AtomView' );
  var buildAnAtom = require( 'BUILD_AN_ATOM/buildAnAtom' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Property = require( 'AXON/Property' );
  var ShredConstants = require( 'SHRED/ShredConstants' );
  var SymbolNode = require( 'BUILD_AN_ATOM/symbol/view/SymbolNode' );
  var Text = require( 'SCENERY/nodes/Text' );

  // strings
  var symbolString = require( 'string!BUILD_AN_ATOM/symbol' );

  /**
   * @param {BuildAnAtomModel} model
   * @param {Tandem} tandem
   * @constructor
   */
  function SymbolView( model, tandem ) {
    AtomView.call( this, model, tandem ); // Call super constructor.

    this.symbolBoxExpandedProperty = new Property( true );

    // Add the symbol node within an accordion box.
    var symbolNode = new SymbolNode( model.numberAtom, tandem.createTandem( 'symbolNode' ) );
    symbolNode.scale( 0.43 ); // Scale empirically determined.
    var symbolBox = new AccordionBox( symbolNode, {
      titleNode: new Text( symbolString, {
        font: ShredConstants.ACCORDION_BOX_TITLE_FONT,
        maxWidth: ShredConstants.ACCORDION_BOX_TITLE_MAX_WIDTH
      } ),
      fill: ShredConstants.DISPLAY_PANEL_BACKGROUND_COLOR,
      minWidth: this.periodicTableBox.width,
      contentAlign: 'center',
      titleAlignX: 'left',
      buttonAlign: 'right',
      buttonTouchAreaXDilation: 8,
      buttonTouchAreaYDilation: 8,
      expandedProperty: this.symbolBoxExpandedProperty
    } );
    this.controlPanelLayer.addChild( symbolBox );

    // do the layout
    symbolBox.top = this.periodicTableBox.top + this.periodicTableBox.height + 10;
    symbolBox.left = this.periodicTableBox.left;
  }

  buildAnAtom.register( 'SymbolView', SymbolView );

  return inherit( AtomView, SymbolView, {
    reset: function() {
      AtomView.prototype.reset.call( this );
      this.symbolBoxExpandedProperty.reset();
    }
  } );
} );
