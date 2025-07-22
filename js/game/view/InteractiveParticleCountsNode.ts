// Copyright 2013-2025, University of Colorado Boulder

/**
 * Node for entering numbers of protons, neutrons, electrons.
 *
 * @author John Blanco
 */

import optionize from '../../../../phet-core/js/optionize.js';
import WithRequired from '../../../../phet-core/js/types/WithRequired.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import Node, { NodeOptions } from '../../../../scenery/js/nodes/Node.js';
import Text from '../../../../scenery/js/nodes/Text.js';
import Font from '../../../../scenery/js/util/Font.js';
import buildAnAtom from '../../buildAnAtom.js';
import BuildAnAtomStrings from '../../BuildAnAtomStrings.js';
import AnswerAtom from '../model/AnswerAtom.js';
import NumberEntryNode from './NumberEntryNode.js';

// constants
const MAX_WIDTH = 200;

type SelfOptions = {
  font?: Font | string;
};

export type InteractiveParticleCountsNodeOptions = SelfOptions & WithRequired<NodeOptions, 'tandem'>;

class InteractiveParticleCountsNode extends Node {

  public readonly answerAtom: AnswerAtom;
  private disposeInteractiveParticlCountsNode: () => void;

  public constructor( providedOptions: InteractiveParticleCountsNodeOptions ) {

    const options = optionize<InteractiveParticleCountsNodeOptions, SelfOptions, NodeOptions>()( {
      font: new PhetFont( 24 )
    }, providedOptions );

    super( options );

    const tandem = options.tandem;

    this.answerAtom = new AnswerAtom( { tandem: tandem.createTandem( 'answerAtom' ) } );

    const protonCountPrompt = new Text( BuildAnAtomStrings.protonsColonStringProperty, {
      font: options.font,
      maxWidth: MAX_WIDTH
    } );
    this.addChild( protonCountPrompt );
    const protonCountEntryNode = new NumberEntryNode(
      this.answerAtom.protonCountProperty,
      tandem.createTandem( 'protonCountEntryNode' ), {
        minValue: 0,
        maxValue: 99
      } );
    this.addChild( protonCountEntryNode );

    const neutronCountPrompt = new Text( BuildAnAtomStrings.neutronsColonStringProperty, {
      font: options.font,
      maxWidth: MAX_WIDTH
    } );
    this.addChild( neutronCountPrompt );
    const neutronCountEntryNode = new NumberEntryNode( this.answerAtom.neutronCountProperty,
      tandem.createTandem( 'neutronCountEntryNode' ), {
        minValue: 0,
        maxValue: 99
      } );
    this.addChild( neutronCountEntryNode );

    const electronCountPrompt = new Text( BuildAnAtomStrings.electronsColonStringProperty, {
      font: options.font,
      maxWidth: MAX_WIDTH
    } );
    this.addChild( electronCountPrompt );
    const electronCountEntryNode = new NumberEntryNode(
      this.answerAtom.electronCountProperty,
      tandem.createTandem( 'electronCountEntryNode' ), {
        minValue: 0,
        maxValue: 99
      } );
    this.addChild( electronCountEntryNode );

    // Layout
    const maxParticleLabelWidth = Math.max( Math.max( protonCountPrompt.width, neutronCountPrompt.width ), electronCountPrompt.width );

    const interLineSpacing = protonCountEntryNode.height; // Multiplier empirically determined.
    protonCountPrompt.left = 0;
    neutronCountPrompt.left = 0;
    electronCountPrompt.left = 0;
    protonCountEntryNode.top = 0;
    neutronCountEntryNode.top = protonCountEntryNode.centerY + interLineSpacing;
    electronCountEntryNode.top = neutronCountEntryNode.centerY + interLineSpacing;
    protonCountPrompt.centerY = protonCountEntryNode.centerY;
    neutronCountPrompt.centerY = neutronCountEntryNode.centerY;
    electronCountPrompt.centerY = electronCountEntryNode.centerY;
    protonCountEntryNode.left = maxParticleLabelWidth + protonCountPrompt.height;
    neutronCountEntryNode.left = protonCountEntryNode.left;
    electronCountEntryNode.left = protonCountEntryNode.left;

    this.disposeInteractiveParticlCountsNode = () => {
      electronCountEntryNode.dispose();
      neutronCountEntryNode.dispose();
      protonCountEntryNode.dispose();
      this.answerAtom.dispose();
    };
  }

  public override dispose(): void {
    this.disposeInteractiveParticlCountsNode();
    super.dispose();
  }

  public reset(): void {
    this.answerAtom.protonCountProperty.reset();
    this.answerAtom.neutronCountProperty.reset();
    this.answerAtom.electronCountProperty.reset();
  }
}

buildAnAtom.register( 'InteractiveParticleCountsNode', InteractiveParticleCountsNode );

export default InteractiveParticleCountsNode;