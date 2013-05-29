// Copyright 2002-2013, University of Colorado
define( function ( require ) {

  // Not meant to be instantiated.
  var SharedConstants = {};

  // Sizes of the various particles.
  SharedConstants.NUCLEON_RADIUS = 10; // In screen coordinates, which are roughly pixels.
  SharedConstants.ELECTRON_RADIUS = 8; // In screen coordinates, which are roughly pixels.

  // Background color used on several displays.
  SharedConstants.DISPLAY_PANEL_BACKGROUND_COLOR = 'rgb( 254, 255, 153 )';

  return SharedConstants;

} );
