// Copyright 2002-2012, University of Colorado
define( function ( require ) {
  'use strict';
  var Fort = require( 'FORT/Fort' );
  var Vector2 = require( 'DOT/Vector2' );

  // Constants
  var PROTON_DIAMETER = 50;
  var NEUTRON_DIAMETER = PROTON_DIAMETER;
  var ELECTRON_DIAMETER = PROTON_DIAMETER / 2;

  var Particle = Fort.Model.extend(
      {
        defaults: {
          type: 'proton',
          position: Vector2.ZERO,
          radius: 50,
          userControlled: false
        }
      }
  );

  Particle.createProton = function () {
    return new Particle( { type: 'proton', radius: PROTON_DIAMETER } );
  }

  Particle.createNeutron = function () {
    return new Particle( { type: 'neutron', radius: NEUTRON_DIAMETER } );
  }

  return Particle;
} );
