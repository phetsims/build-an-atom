// Copyright 2013-2025, University of Colorado Boulder

/**
 * Node that takes a NumberAtom and displays a set of counts for the various subatomic particles. This is generally used
 * when presenting a 'challenge' for the game.
 *
 * @author John Blanco
 */

import PatternStringProperty from '../../../../axon/js/PatternStringProperty.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import VBox from '../../../../scenery/js/layout/nodes/VBox.js';
import Text from '../../../../scenery/js/nodes/Text.js';
import NumberAtom from '../../../../shred/js/model/NumberAtom.js';
import buildAnAtom from '../../buildAnAtom.js';
import BuildAnAtomFluent from '../../BuildAnAtomFluent.js';

// constants
const MAX_WIDTH = 200;

class ParticleCountsNode extends VBox {

  public constructor( numberAtom: NumberAtom ) {

    super( {
      spacing: 30,
      align: 'left'
    } );

    const font = new PhetFont( 24 );

    // Using formatNames because this string uses the old pattern ('Protons: {0}')
    // and we don't want to lose translations by moving to the new pattern.
    const patternOptions = {
      formatNames: [ 'value' ]
    };

    const protonCountTitle = new Text(
      new PatternStringProperty(
        BuildAnAtomFluent.protonsColonPatternStringProperty,
        { value: numberAtom.protonCountProperty },
        patternOptions
      ),
      {
        font: font,
        maxWidth: MAX_WIDTH
      }
    );
    this.addChild( protonCountTitle );

    const neutronCountTitle = new Text(
      new PatternStringProperty(
        BuildAnAtomFluent.neutronsColonPatternStringProperty,
        { value: numberAtom.neutronCountProperty },
        patternOptions
      ),
      {
        font: font,
        maxWidth: MAX_WIDTH
      }
    );
    this.addChild( neutronCountTitle );

    const electronCountTitle = new Text(
      new PatternStringProperty(
        BuildAnAtomFluent.electronsColonPatternStringProperty,
        { value: numberAtom.electronCountProperty },
        patternOptions
      ),
      {
        font: font,
        maxWidth: MAX_WIDTH
      }
    );
    this.addChild( electronCountTitle );
  }
}

buildAnAtom.register( 'ParticleCountsNode', ParticleCountsNode );

export default ParticleCountsNode;