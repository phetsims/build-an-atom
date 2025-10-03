// Copyright 2025, University of Colorado Boulder
/**
 * Main content node for the summary section of the second screen of the Build an Atom simulation.
 *
 * @author Agustín Vallejo
 */

import DerivedStringProperty from '../../../../axon/js/DerivedStringProperty.js';
import ScreenSummaryContent from '../../../../joist/js/ScreenSummaryContent.js';
import StringUtils from '../../../../phetcommon/js/util/StringUtils.js';
import buildAnAtom from '../../buildAnAtom.js';
import BuildAnAtomStrings from '../../BuildAnAtomStrings.js';
import BAAModel from '../../common/model/BAAModel.js';

export default class SymbolScreenSummaryContentNode extends ScreenSummaryContent {
  public constructor( model: BAAModel ) {

    const currentDetailsStringProperty = new DerivedStringProperty( [
        model.atom.particleCountProperty,
        BuildAnAtomStrings.a11y.atomScreen.screenSummary.currentDetailsStringProperty
      ],
      ( particleCount: number, currentDetailsPattern: string ) => {
        return StringUtils.fillIn( currentDetailsPattern, { value: particleCount } );
      } );


    super( {
      playAreaContent: BuildAnAtomStrings.a11y.symbolScreen.screenSummary.playAreaStringProperty,

      // Same as atom screen
      currentDetailsContent: currentDetailsStringProperty,
      controlAreaContent: BuildAnAtomStrings.a11y.atomScreen.screenSummary.controlAreaStringProperty,
      interactionHintContent: BuildAnAtomStrings.a11y.atomScreen.screenSummary.interactionHintStringProperty
    } );
  }
}

buildAnAtom.register( 'SymbolScreenSummaryContentNode', SymbolScreenSummaryContentNode );