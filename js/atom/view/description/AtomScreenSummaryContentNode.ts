// Copyright 2025, University of Colorado Boulder
/**
 * Main content node for the summary section of the first screen of the Build an Atom simulation.
 *
 * @author Agustín Vallejo (PhET Interactive Simulations)
 */

import ScreenSummaryContent from '../../../../../joist/js/ScreenSummaryContent.js';
import buildAnAtom from '../../../buildAnAtom.js';
import BuildAnAtomFluent from '../../../BuildAnAtomFluent.js';
import BAAModel from '../../../common/model/BAAModel.js';

export default class AtomScreenSummaryContentNode extends ScreenSummaryContent {
  public constructor( model: BAAModel ) {

    const currentDetailsStringProperty = BuildAnAtomFluent.a11y.common.screenSummary.currentDetails.createProperty(
      {
        value: model.atom.particleCountProperty
      }
    );

    super( {
      currentDetailsContent: currentDetailsStringProperty,
      playAreaContent: BuildAnAtomFluent.a11y.atomScreen.screenSummary.playAreaStringProperty,
      controlAreaContent: BuildAnAtomFluent.a11y.common.screenSummary.controlAreaStringProperty,
      interactionHintContent: BuildAnAtomFluent.a11y.common.screenSummary.interactionHintStringProperty
    } );
  }
}

buildAnAtom.register( 'AtomScreenSummaryContentNode', AtomScreenSummaryContentNode );