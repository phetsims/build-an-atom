// Copyright 2013-2025, University of Colorado Boulder

/**
 * ScreenView that presents an interactive atom on the left side, buckets of particles underneath, and controls for
 * label visibility and reset.  A periodic table is included on the right side.  This is intended to be used as a base
 * class for screens with similar views.
 *
 * @author John Blanco
 * @author Aadish Gupta
 */

import DerivedStringProperty from '../../../../axon/js/DerivedStringProperty.js';
import Multilink from '../../../../axon/js/Multilink.js';
import Bounds2 from '../../../../dot/js/Bounds2.js';
import { equalsEpsilon } from '../../../../dot/js/util/equalsEpsilon.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import ScreenView, { ScreenViewOptions } from '../../../../joist/js/ScreenView.js';
import Shape from '../../../../kite/js/Shape.js';
import affirm from '../../../../perennial-alias/js/browser-and-node/affirm.js';
import { combineOptions } from '../../../../phet-core/js/optionize.js';
import { ParticleContainer } from '../../../../phetcommon/js/model/ParticleContainer.js';
import StringUtils from '../../../../phetcommon/js/util/StringUtils.js';
import ModelViewTransform2 from '../../../../phetcommon/js/view/ModelViewTransform2.js';
import BucketFront from '../../../../scenery-phet/js/bucket/BucketFront.js';
import BucketHole from '../../../../scenery-phet/js/bucket/BucketHole.js';
import ResetAllButton from '../../../../scenery-phet/js/buttons/ResetAllButton.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import VBox from '../../../../scenery/js/layout/nodes/VBox.js';
import KeyboardListener from '../../../../scenery/js/listeners/KeyboardListener.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import Text from '../../../../scenery/js/nodes/Text.js';
import AtomIdentifier from '../../../../shred/js/AtomIdentifier.js';
import Particle from '../../../../shred/js/model/Particle.js';
import ShredConstants from '../../../../shred/js/ShredConstants.js';
import AtomNode from '../../../../shred/js/view/AtomNode.js';
import BucketDragListener from '../../../../shred/js/view/BucketDragListener.js';
import ParticleCountDisplay from '../../../../shred/js/view/ParticleCountDisplay.js';
import ParticleView from '../../../../shred/js/view/ParticleView.js';
import VerticalCheckboxGroup, { VerticalCheckboxGroupItem } from '../../../../sun/js/VerticalCheckboxGroup.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import PeriodicTableAndSymbol from '../../atom/view/PeriodicTableAndSymbol.js';
import buildAnAtom from '../../buildAnAtom.js';
import BuildAnAtomFluent from '../../BuildAnAtomFluent.js';
import BuildAnAtomStrings from '../../BuildAnAtomStrings.js';
import BAAConstants from '../BAAConstants.js';
import BAAModel from '../model/BAAModel.js';
import AtomViewProperties from './AtomViewProperties.js';
import BAAParticleView from './BAAParticleView.js';
import BuildAnAtomAccordionBox, { BuildAnAtomAccordionBoxOptions } from './BuildAnAtomAccordionBox.js';
import AtomViewDescriber from './description/AtomViewDescriber.js';
import ElectronModelControl from './ElectronModelControl.js';

type FocusUpdateDirection = 'forward' | 'backward';

// constants
const CONTROLS_INSET = 10;
const LABEL_CONTROL_FONT = new PhetFont( 12 );
const LABEL_CONTROL_MAX_WIDTH = 180;
const DISTANCE_TESTING_TOLERANCE = 1e-6;

class BAAScreenView extends ScreenView {

  protected readonly periodicTableAccordionBox: BuildAnAtomAccordionBox;
  protected readonly accordionBoxes: VBox;

  // The model that this view is based on.
  private readonly model: BAAModel;

  // Properties that control how the atom is displayed.
  private readonly viewProperties: AtomViewProperties;

  // A map that associates particles with their views for quick lookup.
  private readonly mapParticlesToViews: Map<Particle, ParticleView> = new Map<Particle, ParticleView>();

  // A map that associates buckets with the bucket front views for quick lookup.
  private readonly mapBucketsToViews: Map<ParticleContainer<Particle>, BucketFront> =
    new Map<ParticleContainer<Particle>, BucketFront>();

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

