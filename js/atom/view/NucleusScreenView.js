// Copyright 2013-2021, University of Colorado Boulder

/**
 * Main view for the screen of the Build a Nucleus simulation.
 */

import BooleanProperty from '../../../../axon/js/BooleanProperty.js';
import Text from '../../../../scenery/js/nodes/Text.js';
import ShredConstants from '../../../../shred2/js/ShredConstants.js';
import AccordionBox from '../../../../sun/js/AccordionBox.js';
import buildAnAtomStrings from '../../buildAnAtomStrings.js';
import buildAnAtom from '../../buildAnAtom.js';
import BAAScreenView from '../../common/view/BAAScreenView.js';
import NucleusSymbolNode from '../../symbol/view/NucleusSymbolNode.js';

const symbolString = buildAnAtomStrings.symbol;

// constants
const INTER_BOX_SPACING = 7;
const ACCORDION_BOX_BUTTON_DILATION = 12;

class NucleusScreenView extends BAAScreenView {

  /**
   * Constructor.
   *
   * @param {BuildAnAtomModel} model Build an Atom model object.
   * @param {Tandem} tandem
   * @constructor
   */
  constructor( model, tandem ) {
    super( model, tandem );

    this.symbolAccordionBoxExpandedProperty = new BooleanProperty( true, {
      tandem: tandem.createTandem( 'symbolAccordionBoxExpandedProperty' )
    } );

    // Add the symbol node within an accordion box.
    const symbolNode = new NucleusSymbolNode( model.particleAtom, tandem.createTandem( 'symbolNode' ), {
      scale: 0.25// scale empirically determined
    } );
    const symbolAccordionBox = new AccordionBox( symbolNode, {
      cornerRadius: 3,
      titleNode: new Text( symbolString, {
        font: ShredConstants.ACCORDION_BOX_TITLE_FONT,
        maxWidth: ShredConstants.ACCORDION_BOX_TITLE_MAX_WIDTH,
        tandem: tandem.createTandem( 'symbolAccordionBoxTitle' )
      } ),
      fill: ShredConstants.DISPLAY_PANEL_BACKGROUND_COLOR,
      minWidth: 110,
      contentAlign: 'center',
      titleAlignX: 'left',
      buttonAlign: 'right',
      expandedProperty: this.symbolAccordionBoxExpandedProperty,
      expandCollapseButtonOptions: {
        touchAreaXDilation: ACCORDION_BOX_BUTTON_DILATION,
        touchAreaYDilation: ACCORDION_BOX_BUTTON_DILATION
      },

      // phet-io
      tandem: tandem.createTandem( 'symbolAccordionBox' ),

      // pdom
      labelContent: symbolString
    } );
    this.controlPanelLayer.addChild( symbolAccordionBox );
    // Do the layout.
    symbolAccordionBox.right = this.periodicTableAccordionBox.left - INTER_BOX_SPACING;
    symbolAccordionBox.top = this.periodicTableAccordionBox.top;

    // pdom - set navigation order for the Atom screen view
    this.pdomPlayAreaNode.accessibleOrder = [ this.periodicTableAccordionBox, symbolAccordionBox, this.nuclideChartAccordionBox ];
  }

  /**
   * @public
   */
  reset() {
    super.reset();
    this.symbolAccordionBoxExpandedProperty.reset();
  }

}

buildAnAtom.register( 'NucleusScreenView', NucleusScreenView );
export default NucleusScreenView;