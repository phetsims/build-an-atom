// Copyright 2025, University of Colorado Boulder
/**
 * Screen icon for the Atom screen.
 *
 * @author Agustín Vallejo
 */

import Vector2 from '../../../../dot/js/Vector2.js';
import ScreenIcon from '../../../../joist/js/ScreenIcon.js';
import ModelViewTransform2 from '../../../../phetcommon/js/view/ModelViewTransform2.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import NumberAtom from '../../../../shred/js/model/NumberAtom.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import buildAnAtom from '../../buildAnAtom.js';
import NonInteractiveSchematicAtomNode from '../../game/view/NonInteractiveSchematicAtomNode.js';

export default class AtomScreenIcon extends ScreenIcon {

  public constructor( tandem: Tandem ) {

    const iconNode = new Node();

    // Create the model-view transform used by the schematic atom.
    const modelViewTransform = ModelViewTransform2.createSinglePointScaleInvertedYMapping(
      Vector2.ZERO,
      new Vector2( 0.275, 0.5 ),
      0.5
    );

    // Add the schematic representation of the atom.
    const schematicAtomNode = new NonInteractiveSchematicAtomNode(
      new NumberAtom( { protonCount: 3, neutronCount: 4, electronCount: 3 } ),
      modelViewTransform,
      tandem.createTandem( 'noninteractiveSchematicAtomNode' )
    );

    iconNode.addChild( schematicAtomNode );

    super(
      iconNode,
      {
        tandem: tandem
      }
    );
  }
}

buildAnAtom.register( 'AtomScreenIcon', AtomScreenIcon );