// Copyright 2002-2013, University of Colorado

/**
 * Model of an atom that represents the atom as a set of numbers which
 * represent the quantity of the various subatomic particles (i.e. protons,
 * neutrons, and electrons).
 */
define( function( require ) {
  "use strict";

  var PropertySet = require( 'AXON/PropertySet' );
  var inherit = require( 'PHET_CORE/inherit' );

  function NumberAtom() {
    PropertySet.call( this, { protonCount: 0, neutronCount: 0, electronCount: 0 } );
    this.addDerivedProperty( 'charge', [ 'protonCount', 'electronCount' ], function( protonCount, electronCount ) {
      return protonCount - electronCount;
    } );
    this.addDerivedProperty( 'atomicMass', [ 'protonCount', 'neutronCount' ], function( protonCount, neutronCount ) {
      return protonCount + neutronCount;
    } );
    this.addDerivedProperty( 'particleCount', [ 'protonCount', 'neutronCount', 'electronCount' ], function( protonCount, neutronCount, electronCount ) {
      return protonCount + neutronCount + electronCount;
    } );
  }

  inherit( PropertySet, NumberAtom, {
    equals : function( otherAtom ){
      return ( this.protonCount === otherAtom.protonCount &&
               this.neutronCount === otherAtom.neutronCount &&
               this.electronCount === otherAtom.electronCount );
    }
  } );

  return NumberAtom;
} );
