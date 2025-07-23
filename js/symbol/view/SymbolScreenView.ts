// Copyright 2013-2025, University of Colorado Boulder

/**
 * Main view for the "Symbol" screen of the Build an Atom simulation.
 *
 * @author John Blanco
 */

import Text from '../../../../scenery/js/nodes/Text.js';
import ShredConstants from '../../../../shred/js/ShredConstants.js';
import AccordionBox from '../../../../sun/js/AccordionBox.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import buildAnAtom from '../../buildAnAtom.js';
import BuildAnAtomStrings from '../../BuildAnAtomStrings.js';
import BAAModel from '../../common/model/BAAModel.js';
import BAAScreenView from '../../common/view/BAAScreenView.js';
import BAASymbolNode from './BAASymbolNode.js';

class SymbolScreenView extends BAAScreenView {

  private readonly symbolAccordionBox: AccordionBox;

  public constructor( model: BAAModel, tandem: Tandem ) {
    super( model, tandem );

    // Add the symbol node within an accordion box.
    const symbolNode = new BAASymbolNode( model.atom, {
      scale: 0.41 // scale empirically determined
    } );
    this.symbolAccordionBox = new AccordionBox( symbolNode, {
      cornerRadius: 3,
      titleNode: new Text( BuildAnAtomStrings.symbolStringProperty, {
        font: ShredConstants.ACCORDION_BOX_TITLE_FONT,
        maxWidth: ShredConstants.ACCORDION_BOX_TITLE_MAX_WIDTH
      } ),
      fill: ShredConstants.DISPLAY_PANEL_BACKGROUND_COLOR,
      minWidth: this.periodicTableAccordionBox.width,
      contentAlign: 'center',
      titleAlignX: 'left',
      buttonAlign: 'left',
      expandCollapseButtonOptions: {
        touchAreaXDilation: 12,
        touchAreaYDilation: 12
      },

      // phet-io
      tandem: tandem.createTandem( 'symbolAccordionBox' ),

      // pdom
      labelContent: BuildAnAtomStrings.symbolStringProperty
    } );
    this.controlPanelLayer.addChild( this.symbolAccordionBox );

    // do the layout
    this.symbolAccordionBox.top = this.periodicTableAccordionBox.top + this.periodicTableAccordionBox.height + 10;
    this.symbolAccordionBox.left = this.periodicTableAccordionBox.left;
  }

  public override reset(): void {
    super.reset();
    this.symbolAccordionBox.expandedProperty.reset();
  }
}

buildAnAtom.register( 'SymbolScreenView', SymbolScreenView );
export default SymbolScreenView;