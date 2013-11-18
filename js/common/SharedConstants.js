// Copyright 2002-2013, University of Colorado Boulder

/**
 * Shared constants used in various places.
 *
 * @author John Blanco
 */
define( function( require ) {
  'use strict';

  // Imports
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );

  return{

    // Sizes of the various particles.
    NUCLEON_RADIUS: 10, // In screen coordinates, which are roughly pixels.
    ELECTRON_RADIUS: 8, // In screen coordinates, which are roughly pixels.

    // Background color used on several displays.
    DISPLAY_PANEL_BACKGROUND_COLOR: 'rgb( 254, 255, 153 )',

    // Font used in accordion box titles throughout the sim.
    ACCORDION_BOX_TITLE_FONT: new PhetFont( 18 ),

    // Max attempts for each problem on the game tab.
    MAX_PROBLEM_ATTEMPTS: 2,

    // Function for choosing text color based on charge value.
    CHARGE_TEXT_COLOR: function( charge ) { return charge > 0 ? 'red' : charge < 0 ? 'blue' : 'black'; },

    // Names of the various game levels.
    LEVEL_NAMES: [ 'periodic-table-game', 'mass-and-charge-game', 'symbol-game', 'advanced-symbol-game' ],

    // Level name to level number converter.
    MAP_LEVEL_NAME_TO_NUMBER: function( levelName ) { return this.LEVEL_NAMES.indexOf( levelName ); }
  };
} );
