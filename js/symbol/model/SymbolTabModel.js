// Copyright 2002-2013, University of Colorado

/**
 * Model for the Symbol tab of the Build an Atom simulation.  Consists of a
 * number atom and a particle atom, where the number atom is the main access
 * point for configuring the atom, and the particle atom is kept in sync with
 * the mumber atom.
 */
define( function( require ) {

  // Imports
  var NumberAtom = require( 'symbol/model/NumberAtom' );
  var ParticleAtom = require( 'common/model/ParticleAtom' );
  var Vector2 = require( 'DOT/Vector2' );
  var Particle = require( 'common/model/Particle' );
  var SharedConstants = require( 'common/SharedConstants' );

  // Constants
  var NUM_PROTONS = 10;
  var NUM_NEUTRONS = 12;
  var NUM_ELECTRONS = 11;
  var BOTTOM_OF_STACKS_Y = -300;
  var PROTON_STACK_CENTER_BOTTOM = new Vector2( -150, BOTTOM_OF_STACKS_Y );
  var NEUTRON_STACK_CENTER_BOTTOM = new Vector2( 0, BOTTOM_OF_STACKS_Y );
  var ELECTRON_STACK_CENTER_BOTTOM = new Vector2( 150, BOTTOM_OF_STACKS_Y );

  function SymbolTabModel() {

    var thisSymbolTabModel = this;

    this.numberAtom = new NumberAtom();
    this.particleAtom = new ParticleAtom();

    this.protons = [];
    this.neutrons = [];
    this.electrons = [];

    // Function for stacking particles.
    var getStackOffset = function( index, radius ) {
      // At top of stack unless the stack is not complete.
      var x = 0;
      var y = 0;
      switch( index ) {
        case 0:
          x = -2 * radius;
          y = radius;
          break;
        case 1:
          x = 0;
          y = radius;
          break;
        case 2:
          x = 2 * radius;
          y = radius;
          break;
        case 3:
          x = -radius;
          y = 2.732 * radius;
          break;
        case 4:
          x = radius;
          y = 2.732 * radius;
          break;
        case 5:
          x = 0;
          y = 4.464 * radius;
          break;
        default:
          // Defaults to top of the stack.
          x = 0;
          y = 4.464 * radius;
          break;
      }
      return new Vector2( x, y );
    }

    // Functions for managing particle positions.
    var getNextProtonPosition = function() {
      return PROTON_STACK_CENTER_BOTTOM.plus( getStackOffset( thisSymbolTabModel.protons.length, SharedConstants.NUCLEON_RADIUS ) );
    }
    var getNextNeutronPosition = function() {
      return NEUTRON_STACK_CENTER_BOTTOM.plus( getStackOffset( thisSymbolTabModel.neutrons.length, SharedConstants.NUCLEON_RADIUS ) );
    }
    var getNextElectronPosition = function() {
      return ELECTRON_STACK_CENTER_BOTTOM.plus( getStackOffset( thisSymbolTabModel.electrons.length, SharedConstants.ELECTRON_RADIUS ) );
    }

    _.times( NUM_PROTONS, function() {
      var proton = Particle.createProton();
      proton.destination = getNextProtonPosition();
      proton.moveImmediatelyToDestination();
      thisSymbolTabModel.protons.push( proton );
    } );
    _.times( NUM_NEUTRONS, function() {
      var neutron = Particle.createNeutron();
      neutron.destination = getNextNeutronPosition();
      neutron.moveImmediatelyToDestination();
      thisSymbolTabModel.neutrons.push( neutron );
    } );
    _.times( NUM_ELECTRONS, function() {
      var electron = Particle.createElectron();
      electron.destination = getNextElectronPosition();
      electron.moveImmediatelyToDestination();
      thisSymbolTabModel.electrons.push( electron );
    } );

    // Link the numberAtom to the particleAtom.
    this.numberAtom.link( 'protonCount', function( protonCount ) {
      if ( protonCount > thisSymbolTabModel.particleAtom.protons.length ) {
        thisSymbolTabModel.particleAtom.addParticle( thisSymbolTabModel.protons.pop() );
      }
      else if ( protonCount < thisSymbolTabModel.particleAtom.protons.length ) {
        var proton = thisSymbolTabModel.particleAtom.removeParticle( "proton" );
        proton.destination = getNextProtonPosition();
        thisSymbolTabModel.protons.push( proton );
      }
    } );
    this.numberAtom.link( 'neutronCount', function( neutronCount ) {
      if ( neutronCount > thisSymbolTabModel.particleAtom.neutrons.length ) {
        thisSymbolTabModel.particleAtom.addParticle( thisSymbolTabModel.neutrons.pop() );
      }
      else if ( neutronCount < thisSymbolTabModel.particleAtom.neutrons.length ) {
        var neutron = thisSymbolTabModel.particleAtom.removeParticle( "neutron" );
        neutron.destination = getNextNeutronPosition();
        thisSymbolTabModel.neutrons.push( neutron );
      }
    } );
    this.numberAtom.link( 'electronCount', function( electronCount ) {
      if ( electronCount > thisSymbolTabModel.particleAtom.electrons.length ) {
        thisSymbolTabModel.particleAtom.addParticle( thisSymbolTabModel.electrons.pop() );
      }
      else if ( electronCount < thisSymbolTabModel.particleAtom.electrons.length ) {
        var electron = thisSymbolTabModel.particleAtom.removeParticle( "electron" );
        electron.destination = getNextElectronPosition();
        thisSymbolTabModel.electrons.push( electron );
      }
    } );
  };

  SymbolTabModel.prototype.step = function( dt ) {
    this.protons.forEach( function( proton ) {
      proton.step( dt );
    } );
    this.particleAtom.protons.forEach( function( proton ) {
      proton.step( dt );
    } );
    this.neutrons.forEach( function( neutron ) {
      neutron.step( dt );
    } );
    this.particleAtom.neutrons.forEach( function( neutron ) {
      neutron.step( dt );
    } );
    this.electrons.forEach( function( electron ) {
      electron.step( dt );
    } );
    this.particleAtom.electrons.forEach( function( electron ) {
      electron.step( dt );
    } );
  };

  return SymbolTabModel;
} );
