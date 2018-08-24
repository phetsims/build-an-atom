// Copyright 2013-2017, University of Colorado Boulder

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
  var PropertyIO = require( 'AXON/PropertyIO' );
  var ShredConstants = require( 'SHRED/ShredConstants' );
  var Text = require( 'SCENERY/nodes/Text' );

  // ifphetio
  var BooleanIO = require( 'ifphetio!PHET_IO/types/BooleanIO' );

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
    AtomView.call( this, model, tandem );

    // @private - properties that are passed to the accordion boxes that control their expansion state
    this.netChargeAccordionBoxExpandedProperty = new Property( false, {
      tandem: tandem.createTandem( 'netChargeAccordionBoxExpandedProperty' ),
      phetioType: PropertyIO( BooleanIO )
    } );
    this.massNumberAccordionBoxExpandedProperty = new Property( false, {
      tandem: tandem.createTandem( 'massNumberAccordionBoxExpandedProperty' ),
      phetioType: PropertyIO( BooleanIO )
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
      tandem: tandem.createTandem( 'netChargeAccordionBoxContents' ),

      // a11y
      tagName: 'h6',
      innerContent: 'Net Charge Content' // TODO: export to a11y strings file
    } );
    var netChargeAccordionBox = new AccordionBox( netChargeAccordionBoxContents, {
      cornerRadius: 3,
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
      tandem: tandem.createTandem( 'netChargeAccordionBox' ),

      // a11y
      labelContent: netChargeString
    } );
    this.controlPanelLayer.addChild( netChargeAccordionBox );

    // Add the mass indicator inside of an accordion box.
    var massNumberDisplay = new MassNumberDisplay(
      model.particleAtom,
      tandem.createTandem( 'massNumberDisplay' ),
      {
        pickable: false,
        scale: 0.85, // empirically determined to make the control panels all fit on the screen

        // a11y
        tagName: 'h6',
        innerContent: 'Mass Number Content' // TODO: export to a11y strings file
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
      tandem: tandem.createTandem( 'massNumberAccordionBox' ),

      // a11y
      labelContent: massNumberString
    } );
    this.controlPanelLayer.addChild( massNumberAccordionBox );

    // Do the layout.
    netChargeAccordionBox.right = this.periodicTableAccordionBox.right;
    netChargeAccordionBox.top = this.periodicTableAccordionBox.bottom + INTER_BOX_SPACING;
    massNumberAccordionBox.right = this.periodicTableAccordionBox.right;
    massNumberAccordionBox.top = netChargeAccordionBox.top + netChargeAccordionBox.height + INTER_BOX_SPACING;

    // a11y - set navigation order for the Atom screen view
    this.accessibleOrder = [ this.periodicTableAccordionBox, netChargeAccordionBox, massNumberAccordionBox ];

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
