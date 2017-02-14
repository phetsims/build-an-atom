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
  var HBox = require( 'SCENERY/nodes/HBox' );
  var inherit = require( 'PHET_CORE/inherit' );
  var MassNumberDisplay = require( 'BUILD_AN_ATOM/buildanatom/view/MassNumberDisplay' );
  var Property = require( 'AXON/Property' );
  var ShredConstants = require( 'SHRED/ShredConstants' );
  var Text = require( 'SCENERY/nodes/Text' );

  // phet-io modules
  var TBoolean = require( 'ifphetio!PHET_IO/types/TBoolean' );

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

    // @private - properties that are passed to the accordion boxes that control their expansion state
    this.chargeMeterBoxExpandedProperty = new Property( false, {
      tandem: tandem.createTandem( 'chargeMeterBoxExpandedProperty' ),
      phetioValueType: TBoolean
    } );
    this.massNumberBoxExpandedProperty = new Property( false, {
      tandem: tandem.createTandem( 'massNumberBoxExpandedProperty' ),
      phetioValueType: TBoolean
    } );

    // Add the charge meter and charge comparison display inside of an accordion box.
    var chargeMeterBoxContents = new HBox( {
      children: [
        new ChargeMeter( model.numberAtom, tandem.createTandem( 'chargeMeter' ) ),
        new ChargeComparisonDisplay(
          model.numberAtom,
          tandem.createTandem( 'chargeComparisonDisplay' ),
          { pickable: false }
        )
      ],
      spacing: 5,
      scale: 0.85, // empirically determined to keep the box height reasonable
      pickable: false,
      tandem: tandem.createTandem( 'chargeMeterBoxContents' )
    } );
    var netChargeBox = new AccordionBox( chargeMeterBoxContents, {
      titleNode: new Text( netChargeString, {
        font: ShredConstants.ACCORDION_BOX_TITLE_FONT,
        maxWidth: ShredConstants.ACCORDION_BOX_TITLE_MAX_WIDTH,
        tandem: tandem.createTandem( 'netChargeBoxTitle' )
      } ),
      fill: ShredConstants.DISPLAY_PANEL_BACKGROUND_COLOR,
      expandedProperty: this.chargeMeterBoxExpandedProperty,
      minWidth: this.periodicTableBox.width,
      contentAlign: 'left',
      titleAlignX: 'left',
      buttonAlign: 'right',
      buttonTouchAreaXDilation: ACCORDION_BOX_BUTTON_DILATION,
      buttonTouchAreaYDilation: ACCORDION_BOX_BUTTON_DILATION,
      tandem: tandem.createTandem( 'netChargeBox' )
    } );
    this.controlPanelLayer.addChild( netChargeBox );

    // Add the mass indicator inside of an accordion box.
    var massNumberDisplay = new MassNumberDisplay(
      model.numberAtom,
      tandem.createTandem( 'massNumberDisplay' ),
      {
        pickable: false,
        scale: 0.85 // empirically determined to make the control panels all fit on the screen
      }
    );
    var massNumberBox = new AccordionBox( massNumberDisplay, {
      titleNode: new Text( massNumberString, {
        font: ShredConstants.ACCORDION_BOX_TITLE_FONT,
        maxWidth: ShredConstants.ACCORDION_BOX_TITLE_MAX_WIDTH,
        tandem: tandem.createTandem( 'massNumberBoxTitle' )
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
    netChargeBox.right = this.periodicTableBox.right;
    netChargeBox.top = this.periodicTableBox.bottom + INTER_BOX_SPACING;
    massNumberBox.right = this.periodicTableBox.right;
    massNumberBox.top = netChargeBox.top + netChargeBox.height + INTER_BOX_SPACING;
  }

  buildAnAtom.register( 'BuildAnAtomView', BuildAnAtomView );

  return inherit( AtomView, BuildAnAtomView, {

    /**
     * @public
     */
    reset: function() {
      AtomView.prototype.reset.call( this );
      this.chargeMeterBoxExpandedProperty.reset();
      this.massNumberBoxExpandedProperty.reset();
    }
  } );
} );
