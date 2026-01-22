// Copyright 2013-2016, University of Colorado Boulder

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
  var Property = require( 'AXON/Property' );
  var ShredConstants = require( 'SHRED/ShredConstants' );
  var Text = require( 'SCENERY/nodes/Text' );

  // strings
  var massNumberString = require( 'string!BUILD_AN_ATOM/massNumber' );
  var netChargeString = require( 'string!BUILD_AN_ATOM/netCharge' );

  // constants
  var INTER_BOX_SPACING = 7;
  var ACCORDION_BOX_BUTTON_DILATION = 8;

  /**
   * Constructor.
   *
   * @param {BuildAnAtomModel} model Build an Atom model object.
   * @param {Tandem} tandem
   * @constructor
   */
  function BuildAnAtomView( model, tandem ) {
    AtomView.call( this, model, tandem ); // Call super constructor.

    this.chargeMeterBoxExpandedProperty = new Property( false );
    this.massNumberBoxExpandedProperty = new Property( false );

    // Add the charge meter and charge comparison display inside of an accordion box.
    var chargeMeterBoxContents = new Node( { pickable: false } );
    chargeMeterBoxContents.addChild( new ChargeMeter( model.numberAtom, tandem.createTandem( 'chargeMeter' ) ) );
    var chargeComparisonDisplay = new ChargeComparisonDisplay( model.numberAtom ).mutate( { pickable: false } );
    chargeComparisonDisplay.left = chargeMeterBoxContents.right + 5;
    chargeComparisonDisplay.centerY = chargeMeterBoxContents.centerY;
    chargeMeterBoxContents.addChild( chargeComparisonDisplay );
    chargeMeterBoxContents.scale( 0.85 );
    var chargeMeterBox = new AccordionBox( chargeMeterBoxContents, {
      titleNode: new Text( netChargeString, {
        font: ShredConstants.ACCORDION_BOX_TITLE_FONT,
        maxWidth: ShredConstants.ACCORDION_BOX_TITLE_MAX_WIDTH
      } ),
      fill: ShredConstants.DISPLAY_PANEL_BACKGROUND_COLOR,
      expandedProperty: this.chargeMeterBoxExpandedProperty,
      minWidth: this.periodicTableBox.width,
      contentAlign: 'left',
      titleAlignX: 'left',
      buttonAlign: 'right',
      buttonTouchAreaXDilation: ACCORDION_BOX_BUTTON_DILATION,
      buttonTouchAreaYDilation: ACCORDION_BOX_BUTTON_DILATION
    } );
    this.controlPanelLayer.addChild( chargeMeterBox );

    // Add the mass indicator inside of an accordion box.
    var massNumberDisplay = new MassNumberDisplay( model.numberAtom ).mutate( { pickable: false } );
    massNumberDisplay.scale( 0.85 );
    var massNumberBox = new AccordionBox( massNumberDisplay, {
      titleNode: new Text( massNumberString, {
        font: ShredConstants.ACCORDION_BOX_TITLE_FONT,
        maxWidth: ShredConstants.ACCORDION_BOX_TITLE_MAX_WIDTH
      } ),
      fill: ShredConstants.DISPLAY_PANEL_BACKGROUND_COLOR,
      expandedProperty: this.massNumberBoxExpandedProperty,
      minWidth: this.periodicTableBox.width,
      contentAlign: 'left',
      titleAlignX: 'left',
      buttonAlign: 'right',
      buttonTouchAreaXDilation: ACCORDION_BOX_BUTTON_DILATION,
      buttonTouchAreaYDilation: ACCORDION_BOX_BUTTON_DILATION
    } );
    this.controlPanelLayer.addChild( massNumberBox );

    // Do the layout.
    chargeMeterBox.right = this.periodicTableBox.right;
    chargeMeterBox.top = this.periodicTableBox.bottom + INTER_BOX_SPACING;
    massNumberBox.right = this.periodicTableBox.right;
    massNumberBox.top = chargeMeterBox.top + chargeMeterBox.height + INTER_BOX_SPACING;
  }

  buildAnAtom.register( 'BuildAnAtomView', BuildAnAtomView );

  return inherit( AtomView, BuildAnAtomView, {
    reset: function() {
      AtomView.prototype.reset.call( this );
      this.chargeMeterBoxExpandedProperty.reset();
      this.massNumberBoxExpandedProperty.reset();
    }
  } );
} );
