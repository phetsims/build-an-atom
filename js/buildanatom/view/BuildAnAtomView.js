// Copyright 2013-2015, University of Colorado Boulder

/**
 * Main view for the first screen of the Build an Atom simulation.
 */
define( function( require ) {
  'use strict';

  // modules
  var AccordionBox = require( 'SUN/AccordionBox' );
  var AtomView = require( 'BUILD_AN_ATOM/common/view/AtomView' );
  var buildAnAtom = require( 'BUILD_AN_ATOM/buildAnAtom' );
  var ChargeComparisonDisplay = require( 'BUILD_AN_ATOM/buildanatom/view/ChargeComparisonDisplay' );
  var ChargeMeter = require( 'BUILD_AN_ATOM/common/view/ChargeMeter' );
  var inherit = require( 'PHET_CORE/inherit' );
  var MassNumberDisplay = require( 'BUILD_AN_ATOM/buildanatom/view/MassNumberDisplay' );
  var Node = require( 'SCENERY/nodes/Node' );
  var SharedConstants = require( 'SHRED/SharedConstants' );
  var Text = require( 'SCENERY/nodes/Text' );

  // strings
  var massNumberString = require( 'string!BUILD_AN_ATOM/massNumber' );
  var netChargeString = require( 'string!BUILD_AN_ATOM/netCharge' );

  // constants
  var INTER_BOX_SPACING = 7;

  /**
   * Constructor.
   *
   * @param model Build an Atom model object.
   * @param {Tandem} tandem
   * @constructor
   */
  function BuildAnAtomView( model, tandem ) {
    AtomView.call( this, model, tandem ); // Call super constructor.

    this.viewProperties.addProperty( 'chargeMeterBoxExpanded', false );
    this.viewProperties.addProperty( 'massNumberBoxExpanded', false );

    // Add the charge meter and charge comparison display inside of an accordion box.
    var chargeMeterBoxContents = new Node( { pickable: false } );
    chargeMeterBoxContents.addChild( new ChargeMeter( model.numberAtom ) );
    var chargeComparisonDisplay = new ChargeComparisonDisplay( model.numberAtom ).mutate( { pickable: false } );
    chargeComparisonDisplay.left = chargeMeterBoxContents.right + 5;
    chargeComparisonDisplay.centerY = chargeMeterBoxContents.centerY;
    chargeMeterBoxContents.addChild( chargeComparisonDisplay );
    chargeMeterBoxContents.scale( 0.85 );
    var chargeMeterBox = new AccordionBox( chargeMeterBoxContents, {
      titleNode: new Text( netChargeString, {
        font: SharedConstants.ACCORDION_BOX_TITLE_FONT,
        maxWidth: SharedConstants.ACCORDION_BOX_TITLE_MAX_WIDTH
      } ),
      fill: SharedConstants.DISPLAY_PANEL_BACKGROUND_COLOR,
      expandedProperty: this.viewProperties.chargeMeterBoxExpandedProperty,
      minWidth: this.periodicTableBox.width,
      contentAlign: 'left',
      titleAlignX: 'left',
      buttonAlign: 'right'
    } );
    this.addChild( chargeMeterBox );

    // Add the mass indicator inside of an accordion box.
    var massNumberDisplay = new MassNumberDisplay( model.numberAtom ).mutate( { pickable: false } );
    massNumberDisplay.scale( 0.85 );
    var massNumberBox = new AccordionBox( massNumberDisplay, {
      titleNode: new Text( massNumberString, {
        font: SharedConstants.ACCORDION_BOX_TITLE_FONT,
        maxWidth: SharedConstants.ACCORDION_BOX_TITLE_MAX_WIDTH
      } ),
      fill: SharedConstants.DISPLAY_PANEL_BACKGROUND_COLOR,
      expandedProperty: this.viewProperties.massNumberBoxExpandedProperty,
      minWidth: this.periodicTableBox.width,
      contentAlign: 'left',
      titleAlignX: 'left',
      buttonAlign: 'right'
    } );
    this.addChild( massNumberBox );

    // Do the layout.
    chargeMeterBox.right = this.periodicTableBox.right;
    chargeMeterBox.top = this.periodicTableBox.bottom + INTER_BOX_SPACING;
    massNumberBox.right = this.periodicTableBox.right;
    massNumberBox.top = chargeMeterBox.top + chargeMeterBox.height + INTER_BOX_SPACING;
  }

  buildAnAtom.register( 'BuildAnAtomView', BuildAnAtomView );

  return inherit( AtomView, BuildAnAtomView );
} );
