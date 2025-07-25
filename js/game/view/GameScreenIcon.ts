// Copyright 2025, University of Colorado Boulder
/**
 * Screen icon for the Game screen.
 *
 * @author Agustín Vallejo
 */

import Vector2 from '../../../../dot/js/Vector2.js';
import ScreenIcon, { MINIMUM_HOME_SCREEN_ICON_SIZE } from '../../../../joist/js/ScreenIcon.js';
import ModelViewTransform2 from '../../../../phetcommon/js/view/ModelViewTransform2.js';
import FaceNode from '../../../../scenery-phet/js/FaceNode.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import Rectangle from '../../../../scenery/js/nodes/Rectangle.js';
import NumberAtom from '../../../../shred/js/model/NumberAtom.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import buildAnAtom from '../../buildAnAtom.js';
import BAAColors from '../../common/BAAColors.js';
import InteractiveSymbolNode from '../../game/view/InteractiveSymbolNode.js';
import NonInteractiveSchematicAtomNode from './NonInteractiveSchematicAtomNode.js';

export default class GameScreenIcon extends ScreenIcon {

  public constructor( tandem: Tandem ) {

    const iconNode = new Node();

    const backgroundNode = new Rectangle( 0, 0, MINIMUM_HOME_SCREEN_ICON_SIZE.width, MINIMUM_HOME_SCREEN_ICON_SIZE.height, {
      fill: BAAColors.gameScreenBackgroundColorProperty,
      stroke: null
    } );

    // The scale of the atom and the symbol in the icon.
    const SCALE = 0.65;

    const ATOM_SCALE = 0.3;
    // Create the model-view transform used by the schematic atom.
    const modelViewTransform = ModelViewTransform2.createSinglePointScaleInvertedYMapping(
      Vector2.ZERO,
      new Vector2( 0.275, 0.5 ),
      ATOM_SCALE
    );

    // Add the schematic representation of the atom.
    const schematicAtomNode = new NonInteractiveSchematicAtomNode(
      new NumberAtom( { protonCount: 2, neutronCount: 2, electronCount: 2 } ),
      modelViewTransform,
      tandem.createTandem( 'noninteractiveSchematicAtomNode' )
    );
    schematicAtomNode.setScaleMagnitude( SCALE / ATOM_SCALE );


    // Add the schematic representation of the atom.
    const symbolNode = new InteractiveSymbolNode(
      new NumberAtom( { protonCount: 2, neutronCount: 2, electronCount: 2 } ),
      tandem.createTandem( 'symbolNode' ),
      {
        interactiveProtonCount: false,
        interactiveCharge: false,
        interactiveMassNumber: false,
        showAtomName: false,
        excludeInvisibleChildrenFromBounds: true
      }
    );

    const faceNode = new FaceNode( backgroundNode.width * 0.3, {
      opacity: 0.75,
      headStroke: BAAColors.facialStrokeColorProperty,
      headLineWidth: 3
    } );
    faceNode.smile();

    iconNode.addChild( backgroundNode );

    symbolNode.setScaleMagnitude( SCALE );
    symbolNode.centerX = backgroundNode.width * 0.80;
    faceNode.centerX = backgroundNode.width * 0.5;
    schematicAtomNode.centerX = backgroundNode.width * 0.25;

    symbolNode.centerY = schematicAtomNode.centerY = backgroundNode.height * 0.7;
    faceNode.centerY = backgroundNode.height * 0.25;

    iconNode.addChild( symbolNode );
    iconNode.addChild( schematicAtomNode );
    iconNode.addChild( faceNode );

    super(
      iconNode,
      {
        tandem: tandem,
        maxIconWidthProportion: 1,
        maxIconHeightProportion: 1
      }
    );
  }
}

buildAnAtom.register( 'GameScreenIcon', GameScreenIcon );