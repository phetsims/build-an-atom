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

  // Constants
  var NUM_PROTONS = 10;
  var NUM_NEUTRONS = 12;
  var NUM_ELECTRONS = 11;
  var BOTTOM_OF_STACKS_Y = -230;
  var PROTON_STACK_CENTER_BOTTOM = new Vector2( -50, BOTTOM_OF_STACKS_Y );
  var NEUTRON_STACK_CENTER_BOTTOM = new Vector2( 0, BOTTOM_OF_STACKS_Y );
  var ELECTRON_STACK_CENTER_BOTTOM = new Vector2( 50, BOTTOM_OF_STACKS_Y );

  function SymbolTabModel() {

    var thisSymbolTabModel = this;

    this.numberAtom = new NumberAtom();
    this.particleAtom = new ParticleAtom();

    this.protons = [];
    this.neutrons = [];
    this.electrons = [];

    // Functions for managing particle positions.
    var getNextProtonPosition = function() {
      // TODO: Make this work as a stacking algorithm.
      return PROTON_STACK_CENTER_BOTTOM;
    }
    var getNextNeutronPosition = function() {
      // TODO: Make this work as a stacking algorithm.
      return NEUTRON_STACK_CENTER_BOTTOM;
    }
    var getNextElectronPosition = function() {
      // TODO: Make this work as a stacking algorithm.
      return ELECTRON_STACK_CENTER_BOTTOM;
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
  };

  SymbolTabModel.prototype.step = function( dt ) {
    this.protons.forEach( function( proton ){ proton.step( dt ); } );
    this.particleAtom.protons.forEach( function( proton ){ proton.step( dt ); } );
  };

  return SymbolTabModel;
} );
