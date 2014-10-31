// Copyright 2002-2013, University of Colorado Boulder

/**
 * Main view for the first screen of the Build an Atom simulation.
 */
define( function( require ) {
  'use strict';

  // Imports
  var AccordionBox = require( 'SUN/AccordionBox' );
  var AtomView = require( 'BUILD_AN_ATOM/common/view/AtomView' );
  var ChargeComparisonDisplay = require( 'BUILD_AN_ATOM/buildanatom/view/ChargeComparisonDisplay' );
  var ChargeMeter = require( 'BUILD_AN_ATOM/common/view/ChargeMeter' );
  var inherit = require( 'PHET_CORE/inherit' );
  var MassNumberDisplay = require( 'BUILD_AN_ATOM/buildanatom/view/MassNumberDisplay' );
  var massNumberString = require( 'string!BUILD_AN_ATOM/indicator.mass.number' );
  var netChargeString = require( 'string!BUILD_AN_ATOM/indicator.charge' );
  var Node = require( 'SCENERY/nodes/Node' );
  var SharedConstants = require( 'BUILD_AN_ATOM/common/SharedConstants' );
  var Text = require( 'SCENERY/nodes/Text' );

  // Constants
  var INTER_BOX_SPACING = 7;

  /**
   * Constructor.
   *
   * @param model Build an Atom model object.
   * @constructor
   */
  function BuildAnAtomView( model ) {
    AtomView.call( this, model ); // Call super constructor.

    this.viewProperties.addProperty( 'chargeMeterBoxExpanded', false );
    this.viewProperties.addProperty( 'massNumberBoxExpanded', false );

    // Add the charge meter and charge comparison display inside of an accordion box.
    var chargeMeterBoxContents = new Node( { pickable: false } );
    chargeMeterBoxContents.addChild( new ChargeMeter( model.numberAtom ) );
    var chargeComparisonDisplay = new ChargeComparisonDisplay( model.numberAtom ).mutate( { pickable: false } );
    chargeComparisonDisplay.left = chargeMeterBoxContents.right + 5;
    chargeComparisonDisplay.centerY = chargeMeterBoxContents.centerY;
    chargeMeterBoxContents.addChild( chargeComparisonDisplay );
    var chargeMeterBox = new AccordionBox( chargeMeterBoxContents,
      {
        titleNode: new Text( netChargeString, { font: SharedConstants.ACCORDION_BOX_TITLE_FONT } ),
        fill: SharedConstants.DISPLAY_PANEL_BACKGROUND_COLOR,
        expandedProperty: this.viewProperties.chargeMeterBoxExpandedProperty,
        minWidth: this.periodicTableBox.width,
        contentAlign: 'left',
        titleAlign: 'left',
        buttonAlign: 'right'
      } );
    this.addChild( chargeMeterBox );

    // Add the mass indicator inside of an accordion box.
    var massNumberBox = new AccordionBox( new MassNumberDisplay( model.numberAtom ).mutate( { pickable: false } ),
      {
        titleNode: new Text( massNumberString, { font: SharedConstants.ACCORDION_BOX_TITLE_FONT } ),
        fill: SharedConstants.DISPLAY_PANEL_BACKGROUND_COLOR,
        expandedProperty: this.viewProperties.massNumberBoxExpandedProperty,
        minWidth: this.periodicTableBox.width,
        contentAlign: 'left',
        titleAlign: 'left',
        buttonAlign: 'right'
      } );
    this.addChild( massNumberBox );

    // Do the layout.
    chargeMeterBox.right = this.periodicTableBox.right;
    chargeMeterBox.top = this.periodicTableBox.bottom + INTER_BOX_SPACING;
    massNumberBox.right = this.periodicTableBox.right;
    massNumberBox.top = chargeMeterBox.top + chargeMeterBox.height + INTER_BOX_SPACING;
  }

  return inherit( AtomView, BuildAnAtomView );
} );
