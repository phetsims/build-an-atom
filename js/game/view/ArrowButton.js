// Copyright 2002-2013, University of Colorado Boulder

//TODO Consolidate this with the version from Beer's Law Lab, which is where the original came from.
/**
 * Button with an arrow that points up or down. Press and release immediately
 * and the button fires on the 'up' event. Press and hold for M milliseconds
 * and the button will fire repeatedly every N milliseconds until released.
 *
 * @author Chris Malley (PixelZoom, Inc)
 * @author John Blanco
 */
define( function( require ) {
  'use strict';

  // imports
  var assert = require( 'ASSERT/assert' )( 'beers-law-lab' );
  var ButtonListener = require( 'SCENERY/input/ButtonListener' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Path = require( 'SCENERY/nodes/Path' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var Shape = require( 'KITE/Shape' );

  /**
   * @param {String} direction 'left' or 'right'
   * @param callback
   * @param options
   * @constructor
   */
  function ArrowButton( direction, callback, options ) {

    assert && assert( direction === 'up' || direction === 'down' );

    var thisButton = this;

    var DEFAULT_ARROW_WIDTH = 20;
    options = _.extend( {
        arrowHeight: DEFAULT_ARROW_WIDTH,
        arrowWidth: DEFAULT_ARROW_WIDTH * Math.sqrt( 3 ) / 2,
        fill: 'white',
        stroke: 'black',
        lineWidth: 1,
        xMargin: 7,
        yMargin: 5,
        cornerRadius: 4,
        enabledFill: 'black',
        disabledFill: 'rgb(175,175,175)',
        enabledStroke: 'black',
        disabledStroke: 'rgb(175,175,175)',
        timerDelay: 400, // start to fire continuously after pressing for this long (milliseconds)
        intervalDelay: 100 // fire continuously at this frequency (milliseconds)
      },
      options );

    Node.call( thisButton );

    // nodes
    var arrowShape = ( direction === 'up' ) ?
                     new Shape().moveTo( options.arrowWidth / 2, 0 ).lineTo( options.arrowWidth, options.arrowHeight ).lineTo( 0, options.arrowHeight ).close() :
                     new Shape().moveTo( 0, 0 ).lineTo( options.arrowWidth, 0 ).lineTo( options.arrowWidth / 2, options.arrowHeight ).close();
    var arrowNode = new Path( { fill: options.enabledFill, shape: arrowShape } );
    var background = new Rectangle( 0, 0, arrowNode.width + ( 2 * options.xMargin ), arrowNode.height + ( 2 * options.yMargin ), options.cornerRadius, options.cornerRadius,
      {stroke: options.stroke, lineWidth: options.lineWidth, fill: options.fill } );

    // rendering order
    thisButton.addChild( background );
    thisButton.addChild( arrowNode );

    // layout
    arrowNode.centerX = background.centerX;
    arrowNode.centerY = background.centerY;

    // touch area
    var dx = 0.25 * thisButton.width;
    var dy = 0.25 * thisButton.height;
    thisButton.touchArea = Shape.rectangle( -dx, -dy, thisButton.width + dx + dx, thisButton.height + dy + dy );

    // interactivity
    thisButton.cursor = 'pointer';
    var enabled = true;
    var fired = false;
    var timeoutID = null;
    var intervalID = null;
    var cleanupTimer = function() {
      if ( timeoutID ) {
        window.clearTimeout( timeoutID );
        timeoutID = null;
      }
      if ( intervalID ) {
        window.clearInterval( intervalID );
        intervalID = null;
      }
    };
    thisButton.addInputListener( new ButtonListener( {

      over: function() {
        //TODO highlight
      },

      down: function() {
        fired = false;
        timeoutID = window.setTimeout( function() {
          timeoutID = null;
          fired = true;
          intervalID = window.setInterval( function() {
            if ( enabled ) {
              callback();
            }
          }, options.intervalDelay );
        }, options.timerDelay );
      },

      up: function() {
        cleanupTimer();
      },

      fire: function() {
        cleanupTimer();
        if ( !fired && enabled ) {
          callback();
        }
      }
    } ) );

    //TODO consider adding this to the prototype. Would need to convert several local vars to fields, and cleanupTimer gets a little complicated.
    thisButton.setEnabled = function( value ) {
      enabled = value;
      if ( !enabled ) {
        cleanupTimer();
      }
      arrowNode.fill = enabled ? options.enabledFill : options.disabledFill;
      background.stroke = enabled ? options.enabledStroke : options.disabledStroke;
      thisButton.pickable = enabled;
    };
    thisButton.setEnabled( true );

    thisButton.mutate( options );
  }

  inherit( Node, ArrowButton );

  return ArrowButton;
} );