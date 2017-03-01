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
    this.netChargeAccordionBoxExpandedProperty = new Property( false, {
      tandem: tandem.createTandem( 'netChargeAccordionBoxExpandedProperty' ),
      phetioValueType: TBoolean
    } );
    this.massNumberAccordionBoxExpandedProperty = new Property( false, {
      tandem: tandem.createTandem( 'massNumberAccordionBoxExpandedProperty' ),
      phetioValueType: TBoolean
    } );

    // Add the charge meter and charge comparison display inside of an accordion box.
    var netChargeAccordionBoxContents = new HBox( {
      children: [
        new ChargeMeter( model.particleAtom, tandem.createTandem( 'chargeMeter' ) ),
        new ChargeComparisonDisplay(
          model.particleAtom,
          tandem.createTandem( 'chargeComparisonDisplay' ),
          { pickable: false }
        )
      ],
      spacing: 5,
      scale: 0.85, // empirically determined to keep the box height reasonable
      pickable: false,
      tandem: tandem.createTandem( 'netChargeAccordionBoxContents' )
    } );
    var netChargeAccordionBox = new AccordionBox( netChargeAccordionBoxContents, {
      titleNode: new Text( netChargeString, {
        font: ShredConstants.ACCORDION_BOX_TITLE_FONT,
        maxWidth: ShredConstants.ACCORDION_BOX_TITLE_MAX_WIDTH,
        tandem: tandem.createTandem( 'netChargeAccordionBoxTitle' )
      } ),
      fill: ShredConstants.DISPLAY_PANEL_BACKGROUND_COLOR,
      expandedProperty: this.netChargeAccordionBoxExpandedProperty,
      minWidth: this.periodicTableAccordionBox.width,
      contentAlign: 'left',
      titleAlignX: 'left',
      buttonAlign: 'right',
      buttonTouchAreaXDilation: ACCORDION_BOX_BUTTON_DILATION,
      buttonTouchAreaYDilation: ACCORDION_BOX_BUTTON_DILATION,
      tandem: tandem.createTandem( 'netChargeAccordionBox' )
    } );
    this.controlPanelLayer.addChild( netChargeAccordionBox );

    // Add the mass indicator inside of an accordion box.
    var massNumberDisplay = new MassNumberDisplay(
      model.particleAtom,
      tandem.createTandem( 'massNumberDisplay' ),
      {
        pickable: false,
        scale: 0.85 // empirically determined to make the control panels all fit on the screen
      }
    );
    var massNumberAccordionBox = new AccordionBox( massNumberDisplay, {
      titleNode: new Text( massNumberString, {
        font: ShredConstants.ACCORDION_BOX_TITLE_FONT,
        maxWidth: ShredConstants.ACCORDION_BOX_TITLE_MAX_WIDTH,
        tandem: tandem.createTandem( 'massNumberAccordionBoxTitle' )
      } ),
      fill: ShredConstants.DISPLAY_PANEL_BACKGROUND_COLOR,
      expandedProperty: this.massNumberAccordionBoxExpandedProperty,
      minWidth: this.periodicTableAccordionBox.width,
      contentAlign: 'left',
      titleAlignX: 'left',
      buttonAlign: 'right',
      buttonTouchAreaXDilation: ACCORDION_BOX_BUTTON_DILATION,
      buttonTouchAreaYDilation: ACCORDION_BOX_BUTTON_DILATION,
      tandem: tandem.createTandem( 'massNumberAccordionBox' )
    } );
    this.controlPanelLayer.addChild( massNumberAccordionBox );

    // Do the layout.
    netChargeAccordionBox.right = this.periodicTableAccordionBox.right;
    netChargeAccordionBox.top = this.periodicTableAccordionBox.bottom + INTER_BOX_SPACING;
    massNumberAccordionBox.right = this.periodicTableAccordionBox.right;
    massNumberAccordionBox.top = netChargeAccordionBox.top + netChargeAccordionBox.height + INTER_BOX_SPACING;
  }

  buildAnAtom.register( 'BuildAnAtomView', BuildAnAtomView );

  return inherit( AtomView, BuildAnAtomView, {

    /**
     * @public
     */
    reset: function() {
      AtomView.prototype.reset.call( this );
      this.netChargeAccordionBoxExpandedProperty.reset();
      this.massNumberAccordionBoxExpandedProperty.reset();
    }
  } );
} );
