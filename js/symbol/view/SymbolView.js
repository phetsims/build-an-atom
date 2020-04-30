// Copyright 2013-2020, University of Colorado Boulder

/**
 * Main view for the "Symbol" screen of the Build an Atom simulation.
 *
 * @author John Blanco
 */

import BooleanProperty from '../../../../axon/js/BooleanProperty.js';
import inherit from '../../../../phet-core/js/inherit.js';
import Text from '../../../../scenery/js/nodes/Text.js';
import ShredConstants from '../../../../shred/js/ShredConstants.js';
import AccordionBox from '../../../../sun/js/AccordionBox.js';
import buildAnAtomStrings from '../../buildAnAtomStrings.js';
import buildAnAtom from '../../buildAnAtom.js';
import AtomView from '../../common/view/AtomView.js';
import SymbolNode from './SymbolNode.js';

const symbolString = buildAnAtomStrings.symbol;

/**
 * @param {BuildAnAtomModel} model
 * @param {Tandem} tandem
 * @constructor
 */
function SymbolView( model, tandem ) {
  AtomView.call( this, model, tandem );

  this.symbolAccordionBoxExpandedProperty = new BooleanProperty( true, {
    tandem: tandem.createTandem( 'symbolAccordionBoxExpandedProperty' )
  } );

  // Add the symbol node within an accordion box.
  const symbolNode = new SymbolNode( model.particleAtom, tandem.createTandem( 'symbolNode' ), {
    scale: 0.43 // scale empirically determined
  } );
  const symbolAccordionBox = new AccordionBox( symbolNode, {
    cornerRadius: 3,
    titleNode: new Text( symbolString, {
      font: ShredConstants.ACCORDION_BOX_TITLE_FONT,
      maxWidth: ShredConstants.ACCORDION_BOX_TITLE_MAX_WIDTH,
      tandem: tandem.createTandem( 'symbolAccordionBoxTitle' )
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
    labelContent: symbolString
  } );
  this.controlPanelLayer.addChild( symbolAccordionBox );

  // do the layout
  symbolAccordionBox.top = this.periodicTableAccordionBox.top + this.periodicTableAccordionBox.height + 10;
  symbolAccordionBox.left = this.periodicTableAccordionBox.left;
}

buildAnAtom.register( 'SymbolView', SymbolView );

inherit( AtomView, SymbolView, {

  /**
   * @public
   */
  reset: function() {
    AtomView.prototype.reset.call( this );
    this.symbolAccordionBoxExpandedProperty.reset();
  }
} );

export default SymbolView;