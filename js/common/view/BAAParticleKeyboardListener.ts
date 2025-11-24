// Copyright 2025, University of Colorado Boulder

/**
 * BAAParticleKeyboardListener is a specialization of scenery's KeyboardListener that handles keystrokes far alt-input
 * that occur when the user is focused on a particle.
 *
 * @author John Blanco (PhET Interactive Simulations)
 */

import { TReadOnlyProperty } from '../../../../axon/js/TReadOnlyProperty.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import affirm from '../../../../perennial-alias/js/browser-and-node/affirm.js';
import SphereBucket from '../../../../phetcommon/js/model/SphereBucket.js';
import { OneKeyStroke } from '../../../../scenery/js/input/KeyDescriptor.js';
import KeyboardListener from '../../../../scenery/js/listeners/KeyboardListener.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import ParticleAtom from '../../../../shred/js/model/ParticleAtom.js';
import ShredStrings from '../../../../shred/js/ShredStrings.js';
import ElectronCloudView from '../../../../shred/js/view/ElectronCloudView.js';
import ElectronShellDepiction from '../../../../shred/js/view/ElectronShellDepiction.js';
import ParticleView from '../../../../shred/js/view/ParticleView.js';
import sharedSoundPlayers from '../../../../tambo/js/sharedSoundPlayers.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import buildAnAtom from '../../buildAnAtom.js';
import BAAParticle from '../model/BAAParticle.js';

type FocusUpdateDirection = 'forward' | 'backward';

type ParticleLocationInformation = {
  offset: Vector2;
  responseProperty: TReadOnlyProperty<string>;
};

const NAVIGATION_KEYS: OneKeyStroke[] = [ 'arrowRight', 'arrowLeft', 'arrowDown', 'arrowUp', 'w', 'a', 's', 'd' ];

class BAAParticleKeyboardListener extends KeyboardListener<OneKeyStroke[]> {

