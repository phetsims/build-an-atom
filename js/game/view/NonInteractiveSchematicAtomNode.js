// Copyright 2013-2022, University of Colorado Boulder

/**
 * A non-interactive representation of an atom where the individual sub-atomic particles are visible.
 *
 * @author John Blanco
 */

import Property from '../../../../axon/js/Property.js';
import { Node } from '../../../../scenery/js/imports.js';
import Particle from '../../../../shred/js/model/Particle.js';
import ParticleAtom from '../../../../shred/js/model/ParticleAtom.js';
import AtomNode from '../../../../shred/js/view/AtomNode.js';
import ParticleView from '../../../../shred/js/view/ParticleView.js';
import buildAnAtom from '../../buildAnAtom.js';
import BAAGlobalPreferences from '../../common/BAAGlobalPreferences.js';
import BAAScreenView from '../../common/view/BAAScreenView.js';

class NonInteractiveSchematicAtomNode extends Node {

  /**
   * @param {NumberAtom} numberAtom
   * @param {ModelViewTransform2} modelViewTransform
   * @param {Tandem} tandem
   */
  constructor( numberAtom, modelViewTransform, tandem ) {
    super( { pickable: false } );

    // Add the electron shells.
    const particleAtom = new ParticleAtom( { tandem: tandem.createTandem( 'particleAtom' ) } );
    const atomNode = new AtomNode( particleAtom, modelViewTransform, {
      showElementNameProperty: new Property( false ),
      showNeutralOrIonProperty: new Property( false ),
      showStableOrUnstableProperty: new Property( false ),
      tandem: tandem.createTandem( 'atomNode' )
    } );
    this.addChild( atomNode );

    // Layer where the particles go.
    const particleLayer = new Node();
    this.addChild( particleLayer );

    // Utility function to create and add particles.
    const particleTandem = tandem.createTandem( 'particles' );
    const particleViewsTandem = tandem.createTandem( 'particleView' );
    const particleViews = [];
    let modelParticles = []; // (phet-io) keep track for disposal
    const createAndAddParticles = ( particleType, number ) => {
      _.times( number, index => {
        const particle = new Particle( particleType, {
          tandem: particleTandem.createTandem( `particle${index}` ),
          maxZLayer: BAAScreenView.NUM_NUCLEON_LAYERS - 1
        } );
        modelParticles.push( particle );
        particleAtom.addParticle( particle );
        const particleView = new ParticleView( particle, modelViewTransform, {
          highContrastProperty: BAAGlobalPreferences.highContrastParticlesProperty,
          tandem: particleViewsTandem.createTandem( `particleView${index}` )
        } );
        particleLayer.addChild( particleView );
        particleViews.push( particleView );
      } );
    };

    // Create and add the individual particles.
    createAndAddParticles( 'proton', numberAtom.protonCountProperty.get() );
    createAndAddParticles( 'neutron', numberAtom.neutronCountProperty.get() );
    createAndAddParticles( 'electron', numberAtom.electronCountProperty.get() );
    particleAtom.moveAllParticlesToDestination();

    // Layer the particle views so that the nucleus looks good, with the
    // particles closer to the center being higher in the z-order.
    let particleViewsInNucleus = _.filter( particleLayer.children, particleView => particleView.particle.destinationProperty.get().distance( particleAtom.positionProperty.get() ) < particleAtom.innerElectronShellRadius );

    if ( particleViewsInNucleus.length > 3 ) {
      particleViewsInNucleus = _.sortBy( particleViewsInNucleus, particleView => -particleView.particle.destinationProperty.get().distance( particleAtom.positionProperty.get() ) );
      particleViewsInNucleus.forEach( particleView => {
        particleLayer.removeChild( particleView );
        particleLayer.addChild( particleView );
      } );
    }

    // @private called by dispose
    this.disposeNonInteractiveSchematicAtomNode = () => {
      particleViews.forEach( particleView => {
        particleView.dispose();
      } );
      atomNode.dispose();
      particleAtom.dispose();
      particleLayer.children.forEach( particleView => { particleView.dispose(); } );
      particleLayer.dispose();
      modelParticles.forEach( particle => { particle.dispose(); } );
      modelParticles = [];
    };
  }

  // @public
  dispose() {
    this.disposeNonInteractiveSchematicAtomNode();
    super.dispose();
  }
}

buildAnAtom.register( 'NonInteractiveSchematicAtomNode', NonInteractiveSchematicAtomNode );

export default NonInteractiveSchematicAtomNode;