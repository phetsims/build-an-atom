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

  // phet-io modules
  var TBoolean = require( 'ifphetio!PHET_IO/types/TBoolean' );

  // strings
  var symbolString = require( 'string!BUILD_AN_ATOM/symbol' );

  /**
   * @param {BuildAnAtomModel} model
   * @param {Tandem} tandem
   * @constructor
   */
  function SymbolView( model, tandem ) {
    AtomView.call( this, model, tandem ); // Call super constructor.

    this.symbolAccordionBoxExpandedProperty = new Property( true, {
      tandem: tandem.createTandem( 'symbolAccordionBoxExpandedProperty' ),
      phetioValueType: TBoolean
    } );

    // Add the symbol node within an accordion box.
    var symbolNode = new SymbolNode( model.particleAtom, tandem.createTandem( 'symbolNode' ), {
      scale: 0.43 // scale empirically determined
    } );
    var symbolAccordionBox = new AccordionBox( symbolNode, {
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
      tandem: tandem.createTandem( 'symbolAccordionBox' )
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
