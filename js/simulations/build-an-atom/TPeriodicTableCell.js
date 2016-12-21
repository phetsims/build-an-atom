// Copyright 2016, University of Colorado Boulder

/**
 *
 * @author Sam Reid (PhET Interactive Simulations)
 * @author Andrew Adare (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var assertInstanceOf = require( 'PHET_IO/assertions/assertInstanceOf' );
  var phetioNamespace = require( 'PHET_IO/phetioNamespace' );
  var phetioInherit = require( 'PHET_IO/phetioInherit' );
  var TObject = require( 'PHET_IO/types/TObject' );
  var toEventOnEmit = require( 'PHET_IO/events/toEventOnEmit' );

  var TPeriodicTableCell = function( periodicTableCell, phetioID ) {
    assertInstanceOf( periodicTableCell, phet.shred.PeriodicTableCell );
    TObject.call( this, periodicTableCell, phetioID );

    toEventOnEmit(
      periodicTableCell.startedCallbacksForPressedEmitter,
      periodicTableCell.endedCallbacksForPressedEmitter,
      'user',
      phetioID,
      TPeriodicTableCell,
      'fired'
    );
  };

  phetioInherit( TObject, 'TPeriodicTableCell', TPeriodicTableCell, {}, {
    events: [ 'fired' ],

    fromStateObject: function( stateObject ) {
      return new phet.dot.Vector2( stateObject.x, stateObject.y );
    },

    toStateObject: function( instance ) {
      return { x: instance.x, y: instance.y };
    }
  } );

  phetioNamespace.register( 'TPeriodicTableCell', TPeriodicTableCell );

  return TPeriodicTableCell;
} );

