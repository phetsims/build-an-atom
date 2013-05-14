// Copyright 2002-2013, University of Colorado

/**
 * This type defines a pair of buttons that can be used to control an integer
 * parameter.  It is visuall similar to a spinner except that there is no
 * indication of current value.
 */
define( function( require ) {

  var Node = require( 'SCENERY/nodes/Node' );
  var Text = require( 'SCENERY/nodes/Text' );
  var Path = require( 'SCENERY/nodes/Path' );
  var Shape = require( 'KITE/Shape' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Button = require( 'SUN/Button' );
  var Vector2 = require( 'DOT/Vector2' );

  var ICON_WIDTH = 10;
  var ICON_HEIGHT = 6;
  var TOTAL_CONTENT_HEIGHT = ICON_HEIGHT + 5; // Additional vertical spacing.
  var ICON_STROKE_WIDTH = 3;

  var UpDownButtonPair = function( upFunction, downFunction ) {

    Node.call( this ); // Call super constructor.
    var thisUpDownButton = this;

    var upIconShape = new Shape();
    upIconShape.moveTo( 0, ICON_HEIGHT );
    upIconShape.lineTo( ICON_WIDTH / 2, 0 );
    upIconShape.lineTo( ICON_WIDTH, ICON_HEIGHT );
    var upIcon = new Path( {
                             shape: upIconShape,
                             stroke: 'yellow',
                             lineWidth: ICON_STROKE_WIDTH,
                             lineCap: 'round',
                             lineJoin: 'miter'
                           } );
    var spacerShape = new Shape();
    spacerShape.moveTo( ICON_WIDTH / 2, 0 );
    spacerShape.lineTo( ICON_WIDTH / 2, TOTAL_CONTENT_HEIGHT );
    var spacerPath = new Path( { shape: spacerShape } );
    upIcon.addChild( spacerPath );

    var upButton = new Button( upIcon,
                               upFunction,
                               {
                                 fill: 'rgb(150, 150, 150)',
                                 stroke: 'black',
                                 lineWidth: 2
                               } );
    this.addChild( upButton );

    var downIconShape = new Shape();
    var downIconVerticalOffset = TOTAL_CONTENT_HEIGHT - ICON_HEIGHT;
    downIconShape.moveTo( 0, downIconVerticalOffset );
    downIconShape.lineTo( ICON_WIDTH / 2, TOTAL_CONTENT_HEIGHT );
    downIconShape.lineTo( ICON_WIDTH, downIconVerticalOffset );
    var downIcon = new Path( {
                               shape: downIconShape,
                               stroke: 'yellow',
                               lineWidth: ICON_STROKE_WIDTH,
                               lineCap: 'round',
                               lineJoin: 'miter'
                             } );
    downIcon.addChild( spacerPath );

    var downButton = new Button( downIcon,
                                 downFunction,
                                 {
                                   fill: 'rgb(150, 150, 150)',
                                   stroke: 'black',
                                   lineWidth: 2
                                 } );
    downButton.y = upButton.bounds.maxY + 3;
    this.addChild( downButton );
  };

  // Inherit from Node.
  inherit( UpDownButtonPair, Node );

  return UpDownButtonPair;
} );
