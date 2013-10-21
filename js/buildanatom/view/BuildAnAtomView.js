// Copyright 2002-2013, University of Colorado Boulder

/**
 * Main view for the first screen of the Build an Atom simulation.
 */
define( function( require ) {
  'use strict';

  // Imports
  var AccordionBox = require( 'SUN/AccordionBox' );
  var AtomView = require( 'BUILD_AN_ATOM/common/view/AtomView' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var ChargeComparisonDisplay = require( 'BUILD_AN_ATOM/buildanatom/view/ChargeComparisonDisplay' );
  var ChargeMeter = require( 'BUILD_AN_ATOM/common/view/ChargeMeter' );
  var inherit = require( 'PHET_CORE/inherit' );
  var MassNumberDisplay = require( 'BUILD_AN_ATOM/buildanatom/view/MassNumberDisplay' );
  var massNumberString = require( 'string!BUILD_AN_ATOM/indicator.mass.number' );
  var netChargeString = require( 'string!BUILD_AN_ATOM/indicator.charge' );
  var Node = require( 'SCENERY/nodes/Node' );
  var SharedConstants = require( 'BUILD_AN_ATOM/common/SharedConstants' );

  // Constants
  var INTER_BOX_SPACING = 7;
  var ACCORDION_BOX_FONT = new PhetFont( 18 );

  /**
   * Constructor.
   *
   * @param model Build an Atom model object.
   * @constructor
   */
  function BuildAnAtomView( model ) {
    AtomView.call( this, model ); // Call super constructor.
    var thisView = this;

    // Add the charge meter and charge comparison display inside of an accordion box.
    var chargeMeterBoxContents = new Node( { pickable: false } );
    chargeMeterBoxContents.addChild( new ChargeMeter( model.numberAtom ) );
    var chargeComparisonDisplay = new ChargeComparisonDisplay( model.numberAtom ).mutate( { pickable: false } );
    chargeComparisonDisplay.left = chargeMeterBoxContents.right + 5;
    chargeComparisonDisplay.centerY = chargeMeterBoxContents.centerY;
    chargeMeterBoxContents.addChild( chargeComparisonDisplay );
    var chargeMeterBox = new AccordionBox( chargeMeterBoxContents,
      {
        title: netChargeString,
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
    var massNumberBox = new AccordionBox( new MassNumberDisplay( model.numberAtom ).mutate( { pickable: false } ),
      {
        title: massNumberString,
        fill: SharedConstants.DISPLAY_PANEL_BACKGROUND_COLOR,
        initiallyOpen: false,
        minWidth: this.periodicTableBox.width,
        contentPosition: 'left',
        titlePosition: 'left',
        buttonPosition: 'right'
      } );
    this.addChild( massNumberBox );

    // Add additional reset functionality.
    this.resetFunctions.push(
      function() {
        chargeMeterBox.open.reset();
        massNumberBox.open.reset();
      } );

    // Do the layout.
    chargeMeterBox.right = this.periodicTableBox.right;
    chargeMeterBox.top = this.periodicTableBox.bottom + INTER_BOX_SPACING;
    massNumberBox.right = this.periodicTableBox.right;
    massNumberBox.top = chargeMeterBox.top + chargeMeterBox.openHeight + INTER_BOX_SPACING;
  }

  return inherit( AtomView, BuildAnAtomView );
} );
