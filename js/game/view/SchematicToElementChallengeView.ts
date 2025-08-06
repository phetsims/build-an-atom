// Copyright 2013-2025, University of Colorado Boulder

/**
 * Visual representation of a challenge where the user is presented with a schematic representation of an atom (which
 * looks much like the atoms constructed on the 1st tab), and must find the represented element on a periodic table.
 *
 * @author John Blanco
 */

import Bounds2 from '../../../../dot/js/Bounds2.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import ModelViewTransform2 from '../../../../phetcommon/js/view/ModelViewTransform2.js';
import ParticleCountDisplay from '../../../../shred/js/view/ParticleCountDisplay.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import buildAnAtom from '../../buildAnAtom.js';
import SchematicToElementChallenge from '../model/SchematicToElementChallenge.js';
import NonInteractiveSchematicAtomNode from './NonInteractiveSchematicAtomNode.js';
import ToElementChallengeView from './ToElementChallengeView.js';

class SchematicToElementChallengeView extends ToElementChallengeView {

  public constructor( schematicToElementChallenge: SchematicToElementChallenge, layoutBounds: Bounds2, tandem: Tandem ) {

    super( schematicToElementChallenge, layoutBounds, tandem );

    // Create the model-view transform used by the schematic atom.
    const modelViewTransform = ModelViewTransform2.createSinglePointScaleInvertedYMapping(
      Vector2.ZERO,
      new Vector2( layoutBounds.width * 0.275, layoutBounds.height * 0.5 ),
      0.8
    );

    // Add the schematic representation of the atom.
    const schematicAtomNode = new NonInteractiveSchematicAtomNode(
      schematicToElementChallenge.correctAnswerAtom,
      modelViewTransform,
      Tandem.OPT_OUT
    );
    this.challengePresentationNode.addChild( schematicAtomNode );

    // Add the particle count indicator.  The width is empirically determined to match the layout in the design doc.
    const particleCountDisplay = new ParticleCountDisplay( schematicToElementChallenge.correctAnswerAtom, {
      bottom: schematicAtomNode.top - 10,
      left: schematicAtomNode.left,
      tandem: tandem.createTandem( 'particleCountDisplay' )
    } );
    schematicAtomNode.addChild( particleCountDisplay );

    // Setting the position at the end, because the particle count display changes the bounds
    schematicAtomNode.right = this.periodicTable.left - 50;
    schematicAtomNode.centerY = this.periodicTable.centerY - particleCountDisplay.height / 2;
  }
}

buildAnAtom.register( 'SchematicToElementChallengeView', SchematicToElementChallengeView );

export default SchematicToElementChallengeView;