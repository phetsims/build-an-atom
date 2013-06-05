// Copyright 2002-2013, University of Colorado

/**
 * Model for the Symbol tab of the Build an Atom simulation.  Consists of a
 * number atom and a particle atom, where the number atom is the main access
 * point for configuring the atom, and the particle atom is kept in sync with
 * the mumber atom.
 */
define( function( require ) {
  'use strict';

  // Imports
  var NumberAtom = require( 'symbol/model/NumberAtom' );
  var ParticleAtom = require( 'common/model/ParticleAtom' );
  var Vector2 = require( 'DOT/Vector2' );
  var Particle = require( 'common/model/Particle' );
  var SharedConstants = require( 'common/SharedConstants' );

  // Constants
  var NUM_PROTONS = 10;
  var NUM_NEUTRONS = 11;
  var NUM_ELECTRONS = 10;
  var BOTTOM_OF_STACKS_Y = -300;
  var PROTON_STACK_CENTER_BOTTOM = new Vector2( -150, BOTTOM_OF_STACKS_Y );
  var NEUTRON_STACK_CENTER_BOTTOM = new Vector2( 0, BOTTOM_OF_STACKS_Y );
  var ELECTRON_STACK_CENTER_BOTTOM = new Vector2( 150, BOTTOM_OF_STACKS_Y );

  /**
   *
   * @constructor
   */
  function SymbolTabModel() {

    var thisSymbolTabModel = this;

    this.numberAtom = new NumberAtom();
    this.particleAtom = new ParticleAtom( 80, 160 );
    this.particleAtom.electronAddMode = 'random';

    this.protons = [];
    this.neutrons = [];
    this.electrons = [];

    _.times( NUM_PROTONS, function() {
      var proton = Particle.createProton();
      proton.destination = thisSymbolTabModel._getNextParticlePosition( 'proton' );
      proton.moveImmediatelyToDestination();
      thisSymbolTabModel.protons.push( proton );
    } );
    _.times( NUM_NEUTRONS, function() {
      var neutron = Particle.createNeutron();
      neutron.destination = thisSymbolTabModel._getNextParticlePosition( 'neutron' );
      neutron.moveImmediatelyToDestination();
      thisSymbolTabModel.neutrons.push( neutron );
    } );
    _.times( NUM_ELECTRONS, function() {
      var electron = Particle.createElectron();
      electron.destination = thisSymbolTabModel._getNextParticlePosition( 'electron' );
      electron.moveImmediatelyToDestination();
      thisSymbolTabModel.electrons.push( electron );
    } );

    // Function to move particles between the stacks and the atom.
    var updateParticleAllocation = function( targetCountInAtom, localParticleArray, particleAtomArray, particleType ) {
      while ( targetCountInAtom > particleAtomArray.length ) {
        thisSymbolTabModel.particleAtom.addParticle( localParticleArray.pop() );
      }
      while ( targetCountInAtom < particleAtomArray.length ) {
        var particle = thisSymbolTabModel.particleAtom.removeParticle( particleType );
        particle.destination = thisSymbolTabModel._getNextParticlePosition( particleType );
        localParticleArray.push( particle );
      }
    };

    // Link the numberAtom to the particleAtom.
    this.numberAtom.link( 'protonCount', function( protonCount ) {
      updateParticleAllocation( protonCount, thisSymbolTabModel.protons, thisSymbolTabModel.particleAtom.protons, 'proton' );
    } );
    this.numberAtom.link( 'neutronCount', function( neutronCount ) {
      updateParticleAllocation( neutronCount, thisSymbolTabModel.neutrons, thisSymbolTabModel.particleAtom.neutrons, 'neutron' );
    } );
    this.numberAtom.link( 'electronCount', function( electronCount ) {
      updateParticleAllocation( electronCount, thisSymbolTabModel.electrons, thisSymbolTabModel.particleAtom.electrons, 'electron' );
    } );
  }

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

  SymbolTabModel.prototype.reset = function() {
    this.numberAtom.reset();
  };

  // Function for stacking particles.
  SymbolTabModel.prototype._getStackOffset = function( index, radius ) {
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
  };

  SymbolTabModel.prototype._getNextParticlePosition = function( particleType ) {
    var stackPosition;
    var index;
    var particleRadius;
    if ( particleType === 'proton' ) {
      stackPosition = PROTON_STACK_CENTER_BOTTOM;
      index = this.protons.length;
      particleRadius = SharedConstants.NUCLEON_RADIUS;
    }
    else if ( particleType === 'neutron' ) {
      stackPosition = NEUTRON_STACK_CENTER_BOTTOM;
      index = this.neutrons.length;
      particleRadius = SharedConstants.NUCLEON_RADIUS;
    }
    else if ( particleType === 'electron' ) {
      stackPosition = ELECTRON_STACK_CENTER_BOTTOM;
      index = this.electrons.length;
      particleRadius = SharedConstants.ELECTRON_RADIUS;
    }
    else {
      console.log( "Error: Unhandled particle type = " + particleType );
      stackPosition = Vector2.ZERO;
      index = 0;
    }
    return stackPosition.plus( this._getStackOffset( index, particleRadius ) );
  };

  return SymbolTabModel;
} );
