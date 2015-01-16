// Copyright 2002-2013, University of Colorado Boulder

/**
 * Collection of utility functions used in multiple places within the sim.
 *
 * @author John Blanco
 */
define( [], function() {
  'use strict';

  return {
    /**
     * Determine if two values are equal within a tolerance.
     *
     * @param value1
     * @param value2
     * @param tolerance
     */
    roughlyEqual: function( value1, value2, tolerance ) {
      return Math.abs( value1 - value2 ) < tolerance;
    }
  };
} );