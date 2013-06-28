// Copyright 2002-2013, University of Colorado Boulder

/**
 * Model for button state
 * @author Sam Reid
 */
define( function( require ) {
  "use strict";

  var PropertySet = require( 'AXON/PropertySet' );
  var inherit = require( 'PHET_CORE/inherit' );

  function ButtonModel() {
    //The default state for the button
    PropertySet.call( this, { enabled: true, armed: false, pressed: false} );

    this.listeners = [];
  }

  return inherit( PropertySet, ButtonModel, {
    //Fire all of the listeners.  TODO: Should this use backbone or jquery events, or is it already good?
    fireListeners: function() {
      this.listeners.forEach( function( listener ) { listener(); } );
    }} );
} );