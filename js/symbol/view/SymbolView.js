// Copyright 2013-2018, University of Colorado Boulder

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
  var BooleanProperty = require( 'AXON/BooleanProperty' );
  var buildAnAtom = require( 'BUILD_AN_ATOM/buildAnAtom' );
  var inherit = require( 'PHET_CORE/inherit' );
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
    AtomView.call( this, model, tandem );

    this.symbolAccordionBoxExpandedProperty = new BooleanProperty( true, {
      tandem: tandem.createTandem( 'symbolAccordionBoxExpandedProperty' )
    } );

    // Add the symbol node within an accordion box.
    var symbolNode = new SymbolNode( model.particleAtom, tandem.createTandem( 'symbolNode' ), {
      scale: 0.43 // scale empirically determined
    } );
    var symbolAccordionBox = new AccordionBox( symbolNode, {
      cornerRadius: 3,
      titleNode: new Text( symbolString, {
        font: ShredConstants.ACCORDION_BOX_TITLE_FONT,
        maxWidth: ShredConstants.ACCORDION_BOX_TITLE_MAX_WIDTH,
        tandem: tandem.createTandem( 'symbolAccordionBoxTitle' )
      } ),
      fill: ShredConstants.DISPLAY_PANEL_BACKGROUND_COLOR,
      minWidth: this.periodicTableAccordionBox.width,
      contentAlign: 'center',
      titleAlignX: 'left',
      buttonAlign: 'right',
      buttonTouchAreaXDilation: 8,
      buttonTouchAreaYDilation: 8,
      expandedProperty: this.symbolAccordionBoxExpandedProperty,
      tandem: tandem.createTandem( 'symbolAccordionBox' ),

      // a11y
      labelContent: symbolString
    } );
    this.controlPanelLayer.addChild( symbolAccordionBox );

    // do the layout
    symbolAccordionBox.top = this.periodicTableAccordionBox.top + this.periodicTableAccordionBox.height + 10;
    symbolAccordionBox.left = this.periodicTableAccordionBox.left;
  }

  buildAnAtom.register( 'SymbolView', SymbolView );

  return inherit( AtomView, SymbolView, {

    /**
     * @public
     */
    reset: function() {
      AtomView.prototype.reset.call( this );
      this.symbolAccordionBoxExpandedProperty.reset();
    }
  } );
} );
