// Copyright 2002-2013, University of Colorado Boulder

/**
 * Main view for the "Symbol" screen of the Build an Atom simulation.
 *
 * @author John Blanco
 */
define( function( require ) {
  'use strict';

  // Imports
  var AccordionBox = require( 'SUN/AccordionBox' );
  var AtomView = require( 'BUILD_AN_ATOM/common/view/AtomView' );
  var inherit = require( 'PHET_CORE/inherit' );
  var SharedConstants = require( 'BUILD_AN_ATOM/common/SharedConstants' );
  var SymbolNode = require( 'BUILD_AN_ATOM/symbol/view/SymbolNode' );

  // Strings
  var symbolString = require( 'string!BUILD_AN_ATOM/indicator.symbol' );

  /**
   * Constructor.
   *
   * @param model Build an Atom model object.
   * @constructor
   */
  function SymbolView( model ) {
    AtomView.call( this, model ); // Call super constructor.

    // Add the symbol node within an accordion box.
    var symbolNode = new SymbolNode( model.numberAtom );
    symbolNode.scale( 0.43 ); // Scale empirically determined.
    var symbolBox = new AccordionBox( symbolNode,
      {
        title: symbolString,
        fill: SharedConstants.DISPLAY_PANEL_BACKGROUND_COLOR,
        minWidth: this.periodicTableBox.width,
        contentAlign: 'center',
        titleAlign: 'left',
        buttonAlign: 'right',
        font: SharedConstants.ACCORDION_BOX_TITLE_FONT
      } );
    this.addChild( symbolBox );

    // Add additional reset functionality.
    this.resetFunctions.push( function() { symbolBox.expandedProperty.reset(); } );

    // Do the layout.
    symbolBox.top = this.periodicTableBox.top + this.periodicTableBox.expandedHeight + 10;
    symbolBox.left = this.periodicTableBox.left;
  }

  return inherit( AtomView, SymbolView );
} );
