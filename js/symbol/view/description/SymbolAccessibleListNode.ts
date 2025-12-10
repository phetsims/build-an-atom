// Copyright 2025, University of Colorado Boulder

/**
 * AccessibleListNode displays the information on the symbol accordion box.
 *
 * @author Agustín Vallejo
 */

import DerivedStringProperty from '../../../../../axon/js/DerivedStringProperty.js';
import { TReadOnlyProperty } from '../../../../../axon/js/TReadOnlyProperty.js';
import StringUtils from '../../../../../phetcommon/js/util/StringUtils.js';
import AccessibleListNode from '../../../../../scenery-phet/js/accessibility/AccessibleListNode.js';
import AtomIdentifier from '../../../../../shred/js/AtomIdentifier.js';
import ShredFluent from '../../../../../shred/js/ShredFluent.js';
import buildAnAtom from '../../../buildAnAtom.js';
import BuildAnAtomStrings from '../../../BuildAnAtomStrings.js';
import BAAModel from '../../../common/model/BAAModel.js';
import BAAPreferences from '../../../common/model/BAAPreferences.js';
import chargeToString from '../../../common/view/chargeToString.js';

export default class SymbolAccessibleListNode extends AccessibleListNode {
  public constructor( model: BAAModel, visibleProperty: TReadOnlyProperty<boolean> ) {

    const spokenSymbolStringProperty = ShredFluent.a11y.spokenSymbol.createProperty( {
      symbol: model.atom.protonCountProperty.derived( count => {
        return AtomIdentifier.getSymbol( count ).split( '' ).join( ' ' );
      } )
    } );

    const symbolListItemProperty = new DerivedStringProperty(
      [
        model.atom.protonCountProperty,
        BuildAnAtomStrings.a11y.symbolScreen.symbol.accessibleListNode.symbolStringProperty,
        spokenSymbolStringProperty,
        BuildAnAtomStrings.a11y.symbolScreen.symbol.noSymbolStringProperty
      ],
      (
        protonCount: number,
        symbolPattern: string,
        spokenSymbol: string,
        noSymbolString: string
      ) => {
        return StringUtils.fillIn( symbolPattern, { symbol: protonCount > 0 ? spokenSymbol : noSymbolString } );
      }
    );

    const atomicNumberListItemProperty = new DerivedStringProperty(
      [
        model.atom.protonCountProperty,
        BuildAnAtomStrings.a11y.symbolScreen.symbol.accessibleListNode.atomicNumberStringProperty
      ],
      ( protonCount: number, atomicNumberPattern: string ) => {
        return StringUtils.fillIn( atomicNumberPattern, { value: protonCount } );
      }
    );

    const massNumberListItemProperty = new DerivedStringProperty(
      [
        model.atom.massNumberProperty,
        BuildAnAtomStrings.a11y.symbolScreen.symbol.accessibleListNode.massNumberStringProperty
      ],
      ( massNumber: number, massNumberPattern: string ) => {
        return StringUtils.fillIn( massNumberPattern, { value: massNumber } );
      }
    );

    const chargeListItemProperty = new DerivedStringProperty(
      [
        model.atom.chargeProperty,
        BuildAnAtomStrings.a11y.symbolScreen.symbol.accessibleListNode.chargeStringProperty,
        BAAPreferences.instance.chargeNotationProperty
      ],
      ( charge: number, chargePattern: string ) => StringUtils.fillIn( chargePattern, {
          value: chargeToString( charge )
      } )
    );

    super(
      [
        symbolListItemProperty,
        atomicNumberListItemProperty,
        massNumberListItemProperty,
        chargeListItemProperty
      ],
      {
        visibleProperty: visibleProperty,
        leadingParagraphStringProperty: BuildAnAtomStrings.a11y.symbolScreen.symbol.leadingParagraphStringProperty
      }
    );
  }
}

buildAnAtom.register( 'SymbolAccessibleListNode', SymbolAccessibleListNode );