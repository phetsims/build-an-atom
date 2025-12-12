// Copyright 2013-2025, University of Colorado Boulder

/**
 * Main view for the first screen of the Build an Atom simulation.
 *
 * @author John Blanco (PhET Interactive Simulations)
 */

import DerivedStringProperty from '../../../../axon/js/DerivedStringProperty.js';
import { combineOptions } from '../../../../phet-core/js/optionize.js';
import StringUtils from '../../../../phetcommon/js/util/StringUtils.js';
import HBox from '../../../../scenery/js/layout/nodes/HBox.js';
import Text from '../../../../scenery/js/nodes/Text.js';
import ShredConstants from '../../../../shred/js/ShredConstants.js';
import { AccordionBoxOptions } from '../../../../sun/js/AccordionBox.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import buildAnAtom from '../../buildAnAtom.js';
import BuildAnAtomFluent from '../../BuildAnAtomFluent.js';
import BAAConstants from '../../common/BAAConstants.js';
import BAAModel from '../../common/model/BAAModel.js';
import BAAScreenView from '../../common/view/BAAScreenView.js';
import BuildAnAtomAccordionBox from '../../common/view/BuildAnAtomAccordionBox.js';
import ChargeMeter from '../../common/view/ChargeMeter.js';
import ChargeComparisonDisplay from './ChargeComparisonDisplay.js';
import AtomScreenSummaryContentNode from './description/AtomScreenSummaryContentNode.js';
import MassNumberDisplay from './MassNumberDisplay.js';

class AtomScreenView extends BAAScreenView {

  private readonly netChargeAccordionBox: BuildAnAtomAccordionBox;
  private readonly massNumberAccordionBox: BuildAnAtomAccordionBox;

  public constructor( model: BAAModel, tandem: Tandem ) {

    super( model, tandem, {
      screenSummaryContent: new AtomScreenSummaryContentNode( model )
    } );

    const netChargeAccessibleParagraphProperty = BuildAnAtomFluent.a11y.atomScreen.netCharge.accessibleParagraph.createProperty(
      {
        charge: model.atom.chargeProperty.derived( charge => BAAConstants.chargeToStringSignBeforeValue( charge ) ),
        protons: model.atom.protonCountProperty,
        electrons: model.atom.electronCountProperty
      }
    );

    // Add the charge meter and charge comparison display inside an accordion box.
    const netChargeAccordionBoxContents = new HBox( {
      children: [
        new ChargeMeter( model.atom.chargeProperty ),
        new ChargeComparisonDisplay( model.atom, { pickable: false } )
      ],
      spacing: 5,
      scale: 0.85, // empirically determined to keep the box height reasonable
      pickable: false,
      justify: 'left',
      accessibleParagraph: netChargeAccessibleParagraphProperty
    } );

    this.netChargeAccordionBox = new BuildAnAtomAccordionBox(
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

        accessibleName: BuildAnAtomFluent.a11y.atomScreen.netCharge.accessibleNameStringProperty
      }, BAAConstants.ACCORDION_BOX_OPTIONS )
    );
    this.accordionBoxes.addChild( this.netChargeAccordionBox );
    this.netChargeAccordionBox.addLinkedElement( model.atom.chargeProperty );

    const massNumberAccessibleParagraphProperty = new DerivedStringProperty(
      [
        model.atom.massNumberProperty,
        BuildAnAtomFluent.a11y.atomScreen.massNumber.accessibleParagraphStringProperty
      ],
      (
        massNumber: number,
        accessibleParagraphString: string
      ) => {
        return StringUtils.fillIn( accessibleParagraphString, { value: massNumber } );
      }
    );

    // Add the mass indicator.
    const massNumberDisplay = new MassNumberDisplay(
      model.atom.massNumberProperty,
      {
        pickable: false,
        scale: 0.85, // empirically determined to make the control panels all fit on the screen
        accessibleParagraph: massNumberAccessibleParagraphProperty
      }
    );
    this.massNumberAccordionBox = new BuildAnAtomAccordionBox(
      massNumberDisplay,
      combineOptions<AccordionBoxOptions>( {}, {
        titleNode: new Text( BuildAnAtomFluent.massNumberStringProperty, {
          font: ShredConstants.ACCORDION_BOX_TITLE_FONT,
          maxWidth: ShredConstants.ACCORDION_BOX_TITLE_MAX_WIDTH
        } ),
        expandedDefaultValue: false,
        tandem: tandem.createTandem( 'massNumberAccordionBox' ),
        phetioFeatured: true,
        minWidth: this.periodicTableAccordionBox.width,

        accessibleName: BuildAnAtomFluent.a11y.atomScreen.massNumber.accessibleNameStringProperty
      }, BAAConstants.ACCORDION_BOX_OPTIONS )
    );
    this.accordionBoxes.addChild( this.massNumberAccordionBox );
    this.massNumberAccordionBox.addLinkedElement( model.atom.massNumberProperty );
  }

  public override reset(): void {
    super.reset();
    this.netChargeAccordionBox.expandedProperty.reset();
    this.massNumberAccordionBox.expandedProperty.reset();
  }
}

buildAnAtom.register( 'AtomScreenView', AtomScreenView );
export default AtomScreenView;