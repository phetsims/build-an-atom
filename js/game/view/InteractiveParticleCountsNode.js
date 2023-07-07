// Copyright 2013-2022, University of Colorado Boulder

/**
 * Node for entering numbers of protons, neutrons, electrons.
 *
 * @author John Blanco
 */

import merge from '../../../../phet-core/js/merge.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import { Node, Text } from '../../../../scenery/js/imports.js';
import NumberAtom from '../../../../shred/js/model/NumberAtom.js';
import buildAnAtom from '../../buildAnAtom.js';
import BuildAnAtomStrings from '../../BuildAnAtomStrings.js';
import NumberEntryNode from './NumberEntryNode.js';

const electronsColonString = BuildAnAtomStrings.electronsColon;
const neutronsColonString = BuildAnAtomStrings.neutronsColon;
const protonsColonString = BuildAnAtomStrings.protonsColon;

// constants
const MAX_WIDTH = 200;

class InteractiveParticleCountsNode extends Node {

  /**
   * @param {Tandem} tandem
   * @param {Object} [options]
   */
  constructor( tandem, options ) {

    super( options );

    options = merge( { font: new PhetFont( 24 ) }, options );

    this.numberAtom = new NumberAtom( { tandem: tandem.createTandem( 'numberAtom' ) } );

    const protonCountPrompt = new Text( protonsColonString, {
      font: options.font,
      maxWidth: MAX_WIDTH
    } );
    this.addChild( protonCountPrompt );
    const protonCountEntryNode = new NumberEntryNode(
      this.numberAtom.protonCountProperty,
      tandem.createTandem( 'protonCountEntryNode' ), {
        minValue: 0,
        maxValue: 99
      } );
    this.addChild( protonCountEntryNode );

    const neutronCountPrompt = new Text( neutronsColonString, {
      font: options.font,
      maxWidth: MAX_WIDTH
    } );
    this.addChild( neutronCountPrompt );
    const neutronCountEntryNode = new NumberEntryNode( this.numberAtom.neutronCountProperty,
      tandem.createTandem( 'neutronCountEntryNode' ), {
        minValue: 0,
        maxValue: 99
      } );
    this.addChild( neutronCountEntryNode );

    const electronCountPrompt = new Text( electronsColonString, {
      font: options.font,
      maxWidth: MAX_WIDTH
    } );
    this.addChild( electronCountPrompt );
    const electronCountEntryNode = new NumberEntryNode(
      this.numberAtom.electronCountProperty,
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

    // @private called by dispose
    this.disposeInteractiveParticlCountsNode = function() {
      electronCountEntryNode.dispose();
      neutronCountEntryNode.dispose();
      protonCountEntryNode.dispose();
      this.numberAtom.dispose();
    };
  }

  /**
   * release references
   * @public
   */
  dispose() {
    this.disposeInteractiveParticlCountsNode( this );
    super.dispose();
  }
}

buildAnAtom.register( 'InteractiveParticleCountsNode', InteractiveParticleCountsNode );

export default InteractiveParticleCountsNode;