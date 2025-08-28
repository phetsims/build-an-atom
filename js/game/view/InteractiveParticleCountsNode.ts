// Copyright 2013-2025, University of Colorado Boulder

/**
 * Node for entering numbers of protons, neutrons, electrons.
 *
 * @author John Blanco
 */

import BooleanProperty from '../../../../axon/js/BooleanProperty.js';
import { TReadOnlyProperty } from '../../../../axon/js/TReadOnlyProperty.js';
import optionize from '../../../../phet-core/js/optionize.js';
import WithRequired from '../../../../phet-core/js/types/WithRequired.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import HBox from '../../../../scenery/js/layout/nodes/HBox.js';
import VBox from '../../../../scenery/js/layout/nodes/VBox.js';
import Node, { NodeOptions } from '../../../../scenery/js/nodes/Node.js';
import Text from '../../../../scenery/js/nodes/Text.js';
import Font from '../../../../scenery/js/util/Font.js';
import buildAnAtom from '../../buildAnAtom.js';
import BuildAnAtomFluent from '../../BuildAnAtomFluent.js';
import AnswerAtom from '../model/AnswerAtom.js';
import BAANumberSpinner from './BAANumberSpinner.js';

// constants
const MAX_WIDTH = 200;

type SelfOptions = {
  font?: Font | string;
  showArrowButtonsProperty?: TReadOnlyProperty<boolean>; // Wether to show the arrow buttons for the number spinners.
};

export type InteractiveParticleCountsNodeOptions = SelfOptions & WithRequired<NodeOptions, 'tandem'>;

class InteractiveParticleCountsNode extends Node {

  public readonly submittedAnswerAtom: AnswerAtom;

  public constructor( providedOptions: InteractiveParticleCountsNodeOptions ) {

    const options = optionize<InteractiveParticleCountsNodeOptions, SelfOptions, NodeOptions>()( {
      font: new PhetFont( 24 ),
      showArrowButtonsProperty: new BooleanProperty( true )
    }, providedOptions );

    super( options );

    const tandem = options.tandem;

    this.submittedAnswerAtom = new AnswerAtom( { tandem: tandem.createTandem( 'submittedAnswerAtom' ) } );


    const protonCountPrompt = new Text( BuildAnAtomFluent.protonsColonStringProperty, {
      font: options.font,
      maxWidth: MAX_WIDTH
    } );
    const protonCountNumberSpinner = new BAANumberSpinner(
      this.submittedAnswerAtom.protonCountProperty,
      tandem.createTandem( 'protonCountNumberSpinner' ), {
        minValue: 0,
        maxValue: 99,
        arrowButtonOptions: {
          visibleProperty: options.showArrowButtonsProperty
        }
      } );
    const protonRowNode = new HBox( {
      children: [ protonCountPrompt, protonCountNumberSpinner ],
      spacing: 10
    } );

    const neutronCountPrompt = new Text( BuildAnAtomFluent.neutronsColonStringProperty, {
      font: options.font,
      maxWidth: MAX_WIDTH
    } );
    const neutronCountNumberSpinner = new BAANumberSpinner( this.submittedAnswerAtom.neutronCountProperty,
      tandem.createTandem( 'neutronCountNumberSpinner' ), {
        minValue: 0,
        maxValue: 99,
        arrowButtonOptions: {
          visibleProperty: options.showArrowButtonsProperty
        }
      } );
    const neutronRowNode = new HBox( {
      children: [ neutronCountPrompt, neutronCountNumberSpinner ],
      spacing: 10
    } );

    const electronCountPrompt = new Text( BuildAnAtomFluent.electronsColonStringProperty, {
      font: options.font,
      maxWidth: MAX_WIDTH
    } );
    const electronCountNumberSpinner = new BAANumberSpinner(
      this.submittedAnswerAtom.electronCountProperty,
      tandem.createTandem( 'electronCountNumberSpinner' ), {
        minValue: 0,
        maxValue: 99,
        arrowButtonOptions: {
          visibleProperty: options.showArrowButtonsProperty
        }
      } );
    const electronRowNode = new HBox( {
      children: [ electronCountPrompt, electronCountNumberSpinner ],
      spacing: 10
    } );

    const particleCountsNode = new VBox( {
      children: [ protonRowNode, neutronRowNode, electronRowNode ],
      spacing: 20,
      align: 'right'
    } );
    this.addChild( particleCountsNode );

  }


  public reset(): void {
    this.submittedAnswerAtom.protonCountProperty.reset();
    this.submittedAnswerAtom.neutronCountProperty.reset();
    this.submittedAnswerAtom.electronCountProperty.reset();
  }
}

buildAnAtom.register( 'InteractiveParticleCountsNode', InteractiveParticleCountsNode );

export default InteractiveParticleCountsNode;