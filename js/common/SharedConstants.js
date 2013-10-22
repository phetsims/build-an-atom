// Copyright 2002-2013, University of Colorado Boulder

/**
 * Shared constants used in various places.
 *
 * @author John Blanco
 */
define( function( require ) {
  'use strict';

  return{

    // Sizes of the various particles.
    NUCLEON_RADIUS: 10, // In screen coordinates, which are roughly pixels.
    ELECTRON_RADIUS: 8, // In screen coordinates, which are roughly pixels.

    // Background color used on several displays.
    DISPLAY_PANEL_BACKGROUND_COLOR: 'rgb( 254, 255, 153 )',

    // Max attempts for each problem on the game tab.
    MAX_PROBLEM_ATTEMPTS: 2,

    // Function for choosing text color based on charge value.
    CHARGE_TEXT_COLOR: function( charge ) { return charge > 0 ? 'red' : charge < 0 ? 'blue' : 'black'; },

    // Sub game types.
    SUB_GAME_TYPES: [ 'periodic-table-game', 'mass-and-charge-game', 'symbol-game', 'advanced-symbol-game' ],

    // Sub-game to level converter.
    SUB_GAME_TO_LEVEL: function( subGameType ) { return this.SUB_GAME_TYPES.indexOf( subGameType ); }
  }
} );