  /**
   * Constructor for the BAAParticleKeyboardListener.
   * @param particle - the model Particle that this listener is associated with
   * @param homeBucket - the homeBucket model element that the particle may be placed into or removed from
   * @param atom - the atom model that the particle may be placed into or removed from
   * @param electronModelProperty - the Property that indicates how electrons are being depicted, either as particles
   *                                in shells or as a cloud
   * @param particleView - the view representation of the particle that this listener is associated with
   * @param homeBucketFront - the BucketFront that is the "home" for this particle
   * @param electronCloudNode - the ElectronCloudView associated with the atom
   * @param shiftFocus - a function that will be called to shift focus from the provided particle to another one in the
   *                     atom
   * @param tandem
   */
  public constructor(
    particle: BAAParticle,
    homeBucket: SphereBucket<BAAParticle>,
    atom: ParticleAtom,
    electronModelProperty: TReadOnlyProperty<ElectronShellDepiction>,
    particleView: ParticleView,
    homeBucketFront: Node,
    electronCloudNode: ElectronCloudView,
    shiftFocus: ( focusedNode: ParticleView | ElectronCloudView | null, direction: FocusUpdateDirection ) => void,
    tandem: Tandem
  ) {

    // Define some offsets that will be used to position the particles in various locations needed by alt-input.
    // These are in model coordinates.
    const belowNucleusOffset = new Vector2( 0, -40 );
    const innerShellOffset = new Vector2( 0, -atom.innerElectronShellRadius );
    const outerShellOffset = new Vector2( 0, -atom.outerElectronShellRadius );
    const outsideAtomOffset = new Vector2( -65, -155 );

    const altInputAtomForShellMode: ParticleLocationInformation[] = [
      { offset: belowNucleusOffset, responseProperty: ShredStrings.a11y.particles.overNucleusStringProperty },
      { offset: innerShellOffset, responseProperty: ShredStrings.a11y.particles.overInnerShellStringProperty },
      { offset: outerShellOffset, responseProperty: ShredStrings.a11y.particles.overOuterShellStringProperty },
      { offset: outsideAtomOffset, responseProperty: ShredStrings.a11y.particles.nearBucketsStringProperty }
    ];

    const altInputAtomForCloudMode: ParticleLocationInformation[] = [
      { offset: belowNucleusOffset, responseProperty: ShredStrings.a11y.particles.overAtomStringProperty },
      { offset: outsideAtomOffset, responseProperty: ShredStrings.a11y.particles.nearBucketsStringProperty }
    ];

    // for sound generation
    const grabSoundPlayer = sharedSoundPlayers.get( 'grab' );
    const releaseSoundPlayer = sharedSoundPlayers.get( 'release' );
    const deleteSoundPlayer = sharedSoundPlayers.get( 'erase' );

    const returnParticleToBucket = ( particle: BAAParticle, particleView: ParticleView ) => {

      // Move the particle immediately back the bucket from whence it came.
      particle.setPositionAndDestination( atom.positionProperty.value.plus( outsideAtomOffset ) );

      // Set the particle as not being dragged, which should cause it to fall into the bucket.
      particle.isDraggingProperty.value = false;

      // Move instantly - no animation.
      particle.moveImmediatelyToDestination();
    };

    // This variable is used to track the container where the particle came from at the start of an alt-input drag.  It
    // is only updated when the particle is extracted from a bucket or from the atom, and isn't cleared on the way in,
    // so use accordingly.
    let mostRecentContainer: SphereBucket<BAAParticle> | ParticleAtom = homeBucket;

    // This flag is set at the beginning of the process through which alt-input removes a particle from the atom, and it
    // is cleared (set to false) once the particle is fully removed.  This is used to prevent the blur listener from
    // setting isDragging to false during the removal process.  The blur event ends up being triggered during the
    // removal process because the particle changes layers, which causes it to lose focus.
    let isParticleBeingRemovedFromAtomViaAltInput = false;

    super( {
      keys: [

        // Support both space and enter for "action" keys.
        'space', 'enter',

        // Navigation keys for moving focus or moving particles, depending on state.
        ...NAVIGATION_KEYS,

        // Delete and backspace for removing the particle from the atom, escape for canceling the interaction.
        'delete', 'backspace', 'escape'
      ],
      fireOnDown: false,
      fire: ( event, keysPressed ) => {

        if ( particle.containerProperty.value === atom ) {

          // This particle is in the atom.  If the user presses space or enter, extract it from the atom and position
          // it just below the nucleus.
          if ( keysPressed === 'space' || keysPressed === 'enter' ) {
            isParticleBeingRemovedFromAtomViaAltInput = true;

            // This particle is now being controlled by the user via keyboard interaction, so mark it as such.  This
            // will incite the model to remove the particle from the atom.
            particle.isDraggingProperty.value = true;

            // Play sound that signifies grab of particle.
            grabSoundPlayer.play();

            // This particle is being extracted from the atom, so position it just below the nucleus.
            particle.setPositionAndDestination( atom.positionProperty.value.plus( belowNucleusOffset ) );

            // Handle focus for the case where an electron is released back into the cloud.
            if ( electronModelProperty.value === 'cloud' ) {
              particleView.addAccessibleObjectResponse( ShredStrings.a11y.particles.overAtomStringProperty, { alertBehavior: 'queue' } );
            }
            else {
              particleView.addAccessibleObjectResponse( ShredStrings.a11y.particles.overNucleusStringProperty, { alertBehavior: 'queue' } );
            }

            isParticleBeingRemovedFromAtomViaAltInput = false;
          }
          else if ( keysPressed === 'arrowRight' || keysPressed === 'arrowDown' ||
                    keysPressed === 'd' || keysPressed === 's' ) {

            // Move the focus to the next item in the designed focus order.
            shiftFocus( particleView, 'forward' );
          }
          else if ( keysPressed === 'arrowLeft' || keysPressed === 'arrowUp' ||
                    keysPressed === 'a' || keysPressed === 'w' ) {

            // Move the focus to the previous item in the designed focus order.
            shiftFocus( particleView, 'backward' );
          }
        }
        else if ( particle.isDraggingProperty.value ) {

          // This particle is outside the atom and is being controlled by the user via keyboard interaction.  Handle
          // the various different key presses below.

          if ( keysPressed === 'space' || keysPressed === 'enter' ) {

            // Release the particle from the user's control and let the chips (or the particle in this case) fall
            // where they may (the model code should move it into the atom or back to a homeBucket).
            particle.isDraggingProperty.value = false;

            releaseSoundPlayer.play();

            // Verify that the particle has gone into the atom or a homeBucket.
            affirm(
              particle.containerProperty.value !== null,
              'Particle should be in the atom or a homeBucket after releasing it'
            );

            if ( particle.containerProperty.value === atom ) {

              // If the particle just added to the atom is an electron and the electron model is set to "cloud",
              // shift focus to the cloud.
              if ( particle.type === 'electron' && electronModelProperty.value === 'cloud' ) {
                electronCloudNode.focusable = true;
                electronCloudNode.focus();
                particleView.focusable = false;
              }
            }
            else if ( particle.containerProperty.value === homeBucket ) {

              // Shift the focus to the homeBucket where this particle now resides.
              homeBucketFront.focus();

              // The particle should become unfocusable since it is now in its home bucket.
              particleView.focusable = false;
              particleView.pdomVisible = false;

              // If this was the last electron in the atom and the electron model is set to "cloud", make the cloud
              // unfocusable.
              if ( particle.type &&
                   electronModelProperty.value === 'cloud' &&
                   atom.electrons.length === 0 ) {

                electronCloudNode.focusable = false;
              }
            }
          }
          else if ( NAVIGATION_KEYS.includes( keysPressed ) ) {

            // The navigation keys are used to cycle through the various position offsets around the atom.

            // Figure out which position offset is currently being used for the particle's position.
            let offsetIndex = 0;
            const particleDistanceFromAtomCenter = particle.positionProperty.value.distance(
              atom.positionProperty.value
            );
            const altInputInfoForAtom = electronModelProperty.value === 'shells' ?
                                        altInputAtomForShellMode :
                                        altInputAtomForCloudMode;

            const altInputAtomOffsets = altInputInfoForAtom.map( info => info.offset );
            const objectResponses = altInputInfoForAtom.map( info => info.responseProperty );

            for ( const offset of altInputAtomOffsets ) {
              if ( offset.getMagnitude() === particleDistanceFromAtomCenter ) {
                offsetIndex = altInputAtomOffsets.indexOf( offset );
                break;
              }
            }

            if ( keysPressed === 'arrowRight' || keysPressed === 'arrowDown' ||
                 keysPressed === 'd' || keysPressed === 's' ) {

              // Select the next position offset, wrapping if needed.
              offsetIndex = ( offsetIndex + 1 ) % altInputAtomOffsets.length;
            }
            else if ( keysPressed === 'arrowLeft' || keysPressed === 'arrowUp' ||
                      keysPressed === 'a' || keysPressed === 'w' ) {

              // Select the previous position offset, wrapping if needed.
              offsetIndex = ( offsetIndex - 1 + altInputAtomOffsets.length ) % altInputAtomOffsets.length;
            }
            particle.setPositionAndDestination(
              atom.positionProperty.value.plus( altInputAtomOffsets[ offsetIndex ] )
            );
            particleView.addAccessibleObjectResponse( objectResponses[ offsetIndex ], { alertBehavior: 'queue' } );
          }
          else if ( keysPressed === 'delete' || keysPressed === 'backspace' ) {

            returnParticleToBucket( particle, particleView );

            // Play sound for delete action.
            deleteSoundPlayer.play();

            // Update the alt-input focus.
            if ( atom.particleCountProperty.value === 0 || ( mostRecentContainer === homeBucket ) ) {

              // If the atom is now empty, or if the particle was just dragged from a bucket, move the focus to that
              // bucket.
              homeBucketFront.focus();
            }
            else {

              // Shift the focus to the next subatomic particle in the atom.
              shiftFocus( null, 'forward' );
            }
          }
          else if ( keysPressed === 'escape' ) {

            // The escape key is used to cancel the drag operation and return the particle to its origin.

            // If the variable that tracks the origin of the alt-input dragged particle is not set, something is
            // wrong with one of more of the code paths.
            if ( mostRecentContainer instanceof SphereBucket ) {
              returnParticleToBucket( particle, particleView );

              releaseSoundPlayer.play();

              homeBucketFront.focus();
            }
            else if ( mostRecentContainer === atom ) {
              particle.setPositionAndDestination( atom.positionProperty.value.plus( belowNucleusOffset ) );

              // Handle focus for the case where an electron is released back into the cloud.
              if ( particle.type === 'electron' && electronModelProperty.value === 'cloud' ) {
                electronCloudNode.focusable = true;
                electronCloudNode.focus();
              }

              if ( electronModelProperty.value === 'cloud' ) {
                particleView.addAccessibleObjectResponse( ShredStrings.a11y.particles.overAtomStringProperty, { alertBehavior: 'queue' } );
              }
              else {
                particleView.addAccessibleObjectResponse( ShredStrings.a11y.particles.overNucleusStringProperty, { alertBehavior: 'queue' } );
              }
              particle.isDraggingProperty.value = false;
              releaseSoundPlayer.play();
            }
          }
        }
      },
      blur: () => {

        // If focus leaves this particle, release it and let the chips fall where they may (the model code should
        // move the particle into the atom or back to a homeBucket).  However, DON'T do this if the particle is in the
        // process of being removed from the atom via alt-input because blur events get triggered during that process
        // due to layer changes.
        if ( particle.isDraggingProperty.value && !isParticleBeingRemovedFromAtomViaAltInput ) {
          particle.isDraggingProperty.value = false;
          releaseSoundPlayer.play();


          // When an electron is released back into the cloud during a blur event, the focus needs to be shifted from
          // the electron to the cloud.
          if ( particle.type === 'electron' && electronModelProperty.value === 'cloud' ) {
            particleView.focusable = false;
            electronCloudNode.focusable = true;
          }
        }
      },
      tandem: tandem
    } );

    // Watch the containerProperty of the particle for an indication of when the particle is extracted from the bucket
    // and update the mostRecentContainer accordingly.  This is needed to properly handle the Escape key, since we need
    // to know where the particle came from, and we can't update this in the keyboard listener because the particles
    // never get focus when they are in a bucket.
    particle.containerProperty.lazyLink( ( newContainer, oldContainer ) => {
      if ( newContainer === null && oldContainer === homeBucket ) {
        mostRecentContainer = homeBucket;
      }
      else if ( newContainer === null && oldContainer === atom ) {
        mostRecentContainer = atom;
      }
    } );
  }
}

buildAnAtom.register( 'BAAParticleKeyboardListener', BAAParticleKeyboardListener );
export default BAAParticleKeyboardListener;