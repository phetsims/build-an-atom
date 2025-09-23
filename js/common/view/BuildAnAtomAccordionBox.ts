// Copyright 2013-2025, University of Colorado Boulder

/**
 * An accordion box with accessible features designed for Build An Atom.
 *
 * Normally this should be named BAAAccordionBox, but that's too many A's to be readable.
 *
 * @author Agustín Vallejo
 */

import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import AccordionBox, { AccordionBoxOptions } from '../../../../sun/js/AccordionBox.js';
import buildAnAtom from '../../buildAnAtom.js';
import BuildAnAtomStrings from '../../BuildAnAtomStrings.js';

type SelfOptions = EmptySelfOptions;
export type BuildAnAtomAccordionBoxOptions = SelfOptions & AccordionBoxOptions;

class BuildAnAtomAccordionBox extends AccordionBox {

  public constructor( contentNode: Node, providedOptions?: BuildAnAtomAccordionBoxOptions ) {

    const options = optionize<BuildAnAtomAccordionBoxOptions, SelfOptions, AccordionBoxOptions>()( {
      accessibleContextResponseExpanded: BuildAnAtomStrings.a11y.common.accordionAccessibleContextResponse.expandedStringProperty,
      accessibleContextResponseCollapsed: BuildAnAtomStrings.a11y.common.accordionAccessibleContextResponse.collapsedStringProperty
    }, providedOptions );

    super( contentNode, options );
  }
}

buildAnAtom.register( 'BuildAnAtomAccordionBox', BuildAnAtomAccordionBox );

export default BuildAnAtomAccordionBox;