    this.model = model;
    this.viewProperties = new AtomViewProperties( tandem.createTandem( 'viewProperties' ) );

    // Create the model-view transform.
    const modelViewTransform = ModelViewTransform2.createSinglePointScaleInvertedYMapping(
      Vector2.ZERO,
      new Vector2( this.layoutBounds.width * 0.3, this.layoutBounds.height * 0.45 ),
      1.0
    );

    // Add the node that shows the textual labels, the electron shells, and the center X marker.
    const atomNode = new AtomNode( model.atom, modelViewTransform, {
      showElementNameProperty: this.viewProperties.elementNameVisibleProperty,
      showNeutralOrIonProperty: this.viewProperties.neutralAtomOrIonVisibleProperty,
      showStableOrUnstableProperty: this.viewProperties.nuclearStabilityVisibleProperty,
      electronShellDepictionProperty: this.viewProperties.electronModelProperty,
      tandem: tandem.createTandem( 'atomNode' ),
      phetioVisiblePropertyInstrumented: false,
      phetioFeatured: true
    } );

    // Add the particle count indicator.
    const particleCountDisplay = new ParticleCountDisplay( model.atom, {
      top: CONTROLS_INSET,
      left: CONTROLS_INSET,
      tandem: tandem.createTandem( 'particleCountDisplay' )
    } );

    // Create the layer where the nucleons and electrons will go.
    const particleLayer = new Node();

    // Define group tandems for the particles.
    const protonsGroupTandem = tandem.createTandem( 'protonNodes' ).createGroupTandem( 'protonNode', 1 );
    const neutronsGroupTandem = tandem.createTandem( 'neutronNodes' ).createGroupTandem( 'neutronNode', 1 );
    const electronsGroupTandem = tandem.createTandem( 'electronNodes' ).createGroupTandem( 'electronNode', 1 );

    // The particles should not be draggable outside the layout bounds of this screen view.
    const particleDragBounds = modelViewTransform.viewToModelBounds( this.layoutBounds );

    // Define some offsets that will be used to position the particles in various locations needed by alt-input.
    // These are in model coordinates.
    const belowNucleusOffset = new Vector2( 0, -40 );
    const innerShellOffset = new Vector2( 0, -model.atom.innerElectronShellRadius );
    const outerShellOffset = new Vector2( 0, -model.atom.outerElectronShellRadius );
    const outsideAtomOffset = new Vector2( -65, -155 );
    const altInputAtomOffsetsForShellMode: Vector2[] = [
      belowNucleusOffset,
      innerShellOffset,
      outerShellOffset,
      outsideAtomOffset
    ];
    const altInputAtomOffsetsForCloudMode: Vector2[] = [
      belowNucleusOffset,
      outsideAtomOffset
    ];

