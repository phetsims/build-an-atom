// Copyright 2002-2012, University of Colorado
define( [ ], function () {

  // Not meant to be instantiated.
  var SharedConstants = {};

  // Size of the stage, in screen coordinates.  This was obtained by setting
  // a Chrome window to 1024 x 768 and measuring the actual display region.
  SharedConstants.STAGE_SIZE = { width : 1010, height: 655 };

  SharedConstants.NUCLEON_RADIUS = 12; // In screen coordinates, which are roughly pixels.
  SharedConstants.ELECTRON_RADIUS = 10; // In screen coordinates, which are roughly pixels.

  SharedConstants.INNER_ELECTRON_SHELL_RADIUS = 100; // In screen coordinates, which are roughly pixels.
  SharedConstants.OUTER_ELECTRON_SHELL_RADIUS = 200; // In screen coordinates, which are roughly pixels.

  return SharedConstants;

} );
