// Copyright 2013-2025, University of Colorado Boulder

/**
 * ScreenView that presents an interactive atom on the left side with buckets of particles underneath and controls for
 * label visibility and reset.  Several accordion boxes with information about the atom appear on the right.  This is
 * intended to be used as a base class for screens with similar views.
 *
 * @author John Blanco (PhET Interactive Simulations)
 * @author Aadish Gupta
 */

import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import Bounds2 from '../../../../dot/js/Bounds2.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import ScreenView, { ScreenViewOptions } from '../../../../joist/js/ScreenView.js';
import { combineOptions } from '../../../../phet-core/js/optionize.js';
import ModelViewTransform2 from '../../../../phetcommon/js/view/ModelViewTransform2.js';
import ResetAllButton from '../../../../scenery-phet/js/buttons/ResetAllButton.js';
import VBox from '../../../../scenery/js/layout/nodes/VBox.js';
import Text from '../../../../scenery/js/nodes/Text.js';
import AtomIdentifier from '../../../../shred/js/AtomIdentifier.js';
import ShredConstants from '../../../../shred/js/ShredConstants.js';
import AtomViewProperties from '../../../../shred/js/view/AtomViewProperties.js';
import ParticleCountDisplay from '../../../../shred/js/view/ParticleCountDisplay.js';
import PeriodicTableNode from '../../../../shred/js/view/PeriodicTableNode.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import PeriodicTableAndSymbol from '../../atom/view/PeriodicTableAndSymbol.js';
import buildAnAtom from '../../buildAnAtom.js';
import BuildAnAtomFluent from '../../BuildAnAtomFluent.js';
import BAAConstants from '../BAAConstants.js';
import BAAModel from '../model/BAAModel.js';
import AtomAppearanceCheckboxGroup from './AtomAppearanceCheckboxGroup.js';
import BuildAnAtomAccordionBox, { BuildAnAtomAccordionBoxOptions } from './BuildAnAtomAccordionBox.js';
import AtomDescriberAccessibleListNode from './description/AtomDescriberAccessibleListNode.js';
import ElectronModelControl from './ElectronModelControl.js';
import InteractiveSchematicAtom from './InteractiveSchematicAtom.js';

// constants
const CONTROLS_INSET = 10;

class BAAScreenView extends ScreenView {

  // The periodic table accordion box, made protected so that subclasses can access it for layout purposes.
  protected readonly periodicTableAccordionBox: BuildAnAtomAccordionBox;

  // The VBox that contains all accordion boxes on the right side of the screen, subclasses may add more boxes to this.
  protected readonly accordionBoxes: VBox;

  // Properties that control how the atom is displayed.
  private readonly viewProperties: AtomViewProperties;