    // Add the particle views.
    [ ...model.nucleons, ...model.electrons ].forEach( particle => {

      const particleView = new BAAParticleView( particle, modelViewTransform, {
        dragBounds: particleDragBounds,
        focusable: false,
        tandem: particle.type === 'proton' ?
                protonsGroupTandem.createNextTandem() :
                particle.type === 'neutron' ?
                neutronsGroupTandem.createNextTandem() :
                electronsGroupTandem.createNextTandem()
      } );

      particleLayer.addChild( particleView );
      this.mapParticlesToViews.set( particle, particleView );

      // type safe reference to buckets
      const bucketsAsParticleContainers: ParticleContainer<Particle>[] = model.buckets;

      // The particle view will either be a child of this screen view or a child of the atom node, based on its state.
      // The following listener moves it back and forth as needed.  It's necessary to change parent nodes like this to
      // support alt-input group behavior in the atom node.
      Multilink.multilink(
        [ particle.containerProperty, particle.isDraggingProperty ],
        ( container, isDragging ) => {

          const isParticleNodeChildOfScreenView = particleView.parent === particleLayer;

          if ( isParticleNodeChildOfScreenView && ( container === model.atom || isDragging ) ) {

            // Move the particle view to the atom node, preserving focus if needed.
            const hasFocus = particleView.focused;
            particleLayer.removeChild( particleView );
            atomNode.addParticleView( particleView, hasFocus );
          }
          else if ( !isParticleNodeChildOfScreenView &&
                    ( ( container !== null && bucketsAsParticleContainers.includes( container ) ) ||
                      ( container === null && !isDragging ) ) ) {

            // Move the particle view to this screen view.
            atomNode.removeParticleView( particleView );
            particleLayer.addChild( particleView );
          }
        }
      );

      // This flag is set at the beginning of the process through which alt-input removes a particle from the atom and
      // cleared (set to false) once the particle is fully removed.  This is used to prevent the blur listener from
      // setting isDragging to false during the removal process.  The blur event ends up being triggered during the
      // removal process because the particle changes layers, which causes it to lose focus.
      let isParticleBeingRemovedFromAtomViaAltInput = false;

      // Create a listener that will handle alt-input keyboard commands for the particle.
      // TODO: See https://github.com/phetsims/build-an-atom/issues/356.  Flesh out the docs for this once it is fully
      //       working, assuming it is still around.
      const particleKeyboardListener = new KeyboardListener( {
        keys: [ 'space', 'enter', 'arrowRight', 'arrowLeft', 'arrowDown', 'arrowUp' ],
        fireOnDown: false,
        fire: ( event, keysPressed ) => {

          if ( particle.containerProperty.value === model.atom ) {

            // This particle is in the atom.  If the user presses space or enter, extract it from the atom and position
            // it just below the nucleus.  If the user presses an arrow key, move the focus to another particle (if
            // there is one).
            if ( keysPressed.includes( 'space' ) || keysPressed.includes( 'enter' ) ) {
              isParticleBeingRemovedFromAtomViaAltInput = true;

              // This particle is now being controlled by the user via keyboard interaction, so mark it as such.  This
              // will incite the model to remove the particle from the atom.
              particle.isDraggingProperty.value = true;

              // This particle is being extracted from the atom, so position it just below the nucleus.
              particle.setPositionAndDestination( model.atom.positionProperty.value.plus( belowNucleusOffset ) );

              isParticleBeingRemovedFromAtomViaAltInput = false;
            }
            else if ( keysPressed.includes( 'arrowRight' ) || keysPressed.includes( 'arrowDown' ) ) {
              this.updateParticleFocus( particleView, 'forward' );
            }
            else if ( keysPressed.includes( 'arrowLeft' ) || keysPressed.includes( 'arrowUp' ) ) {
              this.updateParticleFocus( particleView, 'backward' );
            }
          }
          else if ( particle.isDraggingProperty.value ) {

            // This particle is outside the atom and is being controlled by the user via keyboard interaction.  If the
            // user presses space or enter, add the particle to the atom and position it just below the nucleus.  If the
            // user presses an arrow key, move the particle to one of the other allowed positions around the atom.

            if ( keysPressed.includes( 'space' ) || keysPressed.includes( 'enter' ) ) {

              // Release the particle from the user's control and let the chips (or the particle in this case) fall
              // where they may (the model code should move it into the atom or back to a bucket).
              particle.isDraggingProperty.value = false;

              // Clearing the isDragging flag should cause the particle to go into the atom or a bucket.
              if ( particle.containerProperty.value === model.atom ) {

                // The particle has been put into the atom.  Make all other particles unfocusable so that this is the
                // only thing in the tab order for the atom.
                this.mapParticlesToViews.forEach( ( otherParticleView, otherParticle ) => {
                  if ( otherParticle !== particle ) {
                    otherParticleView.focusable = false;
                  }
                } );
              }
              else if ( particle.containerProperty.value &&
                        bucketsAsParticleContainers.includes( particle.containerProperty.value ) ) {

                // Shift the focus to the bucket where this particle now resides.
                const bucketView = this.mapBucketsToViews.get( particle.containerProperty.value );
                affirm( bucketView, 'Missing BucketFront view for bucket' );
                bucketView.focus();

                // The particle should become unfocusable since it is now in a bucket.
                particleView.focusable = false;
              }
            }
            else {

              // Figure out which position offset is currently being used for the particle's position.
              let offsetIndex = 0;
              const particleDistanceFromAtomCenter = particle.positionProperty.value.distance(
                model.atom.positionProperty.value
              );
              const altInputAtomOffsets = this.viewProperties.electronModelProperty.value === 'shells' ?
                                          altInputAtomOffsetsForShellMode :
                                          altInputAtomOffsetsForCloudMode;
              for ( const offset of altInputAtomOffsets ) {
                if ( offset.getMagnitude() === particleDistanceFromAtomCenter ) {
                  offsetIndex = altInputAtomOffsets.indexOf( offset );
                  break;
                }
              }

              if ( keysPressed.includes( 'arrowRight' ) || keysPressed.includes( 'arrowDown' ) ) {
                offsetIndex = ( offsetIndex + 1 ) % altInputAtomOffsets.length;
              }
              else if ( keysPressed.includes( 'arrowLeft' ) || keysPressed.includes( 'arrowUp' ) ) {
                offsetIndex = ( offsetIndex - 1 + altInputAtomOffsets.length ) % altInputAtomOffsets.length;
              }
              particle.setPositionAndDestination( model.atom.positionProperty.value.plus( altInputAtomOffsets[ offsetIndex ] ) );
            }
          }
        },
        blur: () => {

          // If focus leaves this particle, release it and let the chips fall where they may (the model code should
          // move it into the atom or back to a bucket).  However, DON'T do this if the particle is in the process of
          // being removed from the atom via alt-input.
          if ( !isParticleBeingRemovedFromAtomViaAltInput ) {
            particle.isDraggingProperty.value = false;
          }
        }
      } );
      particleView.addInputListener( particleKeyboardListener );

      // If a particle is removed from the atom, and that particle had focus, then we need to make sure that some
      // other particle in the atom is focusable (if there are any left).  This listener will make that happen.
      particle.containerProperty.lazyLink( ( newContainer, oldContainer ) => {
        if ( newContainer === null && oldContainer === model.atom ) {

          // Start by making a list of all the particles that are still in the atom.
          const protonViewsInAtom: ParticleView[] = [];
          const neutronViewsInAtom: ParticleView[] = [];
          const electronViewsInAtom: ParticleView[] = [];
          this.mapParticlesToViews.forEach( ( particleView, particle ) => {
            if ( particle.containerProperty.value === model.atom ) {
              if ( particle.type === 'proton' ) {
                protonViewsInAtom.push( particleView );
              }
              else if ( particle.type === 'neutron' ) {
                neutronViewsInAtom.push( particleView );
              }
              else if ( particle.type === 'electron' ) {
                electronViewsInAtom.push( particleView );
              }
            }
          } );

          // Sort each list of particles by closeness to the center of the atom.
          const distanceSortingFunction = ( a: ParticleView, b: ParticleView ): number => {
            const aDistance = a.particle.positionProperty.value.distance( model.atom.positionProperty.value );
            const bDistance = b.particle.positionProperty.value.distance( model.atom.positionProperty.value );
            return aDistance - bDistance;
          };
          protonViewsInAtom.sort( distanceSortingFunction );
          neutronViewsInAtom.sort( distanceSortingFunction );
          electronViewsInAtom.sort( distanceSortingFunction );

          // Pick the first one based on the designed precedence order: proton, neutron, electron.
          if ( protonViewsInAtom[ 0 ] ) {
            protonViewsInAtom[ 0 ].focusable = true;
          }
          else if ( neutronViewsInAtom[ 0 ] ) {
            neutronViewsInAtom[ 0 ].focusable = true;
          }
          else if ( electronViewsInAtom[ 0 ] ) {
            electronViewsInAtom[ 0 ].focusable = true;
          }
        }
      } );
    } );

