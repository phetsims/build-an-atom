// Copyright 2002-2013, University of Colorado Boulder

/**
 * Main view for the first tab of the Build an Atom simulation.
 */
define( function( require ) {
  "use strict";

  // Imports
  var AccordionBox = require( 'SUN/AccordionBox' );
  var AtomTabView = require( 'common/view/AtomTabView' );
  var BAAFont = require( 'common/view/BAAFont' );
  var ChargeComparisonDisplay = require( 'buildanatom/view/ChargeComparisonDisplay' );
  var ChargeMeter = require( 'common/view/ChargeMeter' );
  var inherit = require( 'PHET_CORE/inherit' );
  var MassNumberDisplay = require( 'buildanatom/view/MassNumberDisplay' );
  var Node = require( 'SCENERY/nodes/Node' );
  var SharedConstants = require( 'common/SharedConstants' );
  var Text = require( "SCENERY/nodes/Text" );

  // Constants
  var INTER_BOX_SPACING = 7;
  var ACCORDION_BOX_FONT = new BAAFont( 18 );

  /**
   * Constructor.
   *
   * @param model Build an Atom model object.
   * @constructor
   */
  function BuildAnAtomTabView( model ) {
    AtomTabView.call( this, model ); // Call super constructor.
    var thisView = this;

    // Add the charge meter and charge comparison display inside of an accordion box.
    var chargeMeterBoxContents = new Node();
    chargeMeterBoxContents.addChild( new ChargeMeter( model.numberAtom ),
                                     {
                                       title: 'Net Charge', // TODO: i18n
                                       fill: SharedConstants.DISPLAY_PANEL_BACKGROUND_COLOR,
                                       initiallyOpen: false,
                                       minWidth: this.periodicTableBox.width,
                                       contentPosition: 'left',
                                       titlePosition: 'left',
                                       buttonPosition: 'right',
                                       font: ACCORDION_BOX_FONT
                                     } );
    var chargeComparisonDisplay = new ChargeComparisonDisplay( model.numberAtom );
    chargeComparisonDisplay.left = chargeMeterBoxContents.right + 5;
    chargeComparisonDisplay.centerY = chargeMeterBoxContents.centerY;
    chargeMeterBoxContents.addChild( chargeComparisonDisplay );
    var chargeMeterBox = new AccordionBox( chargeMeterBoxContents,
                                           {
                                             title: 'Net Charge', // TODO: i18n
                                             fill: SharedConstants.DISPLAY_PANEL_BACKGROUND_COLOR,
                                             initiallyOpen: false,
                                             minWidth: this.periodicTableBox.width,
                                             contentPosition: 'left',
                                             titlePosition: 'left',
                                             buttonPosition: 'right',
                                             font: ACCORDION_BOX_FONT
                                           } );
    this.addChild( chargeMeterBox );

    // Add the mass indicator inside of an accordion box.
    var massNumberBox = new AccordionBox( new MassNumberDisplay( model.numberAtom ),
                                          {
                                            title: 'Mass Number', // TODO: i18n
                                            fill: SharedConstants.DISPLAY_PANEL_BACKGROUND_COLOR,
                                            initiallyOpen: false,
                                            minWidth: this.periodicTableBox.width,
                                            contentPosition: 'left',
                                            titlePosition: 'left',
                                            buttonPosition: 'right'
                                          } );
    this.addChild( massNumberBox );

    // Do the layout.
    chargeMeterBox.right = this.periodicTableBox.right;
    chargeMeterBox.top = this.periodicTableBox.bottom + INTER_BOX_SPACING;
    massNumberBox.right = this.periodicTableBox.right;
    massNumberBox.top = chargeMeterBox.top + chargeMeterBox.openHeight + INTER_BOX_SPACING;
  }

  // Inherit from TabView.
  inherit( AtomTabView, BuildAnAtomTabView );

  return BuildAnAtomTabView;
} );
