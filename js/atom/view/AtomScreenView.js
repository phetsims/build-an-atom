// Copyright 2013-2022, University of Colorado Boulder

/**
 * Main view for the first screen of the Build an Atom simulation.
 */

import BooleanProperty from '../../../../axon/js/BooleanProperty.js';
import merge from '../../../../phet-core/js/merge.js';
import { HBox, Text } from '../../../../scenery/js/imports.js';
import ShredConstants from '../../../../shred/js/ShredConstants.js';
import AccordionBox from '../../../../sun/js/AccordionBox.js';
import buildAnAtom from '../../buildAnAtom.js';
import BuildAnAtomStrings from '../../BuildAnAtomStrings.js';
import BAAScreenView from '../../common/view/BAAScreenView.js';
import ChargeMeter from '../../common/view/ChargeMeter.js';
import ChargeComparisonDisplay from './ChargeComparisonDisplay.js';
import MassNumberDisplay from './MassNumberDisplay.js';

const massNumberString = BuildAnAtomStrings.massNumber;
const netChargeString = BuildAnAtomStrings.netCharge;

// constants
const INTER_BOX_SPACING = 7;
const ACCORDION_BOX_BUTTON_DILATION = 12;

class AtomScreenView extends BAAScreenView {

  /**
   * @param {BuildAnAtomModel} model Build an Atom model object.
   * @param {Tandem} tandem
   */
  constructor( model, tandem ) {
    super( model, tandem );

    // @private - properties that are passed to the accordion boxes that control their expansion state
    this.netChargeAccordionBoxExpandedProperty = new BooleanProperty( false, {
      tandem: tandem.createTandem( 'netChargeAccordionBoxExpandedProperty' )
    } );
    this.massNumberAccordionBoxExpandedProperty = new BooleanProperty( false, {
      tandem: tandem.createTandem( 'massNumberAccordionBoxExpandedProperty' )
    } );

    // options that are common to all of the accordion boxes in this view
    const commonAccordionBoxOptions = {
      cornerRadius: 3,
      fill: ShredConstants.DISPLAY_PANEL_BACKGROUND_COLOR,
      contentAlign: 'left',
      titleAlignX: 'left',
      buttonAlign: 'right',
      minWidth: this.periodicTableAccordionBox.width,
      expandCollapseButtonOptions: {
        touchAreaXDilation: ACCORDION_BOX_BUTTON_DILATION,
        touchAreaYDilation: ACCORDION_BOX_BUTTON_DILATION
      }
    };

    // Add the charge meter and charge comparison display inside of an accordion box.
    const netChargeAccordionBoxContents = new HBox( {
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

      // pdom
      tagName: 'h6',
      innerContent: 'Net Charge Content' // TODO: export to a11y strings file
    } );
    const netChargeAccordionBox = new AccordionBox(
      netChargeAccordionBoxContents,
      merge( {}, {
        titleNode: new Text( netChargeString, {
          font: ShredConstants.ACCORDION_BOX_TITLE_FONT,
          maxWidth: ShredConstants.ACCORDION_BOX_TITLE_MAX_WIDTH,
          tandem: tandem.createTandem( 'netChargeAccordionBoxTitleText' )
        } ),
        expandedProperty: this.netChargeAccordionBoxExpandedProperty,

        // phet-io
        tandem: tandem.createTandem( 'netChargeAccordionBox' ),

        // pdom
        labelContent: netChargeString
      }, commonAccordionBoxOptions )
    );
    this.controlPanelLayer.addChild( netChargeAccordionBox );

    // Add the mass indicator inside of an accordion box.
    const massNumberDisplay = new MassNumberDisplay(
      model.particleAtom,
      tandem.createTandem( 'massNumberDisplay' ),
      {
        pickable: false,
        scale: 0.85, // empirically determined to make the control panels all fit on the screen

        // pdom
        tagName: 'h6',
        innerContent: 'Mass Number Content' // TODO: export to a11y strings file
      }
    );
    const massNumberAccordionBox = new AccordionBox(
      massNumberDisplay,
      merge( {}, {
        titleNode: new Text( massNumberString, {
          font: ShredConstants.ACCORDION_BOX_TITLE_FONT,
          maxWidth: ShredConstants.ACCORDION_BOX_TITLE_MAX_WIDTH,
          tandem: tandem.createTandem( 'massNumberAccordionBoxTitleText' )
        } ),
        expandedProperty: this.massNumberAccordionBoxExpandedProperty,

        // phet-io
        tandem: tandem.createTandem( 'massNumberAccordionBox' ),

        // pdom
        labelContent: massNumberString
      }, commonAccordionBoxOptions )
    );
    this.controlPanelLayer.addChild( massNumberAccordionBox );

    // Do the layout.
    netChargeAccordionBox.right = this.periodicTableAccordionBox.right;
    netChargeAccordionBox.top = this.periodicTableAccordionBox.bottom + INTER_BOX_SPACING;
    massNumberAccordionBox.right = this.periodicTableAccordionBox.right;
    massNumberAccordionBox.top = netChargeAccordionBox.top + netChargeAccordionBox.height + INTER_BOX_SPACING;

    // pdom - set navigation order for the Atom screen view
    this.pdomPlayAreaNode.pdomOrder = [ this.periodicTableAccordionBox, netChargeAccordionBox, massNumberAccordionBox ];
  }

  /**
   * @public
   */
  reset() {
    super.reset();
    this.netChargeAccordionBoxExpandedProperty.reset();
    this.massNumberAccordionBoxExpandedProperty.reset();
  }
}

buildAnAtom.register( 'AtomScreenView', AtomScreenView );
export default AtomScreenView;