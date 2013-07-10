// Copyright 2002-2013, University of Colorado Boulder

/**
 * Main view for the first tab of the Build an Atom simulation.
 */
define( function( require ) {
  "use strict";

  var AccordionBox = require( 'SUN/AccordionBox' );
  var AtomTabView = require( 'common/view/AtomTabView' );
  var BAAFont = require( 'common/view/BAAFont' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( 'SCENERY/nodes/Node' );
  var SharedConstants = require( 'common/SharedConstants' );
  var SymbolNode = require( 'symbol/view/SymbolNode' );
  var Text = require( 'SCENERY/nodes/Text' );

  /**
   * Constructor.
   *
   * @param model Build an Atom model object.
   * @constructor
   */
  function SymbolTabView( model ) {
    AtomTabView.call( this, model ); // Call super constructor.
    var thisView = this;

    // Add the symbol node within an accordion box.
    var symbolNode = new SymbolNode( model.numberAtom );
    symbolNode.scale( 0.43 ); // Scale empirically determined.
    var symbolBox = new AccordionBox( symbolNode,
                                      {
                                        title: 'Symbol', // TODO: i18n
                                        fill: SharedConstants.DISPLAY_PANEL_BACKGROUND_COLOR,
                                        minWidth: this.periodicTableBox.width,
                                        contentPosition: 'center',
                                        titlePosition: 'left',
                                        buttonPosition: 'right',
                                        font: new BAAFont( 20 )
                                      } );
    this.addChild( symbolBox );

    // Do the layout.
    symbolBox.top = this.periodicTableBox.top + this.periodicTableBox.openHeight + 10;
    symbolBox.left = this.periodicTableBox.left;
  }

  // Inherit from TabView.
  inherit( AtomTabView, SymbolTabView );

  return SymbolTabView;
} );
