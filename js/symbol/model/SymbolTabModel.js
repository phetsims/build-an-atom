// Copyright 2002-2013, University of Colorado

/**
 * Model for the Symbol tab of the Build an Atom simulation.  Consists of a
 * number atom and a particle atom, where the number atom is the main access
 * point for configuring the atom, and the particle atom is kept in sync with
 * the mumber atom.
 */
define( function ( require ) {

  // Imports
  var NumberAtom = require( 'symbol/model/NumberAtom' );
  var ParticleAtom = require( 'common/model/ParticleAtom' );

  function SymbolTabModel(){
    this.numberAtom = new NumberAtom();
    this.particleAtom = new ParticleAtom();
  };

  SymbolTabModel.prototype.step = function ( dt ) {
    // TODO: Step all particles.
  };

  return SymbolTabModel;
} );
