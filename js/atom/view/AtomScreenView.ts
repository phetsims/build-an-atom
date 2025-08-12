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
import BuildAnAtomFluent from '../../BuildAnAtomFluent.js';
import BAAConstants from '../../common/BAAConstants.js';
import BAAModel from '../../common/model/BAAModel.js';
import BAAScreenView from '../../common/view/BAAScreenView.js';
import ChargeMeter from '../../common/view/ChargeMeter.js';
import ChargeComparisonDisplay from './ChargeComparisonDisplay.js';
import MassNumberDisplay from './MassNumberDisplay.js';

class AtomScreenView extends BAAScreenView {

  private readonly netChargeAccordionBox: AccordionBox;
  private readonly massNumberAccordionBox: AccordionBox;

  public constructor( model: BAAModel, tandem: Tandem ) {
    super( model, tandem );

    // Add the charge meter and charge comparison display inside an accordion box.
    const netChargeAccordionBoxContents = new HBox( {
      children: [
        new ChargeMeter( model.atom.chargeProperty ),
        new ChargeComparisonDisplay( model.atom, { pickable: false } )
      ],
      spacing: 5,
      scale: 0.85, // empirically determined to keep the box height reasonable
      pickable: false
    } );
    this.netChargeAccordionBox = new AccordionBox(
      netChargeAccordionBoxContents,
      combineOptions<AccordionBoxOptions>( {}, {
        titleNode: new Text( BuildAnAtomFluent.netChargeStringProperty, {
          font: ShredConstants.ACCORDION_BOX_TITLE_FONT,
          maxWidth: ShredConstants.ACCORDION_BOX_TITLE_MAX_WIDTH
        } ),
        expandedDefaultValue: false,
        tandem: tandem.createTandem( 'netChargeAccordionBox' ),
        phetioFeatured: true,
        minWidth: this.periodicTableAccordionBox.width,

        // pdom
        labelContent: BuildAnAtomFluent.netChargeStringProperty
      }, BAAConstants.ACCORDION_BOX_OPTIONS )
    );
    this.accordionBoxes.addChild( this.netChargeAccordionBox );
    this.netChargeAccordionBox.addLinkedElement( model.atom.chargeProperty );

    // Add the mass indicator.
    const massNumberDisplay = new MassNumberDisplay(
      model.atom.massNumberProperty,
      {
        pickable: false,
        scale: 0.85 // empirically determined to make the control panels all fit on the screen
      }
    );
    const massNumberAccordionBoxTandem = tandem.createTandem( 'massNumberAccordionBox' );
    this.massNumberAccordionBox = new AccordionBox(
      massNumberDisplay,
      combineOptions<AccordionBoxOptions>( {}, {
        titleNode: new Text( BuildAnAtomFluent.massNumberStringProperty, {
          font: ShredConstants.ACCORDION_BOX_TITLE_FONT,
          maxWidth: ShredConstants.ACCORDION_BOX_TITLE_MAX_WIDTH
        } ),
        expandedDefaultValue: false,
        tandem: massNumberAccordionBoxTandem,
        phetioFeatured: true,
        minWidth: this.periodicTableAccordionBox.width,

        // pdom
        labelContent: BuildAnAtomFluent.massNumberStringProperty
      }, BAAConstants.ACCORDION_BOX_OPTIONS )
    );
    this.accordionBoxes.addChild( this.massNumberAccordionBox );
    this.massNumberAccordionBox.addLinkedElement( model.atom.massNumberProperty );

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