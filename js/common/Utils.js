// Copyright 2002-2013, University of Colorado Boulder

define( [], function() {
  "use strict";

  // Not meant to be instantiated.
  var Utils = { };

  /**
   * Returns the distance between two points, p1 and p2.
   *
   * @param x1
   * @param y1
   * @param x2
   * @param y2
   */
  Utils.distanceBetweenPoints = function( x1, y1, x2, y2 ) {
    return Math.sqrt( ( x1 - x2 ) * ( x1 - x2 ) + ( y1 - y2 ) * ( y1 - y2 ) );
  };

  /**
   * Determine if two values are equal within a tolerance.
   *
   * @param value1
   * @param value2
   * @param tolerance
   */
  Utils.roughlyEqual = function( value1, value2, tolerance ) {
    return Math.abs( value1 - value2 ) < tolerance;
  };

  return Utils;
} );