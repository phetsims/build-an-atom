// Copyright 2013-2025, University of Colorado Boulder

/**
 * Main view for the first screen of the Build an Atom simulation.
 *
 * @author John Blanco (PhET Interactive Simulations)
 */

import BooleanProperty from '../../../../axon/js/BooleanProperty.js';
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

  private readonly netChargeAccordionBoxExpandedProperty: BooleanProperty;
  private readonly massNumberAccordionBoxExpandedProperty: BooleanProperty;

  public constructor( model: BuildAnAtomModel, tandem: Tandem ) {
    super( model, tandem );

    this.netChargeAccordionBoxExpandedProperty = new BooleanProperty( false, {
      tandem: tandem.createTandem( 'netChargeAccordionBoxExpandedProperty' )
    } );
    this.massNumberAccordionBoxExpandedProperty = new BooleanProperty( false, {
      tandem: tandem.createTandem( 'massNumberAccordionBoxExpandedProperty' )
    } );

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
    const netChargeAccordionBoxContents = new HBox( {
      children: [
        new ChargeMeter( model.particleAtom, { tandem: tandem.createTandem( 'chargeMeter' ) } ),
        new ChargeComparisonDisplay(
          model.particleAtom,
          {
            pickable: false,
            tandem: tandem.createTandem( 'chargeComparisonDisplay' )
          }
        )
      ],
      spacing: 5,
      scale: 0.85, // empirically determined to keep the box height reasonable
      pickable: false,
      tandem: tandem.createTandem( 'netChargeAccordionBoxContents' )
    } );
    const netChargeAccordionBox = new AccordionBox(
      netChargeAccordionBoxContents,
      combineOptions<AccordionBoxOptions>( {}, {
        titleNode: new Text( BuildAnAtomStrings.netChargeStringProperty, {
          font: ShredConstants.ACCORDION_BOX_TITLE_FONT,
          maxWidth: ShredConstants.ACCORDION_BOX_TITLE_MAX_WIDTH,
          tandem: tandem.createTandem( 'netChargeAccordionBoxTitleText' )
        } ),
        expandedProperty: this.netChargeAccordionBoxExpandedProperty,

        // phet-io
        tandem: tandem.createTandem( 'netChargeAccordionBox' ),

        // pdom
        labelContent: BuildAnAtomStrings.netChargeStringProperty
      }, commonAccordionBoxOptions )
    );
    this.controlPanelLayer.addChild( netChargeAccordionBox );

    // Add the mass indicator inside of an accordion box.
    const massNumberDisplay = new MassNumberDisplay(
      model.particleAtom,
      {
        pickable: false,
        tandem: tandem.createTandem( 'massNumberDisplay' ),
        scale: 0.85 // empirically determined to make the control panels all fit on the screen
      }
    );
    const massNumberAccordionBox = new AccordionBox(
      massNumberDisplay,
      combineOptions<AccordionBoxOptions>( {}, {
        titleNode: new Text( BuildAnAtomStrings.massNumberStringProperty, {
          font: ShredConstants.ACCORDION_BOX_TITLE_FONT,
          maxWidth: ShredConstants.ACCORDION_BOX_TITLE_MAX_WIDTH,
          tandem: tandem.createTandem( 'massNumberAccordionBoxTitleText' )
        } ),
        expandedProperty: this.massNumberAccordionBoxExpandedProperty,
        tandem: tandem.createTandem( 'massNumberAccordionBox' ),

        // pdom
        labelContent: BuildAnAtomStrings.massNumberStringProperty
      }, commonAccordionBoxOptions )
    );
    this.controlPanelLayer.addChild( massNumberAccordionBox );

    // Do the layout.
    netChargeAccordionBox.right = this.periodicTableAccordionBox.right;
    netChargeAccordionBox.top = this.periodicTableAccordionBox.bottom + INTER_BOX_SPACING;
    massNumberAccordionBox.right = this.periodicTableAccordionBox.right;
    massNumberAccordionBox.top = netChargeAccordionBox.top + netChargeAccordionBox.height + INTER_BOX_SPACING;

    // pdom - set navigation order for the Atom screen view
    this.pdomPlayAreaNode.pdomOrder = [
      ...this.pdomPlayAreaNode.pdomOrder!,
      netChargeAccordionBox,
      massNumberAccordionBox
    ];
  }

  public override reset(): void {
    super.reset();
    this.netChargeAccordionBoxExpandedProperty.reset();
    this.massNumberAccordionBoxExpandedProperty.reset();
  }
}

buildAnAtom.register( 'AtomScreenView', AtomScreenView );
export default AtomScreenView;