    // The following code manages the visibility of the individual electron particles.  When the electrons are
    // represented as a cloud, the individual particles become invisible when added to the atom, but remain visible when
    // outside the atom.
    const updateElectronViewVisibility = () => {
      model.electrons.forEach( electron => {
        const electronView = this.mapParticlesToViews.get( electron );
        affirm( electronView, 'Missing ParticleView for electron' );
        const isElectronInAtom = model.atom.electrons.includes( electron );
        electronView.visible = this.viewProperties.electronModelProperty.value === 'shells' ||
                               electron.isDraggingProperty.value ||
                               !isElectronInAtom;
      } );
    };
    model.atom.electrons.lengthProperty.link( updateElectronViewVisibility );
    this.viewProperties.electronModelProperty.link( updateElectronViewVisibility );

    // Add the front portion of the buckets. This is done separately from the bucket holes for layering purposes.
    const bucketFrontLayer = new Node();

    const bucketsTandem = tandem.createTandem( 'buckets' );
    for ( const bucket of model.buckets ) {
      const bucketFront = new BucketFront( bucket, modelViewTransform, {
        labelNode: new Text( bucket.captionText, {
          font: new PhetFont( 20 ),
          fill: bucket.captionColor
        } ),

        // Adjust the gradient luminance a bit to improve contrast with the labels, see
        // https://github.com/phetsims/build-an-atom/issues/248.
        gradientLuminanceLeft: 0.2,
        gradientLuminanceRight: -0.6,

        // pdom
        tagName: 'button'
      } );

      // Create a focus highlight for the bucket that is extended on top so that it can include the particles.  The
      // size and position were determined empirically.
      bucketFront.setFocusHighlight(
        Shape.bounds( bucketFront.localBounds.dilatedXY( 5, 35 ).shifted( new Vector2( 0, -30 ) ) )
      );
      bucketFrontLayer.addChild( bucketFront );

      // Add the drag listener for dragging particles out of the bucket when clicking directly on it.
      bucketFront.addInputListener( new BucketDragListener( bucket, bucketFront, modelViewTransform, {
        tandem: bucketsTandem.createTandem( `${bucket.tandem.name}DragListener` ),
        applyOffset: false,

        // Offset the particle position a little if this is a touch pointer so that the finger doesn't cover it.
        offsetPosition: ( viewPoint, dragListener ) => {
          return dragListener.pointer?.isTouchLike() ?
                 BAAConstants.PARTICLE_TOUCH_DRAG_OFFSET :
                 Vector2.ZERO;
        }
      } ) );

      // Define a function that will find the view for a given particle.  Returns null if not found.
      const findParticleView = ( particle: Particle ): ParticleView | null => {
        let particleView = null;
        for ( const node of particleLayer.children ) {
          if ( node instanceof ParticleView && node.particle === particle ) {
            particleView = node;
            break;
          }
        }
        if ( !particleView ) {
          particleView = atomNode.getParticleView( particle );
        }
        return particleView;
      };

      // Add an input listener for accessibility that will be fired when the user presses enter or space while the
      // bucket has focus.  This will extract a particle from the bucket and add it to the atom.
      bucketFront.addInputListener( {
        click: () => {
          const particle = bucket.extractClosestParticle( model.atom.positionProperty.value );
          if ( particle !== null ) {

            // Get the view node that is associated with this particle.
            const particleView = findParticleView( particle );
            affirm( particleView !== null, 'ParticleView not found for extracted particle' );

            // Set the focus to the particle's view so that it can be manipulated via keyboard.
            particleView.focusable = true;
            particleView.focus();

            // Mark the particle as being controlled by the user via keyboard interaction.
            particle.isDraggingProperty.value = true;

            // Position the particle just below the center of the atom's nucleus.
            particle.setPositionAndDestination( model.atom.positionProperty.value.plus( belowNucleusOffset ) );
          }
        }
      } );

      // Keep track of the bucket front views so that we can set focus on them later when needed.
      this.mapBucketsToViews.set( bucket, bucketFront );
    }

