// Copyright 2013-2025, University of Colorado Boulder

/**
 * Main view for the "Symbol" screen of the Build an Atom simulation.
 *
 * @author John Blanco
 */

import DerivedStringProperty from '../../../../axon/js/DerivedStringProperty.js';
import StringUtils from '../../../../phetcommon/js/util/StringUtils.js';
import Text from '../../../../scenery/js/nodes/Text.js';
import AtomIdentifier from '../../../../shred/js/AtomIdentifier.js';
import ShredConstants from '../../../../shred/js/ShredConstants.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import buildAnAtom from '../../buildAnAtom.js';
import BuildAnAtomFluent from '../../BuildAnAtomFluent.js';
import BuildAnAtomStrings from '../../BuildAnAtomStrings.js';
import BAAModel from '../../common/model/BAAModel.js';
import BAAScreenView from '../../common/view/BAAScreenView.js';
import BuildAnAtomAccordionBox from '../../common/view/BuildAnAtomAccordionBox.js';
import BAASymbolNode from './BAASymbolNode.js';

class SymbolScreenView extends BAAScreenView {

  private readonly symbolAccordionBox: BuildAnAtomAccordionBox;

  public constructor( model: BAAModel, tandem: Tandem ) {
    super( model, tandem );

    const symbolAccessibleParagraphProperty = new DerivedStringProperty(
      [
        model.atom.protonCountProperty,
        model.atom.massNumberProperty,
        model.atom.chargeProperty,
        BuildAnAtomStrings.a11y.symbolScreen.symbol.accessibleParagraphStringProperty,
        BuildAnAtomStrings.a11y.symbolScreen.symbol.noSymbolStringProperty,
        BuildAnAtomStrings.a11y.common.mathSpeakUpperStringProperty
      ],
      (
        protonCount: number,
        massNumber: number,
        charge: number,
        accessibleParagraphString: string,
        noSymbolString: string,
        upperString: string
      ) => {
        const symbol = AtomIdentifier.getSymbol( protonCount );
        const mathSpeakSymbol = StringUtils.fillIn( upperString, { symbol: symbol.split( '' ).join( ' ' ) } );
        return StringUtils.fillIn( accessibleParagraphString, {
          symbol: protonCount > 0 ? mathSpeakSymbol : noSymbolString,
          protonCount: protonCount,
          massNumber: massNumber,
          charge: charge
        } );
      }
    );

    // Add the symbol node within an accordion box.
    const symbolNode = new BAASymbolNode( model.atom, {
      scale: 0.41 // scale empirically determined
    } );
    this.symbolAccordionBox = new BuildAnAtomAccordionBox( symbolNode, {
      cornerRadius: 3,
      titleNode: new Text( BuildAnAtomFluent.symbolStringProperty, {
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

      accessibleName: BuildAnAtomStrings.a11y.symbolScreen.symbol.accessibleNameStringProperty,
      accessibleHelpTextExpanded: symbolAccessibleParagraphProperty
    } );
    this.accordionBoxes.addChild( this.symbolAccordionBox );

    this.symbolAccordionBox.addLinkedElement( model.atom.protonCountProperty, {
      tandemName: 'protonCountProperty'
    } );
    this.symbolAccordionBox.addLinkedElement( model.atom.massNumberProperty, {
      tandemName: 'massNumberProperty'
    } );
    this.symbolAccordionBox.addLinkedElement( model.atom.chargeProperty, {
      tandemName: 'chargeProperty'
    } );

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