// Copyright 2002-2013, University of Colorado

/**
 * Primary model class for the "Game" tab.
 */
define( function( require ) {
  "use strict";

  var PropertySet = require( 'AXON/PropertySet' );
  var inherit = require( 'PHET_CORE/inherit' );

  function GameModel() {
    PropertySet.call( this,
                      {
                        playing: false,
                        periodicTableGameCompleted: false,
                        massAndChargeGameCompleted: false,
                        symbolGameCompleted: false,
                        advancedSymbolGameCompleted: false
                      } );
  }

  // Inherit from base class.
  inherit( PropertySet, GameModel );

  GameModel.prototype.step = function( dt ) {
  };

    return GameModel;
} );
