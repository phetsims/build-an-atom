// Copyright 2013-2025, University of Colorado Boulder

/**
 * Node for entering numbers of protons, neutrons, electrons.
 *
 * @author John Blanco
 */

import optionize from '../../../../phet-core/js/optionize.js';
import WithRequired from '../../../../phet-core/js/types/WithRequired.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import HBox from '../../../../scenery/js/layout/nodes/HBox.js';
import VBox from '../../../../scenery/js/layout/nodes/VBox.js';
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
    const protonCountEntryNode = new NumberEntryNode(
      this.answerAtom.protonCountProperty,
      tandem.createTandem( 'protonCountEntryNode' ), {
        minValue: 0,
        maxValue: 99
      } );
    const protonRowNode = new HBox( {
      children: [ protonCountPrompt, protonCountEntryNode ],
      spacing: 10,
      tandem: tandem.createTandem( 'protonRowNode' )
    } );

    const neutronCountPrompt = new Text( BuildAnAtomStrings.neutronsColonStringProperty, {
      font: options.font,
      maxWidth: MAX_WIDTH
    } );
    const neutronCountEntryNode = new NumberEntryNode( this.answerAtom.neutronCountProperty,
      tandem.createTandem( 'neutronCountEntryNode' ), {
        minValue: 0,
        maxValue: 99
      } );
    const neutronRowNode = new HBox( {
      children: [ neutronCountPrompt, neutronCountEntryNode ],
      spacing: 10,
      tandem: tandem.createTandem( 'neutronRowNode' )
    } );

    const electronCountPrompt = new Text( BuildAnAtomStrings.electronsColonStringProperty, {
      font: options.font,
      maxWidth: MAX_WIDTH
    } );
    const electronCountEntryNode = new NumberEntryNode(
      this.answerAtom.electronCountProperty,
      tandem.createTandem( 'electronCountEntryNode' ), {
        minValue: 0,
        maxValue: 99
      } );
    const electronRowNode = new HBox( {
      children: [ electronCountPrompt, electronCountEntryNode ],
      spacing: 10,
      tandem: tandem.createTandem( 'electronRowNode' )
    } );

    const particleCountsNode = new VBox( {
      children: [ protonRowNode, neutronRowNode, electronRowNode ],
      spacing: 20,
      tandem: tandem.createTandem( 'particleCountsNode' ),
      align: 'right'
    } );
    this.addChild( particleCountsNode );

  }


  public reset(): void {
    this.answerAtom.protonCountProperty.reset();
    this.answerAtom.neutronCountProperty.reset();
    this.answerAtom.electronCountProperty.reset();
  }
}

buildAnAtom.register( 'InteractiveParticleCountsNode', InteractiveParticleCountsNode );

export default InteractiveParticleCountsNode;