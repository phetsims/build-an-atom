// Copyright 2025, University of Colorado Boulder

/**
 * This file implements accessible descriptions for the chemical symbol information in the game screen.
 *
 * @author Agustín Vallejo (PhET Interactive Simulations)
 */

import DerivedProperty from '../../../../../axon/js/DerivedProperty.js';
import DerivedStringProperty from '../../../../../axon/js/DerivedStringProperty.js';
import { TReadOnlyProperty } from '../../../../../axon/js/TReadOnlyProperty.js';
import AccessibleList from '../../../../../scenery-phet/js/accessibility/AccessibleList.js';
import Node from '../../../../../scenery/js/nodes/Node.js';
import AtomNameUtils from '../../../../../shred/js/AtomNameUtils.js';
import BuildAnAtomFluent from '../../../BuildAnAtomFluent.js';
import BAAPreferences from '../../../common/model/BAAPreferences.js';
import chargeToString from '../../../common/view/chargeToString.js';

class GameSymbolDescriptionNode extends Node {
  public constructor(
    protonCountProperty: TReadOnlyProperty<number>,
    massNumberProperty: TReadOnlyProperty<number>,
    chargeProperty: TReadOnlyProperty<number>
  ) {

    const elementDynamicStringProperty = AtomNameUtils.createDynamicNameProperty( protonCountProperty );

    const symbolStringProperty = new DerivedStringProperty(
      [
        protonCountProperty,
        BuildAnAtomFluent.a11y.symbolScreen.symbol.noSymbolStringProperty
      ],
      ( protonCount: number, noSymbol: string ) => {
        if ( protonCount === 0 ) {
          return noSymbol;
        }
        else {
          return AtomNameUtils.getSpokenSymbol( protonCount, true );
        }
      }
    );

    const chargeStringProperty = new DerivedStringProperty(
      [ chargeProperty, BAAPreferences.instance.chargeNotationProperty ],
      ( charge: number ) => chargeToString( charge )
    );

    super( {
      accessibleTemplate: AccessibleList.createTemplateProperty( {
        listItems: [
          {
            stringProperty: BuildAnAtomFluent.a11y.gameScreen.components.chemicalSymbol.accessibleList.name.createProperty( {
              name: elementDynamicStringProperty
            } ),
            visibleProperty: DerivedProperty.valueNotEqualsConstant( protonCountProperty, 0 )
          },
          BuildAnAtomFluent.a11y.gameScreen.components.chemicalSymbol.accessibleList.symbol.createProperty( {
            symbol: symbolStringProperty
          } ),
          BuildAnAtomFluent.a11y.gameScreen.components.chemicalSymbol.accessibleList.atomicNumber.createProperty( {
            protons: protonCountProperty
          } ),
          BuildAnAtomFluent.a11y.gameScreen.components.chemicalSymbol.accessibleList.massNumber.createProperty( {
            mass: massNumberProperty
          } ),
          BuildAnAtomFluent.a11y.gameScreen.components.chemicalSymbol.accessibleList.charge.createProperty( {
            charge: chargeStringProperty
          } )
        ],
        leadingParagraphStringProperty: BuildAnAtomFluent.a11y.gameScreen.components.chemicalSymbol.accessibleList.leadingParagraphStringProperty
      } )
    } );
  }
}

export default GameSymbolDescriptionNode;
