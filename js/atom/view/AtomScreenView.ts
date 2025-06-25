// Copyright 2013-2025, University of Colorado Boulder

/**
 * Main view for the first screen of the Build an Atom simulation.
 *
 * @author John Blanco (PhET Interactive Simulations)
 */

import { combineOptions } from '../../../../phet-core/js/optionize.js';
import HBox from '../../../../scenery/js/layout/nodes/HBox.js';
import Text from '../../../../scenery/js/nodes/Text.js';
import ShredConstants from '../../../../shred/js/ShredConstants.js';
import AccordionBox, { AccordionBoxOptions } from '../../../../sun/js/AccordionBox.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import buildAnAtom from '../../buildAnAtom.js';
import BuildAnAtomStrings from '../../BuildAnAtomStrings.js';
import BuildAnAtomModel from '../../common/model/BuildAnAtomModel.js';
import BAAScreenView from '../../common/view/BAAScreenView.js';
import ChargeMeter from '../../common/view/ChargeMeter.js';
import ChargeComparisonDisplay from './ChargeComparisonDisplay.js';
import MassNumberDisplay from './MassNumberDisplay.js';

// constants
const INTER_BOX_SPACING = 7;
const ACCORDION_BOX_BUTTON_DILATION = 12;

class AtomScreenView extends BAAScreenView {

  public readonly netChargeAccordionBox: AccordionBox;
  public readonly massNumberAccordionBox: AccordionBox;

  public constructor( model: BuildAnAtomModel, tandem: Tandem ) {
    super( model, tandem );

    // options that are common to all of the accordion boxes in this view
    const commonAccordionBoxOptions: AccordionBoxOptions = {
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
    const netChargeAccordionBoxTandem = tandem.createTandem( 'netChargeAccordionBox' );
    const netChargeAccordionBoxContents = new HBox( {
      children: [
        new ChargeMeter( model.particleAtom.chargeProperty ),
        new ChargeComparisonDisplay(
          model.particleAtom,
          {
            pickable: false,
            tandem: netChargeAccordionBoxTandem.createTandem( 'chargeComparisonDisplay' )
          }
        )
      ],
      spacing: 5,
      scale: 0.85, // empirically determined to keep the box height reasonable
      pickable: false
    } );
    this.netChargeAccordionBox = new AccordionBox(
      netChargeAccordionBoxContents,
      combineOptions<AccordionBoxOptions>( {}, {
        titleNode: new Text( BuildAnAtomStrings.netChargeStringProperty, {
          font: ShredConstants.ACCORDION_BOX_TITLE_FONT,
          maxWidth: ShredConstants.ACCORDION_BOX_TITLE_MAX_WIDTH,
          tandem: netChargeAccordionBoxTandem.createTandem( 'titleText' )
        } ),

        // phet-io
        tandem: netChargeAccordionBoxTandem,

        // pdom
        labelContent: BuildAnAtomStrings.netChargeStringProperty
      }, commonAccordionBoxOptions )
    );
    this.controlPanelLayer.addChild( this.netChargeAccordionBox );

    // Add the mass indicator.
    const massNumberDisplay = new MassNumberDisplay(
      model.particleAtom.massNumberProperty,
      {
        pickable: false,
        scale: 0.85 // empirically determined to make the control panels all fit on the screen
      }
    );
    const massNumberAccordionBoxTandem = tandem.createTandem( 'massNumberAccordionBox' );
    this.massNumberAccordionBox = new AccordionBox(
      massNumberDisplay,
      combineOptions<AccordionBoxOptions>( {}, {
        titleNode: new Text( BuildAnAtomStrings.massNumberStringProperty, {
          font: ShredConstants.ACCORDION_BOX_TITLE_FONT,
          maxWidth: ShredConstants.ACCORDION_BOX_TITLE_MAX_WIDTH,
          tandem: massNumberAccordionBoxTandem.createTandem( 'titleText' )
        } ),
        tandem: massNumberAccordionBoxTandem,

        // pdom
        labelContent: BuildAnAtomStrings.massNumberStringProperty
      }, commonAccordionBoxOptions )
    );
    this.controlPanelLayer.addChild( this.massNumberAccordionBox );

    // Do the layout.
    this.netChargeAccordionBox.right = this.periodicTableAccordionBox.right;
    this.netChargeAccordionBox.top = this.periodicTableAccordionBox.bottom + INTER_BOX_SPACING;
    this.massNumberAccordionBox.right = this.periodicTableAccordionBox.right;
    this.massNumberAccordionBox.top = this.netChargeAccordionBox.top + this.netChargeAccordionBox.height + INTER_BOX_SPACING;

    // pdom - set navigation order for the Atom screen view
    this.pdomPlayAreaNode.pdomOrder = [
      ...this.pdomPlayAreaNode.pdomOrder!,
      this.netChargeAccordionBox,
      this.massNumberAccordionBox
    ];
  }

  public override reset(): void {
    super.reset();
    this.netChargeAccordionBox.expandedProperty.reset();
    this.massNumberAccordionBox.expandedProperty.reset();
  }
}

buildAnAtom.register( 'AtomScreenView', AtomScreenView );
export default AtomScreenView;