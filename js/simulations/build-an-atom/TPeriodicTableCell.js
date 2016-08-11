// Copyright 2016, University of Colorado Boulder

/**
 *
 * @author Sam Reid (PhET Interactive Simulations)
 * @author Andrew Adare
 */
define( function( require ) {
  'use strict';

  // modules
  var assertInstanceOf = require( 'PHET_IO/assertions/assertInstanceOf' );
  var phetioNamespace = require( 'PHET_IO/phetioNamespace' );
  var phetioInherit = require( 'PHET_IO/phetioInherit' );
  var TObject = require( 'PHET_IO/types/TObject' );

  var TPeriodicTableCell = function( periodicTableCell, phetioID ) {
    assertInstanceOf( periodicTableCell, phet.shred.PeriodicTableCell );
    TObject.call( this, periodicTableCell, phetioID );

    var index = null;
    periodicTableCell.startedCallbacksForPressedEmitter.addListener( function() {
      index = phetioEvents.start( 'user', phetioID, TPeriodicTableCell, 'fired' );
    } );
    periodicTableCell.endedCallbacksForPressedEmitter.addListener( function() {
      phetioEvents.end( index );
    } );
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

