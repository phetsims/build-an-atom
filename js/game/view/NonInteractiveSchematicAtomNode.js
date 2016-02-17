// Copyright 2013-2015, University of Colorado Boulder

/**
 * A non-interactive representation of an atom where the individual sub-atomic
 * particles are visible.
 *
 * @author John Blanco
 */
define( function( require ) {
  'use strict';

  // modules
  var AtomNode = require( 'SHRED/view/AtomNode' );
  var Node = require( 'SCENERY/nodes/Node' );
  var inherit = require( 'PHET_CORE/inherit' );
  var ParticleAtom = require( 'SHRED/model/ParticleAtom' );
  var ParticleView = require( 'SHRED/view/ParticleView' );
  var Particle = require( 'SHRED/model/Particle' );
  var Property = require( 'AXON/Property' );

  /**
   * @param numberAtom
   * @param mvt
   * @constructor
   */
  function NonInteractiveSchematicAtomNode( numberAtom, mvt, tandem ) {
    Node.call( this, { pickable: false } ); // Call super constructor.

    // Add the electron shells.
    var particleAtom = new ParticleAtom();
    this.addChild( new AtomNode( particleAtom, mvt, {
      showElementNameProperty: new Property( false ),
      showNeutralOrIonProperty: new Property( false ),
      showStableOrUnstableProperty: new Property( false )
    } ) );

    // Layer where the particles go.
    var particleLayer = new Node();
    this.addChild( particleLayer );

    // Utility function to create and add particles.
    var particleGroupTandem = tandem.createGroupTandem( 'particle' );
    var createAndAddParticles = function( particleType, number ) {
      _.times( number, function() {
        var particle = new Particle( particleType );
        particleAtom.addParticle( particle );
        particleLayer.addChild( new ParticleView( particle, mvt, particleGroupTandem.createNextTandem() ) );
      } );
    };

    // Create and add the individual particles.
    createAndAddParticles( 'proton', numberAtom.protonCount );
    createAndAddParticles( 'neutron', numberAtom.neutronCount );
    createAndAddParticles( 'electron', numberAtom.electronCount );
    particleAtom.moveAllParticlesToDestination();

    // Layer the particle views so that the nucleus looks good, with the
    // particles closer to the center being higher in the z-order.
    var particleViewsInNucleus = _.filter( particleLayer.children, function( particleView ) {
      return particleView.particle.destination.distance( particleAtom.position ) < particleAtom.innerElectronShellRadius;
    } );

    if ( particleViewsInNucleus.length > 3 ) {
      particleViewsInNucleus = _.sortBy( particleViewsInNucleus, function( particleView ) {
        // Central nucleons should be in front
        return -particleView.particle.destination.distance( particleAtom.position );
      } );
      particleViewsInNucleus.forEach( function( particleView ) {
        particleLayer.removeChild( particleView );
        particleLayer.addChild( particleView );
      } );
    }
  }

  // Inherit from Node.
  return inherit( Node, NonInteractiveSchematicAtomNode );
} );
