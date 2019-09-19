// Copyright 2013-2019, University of Colorado Boulder

/**
 * Main view for the "Symbol" screen of the Build an Atom simulation.
 *
 * @author John Blanco
 */
define( require => {
  'use strict';

  // modules
  const AccordionBox = require( 'SUN/AccordionBox' );
  const AtomView = require( 'BUILD_AN_ATOM/common/view/AtomView' );
  const BooleanProperty = require( 'AXON/BooleanProperty' );
  const buildAnAtom = require( 'BUILD_AN_ATOM/buildAnAtom' );
  const inherit = require( 'PHET_CORE/inherit' );
  const ShredConstants = require( 'SHRED/ShredConstants' );
  const SymbolNode = require( 'BUILD_AN_ATOM/symbol/view/SymbolNode' );
  const Text = require( 'SCENERY/nodes/Text' );

  // strings
  const symbolString = require( 'string!BUILD_AN_ATOM/symbol' );

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
      expandedProperty: this.symbolAccordionBoxExpandedProperty,
      expandCollapseButtonOptions: {
        touchAreaXDilation: 12,
        touchAreaYDilation: 12
      },

      // phet-io
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