  public constructor( model: BAAModel, tandem: Tandem, providedOptions?: ScreenViewOptions ) {

    const options = combineOptions<ScreenViewOptions>( {

      // A PhET-wide decision was made to not update custom layout bounds even if they do not match the default layout
      // bounds in ScreenView. Do not change these bounds as changes could break or disturb any phet-io instrumentation.
      // See https://github.com/phetsims/phet-io/issues/1939.
      layoutBounds: new Bounds2( 0, 0, 768, 464 ),

      tandem: tandem,
      phetioVisiblePropertyInstrumented: false
    }, providedOptions );

    super( options );

    this.viewProperties = new AtomViewProperties( { tandem: tandem.createTandem( 'viewProperties' ) } );

    // Create the model-view transform.
    const modelViewTransform = ModelViewTransform2.createSinglePointScaleInvertedYMapping(
      Vector2.ZERO,
      new Vector2( this.layoutBounds.width * 0.3, this.layoutBounds.height * 0.45 ),
      1.0
    );

    // Create the interactive atom node.
    const interactiveAtomNode = new InteractiveSchematicAtom( model, modelViewTransform, {
      atomNodeOptions: {
        atomViewProperties: this.viewProperties,
        atomDescriber: new AtomDescriberAccessibleListNode( model.atom, this.viewProperties )
      },
      tandem: tandem.createTandem( 'interactiveAtomNode' ),
      phetioFeatured: true
    } );

    // Create the particle count indicator.
    const particleCountDisplay = new ParticleCountDisplay( model.atom, {
      top: CONTROLS_INSET,
      left: CONTROLS_INSET,
      tandem: tandem.createTandem( 'particleCountDisplay' )
    } );

    const periodicTableAccessibleParagraphProperty = BuildAnAtomFluent.a11y.common
      .periodicTable.accessibleParagraphPattern.createProperty( {
        name: AtomIdentifier.createDynamicNameProperty( model.atom.protonCountProperty ),
        symbol: model.atom.protonCountProperty.derived( count => AtomIdentifier.getSpokenSymbol( count ) ),
        row: model.atom.protonCountProperty.derived( count => {
          if ( count === 0 ) { return ''; } // Returning empty when no protons. The pattern 'noSymbol' will prevent this to be used
          const coordinates = PeriodicTableNode.protonCountToCoordinates( count );
          return coordinates.y + 1;
        } ),
        column: model.atom.protonCountProperty.derived( count => {
          if ( count === 0 ) { return ''; } // Returning empty when no protons. The pattern 'noSymbol' will prevent this to be used
          const coordinates = PeriodicTableNode.protonCountToCoordinates( count );
          return coordinates.x + 1;
        } ),
        pattern: new DerivedProperty(
          [ model.atom.protonCountProperty, this.viewProperties.elementNameVisibleProperty ],
          ( protonCount: number, elementNameVisible: boolean ) => {
            return protonCount === 0 ? 'noSymbol' :
              ( elementNameVisible ? 'withName' : 'withoutName' );
          } )
      } );

    // Add the periodic table display.
    const periodicTableAndSymbol = new PeriodicTableAndSymbol( model.atom.protonCountProperty, {
      pickable: false,
      scale: 0.55, // Scale empirically determined to match layout in design doc.
      accessibleParagraph: periodicTableAccessibleParagraphProperty
    } );
    this.periodicTableAccordionBox = new BuildAnAtomAccordionBox(
      periodicTableAndSymbol,
      combineOptions<BuildAnAtomAccordionBoxOptions>( {}, {
        titleNode: new Text( BuildAnAtomFluent.periodicTableStringProperty, {
          font: ShredConstants.ACCORDION_BOX_TITLE_FONT,
          maxWidth: ShredConstants.ACCORDION_BOX_TITLE_MAX_WIDTH
        } ),
        expandedDefaultValue: true,

        // phet-io
        tandem: tandem.createTandem( 'periodicTableAccordionBox' ),
        phetioFeatured: true,

        accessibleName: BuildAnAtomFluent.a11y.common.periodicTable.accessibleNameStringProperty
      }, BAAConstants.ACCORDION_BOX_OPTIONS )
    );

    this.accordionBoxes = new VBox( {
      children: [ this.periodicTableAccordionBox ],
      spacing: 7,
      top: CONTROLS_INSET,
      right: this.layoutBounds.maxX - CONTROLS_INSET
    } );
    this.periodicTableAccordionBox.addLinkedElement( model.atom.elementNameStringProperty );

    // Add the checkbox group that controls the atom appearance options.
    const checkboxGroup = new AtomAppearanceCheckboxGroup( model.atom, this.viewProperties, {
      left: this.accordionBoxes.left,
      bottom: this.layoutBounds.height - 2 * CONTROLS_INSET,
      tandem: tandem.createTandem( 'checkboxGroup' )
    } );

    // Link the property that controls whether nuclear instability is depicted by the atom to the model element that
    // controls whether the related animation is enabled.
    this.viewProperties.nuclearStabilityVisibleProperty.link( nuclearStabilityVisible => {
      model.animateNuclearInstabilityProperty.value = nuclearStabilityVisible;
    } );

    // Add the selector panel that controls the electron representation in the atom.
    const electronModelControl = new ElectronModelControl( this.viewProperties.electronModelProperty, {

      // position empirically determined to match design doc
      left: interactiveAtomNode.centerX + 149,
      top: interactiveAtomNode.centerY + 62,

      tandem: tandem.createTandem( 'electronModelControl' ),
      phetioFeatured: true,
      visiblePropertyOptions: {
        phetioFeatured: true
      }
    } );

    // Add the reset button.
    const resetAllButton = new ResetAllButton( {
      listener: () => {
        model.reset();
        this.reset();
      },
      right: this.layoutBounds.maxX - CONTROLS_INSET,
      bottom: this.layoutBounds.maxY - CONTROLS_INSET,
      radius: BAAConstants.RESET_BUTTON_RADIUS,
      tandem: tandem.createTandem( 'resetAllButton' )
    } );

    // Add the top level children in the desired z-order.
    this.addChild( electronModelControl );
    this.addChild( checkboxGroup );
    this.addChild( particleCountDisplay );
    this.addChild( this.accordionBoxes );
    this.addChild( interactiveAtomNode );
    this.addChild( resetAllButton );

    // pdom - set navigation order for the Atom screen view
    this.pdomPlayAreaNode.pdomOrder = [
      particleCountDisplay,
      interactiveAtomNode,
      this.accordionBoxes
    ];

    this.pdomControlAreaNode.pdomOrder = [
      checkboxGroup,
      electronModelControl,
      resetAllButton
    ];
  }

  public reset(): void {
    this.periodicTableAccordionBox.expandedProperty.reset();
    this.viewProperties.reset();
  }
}

buildAnAtom.register( 'BAAScreenView', BAAScreenView );
export default BAAScreenView;