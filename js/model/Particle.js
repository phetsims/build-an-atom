// Copyright 2002-2012, University of Colorado
define( function ( require ) {
  'use strict';
  var Fort = require( 'FORT/Fort' );
  var Vector2 = require( 'DOT/Vector2' );

  var Particle = Fort.Model.extend(
      {
        defaults: {
          position : Vector2.ZERO,
          radius : 50,
          userControlled: false
        }
      }
  );

  return Particle;
} );
