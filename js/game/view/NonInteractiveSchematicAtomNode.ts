// Copyright 2013-2025, University of Colorado Boulder

/**
 * A non-interactive representation of an atom where the individual subatomic particles are visible.
 *
 * @author John Blanco
 */

import Multilink from '../../../../axon/js/Multilink.js';
import affirm from '../../../../perennial-alias/js/browser-and-node/affirm.js';
import ModelViewTransform2 from '../../../../phetcommon/js/view/ModelViewTransform2.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import { TNumberAtom } from '../../../../shred/js/model/NumberAtom.js';
import Particle from '../../../../shred/js/model/Particle.js';
import ParticleAtom from '../../../../shred/js/model/ParticleAtom.js';
import AtomNode from '../../../../shred/js/view/AtomNode.js';
import { ReducedAtomViewProperties } from '../../../../shred/js/view/AtomViewProperties.js';
import ParticleView from '../../../../shred/js/view/ParticleView.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import buildAnAtom from '../../buildAnAtom.js';
import { BAAParticleType } from '../../common/model/BAAParticle.js';

class NonInteractiveSchematicAtomNode extends Node {

  public constructor( numberAtom: TNumberAtom, modelViewTransform: ModelViewTransform2, tandem: Tandem ) {

    super( {
      pickable: false,
      focusable: false,
      tandem: tandem
    } );

    // Create the ParticleAtom, which is a local model that contains the particles.
    const particleAtom = new ParticleAtom( { tandem: Tandem.OPT_OUT } );

    // Map to keep track of which ParticleView corresponds to which Particle.
    const mapParticlesToViews = new Map<Particle, ParticleView>();

    // Add the atom node.
    const atomNode = new AtomNode( particleAtom, mapParticlesToViews, modelViewTransform, {
      atomViewProperties: new ReducedAtomViewProperties(),
      tandem: Tandem.OPT_OUT,
      excludeInvisibleChildrenFromBounds: true,
      particlesPDOMVisible: false,
      focusable: false
    } );
    this.addChild( atomNode );

    const adjustParticleCount = ( particleType: BAAParticleType, targetCount: number ) => {
      const existingParticleViews = [ ...mapParticlesToViews.values() ].filter( pv => pv.particle.type === particleType );
      const existingCount = existingParticleViews.length;

      if ( targetCount > existingCount ) {

        // Add new particles.
        _.times( targetCount - existingCount, () => {
          const particle = new Particle( particleType, { tandem: Tandem.OPT_OUT } );
          particleAtom.addParticle( particle );
          const particleView = new ParticleView( particle, modelViewTransform, {
            tandem: Tandem.OPT_OUT,
            focusable: false,
            pdomVisible: false,
            focusHighlight: 'invisible'
          } );
          mapParticlesToViews.set( particle, particleView );
          atomNode.addParticleView( particleView );
        } );
      }
      else if ( targetCount < existingCount ) {

        // Remove excess particles.
        _.times( existingCount - targetCount, () => {
          const particleViewToRemove = existingParticleViews.pop();
          affirm( particleViewToRemove, 'There should be a particle view to remove, why isn\'t there?' );
          let particleToRemove: Particle | null = null;
          for ( const [ particle, particleView ] of mapParticlesToViews.entries() ) {
            if ( particleView === particleViewToRemove ) {
              particleToRemove = particle;
              break;
            }
          }
          affirm( particleToRemove, 'There should be a particle to remove, why isn\'t there?' );
          atomNode.removeParticleView( particleViewToRemove );
          particleAtom.removeParticle( particleToRemove );
          mapParticlesToViews.delete( particleToRemove );
        } );
      }
    };

    // Listen to changes in the number atom's proton, neutron, and electron counts and add/remove particles as needed.
    Multilink.multilink(
      [
        numberAtom.protonCountProperty,
        numberAtom.neutronCountProperty,
        numberAtom.electronCountProperty
      ],
      ( protonCount, neutronCount, electronCount ) => {
        adjustParticleCount( 'proton', protonCount );
        adjustParticleCount( 'neutron', neutronCount );
        adjustParticleCount( 'electron', electronCount );
        particleAtom.moveAllParticlesToDestination();
      }
    );
  }
}

buildAnAtom.register( 'NonInteractiveSchematicAtomNode', NonInteractiveSchematicAtomNode );

export default NonInteractiveSchematicAtomNode;