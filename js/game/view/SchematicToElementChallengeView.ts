// Copyright 2013-2025, University of Colorado Boulder

/**
 * Visual representation of a challenge where the user is presented with a
 * schematic representation of an atom (which looks much like the atoms
 * constructed on the 1st tab), and must find the represented element on a
 * periodic table.
 *
 * @author John Blanco
 */

import Bounds2 from '../../../../dot/js/Bounds2.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import ModelViewTransform2 from '../../../../phetcommon/js/view/ModelViewTransform2.js';
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
    const nonInteractiveSchematicNode = new NonInteractiveSchematicAtomNode(
      schematicToElementChallenge.answerAtom,
      modelViewTransform,
      tandem.createTandem( 'noninteractiveSchematicAtomNode' )
    );

    // TODO: Can I incorporate these into the construction of this instance? See https://github.com/phetsims/build-an-atom/issues/280.
    nonInteractiveSchematicNode.centerX = this.periodicTable.left / 2;
    nonInteractiveSchematicNode.centerY = this.periodicTable.centerY;

    this.challengePresentationNode.addChild( nonInteractiveSchematicNode );
  }
}

buildAnAtom.register( 'SchematicToElementChallengeView', SchematicToElementChallengeView );

export default SchematicToElementChallengeView;