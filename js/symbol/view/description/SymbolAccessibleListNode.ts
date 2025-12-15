// Copyright 2025, University of Colorado Boulder

/**
 * AccessibleListNode displays the information on the symbol accordion box.
 *
 * @author Agustín Vallejo
 */

import { TReadOnlyProperty } from '../../../../../axon/js/TReadOnlyProperty.js';
import AccessibleListNode from '../../../../../scenery-phet/js/accessibility/AccessibleListNode.js';
import AtomIdentifier from '../../../../../shred/js/AtomIdentifier.js';
import ShredFluent from '../../../../../shred/js/ShredFluent.js';
import buildAnAtom from '../../../buildAnAtom.js';
import BuildAnAtomFluent from '../../../BuildAnAtomFluent.js';
import BAAModel from '../../../common/model/BAAModel.js';

export default class SymbolAccessibleListNode extends AccessibleListNode {
  public constructor( model: BAAModel, visibleProperty: TReadOnlyProperty<boolean> ) {

    const spokenSymbolStringProperty = ShredFluent.a11y.spokenSymbol.createProperty( {
      symbol: model.atom.protonCountProperty.derived( count => {
        return AtomIdentifier.getSymbol( count ).split( '' ).join( ' ' );
      } )
    } );

    const symbolListItemProperty = BuildAnAtomFluent.a11y.symbolScreen.symbol.symbolSelector.createProperty( {
      hasSymbol: model.atom.protonCountProperty.derived( count => count > 0 ? 'true' : 'false' ),
      symbol: spokenSymbolStringProperty
    } );

    const atomicNumberListItemProperty = BuildAnAtomFluent.a11y.symbolScreen.symbol
      .accessibleListNode.atomicNumber.createProperty( {
        value: model.atom.protonCountProperty
      } );

    const massNumberListItemProperty = BuildAnAtomFluent.a11y.symbolScreen.symbol
      .accessibleListNode.massNumber.createProperty( {
        value: model.atom.massNumberProperty
      } );


    // TODO: How to make this listen to BAAPreferences.instance.chargeNotationProperty?  https://github.com/phetsims/build-an-atom/issues/449
    const chargeListItemProperty = BuildAnAtomFluent.a11y.symbolScreen.symbol
      .accessibleListNode.charge.createProperty( {
        value: model.atom.chargeProperty
      } );

    super(
      [
        symbolListItemProperty,
        atomicNumberListItemProperty,
        massNumberListItemProperty,
        chargeListItemProperty
      ],
      {
        visibleProperty: visibleProperty,
        leadingParagraphStringProperty: BuildAnAtomFluent.a11y.symbolScreen.symbol.leadingParagraphStringProperty
      }
    );
  }
}

buildAnAtom.register( 'SymbolAccessibleListNode', SymbolAccessibleListNode );