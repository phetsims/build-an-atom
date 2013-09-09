// Copyright 2002-2013, University of Colorado Boulder
define( function( require ) {
  'use strict';

  // Not meant to be instantiated.
  var SharedConstants = {};

  // Sizes of the various particles.
  SharedConstants.NUCLEON_RADIUS = 10; // In screen coordinates, which are roughly pixels.
  SharedConstants.ELECTRON_RADIUS = 8; // In screen coordinates, which are roughly pixels.

  // Background color used on several displays.
  SharedConstants.DISPLAY_PANEL_BACKGROUND_COLOR = 'rgb( 254, 255, 153 )';

  // Max attempts for each problem on the game tab.
  SharedConstants.MAX_PROBLEM_ATTEMPTS = 2;

  /**
   * Function for choosing text color based on charge value.
   * @return {string}
   */
  SharedConstants.CHARGE_TEXT_COLOR = function( charge ) { return charge > 0 ? 'red' : charge < 0 ? 'blue' : 'black'; };

  // Sub game types.
  SharedConstants.SUB_GAME_TYPES = [ 'periodic-table-game', 'mass-and-charge-game', 'symbol-game', 'advanced-symbol-game' ];

  // Sub-game to level converter.
  SharedConstants.SUB_GAME_TO_LEVEL = function( subGameType ) { return this.SUB_GAME_TYPES.indexOf( subGameType ) };

  return SharedConstants;
} );
