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
import buildAnAtom from '../../../buildAnAtom.js';
import BuildAnAtomStrings from '../../../BuildAnAtomStrings.js';
import BAAModel from '../../../common/model/BAAModel.js';

export default class SymbolAccessibleListNode extends AccessibleListNode {
  public constructor( model: BAAModel, visibleProperty: TReadOnlyProperty<boolean> ) {

    const symbolListItemProperty = new DerivedStringProperty(
      [
        model.atom.protonCountProperty,
        BuildAnAtomStrings.a11y.symbolScreen.symbol.accessibleListNode.symbolStringProperty,
        BuildAnAtomStrings.a11y.symbolScreen.symbol.noSymbolStringProperty,
        BuildAnAtomStrings.a11y.common.mathSpeakUpperStringProperty
      ],
      (
        protonCount: number,
        symbolPattern: string,
        noSymbolString: string,
        upperString: string
      ) => {
        const symbol = AtomIdentifier.getSymbol( protonCount );
        const mathSpeakSymbol = StringUtils.fillIn( upperString, { symbol: symbol.split( '' ).join( ' ' ) } );
        return StringUtils.fillIn( symbolPattern, { symbol: protonCount > 0 ? mathSpeakSymbol : noSymbolString } );
      }
    );

    const atomicNumberListItemProperty = new DerivedStringProperty(
      [
        model.atom.protonCountProperty,
        BuildAnAtomStrings.a11y.symbolScreen.symbol.accessibleListNode.atomicNumberStringProperty
      ],
      ( protonCount: number, atomicNumberPattern: string ) => {
        return StringUtils.fillIn( atomicNumberPattern, { value: protonCount } );
      } );

    const massNumberListItemProperty = new DerivedStringProperty(
      [
        model.atom.massNumberProperty,
        BuildAnAtomStrings.a11y.symbolScreen.symbol.accessibleListNode.massNumberStringProperty
      ],
      ( massNumber: number, massNumberPattern: string ) => {
        return StringUtils.fillIn( massNumberPattern, { value: massNumber } );
      } );

    const chargeListItemProperty = new DerivedStringProperty(
      [
        model.atom.chargeProperty,
        BuildAnAtomStrings.a11y.symbolScreen.symbol.accessibleListNode.chargeStringProperty
      ],
      ( charge: number, chargePattern: string ) => {
        return StringUtils.fillIn( chargePattern, { value: Math.abs( charge ), sign: charge > 0 ? '+' : charge === 0 ? '' : '\u2212' } );

      } );

    super( [
      symbolListItemProperty,
      atomicNumberListItemProperty,
      massNumberListItemProperty,
      chargeListItemProperty
    ], { visibleProperty: visibleProperty } );
  }
}

buildAnAtom.register( 'SymbolAccessibleListNode', SymbolAccessibleListNode );