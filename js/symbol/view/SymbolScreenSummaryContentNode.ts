// Copyright 2025, University of Colorado Boulder
/**
 * Main content node for the summary section of the second screen of the Build an Atom simulation.
 *
 * @author Agustín Vallejo
 */

import ScreenSummaryContent from '../../../../joist/js/ScreenSummaryContent.js';
import buildAnAtom from '../../buildAnAtom.js';
import BuildAnAtomFluent from '../../BuildAnAtomFluent.js';
import BuildAnAtomStrings from '../../BuildAnAtomStrings.js';
import BAAModel from '../../common/model/BAAModel.js';

export default class SymbolScreenSummaryContentNode extends ScreenSummaryContent {
  public constructor( model: BAAModel ) {

    const currentDetailsStringProperty = BuildAnAtomFluent.a11y.common.screenSummary.currentDetails.createProperty(
      {
        value: model.atom.particleCountProperty
      }
    );


    super( {
      playAreaContent: BuildAnAtomStrings.a11y.symbolScreen.screenSummary.playAreaStringProperty,

      // Same as atom screen
      currentDetailsContent: currentDetailsStringProperty,
      controlAreaContent: BuildAnAtomStrings.a11y.common.screenSummary.controlAreaStringProperty,
      interactionHintContent: BuildAnAtomStrings.a11y.common.screenSummary.interactionHintStringProperty
    } );
  }
}

buildAnAtom.register( 'SymbolScreenSummaryContentNode', SymbolScreenSummaryContentNode );