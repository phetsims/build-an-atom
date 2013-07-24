// Copyright 2002-2013, University of Colorado Boulder

/**
 * Node that allows a user to enter a numerical value using up/down arrow
 * buttons.
 */
define( function( require ) {
  'use strict';

  // Imports
  var ArrowButton = require( 'SCENERY_PHET/ArrowButton' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( 'SCENERY/nodes/Node' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var Text = require( 'SCENERY/nodes/Text' );

  // Constants
  var NUMBER_BOX_SIZE = { width: 50, height: 40 }; // Size empirically determined.

  /**
   * Main constructor.
   *
   * @param numberProperty
   * @param options
   * @constructor
   */
  function NumberEntryNode( numberProperty, options ) {

    Node.call( this, options ); // Call super constructor.
    var thisNode = this;

    options = _.extend( { font: new PhetFont( 24 )}, options );

    // Node creation
    var arrowButtonOptions = { arrowHeight: 12, arrowWidth: 15 };
    var upArrowButton = new ArrowButton( 'up', function() { numberProperty.value = numberProperty.value + 1; }, arrowButtonOptions );
    thisNode.addChild( upArrowButton );
    var downArrowButton = new ArrowButton( 'down', function() { numberProperty.value = numberProperty.value - 1; }, arrowButtonOptions );
    thisNode.addChild( downArrowButton );
    var answerValueBackground = new Rectangle( 0, 0, NUMBER_BOX_SIZE.width, NUMBER_BOX_SIZE.height, 4, 4,
      {
        fill: 'white',
        stroke: 'black',
        lineWidth: 1
      } );
    thisNode.addChild( answerValueBackground );
    numberProperty.link( function( newValue ) {
      answerValueBackground.removeAllChildren();
      var prepend = newValue > 0 ? '+' : '';
      var textNode = new Text( prepend + newValue,
        { font: new PhetFont( 22 ),
          fill: newValue > 0 ? 'red' : newValue < 0 ? 'blue' : 'black'
        } );
      textNode.scale( Math.min( 1, Math.min( ( answerValueBackground.width * 0.8 ) / textNode.width, ( answerValueBackground.height * 0.9 ) / textNode.height ) ) );
      textNode.centerX = answerValueBackground.width / 2;
      textNode.centerY = answerValueBackground.height / 2;
      answerValueBackground.addChild( textNode );
    } );

    // Layout
    downArrowButton.top = upArrowButton.bottom + 3;
    answerValueBackground.left = upArrowButton.right + 3;
    answerValueBackground.centerY = ( upArrowButton.bottom + downArrowButton.top ) / 2;
  }

  // Inherit from Node.
  inherit( Node, NumberEntryNode );

  return NumberEntryNode;
} );
