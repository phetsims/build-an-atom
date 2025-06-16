// Copyright 2013-2025, University of Colorado Boulder

/**
 * Node that takes a number atom and displays a set of counts for the various
 * subatomic particles.  This is generally used when presenting a 'challenge'
 * for the game.
 *
 * @author John Blanco
 */

import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import optionize from '../../../../phet-core/js/optionize.js';
import StringUtils from '../../../../phetcommon/js/util/StringUtils.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import Node, { NodeOptions } from '../../../../scenery/js/nodes/Node.js';
import Text from '../../../../scenery/js/nodes/Text.js';
import Font from '../../../../scenery/js/util/Font.js';
import { TNumberAtom } from '../../../../shred/js/model/NumberAtom.js';
import buildAnAtom from '../../buildAnAtom.js';
import BuildAnAtomStrings from '../../BuildAnAtomStrings.js';

// constants
const MAX_WIDTH = 280;

type SelfOptions = {
  font?: Font | string;
};

export type ParticleCountsNodeOptions = SelfOptions & NodeOptions;

class ParticleCountsNode extends Node {

  public constructor( numberAtom: TNumberAtom, options?: ParticleCountsNodeOptions ) {

    super( options );

    // Since the original code used the deprecated StringUtils.format, we will use a derived property
    // to support dynamic locale.
    const derivedFormat = (
      stringProperty: TReadOnlyProperty<string>,
      value: number
    ): TReadOnlyProperty<string> => {
      return new DerivedProperty( [ stringProperty ], string => {
        return StringUtils.format( string, value );
      } );
    };

    options = optionize<ParticleCountsNodeOptions, SelfOptions, NodeOptions>()( {
      font: new PhetFont( 24 )
    }, options );
    const protonCountTitle = new Text( derivedFormat( BuildAnAtomStrings.protonsColonPatternStringProperty, numberAtom.protonCountProperty.get() ), {
      font: options.font,
      maxWidth: MAX_WIDTH
    } );
    this.addChild( protonCountTitle );
    const neutronCountTitle = new Text( derivedFormat( BuildAnAtomStrings.neutronsColonPatternStringProperty, numberAtom.neutronCountProperty.get() ), {
      font: options.font,
      maxWidth: MAX_WIDTH
    } );
    this.addChild( neutronCountTitle );
    const electronCountTitle = new Text( derivedFormat( BuildAnAtomStrings.electronsColonPatternStringProperty, numberAtom.electronCountProperty.get() ), {
      font: options.font,
      maxWidth: MAX_WIDTH
    } );
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