    const periodicTableAccessibleParagraphProperty = new DerivedStringProperty(
      [
        model.atom.protonCountProperty,
        BuildAnAtomStrings.a11y.common.mathSpeakUpperStringProperty,
        BuildAnAtomStrings.a11y.atomScreen.periodicTable.accessibleParagraphHighlightedStringProperty,
        BuildAnAtomStrings.a11y.atomScreen.periodicTable.accessibleParagraphNoSymbolStringProperty
      ],
      (
        protonCount: number,
        upperString: string,
        highlightedString: string,
        noSymbolString: string
      ) => {
        if ( protonCount > 0 ) {
          const symbol = AtomIdentifier.getSymbol( protonCount );
          const mathSpeakSymbol = StringUtils.fillIn( upperString, { symbol: symbol.split( '' ).join( ' ' ) } );
          return StringUtils.fillIn( highlightedString, { symbol: mathSpeakSymbol } );
        }
        else {
          return noSymbolString;
        }
      }
    );

    // Add the periodic table display.
    const periodicTableAndSymbol = new PeriodicTableAndSymbol( model.atom.protonCountProperty, {
      pickable: false,
      scale: 0.55 // Scale empirically determined to match layout in design doc.
    } );
    this.periodicTableAccordionBox = new BuildAnAtomAccordionBox( periodicTableAndSymbol,
      combineOptions<BuildAnAtomAccordionBoxOptions>( {}, {
        titleNode: new Text( BuildAnAtomFluent.periodicTableStringProperty, {
          font: ShredConstants.ACCORDION_BOX_TITLE_FONT,
          maxWidth: ShredConstants.ACCORDION_BOX_TITLE_MAX_WIDTH
        } ),
        expandedDefaultValue: true,

        // phet-io
        tandem: tandem.createTandem( 'periodicTableAccordionBox' ),
        phetioFeatured: true,

        accessibleName: BuildAnAtomStrings.a11y.atomScreen.periodicTable.accessibleNameStringProperty,
        accessibleHelpTextExpanded: periodicTableAccessibleParagraphProperty
      }, BAAConstants.ACCORDION_BOX_OPTIONS ) );

