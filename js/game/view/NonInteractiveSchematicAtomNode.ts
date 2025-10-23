// Copyright 2013-2025, University of Colorado Boulder

/**
 * A non-interactive representation of an atom where the individual subatomic particles are visible.
 *
 * @author John Blanco
 */

import Multilink from '../../../../axon/js/Multilink.js';
import Property from '../../../../axon/js/Property.js';
import ModelViewTransform2 from '../../../../phetcommon/js/view/ModelViewTransform2.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import { TNumberAtom } from '../../../../shred/js/model/NumberAtom.js';
import Particle from '../../../../shred/js/model/Particle.js';
import ParticleAtom from '../../../../shred/js/model/ParticleAtom.js';
import AtomNode from '../../../../shred/js/view/AtomNode.js';
import ParticleView from '../../../../shred/js/view/ParticleView.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import buildAnAtom from '../../buildAnAtom.js';
import { BAAParticleType } from '../../common/model/BAAModel.js';

class NonInteractiveSchematicAtomNode extends Node {

  public constructor( numberAtom: TNumberAtom, modelViewTransform: ModelViewTransform2, tandem: Tandem ) {

    super( {
      pickable: false,
      tandem: tandem
    } );

    // Create the ParticleAtom, which is a local model that contains the particles.
    const particleAtom = new ParticleAtom( { tandem: Tandem.OPT_OUT } );

    // Add the atom node, which in this node basically just adds the electron shells.
    const atomNode = new AtomNode( particleAtom, modelViewTransform, {
      showElementNameProperty: new Property( false ),
      showNeutralOrIonProperty: new Property( false ),
      showStableOrUnstableProperty: new Property( false ),
      tandem: Tandem.OPT_OUT,
      excludeInvisibleChildrenFromBounds: true
    } );
    this.addChild( atomNode );

    // Create the layers where the particle views will go.
    const particleLayer = new Node();
    this.addChild( particleLayer );

    let particleViews: ParticleView[] = [];

    const adjustParticleCount = ( particleType: BAAParticleType, targetCount: number ) => {
      const existingParticleViews = particleViews.filter( pv => pv.particle.type === particleType );
      const existingCount = existingParticleViews.length;

      if ( targetCount > existingCount ) {

        // Add new particles.
        _.times( targetCount - existingCount, () => {
          const particle = new Particle( particleType, { tandem: Tandem.OPT_OUT } );
          particleAtom.addParticle( particle );
          const particleView = new ParticleView( particle, modelViewTransform, { tandem: Tandem.OPT_OUT } );
          particleLayer.addChild( particleView );
          particleViews.push( particleView );
        } );
      }
      else if ( targetCount < existingCount ) {

        // Remove excess particles.
        _.times( existingCount - targetCount, () => {
          const particleViewToRemove = existingParticleViews.pop();
          assert && assert( particleViewToRemove, 'There should be a particle view to remove, why isn\'t there?' );
          const particleToRemove = particleViewToRemove!.particle;
          assert && assert( particleViewToRemove, 'There should be a particle to remove, why isn\'t there?' );
          particleAtom.removeParticle( particleToRemove );
          particleLayer.removeChild( particleViewToRemove! );
          particleViews = particleViews.filter( pv => pv !== particleViewToRemove );
        } );
      }
    };

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

        // Layer the particle views so that the nucleus looks good, with the particles closer to the center being higher
        // in the z-order.
        if ( particleViews.length > 3 ) {
          const sortedParticleViews = _.sortBy(
            particleViews,
            particleView => -particleView.particle.destinationProperty.value.distance( particleAtom.positionProperty.value )
          );
          sortedParticleViews.forEach( particleView => {
            particleView.moveToFront();
          } );
        }
      }
    );
  }
}

buildAnAtom.register( 'NonInteractiveSchematicAtomNode', NonInteractiveSchematicAtomNode );

export default NonInteractiveSchematicAtomNode;