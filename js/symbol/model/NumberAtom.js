// Copyright 2002-2013, University of Colorado

/**
 * Model of an atom that represents the atom as a set of numbers which track
 * the quantity of the various subatomic particles (i.e. protons, neutrons,
 * and electrons).
 */
define( function ( require ) {

  var Fort = require( 'FORT/Fort' );

  var NumberAtom = Fort.Model.extend(
      {
        defaults: {
          protonCount: 0,
          neutronCount: 0,
          electronCount: 0
        }
      }
  );

  NumberAtom.prototype.getAtomicMass = function () {
    return this.protonCount + this.neutronCount;
  };

  NumberAtom.prototype.getCharge = function () {
    return this.protonCount - this.electronCount;
  };

  NumberAtom.prototype.step = function ( dt ) {
    // TODO: TBD.
  };

  return NumberAtom;
} );
