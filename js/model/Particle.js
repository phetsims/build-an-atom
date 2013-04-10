// Copyright 2002-2012, University of Colorado
define( function ( require ) {
  'use strict';
  var Fort = require( 'FORT/Fort' );
  var Vector2 = require( 'DOT/Vector2' );
  var SharedConstants = require( 'common/SharedConstants' );

  var Particle = Fort.Model.extend(
      {
        defaults: {
          type: 'proton',
          position: Vector2.ZERO,
          radius: SharedConstants.NUCLEON_RADIUS,
          userControlled: false
        }
      }
  );

  Particle.createProton = function () {
    return new Particle( { type: 'proton', radius: SharedConstants.NUCLEON_RADIUS } );
  }

  Particle.createNeutron = function () {
    return new Particle( { type: 'neutron', radius: SharedConstants.NUCLEON_RADIUS } );
  }

  Particle.createElectron = function () {
    return new Particle( { type: 'electron', radius: SharedConstants.ELECTRON_RADIUS } );
  }

  return Particle;
} );
