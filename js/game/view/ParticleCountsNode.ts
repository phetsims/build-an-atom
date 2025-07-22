// Copyright 2013-2025, University of Colorado Boulder

/**
 * Node that takes a number atom and displays a set of counts for the various
 * subatomic particles. This is generally used when presenting a 'challenge'
 * for the game.
 *
 * @author John Blanco
 */

import PatternStringProperty from '../../../../axon/js/PatternStringProperty.js';
import optionize from '../../../../phet-core/js/optionize.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import Node, { NodeOptions } from '../../../../scenery/js/nodes/Node.js';
import Text from '../../../../scenery/js/nodes/Text.js';
import Font from '../../../../scenery/js/util/Font.js';
import NumberAtom from '../../../../shred/js/model/NumberAtom.js';
import buildAnAtom from '../../buildAnAtom.js';
import BuildAnAtomStrings from '../../BuildAnAtomStrings.js';

// constants
const MAX_WIDTH = 200;

type SelfOptions = {
  font?: Font | string;
};

export type ParticleCountsNodeOptions = SelfOptions & NodeOptions;

class ParticleCountsNode extends Node {

  public constructor( numberAtom: NumberAtom, options?: ParticleCountsNodeOptions ) {

    super( options );

    options = optionize<ParticleCountsNodeOptions, SelfOptions, NodeOptions>()( {
      font: new PhetFont( 24 )
    }, options );

    const protonCountTitle = new Text(
      new PatternStringProperty(
        BuildAnAtomStrings.protonsColonPatternStringProperty,
        { value: numberAtom.protonCountProperty },
        { formatNames: [ 'value' ] }
      ),
      {
        font: options.font,
        maxWidth: MAX_WIDTH
      }
    );
    this.addChild( protonCountTitle );

    const neutronCountTitle = new Text(
      new PatternStringProperty(
        BuildAnAtomStrings.neutronsColonPatternStringProperty,
        { value: numberAtom.neutronCountProperty },
        { formatNames: [ 'value' ] }
      ),
      {
        font: options.font,
        maxWidth: MAX_WIDTH
      }
    );
    this.addChild( neutronCountTitle );

    const electronCountTitle = new Text(
      new PatternStringProperty(
        BuildAnAtomStrings.electronsColonPatternStringProperty,
        { value: numberAtom.electronCountProperty },
        { formatNames: [ 'value' ] }
      ),
      {
        font: options.font,
        maxWidth: MAX_WIDTH
      }
    );
    this.addChild( electronCountTitle );

    // Layout - Line labels up on left edge, numbers on right edge.
    const interLineSpacing = protonCountTitle.height * 0.9; // Multiplier empirically determined.
    protonCountTitle.left = 0;
    protonCountTitle.top = 0;
    neutronCountTitle.left = 0;
    neutronCountTitle.top = protonCountTitle.bottom + interLineSpacing;
    electronCountTitle.left = 0;
    electronCountTitle.top = neutronCountTitle.bottom + interLineSpacing;
  }
}

buildAnAtom.register( 'ParticleCountsNode', ParticleCountsNode );

export default ParticleCountsNode;