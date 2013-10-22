// Copyright 2002-2013, University of Colorado Boulder

/**
 * Collection of utility functions used in multiple places within the sim.
 */
define( [], function() {
  'use strict';

  return{
    /**
     * Determine if two values are equal within a tolerance.
     *
     * @param value1
     * @param value2
     * @param tolerance
     */
    roughlyEqual: function( value1, value2, tolerance ) {
      return Math.abs( value1 - value2 ) < tolerance;
    },

    //REVIEW Delete this, use vegas.GameTimer.formatTime
    /**
     * Formats a value representing seconds into HH:MM:SS.
     *
     * @param {Number} secs
     * @returns {string}
     */
    formatTime: function( secs ) {
      var hours = Math.floor( secs / 3600 );
      var minutes = Math.floor( (secs - (hours * 3600)) / 60 );
      var seconds = Math.floor( secs - (hours * 3600) - (minutes * 60) );
      return ( hours > 0 ? hours + ':' : '' ) + hours > 0 && minutes < 10 ? '0' + minutes : minutes + ':' + ( seconds > 9 ? seconds : '0' + seconds );
    }
  };
} );