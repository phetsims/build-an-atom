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
  var SharedConstants = require( 'SHRED/SharedConstants' );
  var SymbolNode = require( 'BUILD_AN_ATOM/symbol/view/SymbolNode' );
  var Text = require( 'SCENERY/nodes/Text' );

  // strings
  var symbolString = require( 'string!BUILD_AN_ATOM/symbol' );

  /**
   * Constructor.
   *
   * @param model Build an Atom model object.
   * @param {Tandem} tandem
   * @constructor
   */
  function SymbolView( model, tandem ) {
    AtomView.call( this, model, tandem ); // Call super constructor.

    this.viewProperties.addProperty( 'symbolBoxExpanded', true );

    // Add the symbol node within an accordion box.
    var symbolNode = new SymbolNode( model.numberAtom );
    symbolNode.scale( 0.43 ); // Scale empirically determined.
    var symbolBox = new AccordionBox( symbolNode, {
      titleNode: new Text( symbolString, {
        font: SharedConstants.ACCORDION_BOX_TITLE_FONT,
        maxWidth: SharedConstants.ACCORDION_BOX_TITLE_MAX_WIDTH
      } ),
      fill: SharedConstants.DISPLAY_PANEL_BACKGROUND_COLOR,
      minWidth: this.periodicTableBox.width,
      contentAlign: 'center',
      titleAlignX: 'left',
      buttonAlign: 'right',
      expandedProperty: this.viewProperties.symbolBoxExpandedProperty
    } );
    this.controlPanelLayer.addChild( symbolBox );

    // Do the layout.
    symbolBox.top = this.periodicTableBox.top + this.periodicTableBox.height + 10;
    symbolBox.left = this.periodicTableBox.left;
  }

  buildAnAtom.register( 'SymbolView', SymbolView );

  return inherit( AtomView, SymbolView );
} );