    this.accordionBoxes = new VBox( {
      children: [ this.periodicTableAccordionBox ],
      spacing: 7
    } );
    this.periodicTableAccordionBox.addLinkedElement( model.atom.elementNameStringProperty );

    const checkboxItemTextOptions = {
      font: LABEL_CONTROL_FONT,
      maxWidth: LABEL_CONTROL_MAX_WIDTH
    };
    const checkboxItems: VerticalCheckboxGroupItem[] = [
      {
        createNode: () => new Text( BuildAnAtomFluent.elementStringProperty, checkboxItemTextOptions ),
        property: this.viewProperties.elementNameVisibleProperty,
        tandemName: 'elementNameCheckbox',
        options: {
          accessibleName: BuildAnAtomStrings.a11y.atomScreen.elementNameCheckbox.accessibleNameStringProperty,
          accessibleHelpText: BuildAnAtomStrings.a11y.atomScreen.elementNameCheckbox.accessibleHelpTextStringProperty,
          accessibleContextResponseUnchecked: BuildAnAtomStrings.a11y.atomScreen.elementNameCheckbox.accessibleContextResponseUncheckedStringProperty,

          // TODO: Should this use addAccessibleContextResponse()? https://github.com/phetsims/build-an-atom/issues/351
          accessibleContextResponseChecked: AtomViewDescriber.createElementNameContextResponse(
            model.atom.protonCountProperty,
            model.atom.elementNameStringProperty
          )
        }
      },
      {
        createNode: () => new Text( BuildAnAtomFluent.neutralSlashIonStringProperty, checkboxItemTextOptions ),
        property: this.viewProperties.neutralAtomOrIonVisibleProperty,
        tandemName: 'neutralAtomOrIonCheckbox',
        options: {
          accessibleName: BuildAnAtomStrings.a11y.atomScreen.neutralAtomIonCheckbox.accessibleNameStringProperty,
          accessibleHelpText: BuildAnAtomStrings.a11y.atomScreen.neutralAtomIonCheckbox.accessibleHelpTextStringProperty,
          accessibleContextResponseUnchecked: BuildAnAtomStrings.a11y.atomScreen.neutralAtomIonCheckbox.accessibleContextResponseUncheckedStringProperty,

          // TODO: Should this use addAccessibleContextResponse()? https://github.com/phetsims/build-an-atom/issues/351
          accessibleContextResponseChecked: AtomViewDescriber.createNeutralOrIonContextResponse(
            model.atom.protonCountProperty,
            model.atom.chargeProperty
          )
        }
      },
      {
        createNode: () => new Text( BuildAnAtomFluent.stableSlashUnstableStringProperty, checkboxItemTextOptions ),
        property: this.viewProperties.nuclearStabilityVisibleProperty,
        tandemName: 'nuclearStabilityCheckbox',
        options: {
          accessibleName: BuildAnAtomStrings.a11y.atomScreen.nuclearStabilityCheckbox.accessibleNameStringProperty,
          accessibleHelpText: BuildAnAtomStrings.a11y.atomScreen.nuclearStabilityCheckbox.accessibleHelpTextStringProperty,
          accessibleContextResponseUnchecked: BuildAnAtomStrings.a11y.atomScreen.nuclearStabilityCheckbox.accessibleContextResponseUncheckedStringProperty,

          // TODO: Should this use addAccessibleContextResponse()? https://github.com/phetsims/build-an-atom/issues/351
          accessibleContextResponseChecked: AtomViewDescriber.createStabilityContextResponse(
            model.atom.protonCountProperty,
            model.atom.nucleusStableProperty
          )
        }
      }
    ];

