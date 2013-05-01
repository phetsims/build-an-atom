// Copyright 2002-2013, University of Colorado

/**
 * This type defines a pair of buttons that can be used to control an integer
 * parameter.  It is visuall similar to a spinner except that there is no
 * indication of current value.
 */
define( function( require ) {

  var Node = require( 'SCENERY/nodes/Node' );
  var Text = require( 'SCENERY/nodes/Text' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Button = require( 'SUN/Button' );
  var Vector2 = require( 'DOT/Vector2' );

  var UpDownButtonPair = function( upFunction, downFunction ) {

    Node.call( this ); // Call super constructor.
    var thisUpDownButton = this;

    var upButton = new Button( new Text( "^", { font: "24px Arial" } ),
                               upFunction,
                               {
                                 fill: 'yellow'
                               } );
    this.addChild( upButton );
    var downButton = new Button( new Text( "v", { font: "24px Arial" } ),
                               downFunction,
                               {
                                 fill: 'yellow'
                               } );
    downButton.y = upButton.bounds.maxY;
    this.addChild( downButton );
  };

  // Inherit from Node.
  inherit( UpDownButtonPair, Node );

  return UpDownButtonPair;
} );
