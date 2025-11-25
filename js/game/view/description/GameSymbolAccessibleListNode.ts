// Copyright 2025, University of Colorado Boulder
/**
 * Descriptions for the atom view checkboxes.
 * This file is a collection of methods for creating natural language descriptions of the state of the atom view.
 *
 * @author Agustín Vallejo
 */

import DerivedProperty from '../../../../../axon/js/DerivedProperty.js';
import DerivedStringProperty from '../../../../../axon/js/DerivedStringProperty.js';
import DynamicProperty from '../../../../../axon/js/DynamicProperty.js';
import Property from '../../../../../axon/js/Property.js';
import { TReadOnlyProperty } from '../../../../../axon/js/TReadOnlyProperty.js';
import AccessibleListNode from '../../../../../scenery-phet/js/accessibility/AccessibleListNode.js';
import AtomIdentifier from '../../../../../shred/js/AtomIdentifier.js';
import buildAnAtom from '../../../buildAnAtom.js';
import BuildAnAtomFluent from '../../../BuildAnAtomFluent.js';
import BuildAnAtomStrings from '../../../BuildAnAtomStrings.js';
import BAAConstants from '../../../common/BAAConstants.js';

class GameSymbolAccessibleListNode extends AccessibleListNode {
  public constructor(
    protonCountProperty: TReadOnlyProperty<number>,
    massNumberProperty: TReadOnlyProperty<number>,
    chargeProperty: TReadOnlyProperty<number>
  ) {

    // Create a DynamicProperty for the current element string, which will be updated based on the proton count but
    // may also be updated if the locale changes.
    const currentElementStringProperty = new Property( AtomIdentifier.getName( 0 ), { reentrant: true } );
    const elementDynamicStringProperty = new DynamicProperty<string, number, TReadOnlyProperty<string>>( currentElementStringProperty );

    // Update the element name based on the proton count.
    protonCountProperty.link( protonCount => {
      currentElementStringProperty.value = AtomIdentifier.getName( protonCount );
    } );

    const symbolStringProperty = new DerivedStringProperty( [
      protonCountProperty,
      BuildAnAtomStrings.a11y.symbolScreen.symbol.noSymbolStringProperty
    ], ( protonCount: number, noSymbol: string ) => {
      if ( protonCount === 0 ) {
        return noSymbol;
      }
      else {
        return AtomIdentifier.getSpokenSymbol( protonCount, true );
      }
    } );

    const chargeStringProperty = new DerivedStringProperty( [
      chargeProperty
    ], ( charge: number ) => {
      return BAAConstants.chargeToStringSignAfterValue( charge );
    } );

    super( [
      {
        stringProperty: BuildAnAtomFluent.a11y.gameScreen.components.chemicalSymbol.accessibleListNode.name.createProperty( {
          name: elementDynamicStringProperty
        } ),
        visibleProperty: DerivedProperty.valueNotEqualsConstant( protonCountProperty, 0 )
      },
      BuildAnAtomFluent.a11y.gameScreen.components.chemicalSymbol.accessibleListNode.symbol.createProperty( {
        symbol: symbolStringProperty
      } ),
      BuildAnAtomFluent.a11y.gameScreen.components.chemicalSymbol.accessibleListNode.atomicNumber.createProperty( {
        protons: protonCountProperty
      } ),
      BuildAnAtomFluent.a11y.gameScreen.components.chemicalSymbol.accessibleListNode.massNumber.createProperty( {
        mass: massNumberProperty
      } ),
      BuildAnAtomFluent.a11y.gameScreen.components.chemicalSymbol.accessibleListNode.charge.createProperty( {
        charge: chargeStringProperty
      } )
    ], {
      leadingParagraphStringProperty: BuildAnAtomStrings.a11y.gameScreen.components.chemicalSymbol.accessibleListNode.leadingParagraphStringProperty
    } );
  }
}

buildAnAtom.register( 'GameSymbolAccessibleListNode', GameSymbolAccessibleListNode );

export default GameSymbolAccessibleListNode;