    const checkboxGroup = new VerticalCheckboxGroup( checkboxItems, {
      checkboxOptions: { boxWidth: 12 },
      spacing: 8,
      tandem: tandem.createTandem( 'checkboxGroup' ),
      phetioFeatured: true,
      visiblePropertyOptions: {
        phetioFeatured: true
      }
    } );

    // Link the property that controls whether nuclear instability is depicted by the atom to the model element that
    // controls whether the related animation is enabled.
    this.viewProperties.nuclearStabilityVisibleProperty.link( nuclearStabilityVisible => {
      model.animateNuclearInstabilityProperty.value = nuclearStabilityVisible;
    } );

    // Add the selector panel that controls the electron representation in the atom.
    const electronModelControl = new ElectronModelControl( this.viewProperties.electronModelProperty, {
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

    // Do the layout.
    this.accordionBoxes.top = CONTROLS_INSET;
    this.accordionBoxes.right = this.layoutBounds.maxX - CONTROLS_INSET;
    checkboxGroup.left = this.accordionBoxes.left;
    checkboxGroup.bottom = this.layoutBounds.height - 2 * CONTROLS_INSET;
    electronModelControl.left = atomNode.centerX + 130;
    electronModelControl.bottom = atomNode.bottom + 5;

    // Add the top level children in the desired z-order.
    this.addChild( electronModelControl );
    this.addChild( checkboxGroup );
    this.addChild( particleCountDisplay );
    this.addChild( this.accordionBoxes );
    _.each( model.buckets, bucket => {
      this.addChild( new BucketHole( bucket, modelViewTransform, {
        pickable: false
      } ) );
    } );
    this.addChild( particleLayer );
    this.addChild( bucketFrontLayer );
    this.addChild( atomNode );
    this.addChild( resetAllButton );

    // pdom - set navigation order for the Atom screen view
    this.pdomPlayAreaNode.pdomOrder = [
      bucketFrontLayer,
      atomNode,
      electronModelControl,
      this.periodicTableAccordionBox
    ];
  }

  /**
   * Update which particle has focus based on the current particle that has focus and the direction to move.  This is
   * for alt-input support.
   */
  private updateParticleFocus( currentlyFocusedParticleView: ParticleView, direction: FocusUpdateDirection ): void {

    affirm( currentlyFocusedParticleView.focused, 'The provided particle view must have focus for this to work.' );

    const focusOrder: ParticleView[] = [];

    if ( currentlyFocusedParticleView.particle.type === 'proton' ) {
      focusOrder.push( currentlyFocusedParticleView );
    }
    else {

      // Get a list of all protons in the atom sorted by closeness to the center of the atom.
      const sortedProtons = [ ...this.model.atom.protons ].sort( ( a, b ) => {
        const aDistance = a.positionProperty.value.distance( this.model.atom.positionProperty.value );
        const bDistance = b.positionProperty.value.distance( this.model.atom.positionProperty.value );
        return aDistance - bDistance;
      } );

      // Add the best proton view.
      if ( sortedProtons.length > 0 ) {
        const protonView = this.mapParticlesToViews.get( sortedProtons[ 0 ] );
        affirm( protonView, 'Missing ParticleView for proton' );
        focusOrder.push( protonView );
      }
    }

    if ( currentlyFocusedParticleView.particle.type === 'neutron' ) {
      focusOrder.push( currentlyFocusedParticleView );
    }
    else {

      // Get a list of all neutrons in the atom sorted by closeness to the center of the atom.
      const sortedNeutrons = [ ...this.model.atom.neutrons ].sort( ( a, b ) => {
        const aDistance = a.positionProperty.value.distance( this.model.atom.positionProperty.value );
        const bDistance = b.positionProperty.value.distance( this.model.atom.positionProperty.value );
        return aDistance - bDistance;
      } );

      // Add the best neutron view.
      if ( sortedNeutrons.length > 0 ) {
        const neutronView = this.mapParticlesToViews.get( sortedNeutrons[ 0 ] );
        affirm( neutronView, 'Missing ParticleView for neutron' );
        focusOrder.push( neutronView );
      }
    }

    // Determine the electron shell that this particle is in.  If it's not an electron, set the shell to -1.  The
    // inner shell is 0 and the numbers go up from there.
    let electronShell = -1;
    if ( currentlyFocusedParticleView.particle.type === 'electron' ) {
      const distanceFromAtomCenter =
        currentlyFocusedParticleView.particle.positionProperty.value.distance( this.model.atom.positionProperty.value );
      electronShell = equalsEpsilon(
        distanceFromAtomCenter,
        this.model.atom.innerElectronShellRadius,
        DISTANCE_TESTING_TOLERANCE
      ) ? 0 : 1;
    }

    if ( electronShell === 0 ) {
      focusOrder.push( currentlyFocusedParticleView );
    }
    else {
      const electronsInInnerShell = [ ...this.model.atom.electrons ].filter( electron => {
        const electronPosition = electron.positionProperty.value;
        const distanceFromAtomCenter = electronPosition.distance( this.model.atom.positionProperty.value );
        return equalsEpsilon(
          distanceFromAtomCenter,
          this.model.atom.innerElectronShellRadius,
          DISTANCE_TESTING_TOLERANCE
        );
      } );
      if ( electronsInInnerShell.length > 0 ) {
        const innerShellElectron = this.mapParticlesToViews.get( electronsInInnerShell[ 0 ] );
        affirm( innerShellElectron, 'Missing ParticleView for electron in inner shell' );
        focusOrder.push( innerShellElectron );
      }
    }

    if ( electronShell === 1 ) {
      focusOrder.push( currentlyFocusedParticleView );
    }
    else {
      const electronsInOuterShell = [ ...this.model.atom.electrons ].filter( electron => {
        const electronPosition = electron.positionProperty.value;
        const distanceFromAtomCenter = electronPosition.distance( this.model.atom.positionProperty.value );
        return equalsEpsilon(
          distanceFromAtomCenter,
          this.model.atom.outerElectronShellRadius,
          DISTANCE_TESTING_TOLERANCE
        );
      } );
      if ( electronsInOuterShell.length > 0 ) {
        const outerShellElectron = this.mapParticlesToViews.get( electronsInOuterShell[ 0 ] );
        affirm( outerShellElectron, 'Missing ParticleView for electron in outer shell' );
        focusOrder.push( outerShellElectron );
      }
    }

    // If there is something availing in the atom to shift focus to, do so.
    if ( focusOrder.length > 1 ) {
      const currentIndex = focusOrder.indexOf( currentlyFocusedParticleView );
      let newIndex;
      if ( direction === 'forward' ) {
        newIndex = ( currentIndex + 1 ) % focusOrder.length;
      }
      else {
        newIndex = ( currentIndex - 1 + focusOrder.length ) % focusOrder.length;
      }
      focusOrder[ newIndex ].focusable = true;
      focusOrder[ newIndex ].focus();
      focusOrder[ currentIndex ].focusable = false;
    }
  }

  public reset(): void {
    this.periodicTableAccordionBox.expandedProperty.reset();
    this.viewProperties.reset();
  }
}

buildAnAtom.register( 'BAAScreenView', BAAScreenView );
export default BAAScreenView;