// Copyright 2002-2013, University of Colorado

/**
 * Definition for a type that contains the information that is present in an
 * atomic symbol, i.e. the number of protons, the electric charge, and the
 * atomic mass.
 */
define( function ( require ) {

  var Fort = require( 'FORT/Fort' );

  var SymbolModel = Fort.Model.extend(
      {
        defaults: {
          protonCount: 0,
          neutronCount: 0,
          electronCount: 0
        }
      }
  );

  SymbolModel.prototype.getAtomicMass = function () {
    return this.protonCount + this.neutronCount;
  };

  Atom.prototype.getCharge = function () {
    return this.protonCount - this.electronCount;
  };

  return SymbolModel;
} );
