// Copyright 2002-2013, University of Colorado Boulder

/**
 * A button that provides no enclosure around the provided content nodes, i.e.
 * it leaves them essentially naked.  This is useful when a button is created
 * from a graphic or has atypical appearance.  This is not suitable for your
 * average button with a textual label.
 *
 * @author John Blanco
 */

define( function( require ) {
  "use strict";

  var Node = require( 'SCENERY/nodes/Node' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var BAAButtonModel = require( 'common/view/BAAButtonModel' );
  var ButtonListener = require( 'SCENERY/input/ButtonListener' );

  /**
   * @param {Node} content
   * @param {function} callback
   * @param {object} options
   * @constructor
   */
  function BAAGraphicButton( idleContent, callback, options ) {

    options = _.extend( {
                          cursor: 'pointer'
                        },
                        options );

    var thisButton = this;
    Node.call( thisButton, options );

    thisButton.buttonModel = new BAAButtonModel();
    thisButton.buttonModel.listeners.push( callback );

    // TODO: Make the center be the center of the largest image.
    thisButton.addChild( idleContent );
    thisButton.addInputListener( new ButtonListener( {
                                                       fire: function() {
                                                         thisButton.buttonModel.fireListeners();
                                                       }
                                                     } ) );

    thisButton.addPeer( '<input type="button">', {click: thisButton.buttonModel.fireListeners.bind( thisButton.buttonModel )} );
  }

  inherit( Node, BAAGraphicButton, {
    addListener: function( listener ) {
      this.buttonModel.listeners.push( listener );
    }
  } );

  return BAAGraphicButton;
} );
