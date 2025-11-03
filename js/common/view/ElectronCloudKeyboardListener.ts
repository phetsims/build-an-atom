// Copyright 2025, University of Colorado Boulder

/**
 * ElectronCloudKeyboardListener is a specialization of scenery's KeyboardListener that handles keystrokes far alt-input
 * that occur when the user is focused on the electron cloud that is sometimes used to depict the electrons in an atom.
 *
 * @author John Blanco (PhET Interactive Simulations)
 */

import Vector2 from '../../../../dot/js/Vector2.js';
import affirm from '../../../../perennial-alias/js/browser-and-node/affirm.js';
import SphereBucket from '../../../../phetcommon/js/model/SphereBucket.js';
import BucketFront from '../../../../scenery-phet/js/bucket/BucketFront.js';
import { OneKeyStroke } from '../../../../scenery/js/input/KeyDescriptor.js';
import KeyboardListener from '../../../../scenery/js/listeners/KeyboardListener.js';
import Particle from '../../../../shred/js/model/Particle.js';
import ParticleAtom from '../../../../shred/js/model/ParticleAtom.js';
import AtomNode from '../../../../shred/js/view/AtomNode.js';
import ElectronCloudView from '../../../../shred/js/view/ElectronCloudView.js';
import ParticleView from '../../../../shred/js/view/ParticleView.js';
import sharedSoundPlayers from '../../../../tambo/js/sharedSoundPlayers.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import buildAnAtom from '../../buildAnAtom.js';

const NAVIGATION_KEYS: OneKeyStroke[] = [ 'arrowRight', 'arrowLeft', 'arrowDown', 'arrowUp', 'w', 'a', 's', 'd' ];

class ElectronCloudKeyboardListener extends KeyboardListener<OneKeyStroke[]> {

  /**
   * Constructor for ElectronCloudKeyboardListener.
   * @param atom - the model of the atom that contains the electron cloud and other particles
   * @param atomNode - the view of the atom that contains the electron cloud and other particles
   * @param electronBucket - the model of the bucket that contains electrons that can be added to the atom
   * @param electronBucketNode - the view of the bucket that contains electrons that can be added to the atom
   * @param mapElectronsToViews - a mapping from electron particles to their corresponding views
   * @param belowNucleusOffset - the offset to a position just below the nucleus where electrons will be placed when
   *                             they are poised to go into the atom
   * @param updateAtomParticleFocus - a function that will update the alt-input focus to a particle in the atom
   * @param tandem
   */
  public constructor(
    atom: ParticleAtom,
    atomNode: AtomNode,
    electronBucket: SphereBucket<Particle>,
    electronBucketNode: BucketFront,
    mapElectronsToViews: Map<Particle, ParticleView>,
    belowNucleusOffset: Vector2,
    updateAtomParticleFocus: (
      currentlyFocusedNode: ParticleView | ElectronCloudView | null,
      direction: 'forward' | 'backward'
    ) => void,
    tandem: Tandem
  ) {

    // Get the needed shared sound generators.
    const grabSoundPlayer = sharedSoundPlayers.get( 'grab' );

    super( {
      keys: [ 'space', 'enter', ...NAVIGATION_KEYS ],
      fireOnDown: false,
      fire: ( event, keysPressed ) => {

        if ( keysPressed === 'space' || keysPressed === 'enter' ) {

          // Get a reference to the electron most recently added to the atom.
          const electron = atom.electrons[ atom.electrons.length - 1 ];
          affirm( electron, 'It should not be possible to get key presses here with no electrons in the atom.' );

          // Set the alt-input focus to this electron *before* we set it to dragging.  This is done because it makes
          // this extracted particle behave more like the normal drag cases, both for pointer and alt-input
          // interactions, so the listeners that handle those interactions will work properly.  The one weird bit about
          // this is that it has to make the electron visible to work, and the visibility is normally handled elsewhere.
          const electronView = mapElectronsToViews.get( electron );
          affirm( electronView, 'Missing ParticleView for electron' );
          electronView.visible = true;
          electronView.pdomVisible = true;
          electronView.focusable = true;
          electronView.focus();
          atomNode.electronCloud.focusable = false;

          // Set the electron as being controlled by the user via keyboard interaction.  This should cause it to be
          // removed from the atom.
          electron.isDraggingProperty.value = true;

          // Move the electron to just below the nucleus.
          electron.setPositionAndDestination( atom.positionProperty.value.plus( belowNucleusOffset ) );

          // Play the grab sound.
          grabSoundPlayer.play();
        }
        else if ( keysPressed === 'arrowRight' || keysPressed === 'arrowDown' ||
                  keysPressed === 'w' || keysPressed === 's' ) {
          updateAtomParticleFocus( atomNode.electronCloud, 'forward' );
        }
        else if ( keysPressed === 'arrowLeft' || keysPressed === 'arrowUp' ||
                  keysPressed === 'a' || keysPressed === 'd' ) {
          updateAtomParticleFocus( atomNode.electronCloud, 'backward' );
        }
      },
      tandem: tandem.createTandem( 'electronCloudKeyboardListener' )
    } );
  }
}

buildAnAtom.register( 'ElectronCloudKeyboardListener', ElectronCloudKeyboardListener );
export default ElectronCloudKeyboardListener;