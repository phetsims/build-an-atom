// Copyright 2013-2025, University of Colorado Boulder

/**
 * Main view for the "Symbol" screen of the Build an Atom simulation.
 *
 * @author John Blanco
 */

import BooleanProperty from '../../../../axon/js/BooleanProperty.js';
import Text from '../../../../scenery/js/nodes/Text.js';
import ShredConstants from '../../../../shred/js/ShredConstants.js';
import AccordionBox from '../../../../sun/js/AccordionBox.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import buildAnAtom from '../../buildAnAtom.js';
import BuildAnAtomStrings from '../../BuildAnAtomStrings.js';
import BuildAnAtomModel from '../../common/model/BuildAnAtomModel.js';
import BAAScreenView from '../../common/view/BAAScreenView.js';
import BAASymbolNode from './BAASymbolNode.js';

class SymbolScreenView extends BAAScreenView {

  public readonly symbolAccordionBoxExpandedProperty: BooleanProperty;

  public constructor( model: BuildAnAtomModel, tandem: Tandem ) {
    super( model, tandem );

    this.symbolAccordionBoxExpandedProperty = new BooleanProperty( true, {
      tandem: tandem.createTandem( 'symbolAccordionBoxExpandedProperty' )
    } );

    // Add the symbol node within an accordion box.
    const symbolNode = new BAASymbolNode( model.particleAtom, tandem.createTandem( 'symbolNode' ), {
      scale: 0.41 // scale empirically determined
    } );
    const symbolAccordionBox = new AccordionBox( symbolNode, {
      cornerRadius: 3,
      titleNode: new Text( BuildAnAtomStrings.symbolStringProperty, {
        font: ShredConstants.ACCORDION_BOX_TITLE_FONT,
        maxWidth: ShredConstants.ACCORDION_BOX_TITLE_MAX_WIDTH,
        tandem: tandem.createTandem( 'symbolAccordionBoxTitleText' )
      } ),
      fill: ShredConstants.DISPLAY_PANEL_BACKGROUND_COLOR,
      minWidth: this.periodicTableAccordionBox.width,
      contentAlign: 'center',
      titleAlignX: 'left',
      buttonAlign: 'right',
      expandedProperty: this.symbolAccordionBoxExpandedProperty,
      expandCollapseButtonOptions: {
        touchAreaXDilation: 12,
        touchAreaYDilation: 12
      },

      // phet-io
      tandem: tandem.createTandem( 'symbolAccordionBox' ),

      // pdom
      labelContent: BuildAnAtomStrings.symbolStringProperty
    } );
    this.controlPanelLayer.addChild( symbolAccordionBox );

    // do the layout
    symbolAccordionBox.top = this.periodicTableAccordionBox.top + this.periodicTableAccordionBox.height + 10;
    symbolAccordionBox.left = this.periodicTableAccordionBox.left;
  }

  public override reset(): void {
    super.reset();
    this.symbolAccordionBoxExpandedProperty.reset();
  }
}

buildAnAtom.register( 'SymbolScreenView', SymbolScreenView );
export default SymbolScreenView;